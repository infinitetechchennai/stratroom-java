/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.KPIResponseDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.RiskActivitiesDTO
 *  com.estrat.web.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.web.dto.RiskCommentsDTO
 *  com.estrat.web.dto.RiskConsequenceDTO
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.RiskMonitoringDTO
 *  com.estrat.web.dto.RiskPlanDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.KPIService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.RiskActivitiesService
 *  com.estrat.web.service.RiskCauseAndConsequenceService
 *  com.estrat.web.service.RiskCommentsService
 *  com.estrat.web.service.RiskDetailsService
 *  com.estrat.web.service.RiskPlanService
 *  com.estrat.web.util.RiskReaderUtil
 *  com.estrat.web.util.RiskUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.apache.poi.ss.usermodel.Cell
 *  org.apache.poi.ss.usermodel.CellStyle
 *  org.apache.poi.ss.usermodel.CellType
 *  org.apache.poi.ss.usermodel.CreationHelper
 *  org.apache.poi.ss.usermodel.DataFormatter
 *  org.apache.poi.ss.usermodel.Font
 *  org.apache.poi.ss.usermodel.IndexedColors
 *  org.apache.poi.ss.usermodel.Row
 *  org.apache.poi.ss.usermodel.Sheet
 *  org.apache.poi.xssf.usermodel.XSSFFormulaEvaluator
 *  org.apache.poi.xssf.usermodel.XSSFRow
 *  org.apache.poi.xssf.usermodel.XSSFSheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.core.io.ByteArrayResource
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.MediaType
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Component
 *  org.springframework.util.MultiValueMap
 */
package com.estrat.web.util;

import com.estrat.web.dto.ControlPanelGeneralDTO;
import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.Employee;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.KPIResponseDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.RiskActivitiesDTO;
import com.estrat.web.dto.RiskCauseAndConsequenceDTO;
import com.estrat.web.dto.RiskCommentsDTO;
import com.estrat.web.dto.RiskConsequenceDTO;
import com.estrat.web.dto.RiskDTO;
import com.estrat.web.dto.RiskMonitoringDTO;
import com.estrat.web.dto.RiskPlanDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.KPIService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.RiskActivitiesService;
import com.estrat.web.service.RiskCauseAndConsequenceService;
import com.estrat.web.service.RiskCommentsService;
import com.estrat.web.service.RiskDetailsService;
import com.estrat.web.service.RiskPlanService;
import com.estrat.web.util.RiskUtil;
import com.estrat.web.util.UserThreadLocal;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFFormulaEvaluator;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;

/*
 * Exception performing whole class analysis ignored.
 */
@Component
public class RiskReaderUtil {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private PageService pageService;
    @Autowired
    private RiskDetailsService riskDetailsService;
    @Autowired
    private RiskPlanService riskPlanService;
    @Autowired
    private RiskCauseAndConsequenceService riskCauseAndConsequenceService;
    @Autowired
    private RiskActivitiesService riskActivitiesService;
    @Autowired
    private RiskUtil riskUtil;
    @Autowired
    private ControlPanelGeneralService panelGeneralService;
    @Autowired
    private RiskCommentsService riskCommentsService;
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected AuditTrailService auditTrailService;
    private Logger logger = LoggerFactory.getLogger(RiskReaderUtil.class);

    private static boolean isRowEmpty(XSSFRow row) {
        boolean isEmpty = true;
        DataFormatter dataFormatter = new DataFormatter();
        if (row != null) {
            for (Cell cell : row) {
                if (dataFormatter.formatCellValue(cell).trim().length() <= 0) continue;
                isEmpty = false;
                break;
            }
        }
        return isEmpty;
    }

