/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ActivitiesDTO
 *  com.estrat.web.dto.BudgetDTO
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.InitiativesDTO
 *  com.estrat.web.dto.MasterValueDto
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.dto.SubActivitiesDTO
 *  com.estrat.web.dto.SubInitiativesDTO
 *  com.estrat.web.service.ActivitiesService
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.BudgetDetailService
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.InitiativeService
 *  com.estrat.web.service.MasterValueService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.SubActivitiesService
 *  com.estrat.web.service.SubInitiativeService
 *  com.estrat.web.util.BudgetReaderUtil
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
 *  org.apache.poi.ss.usermodel.FormulaEvaluator
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

import com.estrat.web.dto.ActivitiesDTO;
import com.estrat.web.dto.BudgetDTO;
import com.estrat.web.dto.ControlPanelGeneralDTO;
import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.Employee;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.InitiativesDTO;
import com.estrat.web.dto.MasterValueDto;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.dto.SubActivitiesDTO;
import com.estrat.web.dto.SubInitiativesDTO;
import com.estrat.web.service.ActivitiesService;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.BudgetDetailService;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.InitiativeService;
import com.estrat.web.service.MasterValueService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.SubActivitiesService;
import com.estrat.web.service.SubInitiativeService;
import com.estrat.web.util.UserThreadLocal;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
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
public class BudgetReaderUtil {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private PageService pageService;
    @Autowired
    protected AuditTrailService auditTrailService;
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;
    @Autowired
    private InitiativeService initiativeService;
    @Autowired
    private SubInitiativeService subInitiativeService;
    @Autowired
    private ActivitiesService activitiesService;
    @Autowired
    private MasterValueService masterValueService;
    @Autowired
    private BudgetDetailService budgetDetailService;
    @Autowired
    private SubActivitiesService subActivitiesService;
    private Logger logger = Logger.getLogger(BudgetReaderUtil.class);

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

    public Map importBulkBudgetDetails(InputStream inputStream, String type) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            DataFormatter df = new DataFormatter();
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            System.out.println("type : " + type);
            if (type != null && type.equals("validation")) {
                System.out.println("enter validate check");
                resultMap = this.checkValidationForExcelSheet(myExcelBook);
            } else {
                System.out.println("enter in data check");
                resultMap = this.importBulkBudgets(myExcelBook);
                this.auditTrailService.save("Excel-Budget Upload");
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        return resultMap;
    }

