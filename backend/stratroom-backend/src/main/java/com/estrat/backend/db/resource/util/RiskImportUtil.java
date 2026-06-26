package com.estrat.backend.db.resource.util;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.PagesDetails;
import com.estrat.backend.db.bean.po.RiskDetails;
import com.estrat.backend.db.dto.PageDTO;
import com.estrat.backend.db.dto.RiskDTO;
import com.estrat.backend.db.dto.ScoreCardResponseDTO;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.DepartmentDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.PageService;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.service.RiskDetailsService;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RiskImportUtil {

    @Autowired
    private RiskDetailsService riskDetailsService;
    @Autowired
    private RiskUtil riskUtil;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    private PageService pageService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentChartMappingRepository departmentChartMappingRepository;

    public Map<String, Object> importRisk(InputStream inputStream, String type, String filename) throws IOException {
        String mode = type == null ? "validation" : type.trim().toLowerCase(Locale.ROOT);
        List<ImportRow> rows = parseFile(inputStream, filename);
        List<Map<String, Object>> errors = validateRows(rows);
        if (!errors.isEmpty()) {
            Map<String, Object> result = new HashMap<>();
            result.put("parsingError", errors);
            result.put("result", "Not-Success");
            return result;
        }
        if ("validation".equals(mode)) {
            Map<String, Object> result = new HashMap<>();
            result.put("result", "success");
            result.put("rowCount", rows.size());
            return result;
        }
        int saved = saveRows(rows);
        auditService.saveAudit("Risk", 0L, loggedInEmpId(), "Bulk risk import (" + saved + " rows)");
        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("message", saved + " risk(s) imported");
        result.put("saved", saved);
        return result;
    }

    private int saveRows(List<ImportRow> rows) {
        long defaultEmpId = loggedInEmpId();
        Map<String, Long> pageCache = new HashMap<>();
        int saved = 0;
        String datePeriod = UserThreadLocal.get("DATE_PERIOD");
        for (ImportRow row : rows) {
            long ownerEmpId = resolveOwnerEmpId(row, defaultEmpId);
            Long deptId = resolveDepartmentId(ownerEmpId, row);
            long pageId = resolveRiskPageId(ownerEmpId, row, deptId, pageCache);
            if (StringUtils.isBlank(row.dateRaised)) {
                row.dateRaised = todayLabel();
            }

            RiskDTO dto = new RiskDTO();
            dto.setCreatedBy(ownerEmpId);
            dto.setOwner(ownerEmpId);
            dto.setPageId(pageId);
            dto.setDepartmentId(deptId);
            Map<String, Object> rv = new HashMap<>();
            rv.put("name", row.name);
            rv.put("desc", row.description);
            rv.put("department", row.department);
            rv.put("riskcategory", row.category);
            rv.put("impact", row.impact);
            rv.put("likeliHood", row.likelihood);
            rv.put("score", row.score);
            rv.put("riskStatus", StringUtils.defaultIfBlank(row.status, row.score));
            rv.put("dateRaised", row.dateRaised);
            rv.put("dateCompleted", row.dateCompleted);
            rv.put("ownerName", StringUtils.defaultIfBlank(row.owner, String.valueOf(ownerEmpId)));
            if (StringUtils.isNotBlank(datePeriod)) {
                rv.put("dateRange", datePeriod);
            }
            dto.setRiskValue(rv);
            riskUtil.populateAddtionalDetails(dto, false);
            RiskDetails entity = new RiskDetails(riskUtil.formatDateSave(dto));
            entity.setCreatedTime(LocalDateTime.now());
            entity.setVersion(0L);
            entity.setStatus("DRAFT");
            riskDetailsService.save(entity);
            saved++;
        }
        return saved;
    }

    private long resolveOwnerEmpId(ImportRow row, long defaultEmpId) {
        if (StringUtils.isNotBlank(row.owner)) {
            Employee owner = employeeService.getEmployeeIDByEmail(row.owner.trim());
            if (owner == null) {
                owner = employeeService.resolveEmployeeForImport(row.owner.trim());
            }
            if (owner != null) {
                return owner.getEmpId();
            }
        }
        if (StringUtils.isNotBlank(row.sheetOwner)) {
            Employee sheetOwner = employeeService.resolveEmployeeForImport(row.sheetOwner.trim());
            if (sheetOwner != null) {
                return sheetOwner.getEmpId();
            }
        }
        return defaultEmpId;
    }

    private Long resolveDepartmentId(long ownerEmpId, ImportRow row) {
        if (StringUtils.isNotBlank(row.deptUniqueId)) {
            String uniqueId = row.deptUniqueId.trim();
            DepartmentChartMapping chartDept = this.departmentChartMappingRepository.findByDeptUniqueId(uniqueId);
            if (chartDept != null && chartDept.getDeptId() != null) {
                row.department = chartDept.getDeptName();
                return chartDept.getDeptId();
            }
            long orgId = loggedInOrgId(ownerEmpId);
            if (orgId > 0L) {
                var dept = departmentDetailsService.findByDeptUniqueId(orgId, uniqueId);
                if (dept != null && dept.getId() > 0L) {
                    row.department = dept.getName();
                    return dept.getId();
                }
            }
        }
        if (StringUtils.isNotBlank(row.department)) {
            var dept = departmentDetailsService.findByName(row.department.trim());
            if (dept != null) {
                return dept.getId();
            }
        }
        String headerDept = UserThreadLocal.get("LOGGED_IN_DEPT_ID");
        if (StringUtils.isNumeric(headerDept)) {
            return Long.parseLong(headerDept);
        }
        try {
            Employee profile = employeeService.getProfileDetails(ownerEmpId);
            if (profile != null && profile.getDeptDetails() != null) {
                row.department = profile.getDeptDetails().getName();
                return profile.getDeptDetails().getId();
            }
        } catch (Exception ignored) {
            // fall through
        }
        return pageService.getDeptId(ownerEmpId);
    }

    private long resolveRiskPageId(long ownerEmpId, ImportRow row, Long deptId, Map<String, Long> pageCache) {
        String pageName = StringUtils.isNotBlank(row.pageName) ? row.pageName.trim() : "Risk Register";
        String cacheKey = ownerEmpId + "#" + pageName;
        Long cached = pageCache.get(cacheKey);
        if (cached != null) {
            return cached;
        }
        Optional<PagesDetails> existing = pageService.findByName(pageName, ownerEmpId);
        if (existing.isPresent()) {
            pageCache.put(cacheKey, existing.get().getId());
            return existing.get().getId();
        }
        if (StringUtils.isBlank(row.pageName)) {
            List<PageDTO> pages = pageService.findAll(ownerEmpId, "RISK");
            if (pages != null && !pages.isEmpty()) {
                pageCache.put(cacheKey, pages.get(0).getId());
                return pages.get(0).getId();
            }
        }
        PageDTO pageDTO = new PageDTO();
        pageDTO.setPageName(pageName);
        pageDTO.setCreatedBy(ownerEmpId);
        pageDTO.setPageType("Risk");
        pageDTO.setCreatedTime(LocalDateTime.now());
        if (deptId != null) {
            pageDTO.setDeptId(deptId);
        }
        PagesDetails pagesDetails = new PagesDetails(pageDTO);
        if (pagesDetails.getDeptId() == null) {
            pagesDetails.setDeptId(pageService.getDeptId(ownerEmpId));
        }
        pagesDetails.setCreatedTime(LocalDateTime.now());
        ScoreCardResponseDTO response = pageService.save(pagesDetails);
        long pageId = response.getPageDTO().getId();
        pageCache.put(cacheKey, pageId);
        return pageId;
    }

    private long loggedInOrgId() {
        return loggedInOrgId(loggedInEmpId());
    }

    private long loggedInOrgId(long empId) {
        String orgId = UserThreadLocal.get("USER_ORG_ID");
        if (StringUtils.isNumeric(orgId)) {
            return Long.parseLong(orgId);
        }
        if (empId > 0L) {
            try {
                Employee profile = employeeService.getProfileDetails(empId);
                if (profile != null && profile.getOrgDetails() != null) {
                    return profile.getOrgDetails().getOrgId();
                }
            } catch (Exception ignored) {
                // fall through
            }
        }
        return 0L;
    }

    private String todayLabel() {
        return new SimpleDateFormat("MMM dd, yyyy").format(new Date());
    }

    private List<Map<String, Object>> validateRows(List<ImportRow> rows) {
        List<Map<String, Object>> errors = new ArrayList<>();
        if (rows.isEmpty()) {
            errors.add(error("File has no risk rows to import", "", "1"));
            return errors;
        }
        for (ImportRow row : rows) {
            if (StringUtils.isBlank(row.name)) {
                errors.add(error("Risk name is required", row.sheetName, String.valueOf(row.rowNum)));
            }
            if (row.legacyFormat && StringUtils.isBlank(row.pageName)) {
                errors.add(error("Risk page name is required in column B", row.sheetName, String.valueOf(row.rowNum)));
            }
        }
        return errors;
    }

    private Map<String, Object> error(String message, String sheet, String rowNo) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("error", message);
        map.put("Excel_SheetName", StringUtils.defaultString(sheet, "Import"));
        map.put("rowNo", rowNo);
        return map;
    }

    private List<ImportRow> parseFile(InputStream inputStream, String filename) throws IOException {
        String lower = filename == null ? "" : filename.toLowerCase(Locale.ROOT);
        if (lower.endsWith(".csv")) {
            return parseCsv(inputStream);
        }
        return parseWorkbook(inputStream);
    }

    private List<ImportRow> parseCsv(InputStream inputStream) throws IOException {
        List<ImportRow> rows = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            String headerLine = reader.readLine();
            if (headerLine == null) {
                return rows;
            }
            Map<String, Integer> columns = mapHeaders(splitCsvLine(headerLine));
            String line;
            int rowNum = 1;
            while ((line = reader.readLine()) != null) {
                rowNum++;
                if (StringUtils.isBlank(line)) {
                    continue;
                }
                List<String> cells = splitCsvLine(line);
                ImportRow row = rowFromCells(columns, cells, "CSV", rowNum);
                if (row.hasContent()) {
                    rows.add(row);
                }
            }
        }
        return rows;
    }

    private List<ImportRow> parseWorkbook(InputStream inputStream) throws IOException {
        List<ImportRow> rows = new ArrayList<>();
        DataFormatter formatter = new DataFormatter();
        try (Workbook workbook = WorkbookFactory.create(inputStream)) {
            for (int s = 0; s < workbook.getNumberOfSheets(); s++) {
                Sheet sheet = workbook.getSheetAt(s);
                if (sheet == null || "Dict".equalsIgnoreCase(sheet.getSheetName())) {
                    continue;
                }
                Row header = sheet.getRow(0);
                if (header == null) {
                    continue;
                }
                if (isLegacyRiskSheet(header, formatter)) {
                    rows.addAll(parseLegacySheet(sheet, formatter));
                    continue;
                }
                Map<String, Integer> columns = mapHeaders(readRow(header, formatter));
                if (!columns.containsKey("name")) {
                    continue;
                }
                for (int r = 1; r <= sheet.getLastRowNum(); r++) {
                    Row dataRow = sheet.getRow(r);
                    if (dataRow == null || isEmptyRow(dataRow, formatter)) {
                        continue;
                    }
                    ImportRow row = rowFromCells(columns, readRow(dataRow, formatter), sheet.getSheetName(), r + 1);
                    if (row.hasContent()) {
                        rows.add(row);
                    }
                }
            }
        }
        return rows;
    }

    private boolean isLegacyRiskSheet(Row header, DataFormatter formatter) {
        String c2 = cellText(header.getCell(2), formatter);
        return "Risk Name".equalsIgnoreCase(c2) || "RiskName".equalsIgnoreCase(c2);
    }

    private List<ImportRow> parseLegacySheet(Sheet sheet, DataFormatter formatter) {
        List<ImportRow> rows = new ArrayList<>();
        String sheetOwner = sheet.getSheetName();
        for (int r = 1; r <= sheet.getLastRowNum(); r++) {
            Row row = sheet.getRow(r);
            if (row == null || isEmptyRow(row, formatter)) {
                continue;
            }
            String name = cellText(row.getCell(2), formatter);
            if (StringUtils.isBlank(name)) {
                continue;
            }
            ImportRow importRow = new ImportRow();
            importRow.legacyFormat = true;
            importRow.sheetName = sheet.getSheetName();
            importRow.sheetOwner = sheetOwner;
            importRow.rowNum = r + 1;
            importRow.deptUniqueId = cellText(row.getCell(0), formatter);
            importRow.pageName = cellText(row.getCell(1), formatter);
            importRow.name = name.trim();
            importRow.description = cellText(row.getCell(3), formatter);
            importRow.likelihood = cellText(row.getCell(4), formatter);
            importRow.impact = cellText(row.getCell(5), formatter);
            importRow.score = cellText(row.getCell(6), formatter);
            importRow.category = cellText(row.getCell(8), formatter);
            importRow.status = cellText(row.getCell(9), formatter);
            importRow.dateRaised = cellText(row.getCell(10), formatter);
            importRow.dateCompleted = cellText(row.getCell(11), formatter);
            importRow.owner = cellText(row.getCell(12), formatter);
            importRow.department = cellText(row.getCell(13), formatter);
            rows.add(importRow);
        }
        return rows;
    }

    private ImportRow rowFromCells(Map<String, Integer> columns, List<String> cells, String sheetName, int rowNum) {
        ImportRow row = new ImportRow();
        row.sheetName = sheetName;
        row.rowNum = rowNum;
        row.name = value(columns, cells, "name");
        row.description = value(columns, cells, "description");
        row.deptUniqueId = value(columns, cells, "departmentid");
        row.pageName = value(columns, cells, "pagename");
        row.department = value(columns, cells, "department");
        row.category = value(columns, cells, "category");
        row.impact = value(columns, cells, "impact");
        row.likelihood = value(columns, cells, "likelihood");
        row.score = value(columns, cells, "score");
        row.status = value(columns, cells, "status");
        row.dateRaised = value(columns, cells, "dateraised");
        row.dateCompleted = value(columns, cells, "datecompleted");
        row.owner = value(columns, cells, "owner");
        return row;
    }

    private String value(Map<String, Integer> columns, List<String> cells, String key) {
        Integer idx = columns.get(key);
        if (idx == null || idx < 0 || idx >= cells.size()) {
            return "";
        }
        return StringUtils.trimToEmpty(cells.get(idx));
    }

    private Map<String, Integer> mapHeaders(List<String> headers) {
        Map<String, Integer> map = new HashMap<>();
        for (int i = 0; i < headers.size(); i++) {
            String normalized = normalizeHeader(headers.get(i));
            if (StringUtils.isNotBlank(normalized) && !map.containsKey(normalized)) {
                map.put(normalized, i);
            }
        }
        return map;
    }

    private String normalizeHeader(String header) {
        String key = StringUtils.trimToEmpty(header).toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]", "");
        if ("riskname".equals(key) || "name".equals(key)) return "name";
        if ("description".equals(key) || "desc".equals(key)) return "description";
        if ("department".equals(key) || "departmentname".equals(key)) return "department";
        if ("departmentid".equals(key) || "deptid".equals(key) || "deptuniqueid".equals(key)) return "departmentid";
        if ("pagename".equals(key) || "page".equals(key)) return "pagename";
        if ("category".equals(key) || "riskcategory".equals(key)) return "category";
        if ("impact".equals(key)) return "impact";
        if ("likelihood".equals(key) || "likeliHood".equalsIgnoreCase(header)) return "likelihood";
        if ("score".equals(key) || "riskscore".equals(key)) return "score";
        if ("status".equals(key) || "riskstatus".equals(key)) return "status";
        if ("dateraised".equals(key)) return "dateraised";
        if ("datecompleted".equals(key)) return "datecompleted";
        if ("owner".equals(key) || "ownername".equals(key)) return "owner";
        if ("id".equals(key)) return "id";
        return key;
    }

    private List<String> readRow(Row row, DataFormatter formatter) {
        List<String> values = new ArrayList<>();
        short last = row.getLastCellNum();
        for (int i = 0; i < last; i++) {
            values.add(cellText(row.getCell(i), formatter));
        }
        return values;
    }

    private String cellText(Cell cell, DataFormatter formatter) {
        if (cell == null || cell.getCellType() == CellType.BLANK) {
            return "";
        }
        return StringUtils.trimToEmpty(formatter.formatCellValue(cell));
    }

    private boolean isEmptyRow(Row row, DataFormatter formatter) {
        for (int i = row.getFirstCellNum(); i < row.getLastCellNum(); i++) {
            if (StringUtils.isNotBlank(cellText(row.getCell(i), formatter))) {
                return false;
            }
        }
        return true;
    }

    private List<String> splitCsvLine(String line) {
        List<String> cells = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;
        for (int i = 0; i < line.length(); i++) {
            char ch = line.charAt(i);
            if (ch == '"') {
                if (inQuotes && i + 1 < line.length() && line.charAt(i + 1) == '"') {
                    current.append('"');
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (ch == ',' && !inQuotes) {
                cells.add(current.toString());
                current.setLength(0);
            } else {
                current.append(ch);
            }
        }
        cells.add(current.toString());
        return cells;
    }

    private long loggedInEmpId() {
        String empId = UserThreadLocal.get("LOGGED_IN_EMPLOYEE_ID");
        if (StringUtils.isBlank(empId)) {
            empId = UserThreadLocal.get("SUPER_USER_ID");
        }
        return StringUtils.isNumeric(empId) ? Long.parseLong(empId) : 0L;
    }

    private static final class ImportRow {
        private boolean legacyFormat;
        private String sheetName;
        private String sheetOwner;
        private int rowNum;
        private String deptUniqueId;
        private String pageName;
        private String name;
        private String description;
        private String department;
        private String category;
        private String impact;
        private String likelihood;
        private String score;
        private String status;
        private String dateRaised;
        private String dateCompleted;
        private String owner;

        private boolean hasContent() {
            return StringUtils.isNotBlank(name)
                || StringUtils.isNotBlank(description)
                || StringUtils.isNotBlank(department);
        }
    }
}