    public Map importRisk(InputStream inputStream, String type) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            if (type.equals("validation")) {
                resultMap = this.checkValidationForExcelSheet(myExcelBook);
            } else {
                resultMap = this.importRiskData(myExcelBook);
                this.auditTrailService.save("Excel - Risk Upload");
            }
        }
        catch (Exception e) {
            this.logger.error("Exception occured", (Throwable)e);
        }
        return resultMap;
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public Map checkValidationForExcelSheet(XSSFWorkbook myExcelBook) {
        XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
        evaluator.evaluateAll();
        HashMap resultMap = new HashMap();
        HashMap stringMap = null;
        ArrayList mapList = new ArrayList();
        Map kpiMap = null;
        try {
            int sheetIndex = 0;
            while (true) {
                block62: {
                    int totalRows;
                    String excelSheetName;
                    XSSFSheet ExcelSheet;
                    block64: {
                        block60: {
                            block63: {
                                block61: {
                                    if (sheetIndex >= myExcelBook.getNumberOfSheets()) break block60;
                                    ExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                                    if (ExcelSheet != null) break block61;
                                    this.logger.debug("Sheet not found");
                                    break block62;
                                }
                                excelSheetName = ExcelSheet.getSheetName();
                                if ("Dict".equalsIgnoreCase(excelSheetName)) break block62;
                                XSSFRow row1 = ExcelSheet.getRow(0);
                                if (!row1.getCell(2).getStringCellValue().trim().equals("Risk Name") && !row1.getCell(2).getStringCellValue().trim().equals("RiskName")) break block63;
                                totalRows = ExcelSheet.getPhysicalNumberOfRows();
                                if (totalRows != 1) break block64;
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("error", "Risk Import Sheet is empty");
                                stringMap.put("rowNo", "");
                                stringMap.put("highLightcellName", "Excel-SheetName");
                                mapList.add(stringMap);
                                break block62;
                            }
                            stringMap = new HashMap();
                            stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                            stringMap.put("error", "This sheet is not a Risk sheet");
                            stringMap.put("rowNo", "");
                            stringMap.put("highLightcellName", "");
                            mapList.add(stringMap);
                            break block62;
                        }
                        if (mapList != null && !mapList.isEmpty()) {
                            resultMap.put("parsingError", mapList);
                            resultMap.put("result", "Not-Success");
                            return resultMap;
                        }
                        resultMap.put("result", "success");
                        return resultMap;
                    }
                    for (int i = 1; i < totalRows; ++i) {
                        XSSFRow row = ExcelSheet.getRow(i);
                        try {
                            EmployeeDTO employeeRequestDTO = new EmployeeDTO();
                            if (excelSheetName.contains("@")) {
                                employeeRequestDTO.setEmailAddress(excelSheetName);
                            } else {
                                employeeRequestDTO.setFirstName(excelSheetName);
                            }
                            EmployeeDTO employeeDTO = this.employeeService.getEmployeeId(employeeRequestDTO);
                            if (employeeDTO == null) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("error", "PageOwner NOT found");
                                stringMap.put("highLightcellName", "Excel-SheetName");
                                stringMap.put("rowNo", row.getCTRow().getR());
                                mapList.add(stringMap);
                            } else {
                                List kpiDTOList = ((KPIResponseDTO)this.kpiService.retrieveKpiList(String.valueOf(employeeDTO.getEmpId()), false, "").getBody()).getKpidtoList();
                                kpiMap = this.riskUtil.mapKPI(kpiDTOList);
                                kpiMap = kpiMap == null ? new HashMap() : kpiMap;
                            }
                        }
                        catch (Exception e) {
                            stringMap = new HashMap();
                            stringMap.put("Excel_SheetName", excelSheetName);
                            stringMap.put("error", e.getMessage());
                            mapList.add(stringMap);
                        }
                        try {
                            Boolean dateStatus;
                            block59: {
                                if (RiskReaderUtil.isRowEmpty((XSSFRow)row)) {
                                    this.logger.debug("Row is empty");
                                    continue;
                                }
                                ControlPanelGeneralDTO cpanel = this.panelGeneralService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                if (cpanel != null && cpanel.getImplementationType() != null && cpanel.getImplementationType().equalsIgnoreCase("department")) {
                                    if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                                        try {
                                            String deptValue = null;
                                            deptValue = row.getCell(0).getCellType() == CellType.NUMERIC ? row.getCell(0).getRawValue() : (row.getCell(0).getCellType() == CellType.STRING ? row.getCell(0).getStringCellValue().trim() : row.getCell(0).getRawValue());
                                            FindDTO findDTO = new FindDTO();
                                            findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                            findDTO.setDeptUniqueId(deptValue);
                                            DeptDetails deptDetails1 = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                                            if (Objects.nonNull(deptDetails1) && deptDetails1.getName() != null) {
                                                this.logger.debug("Department ID valid");
                                                break block59;
                                            }
                                            stringMap = new HashMap();
                                            stringMap.put("Excel_SheetName", excelSheetName);
                                            stringMap.put("error", "Department ID NOT Found : " + deptValue);
                                            stringMap.put("rowNo", row.getCTRow().getR());
                                            stringMap.put("highLightcellName", "Department ID");
                                            mapList.add(stringMap);
                                        }
                                        catch (Exception e) {
                                            stringMap = new HashMap();
                                            stringMap.put("error", e.getMessage());
                                            stringMap.put("rowNo", row.getCTRow().getR());
                                            stringMap.put("highLightcellName", "Department ID");
                                            mapList.add(stringMap);
                                        }
                                    } else {
                                        stringMap = new HashMap();
                                        stringMap.put("Excel_SheetName", excelSheetName);
                                        stringMap.put("error", "Department id is empty");
                                        stringMap.put("rowNo", row.getCTRow().getR());
                                        stringMap.put("highLightcellName", "Department ID");
                                        mapList.add(stringMap);
                                    }
                                }
                            }
                            if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "PageName is empty");
                                stringMap.put("highLightcellName", "PageName");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(2) == null || row.getCell(2).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "RiskName is empty");
                                stringMap.put("highLightcellName", "RiskName");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(4) == null || row.getCell(4).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Likelihood is empty");
                                stringMap.put("highLightcellName", "Likelihood");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(5) == null || row.getCell(5).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Impact is empty");
                                stringMap.put("highLightcellName", "Impact");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(6) == null || row.getCell(6).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Risk Category is empty");
                                stringMap.put("highLightcellName", "Risk Category");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(7) == null || row.getCell(7).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Business Impact is empty");
                                stringMap.put("highLightcellName", "Business Impact");
                                mapList.add(stringMap);
                            } else if (!kpiMap.containsKey(row.getCell(7).getStringCellValue().trim())) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Business Impact - Kpi name not present in application");
                                stringMap.put("highLightcellName", "Business Impact");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(9) == null || row.getCell(9).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Date Raised is empty");
                                stringMap.put("highLightcellName", "Data Raised");
                                mapList.add(stringMap);
                            } else if (row.getCell(10) == null || row.getCell(10).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Date Completed is empty");
                                stringMap.put("highLightcellName", "Date Completed");
                                mapList.add(stringMap);
                            } else {
                                dateStatus = this.isDateValid(row.getCell(9).getStringCellValue().trim(), row.getCell(10).getStringCellValue().trim());
                                if (!dateStatus.booleanValue()) {
                                    stringMap = new HashMap();
                                    stringMap.put("Excel_SheetName", excelSheetName);
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Must be greater than Data Raised");
                                    stringMap.put("highLightcellName", "Date Completed");
                                    mapList.add(stringMap);
                                }
                            }
                            if (row.getCell(11) == null || row.getCell(11).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Next Assessment is empty");
                                stringMap.put("highLightcellName", "Next Assessment");
                                mapList.add(stringMap);
                            } else if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK && !(dateStatus = Boolean.valueOf(this.isDateValid(row.getCell(10).getStringCellValue().trim(), row.getCell(11).getStringCellValue().trim()))).booleanValue()) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Must be greater than Date completed");
                                stringMap.put("highLightcellName", "Next Assessment");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(12) == null || row.getCell(12).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Raised By is empty");
                                stringMap.put("highLightcellName", "Raised By");
                                mapList.add(stringMap);
                            } else {
                                try {
                                    EmployeeDTO requestEmployeeDTO = new EmployeeDTO();
                                    String owner = row.getCell(12).getStringCellValue().trim();
                                    if (owner.contains("@")) {
                                        requestEmployeeDTO.setEmailAddress(ExcelSheet.getSheetName());
                                    } else {
                                        requestEmployeeDTO.setFirstName(ExcelSheet.getSheetName());
                                    }
                                    EmployeeDTO ownerDTO = this.employeeService.getEmployeeId(requestEmployeeDTO);
                                    if (Objects.isNull(ownerDTO)) {
                                        stringMap = new HashMap();
                                        stringMap.put("Excel_SheetName", excelSheetName);
                                        stringMap.put("rowNo", row.getCTRow().getR());
                                        stringMap.put("error", "Raised By NOT Found");
                                        stringMap.put("highLightcellName", "Raised By");
                                        mapList.add(stringMap);
                                    }
                                }
                                catch (Exception e) {
                                    stringMap = new HashMap();
                                    stringMap.put("Excel_SheetName", excelSheetName);
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", e.getMessage());
                                    stringMap.put("highLightcellName", "Raised By");
                                    mapList.add(stringMap);
                                }
                            }
                            if (row.getCell(13) == null || row.getCell(13).getCellType() == CellType.BLANK) continue;
                            String implemendationType = row.getCell(13).getStringCellValue().trim();
                            if (implemendationType.equalsIgnoreCase("Cause")) {
                                if (row.getCell(14) == null || row.getCell(14).getCellType() == CellType.BLANK) {
                                    stringMap = new HashMap();
                                    stringMap.put("Excel_SheetName", excelSheetName);
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Cause Name is empty");
                                    stringMap.put("highLightcellName", "Name");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(16) != null && row.getCell(16).getCellType() != CellType.BLANK) continue;
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Cause Rating is empty");
                                stringMap.put("highLightcellName", "Rating");
                                mapList.add(stringMap);
                                continue;
                            }
                            if (implemendationType.equalsIgnoreCase("Consequence")) {
                                if (row.getCell(14) == null || row.getCell(14).getCellType() == CellType.BLANK) {
                                    stringMap = new HashMap();
                                    stringMap.put("Excel_SheetName", excelSheetName);
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Consequence Name is empty");
                                    stringMap.put("highLightcellName", "Consequence Name");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(16) == null || row.getCell(16).getCellType() == CellType.BLANK) {
                                    stringMap = new HashMap();
                                    stringMap.put("Excel_SheetName", excelSheetName);
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Consequence Rating is empty");
                                    stringMap.put("highLightcellName", "Rating");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) continue;
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Consequence mapping Cause name is empty");
                                stringMap.put("highLightcellName", "Mapping Cause Name");
                                mapList.add(stringMap);
                                continue;
                            }
                            if (implemendationType.equalsIgnoreCase("Plan")) {
                                if (row.getCell(14) == null || row.getCell(14).getCellType() == CellType.BLANK) {
                                    stringMap = new HashMap();
                                    stringMap.put("Excel_SheetName", excelSheetName);
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Plan Name is empty");
                                    stringMap.put("highLightcellName", "Plan Name");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(17) == null || row.getCell(17).getCellType() == CellType.BLANK) {
                                    stringMap = new HashMap();
                                    stringMap.put("Excel_SheetName", excelSheetName);
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Plan mapping Cause name is empty");
                                    stringMap.put("highLightcellName", "Mapping Cause Name");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(19) == null || row.getCell(19).getCellType() == CellType.BLANK) {
                                    stringMap = new HashMap();
                                    stringMap.put("Excel_SheetName", excelSheetName);
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Plan Action is empty");
                                    stringMap.put("highLightcellName", "Plan Action");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(20) == null || row.getCell(20).getCellType() == CellType.BLANK) {
                                    stringMap = new HashMap();
                                    stringMap.put("Excel_SheetName", excelSheetName);
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Plan Resolved By Date is empty");
                                    stringMap.put("highLightcellName", "Plan Resolved By Date");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) continue;
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Plan Progress is empty");
                                stringMap.put("highLightcellName", "Plan Progress");
                                mapList.add(stringMap);
                                continue;
                            }
                            if (!implemendationType.equalsIgnoreCase("Action")) continue;
                            if (row.getCell(14) == null || row.getCell(14).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Action Name is empty");
                                stringMap.put("highLightcellName", "Action Name");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(20) == null || row.getCell(20).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Action Resolved By Date is empty");
                                stringMap.put("highLightcellName", "Action Resolved By Date");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(21) == null || row.getCell(21).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Action Progress is empty");
                                stringMap.put("highLightcellName", "Action Progress");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(23) == null || row.getCell(23).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Action Status is empty");
                                stringMap.put("highLightcellName", "Action Status");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(24) == null || row.getCell(24).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Action mapping Plan name is empty");
                                stringMap.put("highLightcellName", "Mapping Plan Name");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) continue;
                            stringMap = new HashMap();
                            stringMap.put("Excel_SheetName", excelSheetName);
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "Plan mapping Cause name is empty");
                            stringMap.put("highLightcellName", "Mapping Cause Name");
                            mapList.add(stringMap);
                            continue;
                        }
                        catch (Exception e) {
                            stringMap = new HashMap();
                            stringMap.put("Excel_SheetName", excelSheetName);
                            stringMap.put("error", e.getMessage());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            mapList.add(stringMap);
                        }
                    }
                }
                ++sheetIndex;
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return resultMap;
    }

    public Map importRiskData(XSSFWorkbook myExcelBook) throws IOException {
        String pageName = null;
        Long PageOwner = null;
        HashMap resultMap = new HashMap();
        int proceededdocs = 0;
        int errordocs = 0;
        int createrows = 0;
        int updatedrows = 0;
        Boolean updateStatus = false;
        Boolean createStatus = false;
        Long checkupdaterowno = null;
        Long checkcreaterowno = null;
        try {
            DataFormatter df = new DataFormatter();
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            for (int sheetIndex = 0; sheetIndex < myExcelBook.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet ExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                if (ExcelSheet == null) {
                    this.logger.debug("Sheet not found");
                    continue;
                }
                String excelSheetName = ExcelSheet.getSheetName();
                if ("Dict".equalsIgnoreCase(excelSheetName)) continue;
                int totalRows = ExcelSheet.getPhysicalNumberOfRows();
                for (int i = 1; i < totalRows; ++i) {
                    XSSFRow row;
                    block126: {
                        Map riskMap = null;
                        row = ExcelSheet.getRow(i);
                        try {
                            EmployeeDTO employeeRequestDTO = new EmployeeDTO();
                            if (ExcelSheet.getSheetName().contains("@")) {
                                employeeRequestDTO.setEmailAddress(ExcelSheet.getSheetName());
                            } else {
                                employeeRequestDTO.setFirstName(ExcelSheet.getSheetName());
                            }
                            EmployeeDTO employeeDTO = this.employeeService.getEmployeeId(employeeRequestDTO);
                            if (employeeDTO == null) {
                                this.logger.debug("invalid user");
                                ++errordocs;
                                continue;
                            }
                            PageOwner = employeeDTO.getEmpId();
                        }
                        catch (Exception e) {
                            this.logger.error("Exception occured", (Throwable)e);
                            ++errordocs;
                            continue;
                        }
                        List kpiDTOList = ((KPIResponseDTO)this.kpiService.retrieveKpiList(String.valueOf(PageOwner), false, "").getBody()).getKpidtoList();
                        Map kpiMap = this.riskUtil.mapKPI(kpiDTOList);
                        kpiMap = kpiMap == null ? new HashMap() : kpiMap;
                        HashMap<String, Map> pageMap = new HashMap<String, Map>();
                        try {
                            String implemendationType;
                            KPIDTO kpidto;
                            Long deptId;
                            Long pageId;
                            Long owner;
                            block127: {
                                if (RiskReaderUtil.isRowEmpty((XSSFRow)row)) {
                                    this.logger.debug("Row is empty");
                                    break block126;
                                }
                                owner = null;
                                pageId = null;
                                if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    continue;
                                }
                                pageName = row.getCell(1).getStringCellValue().trim();
                                if (row.getCell(12) == null || row.getCell(12).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    continue;
                                }
                                this.logger.info("owner valid");
                                deptId = null;
                                if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                                    String deptUniqueId = null;
                                    deptUniqueId = row.getCell(0).getCellType() == CellType.NUMERIC ? row.getCell(0).getRawValue() : (row.getCell(0).getCellType() == CellType.STRING ? row.getCell(0).getStringCellValue().trim() : row.getCell(0).getRawValue());
                                    FindDTO findDTO = new FindDTO();
                                    findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                    findDTO.setDeptUniqueId(deptUniqueId);
                                    DeptDetails deptDetails = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                                    if (Objects.nonNull(deptDetails) && deptDetails.getName() != null) {
                                        deptId = deptDetails.getId();
                                    }
                                }
                                if (pageName != null) {
                                    List riskList;
                                    Map response = this.pageService.checkpages(pageName, PageOwner.longValue());
                                    if (!response.containsKey("success")) {
                                        ScoreCardResponseDTO responsePage;
                                        PageDTO pageDTO1 = new PageDTO();
                                        pageDTO1.setPageName(pageName);
                                        pageDTO1.setCreatedBy(PageOwner.longValue());
                                        pageDTO1.setPageType("Risk");
                                        pageDTO1.setCreatedTime(LocalDateTime.now());
                                        if (deptId != null) {
                                            pageDTO1.setDeptId(deptId);
                                        }
                                        if (Objects.nonNull(responsePage = (ScoreCardResponseDTO)this.pageService.saveDetails(pageDTO1).getBody())) {
                                            createStatus = true;
                                            checkcreaterowno = row.getCTRow().getR();
                                            pageId = responsePage.getPageDTO().getId();
                                            riskList = this.riskDetailsService.findAll(String.valueOf(PageOwner), String.valueOf(pageId), "", "Risk");
                                            riskMap = this.riskUtil.mapPage(riskList);
                                            String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                            pageMap.put(key, riskMap);
                                        }
                                    } else {
                                        updateStatus = true;
                                        checkupdaterowno = row.getCTRow().getR();
                                        String id = response.get("pageId").toString();
                                        pageId = Long.parseLong(id);
                                        String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                        if (Objects.nonNull(pageMap.get(key))) {
                                            riskMap = (Map)pageMap.get(key);
                                        } else {
                                            riskList = this.riskDetailsService.findAll(String.valueOf(PageOwner), String.valueOf(pageId), "", "Risk");
                                            riskMap = this.riskUtil.mapPage(riskList);
                                            pageMap.put(key, riskMap);
                                        }
                                    }
                                }
                                try {
                                    EmployeeDTO requestEmployeeDTO = new EmployeeDTO();
                                    String ownerValue = row.getCell(12).getStringCellValue().trim();
                                    if (ownerValue.contains("@")) {
                                        requestEmployeeDTO.setEmailAddress(ownerValue);
                                    } else {
                                        requestEmployeeDTO.setFirstName(ownerValue);
                                    }
                                    EmployeeDTO ownerDTO = this.employeeService.getEmployeeId(requestEmployeeDTO);
                                    if (Objects.nonNull(ownerDTO)) {
                                        owner = ownerDTO.getEmpId();
                                        break block127;
                                    }
                                    ++errordocs;
                                }
                                catch (Exception e) {
                                    this.logger.error("Exception occured", (Throwable)e);
                                    ++errordocs;
                                }
                                continue;
                            }
                            RiskDTO riskDTO = null;
                            RiskCauseAndConsequenceDTO causeAndConsequenceDTO = null;
                            RiskPlanDTO riskPlanDTO = null;
                            RiskConsequenceDTO consequenceDTO = null;
                            RiskActivitiesDTO activitiesDTO = null;
                            RiskMonitoringDTO monitoringDTO = null;
                            RiskCommentsDTO commentsDTO = null;
                            if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                                riskDTO = (RiskDTO)riskMap.get(row.getCell(2).getStringCellValue().trim());
                                riskDTO = riskDTO == null ? new RiskDTO() : riskDTO;
                                riskDTO.getRiskValue().put("name", row.getCell(2).getStringCellValue().trim());
                                riskDTO.setOwner(owner.longValue());
                                riskDTO.setPageId(pageId.longValue());
                                riskDTO.setCreatedBy(PageOwner.longValue());
                                if (deptId != null) {
                                    riskDTO.setDepartmentId(deptId);
                                    riskDTO.getRiskValue().put("departmentId", deptId);
                                }
                            }
                            if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("desc", row.getCell(3).getStringCellValue().trim());
                            }
                            if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK && (kpidto = (KPIDTO)kpiMap.get(row.getCell(7).getStringCellValue().trim())) != null) {
                                riskDTO.setImpactId(kpidto.getId());
                                riskDTO.getRiskValue().put("impactDesc", kpidto.getKpiName());
                                riskDTO.getRiskValue().put("businessimpact", kpidto.getId());
                            }
                            if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("likeliHood", row.getCell(4).getStringCellValue().trim());
                            }
                            if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("impact", row.getCell(5).getStringCellValue().trim());
                            }
                            if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("riskcategory", row.getCell(6).getStringCellValue().trim());
                            }
                            if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("financialImpact", row.getCell(8).getRawValue().trim());
                            }
                            if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("dateRaised", row.getCell(9).getStringCellValue().trim());
                            }
                            if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("dateCompleted", row.getCell(10).getStringCellValue().trim());
                            }
                            if (row.getCell(11) != null && row.getCell(11).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("nextAssessment", row.getCell(11).getStringCellValue().trim());
                            }
                            if ((implemendationType = row.getCell(13).getStringCellValue().trim()) != null && implemendationType != "") {
                                RiskDTO responseDTO;
                                if (implemendationType.equalsIgnoreCase("Cause")) {
                                    if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                                        causeAndConsequenceDTO = (RiskCauseAndConsequenceDTO)riskDTO.getRiskCauseAndConsequenceMap().get(row.getCell(14).getStringCellValue().trim());
                                        causeAndConsequenceDTO = causeAndConsequenceDTO == null ? new RiskCauseAndConsequenceDTO() : causeAndConsequenceDTO;
                                        causeAndConsequenceDTO.getCauseAndConsequenceValue().put("name", row.getCell(14).getStringCellValue().trim());
                                        causeAndConsequenceDTO.setCreatedBy(PageOwner.longValue());
                                    }
                                    if (row.getCell(15) != null && row.getCell(15).getCellType() != CellType.BLANK) {
                                        causeAndConsequenceDTO.getCauseAndConsequenceValue().put("description", row.getCell(15).getStringCellValue().trim());
                                    }
                                    if (row.getCell(16) != null && row.getCell(16).getCellType() != CellType.BLANK) {
                                        causeAndConsequenceDTO.getCauseAndConsequenceValue().put("riskRating", row.getCell(16).getStringCellValue().trim());
                                    }
                                    if (row.getCell(25) != null && row.getCell(25).getCellType() != CellType.BLANK && riskDTO != null) {
                                        if (row.getCell(25).getCellType() == CellType.NUMERIC) {
                                            causeAndConsequenceDTO.setActive(new BigDecimal(row.getCell(25).getRawValue()).intValue());
                                        } else if (row.getCell(25).getCellType() == CellType.STRING) {
                                            causeAndConsequenceDTO.setActive(new BigDecimal(row.getCell(25).getStringCellValue()).intValue());
                                        } else {
                                            causeAndConsequenceDTO.setActive(new BigDecimal(row.getCell(25).getRawValue()).intValue());
                                        }
                                    }
                                    if (riskDTO.getActive() == 1 && riskDTO.getId() != 0L) {
                                        riskMap.remove(this.getValue(riskDTO.getRiskValue(), "name"));
                                        this.riskDetailsService.removeRiskDetails(Long.valueOf(riskDTO.getId()));
                                        break block126;
                                    }
                                    if (riskDTO.getActive() != 0) break block126;
                                    responseDTO = this.buildAndSaveRiskDetails(PageOwner, riskDTO);
                                    this.buildAndUpdateCauseDataOnly(PageOwner.longValue(), responseDTO, causeAndConsequenceDTO);
                                    break block126;
                                }
                                if (implemendationType.equalsIgnoreCase("Consequence")) {
                                    if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) {
                                        causeAndConsequenceDTO = (RiskCauseAndConsequenceDTO)riskDTO.getRiskCauseAndConsequenceMap().get(row.getCell(17).getStringCellValue().trim());
                                        causeAndConsequenceDTO = causeAndConsequenceDTO == null ? new RiskCauseAndConsequenceDTO() : causeAndConsequenceDTO;
                                        causeAndConsequenceDTO.getCauseAndConsequenceValue().put("name", row.getCell(17).getStringCellValue().trim());
                                        causeAndConsequenceDTO.setCreatedBy(PageOwner.longValue());
                                    }
                                    if (causeAndConsequenceDTO.getId() == 0L && row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK) {
                                        causeAndConsequenceDTO.getCauseAndConsequenceValue().put("riskRating", row.getCell(18).getStringCellValue().trim());
                                    }
                                    if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                                        consequenceDTO = (RiskConsequenceDTO)causeAndConsequenceDTO.getRiskConsequenceMap().get(row.getCell(14).getStringCellValue().trim());
                                        consequenceDTO = consequenceDTO == null ? new RiskConsequenceDTO() : consequenceDTO;
                                        consequenceDTO.getConsequenceValue().put("name", row.getCell(14).getStringCellValue().trim());
                                        consequenceDTO.setCreatedBy(PageOwner.longValue());
                                    }
                                    if (row.getCell(15) != null && row.getCell(15).getCellType() != CellType.BLANK) {
                                        consequenceDTO.getConsequenceValue().put("description", row.getCell(15).getStringCellValue().trim());
                                    }
                                    if (row.getCell(16) != null && row.getCell(16).getCellType() != CellType.BLANK) {
                                        consequenceDTO.getConsequenceValue().put("riskRating", row.getCell(16).getStringCellValue().trim());
                                    }
                                    if (row.getCell(26) != null && row.getCell(26).getCellType() != CellType.BLANK && consequenceDTO != null) {
                                        if (row.getCell(26).getCellType() == CellType.NUMERIC) {
                                            consequenceDTO.setActive(new BigDecimal(row.getCell(26).getRawValue()).intValue());
                                        } else if (row.getCell(26).getCellType() == CellType.STRING) {
                                            consequenceDTO.setActive(new BigDecimal(row.getCell(26).getStringCellValue()).intValue());
                                        } else {
                                            consequenceDTO.setActive(new BigDecimal(row.getCell(26).getRawValue()).intValue());
                                        }
                                    }
                                    if (riskDTO.getActive() == 1 && riskDTO.getId() != 0L) {
                                        riskMap.remove(this.getValue(riskDTO.getRiskValue(), "name"));
                                        this.riskDetailsService.removeRiskDetails(Long.valueOf(riskDTO.getId()));
                                        break block126;
                                    }
                                    if (riskDTO.getActive() != 0) break block126;
                                    responseDTO = this.buildAndSaveRiskDetails(PageOwner, riskDTO);
                                    this.buildAndUpdateCauseAndConsequenceData(PageOwner.longValue(), responseDTO, causeAndConsequenceDTO, consequenceDTO);
                                    break block126;
                                }
                                if (implemendationType.equalsIgnoreCase("Plan")) {
                                    if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) {
                                        causeAndConsequenceDTO = (RiskCauseAndConsequenceDTO)riskDTO.getRiskCauseAndConsequenceMap().get(row.getCell(17).getStringCellValue().trim());
                                        causeAndConsequenceDTO = causeAndConsequenceDTO == null ? new RiskCauseAndConsequenceDTO() : causeAndConsequenceDTO;
                                        causeAndConsequenceDTO.getCauseAndConsequenceValue().put("name", row.getCell(17).getStringCellValue().trim());
                                        causeAndConsequenceDTO.setCreatedBy(PageOwner.longValue());
                                    }
                                    if (causeAndConsequenceDTO.getId() == 0L && row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK) {
                                        causeAndConsequenceDTO.getCauseAndConsequenceValue().put("riskRating", row.getCell(18).getStringCellValue().trim());
                                    }
                                    if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                                        riskPlanDTO = (RiskPlanDTO)riskDTO.getRiskPlanMap().get(row.getCell(14).getStringCellValue().trim());
                                        riskPlanDTO = riskPlanDTO == null ? new RiskPlanDTO() : riskPlanDTO;
                                        monitoringDTO = (RiskMonitoringDTO)riskDTO.getRiskMonitoringMap().get(row.getCell(14).getStringCellValue().trim());
                                        monitoringDTO = monitoringDTO == null ? new RiskMonitoringDTO() : monitoringDTO;
                                        riskPlanDTO.getRiskPlanValue().put("name", row.getCell(14).getStringCellValue().trim());
                                        riskPlanDTO.setCreatedBy(PageOwner.longValue());
                                    }
                                    if (row.getCell(19) != null && row.getCell(19).getCellType() != CellType.BLANK) {
                                        String action = row.getCell(19).getStringCellValue().trim();
                                        if (!"NA".equalsIgnoreCase(action)) {
                                            riskPlanDTO.getRiskPlanValue().put("action", action);
                                        } else {
                                            riskPlanDTO.getRiskPlanValue().put("action", "");
                                        }
                                    } else {
                                        riskPlanDTO.getRiskPlanValue().put("action", "");
                                    }
                                    if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) {
                                        riskPlanDTO.getRiskPlanValue().put("resolveDate", row.getCell(20).getStringCellValue().trim());
                                    } else {
                                        riskPlanDTO.getRiskPlanValue().put("resolveDate", "");
                                    }
                                    if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                                        if (row.getCell(21).getCellType() == CellType.NUMERIC) {
                                            riskPlanDTO.getRiskPlanValue().put("progressval", row.getCell(21).getRawValue());
                                        } else if (row.getCell(21).getCellType() == CellType.STRING) {
                                            riskPlanDTO.getRiskPlanValue().put("progressval", row.getCell(21).getStringCellValue().trim());
                                        } else {
                                            riskPlanDTO.getRiskPlanValue().put("progressval", row.getCell(21).getRawValue().trim());
                                        }
                                    }
                                    if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                        riskPlanDTO.setMultipleOwners(this.getMultipleOwnerIds(row.getCell(22).getStringCellValue().trim()));
                                    }
                                    if (row.getCell(26) != null && row.getCell(26).getCellType() != CellType.BLANK && causeAndConsequenceDTO != null) {
                                        if (row.getCell(26).getCellType() == CellType.NUMERIC) {
                                            riskPlanDTO.setActive(new BigDecimal(row.getCell(26).getRawValue()).intValue());
                                        } else if (row.getCell(26).getCellType() == CellType.STRING) {
                                            riskPlanDTO.setActive(new BigDecimal(row.getCell(26).getStringCellValue()).intValue());
                                        } else {
                                            riskPlanDTO.setActive(new BigDecimal(row.getCell(26).getRawValue()).intValue());
                                        }
                                    }
                                    if (riskDTO.getActive() == 1 && riskDTO.getId() != 0L) {
                                        riskMap.remove(this.getValue(riskDTO.getRiskValue(), "name"));
                                        this.riskDetailsService.removeRiskDetails(Long.valueOf(riskDTO.getId()));
                                        break block126;
                                    }
                                    if (riskDTO.getActive() != 0) break block126;
                                    responseDTO = this.buildAndSaveRiskDetails(PageOwner, riskDTO);
                                    responseDTO.setRiskPlanMap(riskDTO.getRiskPlanMap());
                                    responseDTO.setRiskCauseAndConsequenceMap(riskDTO.getRiskCauseAndConsequenceMap());
                                    this.buildAndUpdateCauseANDPlanAndActionData(PageOwner.longValue(), responseDTO, causeAndConsequenceDTO, riskPlanDTO, monitoringDTO, activitiesDTO);
                                    break block126;
                                }
                                if (implemendationType.equalsIgnoreCase("Action")) {
                                    if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) {
                                        causeAndConsequenceDTO = (RiskCauseAndConsequenceDTO)riskDTO.getRiskCauseAndConsequenceMap().get(row.getCell(17).getStringCellValue().trim());
                                        causeAndConsequenceDTO = causeAndConsequenceDTO == null ? new RiskCauseAndConsequenceDTO() : causeAndConsequenceDTO;
                                        causeAndConsequenceDTO.getCauseAndConsequenceValue().put("name", row.getCell(17).getStringCellValue().trim());
                                        causeAndConsequenceDTO.setCreatedBy(PageOwner.longValue());
                                    }
                                    if (causeAndConsequenceDTO.getId() == 0L && row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK) {
                                        causeAndConsequenceDTO.getCauseAndConsequenceValue().put("riskRating", row.getCell(18).getStringCellValue().trim());
                                    }
                                    if (row.getCell(24) != null && row.getCell(24).getCellType() != CellType.BLANK) {
                                        riskPlanDTO = (RiskPlanDTO)riskDTO.getRiskPlanMap().get(row.getCell(24).getStringCellValue().trim());
                                        riskPlanDTO = riskPlanDTO == null ? new RiskPlanDTO() : riskPlanDTO;
                                        monitoringDTO = (RiskMonitoringDTO)riskDTO.getRiskMonitoringMap().get(row.getCell(24).getStringCellValue().trim());
                                        RiskMonitoringDTO riskMonitoringDTO = monitoringDTO = monitoringDTO == null ? new RiskMonitoringDTO() : monitoringDTO;
                                        if (riskPlanDTO.getId() == 0L) {
                                            riskPlanDTO.getRiskPlanValue().put("name", row.getCell(24).getStringCellValue().trim());
                                            riskPlanDTO.setCreatedBy(PageOwner.longValue());
                                            riskPlanDTO.getRiskPlanValue().put("action", "Accept");
                                            if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) {
                                                riskPlanDTO.getRiskPlanValue().put("resolveDate", row.getCell(20).getStringCellValue().trim());
                                            } else {
                                                riskPlanDTO.getRiskPlanValue().put("resolveDate", "");
                                            }
                                            if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                                                if (row.getCell(21).getCellType() == CellType.NUMERIC) {
                                                    riskPlanDTO.getRiskPlanValue().put("progressval", row.getCell(21).getRawValue());
                                                } else if (row.getCell(21).getCellType() == CellType.STRING) {
                                                    riskPlanDTO.getRiskPlanValue().put("progressval", row.getCell(21).getStringCellValue().trim());
                                                } else {
                                                    riskPlanDTO.getRiskPlanValue().put("progressval", row.getCell(21).getRawValue().trim());
                                                }
                                            }
                                            if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                                riskPlanDTO.setMultipleOwners(this.getMultipleOwnerIds(row.getCell(22).getStringCellValue().trim()));
                                            }
                                            if (row.getCell(26) != null && row.getCell(26).getCellType() != CellType.BLANK && causeAndConsequenceDTO != null) {
                                                if (row.getCell(26).getCellType() == CellType.NUMERIC) {
                                                    riskPlanDTO.setActive(new BigDecimal(row.getCell(26).getRawValue()).intValue());
                                                } else if (row.getCell(26).getCellType() == CellType.STRING) {
                                                    riskPlanDTO.setActive(new BigDecimal(row.getCell(26).getStringCellValue()).intValue());
                                                } else {
                                                    riskPlanDTO.setActive(new BigDecimal(row.getCell(26).getRawValue()).intValue());
                                                }
                                            }
                                        }
                                    }
                                    if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                                        activitiesDTO = riskPlanDTO.getId() != 0L ? ((activitiesDTO = (RiskActivitiesDTO)riskPlanDTO.getRiskActivitiesMap().get(row.getCell(14).getStringCellValue().trim())) == null ? new RiskActivitiesDTO() : activitiesDTO) : (monitoringDTO.getId() != 0L ? ((activitiesDTO = (RiskActivitiesDTO)monitoringDTO.getRiskActivitiesMap().get(row.getCell(14).getStringCellValue().trim())) == null ? new RiskActivitiesDTO() : activitiesDTO) : (activitiesDTO == null ? new RiskActivitiesDTO() : activitiesDTO));
                                        activitiesDTO.getRiskActivitiesValue().put("name", row.getCell(14).getStringCellValue().trim());
                                        activitiesDTO.setCreatedBy(PageOwner.longValue());
                                    }
                                    if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) {
                                        activitiesDTO.getRiskActivitiesValue().put("resoleveby", row.getCell(20).getStringCellValue().trim());
                                    } else {
                                        activitiesDTO.getRiskActivitiesValue().put("resoleveby", "");
                                    }
                                    if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                                        if (row.getCell(21).getCellType() == CellType.NUMERIC) {
                                            activitiesDTO.getRiskActivitiesValue().put("progress", row.getCell(21).getRawValue());
                                        } else if (row.getCell(21).getCellType() == CellType.STRING) {
                                            activitiesDTO.getRiskActivitiesValue().put("progress", row.getCell(21).getStringCellValue().trim());
                                        } else {
                                            activitiesDTO.getRiskActivitiesValue().put("progress", row.getCell(21).getRawValue().trim());
                                        }
                                    }
                                    if (row.getCell(23) != null && row.getCell(23).getCellType() != CellType.BLANK) {
                                        activitiesDTO.getRiskActivitiesValue().put("status", row.getCell(23).getStringCellValue().trim());
                                    } else {
                                        activitiesDTO.getRiskActivitiesValue().put("status", "");
                                    }
                                    if (riskDTO.getActive() == 1 && riskDTO.getId() != 0L) {
                                        riskMap.remove(this.getValue(riskDTO.getRiskValue(), "name"));
                                        this.riskDetailsService.removeRiskDetails(Long.valueOf(riskDTO.getId()));
                                        break block126;
                                    }
                                    if (riskDTO.getActive() != 0) break block126;
                                    responseDTO = this.buildAndSaveRiskDetails(PageOwner, riskDTO);
                                    responseDTO.setRiskPlanMap(riskDTO.getRiskPlanMap());
                                    responseDTO.setRiskCauseAndConsequenceMap(riskDTO.getRiskCauseAndConsequenceMap());
                                    this.buildAndUpdateCauseANDPlanAndActionData(PageOwner.longValue(), responseDTO, causeAndConsequenceDTO, riskPlanDTO, monitoringDTO, activitiesDTO);
                                    break block126;
                                }
                                if (row.getCell(15) == null || row.getCell(15).getCellType() == CellType.BLANK) break block126;
                                commentsDTO = (RiskCommentsDTO)riskDTO.getRiskCommentsDTOMap().get(row.getCell(15).getStringCellValue().trim());
                                commentsDTO = commentsDTO == null ? new RiskCommentsDTO() : commentsDTO;
                                commentsDTO.getRiskCommentsValue().put("desc", row.getCell(15).getStringCellValue().trim());
                                if (riskDTO.getActive() == 1 && riskDTO.getId() != 0L) {
                                    riskMap.remove(this.getValue(riskDTO.getRiskValue(), "name"));
                                    this.riskDetailsService.removeRiskDetails(Long.valueOf(riskDTO.getId()));
                                    break block126;
                                }
                                if (riskDTO.getActive() != 0) break block126;
                                responseDTO = this.buildAndSaveRiskDetails(PageOwner, riskDTO);
                                responseDTO.setRiskPlanMap(riskDTO.getRiskPlanMap());
                                responseDTO.setRiskCauseAndConsequenceMap(riskDTO.getRiskCauseAndConsequenceMap());
                                this.buildAndUpdateCommentsData(PageOwner, responseDTO, commentsDTO);
                                break block126;
                            }
                            if (row.getCell(25) != null && row.getCell(25).getCellType() != CellType.BLANK && riskDTO != null) {
                                if (row.getCell(25).getCellType() == CellType.NUMERIC) {
                                    riskDTO.setActive(new BigDecimal(row.getCell(25).getNumericCellValue()).intValue());
                                } else if (row.getCell(25).getCellType() == CellType.STRING) {
                                    riskDTO.setActive(new BigDecimal(row.getCell(25).getStringCellValue()).intValue());
                                } else {
                                    riskDTO.setActive(new BigDecimal(row.getCell(25).getRawValue()).intValue());
                                }
                            }
                            if (riskDTO.getActive() == 1 && riskDTO.getId() != 0L) {
                                riskMap.remove(this.getValue(riskDTO.getRiskValue(), "name"));
                                this.riskDetailsService.removeRiskDetails(Long.valueOf(riskDTO.getId()));
                                break block126;
                            }
                            if (riskDTO.getActive() != 0) break block126;
                            this.buildAndSaveRiskDetails(PageOwner, riskDTO);
                        }
                        catch (Exception e) {
                            this.logger.error("Exception occured", (Throwable)e);
                            ++errordocs;
                            continue;
                        }
                    }
                    ++proceededdocs;
                    if (checkcreaterowno != null && checkcreaterowno.equals(new Long(row.getCTRow().getR())) && createStatus.booleanValue()) {
                        ++createrows;
                    }
                    if (checkupdaterowno == null || !checkupdaterowno.equals(new Long(row.getCTRow().getR())) || !updateStatus.booleanValue()) continue;
                    ++updatedrows;
                }
            }
            resultMap.put("result", "success");
            resultMap.put("no_of_failed", errordocs);
            resultMap.put("no_of_processed", proceededdocs);
            resultMap.put("no_of_created", createrows);
            resultMap.put("no_of_updated", updatedrows);
            resultMap.put("message", "Import Successful");
        }
        catch (Exception e) {
            this.logger.error("Exception occured", (Throwable)e);
            throw new RuntimeException(e);
        }
        finally {
            if (myExcelBook != null) {
                myExcelBook.close();
            }
        }
        return resultMap;
    }

    public RiskDTO buildAndSaveRiskDetails(Long pageOwner, RiskDTO riskDTO) {
        if (riskDTO.getId() != 0L) {
            riskDTO.setUpdatedBy(pageOwner.longValue());
            riskDTO.setUpdatedTime(LocalDateTime.now());
            this.updateStatusAndScore(riskDTO);
            return this.riskDetailsService.updateRisk(riskDTO).getRiskDTO();
        }
        this.updateStatusAndScore(riskDTO);
        return this.riskDetailsService.saveRisk(riskDTO).getRiskDTO();
    }

    public String getValue(Map inMap, String key) {
        String value = Objects.nonNull(inMap) && Objects.nonNull(inMap.get(key)) ? inMap.get(key).toString() : "";
        return value;
    }

    private String getMultipleOwnerIds(String multipleOwnerEmails) {
        StringBuffer owners = new StringBuffer();
        Stream.of(multipleOwnerEmails.split(",")).forEach(owner -> {
            EmployeeDTO employeeDTO = new EmployeeDTO();
            employeeDTO.setEmailAddress(owner.trim());
            EmployeeDTO response = this.employeeService.getEmployeeId(employeeDTO);
            if (response != null) {
                owners.append(response.getEmpId());
                owners.append(",");
            }
        });
        return StringUtils.isNotEmpty((CharSequence)owners.toString()) ? owners.substring(0, owners.lastIndexOf(",")) : "";
    }

    public void buildAndUpdateCauseData(long pageOwner, RiskDTO riskDTO, RiskCauseAndConsequenceDTO causeAndConsequenceDTO, RiskConsequenceDTO riskConsequenceDTO, RiskPlanDTO riskPlanDTO, RiskMonitoringDTO riskMonitoringDTO, RiskActivitiesDTO riskActivitiesDTO, RiskCommentsDTO commentsDTO) {
        if (causeAndConsequenceDTO != null) {
            int active = Objects.nonNull(causeAndConsequenceDTO.getCauseAndConsequenceValue().get("active")) ? Integer.valueOf(causeAndConsequenceDTO.getCauseAndConsequenceValue().get("active").toString()) : 0;
            causeAndConsequenceDTO.setCreatedBy(pageOwner);
            causeAndConsequenceDTO.setRiskId(riskDTO.getId());
            if (causeAndConsequenceDTO.getId() != 0L) {
                causeAndConsequenceDTO.setUpdatedBy(pageOwner);
                causeAndConsequenceDTO.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && causeAndConsequenceDTO.getId() != 0L) {
                riskDTO.getRiskCauseAndConsequenceMap().remove(this.getValue(causeAndConsequenceDTO.getCauseAndConsequenceValue(), "name"));
                this.riskCauseAndConsequenceService.removeRiskCauseAndConsequence(Long.valueOf(causeAndConsequenceDTO.getId()));
            } else if (active == 0) {
                RiskCauseAndConsequenceDTO consequenceDTO = this.riskCauseAndConsequenceService.saveRiskCauseAndConsequence(causeAndConsequenceDTO).getRiskCauseAndConsequenceDTO();
                riskDTO.getRiskCauseAndConsequenceMap().put(this.getValue(causeAndConsequenceDTO.getCauseAndConsequenceValue(), "name"), consequenceDTO);
                this.buildAndUpdateConsequenceData(pageOwner, consequenceDTO, riskConsequenceDTO);
                this.buildAndUpdatePlanData(Long.valueOf(pageOwner), riskDTO, consequenceDTO, riskPlanDTO, riskMonitoringDTO, riskActivitiesDTO);
            }
        }
    }

    public void buildAndUpdateCauseANDPlanAndActionData(long pageOwner, RiskDTO riskDTO, RiskCauseAndConsequenceDTO causeAndConsequenceDTO, RiskPlanDTO riskPlanDTO, RiskMonitoringDTO riskMonitoringDTO, RiskActivitiesDTO riskActivitiesDTO) {
        if (causeAndConsequenceDTO != null) {
            int active = Objects.nonNull(causeAndConsequenceDTO.getCauseAndConsequenceValue().get("active")) ? Integer.valueOf(causeAndConsequenceDTO.getCauseAndConsequenceValue().get("active").toString()) : 0;
            causeAndConsequenceDTO.setCreatedBy(pageOwner);
            causeAndConsequenceDTO.setRiskId(riskDTO.getId());
            if (active == 1 && causeAndConsequenceDTO.getId() != 0L) {
                riskDTO.getRiskCauseAndConsequenceMap().remove(this.getValue(causeAndConsequenceDTO.getCauseAndConsequenceValue(), "name"));
                this.riskCauseAndConsequenceService.removeRiskCauseAndConsequence(Long.valueOf(causeAndConsequenceDTO.getId()));
            } else if (active == 0) {
                RiskCauseAndConsequenceDTO consequenceDTO = null;
                if (causeAndConsequenceDTO.getId() != 0L) {
                    causeAndConsequenceDTO.setUpdatedBy(pageOwner);
                    causeAndConsequenceDTO.setUpdatedTime(LocalDateTime.now());
                    consequenceDTO = this.riskCauseAndConsequenceService.updateRiskCauseAndConsequence(causeAndConsequenceDTO).getRiskCauseAndConsequenceDTO();
                } else {
                    consequenceDTO = this.riskCauseAndConsequenceService.saveRiskCauseAndConsequence(causeAndConsequenceDTO).getRiskCauseAndConsequenceDTO();
                }
                riskDTO.getRiskCauseAndConsequenceMap().put(this.getValue(causeAndConsequenceDTO.getCauseAndConsequenceValue(), "name"), consequenceDTO);
                this.buildAndUpdatePlanData(Long.valueOf(pageOwner), riskDTO, consequenceDTO, riskPlanDTO, riskMonitoringDTO, riskActivitiesDTO);
            }
        }
    }

    public void buildAndUpdatePlanData(Long pageOwner, RiskDTO riskDTO, RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO, RiskPlanDTO riskPlanDTO, RiskMonitoringDTO riskMonitoringDTO, RiskActivitiesDTO riskActivitiesDTO) {
        if (riskPlanDTO != null) {
            String progress = riskPlanDTO.getRiskPlanValue().get("progressval").toString();
            if (progress.equalsIgnoreCase("100")) {
                riskPlanDTO.setId(riskMonitoringDTO.getId());
                riskPlanDTO.setTypeFlag("RiskMonitoring");
                riskPlanDTO.getRiskPlanValue().put("status", "Open");
            } else {
                riskPlanDTO.setTypeFlag("RiskPlan");
            }
            int active = Objects.nonNull(riskPlanDTO.getRiskPlanValue().get("active")) ? Integer.valueOf(riskPlanDTO.getRiskPlanValue().get("active").toString()) : 0;
            riskPlanDTO.setCreatedBy(pageOwner.longValue());
            riskPlanDTO.setRiskId(riskDTO.getId());
            riskPlanDTO.getRiskPlanValue().put("cause", riskCauseAndConsequenceDTO.getId());
            if (active == 1 && riskPlanDTO.getId() != 0L) {
                riskDTO.getRiskPlanMap().remove(this.getValue(riskPlanDTO.getRiskPlanValue(), "name"));
                this.riskPlanService.removeRiskPlan(Long.valueOf(riskPlanDTO.getId()));
            } else if (active == 0) {
                RiskPlanDTO planDTO = null;
                if (riskPlanDTO.getId() != 0L) {
                    riskPlanDTO.setUpdatedBy(pageOwner.longValue());
                    riskPlanDTO.setUpdatedTime(LocalDateTime.now());
                    planDTO = this.riskPlanService.updateRiskPlan(riskPlanDTO).getRiskPlanDTO();
                } else {
                    planDTO = this.riskPlanService.saveRiskPlan(riskPlanDTO).getRiskPlanDTO();
                }
                this.buildAndUpdateActivitiesData(pageOwner, planDTO, riskActivitiesDTO);
                riskDTO.getRiskPlanMap().put(this.getValue(riskPlanDTO.getRiskPlanValue(), "name"), planDTO);
            }
        }
    }

    public void buildAndUpdateActivitiesData(Long pageOwner, RiskPlanDTO riskPlanDTO, RiskActivitiesDTO riskActivitiesDTO) {
        if (riskActivitiesDTO != null) {
            int active = Objects.nonNull(riskActivitiesDTO.getRiskActivitiesValue().get("active")) ? Integer.valueOf(riskActivitiesDTO.getRiskActivitiesValue().get("active").toString()) : 0;
            riskActivitiesDTO.setCreatedBy(pageOwner.longValue());
            riskActivitiesDTO.setRiskPlanId(riskPlanDTO.getId());
            if (riskActivitiesDTO.getId() != 0L) {
                riskActivitiesDTO.setUpdatedBy(pageOwner.longValue());
                riskActivitiesDTO.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && riskPlanDTO.getId() != 0L) {
                riskPlanDTO.getRiskActivitiesMap().remove(this.getValue(riskActivitiesDTO.getRiskActivitiesValue(), "name"));
                this.riskActivitiesService.removeRiskActivities(Long.valueOf(riskActivitiesDTO.getId()));
            } else if (active == 0) {
                RiskActivitiesDTO activitiesDTO = null;
                activitiesDTO = riskActivitiesDTO.getId() != 0L ? this.riskActivitiesService.updateRiskActivities(riskActivitiesDTO).getRiskActivitiesDTO() : this.riskActivitiesService.saveRiskActivities(riskActivitiesDTO).getRiskActivitiesDTO();
                riskPlanDTO.getRiskActivitiesMap().put(this.getValue(riskActivitiesDTO.getRiskActivitiesValue(), "name"), activitiesDTO);
            }
        }
    }

    public void buildAndUpdateCommentsData(Long pageOwner, RiskDTO riskDTO, RiskCommentsDTO commentsDTO) {
        if (commentsDTO != null) {
            commentsDTO.setFromPage("risk");
            commentsDTO.setCreatedBy(pageOwner.longValue());
            commentsDTO.setRiskId(riskDTO.getId());
            if (commentsDTO.getActive() == 1 && commentsDTO.getId() != 0L) {
                riskDTO.getRiskCommentsDTOMap().remove(this.getValue(commentsDTO.getRiskCommentsValue(), "desc"));
                this.riskCommentsService.removeRiskComments(Long.valueOf(commentsDTO.getId()));
            } else if (commentsDTO.getActive() == 0) {
                RiskCommentsDTO commentsDTO1 = this.riskCommentsService.saveRiskComments(commentsDTO).getRiskCommentsDTO();
                riskDTO.getRiskCommentsDTOMap().put(this.getValue(commentsDTO1.getRiskCommentsValue(), "desc"), commentsDTO1);
            }
        }
    }

    public boolean isValid(String dateRange) {
        boolean status = false;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        String regex = "^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$";
        Pattern pattern = Pattern.compile(regex);
        if (dataRanges != null && dataRanges.length > 1) {
            Matcher matcher1;
            boolean bool1;
            String startDate1 = dataRanges[0].trim();
            String endDate1 = dataRanges[1].trim();
            Matcher matcher = pattern.matcher(startDate1);
            boolean bool = matcher.matches();
            status = bool ? (bool1 = (matcher1 = pattern.matcher(endDate1)).matches()) : false;
        }
        return status;
    }

    public boolean isDateValid(String date1, String date2) {
        boolean status = false;
        try {
            SimpleDateFormat sdformat = new SimpleDateFormat("MM/dd/yyyy");
            Date d1 = sdformat.parse(date1);
            Date d2 = sdformat.parse(date2);
            int i = d1.compareTo(d2);
            if (i == -1) {
                status = true;
            }
        }
        catch (ParseException e) {
            this.logger.error(("parser exception for unknown pattern " + e));
        }
        return status;
    }

    public void updateStatusAndScore(RiskDTO riskDTO) {
        if (riskDTO != null) {
            String likelihood = riskDTO.getRiskValue().get("likeliHood").toString();
            String impact = riskDTO.getRiskValue().get("impact").toString();
            if (likelihood.equalsIgnoreCase("Rare")) {
                if (StringUtils.isNotEmpty((CharSequence)impact)) {
                    if (impact.equalsIgnoreCase("Insignificant")) {
                        riskDTO.getRiskValue().put("riskStatus", "Very Low");
                        riskDTO.getRiskValue().put("score", "1");
                    } else if (impact.equalsIgnoreCase("Minor")) {
                        riskDTO.getRiskValue().put("riskStatus", "Very Low");
                        riskDTO.getRiskValue().put("score", "2");
                    } else if (impact.equalsIgnoreCase("Moderate")) {
                        riskDTO.getRiskValue().put("riskStatus", "Low");
                        riskDTO.getRiskValue().put("score", "3");
                    } else if (impact.equalsIgnoreCase("Major")) {
                        riskDTO.getRiskValue().put("riskStatus", "Low");
                        riskDTO.getRiskValue().put("score", "4");
                    } else if (impact.equalsIgnoreCase("Catastrophic")) {
                        riskDTO.getRiskValue().put("riskStatus", "Tolerable");
                        riskDTO.getRiskValue().put("score", "4");
                    }
                }
            } else if (likelihood.equalsIgnoreCase("Unlikely")) {
                if (StringUtils.isNotEmpty((CharSequence)impact)) {
                    if (impact.equalsIgnoreCase("Insignificant")) {
                        riskDTO.getRiskValue().put("riskStatus", "Very Low");
                        riskDTO.getRiskValue().put("score", "2");
                    } else if (impact.equalsIgnoreCase("Minor")) {
                        riskDTO.getRiskValue().put("riskStatus", "Low");
                        riskDTO.getRiskValue().put("score", "4");
                    } else if (impact.equalsIgnoreCase("Moderate")) {
                        riskDTO.getRiskValue().put("riskStatus", "Low");
                        riskDTO.getRiskValue().put("score", "6");
                    } else if (impact.equalsIgnoreCase("Major")) {
                        riskDTO.getRiskValue().put("riskStatus", "Tolerable");
                        riskDTO.getRiskValue().put("score", "8");
                    } else if (impact.equalsIgnoreCase("Catastrophic")) {
                        riskDTO.getRiskValue().put("riskStatus", "High");
                        riskDTO.getRiskValue().put("score", "10");
                    }
                }
            } else if (likelihood.equalsIgnoreCase("Possible")) {
                if (StringUtils.isNotEmpty((CharSequence)impact)) {
                    if (impact.equalsIgnoreCase("Insignificant")) {
                        riskDTO.getRiskValue().put("riskStatus", "Low");
                        riskDTO.getRiskValue().put("score", "3");
                    } else if (impact.equalsIgnoreCase("Minor")) {
                        riskDTO.getRiskValue().put("riskStatus", "Tolerable");
                        riskDTO.getRiskValue().put("score", "6");
                    } else if (impact.equalsIgnoreCase("Moderate")) {
                        riskDTO.getRiskValue().put("riskStatus", "Tolerable");
                        riskDTO.getRiskValue().put("score", "9");
                    } else if (impact.equalsIgnoreCase("Major")) {
                        riskDTO.getRiskValue().put("riskStatus", "High");
                        riskDTO.getRiskValue().put("score", "12");
                    } else if (impact.equalsIgnoreCase("Catastrophic")) {
                        riskDTO.getRiskValue().put("riskStatus", "High");
                        riskDTO.getRiskValue().put("score", "15");
                    }
                }
            } else if (likelihood.equalsIgnoreCase("Likely")) {
                if (StringUtils.isNotEmpty((CharSequence)impact)) {
                    if (impact.equalsIgnoreCase("Insignificant")) {
                        riskDTO.getRiskValue().put("riskStatus", "Tolerable");
                        riskDTO.getRiskValue().put("score", "4");
                    } else if (impact.equalsIgnoreCase("Minor")) {
                        riskDTO.getRiskValue().put("riskStatus", "Tolerable");
                        riskDTO.getRiskValue().put("score", "8");
                    } else if (impact.equalsIgnoreCase("Moderate")) {
                        riskDTO.getRiskValue().put("riskStatus", "High");
                        riskDTO.getRiskValue().put("score", "12");
                    } else if (impact.equalsIgnoreCase("Major")) {
                        riskDTO.getRiskValue().put("riskStatus", "Very High");
                        riskDTO.getRiskValue().put("score", "16");
                    } else if (impact.equalsIgnoreCase("Catastrophic")) {
                        riskDTO.getRiskValue().put("riskStatus", "Very High");
                        riskDTO.getRiskValue().put("score", "20");
                    }
                }
            } else if (likelihood.equalsIgnoreCase("Almost Certain") && StringUtils.isNotEmpty((CharSequence)impact)) {
                if (impact.equalsIgnoreCase("Insignificant")) {
                    riskDTO.getRiskValue().put("riskStatus", "Tolerable");
                    riskDTO.getRiskValue().put("score", "5");
                } else if (impact.equalsIgnoreCase("Minor")) {
                    riskDTO.getRiskValue().put("riskStatus", "High");
                    riskDTO.getRiskValue().put("score", "10");
                } else if (impact.equalsIgnoreCase("Moderate")) {
                    riskDTO.getRiskValue().put("riskStatus", "High");
                    riskDTO.getRiskValue().put("score", "15");
                } else if (impact.equalsIgnoreCase("Major")) {
                    riskDTO.getRiskValue().put("riskStatus", "Very High");
                    riskDTO.getRiskValue().put("score", "20");
                } else if (impact.equalsIgnoreCase("Catastrophic")) {
                    riskDTO.getRiskValue().put("riskStatus", "Very High");
                    riskDTO.getRiskValue().put("score", "25");
                }
            }
        }
    }

    public void buildAndUpdateConsequenceData(long pageOwner, RiskCauseAndConsequenceDTO andConsequenceDTO, RiskConsequenceDTO consequence) {
        if (consequence != null) {
            int active = Objects.nonNull(andConsequenceDTO.getCauseAndConsequenceValue().get("active")) ? Integer.valueOf(andConsequenceDTO.getCauseAndConsequenceValue().get("active").toString()) : 0;
            consequence.setCreatedBy(pageOwner);
            consequence.setCauseConqId(andConsequenceDTO.getId());
            if (consequence.getId() != 0L) {
                consequence.setUpdatedBy(pageOwner);
                consequence.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && consequence.getId() != 0L) {
                andConsequenceDTO.getRiskConsequenceMap().remove(this.getValue(consequence.getConsequenceValue(), "name"));
                this.riskCauseAndConsequenceService.removeRiskConsequence(Long.valueOf(consequence.getId()));
            } else if (active == 0) {
                RiskConsequenceDTO consequenceDTO = null;
                consequenceDTO = consequence.getId() != 0L ? this.riskCauseAndConsequenceService.updateRiskConsequence(consequence) : this.riskCauseAndConsequenceService.saveRiskConsequence(consequence);
                andConsequenceDTO.getRiskConsequenceMap().put(this.getValue(consequence.getConsequenceValue(), "name"), consequenceDTO);
            }
        }
    }

    public void buildAndUpdateCauseDataOnly(long pageOwner, RiskDTO riskDTO, RiskCauseAndConsequenceDTO causeAndConsequenceDTO) {
        if (causeAndConsequenceDTO != null) {
            int active = Objects.nonNull(causeAndConsequenceDTO.getCauseAndConsequenceValue().get("active")) ? Integer.valueOf(causeAndConsequenceDTO.getCauseAndConsequenceValue().get("active").toString()) : 0;
            causeAndConsequenceDTO.setCreatedBy(pageOwner);
            causeAndConsequenceDTO.setRiskId(riskDTO.getId());
            if (active == 1 && causeAndConsequenceDTO.getId() != 0L) {
                riskDTO.getRiskCauseAndConsequenceMap().remove(this.getValue(causeAndConsequenceDTO.getCauseAndConsequenceValue(), "name"));
                this.riskCauseAndConsequenceService.removeRiskCauseAndConsequence(Long.valueOf(causeAndConsequenceDTO.getId()));
            } else if (active == 0) {
                RiskCauseAndConsequenceDTO consequenceDTO = null;
                if (causeAndConsequenceDTO.getId() != 0L) {
                    causeAndConsequenceDTO.setUpdatedBy(pageOwner);
                    causeAndConsequenceDTO.setUpdatedTime(LocalDateTime.now());
                    consequenceDTO = this.riskCauseAndConsequenceService.updateRiskCauseAndConsequence(causeAndConsequenceDTO).getRiskCauseAndConsequenceDTO();
                } else {
                    consequenceDTO = this.riskCauseAndConsequenceService.saveRiskCauseAndConsequence(causeAndConsequenceDTO).getRiskCauseAndConsequenceDTO();
                }
                riskDTO.getRiskCauseAndConsequenceMap().put(this.getValue(causeAndConsequenceDTO.getCauseAndConsequenceValue(), "name"), consequenceDTO);
            }
        }
    }

    public void buildAndUpdateCauseAndConsequenceData(long pageOwner, RiskDTO riskDTO, RiskCauseAndConsequenceDTO causeAndConsequenceDTO, RiskConsequenceDTO riskConsequenceDTO) {
        if (causeAndConsequenceDTO != null) {
            int active = Objects.nonNull(causeAndConsequenceDTO.getCauseAndConsequenceValue().get("active")) ? Integer.valueOf(causeAndConsequenceDTO.getCauseAndConsequenceValue().get("active").toString()) : 0;
            causeAndConsequenceDTO.setCreatedBy(pageOwner);
            causeAndConsequenceDTO.setRiskId(riskDTO.getId());
            if (active == 1 && causeAndConsequenceDTO.getId() != 0L) {
                riskDTO.getRiskCauseAndConsequenceMap().remove(this.getValue(causeAndConsequenceDTO.getCauseAndConsequenceValue(), "name"));
                this.riskCauseAndConsequenceService.removeRiskCauseAndConsequence(Long.valueOf(causeAndConsequenceDTO.getId()));
            } else if (active == 0) {
                RiskCauseAndConsequenceDTO consequenceDTO = null;
                if (causeAndConsequenceDTO.getId() != 0L) {
                    causeAndConsequenceDTO.setUpdatedBy(pageOwner);
                    causeAndConsequenceDTO.setUpdatedTime(LocalDateTime.now());
                    consequenceDTO = this.riskCauseAndConsequenceService.updateRiskCauseAndConsequence(causeAndConsequenceDTO).getRiskCauseAndConsequenceDTO();
                } else {
                    consequenceDTO = this.riskCauseAndConsequenceService.saveRiskCauseAndConsequence(causeAndConsequenceDTO).getRiskCauseAndConsequenceDTO();
                }
                riskDTO.getRiskCauseAndConsequenceMap().put(this.getValue(causeAndConsequenceDTO.getCauseAndConsequenceValue(), "name"), consequenceDTO);
                this.buildAndUpdateConsequenceData(pageOwner, consequenceDTO, riskConsequenceDTO);
            }
        }
    }

    public ResponseEntity<ByteArrayResource> writeDocForRiskDetails(List<RiskDTO> riskDTOS) throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        ArrayList<Object> mapList = new ArrayList<Object>();
        String pageName = null;
        String deptUniqueID = null;
        try {
            if (CollectionUtils.isNotEmpty(riskDTOS)) {
                for (Object _obj_riskDTO : riskDTOS) {
                    RiskDTO riskDTO = (RiskDTO) _obj_riskDTO;
                    if (Objects.nonNull(riskDTO)) {
                        Map planMap;
                        Map activitiesMap;
                        Map riskDTORiskValue;
                        HashMap riskActivitiesMap;
                        String causeName;
                        RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO;
                        Map planObjectMap;
                        Map stringObjectMap;
                        HashMap stringMap;
                        if (riskDTO.getDeptUniqueId() != null) {
                            deptUniqueID = riskDTO.getDeptUniqueId();
                        }
                        pageName = riskDTO.getPageName();
                        if (!riskDTO.getRiskCauseAndConsequenceList().isEmpty()) {
                            for (Object _obj_riskCauseAndConsequenceDTO2 : riskDTO.getRiskCauseAndConsequenceList()) {
                                RiskCauseAndConsequenceDTO riskCauseAndConsequenceDTO2 = (RiskCauseAndConsequenceDTO) _obj_riskCauseAndConsequenceDTO2;
                                stringMap = new HashMap();
                                if (deptUniqueID != null) {
                                    stringMap.put("departmentID", deptUniqueID);
                                }
                                stringMap.put("pageName", pageName);
                                stringObjectMap = riskDTO.getRiskValue();
                                stringMap.put("riskName", stringObjectMap.get("name").toString());
                                if (stringObjectMap.containsKey("desc")) {
                                    stringMap.put("riskDesc", stringObjectMap.get("desc").toString());
                                }
                                stringMap.put("likelihood", stringObjectMap.get("likeliHood").toString());
                                stringMap.put("impact", stringObjectMap.get("impact").toString());
                                stringMap.put("riskCategory", stringObjectMap.get("riskcategory").toString());
                                stringMap.put("businessimpact", stringObjectMap.get("impactDesc").toString());
                                stringMap.put("financialImpact", stringObjectMap.get("financialImpact").toString());
                                stringMap.put("dateRaised", stringObjectMap.get("dateRaised").toString());
                                stringMap.put("dateCompleted", stringObjectMap.get("dateCompleted").toString());
                                stringMap.put("nextAssessment", stringObjectMap.get("nextAssessment").toString());
                                stringMap.put("raisedBy", stringObjectMap.get("ownerName").toString());
                                stringMap.put("riskActive", String.valueOf(riskDTO.getActive()));
                                stringMap.put("implementationType", "Cause");
                                Map causeObjectMap = riskCauseAndConsequenceDTO2.getCauseAndConsequenceValue();
                                stringMap.put("typeName", causeObjectMap.get("name").toString());
                                if (causeObjectMap.containsKey("description")) {
                                    stringMap.put("typeDesc", causeObjectMap.get("description").toString());
                                }
                                if (causeObjectMap.containsKey("riskRating")) {
                                    stringMap.put("rating", causeObjectMap.get("riskRating").toString());
                                }
                                stringMap.put("typeActive", String.valueOf(riskCauseAndConsequenceDTO2.getActive()));
                                mapList.add(stringMap);
                                if (riskCauseAndConsequenceDTO2.getConsequenceList().isEmpty()) continue;
                                for (Object _obj_riskConsequenceDTO : riskCauseAndConsequenceDTO2.getConsequenceList()) {
                                    RiskConsequenceDTO riskConsequenceDTO = (RiskConsequenceDTO) _obj_riskConsequenceDTO;
                                    Map subStringMap = new HashMap();
                                    if (deptUniqueID != null) {
                                        subStringMap.put("departmentID", deptUniqueID);
                                    }
                                    subStringMap.put("pageName", pageName);
                                    Map map = riskDTO.getRiskValue();
                                    subStringMap.put("riskName", map.get("name").toString());
                                    if (map.containsKey("desc")) {
                                        subStringMap.put("riskDesc", map.get("desc").toString());
                                    }
                                    subStringMap.put("likelihood", map.get("likeliHood").toString());
                                    subStringMap.put("impact", map.get("impact").toString());
                                    subStringMap.put("riskCategory", map.get("riskcategory").toString());
                                    subStringMap.put("businessimpact", map.get("impactDesc").toString());
                                    subStringMap.put("financialImpact", map.get("financialImpact").toString());
                                    subStringMap.put("dateRaised", map.get("dateRaised").toString());
                                    subStringMap.put("dateCompleted", map.get("dateCompleted").toString());
                                    subStringMap.put("nextAssessment", map.get("nextAssessment").toString());
                                    subStringMap.put("raisedBy", map.get("ownerName").toString());
                                    subStringMap.put("riskActive", String.valueOf(riskDTO.getActive()));
                                    subStringMap.put("implementationType", "Consequence");
                                    Map consequenceObjectMap = riskConsequenceDTO.getConsequenceValue();
                                    subStringMap.put("typeName", consequenceObjectMap.get("name").toString());
                                    if (consequenceObjectMap.containsKey("description")) {
                                        subStringMap.put("typeDesc", consequenceObjectMap.get("description").toString());
                                    }
                                    if (consequenceObjectMap.containsKey("riskRating")) {
                                        subStringMap.put("rating", consequenceObjectMap.get("riskRating").toString());
                                    }
                                    subStringMap.put("typeActive", String.valueOf(riskConsequenceDTO.getActive()));
                                    Map subCauseObjectMap = riskCauseAndConsequenceDTO2.getCauseAndConsequenceValue();
                                    subStringMap.put("mappingCauseName", subCauseObjectMap.get("name").toString());
                                    if (subCauseObjectMap.containsKey("riskRating")) {
                                        subStringMap.put("mappingCauseRating", subCauseObjectMap.get("riskRating").toString());
                                    }
                                    mapList.add(subStringMap);
                                }
                            }
                        }
                        if (!riskDTO.getRiskPlanList().isEmpty()) {
                            for (Object _obj_riskPlanDTO : riskDTO.getRiskPlanList()) {
                                RiskPlanDTO riskPlanDTO = (RiskPlanDTO) _obj_riskPlanDTO;
                                stringMap = new HashMap();
                                if (deptUniqueID != null) {
                                    stringMap.put("departmentID", deptUniqueID);
                                }
                                stringMap.put("pageName", pageName);
                                stringObjectMap = riskDTO.getRiskValue();
                                stringMap.put("riskName", stringObjectMap.get("name").toString());
                                if (stringObjectMap.containsKey("desc")) {
                                    stringMap.put("riskDesc", stringObjectMap.get("desc").toString());
                                }
                                stringMap.put("likelihood", stringObjectMap.get("likeliHood").toString());
                                stringMap.put("impact", stringObjectMap.get("impact").toString());
                                stringMap.put("riskCategory", stringObjectMap.get("riskcategory").toString());
                                stringMap.put("businessimpact", stringObjectMap.get("impactDesc").toString());
                                stringMap.put("financialImpact", stringObjectMap.get("financialImpact").toString());
                                stringMap.put("dateRaised", stringObjectMap.get("dateRaised").toString());
                                stringMap.put("dateCompleted", stringObjectMap.get("dateCompleted").toString());
                                stringMap.put("nextAssessment", stringObjectMap.get("nextAssessment").toString());
                                stringMap.put("raisedBy", stringObjectMap.get("ownerName").toString());
                                stringMap.put("riskActive", String.valueOf(riskDTO.getActive()));
                                stringMap.put("implementationType", "Plan");
                                planObjectMap = riskPlanDTO.getRiskPlanValue();
                                stringMap.put("typeName", planObjectMap.get("name").toString());
                                if (planObjectMap.containsKey("description")) {
                                    stringMap.put("typeDesc", planObjectMap.get("description").toString());
                                }
                                stringMap.put("progress", planObjectMap.get("progressval").toString());
                                stringMap.put("resolveDate", planObjectMap.get("resolveDate").toString());
                                stringMap.put("action", planObjectMap.get("action").toString());
                                stringMap.put("typeActive", String.valueOf(riskPlanDTO.getActive()));
                                if (planObjectMap.containsKey("multipleOwners")) {
                                    stringMap.put("plannedUser", this.getMultipleOwner(planObjectMap.get("multipleOwners").toString()));
                                }
                                riskCauseAndConsequenceDTO = this.riskCauseAndConsequenceService.retrieveRiskCauseAndConsequence(Long.valueOf(planObjectMap.get("cause").toString()));
                                causeName = null;
                                if (riskCauseAndConsequenceDTO != null) {
                                    causeName = riskCauseAndConsequenceDTO.getCauseAndConsequenceValue().get("name").toString();
                                    stringMap.put("mappingCauseName", causeName);
                                }
                                mapList.add(stringMap);
                                for (Object _obj_riskActivitiesDTO : riskPlanDTO.getRiskActivitiesDTOList()) {
                                    RiskActivitiesDTO riskActivitiesDTO = (RiskActivitiesDTO) _obj_riskActivitiesDTO;
                                    riskActivitiesMap = new HashMap();
                                    if (deptUniqueID != null) {
                                        riskActivitiesMap.put("departmentID", deptUniqueID);
                                    }
                                    riskActivitiesMap.put("pageName", pageName);
                                    riskDTORiskValue = riskDTO.getRiskValue();
                                    riskActivitiesMap.put("riskName", riskDTORiskValue.get("name").toString());
                                    if (stringObjectMap.containsKey("desc")) {
                                        riskActivitiesMap.put("riskDesc", riskDTORiskValue.get("desc").toString());
                                    }
                                    riskActivitiesMap.put("likelihood", riskDTORiskValue.get("likeliHood").toString());
                                    riskActivitiesMap.put("impact", riskDTORiskValue.get("impact").toString());
                                    riskActivitiesMap.put("riskCategory", riskDTORiskValue.get("riskcategory").toString());
                                    riskActivitiesMap.put("businessimpact", riskDTORiskValue.get("impactDesc").toString());
                                    riskActivitiesMap.put("financialImpact", riskDTORiskValue.get("financialImpact").toString());
                                    riskActivitiesMap.put("dateRaised", riskDTORiskValue.get("dateRaised").toString());
                                    riskActivitiesMap.put("dateCompleted", riskDTORiskValue.get("dateCompleted").toString());
                                    riskActivitiesMap.put("nextAssessment", riskDTORiskValue.get("nextAssessment").toString());
                                    riskActivitiesMap.put("raisedBy", riskDTORiskValue.get("ownerName").toString());
                                    riskActivitiesMap.put("riskActive", String.valueOf(riskDTO.getActive()));
                                    riskActivitiesMap.put("implementationType", "Action");
                                    activitiesMap = riskActivitiesDTO.getRiskActivitiesValue();
                                    riskActivitiesMap.put("typeName", activitiesMap.get("name").toString());
                                    riskActivitiesMap.put("progress", activitiesMap.get("progress").toString());
                                    riskActivitiesMap.put("resolveDate", activitiesMap.get("resoleveby").toString());
                                    riskActivitiesMap.put("actionStatus", activitiesMap.get("status").toString());
                                    riskActivitiesMap.put("typeActive", String.valueOf(riskActivitiesDTO.getActive()));
                                    riskActivitiesMap.put("mappingCauseName", causeName);
                                    planMap = riskPlanDTO.getRiskPlanValue();
                                    riskActivitiesMap.put("mappingPlanName", planMap.get("name").toString());
                                    mapList.add(riskActivitiesMap);
                                }
                            }
                        }
                        if (!riskDTO.getRiskMonitoringList().isEmpty()) {
                            for (Object _obj_monitoringDTO : riskDTO.getRiskMonitoringList()) {
                                RiskMonitoringDTO monitoringDTO = (RiskMonitoringDTO) _obj_monitoringDTO;
                                stringMap = new HashMap();
                                if (deptUniqueID != null) {
                                    stringMap.put("departmentID", deptUniqueID);
                                }
                                stringMap.put("pageName", pageName);
                                stringObjectMap = riskDTO.getRiskValue();
                                stringMap.put("riskName", stringObjectMap.get("name").toString());
                                if (stringObjectMap.containsKey("desc")) {
                                    stringMap.put("riskDesc", stringObjectMap.get("desc").toString());
                                }
                                stringMap.put("likelihood", stringObjectMap.get("likeliHood").toString());
                                stringMap.put("impact", stringObjectMap.get("impact").toString());
                                stringMap.put("riskCategory", stringObjectMap.get("riskcategory").toString());
                                stringMap.put("businessimpact", stringObjectMap.get("impactDesc").toString());
                                stringMap.put("financialImpact", stringObjectMap.get("financialImpact").toString());
                                stringMap.put("dateRaised", stringObjectMap.get("dateRaised").toString());
                                stringMap.put("dateCompleted", stringObjectMap.get("dateCompleted").toString());
                                stringMap.put("nextAssessment", stringObjectMap.get("nextAssessment").toString());
                                stringMap.put("raisedBy", stringObjectMap.get("ownerName").toString());
                                stringMap.put("riskActive", String.valueOf(riskDTO.getActive()));
                                stringMap.put("implementationType", "Plan");
                                planObjectMap = monitoringDTO.getRiskMonitoringValue();
                                stringMap.put("typeName", planObjectMap.get("name").toString());
                                if (planObjectMap.containsKey("description")) {
                                    stringMap.put("typeDesc", planObjectMap.get("description").toString());
                                }
                                stringMap.put("progress", planObjectMap.get("progressval").toString());
                                stringMap.put("resolveDate", planObjectMap.get("resolveDate").toString());
                                stringMap.put("action", planObjectMap.get("action").toString());
                                stringMap.put("typeActive", String.valueOf(monitoringDTO.getActive()));
                                if (planObjectMap.containsKey("multipleOwners")) {
                                    stringMap.put("plannedUser", this.getMultipleOwner(planObjectMap.get("multipleOwners").toString()));
                                }
                                riskCauseAndConsequenceDTO = this.riskCauseAndConsequenceService.retrieveRiskCauseAndConsequence(Long.valueOf(planObjectMap.get("cause").toString()));
                                causeName = null;
                                if (riskCauseAndConsequenceDTO != null) {
                                    causeName = riskCauseAndConsequenceDTO.getCauseAndConsequenceValue().get("name").toString();
                                    stringMap.put("mappingCauseName", causeName);
                                }
                                mapList.add(stringMap);
                                for (Object _obj_riskActivitiesDTO : monitoringDTO.getRiskReviewList()) {
                                    RiskActivitiesDTO riskActivitiesDTO = (RiskActivitiesDTO) _obj_riskActivitiesDTO;
                                    riskActivitiesMap = new HashMap();
                                    if (deptUniqueID != null) {
                                        riskActivitiesMap.put("departmentID", deptUniqueID);
                                    }
                                    riskActivitiesMap.put("pageName", pageName);
                                    riskDTORiskValue = riskDTO.getRiskValue();
                                    riskActivitiesMap.put("riskName", riskDTORiskValue.get("name").toString());
                                    if (stringObjectMap.containsKey("desc")) {
                                        riskActivitiesMap.put("riskDesc", riskDTORiskValue.get("desc").toString());
                                    }
                                    riskActivitiesMap.put("likelihood", riskDTORiskValue.get("likeliHood").toString());
                                    riskActivitiesMap.put("impact", riskDTORiskValue.get("impact").toString());
                                    riskActivitiesMap.put("riskCategory", riskDTORiskValue.get("riskcategory").toString());
                                    riskActivitiesMap.put("businessimpact", riskDTORiskValue.get("impactDesc").toString());
                                    riskActivitiesMap.put("financialImpact", riskDTORiskValue.get("financialImpact").toString());
                                    riskActivitiesMap.put("dateRaised", riskDTORiskValue.get("dateRaised").toString());
                                    riskActivitiesMap.put("dateCompleted", riskDTORiskValue.get("dateCompleted").toString());
                                    riskActivitiesMap.put("nextAssessment", riskDTORiskValue.get("nextAssessment").toString());
                                    riskActivitiesMap.put("raisedBy", riskDTORiskValue.get("ownerName").toString());
                                    riskActivitiesMap.put("riskActive", String.valueOf(riskDTO.getActive()));
                                    riskActivitiesMap.put("implementationType", "Action");
                                    activitiesMap = riskActivitiesDTO.getRiskActivitiesValue();
                                    riskActivitiesMap.put("typeName", activitiesMap.get("name").toString());
                                    riskActivitiesMap.put("progress", activitiesMap.get("progress").toString());
                                    riskActivitiesMap.put("resolveDate", activitiesMap.get("resoleveby").toString());
                                    riskActivitiesMap.put("actionStatus", activitiesMap.get("status").toString());
                                    riskActivitiesMap.put("typeActive", String.valueOf(riskActivitiesDTO.getActive()));
                                    riskActivitiesMap.put("mappingCauseName", causeName);
                                    planMap = monitoringDTO.getRiskMonitoringValue();
                                    riskActivitiesMap.put("mappingPlanName", planMap.get("name").toString());
                                    mapList.add(riskActivitiesMap);
                                }
                            }
                        }
                        if (!riskDTO.getRiskCommentsList().isEmpty()) {
                            for (Object _obj_riskCommentsDTO : riskDTO.getRiskCommentsList()) {
                                RiskCommentsDTO riskCommentsDTO = (RiskCommentsDTO) _obj_riskCommentsDTO;
                                stringMap = new HashMap();
                                if (deptUniqueID != null) {
                                    stringMap.put("departmentID", deptUniqueID);
                                }
                                stringMap.put("pageName", pageName);
                                stringObjectMap = riskDTO.getRiskValue();
                                stringMap.put("riskName", stringObjectMap.get("name").toString());
                                if (stringObjectMap.containsKey("desc")) {
                                    stringMap.put("riskDesc", stringObjectMap.get("desc").toString());
                                }
                                stringMap.put("likelihood", stringObjectMap.get("likeliHood").toString());
                                stringMap.put("impact", stringObjectMap.get("impact").toString());
                                stringMap.put("riskCategory", stringObjectMap.get("riskcategory").toString());
                                stringMap.put("businessimpact", stringObjectMap.get("impactDesc").toString());
                                stringMap.put("financialImpact", stringObjectMap.get("financialImpact").toString());
                                stringMap.put("dateRaised", stringObjectMap.get("dateRaised").toString());
                                stringMap.put("dateCompleted", stringObjectMap.get("dateCompleted").toString());
                                stringMap.put("nextAssessment", stringObjectMap.get("nextAssessment").toString());
                                stringMap.put("raisedBy", stringObjectMap.get("ownerName").toString());
                                stringMap.put("riskActive", String.valueOf(riskDTO.getActive()));
                                stringMap.put("implementationType", "Comments");
                                Map commentsValue = riskCommentsDTO.getRiskCommentsValue();
                                stringMap.put("typeDesc", commentsValue.get("desc").toString());
                                stringMap.put("typeActive", String.valueOf(riskCommentsDTO.getActive()));
                                mapList.add(stringMap);
                            }
                        }
                    }
                    if (!Objects.nonNull(mapList) || !CollectionUtils.isEmpty(mapList)) continue;
                    HashMap stringMap = new HashMap();
                    if (deptUniqueID != null) {
                        stringMap.put("departmentID", deptUniqueID);
                    }
                    stringMap.put("pageName", pageName);
                    Map stringObjectMap = riskDTO.getRiskValue();
                    stringMap.put("riskName", stringObjectMap.get("name").toString());
                    if (stringObjectMap.containsKey("desc")) {
                        stringMap.put("riskDesc", stringObjectMap.get("desc").toString());
                    }
                    stringMap.put("likelihood", stringObjectMap.get("likeliHood").toString());
                    stringMap.put("impact", stringObjectMap.get("impact").toString());
                    stringMap.put("riskCategory", stringObjectMap.get("riskcategory").toString());
                    stringMap.put("businessimpact", stringObjectMap.get("impactDesc").toString());
                    stringMap.put("financialImpact", stringObjectMap.get("financialImpact").toString());
                    stringMap.put("dateRaised", stringObjectMap.get("dateRaised").toString());
                    stringMap.put("dateCompleted", stringObjectMap.get("dateCompleted").toString());
                    stringMap.put("nextAssessment", stringObjectMap.get("nextAssessment").toString());
                    stringMap.put("raisedBy", stringObjectMap.get("ownerName").toString());
                    stringMap.put("riskActive", String.valueOf(riskDTO.getActive()));
                    mapList.add(stringMap);
                }
            }
            if (mapList != null && CollectionUtils.isNotEmpty(mapList)) {
                String[] COLUMNs = new String[]{"Department ID", "PageName", "Risk Name", "Risk Description", "Likelihood", "Impact", "Risk Category", "Business Impact", "Financial Impact", "Date Raised", "Date Completed", "Next Assessment", "Raised by", "Implementaion Type", "Type Name", "Type Description", "Rating", "Mapping Cause Name", "Mapping Cause Rating", "Plan Action", "Resolve By Date", "Progress", "Planed Users", "Action Status", "Mapping Plan Name", "Delete Risk", "Delete Type"};
                XSSFWorkbook workbook = new XSSFWorkbook();
                CreationHelper createHelper = workbook.getCreationHelper();
                String sheetname = "InitiativeExportName";
                if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                    sheetname = UserThreadLocal.get().getProfile().getFirstName();
                }
                Sheet sheet = workbook.createSheet(sheetname);
                Font headerFont = workbook.createFont();
                headerFont.setBold(true);
                headerFont.setColor(IndexedColors.BLUE.getIndex());
                CellStyle headerCellStyle = workbook.createCellStyle();
                headerCellStyle.setFont(headerFont);
                Row headerRow = sheet.createRow(0);
                for (int col = 0; col < COLUMNs.length; ++col) {
                    Cell cell = headerRow.createCell(col);
                    cell.setCellValue(COLUMNs[col]);
                    cell.setCellStyle(headerCellStyle);
                }
                int rowIdx = 1;
                for (Object _obj_map : mapList) {
                    Map map = (Map) _obj_map;
                    if (map == null || map == null) continue;
                    Row row = sheet.createRow(rowIdx++);
                    if (map.containsKey("departmentID")) {
                        row.createCell(0).setCellValue((String)map.get("departmentID"));
                    } else {
                        row.createCell(0).setCellValue("");
                    }
                    if (map.containsKey("pageName")) {
                        if (map.get("pageName") != null) {
                            row.createCell(1).setCellValue((String)map.get("pageName"));
                        } else {
                            row.createCell(1).setCellValue("");
                        }
                    } else {
                        row.createCell(1).setCellValue("");
                    }
                    if (map.containsKey("riskName")) {
                        if (map.get("riskName") != null) {
                            row.createCell(2).setCellValue((String)map.get("riskName"));
                        } else {
                            row.createCell(2).setCellValue("");
                        }
                    } else {
                        row.createCell(2).setCellValue("");
                    }
                    if (map.containsKey("riskDesc")) {
                        if (map.get("riskDesc") != null) {
                            row.createCell(3).setCellValue((String)map.get("riskDesc"));
                        } else {
                            row.createCell(3).setCellValue("");
                        }
                    } else {
                        row.createCell(3).setCellValue("");
                    }
                    if (map.containsKey("likelihood")) {
                        if (map.get("likelihood") != null) {
                            row.createCell(4).setCellValue((String)map.get("likelihood"));
                        } else {
                            row.createCell(4).setCellValue("");
                        }
                    } else {
                        row.createCell(4).setCellValue("");
                    }
                    if (map.containsKey("impact")) {
                        if (map.get("impact") != null) {
                            row.createCell(5).setCellValue((String)map.get("impact"));
                        } else {
                            row.createCell(5).setCellValue("");
                        }
                    } else {
                        row.createCell(5).setCellValue("");
                    }
                    if (map.containsKey("riskCategory")) {
                        if (map.get("riskCategory") != null) {
                            row.createCell(6).setCellValue((String)map.get("riskCategory"));
                        } else {
                            row.createCell(6).setCellValue("");
                        }
                    } else {
                        row.createCell(6).setCellValue("");
                    }
                    if (map.containsKey("businessimpact")) {
                        if (map.get("businessimpact") != null) {
                            row.createCell(7).setCellValue((String)map.get("businessimpact"));
                        } else {
                            row.createCell(7).setCellValue("");
                        }
                    } else {
                        row.createCell(7).setCellValue("");
                    }
                    if (map.containsKey("financialImpact")) {
                        if (map.get("financialImpact") != null) {
                            row.createCell(8, CellType.STRING).setCellValue((String)map.get("financialImpact"));
                        } else {
                            row.createCell(8, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(8, CellType.STRING).setCellValue("");
                    }
                    if (map.containsKey("dateRaised")) {
                        if (map.get("dateRaised") != null) {
                            row.createCell(9).setCellValue((String)map.get("dateRaised"));
                        } else {
                            row.createCell(9).setCellValue("");
                        }
                    } else {
                        row.createCell(9).setCellValue("");
                    }
                    if (map.containsKey("dateCompleted")) {
                        if (map.get("dateCompleted") != null) {
                            row.createCell(10).setCellValue((String)map.get("dateCompleted"));
                        } else {
                            row.createCell(10).setCellValue("");
                        }
                    } else {
                        row.createCell(10).setCellValue("");
                    }
                    if (map.containsKey("nextAssessment")) {
                        if (map.get("nextAssessment") != null) {
                            row.createCell(11).setCellValue((String)map.get("nextAssessment"));
                        } else {
                            row.createCell(11).setCellValue("");
                        }
                    } else {
                        row.createCell(11).setCellValue("");
                    }
                    if (map.containsKey("raisedBy")) {
                        if (map.get("raisedBy") != null) {
                            row.createCell(12).setCellValue((String)map.get("raisedBy"));
                        } else {
                            row.createCell(12).setCellValue("");
                        }
                    } else {
                        row.createCell(12).setCellValue("");
                    }
                    if (map.containsKey("implementationType")) {
                        if (map.get("implementationType") != null) {
                            row.createCell(13).setCellValue((String)map.get("implementationType"));
                        } else {
                            row.createCell(13).setCellValue("");
                        }
                    } else {
                        row.createCell(13).setCellValue("");
                    }
                    if (map.containsKey("typeName")) {
                        if (map.get("typeName") != null) {
                            row.createCell(14).setCellValue((String)map.get("typeName"));
                        } else {
                            row.createCell(14).setCellValue("");
                        }
                    } else {
                        row.createCell(14).setCellValue("");
                    }
                    if (map.containsKey("typeDesc")) {
                        if (map.get("typeDesc") != null) {
                            row.createCell(15).setCellValue((String)map.get("typeDesc"));
                        } else {
                            row.createCell(15).setCellValue("");
                        }
                    } else {
                        row.createCell(15).setCellValue("");
                    }
                    if (map.containsKey("rating")) {
                        if (map.get("rating") != null) {
                            row.createCell(16).setCellValue((String)map.get("rating"));
                        } else {
                            row.createCell(16).setCellValue("");
                        }
                    } else {
                        row.createCell(16).setCellValue("");
                    }
                    if (map.containsKey("mappingCauseName")) {
                        if (map.get("mappingCauseName") != null) {
                            row.createCell(17).setCellValue((String)map.get("mappingCauseName"));
                        } else {
                            row.createCell(17).setCellValue("");
                        }
                    } else {
                        row.createCell(17).setCellValue("");
                    }
                    if (map.containsKey("mappingCauseRating")) {
                        if (map.get("mappingCauseRating") != null) {
                            row.createCell(18).setCellValue((String)map.get("mappingCauseRating"));
                        } else {
                            row.createCell(18).setCellValue("");
                        }
                    } else {
                        row.createCell(18).setCellValue("");
                    }
                    if (map.containsKey("action")) {
                        if (map.get("action") != null) {
                            row.createCell(19).setCellValue((String)map.get("action"));
                        } else {
                            row.createCell(19).setCellValue("");
                        }
                    } else {
                        row.createCell(19).setCellValue("");
                    }
                    if (map.containsKey("resolveDate")) {
                        if (map.get("resolveDate") != null) {
                            row.createCell(20).setCellValue((String)map.get("resolveDate"));
                        } else {
                            row.createCell(20).setCellValue("");
                        }
                    } else {
                        row.createCell(20).setCellValue("");
                    }
                    if (map.containsKey("progress")) {
                        if (map.get("progress") != null) {
                            row.createCell(21, CellType.STRING).setCellValue((String)map.get("progress"));
                        } else {
                            row.createCell(21, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(21, CellType.STRING).setCellValue("");
                    }
                    if (map.containsKey("plannedUser")) {
                        if (map.get("plannedUser") != null) {
                            row.createCell(22).setCellValue((String)map.get("plannedUser"));
                        } else {
                            row.createCell(22).setCellValue("");
                        }
                    } else {
                        row.createCell(22).setCellValue("");
                    }
                    if (map.containsKey("actionStatus")) {
                        if (map.get("actionStatus") != null) {
                            row.createCell(23).setCellValue((String)map.get("actionStatus"));
                        } else {
                            row.createCell(23).setCellValue("");
                        }
                    } else {
                        row.createCell(23).setCellValue("");
                    }
                    if (map.containsKey("mappingPlanName")) {
                        if (map.get("mappingPlanName") != null) {
                            row.createCell(24).setCellValue((String)map.get("mappingPlanName"));
                        } else {
                            row.createCell(24).setCellValue("");
                        }
                    } else {
                        row.createCell(24).setCellValue("");
                    }
                    if (map.containsKey("riskActive")) {
                        if (map.get("riskActive") != null) {
                            row.createCell(25, CellType.STRING).setCellValue((String)map.get("riskActive"));
                        } else {
                            row.createCell(25, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(25, CellType.STRING).setCellValue("");
                    }
                    if (map.containsKey("typeActive")) {
                        if (map.get("typeActive") != null) {
                            row.createCell(26, CellType.STRING).setCellValue((String)map.get("typeActive"));
                        } else {
                            row.createCell(26, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(26, CellType.STRING).setCellValue("");
                    }
                    Cell cell = row.createCell(27);
                }
                header.setContentType(new MediaType("application", "force-download"));
                header.set("Content-Disposition", "attachment; filename= " + pageName + ".xlsx");
                workbook.write((OutputStream)stream);
                workbook.close();
                this.auditTrailService.save("Excel " + pageName + "Downloaded");
                return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.EXPECTATION_FAILED);
    }

    public String getMultipleOwner(String multipleOwners) {
        StringBuilder stringBuilder = new StringBuilder();
        if (!multipleOwners.isEmpty() && multipleOwners != null) {
            List<String> multi = Arrays.asList(multipleOwners.split("\\,"));
            for (String id : multi) {
                Employee employee = this.employeeService.getProfileDetails(id);
                stringBuilder.append(employee.getEmailAddress());
                stringBuilder.append(",");
            }
        }
        return stringBuilder.toString();
    }
}