    public Map checkValidationForExcelSheet(XSSFWorkbook myExcelBook) {
        DataFormatter df = new DataFormatter();
        XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
        evaluator.evaluateAll();
        HashMap resultMap = new HashMap();
        Map<String, Object> stringMap = null;
        ArrayList<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
        try {
            for (int sheetIndex = 0; sheetIndex < myExcelBook.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet ExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                if (ExcelSheet == null) {
                    this.logger.debug("Sheet not found");
                    continue;
                }
                String excelSheetName = ExcelSheet.getSheetName();
                int totalRows = ExcelSheet.getPhysicalNumberOfRows();
                if (totalRows == 1) {
                    stringMap = new HashMap();
                    stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                    stringMap.put("error", ("Budget Import Sheet is empty"));
                    stringMap.put("rowNo", (""));
                    stringMap.put("highLightcellName", ("Excel-SheetName"));
                    mapList.add(stringMap);
                    continue;
                }
                for (int i = 1; i < totalRows; ++i) {
                    stringMap = new HashMap();
                    XSSFRow row = ExcelSheet.getRow(i);
                    try {
                        block54: {
                            if (BudgetReaderUtil.isRowEmpty((XSSFRow)row)) {
                                this.logger.debug("Row is empty");
                                continue;
                            }
                            ControlPanelGeneralDTO cpanel = this.controlPanelGeneralService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
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
                                            break block54;
                                        }
                                        stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                        stringMap.put("error", (("Department ID NOT Found : " + deptValue)));
                                        stringMap.put("rowNo", row.getCTRow().getR());
                                        stringMap.put("highLightcellName", ("Department ID"));
                                        mapList.add(stringMap);
                                    }
                                    catch (Exception e) {
                                        stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                        stringMap.put("error", e.getMessage());
                                        stringMap.put("rowNo", row.getCTRow().getR());
                                        stringMap.put("highLightcellName", ("Department ID"));
                                        mapList.add(stringMap);
                                    }
                                } else {
                                    stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", ("Department id is empty"));
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("highLightcellName", ("Department ID"));
                                    mapList.add(stringMap);
                                }
                            }
                        }
                        if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("PageName is empty"));
                            stringMap.put("highLightcellName", ("Page Name"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                            this.logger.info("owner valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Owner is empty"));
                            stringMap.put("highLightcellName", ("Owner"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Year is empty"));
                            stringMap.put("highLightcellName", ("Year"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Month is empty"));
                            stringMap.put("highLightcellName", ("Month"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Version is empty"));
                            stringMap.put("highLightcellName", ("Version"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("GL Account is empty"));
                            stringMap.put("highLightcellName", ("GL Account"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("GL Name is empty"));
                            stringMap.put("highLightcellName", ("GL Name"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Budget Type is empty"));
                            stringMap.put("highLightcellName", ("Budget Type"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Project/Initiative is empty"));
                            stringMap.put("highLightcellName", ("Project/Initiative"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Sub Initiative is empty"));
                            stringMap.put("highLightcellName", ("Sub Initiative"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Activity is empty"));
                            stringMap.put("highLightcellName", ("Activity"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Sub Activity is empty"));
                            stringMap.put("highLightcellName", ("Sub Activity"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(15) != null && row.getCell(15).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Currency is empty"));
                            stringMap.put("highLightcellName", ("Currency"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Unit Amount is empty"));
                            stringMap.put("highLightcellName", ("Unit Amount"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Total Budget is empty"));
                            stringMap.put("highLightcellName", ("Total Budget"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(19) != null && row.getCell(19).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Department is empty"));
                            stringMap.put("highLightcellName", ("Department"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Employee is empty"));
                            stringMap.put("highLightcellName", ("Employee"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                        } else {
                            stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", ("Notes is empty"));
                            stringMap.put("highLightcellName", ("Notes"));
                            mapList.add(stringMap);
                        }
                        if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget valid");
                            continue;
                        }
                        stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                        stringMap.put("rowNo", row.getCTRow().getR());
                        stringMap.put("error", ("Action is empty"));
                        stringMap.put("highLightcellName", ("Action"));
                        mapList.add(stringMap);
                        continue;
                    }
                    catch (Exception e) {
                        stringMap = this.getWriteDocForBudget(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                        stringMap.put("error", e.getMessage());
                        stringMap.put("rowNo", row.getCTRow().getR());
                        mapList.add(stringMap);
                    }
                }
            }
            if (mapList != null && !mapList.isEmpty()) {
                resultMap.put("parsingError", mapList);
                resultMap.put("result", "Not-Success");
            } else {
                resultMap.put("result", "success");
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        System.out.println("exit validation");
        return resultMap;
    }

    public Map importBulkBudgets(XSSFWorkbook myExcelBook) throws IOException {
        System.out.println("enter budget import");
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
                Long initiativeId = null;
                Long subInitiativeId = null;
                Long activityId = null;
                for (int i = 1; i < totalRows; ++i) {
                    XSSFRow row;
                    block70: {
                        System.out.println("enter in for");
                        Map budgetMap = null;
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
                            e.printStackTrace();
                            ++errordocs;
                            continue;
                        }
                        HashMap<String, Map> pageMap = new HashMap<String, Map>();
                        try {
                            ActivitiesDTO activity;
                            String activityname;
                            List filteredList;
                            Long deptId;
                            Long pageId;
                            Long owner;
                            block71: {
                                if (BudgetReaderUtil.isRowEmpty((XSSFRow)row)) {
                                    this.logger.debug("Row is empty");
                                    break block70;
                                }
                                owner = null;
                                pageId = null;
                                ControlPanelGeneralDTO cpanel = this.controlPanelGeneralService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                if (cpanel != null && cpanel.getImplementationType() != null && cpanel.getImplementationType().equalsIgnoreCase("department")) {
                                    if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                                        this.logger.info("validate Department ID");
                                    } else {
                                        ++errordocs;
                                        continue;
                                    }
                                }
                                if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    this.logger.error("Page invalid");
                                    continue;
                                }
                                pageName = row.getCell(1).getStringCellValue().trim();
                                if (row.getCell(2) == null || row.getCell(2).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    this.logger.error("Budget Owner invalid");
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
                                    List budgetList;
                                    Map response = this.pageService.checkpages(pageName, PageOwner.longValue());
                                    if (!response.containsKey("success")) {
                                        ScoreCardResponseDTO responsePage;
                                        PageDTO pageDTO1 = new PageDTO();
                                        pageDTO1.setPageName(pageName);
                                        pageDTO1.setCreatedBy(PageOwner.longValue());
                                        pageDTO1.setPageType("Budget");
                                        pageDTO1.setCreatedTime(LocalDateTime.now());
                                        if (deptId != null) {
                                            pageDTO1.setDeptId(deptId);
                                        }
                                        if (Objects.nonNull(responsePage = (ScoreCardResponseDTO)this.pageService.saveDetails(pageDTO1).getBody())) {
                                            createStatus = true;
                                            checkcreaterowno = row.getCTRow().getR();
                                            pageId = responsePage.getPageDTO().getId();
                                            budgetList = this.budgetDetailService.findByAllPageId(pageId, null);
                                            budgetMap = this.mapPage(budgetList);
                                            String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                            pageMap.put(key, budgetMap);
                                        }
                                    } else {
                                        updateStatus = true;
                                        checkupdaterowno = row.getCTRow().getR();
                                        String id = response.get("pageId").toString();
                                        pageId = Long.parseLong(id);
                                        String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                        if (Objects.nonNull(pageMap.get(key))) {
                                            budgetMap = (Map)pageMap.get(key);
                                        } else {
                                            budgetList = this.budgetDetailService.findByAllPageId(pageId, null);
                                            budgetMap = this.mapPage(budgetList);
                                            pageMap.put(key, budgetMap);
                                        }
                                    }
                                }
                                try {
                                    EmployeeDTO requestEmployeeDTO = new EmployeeDTO();
                                    String ownerStr = row.getCell(2).getStringCellValue().trim();
                                    if (ownerStr.contains("@")) {
                                        requestEmployeeDTO.setEmailAddress(ExcelSheet.getSheetName());
                                    } else {
                                        requestEmployeeDTO.setFirstName(ExcelSheet.getSheetName());
                                    }
                                    EmployeeDTO ownerDTO = this.employeeService.getEmployeeId(requestEmployeeDTO);
                                    if (Objects.nonNull(ownerDTO)) {
                                        owner = ownerDTO.getEmpId();
                                        break block71;
                                    }
                                    this.logger.error("Budget Owner not found");
                                    ++errordocs;
                                }
                                catch (Exception e) {
                                    e.printStackTrace();
                                    ++errordocs;
                                }
                                continue;
                            }
                            BudgetDTO budgetDTo = null;
                            HashMap typeMap = null;
                            if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                BudgetDTO budgetDTO = budgetDTo = budgetDTo == null ? new BudgetDTO() : budgetDTo;
                                if (budgetDTo.getBudgetValues() == null) {
                                    budgetDTo.setBudgetValues(new HashMap());
                                }
                                budgetDTo.getBudgetValues().put("year", String.valueOf((long)row.getCell(3).getNumericCellValue()));
                                budgetDTo.setOwner(owner.longValue());
                                budgetDTo.setPageId(pageId);
                                if (deptId != null) {
                                    budgetDTo.setDeptId(deptId.longValue());
                                }
                                budgetDTo.setCreateBy(PageOwner.longValue());
                                typeMap = new HashMap();
                            }
                            if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                                String inittiativeName = row.getCell(9).getStringCellValue().trim();
                                List initiatieList = this.initiativeService.findByEmpId(owner.longValue());
                                filteredList = ((java.util.List<com.estrat.web.dto.InitiativesDTO>)initiatieList).stream().filter(dto -> {
                                    Map valueMap = dto.getInitiativeValue();
                                    if (valueMap == null) {
                                        return false;
                                    }
                                    Object nameObj = valueMap.get("name");
                                    return nameObj != null && inittiativeName.equalsIgnoreCase(nameObj.toString());
                                }).collect(Collectors.toList());
                                if (!filteredList.isEmpty()) {
                                    InitiativesDTO first = (InitiativesDTO)filteredList.get(0);
                                    budgetDTo.setInitiativeId(first.getId());
                                    initiativeId = first.getId();
                                    budgetDTo.getBudgetValues().put("initiativeDesc", first.getInitiativeValue().get("name").toString());
                                    if (first.getInitiativeValue().containsKey("perspectiveName")) {
                                        budgetDTo.getBudgetValues().put("outcome", first.getInitiativeValue().get("perspectiveName").toString());
                                    }
                                    if (first.getInitiativeValue().containsKey("objectiveDesc")) {
                                        budgetDTo.getBudgetValues().put("objective", first.getInitiativeValue().get("objectiveDesc").toString());
                                    }
                                }
                            }
                            if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                budgetDTo.getBudgetValues().put("month", row.getCell(4).getStringCellValue().trim());
                            }
                            if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                                budgetDTo.getBudgetValues().put("version", String.valueOf((long)row.getCell(5).getNumericCellValue()));
                            }
                            if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                                String cellValue;
                                DataFormatter dataFormatter = new DataFormatter();
                                String accountNo = cellValue = dataFormatter.formatCellValue((Cell)row.getCell(6)).trim();
                                System.out.println("accountNo :: " + accountNo);
                                List masterList = this.masterValueService.findAllByTypes("BUDGET");
                                List master = ((java.util.List<com.estrat.web.dto.MasterValueDto>)masterList).stream().filter(dto -> {
                                    Map valuemap = dto.getData();
                                    if (valuemap == null) {
                                        return false;
                                    }
                                    Object nameObj = valuemap.get("glAccount");
                                    return nameObj != null && accountNo.equalsIgnoreCase(nameObj.toString());
                                }).collect(Collectors.toList());
                                if (!master.isEmpty()) {
                                    MasterValueDto masterDTO = (MasterValueDto)master.get(0);
                                    budgetDTo.getBudgetValues().put("glAccount", masterDTO.getId());
                                    budgetDTo.getBudgetValues().put("glaccountdesc", masterDTO.getData().get("glAccount").toString());
                                }
                            }
                            if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                                budgetDTo.getBudgetValues().put("glname", row.getCell(7).getStringCellValue().trim());
                            }
                            if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                                budgetDTo.getBudgetValues().put("budgetType", row.getCell(8).getStringCellValue().trim());
                            }
                            if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                                String subinitname = row.getCell(12).getStringCellValue().trim();
                                List subInitList = new ArrayList();
                                if (initiativeId != null) {
                                    subInitList = this.subInitiativeService.retrieveSubInitiativesList(initiativeId);
                                }
                                if (!(filteredList = ((java.util.List<com.estrat.web.dto.SubInitiativesDTO>)subInitList).stream().filter(dto -> {
                                    Map valueMap = dto.getSubInitiativeValue();
                                    if (valueMap == null) {
                                        return false;
                                    }
                                    Object nameObj = valueMap.get("description");
                                    return nameObj != null && subinitname.equalsIgnoreCase(nameObj.toString());
                                }).collect(Collectors.toList())).isEmpty()) {
                                    SubInitiativesDTO subinit = (SubInitiativesDTO)filteredList.get(0);
                                    subInitiativeId = subinit.getId();
                                    budgetDTo.setSubInitiativeId(subinit.getId());
                                    budgetDTo.getBudgetValues().put("subInDes", subinit.getSubInitiativeValue().get("description").toString());
                                    budgetDTo.getBudgetValues().put("subInitiativeDesc", subinit.getSubInitiativeValue().get("description").toString());
                                }
                            }
                            if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK) {
                                activityname = row.getCell(13).getStringCellValue().trim();
                                List activityList = new ArrayList();
                                if (subInitiativeId != null) {
                                    System.out.println("subInitiativeId :: " + subInitiativeId);
                                    activityList = this.activitiesService.retrieveSubInitiativeLists(subInitiativeId);
                                }
                                final String finalActivityName1 = activityname;
                                if (!(filteredList = ((java.util.List<com.estrat.web.dto.ActivitiesDTO>)activityList).stream().filter(dto -> {
                                    Map valueMap = dto.getActivitiesValue();
                                    if (valueMap == null) {
                                        return false;
                                    }
                                    Object nameObj = valueMap.get("desc");
                                    return nameObj != null && finalActivityName1.equalsIgnoreCase(nameObj.toString());
                                }).collect(Collectors.toList())).isEmpty()) {
                                    activity = (ActivitiesDTO)filteredList.get(0);
                                    budgetDTo.setActivityId(activity.getId());
                                    activityId = activity.getId();
                                    budgetDTo.getBudgetValues().put("activityDesc", activity.getActivitiesValue().get("desc").toString());
                                }
                            }
                            if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                                activityname = row.getCell(14).getStringCellValue().trim();
                                List subactivityList = new ArrayList();
                                if (activityId != null) {
                                    subactivityList = this.subActivitiesService.findAllByActivityId(activityId);
                                }
                                final String finalActivityName2 = activityname;
                                filteredList = ((java.util.List<com.estrat.web.dto.SubActivitiesDTO>)subactivityList).stream().filter(dto -> {
                                    Map valueMap = dto.getActivitiesValue();
                                    if (valueMap == null) {
                                        return false;
                                    }
                                    Object nameObj = valueMap.get("desc");
                                    return nameObj != null && finalActivityName2.equalsIgnoreCase(nameObj.toString());
                                }).collect(Collectors.toList());
                                System.out.println("filteredList sa :: " + filteredList);
                                if (!filteredList.isEmpty()) {
                                    com.estrat.web.dto.SubActivitiesDTO subActivity = (com.estrat.web.dto.SubActivitiesDTO)filteredList.get(0);
                                    budgetDTo.setSubActivityId(subActivity.getId());
                                    budgetDTo.getBudgetValues().put("subActivityDes", subActivity.getActivitiesValue().get("desc").toString());
                                }
                            }
                            if (row.getCell(15) != null && row.getCell(15).getCellType() != CellType.BLANK) {
                                budgetDTo.getBudgetValues().put("currency", row.getCell(15).getStringCellValue().trim());
                            }
                            if (row.getCell(16) != null && row.getCell(16).getCellType() != CellType.BLANK) {
                                budgetDTo.getBudgetValues().put("noofDays", String.valueOf((long)row.getCell(16).getNumericCellValue()));
                            }
                            if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) {
                                budgetDTo.getBudgetValues().put("unitamount", String.valueOf(row.getCell(17).getNumericCellValue()));
                            }
                            if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK) {
                                budgetDTo.getBudgetValues().put("amount", String.valueOf(row.getCell(18).getNumericCellValue()));
                            }
                            if (row.getCell(19) != null && row.getCell(19).getCellType() != CellType.BLANK) {
                                String deptName = row.getCell(19).getStringCellValue().trim();
                                List deptdetails = this.departmentDetailsService.findAllByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                List deptlist = ((java.util.List<com.estrat.web.dto.DeptDetails>)deptdetails).stream().filter(dto -> {
                                    if (dto == null) {
                                        return false;
                                    }
                                    String nameObj = dto.getName();
                                    return nameObj != null && deptName.equals(nameObj);
                                }).collect(Collectors.toList());
                                if (!deptlist.isEmpty()) {
                                    budgetDTo.getBudgetValues().put("division", ((DeptDetails)deptlist.get(0)).getId());
                                    budgetDTo.getBudgetValues().put("divisionDesc", row.getCell(19).getStringCellValue().trim());
                                } else {
                                    budgetDTo.getBudgetValues().put("divisionDesc", row.getCell(19).getStringCellValue().trim());
                                }
                            }
                            if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) {
                                String names = row.getCell(20).getStringCellValue().trim();
                                List employee = this.employeeService.getOrgEmployeeListByOrgId(Long.valueOf(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId()));
                                List emplist = ((java.util.List<com.estrat.web.dto.Employee>)employee).stream().filter(dto -> {
                                    if (dto == null) {
                                        return false;
                                    }
                                    String nameObj = dto.getFirstName();
                                    return nameObj != null && names.equals(nameObj);
                                }).collect(Collectors.toList());
                                if (!emplist.isEmpty()) {
                                    budgetDTo.getBudgetValues().put("person", ((Employee)emplist.get(0)).getEmpId());
                                    budgetDTo.getBudgetValues().put("personDesc", row.getCell(20).getStringCellValue().trim());
                                }
                            }
                            if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                                budgetDTo.getBudgetValues().put("notes", row.getCell(21).getStringCellValue().trim());
                            }
                            if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                budgetDTo.getBudgetValues().put("action", row.getCell(22).getRawValue());
                            }
                            BudgetDTO responseDTO = this.buildAndSaveBudgetDetails(PageOwner, pageId, budgetDTo);
                            System.out.println("Data saved");
                            budgetMap.put(this.getValue(responseDTO.getBudgetValues(), "name"), responseDTO);
                        }
                        catch (Exception e) {
                            e.printStackTrace();
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
            resultMap.put("no_of_processed", proceededdocs + errordocs);
            resultMap.put("no_of_created", createrows);
            resultMap.put("no_of_updated", updatedrows);
            resultMap.put("message", "Import Successful");
            System.out.println("excit budget import");
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            if (myExcelBook != null) {
                myExcelBook.close();
            }
        }
        return resultMap;
    }

    public BudgetDTO buildAndSaveBudgetDetails(Long pageOwner, Long pageId, BudgetDTO budgetDTO) {
        if (budgetDTO.getId() != null && budgetDTO.getId() != 0L) {
            budgetDTO.setUpdateBy(pageOwner.longValue());
            budgetDTO.setUpdateTime(LocalDateTime.now());
            return this.budgetDetailService.updateBudget(budgetDTO);
        }
        return this.budgetDetailService.saveBudget(budgetDTO);
    }

    public String getValue(Map inMap, String key) {
        String value = Objects.nonNull(inMap) && Objects.nonNull(inMap.get(key)) ? inMap.get(key).toString() : "";
        return value;
    }

    public Map getWriteDocForBudget(XSSFRow row, DataFormatter df, FormulaEvaluator evaluator, String excelSheetName) {
        HashMap map = new HashMap();
        map.put("Excel_SheetName", excelSheetName);
        evaluator.evaluateAll();
        try {
            if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                map.put("pageName", row.getCell(1).getStringCellValue().trim());
            } else {
                map.put("pageName", "");
            }
        }
        catch (NullPointerException e) {
            return map;
        }
        catch (Exception e) {
            return map;
        }
        return map;
    }

    public Map<String, BudgetDTO> mapPage(List<BudgetDTO> budgetList) {
        HashMap<String, BudgetDTO> budgetMap = new HashMap<String, BudgetDTO>();
        if (CollectionUtils.isNotEmpty(budgetList)) {
            budgetList.forEach(budget -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(budget.getBudgetValues(), "name"))) {
                    budgetMap.put(this.getValue(budget.getBudgetValues(), "name"), (BudgetDTO)budget);
                }
            });
        }
        return budgetMap;
    }

    public ResponseEntity<ByteArrayResource> writeDocForBudgetDetails(List<BudgetDTO> budgetDTOs) throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        ArrayList mapList = new ArrayList();
        String pageName = null;
        String deptUniqueID = null;
        try {
            if (CollectionUtils.isNotEmpty(budgetDTOs)) {
                for (Object _obj_budgetDTO : budgetDTOs) {
                    BudgetDTO budgetDTO = (BudgetDTO) _obj_budgetDTO;
                    ResponseEntity page;
                    if (!Objects.nonNull(budgetDTO)) continue;
                    if (budgetDTO.getDeptId() != 0L) {
                        DeptDetails dept = this.departmentDetailsService.findById(Long.valueOf(budgetDTO.getDeptId()));
                        deptUniqueID = String.valueOf(dept.getDeptID());
                    }
                    if (budgetDTO.getPageId() != null && (page = this.pageService.getPageDetails(budgetDTO.getPageId().longValue())) != null) {
                        pageName = ((PageDTO)page.getBody()).getPageName();
                    }
                    HashMap stringMap = new HashMap();
                    if (deptUniqueID != null) {
                        stringMap.put("departmentID", deptUniqueID);
                    }
                    stringMap.put("pageName", pageName);
                    Map stringObjectMap = budgetDTO.getBudgetValues();
                    stringMap.put("owner", stringObjectMap.get("ownerName").toString());
                    if (stringObjectMap.containsKey("year")) {
                        stringMap.put("year", stringObjectMap.get("year").toString());
                    }
                    if (stringObjectMap.containsKey("initiativeDesc")) {
                        stringMap.put("initiativeDesc", stringObjectMap.get("initiativeDesc").toString());
                    }
                    if (stringObjectMap.containsKey("objective")) {
                        stringMap.put("objective", stringObjectMap.get("objective").toString());
                    }
                    if (stringObjectMap.containsKey("outcome")) {
                        stringMap.put("outcome", stringObjectMap.get("outcome").toString());
                    }
                    if (stringObjectMap.containsKey("month")) {
                        stringMap.put("month", stringObjectMap.get("month").toString());
                    }
                    if (stringObjectMap.containsKey("version")) {
                        stringMap.put("version", stringObjectMap.get("version").toString());
                    }
                    if (stringObjectMap.containsKey("glaccountdesc")) {
                        stringMap.put("glaccountdesc", stringObjectMap.get("glaccountdesc").toString());
                    }
                    if (stringObjectMap.containsKey("glname")) {
                        stringMap.put("glname", stringObjectMap.get("glname").toString());
                    }
                    if (stringObjectMap.containsKey("budgetType")) {
                        stringMap.put("budgetType", stringObjectMap.get("budgetType").toString());
                    }
                    if (stringObjectMap.containsKey("subInitiativeDesc")) {
                        stringMap.put("subInitiativeDesc", stringObjectMap.get("subInitiativeDesc").toString());
                    }
                    if (stringObjectMap.containsKey("activityDesc")) {
                        stringMap.put("activityDesc", stringObjectMap.get("activityDesc").toString());
                    }
                    if (stringObjectMap.containsKey("subActivityDes")) {
                        stringMap.put("subActivityDes", stringObjectMap.get("subActivityDes").toString());
                    }
                    if (stringObjectMap.containsKey("currency")) {
                        stringMap.put("currency", stringObjectMap.get("currency").toString());
                    }
                    if (stringObjectMap.containsKey("noofDays")) {
                        stringMap.put("noofDays", stringObjectMap.get("noofDays").toString());
                    }
                    if (stringObjectMap.containsKey("unitamount")) {
                        stringMap.put("unitamount", stringObjectMap.get("unitamount").toString());
                    }
                    if (stringObjectMap.containsKey("amount")) {
                        stringMap.put("amount", stringObjectMap.get("amount").toString());
                    }
                    if (stringObjectMap.containsKey("divisionDesc")) {
                        stringMap.put("divisionDesc", stringObjectMap.get("divisionDesc").toString());
                    }
                    if (stringObjectMap.containsKey("personDesc")) {
                        stringMap.put("personDesc", stringObjectMap.get("personDesc").toString());
                    }
                    if (stringObjectMap.containsKey("notes")) {
                        stringMap.put("notes", stringObjectMap.get("notes").toString());
                    }
                    stringMap.put("action", String.valueOf(budgetDTO.getActive()));
                    mapList.add(stringMap);
                }
            }
            if (mapList != null && CollectionUtils.isNotEmpty(mapList)) {
                String[] COLUMNs = new String[]{"DepartmentId", "Page Name", "Owner", "Year", "Month", "Version", "GL Account", "GL Name", "Budget Type", "Project/Initiative", "Outcome", "Objective", "Sub Initiative", "Activity", "Sub Activity", "Currency", "Number of Days/Quantity", "Unit Amount", "Total Budget", "Department", "Employee", "Notes"};
                XSSFWorkbook workbook = new XSSFWorkbook();
                CreationHelper createHelper = workbook.getCreationHelper();
                String sheetname = "BudgetExportName";
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
                    if (map == null) continue;
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
                    if (map.containsKey("owner")) {
                        if (map.get("owner") != null) {
                            row.createCell(2).setCellValue((String)map.get("owner"));
                        } else {
                            row.createCell(2).setCellValue("");
                        }
                    } else {
                        row.createCell(2).setCellValue("");
                    }
                    if (map.containsKey("year")) {
                        if (map.get("year") != null) {
                            row.createCell(3).setCellValue((String)map.get("year"));
                        } else {
                            row.createCell(3).setCellValue("");
                        }
                    } else {
                        row.createCell(3).setCellValue("");
                    }
                    if (map.containsKey("month")) {
                        if (map.get("month") != null) {
                            row.createCell(4).setCellValue((String)map.get("month"));
                        } else {
                            row.createCell(4).setCellValue("");
                        }
                    } else {
                        row.createCell(4).setCellValue("");
                    }
                    if (map.containsKey("version")) {
                        if (map.get("version") != null) {
                            row.createCell(5).setCellValue((String)map.get("version"));
                        } else {
                            row.createCell(5).setCellValue("");
                        }
                    } else {
                        row.createCell(5).setCellValue("");
                    }
                    if (map.containsKey("glaccountdesc")) {
                        if (map.get("glaccountdesc") != null) {
                            row.createCell(6).setCellValue((String)map.get("glaccountdesc"));
                        } else {
                            row.createCell(6).setCellValue("");
                        }
                    } else {
                        row.createCell(6).setCellValue("");
                    }
                    if (map.containsKey("glname")) {
                        if (map.get("glname") != null) {
                            row.createCell(7).setCellValue((String)map.get("glname"));
                        } else {
                            row.createCell(7).setCellValue("");
                        }
                    } else {
                        row.createCell(7).setCellValue("");
                    }
                    if (map.containsKey("budgetType")) {
                        if (map.get("budgetType") != null) {
                            row.createCell(8).setCellValue((String)map.get("budgetType"));
                        } else {
                            row.createCell(8).setCellValue("");
                        }
                    } else {
                        row.createCell(8).setCellValue("");
                    }
                    if (map.containsKey("initiativeDesc")) {
                        if (map.get("initiativeDesc") != null) {
                            row.createCell(9).setCellValue((String)map.get("initiativeDesc"));
                        } else {
                            row.createCell(9).setCellValue("");
                        }
                    } else {
                        row.createCell(9).setCellValue("");
                    }
                    if (map.containsKey("outcome")) {
                        if (map.get("outcome") != null) {
                            row.createCell(10).setCellValue((String)map.get("outcome"));
                        } else {
                            row.createCell(10).setCellValue("");
                        }
                    } else {
                        row.createCell(10).setCellValue("");
                    }
                    if (map.containsKey("objective")) {
                        if (map.get("objective") != null) {
                            row.createCell(11).setCellValue((String)map.get("objective"));
                        } else {
                            row.createCell(11).setCellValue("");
                        }
                    } else {
                        row.createCell(11).setCellValue("");
                    }
                    if (map.containsKey("subInitiativeDesc")) {
                        if (map.get("subInitiativeDesc") != null) {
                            row.createCell(12).setCellValue((String)map.get("subInitiativeDesc"));
                        } else {
                            row.createCell(12).setCellValue("");
                        }
                    } else {
                        row.createCell(12).setCellValue("");
                    }
                    if (map.containsKey("activityDesc")) {
                        if (map.get("activityDesc") != null) {
                            row.createCell(13).setCellValue((String)map.get("activityDesc"));
                        } else {
                            row.createCell(13).setCellValue("");
                        }
                    } else {
                        row.createCell(13).setCellValue("");
                    }
                    if (map.containsKey("subActivityDes")) {
                        if (map.get("subActivityDes") != null) {
                            row.createCell(14).setCellValue((String)map.get("subActivityDes"));
                        } else {
                            row.createCell(14).setCellValue("");
                        }
                    } else {
                        row.createCell(14).setCellValue("");
                    }
                    if (map.containsKey("currency")) {
                        if (map.get("currency") != null) {
                            row.createCell(15).setCellValue((String)map.get("currency"));
                        } else {
                            row.createCell(15).setCellValue("");
                        }
                    } else {
                        row.createCell(15).setCellValue("");
                    }
                    if (map.containsKey("noofDays")) {
                        if (map.get("noofDays") != null) {
                            row.createCell(16).setCellValue((String)map.get("noofDays"));
                        } else {
                            row.createCell(16).setCellValue("");
                        }
                    } else {
                        row.createCell(16).setCellValue("");
                    }
                    if (map.containsKey("unitamount")) {
                        if (map.get("unitamount") != null) {
                            row.createCell(17).setCellValue((String)map.get("unitamount"));
                        } else {
                            row.createCell(17).setCellValue("");
                        }
                    } else {
                        row.createCell(17).setCellValue("");
                    }
                    if (map.containsKey("amount")) {
                        if (map.get("amount") != null) {
                            row.createCell(18).setCellValue((String)map.get("amount"));
                        } else {
                            row.createCell(18).setCellValue("");
                        }
                    } else {
                        row.createCell(18).setCellValue("");
                    }
                    if (map.containsKey("divisionDesc")) {
                        if (map.get("divisionDesc") != null) {
                            row.createCell(19).setCellValue((String)map.get("divisionDesc"));
                        } else {
                            row.createCell(19).setCellValue("");
                        }
                    } else {
                        row.createCell(19).setCellValue("");
                    }
                    if (map.containsKey("personDesc")) {
                        if (map.get("personDesc") != null) {
                            row.createCell(20).setCellValue((String)map.get("personDesc"));
                        } else {
                            row.createCell(20).setCellValue("");
                        }
                    } else {
                        row.createCell(20).setCellValue("");
                    }
                    if (map.containsKey("notes")) {
                        if (map.get("notes") != null) {
                            row.createCell(21).setCellValue((String)map.get("notes"));
                        } else {
                            row.createCell(21).setCellValue("");
                        }
                    } else {
                        row.createCell(21).setCellValue("");
                    }
                    if (map.containsKey("action")) {
                        if (map.get("action") != null) {
                            row.createCell(22).setCellValue((String)map.get("action"));
                        } else {
                            row.createCell(22).setCellValue("");
                        }
                    } else {
                        row.createCell(22).setCellValue("");
                    }
                    Cell cell = row.createCell(23);
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
}

