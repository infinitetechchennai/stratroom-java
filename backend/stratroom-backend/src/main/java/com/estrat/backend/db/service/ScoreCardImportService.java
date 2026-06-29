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

        // All rows are on a single sheet — group by Perspective then Objective then KPI
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
            v2Perspective.put("code", cell(pFirstRow, "Perspective ID", "PerspectiveID"));
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
                v2Objective.put("code", cell(oFirstRow, "ObJective ID", "Objective ID", "ObjectiveID"));
                v2Objective.put("name", oEntry.getKey());
                v2Objective.put("description", cell(oFirstRow, "Objective Description", "ObjectiveDescription"));
                v2Objective.put("weight", oFirstRow.get("Objective Weight"));
                v2Objective.put("displayOrder", objectiveOrder++);
                long v2ObjectiveId = scorecardCrudService.createObjective(v2Objective);

                // Group rows by KPI name (each row is one KPI + optional SubKPI in same row)
                Map<String, List<Map<String, Object>>> byKpi = new LinkedHashMap<>();
                for (Map<String, Object> or : oRows) {
                    String kName = cell(or, "KPI  NAME", "KPI Name", "KPI NAME", "Kpi Name", "KPI");
                    byKpi.computeIfAbsent(kName != null ? kName : "KPI", k -> new ArrayList<>()).add(or);
                }

                int kpiOrder = 1;
                for (Map.Entry<String, List<Map<String, Object>>> kEntry : byKpi.entrySet()) {
                    List<Map<String, Object>> kRows = kEntry.getValue();
                    Map<String, Object> kFirstRow = kRows.get(0);

                    // Resolve KPI DataType from 'DataType' column (Percentage / Currency / Number)
                    String dataTypeRaw = cell(kFirstRow, "DataType", "Data Type", "UoM", "UOM", "Unit");
                    String kpiDataType = resolveDataType(dataTypeRaw);
                    String kpiCurrencyCode = resolveCurrency(kFirstRow, dataTypeRaw, "Currency");

                    Map<String, Object> v2Kpi = new HashMap<>();
                    v2Kpi.put("objectiveId", v2ObjectiveId);
                    String kpiCode = cell(kFirstRow, "KPI ID", "KPIID", "Kpi ID");
                    v2Kpi.put("code", kpiCode);
                    v2Kpi.put("name", kEntry.getKey());
                    v2Kpi.put("description", cell(kFirstRow, "KPI Description", "KPIDescription"));
                    v2Kpi.put("dataType", kpiDataType);
                    v2Kpi.put("currencyCode", kpiCurrencyCode);
                    // KPIType column: Lead / Lag — maps to indicatorType
                    v2Kpi.put("indicatorType", cell(kFirstRow, "KPIType", "KPI Type"));
                    // Direction: HIGHER is default; only use LOWER if KPIType or Format says so
                    v2Kpi.put("direction", "HIGHER");
                    v2Kpi.put("weight", kFirstRow.get("KPI Weight"));
                    v2Kpi.put("measurementFrequency", cell(kFirstRow, "Measurement Frequency", "MeasurementFrequency", "Period Type"));
                    v2Kpi.put("targetValue", null); // no explicit target in this file
                    v2Kpi.put("displayOrder", kpiOrder++);
                    long v2KpiId = scorecardCrudService.createKpi(v2Kpi);
                    log.info("Imported KPI '{}' (id={}) under objective '{}'", kEntry.getKey(), v2KpiId, oEntry.getKey());

                    // SubKPI is on the SAME ROW as the parent KPI
                    // Column names: "SubKPI  NAME" (double-space), "SubKPI ID", "SubKPI Weight",
                    //               "SubMeasurement Frequency", "SubDataType", "Sub Currency", "SubKPIType"
                    int subKpiOrder = 1;
                    for (Map<String, Object> subRow : kRows) {
                        String skName = cell(subRow, "SubKPI  NAME", "SubKPI NAME", "SubKPI Name", "Sub-KPI Name", "Sub KPI Name");
                        if (skName == null || skName.isBlank()) continue;

                        String subDataTypeRaw = cell(subRow, "SubDataType", "Sub DataType", "SubKPI DataType");
                        String subDataType = resolveDataType(subDataTypeRaw);
                        String subCurrency = resolveCurrency(subRow, subDataTypeRaw, "Sub Currency", "SubCurrency");

                        Map<String, Object> v2SubKpi = new HashMap<>();
                        v2SubKpi.put("kpiId", v2KpiId);
                        v2SubKpi.put("code", cell(subRow, "SubKPI ID", "Sub-KPI ID", "Sub KPI ID"));
                        v2SubKpi.put("name", skName);
                        v2SubKpi.put("dataType", subDataType);
                        v2SubKpi.put("weight", subRow.get("SubKPI Weight"));
                        v2SubKpi.put("targetValue", null);
                        v2SubKpi.put("indicatorType", cell(subRow, "SubKPIType", "SubKPI Type"));
                        v2SubKpi.put("direction", "HIGHER");
                        v2SubKpi.put("displayOrder", subKpiOrder++);
                        scorecardCrudService.createSubKpi(v2SubKpi);
                        log.info("  → SubKPI '{}' under KPI '{}'", skName, kEntry.getKey());
                    }
                }
            }
        }

        saveLegacyMetadataOnly(scorecardName, deptIdLong, deptUniqueId, pageId, empId, firstRow);
        log.info("Completed scorecard '{}' for dept {}", scorecardName, deptUniqueId);
    }

    /** Map DataType string from Excel (Percentage / Currency / Number / Text) to system enum. */
    private static String resolveDataType(String raw) {
        if (raw == null) return "NUMBER";
        String l = raw.toLowerCase();
        if (l.contains("percent") || l.contains("%")) return "PERCENTAGE";
        if (l.contains("currency") || l.contains("$") || l.contains("usd") || l.contains("rm")) return "CURRENCY";
        return "NUMBER";
    }

    /** Extract currency code from the row if dataType is CURRENCY. */
    private static String resolveCurrency(Map<String, Object> row, String dataTypeRaw, String... currencyCols) {
        if (dataTypeRaw == null) return null;
        if (!dataTypeRaw.toLowerCase().contains("currency") && !dataTypeRaw.toLowerCase().contains("$")) return null;
        for (String col : currencyCols) {
            Object v = row.get(col);
            if (v != null && !String.valueOf(v).isBlank() && !"null".equalsIgnoreCase(String.valueOf(v))) {
                return String.valueOf(v).trim();
            }
        }
        return "USD";
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
