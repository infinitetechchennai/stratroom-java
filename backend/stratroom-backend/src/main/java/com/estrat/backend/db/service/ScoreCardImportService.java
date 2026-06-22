package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.dto.*;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import com.estrat.backend.db.scv2.ScorecardCrudService;

@Service
public class ScoreCardImportService {

    @Autowired
    private ScoreCardDetailsService scoreCardDetailsService;

    @Autowired
    private PageService pageService;

    @Autowired
    private DepartmentChartMappingRepository departmentChartMappingRepository;

    @Autowired
    private ScorecardCrudService scorecardCrudService;

    public ResponseEntity<ScoreCardResponseDTO> bulkImportScorecards(List<Map<String, Object>> rows) {
        try {
            // Resolve the logged-in user once
            Long empId = null;
            try {
                empId = Long.valueOf(com.estrat.backend.scorecard.util.UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID"));
            } catch (Exception e) {
                empId = 1L; // fallback
            }

            // Group rows by Department ID
            Map<String, List<Map<String, Object>>> byDept = new HashMap<>();
            for (Map<String, Object> row : rows) {
                String deptId = String.valueOf(row.get("Department ID"));
                if (deptId == null || "null".equals(deptId)) continue;
                byDept.computeIfAbsent(deptId, k -> new ArrayList<>()).add(row);
            }
            System.out.println("BULK IMPORT CALLED with " + rows.size() + " rows. Grouped by dept: " + byDept.size());

            for (Map.Entry<String, List<Map<String, Object>>> entry : byDept.entrySet()) {
                List<Map<String, Object>> deptRows = entry.getValue();
                Map<String, Object> firstRow = deptRows.get(0);
                String scorecardName = String.valueOf(firstRow.get("ScoreCardName"));
                
                String deptUniqueId = entry.getKey();
                Long deptIdLong = null;
                try {
                    deptIdLong = Long.valueOf(deptUniqueId);
                } catch (NumberFormatException e) {
                    // Alphanumeric code like "L1_CIO" — look up in department_chart_details
                    DepartmentChartMapping chartMapping = departmentChartMappingRepository.findByDeptUniqueId(deptUniqueId);
                    if (chartMapping != null) {
                        deptIdLong = chartMapping.getDeptId();
                    } else {
                        System.err.println("[WARN] Department not found for uniqueId: " + deptUniqueId + ", skipping.");
                        continue;
                    }
                }
                System.out.println("Processing department: " + deptUniqueId + " resolved to DB ID: " + deptIdLong);

                // ── Step 1: Create the page_details entry so this scorecard shows in the nav ──
                PagesDetails page = new PagesDetails();
                page.setPageName(scorecardName);
                page.setPageType("Standard_View");
                page.setGroupType("Measure");
                page.setActive(0);
                page.setDeptId(deptIdLong);
                page.setCreatedBy(empId);
                page.setUpdatedBy(empId);
                page.setCreatedTime(LocalDateTime.now());
                page.setUpdatedTime(LocalDateTime.now());
                page.setDefaultPage("N");

                ScoreCardResponseDTO savedPage = pageService.save(page);
                Long pageId = savedPage.getPageDTO() != null ? savedPage.getPageDTO().getId() : null;

                // ── Step 2: Build the ScoreCardDetails DTO ──
                ScoreCardDetailsDTO detailsDTO = new ScoreCardDetailsDTO();
                detailsDTO.setScorecardName(scorecardName);
                detailsDTO.setCreatedBy(empId);
                detailsDTO.setUpdatedBy(empId);
                detailsDTO.setOwner(empId);
                detailsDTO.setActive(1);
                detailsDTO.setDepartmentId(deptIdLong);
                if (pageId != null) {
                    detailsDTO.setPageId(pageId);
                }

                Map<String, Object> detailsMap = new HashMap<>();
                detailsMap.put("scorecardDescription", firstRow.get("Scorecard Description"));
                detailsMap.put("departmentId", entry.getKey());
                detailsDTO.setScoreCardDetailsValue(detailsMap);

                // ── Step 1.5: Create V2 Scorecard ──
                Map<String, Object> v2Scorecard = new HashMap<>();
                v2Scorecard.put("pageId", pageId);
                v2Scorecard.put("name", scorecardName);
                v2Scorecard.put("description", firstRow.get("Scorecard Description"));
                v2Scorecard.put("ownerId", empId);
                v2Scorecard.put("departmentId", deptIdLong);
                v2Scorecard.put("createdBy", empId);
                v2Scorecard.put("classificationType", "THREE_COLOR");
                long v2ScorecardId = scorecardCrudService.createScorecard(v2Scorecard);

                // Group by Perspective Name
                Map<String, List<Map<String, Object>>> byPerspective = new LinkedHashMap<>();
                for (Map<String, Object> r : deptRows) {
                    String pName = String.valueOf(r.get("Perspective Name"));
                    byPerspective.computeIfAbsent(pName, k -> new ArrayList<>()).add(r);
                }

                List<ScoreCardDTO> perspectives = new ArrayList<>();
                int perspectiveOrder = 1;
                for (Map.Entry<String, List<Map<String, Object>>> pEntry : byPerspective.entrySet()) {
                    List<Map<String, Object>> pRows = pEntry.getValue();
                    Map<String, Object> pFirstRow = pRows.get(0);

                    ScoreCardDTO pDTO = new ScoreCardDTO();
                    pDTO.setScorecardName(pEntry.getKey());
                    Map<String, Object> pMap = new HashMap<>();
                    pMap.put("description", pFirstRow.get("Perspective Description"));
                    pMap.put("weightage", pFirstRow.get("Perspective Weight"));
                    pMap.put("perspectiveType", pFirstRow.get("Perspective Type"));
                    pDTO.setScoreCardValue(pMap);

                    // ── Create V2 Perspective ──
                    Map<String, Object> v2Perspective = new HashMap<>();
                    v2Perspective.put("scorecardId", v2ScorecardId);
                    v2Perspective.put("name", pEntry.getKey());
                    v2Perspective.put("description", pFirstRow.get("Perspective Description"));
                    v2Perspective.put("weight", pFirstRow.get("Perspective Weight"));
                    v2Perspective.put("displayOrder", perspectiveOrder++);
                    long v2PerspectiveId = scorecardCrudService.createPerspective(v2Perspective);

                    // Group by Objective Name
                    Map<String, List<Map<String, Object>>> byObjective = new LinkedHashMap<>();
                    for (Map<String, Object> pr : pRows) {
                        String oName = String.valueOf(pr.get("Objective Name"));
                        byObjective.computeIfAbsent(oName, k -> new ArrayList<>()).add(pr);
                    }

                    List<ObjectivesDTO> objectives = new ArrayList<>();
                    int objectiveOrder = 1;
                    for (Map.Entry<String, List<Map<String, Object>>> oEntry : byObjective.entrySet()) {
                        List<Map<String, Object>> oRows = oEntry.getValue();
                        Map<String, Object> oFirstRow = oRows.get(0);

                        ObjectivesDTO oDTO = new ObjectivesDTO();
                        oDTO.setObjectivesName(oEntry.getKey());

                        Map<String, Object> objMap = new HashMap<>();
                        objMap.put("description", oFirstRow.get("Objective Description"));
                        objMap.put("weightage", oFirstRow.get("Objective Weight"));
                        oDTO.setObjectivesValue(objMap);

                        // ── Create V2 Objective ──
                        Map<String, Object> v2Objective = new HashMap<>();
                        v2Objective.put("perspectiveId", v2PerspectiveId);
                        v2Objective.put("name", oEntry.getKey());
                        v2Objective.put("description", oFirstRow.get("Objective Description"));
                        v2Objective.put("weight", oFirstRow.get("Objective Weight"));
                        v2Objective.put("displayOrder", objectiveOrder++);
                        long v2ObjectiveId = scorecardCrudService.createObjective(v2Objective);

                        List<KPIDTO> kpis = new ArrayList<>();
                        int kpiOrder = 1;
                        for (Map<String, Object> kr : oRows) {
                            KPIDTO kDTO = new KPIDTO();
                            kDTO.setKpiName(String.valueOf(kr.get("KPI  NAME")));

                            Map<String, Object> kMap = new HashMap<>();
                            kMap.put("description", kr.get("KPI Description"));
                            kMap.put("measurementMethod", kr.get("Measurement Method / Source"));
                            kMap.put("targetAudience", kr.get("Target Audience"));
                            kMap.put("uom", kr.get("UoM"));
                            kMap.put("format", kr.get("Format"));
                            kMap.put("currentActual", kr.get("Current Actual"));
                            kMap.put("yearlyTarget", kr.get("Yearly Target (sum of quarterly Targets)"));
                            kMap.put("weightage", kr.get("KPI Weight"));
                            kMap.put("kpiContribution", kr.get("kpi contribution"));
                            kMap.put("reportingFrequency", kr.get("Measurement Frequency"));
                            kMap.put("leadLag", kr.get("Lead / Lag"));
                            kMap.put("formula", kr.get("KPI Formula"));
                            kMap.put("ownerName", kr.get("Owner"));
                            kDTO.setKpiValue(kMap);

                            // ── Create V2 KPI ──
                            Map<String, Object> v2Kpi = new HashMap<>();
                            v2Kpi.put("objectiveId", v2ObjectiveId);
                            v2Kpi.put("code", String.valueOf(kr.get("KPI ID")));
                            v2Kpi.put("name", String.valueOf(kr.get("KPI  NAME")));
                            v2Kpi.put("description", kr.get("KPI Description"));
                            
                            String uom = String.valueOf(kr.get("UoM"));
                            String dataType = "NUMBER";
                            String currencyCode = null;
                            if (uom != null && !uom.equals("null")) {
                                if (uom.toLowerCase().contains("%") || uom.toLowerCase().contains("percent")) {
                                    dataType = "PERCENTAGE";
                                } else if (uom.toLowerCase().contains("$") || uom.toLowerCase().contains("currency") || uom.toLowerCase().contains("usd") || uom.toLowerCase().contains("rm")) {
                                    dataType = "CURRENCY";
                                    currencyCode = "USD";
                                }
                            }
                            v2Kpi.put("dataType", dataType);
                            v2Kpi.put("currencyCode", currencyCode);
                            
                            String formatStr = String.valueOf(kr.get("Format"));
                            String polarity = "HIGHER";
                            if (formatStr != null && formatStr.toLowerCase().contains("lower")) {
                                polarity = "LOWER";
                            }
                            v2Kpi.put("polarity", polarity);
                            
                            v2Kpi.put("weight", kr.get("KPI Weight"));
                            v2Kpi.put("measurementFrequency", kr.get("Measurement Frequency"));
                            v2Kpi.put("targetValue", kr.get("Yearly Target (sum of quarterly Targets)"));
                            v2Kpi.put("displayOrder", kpiOrder++);
                            
                            long v2KpiId = scorecardCrudService.createKpi(v2Kpi);

                            kpis.add(kDTO);
                        }
                        oDTO.setKpiList(kpis);
                        objectives.add(oDTO);
                    }
                    pDTO.setObjectiveList(objectives);
                    perspectives.add(pDTO);
                }
                detailsDTO.setScoreCardDTOS(perspectives);

                // ── Step 3: Save the full scorecard tree linked to the page ──
                System.out.println("Saving scorecard details for " + scorecardName);
                scoreCardDetailsService.save(detailsDTO);
                System.out.println("Successfully saved scorecard " + scorecardName);
            }

            System.out.println("Returning SUCCESS true");
            ScoreCardResponseDTO response = new ScoreCardResponseDTO();
            response.setFlag(true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            ScoreCardResponseDTO response = new ScoreCardResponseDTO();
            response.setFlag(false);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
