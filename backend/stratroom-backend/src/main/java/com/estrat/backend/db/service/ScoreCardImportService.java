package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.dto.ScoreCardDetailsDTO;
import com.estrat.backend.db.dto.ScoreCardResponseDTO;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.scv2.ScorecardCrudService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Bulk scorecard import from Excel rows.
 * Persists into the V2 {@code sc_*} tables + {@code page_details} for navigation.
 * Legacy {@code objectives}/{@code score_card} tables are not used (often absent on Postgres).
 */
@Service
public class ScoreCardImportService {

    private static final Logger log = LoggerFactory.getLogger(ScoreCardImportService.class);

    @Autowired
    private ScoreCardDetailsService scoreCardDetailsService;

    @Autowired
    private PageService pageService;

    @Autowired
    private DepartmentChartMappingRepository departmentChartMappingRepository;

    @Autowired
    private ScorecardCrudService scorecardCrudService;

    public ResponseEntity<ScoreCardResponseDTO> bulkImportScorecards(List<Map<String, Object>> rows) {
        ScoreCardResponseDTO response = new ScoreCardResponseDTO();
        try {
            Long empId = resolveEmpId();

            Map<String, List<Map<String, Object>>> byDept = new LinkedHashMap<>();
            for (Map<String, Object> row : rows) {
                String deptId = cell(row, "Department ID", "DepartmentID", "Dept ID", "DeptID");
                if (deptId == null || deptId.isBlank()) {
                    continue;
                }
                byDept.computeIfAbsent(deptId, k -> new ArrayList<>()).add(row);
            }
            log.info("Scorecard bulk import: {} rows, {} department group(s)", rows.size(), byDept.size());

            int imported = 0;
            for (Map.Entry<String, List<Map<String, Object>>> entry : byDept.entrySet()) {
                importDeptGroup(entry.getKey(), entry.getValue(), empId);
                imported++;
            }

            response.setFlag(true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Scorecard bulk import failed", e);
            response.setFlag(false);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void importDeptGroup(String deptUniqueId, List<Map<String, Object>> deptRows, Long empId) {
        Map<String, Object> firstRow = deptRows.get(0);
        String scorecardName = cell(firstRow, "ScoreCardName", "Scorecard Name", "ScorecardName", "Score Card Name", "Department");
        Long deptIdLong = resolveDeptId(deptUniqueId);
        if (deptIdLong == null) {
            log.warn("Skipping scorecard {} — department not found for id {}", scorecardName, deptUniqueId);
            return;
        }

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

        Map<String, Object> v2Scorecard = new HashMap<>();
        v2Scorecard.put("pageId", pageId);
        v2Scorecard.put("name", scorecardName);
        v2Scorecard.put("description", cell(firstRow, "Scorecard Description", "ScorecardDescription"));
        v2Scorecard.put("ownerId", empId);
        v2Scorecard.put("departmentId", deptIdLong);
        v2Scorecard.put("createdBy", empId);
        v2Scorecard.put("classificationType", "THREE_COLOR");
        long v2ScorecardId = scorecardCrudService.createScorecard(v2Scorecard);

        Map<String, List<Map<String, Object>>> byPerspective = new LinkedHashMap<>();
        for (Map<String, Object> r : deptRows) {
            String pName = cell(r, "Perspective Name", "PerspectiveName", "Perspective");
            byPerspective.computeIfAbsent(pName != null ? pName : "Perspective", k -> new ArrayList<>()).add(r);
        }

        int perspectiveOrder = 1;
        for (Map.Entry<String, List<Map<String, Object>>> pEntry : byPerspective.entrySet()) {
            List<Map<String, Object>> pRows = pEntry.getValue();
            Map<String, Object> pFirstRow = pRows.get(0);

            Map<String, Object> v2Perspective = new HashMap<>();
            v2Perspective.put("scorecardId", v2ScorecardId);
            v2Perspective.put("name", pEntry.getKey());
            v2Perspective.put("description", cell(pFirstRow, "Perspective Description", "PerspectiveDescription"));
            v2Perspective.put("weight", pFirstRow.get("Perspective Weight"));
            v2Perspective.put("displayOrder", perspectiveOrder++);
            long v2PerspectiveId = scorecardCrudService.createPerspective(v2Perspective);

            Map<String, List<Map<String, Object>>> byObjective = new LinkedHashMap<>();
            for (Map<String, Object> pr : pRows) {
                String oName = cell(pr, "Objective Name", "ObjectiveName", "Objective");
                byObjective.computeIfAbsent(oName != null ? oName : "Objective", k -> new ArrayList<>()).add(pr);
            }

            int objectiveOrder = 1;
            for (Map.Entry<String, List<Map<String, Object>>> oEntry : byObjective.entrySet()) {
                List<Map<String, Object>> oRows = oEntry.getValue();
                Map<String, Object> oFirstRow = oRows.get(0);

                Map<String, Object> v2Objective = new HashMap<>();
                v2Objective.put("perspectiveId", v2PerspectiveId);
                v2Objective.put("name", oEntry.getKey());
                v2Objective.put("description", cell(oFirstRow, "Objective Description", "ObjectiveDescription"));
                v2Objective.put("weight", oFirstRow.get("Objective Weight"));
                v2Objective.put("displayOrder", objectiveOrder++);
                long v2ObjectiveId = scorecardCrudService.createObjective(v2Objective);

                int kpiOrder = 1;
                for (Map<String, Object> kr : oRows) {
                    Map<String, Object> v2Kpi = new HashMap<>();
                    v2Kpi.put("objectiveId", v2ObjectiveId);
                    v2Kpi.put("code", cell(kr, "KPI ID", "KPIID", "Kpi ID"));
                    v2Kpi.put("name", cell(kr, "KPI  NAME", "KPI Name", "KPI NAME", "Kpi Name", "KPI"));
                    v2Kpi.put("description", cell(kr, "KPI Description", "KPIDescription"));

                    String uom = cell(kr, "UoM", "UOM", "Unit");
                    String dataType = "NUMBER";
                    String currencyCode = null;
                    if (uom != null) {
                        String lower = uom.toLowerCase();
                        if (lower.contains("%") || lower.contains("percent")) {
                            dataType = "PERCENTAGE";
                        } else if (lower.contains("$") || lower.contains("currency")
                                || lower.contains("usd") || lower.contains("rm")) {
                            dataType = "CURRENCY";
                            currencyCode = "USD";
                        }
                    }
                    v2Kpi.put("dataType", dataType);
                    v2Kpi.put("currencyCode", currencyCode);

                    String formatStr = cell(kr, "Format");
                    String polarity = (formatStr != null && formatStr.toLowerCase().contains("lower"))
                            ? "LOWER" : "HIGHER";
                    v2Kpi.put("direction", polarity); // ScCrudService expects 'direction' not 'polarity'
                    v2Kpi.put("weight", kr.get("KPI Weight"));
                    v2Kpi.put("measurementFrequency", cell(kr, "Measurement Frequency", "MeasurementFrequency", "Period Type"));
                    
                    Object targetObj = kr.get("Yearly Target (sum of quarterly Targets)");
                    if (targetObj == null) targetObj = kr.get("Target");
                    if (targetObj == null) targetObj = kr.get("TARGET");
                    v2Kpi.put("targetValue", targetObj);
                    
                    v2Kpi.put("displayOrder", kpiOrder++);
                    scorecardCrudService.createKpi(v2Kpi);
                }
            }
        }

        saveLegacyMetadataOnly(scorecardName, deptIdLong, deptUniqueId, pageId, empId, firstRow);
        log.info("Imported scorecard '{}' for dept {} (pageId={})", scorecardName, deptUniqueId, pageId);
    }

    /** Optional row in score_card_details for legacy endpoints — no perspective tree (avoids objectives table). */
    private void saveLegacyMetadataOnly(String scorecardName, Long deptIdLong, String deptUniqueId,
                                        Long pageId, Long empId, Map<String, Object> firstRow) {
        try {
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
            detailsMap.put("scorecardDescription", cell(firstRow, "Scorecard Description", "ScorecardDescription"));
            detailsMap.put("departmentId", deptUniqueId);
            detailsDTO.setScoreCardDetailsValue(detailsMap);
            detailsDTO.setScoreCardDTOS(null);
            scoreCardDetailsService.save(detailsDTO);
        } catch (Exception ex) {
            log.warn("score_card_details metadata skipped for {}: {}", scorecardName, ex.getMessage());
        }
    }

    private Long resolveEmpId() {
        String raw = UserThreadLocal.get("LOGGED_IN_EMPLOYEE_ID");
        if (raw != null && !raw.isBlank()) {
            try {
                return Long.valueOf(raw);
            } catch (NumberFormatException ignored) {
                // fall through
            }
        }
        return 1L;
    }

    private Long resolveDeptId(String deptUniqueId) {
        try {
            return Long.valueOf(deptUniqueId);
        } catch (NumberFormatException e) {
            DepartmentChartMapping chartMapping = departmentChartMappingRepository.findByDeptUniqueId(deptUniqueId);
            return chartMapping != null ? chartMapping.getDeptId() : null;
        }
    }

    private static String cell(Map<String, Object> row, String... names) {
        if (row == null) {
            return null;
        }
        for (String name : names) {
            Object direct = row.get(name);
            if (direct != null && !String.valueOf(direct).isBlank() && !"null".equalsIgnoreCase(String.valueOf(direct))) {
                return String.valueOf(direct).trim();
            }
        }
        String normTarget = names[0].toLowerCase().replaceAll("[\\s_-]", "");
        for (Map.Entry<String, Object> e : row.entrySet()) {
            if (e.getKey() == null || e.getValue() == null) {
                continue;
            }
            String normKey = e.getKey().toLowerCase().replaceAll("[\\s_-]", "");
            for (String name : names) {
                if (normKey.equals(name.toLowerCase().replaceAll("[\\s_-]", ""))) {
                    String val = String.valueOf(e.getValue()).trim();
                    if (!val.isBlank() && !"null".equalsIgnoreCase(val)) {
                        return val;
                    }
                }
            }
        }
        return null;
    }
}
