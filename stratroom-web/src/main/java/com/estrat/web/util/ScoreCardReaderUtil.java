/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.KPIFormula
 *  com.estrat.web.dto.ObjectivesDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.ScoreCardDTO
 *  com.estrat.web.dto.ScoreCardDetailsDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.dto.SubKPIDTO
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.KPIService
 *  com.estrat.web.service.ObjectiveService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.ScoreCardService
 *  com.estrat.web.service.SubKPIService
 *  com.estrat.web.util.RepositoryServices
 *  com.estrat.web.util.ScoreCardReaderUtil
 *  com.estrat.web.util.UserThreadLocal
 *  javax.validation.ValidationException
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
 *  org.apache.poi.xssf.usermodel.XSSFCell
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
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.KPIFormula;
import com.estrat.web.dto.ObjectivesDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.ScoreCardDTO;
import com.estrat.web.dto.ScoreCardDetailsDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.dto.SubKPIDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.KPIService;
import com.estrat.web.service.ObjectiveService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.ScoreCardService;
import com.estrat.web.service.SubKPIService;
import com.estrat.web.util.RepositoryServices;
import com.estrat.web.util.UserThreadLocal;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.validation.ValidationException;
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
import org.apache.poi.xssf.usermodel.XSSFCell;
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
public class ScoreCardReaderUtil {
    private Logger logger = Logger.getLogger(ScoreCardReaderUtil.class);
    public static final String S3_ASSET_PATHS_SCORECARD = "/scoreCardImportDataFile";
    private static final String SUFFIX = "/";
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private PageService pageService;
    @Autowired
    protected RepositoryServices repositoryServices;
    @Autowired
    protected ScoreCardService scoreCardService;
    @Autowired
    protected ObjectiveService objectiveService;
    @Autowired
    protected KPIService kpiService;
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected AuditTrailService auditTrailService;
    @Autowired
    protected SubKPIService subKPIService;

    public Map readBulkScoreCardDetails(InputStream inputStream, String type, String language) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            if (type.equals("validation")) {
                resultMap = this.checkValidationForExcelSheet(myExcelBook);
            } else {
                resultMap = this.saveBulkScoreCardDetails(myExcelBook, language);
                this.auditTrailService.save("Excel - Scorecard Upload");
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        return resultMap;
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public Map checkValidationForExcelSheet(XSSFWorkbook myExcelBook) throws IOException {
        ArrayList<Map<Object, Object>> mapList = new ArrayList<Map<Object, Object>>();
        Map stringMap = null;
        HashMap resultMap = new HashMap();
        String currentSheet = null;
        try {
            DataFormatter df = new DataFormatter();
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            for (int sheetIndex = 0; sheetIndex < myExcelBook.getNumberOfSheets(); ++sheetIndex) {
                String excelSheetName;
                XSSFSheet ExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                if (ExcelSheet == null) {
                    this.logger.debug("Sheet not found");
                    continue;
                }
                currentSheet = excelSheetName = ExcelSheet.getSheetName();
                if ("Dict".equalsIgnoreCase(excelSheetName)) continue;
                XSSFRow row1 = ExcelSheet.getRow(0);
                if (row1.getCell(1).getStringCellValue().trim().equals("ScoreCardName") || row1.getCell(1).getStringCellValue().trim().equals("ScoreCard Name")) {
                    int totalRows = ExcelSheet.getPhysicalNumberOfRows();
                    if (totalRows == 1) {
                        stringMap = new HashMap();
                        stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                        stringMap.put("error", "Scorecard Import Sheet is empty");
                        stringMap.put("rowNo", "");
                        stringMap.put("cellName", "");
                        mapList.add(stringMap);
                        continue;
                    }
                    for (int i = 1; i < totalRows; ++i) {
                        XSSFRow row = ExcelSheet.getRow(i);
                        stringMap = new HashMap();
                        if (ScoreCardReaderUtil.isRowEmpty((XSSFRow)row)) {
                            this.logger.debug("Row is empty");
                            continue;
                        }
                        try {
                            EmployeeDTO employeeDTO;
                            EmployeeDTO employeeRequestDTO;
                            Pattern p;
                            Matcher m;
                            block73: {
                                this.logger.debug(("row no : " + row.getCTRow().getR()));
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
                                                break block73;
                                            }
                                            stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                            stringMap.put("error", "Department ID NOT Found : " + deptValue);
                                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                            stringMap.put("cellName", "Department ID");
                                            mapList.add(stringMap);
                                        }
                                        catch (Exception e) {
                                            stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                            stringMap.put("error", e.getMessage());
                                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                            stringMap.put("cellName", "Department ID");
                                            mapList.add(stringMap);
                                        }
                                    } else {
                                        stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                        stringMap.put("error", "Department id is empty");
                                        stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                        stringMap.put("cellName", "Department ID");
                                        mapList.add(stringMap);
                                    }
                                }
                            }
                            if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                                String inputStr = row.getCell(1).getStringCellValue().trim();
                                Pattern pattern = Pattern.compile("^[\\w\\$#%\\-_.&\\s\\p{L}]+$");
                                Matcher matcher = pattern.matcher(inputStr);
                                if (matcher.matches()) {
                                    this.logger.info("validate ScoreCardName");
                                } else {
                                    stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "ScoreCardName is invalid please check and remove special character");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("cellName", "ScoreCardName");
                                    mapList.add(stringMap);
                                }
                                this.logger.info("validate ScoreCardName");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "ScoreCardName is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "ScoreCardName");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                this.logger.info("validate Perspective ID");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Perspective ID is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Perspective ID");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                this.logger.info("validate Perspective Name");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Perspective Name is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Perspective Name");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                                this.logger.info("validate Perspective Type");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Perspective Type is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Perspective Type");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                                this.logger.info("validate Objective Name");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Objective Name is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Objective Name");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK) {
                                this.logger.info("validate KPI Name");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "KPI  NAME is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "KPI  NAME");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK && !(m = (p = Pattern.compile("^[\\w\\$#%\\-_.&\\s\\p{L}]+$")).matcher(row.getCell(13).getStringCellValue())).matches()) {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "KPI  NAME only supports $#,%-_&");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "KPI  NAME");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) {
                                this.logger.info("validate Owner Name");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Owner name - Is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Owner");
                                mapList.add(stringMap);
                            }
                            String ownerName = row.getCell(17).getStringCellValue();
                            String pageOwnerName = ExcelSheet.getSheetName();
                            if (ownerName.equalsIgnoreCase(pageOwnerName)) {
                                this.logger.info("validate Owner Name");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Sheet-Name & Owner-Name not match!. please provide Sheet-Name and Owner-Name as same");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Sheet-Name Or Owner-Name");
                                mapList.add(stringMap);
                            }
                            try {
                                employeeRequestDTO = new EmployeeDTO();
                                employeeRequestDTO.setFirstName(ExcelSheet.getSheetName());
                                employeeDTO = this.employeeService.getEmployeeId(employeeRequestDTO);
                                if (employeeDTO == null) {
                                    stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("cellName", "Sheet-Name");
                                    stringMap.put("error", "PageOwner NOT found");
                                    mapList.add(stringMap);
                                }
                            }
                            catch (Exception e) {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", e.getMessage());
                                mapList.add(stringMap);
                            }
                            try {
                                employeeRequestDTO = new EmployeeDTO();
                                employeeRequestDTO.setFirstName(row.getCell(17).getStringCellValue());
                                employeeDTO = this.employeeService.getEmployeeId(employeeRequestDTO);
                                if (!Objects.nonNull(employeeDTO)) {
                                    stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Owner NOT Found");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("cellName", "Owner");
                                    mapList.add(stringMap);
                                }
                            }
                            catch (Exception e) {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", e.getMessage());
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Owner");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK) {
                                this.logger.info("Measurement Frequency valid");
                                String checkmeasure = row.getCell(18).getStringCellValue();
                                if (!(checkmeasure.equalsIgnoreCase("quarterly") || checkmeasure.equalsIgnoreCase("monthly") || checkmeasure.equalsIgnoreCase("annually") || checkmeasure.equalsIgnoreCase("Half Yearly"))) {
                                    stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Measurement Frequency is Invalid");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("cellName", "Measurement Frequency");
                                    mapList.add(stringMap);
                                }
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Measurement Frequency is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Measurement Frequency");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) {
                                this.logger.info("Actual valid");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Actual Field is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Actual Field");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                                this.logger.info("Forecast valid");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Target Field is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Target Field");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                this.logger.info("Forecast valid");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Budget Field is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Budget Field");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(23) != null && row.getCell(23).getCellType() != CellType.BLANK) {
                                this.logger.info("Forecast valid");
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Forecast Field is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Forecast Field");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(25) != null && row.getCell(25).getCellType() != CellType.BLANK) {
                                this.logger.info("Status valid");
                                String statusvalid = row.getCell(25).getStringCellValue().trim();
                                if (!(statusvalid.equalsIgnoreCase("Manual") || statusvalid.equalsIgnoreCase("Weighted") || statusvalid.equalsIgnoreCase("First") || statusvalid.equalsIgnoreCase("Second") || statusvalid.equalsIgnoreCase("Third"))) {
                                    stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Status is Incorrect");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("cellName", "Status");
                                    mapList.add(stringMap);
                                }
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Status is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Status");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(26) != null && row.getCell(26).getCellType() != CellType.BLANK) {
                                this.logger.info("Red valid");
                                if (!this.getvalueStatus(row, 26)) {
                                    stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Red value is invalid, please provide numeric value");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("cellName", "Red");
                                    mapList.add(stringMap);
                                }
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Red is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Red");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(27) != null && row.getCell(27).getCellType() != CellType.BLANK) {
                                this.logger.info("amber valid");
                                if (!this.getvalueStatus(row, 27)) {
                                    stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Amber value is invalid, please provide numeric value");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("cellName", "Amber");
                                    mapList.add(stringMap);
                                }
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Amber is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Amber");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(28) != null && row.getCell(28).getCellType() != CellType.BLANK) {
                                this.logger.info("Green valid");
                                if (!this.getvalueStatus(row, 28)) {
                                    stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Green value is invalid, please provide numeric value");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("cellName", "Green");
                                    mapList.add(stringMap);
                                }
                            } else {
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Green is empty");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Green");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(46) != null && row.getCell(46).getCellType() != CellType.BLANK) {
                                if (this.isValid(row.getCell(46).getStringCellValue().trim())) {
                                    this.logger.info("Start/End Date valid");
                                    continue;
                                }
                                stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "Invalidate date format entered, MMM DD, YYYY is the correct format");
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("cellName", "Start/End Date");
                                mapList.add(stringMap);
                                continue;
                            }
                            stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("error", "Start/End Date is empty");
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("cellName", "Start/End Date");
                            mapList.add(stringMap);
                            continue;
                        }
                        catch (Exception e) {
                            stringMap = this.getWriteDocForScoreCard(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("error", e.getMessage());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            mapList.add(stringMap);
                        }
                    }
                    continue;
                }
                stringMap = new HashMap();
                stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                stringMap.put("error", "This sheet is not a scorecard sheet");
                stringMap.put("rowNo", "");
                stringMap.put("cellName", "");
                mapList.add(stringMap);
            }
            if (mapList != null && !mapList.isEmpty()) {
                resultMap.put("parsingError", mapList);
                resultMap.put("no-of-Error", mapList.size());
                resultMap.put("result", "Not-Success");
            } else {
                resultMap.put("result", "success");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            stringMap = new HashMap();
            stringMap.put("Excel_SheetName", currentSheet);
            stringMap.put("error", "This sheet has thrown parsing error");
            stringMap.put("rowNo", "");
            stringMap.put("cellName", "");
            mapList.add(stringMap);
            if (mapList != null && !mapList.isEmpty()) {
                resultMap.put("parsingError", mapList);
                resultMap.put("no-of-Error", mapList.size());
                resultMap.put("result", "Not-Success");
            }
        }
        finally {
            if (myExcelBook != null) {
                myExcelBook.close();
            }
        }
        return resultMap;
    }

    private void validateCellNotBlank(Cell cell, String errorMessage) throws ValidationException {
        if (cell == null || cell.getCellType() == CellType.BLANK) {
            throw new ValidationException(errorMessage);
        }
    }

    public Map saveBulkScoreCardDetails(XSSFWorkbook myExcelBook, String language) throws IOException {
        int processedrows = 0;
        int failedrows = 0;
        int createrows = 0;
        int updatedrows = 0;
        int processrows = 0;
        Boolean updateStatus = false;
        Boolean createStatus = false;
        Long checkupdaterowno = null;
        Long checkcreaterowno = null;
        HashMap resultMap = new HashMap();
        try {
            DataFormatter df = new DataFormatter();
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            ControlPanelGeneralDTO cpanel = this.controlPanelGeneralService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
            for (int sheetIndex = 0; sheetIndex < myExcelBook.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet ExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                Long pageOwner = null;
                if (ExcelSheet == null || "Dict".equalsIgnoreCase(ExcelSheet.getSheetName())) continue;
                int totalRows = ExcelSheet.getPhysicalNumberOfRows();
                System.out.println("totalRows score ::: " + totalRows);
                for (int i = 1; i < totalRows; ++i) {
                    XSSFRow row;
                    block270: {
                        String red = null;
                        String green = null;
                        String amber = null;
                        String target = null;
                        String targetrawvalue = null;
                        String redrawvalue = null;
                        String greenrawvalue = null;
                        String amberrawvalue = null;
                        String pageName = null;
                        String objectiveUniqueID = "";
                        String kpiIdUniqueID = "";
                        String subkpiUniqueID = "";
                        Long owner = null;
                        Map scorecardMap = null;
                        row = ExcelSheet.getRow(i);
                        if (ScoreCardReaderUtil.isRowEmpty((XSSFRow)row)) {
                            this.logger.debug("Row is empty");
                            continue;
                        }
                        try {
                            String message;
                            KPIFormula formula;
                            String statusval;
                            String Status;
                            HashMap stringObjectMap;
                            ScoreCardDetailsDTO detailsDTO;
                            Map scorecardDetailsResponse;
                            block269: {
                                EmployeeDTO employeeDTO;
                                EmployeeDTO employeeRequestDTO;
                                block268: {
                                    this.logger.debug(("row no : " + row.getCTRow().getR()));
                                    if (cpanel != null && cpanel.getImplementationType() != null && cpanel.getImplementationType().equalsIgnoreCase("department")) {
                                        if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                                            this.logger.info("validate Department ID");
                                        } else {
                                            ++failedrows;
                                            continue;
                                        }
                                    }
                                    if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                                        ++failedrows;
                                        continue;
                                    }
                                    this.logger.info("validate ScoreCardName");
                                    if (row.getCell(4) == null || row.getCell(4).getCellType() == CellType.BLANK) {
                                        ++failedrows;
                                        continue;
                                    }
                                    this.logger.info("validate Perspective Name");
                                    if (row.getCell(7) == null || row.getCell(7).getCellType() == CellType.BLANK) {
                                        ++failedrows;
                                        continue;
                                    }
                                    this.logger.info("validate Perspective Type");
                                    if (row.getCell(17) == null || row.getCell(17).getCellType() == CellType.BLANK) {
                                        ++failedrows;
                                        continue;
                                    }
                                    this.logger.info("validate Owner ");
                                    try {
                                        employeeRequestDTO = new EmployeeDTO();
                                        employeeRequestDTO.setFirstName(ExcelSheet.getSheetName());
                                        employeeDTO = this.employeeService.getEmployeeId(employeeRequestDTO);
                                        if (Objects.nonNull(employeeDTO)) {
                                            pageOwner = employeeDTO.getEmpId();
                                            break block268;
                                        }
                                        ++failedrows;
                                    }
                                    catch (Exception e) {
                                        ++failedrows;
                                    }
                                    continue;
                                }
                                try {
                                    employeeRequestDTO = new EmployeeDTO();
                                    employeeRequestDTO.setFirstName(row.getCell(17).getStringCellValue());
                                    employeeDTO = this.employeeService.getEmployeeId(employeeRequestDTO);
                                    if (Objects.nonNull(employeeDTO)) {
                                        owner = employeeDTO.getEmpId();
                                        break block269;
                                    }
                                    ++failedrows;
                                }
                                catch (Exception e) {
                                    ++failedrows;
                                }
                                continue;
                            }
                            Long deptId = null;
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
                            if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                                pageName = row.getCell(1).getStringCellValue().trim();
                            }
                            Long pageId = null;
                            Long scoreCardDetailsId = null;
                            ScoreCardDTO scoreCardDTO = null;
                            ObjectivesDTO objectivesDTO = null;
                            KPIDTO kpidto = null;
                            SubKPIDTO subkpidto = null;
                            if (pageName != null) {
                                Map response = this.pageService.checkpages(pageName, pageOwner.longValue());
                                if (!response.containsKey("success")) {
                                    PageDTO pageDTO = new PageDTO();
                                    pageDTO.setPageName(pageName);
                                    pageDTO.setCreatedBy(pageOwner.longValue());
                                    pageDTO.setPageType("Standard_View");
                                    if (deptId != null) {
                                        pageDTO.setDeptId(deptId);
                                    }
                                    pageDTO.setCreatedTime(LocalDateTime.now());
                                    ScoreCardResponseDTO responsePage = (ScoreCardResponseDTO) (ScoreCardResponseDTO)this.pageService.saveDetails(pageDTO).getBody();
                                    if (Objects.nonNull(responsePage)) {
                                        createStatus = true;
                                        checkcreaterowno = row.getCTRow().getR();
                                        pageId = responsePage.getPageDTO().getId();
                                    }
                                } else {
                                    updateStatus = true;
                                    checkupdaterowno = row.getCTRow().getR();
                                    String id = response.get("pageId").toString();
                                    pageId = Long.parseLong(id);
                                }
                            }
                            if (!(scorecardDetailsResponse = (Map)this.scoreCardService.checkScoreName(pageOwner.longValue(), pageName, pageId.longValue()).getBody()).containsKey("success")) {
                                detailsDTO = new ScoreCardDetailsDTO();
                                detailsDTO.setActive(0);
                                detailsDTO.setCreatedBy(pageOwner.longValue());
                                detailsDTO.setOwner(pageOwner.longValue());
                                detailsDTO.setPageId(pageId);
                                if (deptId != null) {
                                    detailsDTO.setDepartmentId(deptId);
                                }
                                detailsDTO.setScorecardName(pageName);
                                stringObjectMap = new HashMap();
                                stringObjectMap.put("scoreCardName", pageName);
                                if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                                    stringObjectMap.put("description", row.getCell(2).getStringCellValue().trim());
                                }
                                if (row.getCell(25) != null && row.getCell(25).getCellType() != CellType.BLANK) {
                                    Status = row.getCell(25).getStringCellValue().trim();
                                    statusval = null;
                                    if (Status.equalsIgnoreCase("weighted")) {
                                        statusval = "Weighted";
                                    } else if (Status.equalsIgnoreCase("manual")) {
                                        statusval = "Manual";
                                    } else if (Status.equalsIgnoreCase("first")) {
                                        statusval = "First";
                                    } else if (Status.equalsIgnoreCase("second")) {
                                        statusval = "Second";
                                    } else if (Status.equalsIgnoreCase("third")) {
                                        statusval = "third";
                                    }
                                    stringObjectMap.put("status", statusval);
                                }
                                if (row.getCell(46) != null && row.getCell(46).getCellType() != CellType.BLANK) {
                                    stringObjectMap.put("score_card_start_end_date", row.getCell(46).getStringCellValue().trim());
                                }
                                if (row.getCell(49) != null && row.getCell(49).getCellType() != CellType.BLANK) {
                                    formula = new KPIFormula();
                                    formula.setFormula(row.getCell(49).getStringCellValue().trim());
                                    formula.setType("SCORECARDCONFIG");
                                    message = (String)this.kpiService.validateFormula(formula).getBody();
                                    if ("valid".equalsIgnoreCase(message)) {
                                        stringObjectMap.put("scorecardFormula", row.getCell(49).getStringCellValue().trim());
                                    }
                                }
                                detailsDTO.setScoreCardDetailsValue(stringObjectMap);
                                ScoreCardResponseDTO scoreCardResponseDTO = (ScoreCardResponseDTO) (ScoreCardResponseDTO)this.scoreCardService.saveScoreCardDetails(detailsDTO).getBody();
                                scoreCardDetailsId = scoreCardResponseDTO.getCardDetailsDTO().getId();
                            } else {
                                scoreCardDetailsId = Long.valueOf(scorecardDetailsResponse.get("detailsId").toString());
                                detailsDTO = new ScoreCardDetailsDTO();
                                detailsDTO.setId(scoreCardDetailsId.longValue());
                                detailsDTO.setActive(0);
                                detailsDTO.setUpdatedBy(pageOwner.longValue());
                                detailsDTO.setOwner(pageOwner.longValue());
                                detailsDTO.setPageId(pageId);
                                if (deptId != null) {
                                    detailsDTO.setDepartmentId(deptId);
                                }
                                detailsDTO.setScorecardName(pageName);
                                stringObjectMap = new HashMap();
                                stringObjectMap.put("scoreCardName", pageName);
                                if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                                    stringObjectMap.put("description", row.getCell(2).getStringCellValue().trim());
                                }
                                if (row.getCell(25) != null && row.getCell(25).getCellType() != CellType.BLANK) {
                                    Status = row.getCell(25).getStringCellValue().trim();
                                    statusval = null;
                                    if (Status.equalsIgnoreCase("weighted")) {
                                        statusval = "Weighted";
                                    } else if (Status.equalsIgnoreCase("manual")) {
                                        statusval = "Manual";
                                    } else if (Status.equalsIgnoreCase("first")) {
                                        statusval = "First";
                                    } else if (Status.equalsIgnoreCase("second")) {
                                        statusval = "Second";
                                    } else if (Status.equalsIgnoreCase("third")) {
                                        statusval = "third";
                                    }
                                    stringObjectMap.put("status", statusval);
                                }
                                if (row.getCell(46) != null && row.getCell(46).getCellType() != CellType.BLANK) {
                                    stringObjectMap.put("score_card_start_end_date", row.getCell(46).getStringCellValue().trim());
                                }
                                if (row.getCell(49) != null && row.getCell(49).getCellType() != CellType.BLANK) {
                                    formula = new KPIFormula();
                                    formula.setFormula(row.getCell(49).getStringCellValue().trim());
                                    formula.setType("SCORECARDCONFIG");
                                    message = (String)this.kpiService.validateFormula(formula).getBody();
                                    if ("valid".equalsIgnoreCase(message)) {
                                        stringObjectMap.put("scorecardFormula", row.getCell(49).getStringCellValue().trim());
                                    }
                                }
                                detailsDTO.setScoreCardDetailsValue(stringObjectMap);
                                this.scoreCardService.updateScoreCardDetails(detailsDTO);
                            }
                            if (pageOwner != null && pageId != null) {
                                scorecardMap = this.scoreCardService.scoreCardMap(pageOwner.longValue(), String.valueOf(pageId), true);
                            }
                            if (owner != null && Objects.nonNull(scorecardMap)) {
                                String Forecastheader;
                                String budgetheader;
                                String targetheader;
                                String actualheader;
                                KPIFormula formula2;
                                String measurement;
                                String name;
                                if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                    String pespectiveId = row.getCell(3).getStringCellValue();
                                    if (StringUtils.isNotEmpty((CharSequence)pespectiveId)) {
                                        if (!pespectiveId.equals("NA")) {
                                            if (scorecardMap.get(pespectiveId) != null) {
                                                scoreCardDTO = Objects.nonNull(scorecardMap.get(pespectiveId)) ? (ScoreCardDTO)scorecardMap.get(pespectiveId) : new ScoreCardDTO();
                                            } else {
                                                scoreCardDTO = new ScoreCardDTO();
                                                scoreCardDTO.setPerspectiveId(pespectiveId);
                                            }
                                        } else {
                                            scoreCardDTO = new ScoreCardDTO();
                                        }
                                    } else {
                                        scoreCardDTO = new ScoreCardDTO();
                                    }
                                }
                                if (scoreCardDTO == null) break block270;
                                scoreCardDTO.setScoreCardDetailsId(scoreCardDetailsId.longValue());
                                if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                                    scoreCardDTO.getScoreCardValue().put("perspectiveType", row.getCell(7).getStringCellValue());
                                }
                                if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                    name = row.getCell(4).getStringCellValue().trim();
                                    Map scoreCardValue = scoreCardDTO.getScoreCardValue();
                                    scoreCardValue.put("name", name);
                                }
                                if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                                    scoreCardDTO.getScoreCardValue().put("description", row.getCell(5).getStringCellValue().trim());
                                }
                                if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                                    if (row.getCell(6).getCellType() == CellType.STRING) {
                                        scoreCardDTO.getScoreCardValue().put("weight", row.getCell(6).getStringCellValue());
                                    } else if (row.getCell(6).getCellType() == CellType.NUMERIC) {
                                        scoreCardDTO.getScoreCardValue().put("weight", row.getCell(6).getNumericCellValue());
                                    }
                                } else {
                                    scoreCardDTO.getScoreCardValue().put("weight", 0);
                                }
                                if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                                    String obj_ID = row.getCell(8).getStringCellValue();
                                    if (obj_ID != null) {
                                        objectiveUniqueID = !obj_ID.equals("NA") ? obj_ID : "";
                                    }
                                    objectivesDTO = (objectivesDTO = (ObjectivesDTO)scoreCardDTO.getObjectivesMap().get(objectiveUniqueID)) == null ? new ObjectivesDTO() : objectivesDTO;
                                    objectivesDTO.setObjectiveId(StringUtils.isNotEmpty((CharSequence)objectiveUniqueID) ? objectiveUniqueID : objectivesDTO.getObjectiveId());
                                }
                                if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                                    name = row.getCell(9).getStringCellValue().trim();
                                    objectivesDTO.getObjectivesValue().put("name", name);
                                }
                                if (row.getCell(52) != null && row.getCell(52).getCellType() != CellType.BLANK) {
                                    if (row.getCell(52).getCellType() == CellType.STRING) {
                                        objectivesDTO.setActive(new BigDecimal(row.getCell(52).getStringCellValue()).intValue());
                                    } else if (row.getCell(51).getCellType() == CellType.NUMERIC) {
                                        objectivesDTO.setActive((int)row.getCell(52).getNumericCellValue());
                                    } else {
                                        objectivesDTO.setActive(0);
                                    }
                                }
                                if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK) {
                                    objectivesDTO.getObjectivesValue().put("description", row.getCell(10).getStringCellValue().trim());
                                }
                                if (row.getCell(11) != null && row.getCell(11).getCellType() != CellType.BLANK) {
                                    if (row.getCell(11).getCellType() == CellType.STRING) {
                                        if (row.getCell(11).getStringCellValue().trim() != "") {
                                            objectivesDTO.getObjectivesValue().put("weight", row.getCell(11).getStringCellValue());
                                        } else {
                                            objectivesDTO.getObjectivesValue().put("weight", 0);
                                        }
                                    } else if (row.getCell(11).getCellType() == CellType.NUMERIC) {
                                        objectivesDTO.getObjectivesValue().put("weight", row.getCell(11).getNumericCellValue());
                                    } else {
                                        objectivesDTO.getObjectivesValue().put("weight", 0);
                                    }
                                } else {
                                    objectivesDTO.getObjectivesValue().put("weight", 0);
                                }
                                if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                                    String kpi_ID = row.getCell(12).getStringCellValue();
                                    if (kpi_ID != null) {
                                        kpiIdUniqueID = !kpi_ID.equals("NA") ? kpi_ID : "";
                                    }
                                    kpidto = (kpidto = (KPIDTO)objectivesDTO.getKpiMap().get(kpiIdUniqueID)) == null ? new KPIDTO() : kpidto;
                                    kpidto.setKpiId(StringUtils.isNotEmpty((CharSequence)kpidto.getKpiId()) ? kpidto.getKpiId() : kpiIdUniqueID);
                                }
                                if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK) {
                                    name = row.getCell(13).getStringCellValue().trim();
                                    kpidto.getKpiValue().put("name", name);
                                    kpidto.getKpiValue().put("customthresholdenable", true);
                                }
                                if (row.getCell(51) != null && row.getCell(51).getCellType() != CellType.BLANK) {
                                    try {
                                        if (row.getCell(51).getCellType() == CellType.STRING) {
                                            kpidto.setActive(Integer.parseInt(row.getCell(51).getStringCellValue()));
                                        } else if (row.getCell(51).getCellType() == CellType.NUMERIC) {
                                            kpidto.setActive((int)row.getCell(51).getNumericCellValue());
                                        } else {
                                            kpidto.setActive(0);
                                        }
                                    }
                                    catch (Exception ex) {
                                        ex.printStackTrace();
                                        kpidto.setActive(0);
                                    }
                                }
                                if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                                    kpidto.getKpiValue().put("description", row.getCell(14).getStringCellValue().trim());
                                }
                                if (row.getCell(15) != null && row.getCell(15).getCellType() != CellType.BLANK) {
                                    if (row.getCell(15).getCellType() == CellType.STRING) {
                                        if (row.getCell(15).getStringCellValue().trim() != "") {
                                            kpidto.getKpiValue().put("weight", row.getCell(15).getStringCellValue());
                                        } else {
                                            kpidto.getKpiValue().put("weight", 0);
                                        }
                                    } else if (row.getCell(15).getCellType() == CellType.NUMERIC) {
                                        kpidto.getKpiValue().put("weight", (int)row.getCell(15).getNumericCellValue());
                                    } else {
                                        kpidto.getKpiValue().put("weight", 0);
                                    }
                                } else {
                                    kpidto.getKpiValue().put("weight", 0);
                                }
                                if (row.getCell(16) != null && row.getCell(16).getCellType() != CellType.BLANK) {
                                    if (row.getCell(16).getCellType() == CellType.STRING) {
                                        if (row.getCell(16).getStringCellValue().trim() != "") {
                                            kpidto.getKpiValue().put("contribution", row.getCell(16).getStringCellValue());
                                        } else {
                                            kpidto.getKpiValue().put("contribution", 0);
                                        }
                                    } else if (row.getCell(16).getCellType() == CellType.NUMERIC) {
                                        kpidto.getKpiValue().put("contribution", (int)row.getCell(16).getNumericCellValue());
                                    } else {
                                        kpidto.getKpiValue().put("contribution", 0);
                                    }
                                } else {
                                    kpidto.getKpiValue().put("contribution", 0);
                                }
                                if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK) {
                                    measurement = row.getCell(18).getStringCellValue().trim();
                                    kpidto.getKpiValue().put("kpi_measurement", measurement);
                                }
                                if (row.getCell(19) != null && row.getCell(19).getCellType() != CellType.BLANK) {
                                    formula2 = new KPIFormula();
                                    formula2.setFormula(row.getCell(19).getStringCellValue().trim());
                                    String message2 = (String)this.kpiService.validateFormula(formula2).getBody();
                                    if ("valid".equalsIgnoreCase(message2)) {
                                        kpidto.setKpiFormula(formula2);
                                    }
                                }
                                if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) {
                                    boolean flag;
                                    actualheader = "1";
                                    if (row.getCell(20).getCellType() == CellType.STRING) {
                                        actualheader = row.getCell(20).getStringCellValue().trim();
                                        actualheader = actualheader == "TRUE" ? "1" : "0";
                                    } else if (row.getCell(20).getCellType() == CellType.NUMERIC) {
                                        actualheader = String.valueOf(row.getCell(20).getNumericCellValue());
                                        actualheader = actualheader.equals("1.0") ? "1" : "0";
                                    }
                                    boolean bl = flag = Integer.valueOf(actualheader) == 1;
                                    if (flag) {
                                        kpidto.getKpiValue().put("header1", "Actual");
                                    } else {
                                        kpidto.getKpiValue().remove("header1");
                                    }
                                }
                                if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                                    boolean flag;
                                    targetheader = "1";
                                    if (row.getCell(21).getCellType() == CellType.STRING) {
                                        targetheader = row.getCell(21).getStringCellValue().trim();
                                        targetheader = targetheader == "TRUE" ? "1" : "0";
                                    } else if (row.getCell(21).getCellType() == CellType.NUMERIC) {
                                        targetheader = String.valueOf(row.getCell(21).getNumericCellValue());
                                        targetheader = targetheader.equals("1.0") ? "1" : "0";
                                    }
                                    boolean bl = flag = Integer.valueOf(targetheader) == 1;
                                    if (flag) {
                                        kpidto.getKpiValue().put("header3", "Target");
                                    } else {
                                        kpidto.getKpiValue().remove("header3");
                                    }
                                }
                                if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                    boolean flag;
                                    budgetheader = "1";
                                    if (row.getCell(22).getCellType() == CellType.STRING) {
                                        budgetheader = row.getCell(22).getStringCellValue().trim();
                                        budgetheader = budgetheader == "TRUE" ? "1" : "0";
                                    } else if (row.getCell(22).getCellType() == CellType.NUMERIC) {
                                        budgetheader = String.valueOf(row.getCell(22).getNumericCellValue());
                                        budgetheader = budgetheader.equals("1.0") ? "1" : "0";
                                    }
                                    boolean bl = flag = Integer.valueOf(budgetheader) == 1;
                                    if (flag) {
                                        kpidto.getKpiValue().put("header2", "Budget");
                                    } else {
                                        kpidto.getKpiValue().remove("header2");
                                    }
                                }
                                if (row.getCell(23) != null && row.getCell(23).getCellType() != CellType.BLANK) {
                                    boolean flag;
                                    Forecastheader = "1";
                                    if (row.getCell(23).getCellType() == CellType.STRING) {
                                        Forecastheader = row.getCell(23).getStringCellValue().trim();
                                        Forecastheader = Forecastheader == "TRUE" ? "1" : "0";
                                    } else if (row.getCell(23).getCellType() == CellType.NUMERIC) {
                                        Forecastheader = String.valueOf(row.getCell(23).getNumericCellValue());
                                        Forecastheader = Forecastheader.equals("1.0") ? "1" : "0";
                                    }
                                    boolean bl = flag = Integer.valueOf(Forecastheader) == 1;
                                    if (flag) {
                                        kpidto.getKpiValue().put("header4", "Forecast");
                                    } else {
                                        kpidto.getKpiValue().remove("header4");
                                    }
                                }
                                if (row.getCell(24) != null && row.getCell(24).getCellType() != CellType.BLANK) {
                                    kpidto.getKpiValue().put("kpi_datasource", row.getCell(24).getStringCellValue().trim());
                                }
                                if (row.getCell(26) != null && row.getCell(26).getCellType() != CellType.BLANK) {
                                    XSSFCell redcell = row.getCell(26);
                                    red = df.formatCellValue((Cell)redcell, (FormulaEvaluator)evaluator);
                                    if (row.getCell(26).getCellType() == CellType.STRING) {
                                        redrawvalue = row.getCell(26).getStringCellValue().trim();
                                    } else if (row.getCell(26).getCellType() == CellType.NUMERIC) {
                                        redrawvalue = String.valueOf(row.getCell(26).getNumericCellValue());
                                    }
                                }
                                if (row.getCell(27) != null && row.getCell(27).getCellType() != CellType.BLANK) {
                                    XSSFCell ambercell = row.getCell(27);
                                    amber = df.formatCellValue((Cell)ambercell, (FormulaEvaluator)evaluator);
                                    if (row.getCell(27).getCellType() == CellType.STRING) {
                                        amberrawvalue = row.getCell(27).getStringCellValue().trim();
                                    } else if (row.getCell(27).getCellType() == CellType.NUMERIC) {
                                        amberrawvalue = String.valueOf(row.getCell(27).getNumericCellValue());
                                    }
                                }
                                if (row.getCell(28) != null && row.getCell(28).getCellType() != CellType.BLANK) {
                                    XSSFCell greencell = row.getCell(28);
                                    green = df.formatCellValue((Cell)greencell, (FormulaEvaluator)evaluator);
                                    if (row.getCell(28).getCellType() == CellType.STRING) {
                                        greenrawvalue = row.getCell(28).getStringCellValue().trim();
                                    } else if (row.getCell(28).getCellType() == CellType.NUMERIC) {
                                        greenrawvalue = String.valueOf(row.getCell(28).getNumericCellValue());
                                    }
                                }
                                if (row.getCell(29) != null && row.getCell(29).getCellType() != CellType.BLANK) {
                                    kpidto.getKpiValue().put("dataType", row.getCell(29).getStringCellValue().trim());
                                }
                                if (row.getCell(30) != null && row.getCell(30).getCellType() != CellType.BLANK) {
                                    kpidto.getKpiValue().put("kpiCurrency", row.getCell(30).getStringCellValue().trim());
                                }
                                if (row.getCell(31) != null && row.getCell(31).getCellType() != CellType.BLANK) {
                                    formula2 = new KPIFormula();
                                    formula2.setFormula(row.getCell(31).getStringCellValue().trim());
                                    formula2.setType("THRESSHOLD");
                                    try {
                                        String message3 = (String)this.kpiService.validateFormula(formula2).getBody();
                                        if ("valid".equalsIgnoreCase(message3)) {
                                            kpidto.getKpiValue().put("thresholdFormula", row.getCell(31).getStringCellValue().trim());
                                        }
                                    }
                                    catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                                if (row.getCell(32) != null && row.getCell(32).getCellType() != CellType.BLANK) {
                                    formula2 = new KPIFormula();
                                    formula2.setFormula(row.getCell(32).getStringCellValue().trim());
                                    String message4 = (String)this.kpiService.validateFormula(formula2).getBody();
                                    if ("valid".equalsIgnoreCase(message4)) {
                                        kpidto.getKpiValue().put("ytdFormula", row.getCell(32).getStringCellValue().trim());
                                    }
                                }
                                if (row.getCell(33) != null && row.getCell(33).getCellType() != CellType.BLANK) {
                                    kpidto.getKpiValue().put("kpiType", row.getCell(33).getStringCellValue().trim());
                                }
                                if (row.getCell(34) != null && row.getCell(34).getCellType() != CellType.BLANK) {
                                    kpidto.getKpiValue().put("kpiRole", row.getCell(34).getStringCellValue().trim());
                                }
                                if (row.getCell(35) != null && row.getCell(35).getCellType() != CellType.BLANK) {
                                    String subkpi_ID = row.getCell(35).getStringCellValue();
                                    if (subkpi_ID != null) {
                                        subkpiUniqueID = !subkpi_ID.equals("NA") ? subkpi_ID : "";
                                    }
                                    System.out.println("Subkpi Unique ID: " + subkpiUniqueID);
                                    subkpidto = (SubKPIDTO)kpidto.getSubkpiMap().get(subkpiUniqueID);
                                    subkpidto = subkpidto == null ? new SubKPIDTO() : subkpidto;
                                    System.out.println("SubKPI data: " + subkpidto.getId() + " " + subkpidto.getSubKpiName());
                                    subkpidto.setSubKpiId(StringUtils.isNotEmpty((CharSequence)subkpidto.getSubKpiId()) ? subkpidto.getSubKpiId() : subkpiUniqueID);
                                } else {
                                    subkpidto = null;
                                }
                                if (row.getCell(36) != null && row.getCell(36).getCellType() != CellType.BLANK) {
                                    name = row.getCell(36).getStringCellValue().trim();
                                    SubKPIDTO subKPIDTO = subkpidto = subkpidto == null ? new SubKPIDTO() : subkpidto;
                                    if (subkpidto != null && subkpidto.getSubKpiValue() == null) {
                                        subkpidto.setSubKpiValue(new HashMap());
                                    }
                                    subkpidto.setSubKpiName(name);
                                    subkpidto.getSubKpiValue().put("subMeasureName", name);
                                    subkpidto.getSubKpiValue().put("customthresholdenable", true);
                                }
                                if (row.getCell(50) != null && row.getCell(50).getCellType() != CellType.BLANK && subkpidto != null) {
                                    try {
                                        if (row.getCell(50).getCellType() == CellType.STRING) {
                                            subkpidto.setActive(Integer.parseInt(row.getCell(50).getStringCellValue()));
                                        } else if (row.getCell(50).getCellType() == CellType.NUMERIC) {
                                            subkpidto.setActive((int)row.getCell(50).getNumericCellValue());
                                        } else {
                                            subkpidto.setActive(0);
                                        }
                                    }
                                    catch (Exception ex) {
                                        kpidto.setActive(0);
                                    }
                                }
                                if (row.getCell(37) != null && row.getCell(37).getCellType() != CellType.BLANK && subkpidto != null && subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                    subkpidto.getSubKpiValue().put("description", row.getCell(37).getStringCellValue().trim());
                                }
                                if (row.getCell(38) != null && row.getCell(38).getCellType() != CellType.BLANK && subkpidto != null) {
                                    if (row.getCell(38).getCellType() == CellType.STRING) {
                                        if (row.getCell(38).getStringCellValue().trim() != "") {
                                            subkpidto.getSubKpiValue().put("weight", row.getCell(38).getStringCellValue());
                                        } else {
                                            subkpidto.getSubKpiValue().put("weight", 0);
                                        }
                                    } else if (row.getCell(38).getCellType() == CellType.NUMERIC && subkpidto != null) {
                                        subkpidto.getSubKpiValue().put("weight", (int)row.getCell(38).getNumericCellValue());
                                    } else if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                        subkpidto.getSubKpiValue().put("weight", 0);
                                    }
                                } else if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                    subkpidto.getSubKpiValue().put("weight", 0);
                                }
                                if (row.getCell(39) != null && row.getCell(39).getCellType() != CellType.BLANK && subkpidto != null) {
                                    if (row.getCell(39).getCellType() == CellType.STRING) {
                                        if (row.getCell(39).getStringCellValue().trim() != "") {
                                            subkpidto.getSubKpiValue().put("contribution", row.getCell(39).getStringCellValue());
                                        } else {
                                            subkpidto.getSubKpiValue().put("contribution", 0);
                                        }
                                    } else if (row.getCell(39).getCellType() == CellType.NUMERIC && subkpidto != null) {
                                        subkpidto.getSubKpiValue().put("contribution", (int)row.getCell(39).getNumericCellValue());
                                    } else if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                        subkpidto.getSubKpiValue().put("contribution", 0);
                                    }
                                } else if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                    subkpidto.getSubKpiValue().put("contribution", 0);
                                }
                                if (row.getCell(40) != null && row.getCell(40).getCellType() != CellType.BLANK && subkpidto != null) {
                                    measurement = row.getCell(40).getStringCellValue().trim();
                                    subkpidto.getSubKpiValue().put("kpi_measurement", measurement);
                                }
                                if (row.getCell(41) != null && row.getCell(41).getCellType() != CellType.BLANK && subkpidto != null) {
                                    formula2 = new KPIFormula();
                                    formula2.setFormula(row.getCell(41).getStringCellValue().trim());
                                    String message5 = (String)this.kpiService.validateFormula(formula2).getBody();
                                    if ("valid".equalsIgnoreCase(message5)) {
                                        subkpidto.setKpiFormula(formula2);
                                    }
                                }
                                if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) {
                                    boolean flag;
                                    actualheader = "1";
                                    if (row.getCell(20).getCellType() == CellType.STRING) {
                                        actualheader = row.getCell(20).getStringCellValue().trim();
                                        actualheader = actualheader == "TRUE" ? "1" : "0";
                                    } else if (row.getCell(20).getCellType() == CellType.NUMERIC) {
                                        actualheader = String.valueOf(row.getCell(20).getNumericCellValue());
                                        actualheader = actualheader.equals("1.0") ? "1" : "0";
                                    }
                                    boolean bl = flag = Integer.valueOf(actualheader) == 1;
                                    if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                        if (flag) {
                                            subkpidto.getSubKpiValue().put("header1", "Actual");
                                        } else {
                                            subkpidto.getSubKpiValue().remove("header1");
                                        }
                                    }
                                }
                                if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                                    boolean flag;
                                    targetheader = "1";
                                    if (row.getCell(21).getCellType() == CellType.STRING) {
                                        targetheader = row.getCell(21).getStringCellValue().trim();
                                        targetheader = targetheader == "TRUE" ? "1" : "0";
                                    } else if (row.getCell(21).getCellType() == CellType.NUMERIC) {
                                        targetheader = String.valueOf(row.getCell(21).getNumericCellValue());
                                        targetheader = targetheader.equals("1.0") ? "1" : "0";
                                    }
                                    boolean bl = flag = Integer.valueOf(targetheader) == 1;
                                    if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                        if (flag) {
                                            subkpidto.getSubKpiValue().put("header3", "Target");
                                        } else {
                                            subkpidto.getSubKpiValue().remove("header3");
                                        }
                                    }
                                }
                                if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                    boolean flag;
                                    budgetheader = "1";
                                    if (row.getCell(22).getCellType() == CellType.STRING) {
                                        budgetheader = row.getCell(22).getStringCellValue().trim();
                                        budgetheader = budgetheader == "TRUE" ? "1" : "0";
                                    } else if (row.getCell(22).getCellType() == CellType.NUMERIC) {
                                        budgetheader = String.valueOf(row.getCell(22).getNumericCellValue());
                                        budgetheader = budgetheader.equals("1.0") ? "1" : "0";
                                    }
                                    boolean bl = flag = Integer.valueOf(budgetheader) == 1;
                                    if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                        if (flag) {
                                            subkpidto.getSubKpiValue().put("header2", "Budget");
                                        } else {
                                            subkpidto.getSubKpiValue().remove("header2");
                                        }
                                    }
                                }
                                if (row.getCell(23) != null && row.getCell(23).getCellType() != CellType.BLANK) {
                                    boolean flag;
                                    Forecastheader = "1";
                                    if (row.getCell(23).getCellType() == CellType.STRING) {
                                        Forecastheader = row.getCell(23).getStringCellValue().trim();
                                        Forecastheader = Forecastheader == "TRUE" ? "1" : "0";
                                    } else if (row.getCell(23).getCellType() == CellType.NUMERIC) {
                                        Forecastheader = String.valueOf(row.getCell(23).getNumericCellValue());
                                        Forecastheader = Forecastheader.equals("1.0") ? "1" : "0";
                                    }
                                    boolean bl = flag = Integer.valueOf(Forecastheader) == 1;
                                    if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                        if (flag) {
                                            subkpidto.getSubKpiValue().put("header4", "Forecast");
                                        } else {
                                            subkpidto.getSubKpiValue().remove("header4");
                                        }
                                    }
                                }
                                if (row.getCell(24) != null && row.getCell(24).getCellType() != CellType.BLANK && subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                    subkpidto.getSubKpiValue().put("kpi_datasource", row.getCell(24).getStringCellValue().trim());
                                }
                                if (row.getCell(25) != null && row.getCell(25).getCellType() != CellType.BLANK) {
                                    String Status2 = row.getCell(25).getStringCellValue().trim();
                                    String statusval2 = null;
                                    if (Status2.equalsIgnoreCase("weighted")) {
                                        statusval2 = "Weighted";
                                    } else if (Status2.equalsIgnoreCase("manual")) {
                                        statusval2 = "Manual";
                                    } else if (Status2.equalsIgnoreCase("first")) {
                                        statusval2 = "First";
                                    } else if (Status2.equalsIgnoreCase("second")) {
                                        statusval2 = "Second";
                                    } else if (Status2.equalsIgnoreCase("third")) {
                                        statusval2 = "third";
                                    }
                                    scoreCardDTO.getScoreCardValue().put("status", statusval2);
                                    objectivesDTO.getObjectivesValue().put("status", statusval2);
                                    kpidto.getKpiValue().put("status", statusval2);
                                    if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                        subkpidto.getSubKpiValue().put("status", statusval2);
                                    }
                                }
                                if (row.getCell(42) != null && row.getCell(42).getCellType() != CellType.BLANK && subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                    subkpidto.getSubKpiValue().put("dataType", row.getCell(42).getStringCellValue().trim());
                                }
                                if (row.getCell(43) != null && row.getCell(43).getCellType() != CellType.BLANK && subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                    subkpidto.getSubKpiValue().put("kpiCurrency", row.getCell(43).getStringCellValue().trim());
                                }
                                if (row.getCell(44) != null && row.getCell(44).getCellType() != CellType.BLANK) {
                                    formula2 = new KPIFormula();
                                    formula2.setFormula(row.getCell(44).getStringCellValue().trim());
                                    formula2.setType("THRESSHOLD");
                                    try {
                                        String message6 = (String)this.kpiService.validateFormula(formula2).getBody();
                                        if ("valid".equalsIgnoreCase(message6)) {
                                            subkpidto.getSubKpiValue().put("thresholdFormula", row.getCell(44).getStringCellValue().trim());
                                        }
                                    }
                                    catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                                if (row.getCell(45) != null && row.getCell(45).getCellType() != CellType.BLANK && subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                    subkpidto.getSubKpiValue().put("kpiType", row.getCell(45).getStringCellValue().trim());
                                }
                                if (row.getCell(46) != null && row.getCell(46).getCellType() != CellType.BLANK) {
                                    kpidto.getKpiValue().put("kpi_start_end_date", row.getCell(46).getStringCellValue().trim());
                                    objectivesDTO.getObjectivesValue().put("objective_start_end_date", row.getCell(46).getStringCellValue().trim());
                                    scoreCardDTO.getScoreCardValue().put("perspective_start_end_date", row.getCell(46).getStringCellValue().trim());
                                    if (subkpidto != null && subkpidto.getSubKpiValue() != null) {
                                        subkpidto.getSubKpiValue().put("kpi_start_end_date", row.getCell(46).getStringCellValue().trim());
                                    }
                                }
                                if (row.getCell(47) != null && row.getCell(47).getCellType() != CellType.BLANK) {
                                    formula2 = new KPIFormula();
                                    formula2.setFormula(row.getCell(47).getStringCellValue().trim());
                                    formula2.setType("OBJECTIVE");
                                    String message7 = (String)this.kpiService.validateFormula(formula2).getBody();
                                    if ("valid".equalsIgnoreCase(message7)) {
                                        objectivesDTO.getObjectivesValue().put("thresholdFormula", row.getCell(47).getStringCellValue().trim());
                                    }
                                }
                                if (row.getCell(48) != null && row.getCell(48).getCellType() != CellType.BLANK) {
                                    formula2 = new KPIFormula();
                                    formula2.setFormula(row.getCell(48).getStringCellValue().trim());
                                    formula2.setType("PERSPECTIVE");
                                    String message8 = (String)this.kpiService.validateFormula(formula2).getBody();
                                    if ("valid".equalsIgnoreCase(message8)) {
                                        scoreCardDTO.getScoreCardValue().put("thresholdFormula", row.getCell(48).getStringCellValue().trim());
                                    }
                                }
                                if (row.getCell(49) != null && row.getCell(49).getCellType() != CellType.BLANK) {
                                    formula2 = new KPIFormula();
                                    formula2.setFormula(row.getCell(49).getStringCellValue().trim());
                                    formula2.setType("SCORECARDCONFIG");
                                    String message9 = (String)this.kpiService.validateFormula(formula2).getBody();
                                    if ("valid".equalsIgnoreCase(message9)) {
                                        scoreCardDTO.getScoreCardValue().put("scorecardFormula", row.getCell(49).getStringCellValue().trim());
                                    }
                                }
                                this.updateKpiObject(kpidto, owner.longValue(), target, red, green, amber, targetrawvalue, redrawvalue, greenrawvalue, amberrawvalue);
                                if (subkpidto != null) {
                                    this.updateSubKpiObject(subkpidto, owner.longValue(), target, red, green, amber, targetrawvalue, redrawvalue, greenrawvalue, amberrawvalue);
                                }
                                scoreCardDTO.setScorecardName(pageName);
                                ScoreCardDTO updatedDTO = this.buildAndUpdateRowDetails(scoreCardDTO, objectivesDTO, kpidto, subkpidto, pageId.longValue(), owner.longValue(), pageOwner.longValue());
                                scorecardMap.put(updatedDTO.getPerspectiveId(), updatedDTO);
                                break block270;
                            }
                            ++failedrows;
                            continue;
                        }
                        catch (Exception e) {
                            --i;
                            e.printStackTrace();
                        }
                    }
                    ++processedrows;
                    if (checkcreaterowno != null && checkcreaterowno.equals(new Long(row.getCTRow().getR())) && createStatus.booleanValue()) {
                        ++createrows;
                        ++updatedrows;
                    }
                    if (checkupdaterowno == null || !checkupdaterowno.equals(new Long(row.getCTRow().getR())) || !updateStatus.booleanValue()) continue;
                    ++updatedrows;
                }
            }
            resultMap.put("result", "success");
            resultMap.put("no_of_failed", failedrows);
            resultMap.put("no_of_process", processrows);
            resultMap.put("no_of_processed", processedrows);
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

    public ScoreCardDTO buildAndUpdateRowDetails(ScoreCardDTO scoreCardDTO, ObjectivesDTO objectivesDTO, KPIDTO kpidto, SubKPIDTO subkpidto, long pageId, long owner, long pageOwner) {
        ScoreCardDTO rowDDTO = this.buildScoreCardRowObject(scoreCardDTO, Long.valueOf(pageId), owner);
        Map objectRowMap = scoreCardDTO.getObjectivesMap();
        if (rowDDTO.getId() != 0L) {
            rowDDTO.setUpdatedBy(pageOwner);
            rowDDTO = ((ScoreCardResponseDTO)this.scoreCardService.saveOrUpdateScoreCardDetails(rowDDTO, "Update").getBody()).getCardDTO();
        } else {
            rowDDTO.setCreatedBy(pageOwner);
            rowDDTO = ((ScoreCardResponseDTO)this.scoreCardService.saveOrUpdateScoreCardDetails(rowDDTO, "Save").getBody()).getCardDTO();
        }
        ObjectivesDTO objRowDTO = this.buildObjectiveRowObject(objectivesDTO, owner);
        objRowDTO.setScoreCardId(rowDDTO.getId());
        if (objRowDTO.getId() != 0L) {
            objRowDTO.setUpdatedBy(pageOwner);
            objRowDTO = (ObjectivesDTO)this.objectiveService.saveOrUpdateObjectiveDetails(objRowDTO, "Update").getBody();
        } else {
            objRowDTO.setCreatedBy(pageOwner);
            objRowDTO = (ObjectivesDTO)this.objectiveService.saveOrUpdateObjectiveDetails(objRowDTO, "Save").getBody();
        }
        Map kpiRowMap = objectivesDTO.getKpiMap();
        objRowDTO.setKpiMap(kpiRowMap);
        objectRowMap.put(objRowDTO.getObjectiveId(), objRowDTO);
        kpidto.setObjectiveId(objRowDTO.getId());
        KPIDTO kpiRowDTO = new KPIDTO();
        if (kpidto.getId() != 0L) {
            kpidto.setUpdatedBy(pageOwner);
            kpiRowDTO = (KPIDTO)this.kpiService.saveOrUpdateDetails(kpidto, "Update").getBody();
            kpiRowMap.put(kpiRowDTO.getKpiId(), kpiRowDTO);
        } else {
            kpidto.setCreatedBy(pageOwner);
            kpiRowDTO = (KPIDTO)this.kpiService.saveOrUpdateDetails(kpidto, "Save").getBody();
            kpiRowMap.put(kpiRowDTO.getKpiId(), kpiRowDTO);
        }
        Map subkpiRowMap = kpidto.getSubkpiMap();
        System.out.println(subkpiRowMap);
        if (subkpidto != null && subkpidto.getSubKpiName() != null && subkpidto.getSubKpiName().trim() != "") {
            subkpidto.setKpiId(kpiRowDTO.getId());
            subkpidto.setObjectiveId(kpiRowDTO.getObjectiveId());
            System.out.println("SubKPI ID in build: " + subkpidto.getId() + " ::: " + subkpidto.getSubKpiName());
            if (subkpidto.getId() != 0L) {
                subkpidto.setUpdatedBy(pageOwner);
                SubKPIDTO subkpiRowDTO = (SubKPIDTO) (SubKPIDTO)this.subKPIService.saveOrUpdateDetails(subkpidto, "Update").getBody();
                subkpiRowMap.put(subkpiRowDTO.getSubKpiId(), subkpiRowDTO);
            } else {
                subkpidto.setCreatedBy(pageOwner);
                SubKPIDTO subkpiRowDTO = (SubKPIDTO) (SubKPIDTO)this.subKPIService.saveOrUpdateDetails(subkpidto, "Save").getBody();
                subkpiRowMap.put(subkpiRowDTO.getSubKpiId(), subkpiRowDTO);
            }
        }
        rowDDTO.setObjectivesMap(objectRowMap);
        return rowDDTO;
    }

    public String getValue(Map inMap, String key) {
        String value = Objects.nonNull(inMap) && Objects.nonNull(inMap.get(key)) ? inMap.get(key).toString() : "";
        return value;
    }

    void saveDefaultScoreCard(Long pageId, long owner, String pageName) {
        this.saveScoreCardDetails(pageId, owner, "Financial", pageName);
        this.saveScoreCardDetails(pageId, owner, "Customer", pageName);
        this.saveScoreCardDetails(pageId, owner, "Internal Process", pageName);
        this.saveScoreCardDetails(pageId, owner, "Learning & Growth", pageName);
    }

    void saveScoreCardDetails(Long pageId, long owner, String name, String pageName) {
        ScoreCardDTO scoreCardDTO = new ScoreCardDTO();
        scoreCardDTO.setActive(0);
        scoreCardDTO.setScorecardName(pageName);
        scoreCardDTO.setOwner(owner);
        scoreCardDTO.setPageId(pageId.longValue());
        scoreCardDTO.setCreatedBy(owner);
        scoreCardDTO.setScoreCardValue(this.getScoreCardValue(name));
        this.scoreCardService.saveOrUpdateScoreCardDetails(scoreCardDTO, "Save");
    }

    Map getScoreCardValue(String name) {
        HashMap stringObjectMap = new HashMap();
        stringObjectMap.put("defaultscr", true);
        stringObjectMap.put("header1", "ID");
        stringObjectMap.put("header2", "Period");
        stringObjectMap.put("header3", "Actual");
        stringObjectMap.put("header4", "Target");
        stringObjectMap.put("header5", "Trend");
        stringObjectMap.put("name", name);
        return stringObjectMap;
    }

    public ScoreCardDTO buildScoreCardRowObject(ScoreCardDTO scoreCardDTO, Long pageId, long owner) {
        long scoreCardId = scoreCardDTO.getId();
        ScoreCardDTO cardDTO = new ScoreCardDTO();
        cardDTO.setPerspectiveType(scoreCardDTO.getPerspectiveType());
        cardDTO.setScorecardName(scoreCardDTO.getScorecardName());
        cardDTO.setPerspectiveId(scoreCardDTO.getPerspectiveId());
        if (scoreCardId != 0L) {
            cardDTO.setId(scoreCardId);
            cardDTO.setUpdatedTime(LocalDateTime.now());
            cardDTO.setUpdatedBy(owner);
        } else {
            cardDTO.setCreatedTime(LocalDateTime.now());
            cardDTO.setCreatedBy(owner);
        }
        cardDTO.setActive(0);
        cardDTO.setOwner(owner);
        cardDTO.setPageId(pageId.longValue());
        cardDTO.setScoreCardDetailsId(scoreCardDTO.getScoreCardDetailsId());
        Map stringObjectMap = scoreCardDTO.getScoreCardValue();
        stringObjectMap.put("defaultscr", true);
        stringObjectMap.put("header1", "ID");
        stringObjectMap.put("header2", "Period");
        stringObjectMap.put("header3", "Actual");
        stringObjectMap.put("header4", "Target");
        stringObjectMap.put("header5", "Trend");
        stringObjectMap.put("header5", "Trend");
        cardDTO.setScoreCardValue(stringObjectMap);
        return cardDTO;
    }

    public ObjectivesDTO buildObjectiveRowObject(ObjectivesDTO objectivesDTO, long owner) {
        ObjectivesDTO rowDTO = new ObjectivesDTO();
        rowDTO.setObjectivesName(objectivesDTO.getObjectivesName());
        rowDTO.setActive(objectivesDTO.getActive());
        long objectiveId = objectivesDTO.getId();
        if (objectiveId != 0L) {
            rowDTO.setId(objectiveId);
            rowDTO.setUpdatedTime(LocalDateTime.now());
            rowDTO.setObjectiveId(objectivesDTO.getObjectiveId());
            rowDTO.setUpdatedBy(owner);
        } else {
            rowDTO.setObjectiveId(objectivesDTO.getObjectiveId());
            rowDTO.setCreatedTime(LocalDateTime.now());
            rowDTO.setCreatedBy(owner);
        }
        rowDTO.setOwner(owner);
        rowDTO.setObjectivesValue(objectivesDTO.getObjectivesValue());
        return rowDTO;
    }

    public void updateKpiObject(KPIDTO kpidto, long owner, String target, String red, String green, String amber, String targetrawvalue, String redrawvalue, String greenrawvalue, String amberrawvalue) {
        long kpiId = kpidto.getId();
        if (kpiId != 0L) {
            kpidto.setId(kpiId);
        }
        kpidto.setOwner(owner);
        Map stringObjectMap = kpidto.getKpiValue();
        stringObjectMap.put("threshold", "option_2");
        if (red != null) {
            if (red.contains("%")) {
                stringObjectMap.put("option2color1", red);
                stringObjectMap.put("option2color1colorvalue", "rgb(244, 67, 54)");
            } else if (red.contains(",")) {
                stringObjectMap.put("option2color1", redrawvalue);
                stringObjectMap.put("option2color1colorvalue", "rgb(244, 67, 54)");
            } else {
                stringObjectMap.put("option2color1", redrawvalue);
                stringObjectMap.put("option2color1colorvalue", "rgb(244, 67, 54)");
            }
        } else {
            stringObjectMap.put("option2color1", "");
            stringObjectMap.put("option2color1colorvalue", "rgb(244, 67, 54)");
        }
        if (green != null) {
            if (green.contains("%")) {
                stringObjectMap.put("option2color3", green);
                stringObjectMap.put("option2color3colorvalue", "rgb(37, 125, 5)");
            } else if (green.contains(",")) {
                stringObjectMap.put("option2color3", greenrawvalue);
                stringObjectMap.put("option2color3colorvalue", "rgb(37, 125, 5)");
            } else {
                stringObjectMap.put("option2color3", greenrawvalue);
                stringObjectMap.put("option2color3colorvalue", "rgb(37, 125, 5)");
            }
        } else {
            stringObjectMap.put("option2color3", "");
            stringObjectMap.put("option2color3colorvalue", "rgb(37, 125, 5)");
        }
        if (amber != null) {
            if (amber.contains("%")) {
                stringObjectMap.put("option2color2", amber);
                stringObjectMap.put("option2color2colorvalue", "rgb(255, 193, 7)");
            } else if (amber.contains(",")) {
                stringObjectMap.put("option2color2", amberrawvalue);
                stringObjectMap.put("option2color2colorvalue", "rgb(255, 193, 7)");
            } else {
                stringObjectMap.put("option2color2", amberrawvalue);
                stringObjectMap.put("option2color2colorvalue", "rgb(255, 193, 7)");
            }
        } else {
            stringObjectMap.put("option2color2", "");
            stringObjectMap.put("option2color2colorvalue", "rgb(255, 193, 7)");
        }
        if (null != target) {
            if (target.contains("%")) {
                stringObjectMap.put("target", target);
            } else if (target.contains(",")) {
                stringObjectMap.put("target", targetrawvalue);
                if (!ScoreCardReaderUtil.isNumeric((String)target.substring(0, 1))) {
                    stringObjectMap.put("targetCurrency", target.substring(0, 1));
                }
            } else {
                stringObjectMap.put("target", targetrawvalue);
            }
        } else {
            stringObjectMap.put("target", "0");
        }
        kpidto.setKpiValue(stringObjectMap);
    }

    public void updateSubKpiObject(SubKPIDTO subkpidto, long owner, String target, String red, String green, String amber, String targetrawvalue, String redrawvalue, String greenrawvalue, String amberrawvalue) {
        long kpiId = subkpidto.getId();
        if (kpiId != 0L) {
            subkpidto.setId(kpiId);
        }
        subkpidto.setOwner(owner);
        Map stringObjectMap = subkpidto.getSubKpiValue();
        stringObjectMap.put("threshold", "option_2");
        if (red != null) {
            if (red.contains("%")) {
                stringObjectMap.put("option2color1", red);
                stringObjectMap.put("option2color1colorvalue", "rgb(244, 67, 54)");
            } else if (red.contains(",")) {
                stringObjectMap.put("option2color1", redrawvalue);
                stringObjectMap.put("option2color1colorvalue", "rgb(244, 67, 54)");
            } else {
                stringObjectMap.put("option2color1", redrawvalue);
                stringObjectMap.put("option2color1colorvalue", "rgb(244, 67, 54)");
            }
        } else {
            stringObjectMap.put("option2color1", "");
            stringObjectMap.put("option2color1colorvalue", "rgb(244, 67, 54)");
        }
        if (green != null) {
            if (green.contains("%")) {
                stringObjectMap.put("option2color3", green);
                stringObjectMap.put("option2color3colorvalue", "rgb(37, 125, 5)");
            } else if (green.contains(",")) {
                stringObjectMap.put("option2color3", greenrawvalue);
                stringObjectMap.put("option2color3colorvalue", "rgb(37, 125, 5)");
            } else {
                stringObjectMap.put("option2color3", greenrawvalue);
                stringObjectMap.put("option2color3colorvalue", "rgb(37, 125, 5)");
            }
        } else {
            stringObjectMap.put("option2color3", "");
            stringObjectMap.put("option2color3colorvalue", "rgb(37, 125, 5)");
        }
        if (amber != null) {
            if (amber.contains("%")) {
                stringObjectMap.put("option2color2", amber);
                stringObjectMap.put("option2color2colorvalue", "rgb(255, 193, 7)");
            } else if (amber.contains(",")) {
                stringObjectMap.put("option2color2", amberrawvalue);
                stringObjectMap.put("option2color2colorvalue", "rgb(255, 193, 7)");
            } else {
                stringObjectMap.put("option2color2", amberrawvalue);
                stringObjectMap.put("option2color2colorvalue", "rgb(255, 193, 7)");
            }
        } else {
            stringObjectMap.put("option2color2", "");
            stringObjectMap.put("option2color2colorvalue", "rgb(255, 193, 7)");
        }
        if (null != target) {
            if (target.contains("%")) {
                stringObjectMap.put("target", target);
            } else if (target.contains(",")) {
                stringObjectMap.put("target", targetrawvalue);
                if (!ScoreCardReaderUtil.isNumeric((String)target.substring(0, 1))) {
                    stringObjectMap.put("targetCurrency", target.substring(0, 1));
                }
            } else {
                stringObjectMap.put("target", targetrawvalue);
            }
        } else {
            stringObjectMap.put("target", "0");
        }
        subkpidto.setSubKpiValue(stringObjectMap);
    }

    public static boolean isNumeric(String strNum) {
        if (strNum == null) {
            return false;
        }
        try {
            double d = Double.parseDouble(strNum);
        }
        catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }

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

    public Map getWriteDocForScoreCard(XSSFRow row, DataFormatter df, FormulaEvaluator evaluator, String excelSheetName) {
        HashMap map = new HashMap();
        map.put("Excel_SheetName", excelSheetName);
        evaluator.evaluateAll();
        try {
            for (int cellIndex = 0; cellIndex < row.getPhysicalNumberOfCells(); ++cellIndex) {
                if (cellIndex == 0) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("ScoreCardName", row.getCell(0).getStringCellValue().trim());
                        continue;
                    }
                    map.put("ScoreCardName", "");
                    continue;
                }
                if (cellIndex == 3) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Department", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Department", "");
                    continue;
                }
                if (cellIndex == 4) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Scorecard Description", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Scorecard Description", "");
                    continue;
                }
                if (cellIndex == 6) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Perspective Name", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Perspective Name", "");
                    continue;
                }
                if (cellIndex == 7) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Perspective Type", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Perspective Type", "");
                    continue;
                }
                if (cellIndex == 8) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Perspective Description", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Perspective Description", "");
                    continue;
                }
                if (cellIndex == 11) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Objective Name", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Objective Name", "");
                    continue;
                }
                if (cellIndex == 12) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Objective Description", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Objective Description", "");
                    continue;
                }
                if (cellIndex == 15) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("KPI NAME", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("KPI NAME", "");
                    continue;
                }
                if (cellIndex != 18) continue;
                if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                    map.put("Owner", row.getCell(cellIndex).getStringCellValue().trim());
                    continue;
                }
                map.put("Owner", "");
            }
        }
        catch (NullPointerException nullPointerException) {
        }
        catch (Exception exception) {
            // empty catch block
        }
        return map;
    }

    private String getS3ObjectLink(String fileName, String S3_ASSET_PATHS) throws UnsupportedEncodingException {
        return "http://" + this.repositoryServices.getAmazonBucket() + ".s3.amazonaws.com" + S3_ASSET_PATHS + "/" + URLEncoder.encode(fileName, "UTF-8");
    }

    public boolean getvalueStatus(XSSFRow row, int cell) {
        Boolean status;
        block4: {
            status = false;
            try {
                if (row.getCell(cell) != null && row.getCell(cell).getCellType() != CellType.BLANK) {
                    String progress = row.getCell(cell).getStringCellValue().trim();
                    status = progress != null && !progress.isEmpty() ? (ScoreCardReaderUtil.isNumeric((String)progress) ? Boolean.valueOf(true) : Boolean.valueOf(false)) : Boolean.valueOf(true);
                }
            }
            catch (IllegalStateException e) {
                String msg = e.getMessage();
                if (msg.equalsIgnoreCase("Cannot get a text value from a numeric cell")) {
                    status = true;
                }
                if (!msg.equalsIgnoreCase("Cannot get a STRING value from a NUMERIC cell")) break block4;
                status = true;
            }
        }
        return status;
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

    public ResponseEntity<ByteArrayResource> writeDocForScoreCard(ScoreCardResponseDTO scoreCardDTOList) throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        ArrayList mapList = new ArrayList();
        HashMap stringObjectMap = null;
        try {
            org.apache.poi.ss.usermodel.Cell cell;
            Row headerRow;
            CellStyle headerCellStyle;
            Font headerFont;
            Sheet sheet;
            String sheetname;
            CreationHelper createHelper;
            XSSFWorkbook workbook;
            String[] COLUMNs;
            ScoreCardDetailsDTO scoreCardDetailsDTO;
            if ((scoreCardDTOList == null || scoreCardDTOList.getCardDetailsDTO() != null) && scoreCardDTOList != null && CollectionUtils.isNotEmpty((Collection)scoreCardDTOList.getCardDetailsDTO().getScoreCardDTOS()) && (scoreCardDetailsDTO = scoreCardDTOList.getCardDetailsDTO()) != null && CollectionUtils.isNotEmpty((Collection)scoreCardDetailsDTO.getScoreCardDTOS())) {
                for (Object _obj_scoreCardDTO : scoreCardDetailsDTO.getScoreCardDTOS()) {
                    ScoreCardDTO scoreCardDTO = (ScoreCardDTO) _obj_scoreCardDTO;
                    DeptDetails deptDetails;
                    if (scoreCardDTO == null) continue;
                    if (!scoreCardDTO.getObjectiveList().isEmpty()) {
                        for (Object _obj_objectivesDTO : scoreCardDTO.getObjectiveList()) {
                            ObjectivesDTO objectivesDTO = (ObjectivesDTO) _obj_objectivesDTO;
                            DeptDetails deptDetails2;
                            if (!objectivesDTO.getKpiList().isEmpty()) {
                                for (Object _obj_kpidto : objectivesDTO.getKpiList()) {
                                    KPIDTO kpidto = (KPIDTO) _obj_kpidto;
                                    DeptDetails deptDetails3;
                                    if (!kpidto.getSubKpiList().isEmpty()) {
                                        for (Object _obj_subkpidto : kpidto.getSubKpiList()) {
                                            SubKPIDTO subkpidto = (SubKPIDTO) _obj_subkpidto;
                                            DeptDetails deptDetails4;
                                            stringObjectMap = new HashMap();
                                            if (scoreCardDetailsDTO.getDepartmentId() != null && (deptDetails4 = this.departmentDetailsService.findById(scoreCardDetailsDTO.getDepartmentId())) != null && deptDetails4.getDeptID() != null) {
                                                stringObjectMap.put("DepartmentId", deptDetails4.getDeptID());
                                            }
                                            stringObjectMap.put("ScoreCardName", scoreCardDetailsDTO.getScorecardName());
                                            stringObjectMap.put("ScorecardDescription", (String)scoreCardDetailsDTO.getScoreCardDetailsValue().get("description"));
                                            stringObjectMap.put("PerspectiveID", scoreCardDTO.getPerspectiveId());
                                            stringObjectMap.put("PerspectiveName", (String)scoreCardDTO.getScoreCardValue().get("name"));
                                            stringObjectMap.put("PerspectiveType", scoreCardDTO.getPerspectiveType());
                                            stringObjectMap.put("PerspectiveDescription", (String)scoreCardDTO.getScoreCardValue().get("description"));
                                            stringObjectMap.put("PerspectiveWeight", (String)scoreCardDTO.getScoreCardValue().get("weight"));
                                            stringObjectMap.put("ObJectiveID", objectivesDTO.getObjectiveId());
                                            stringObjectMap.put("ObjectiveName", objectivesDTO.getObjectivesName());
                                            stringObjectMap.put("ObjectiveDescription", (String)objectivesDTO.getObjectivesValue().get("description"));
                                            stringObjectMap.put("ObjectiveWeight", (String)objectivesDTO.getObjectivesValue().get("weight"));
                                            stringObjectMap.put("KPIID", kpidto.getKpiId());
                                            stringObjectMap.put("KPINAME", kpidto.getKpiName());
                                            stringObjectMap.put("KPIDescription", (String)kpidto.getKpiValue().get("description"));
                                            stringObjectMap.put("KPIWeight", (String)kpidto.getKpiValue().get("weight"));
                                            stringObjectMap.put("MeasurementFrequency", (String)kpidto.getKpiValue().get("kpi_measurement"));
                                            stringObjectMap.put("KPIFormula", kpidto.getKpiFormula().getFormula());
                                            if (kpidto.getKpiValue().containsKey("header1")) {
                                                stringObjectMap.put("ActualField", "TRUE");
                                            } else {
                                                stringObjectMap.put("ActualField", "FALSE");
                                            }
                                            if (kpidto.getKpiValue().containsKey("header2")) {
                                                stringObjectMap.put("BudgetField", "TRUE");
                                            } else {
                                                stringObjectMap.put("BudgetField", "FALSE");
                                            }
                                            if (kpidto.getKpiValue().containsKey("header3")) {
                                                stringObjectMap.put("TargetField", "TRUE");
                                            } else {
                                                stringObjectMap.put("TargetField", "FALSE");
                                            }
                                            if (kpidto.getKpiValue().containsKey("header4")) {
                                                stringObjectMap.put("ForecastField", "TRUE");
                                            } else {
                                                stringObjectMap.put("ForecastField", "FALSE");
                                            }
                                            stringObjectMap.put("DataSource", (String)kpidto.getKpiValue().get("kpi_datasource"));
                                            stringObjectMap.put("Red", (String)kpidto.getKpiValue().get("option2color1"));
                                            stringObjectMap.put("Amber", (String)kpidto.getKpiValue().get("option2color2"));
                                            stringObjectMap.put("Green", (String)kpidto.getKpiValue().get("option2color3"));
                                            stringObjectMap.put("Status", (String)kpidto.getKpiValue().get("status"));
                                            stringObjectMap.put("DataType", (String)kpidto.getKpiValue().get("dataType"));
                                            stringObjectMap.put("Currency", (String)kpidto.getKpiValue().get("kpiCurrency"));
                                            stringObjectMap.put("CustomThreshold", (String)kpidto.getKpiValue().get("thresholdFormula"));
                                            stringObjectMap.put("YTDFormula", (String)kpidto.getKpiValue().get("ytdFormula"));
                                            stringObjectMap.put("KPIType", (String)kpidto.getKpiValue().get("kpiType"));
                                            if (kpidto.getKpiValue().containsKey("contribution") && kpidto.getKpiValue().get("contribution") != null) {
                                                stringObjectMap.put("KPIContribution", (String)kpidto.getKpiValue().get("contribution"));
                                            }
                                            stringObjectMap.put("SUBKPIID", subkpidto.getSubKpiId());
                                            stringObjectMap.put("SUBKPINAME", subkpidto.getSubKpiName());
                                            stringObjectMap.put("SubKPIDescription", (String)subkpidto.getSubKpiValue().get("description"));
                                            stringObjectMap.put("SubKPIWeight", (String)subkpidto.getSubKpiValue().get("weight"));
                                            stringObjectMap.put("Owner", (String)subkpidto.getSubKpiValue().get("ownerName"));
                                            stringObjectMap.put("SubMeasurementFrequency", (String)subkpidto.getSubKpiValue().get("kpi_measurement"));
                                            if (subkpidto.getKpiFormula() != null) {
                                                stringObjectMap.put("SubKPIFormula", subkpidto.getKpiFormula().getFormula());
                                            }
                                            stringObjectMap.put("SubDataType", (String)subkpidto.getSubKpiValue().get("dataType"));
                                            stringObjectMap.put("SubCurrency", (String)subkpidto.getSubKpiValue().get("kpiCurrency"));
                                            stringObjectMap.put("SubCustomThreshold", (String)subkpidto.getSubKpiValue().get("thresholdFormula"));
                                            stringObjectMap.put("SubKPIType", (String)subkpidto.getSubKpiValue().get("kpiType"));
                                            stringObjectMap.put("Start/EndDate", (String)subkpidto.getSubKpiValue().get("kpi_start_end_date"));
                                            if (subkpidto.getSubKpiValue().containsKey("contribution") && subkpidto.getSubKpiValue().get("contribution") != null) {
                                                stringObjectMap.put("SubKPIContribution", (String)subkpidto.getSubKpiValue().get("contribution"));
                                            }
                                            if (scoreCardDetailsDTO.getScoreCardDetailsValue().containsKey("scorecardFormula")) {
                                                stringObjectMap.put("ScorecardPerformance", (String)scoreCardDetailsDTO.getScoreCardDetailsValue().get("scorecardFormula"));
                                            }
                                            if (scoreCardDTO.getScoreCardValue().containsKey("thresholdFormula")) {
                                                stringObjectMap.put("PerspectivePerformance", (String)scoreCardDTO.getScoreCardValue().get("thresholdFormula"));
                                            }
                                            if (objectivesDTO.getObjectivesValue().containsKey("thresholdFormula")) {
                                                stringObjectMap.put("ObjectivePerformance", (String)objectivesDTO.getObjectivesValue().get("thresholdFormula"));
                                            }
                                            stringObjectMap.put("DeleteKPI", "0");
                                            stringObjectMap.put("DeleteObj", "0");
                                            stringObjectMap.put("DeleteSUBKPI", "0");
                                            mapList.add(stringObjectMap);
                                        }
                                        continue;
                                    }
                                    stringObjectMap = new HashMap();
                                    if (scoreCardDetailsDTO.getDepartmentId() != null && (deptDetails3 = this.departmentDetailsService.findById(scoreCardDetailsDTO.getDepartmentId())) != null && deptDetails3.getDeptID() != null) {
                                        stringObjectMap.put("DepartmentId", deptDetails3.getDeptID());
                                    }
                                    stringObjectMap.put("ScoreCardName", scoreCardDetailsDTO.getScorecardName());
                                    stringObjectMap.put("ScorecardDescription", (String)scoreCardDetailsDTO.getScoreCardDetailsValue().get("description"));
                                    stringObjectMap.put("PerspectiveID", scoreCardDTO.getPerspectiveId());
                                    stringObjectMap.put("PerspectiveName", (String)scoreCardDTO.getScoreCardValue().get("name"));
                                    stringObjectMap.put("PerspectiveType", scoreCardDTO.getPerspectiveType());
                                    stringObjectMap.put("PerspectiveDescription", (String)scoreCardDTO.getScoreCardValue().get("description"));
                                    stringObjectMap.put("PerspectiveWeight", (String)scoreCardDTO.getScoreCardValue().get("weight"));
                                    stringObjectMap.put("ObJectiveID", objectivesDTO.getObjectiveId());
                                    stringObjectMap.put("ObjectiveName", objectivesDTO.getObjectivesName());
                                    stringObjectMap.put("ObjectiveDescription", (String)objectivesDTO.getObjectivesValue().get("description"));
                                    stringObjectMap.put("ObjectiveWeight", (String)objectivesDTO.getObjectivesValue().get("weight"));
                                    stringObjectMap.put("KPIID", kpidto.getKpiId());
                                    stringObjectMap.put("KPINAME", kpidto.getKpiName());
                                    stringObjectMap.put("KPIDescription", (String)kpidto.getKpiValue().get("description"));
                                    stringObjectMap.put("KPIWeight", (String)kpidto.getKpiValue().get("weight"));
                                    stringObjectMap.put("Owner", (String)kpidto.getKpiValue().get("ownerName"));
                                    stringObjectMap.put("MeasurementFrequency", (String)kpidto.getKpiValue().get("kpi_measurement"));
                                    stringObjectMap.put("KPIFormula", kpidto.getKpiFormula().getFormula());
                                    if (kpidto.getKpiValue().containsKey("header1")) {
                                        stringObjectMap.put("ActualField", "TRUE");
                                    } else {
                                        stringObjectMap.put("ActualField", "FALSE");
                                    }
                                    if (kpidto.getKpiValue().containsKey("header2")) {
                                        stringObjectMap.put("BudgetField", "TRUE");
                                    } else {
                                        stringObjectMap.put("BudgetField", "FALSE");
                                    }
                                    if (kpidto.getKpiValue().containsKey("header3")) {
                                        stringObjectMap.put("TargetField", "TRUE");
                                    } else {
                                        stringObjectMap.put("TargetField", "FALSE");
                                    }
                                    if (kpidto.getKpiValue().containsKey("header4")) {
                                        stringObjectMap.put("ForecastField", "TRUE");
                                    } else {
                                        stringObjectMap.put("ForecastField", "FALSE");
                                    }
                                    stringObjectMap.put("DataSource", (String)kpidto.getKpiValue().get("kpi_datasource"));
                                    stringObjectMap.put("Red", (String)kpidto.getKpiValue().get("option2color1"));
                                    stringObjectMap.put("Amber", (String)kpidto.getKpiValue().get("option2color2"));
                                    stringObjectMap.put("Green", (String)kpidto.getKpiValue().get("option2color3"));
                                    stringObjectMap.put("Status", (String)kpidto.getKpiValue().get("status"));
                                    stringObjectMap.put("DataType", (String)kpidto.getKpiValue().get("dataType"));
                                    stringObjectMap.put("Currency", (String)kpidto.getKpiValue().get("kpiCurrency"));
                                    stringObjectMap.put("CustomThreshold", (String)kpidto.getKpiValue().get("thresholdFormula"));
                                    stringObjectMap.put("YTDFormula", (String)kpidto.getKpiValue().get("ytdFormula"));
                                    stringObjectMap.put("KPIType", (String)kpidto.getKpiValue().get("kpiType"));
                                    stringObjectMap.put("Start/EndDate", (String)kpidto.getKpiValue().get("kpi_start_end_date"));
                                    if (scoreCardDetailsDTO.getScoreCardDetailsValue().containsKey("scorecardFormula")) {
                                        stringObjectMap.put("ScorecardPerformance", (String)scoreCardDetailsDTO.getScoreCardDetailsValue().get("scorecardFormula"));
                                    }
                                    if (scoreCardDTO.getScoreCardValue().containsKey("thresholdFormula")) {
                                        stringObjectMap.put("PerspectivePerformance", (String)scoreCardDTO.getScoreCardValue().get("thresholdFormula"));
                                    }
                                    if (objectivesDTO.getObjectivesValue().containsKey("thresholdFormula")) {
                                        stringObjectMap.put("ObjectivePerformance", (String)objectivesDTO.getObjectivesValue().get("thresholdFormula"));
                                    }
                                    stringObjectMap.put("DeleteKPI", "0");
                                    stringObjectMap.put("DeleteObj", "0");
                                    stringObjectMap.put("DeleteSUBKPI", "0");
                                    mapList.add(stringObjectMap);
                                }
                                continue;
                            }
                            stringObjectMap = new HashMap();
                            if (scoreCardDetailsDTO.getDepartmentId() != null && (deptDetails2 = this.departmentDetailsService.findById(scoreCardDetailsDTO.getDepartmentId())) != null && deptDetails2.getDeptID() != null) {
                                stringObjectMap.put("DepartmentId", deptDetails2.getDeptID());
                            }
                            stringObjectMap.put("ScoreCardName", scoreCardDetailsDTO.getScorecardName());
                            stringObjectMap.put("DeleteKPI", "0");
                            stringObjectMap.put("DeleteObj", "0");
                            stringObjectMap.put("DeleteSUBKPI", "0");
                            stringObjectMap.put("ScorecardDescription", (String)scoreCardDetailsDTO.getScoreCardDetailsValue().get("description"));
                            stringObjectMap.put("PerspectiveID", scoreCardDTO.getPerspectiveId());
                            stringObjectMap.put("PerspectiveName", (String)scoreCardDTO.getScoreCardValue().get("name"));
                            stringObjectMap.put("PerspectiveType", scoreCardDTO.getPerspectiveType());
                            stringObjectMap.put("PerspectiveDescription", scoreCardDTO.getPerspectiveType());
                            stringObjectMap.put("PerspectiveWeight", (String)scoreCardDTO.getScoreCardValue().get("weight"));
                            stringObjectMap.put("ObJectiveID", objectivesDTO.getObjectiveId());
                            stringObjectMap.put("ObjectiveName", objectivesDTO.getObjectivesName());
                            stringObjectMap.put("ObjectiveDescription", (String)objectivesDTO.getObjectivesValue().get("description"));
                            stringObjectMap.put("ObjectiveWeight", (String)objectivesDTO.getObjectivesValue().get("weight"));
                            stringObjectMap.put("Owner", (String)objectivesDTO.getObjectivesValue().get("ownerName"));
                            stringObjectMap.put("Status", (String)objectivesDTO.getObjectivesValue().get("status"));
                            stringObjectMap.put("Start/EndDate", (String)objectivesDTO.getObjectivesValue().get("objective_start_end_date"));
                            if (scoreCardDetailsDTO.getScoreCardDetailsValue().containsKey("scorecardFormula")) {
                                stringObjectMap.put("ScorecardPerformance", (String)scoreCardDetailsDTO.getScoreCardDetailsValue().get("scorecardFormula"));
                            }
                            if (scoreCardDTO.getScoreCardValue().containsKey("thresholdFormula")) {
                                stringObjectMap.put("PerspectivePerformance", (String)scoreCardDTO.getScoreCardValue().get("thresholdFormula"));
                            }
                            if (objectivesDTO.getObjectivesValue().containsKey("thresholdFormula")) {
                                stringObjectMap.put("ObjectivePerformance", (String)objectivesDTO.getObjectivesValue().get("thresholdFormula"));
                            }
                            mapList.add(stringObjectMap);
                        }
                        continue;
                    }
                    stringObjectMap = new HashMap();
                    if (scoreCardDetailsDTO.getDepartmentId() != null && (deptDetails = this.departmentDetailsService.findById(scoreCardDetailsDTO.getDepartmentId())) != null && deptDetails.getDeptID() != null) {
                        stringObjectMap.put("DepartmentId", deptDetails.getDeptID());
                    }
                    stringObjectMap.put("ScoreCardName", scoreCardDetailsDTO.getScorecardName());
                    stringObjectMap.put("ScorecardDescription", (String)scoreCardDetailsDTO.getScoreCardDetailsValue().get("description"));
                    stringObjectMap.put("PerspectiveID", scoreCardDTO.getPerspectiveId());
                    stringObjectMap.put("PerspectiveName", (String)scoreCardDTO.getScoreCardValue().get("name"));
                    stringObjectMap.put("PerspectiveType", scoreCardDTO.getPerspectiveType());
                    stringObjectMap.put("PerspectiveDescription", scoreCardDTO.getPerspectiveType());
                    stringObjectMap.put("PerspectiveWeight", (String)scoreCardDTO.getScoreCardValue().get("weight"));
                    stringObjectMap.put("Owner", (String)scoreCardDTO.getScoreCardValue().get("ownerName"));
                    stringObjectMap.put("Status", (String)scoreCardDTO.getScoreCardValue().get("status"));
                    stringObjectMap.put("Start/EndDate", (String)scoreCardDTO.getScoreCardValue().get("perspective_start_end_date"));
                    if (scoreCardDetailsDTO.getScoreCardDetailsValue().containsKey("scorecardFormula")) {
                        stringObjectMap.put("ScorecardPerformance", (String)scoreCardDetailsDTO.getScoreCardDetailsValue().get("scorecardFormula"));
                    }
                    if (scoreCardDTO.getScoreCardValue().containsKey("thresholdFormula")) {
                        stringObjectMap.put("PerspectivePerformance", (String)scoreCardDTO.getScoreCardValue().get("thresholdFormula"));
                    }
                    stringObjectMap.put("DeleteKPI", "0");
                    stringObjectMap.put("DeleteObj", "0");
                    stringObjectMap.put("DeleteSUBKPI", "0");
                    mapList.add(stringObjectMap);
                }
            }
            if (mapList != null && CollectionUtils.isNotEmpty(mapList)) {
                COLUMNs = new String[]{"Department ID", "ScoreCardName", "Scorecard Description", "Perspective ID", "Perspective Name", "Perspective Description", "Perspective Weight", "Perspective Type", "ObJective ID", "Objective Name", "Objective Description", "Objective Weight", "KPI ID", "KPI  NAME", "KPI Description", "KPI Weight", "KPI contribution", "Owner", "Measurement Frequency", "KPI Formula", "Actual Field", "Target Field", "Budget Field", "Forecast Field", "Data Source", "Status", "Red", "Amber", "Green", "DataType", "Currency", "KPI Performance", "YTD", "KPIType", "SubKPI ID", "SubKPI  NAME", "SubKPI Description", "SubKPI Weight", "SubKPI contribution", "SubMeasurement Frequency", "SubKPI Formula", "SubDataType", "Sub Currency", "SubKPI Performance", "SubKPIType", "Start/End Date", "Objective Performance", "Perspective Performance", "Scorecard Performance", "DeleteSubkpi", "DeleteKPI", "DeleteObj"};
                workbook = new XSSFWorkbook();
                createHelper = workbook.getCreationHelper();
                sheetname = "ScorecardExportName";
                if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                    sheetname = UserThreadLocal.get().getProfile().getFirstName();
                }
                sheet = workbook.createSheet(sheetname);
                headerFont = workbook.createFont();
                headerFont.setBold(true);
                headerFont.setColor(IndexedColors.BLUE.getIndex());
                headerCellStyle = workbook.createCellStyle();
                headerCellStyle.setFont(headerFont);
                headerRow = sheet.createRow(0);
                for (int col = 0; col < COLUMNs.length; ++col) {
                    cell = headerRow.createCell(col);
                    cell.setCellValue(COLUMNs[col]);
                    cell.setCellStyle(headerCellStyle);
                }
                int rowIdx = 1;
                for (Object _obj_map : mapList) {
                    Map map = (Map) _obj_map;
                    if (map == null || map == null) continue;
                    Row row = sheet.createRow(rowIdx++);
                    if (map.containsKey("DepartmentId")) {
                        if (map.get("DepartmentId") != null) {
                            row.createCell(0).setCellValue(map.get("DepartmentId").toString());
                        } else {
                            row.createCell(0).setCellValue("");
                        }
                    } else {
                        row.createCell(0).setCellValue("");
                    }
                    if (map.containsKey("ScoreCardName")) {
                        row.createCell(1).setCellValue(map.get("ScoreCardName").toString());
                    } else {
                        row.createCell(1).setCellValue("");
                    }
                    if (map.containsKey("ScorecardDescription")) {
                        if (map.get("ScorecardDescription") != null) {
                            row.createCell(2).setCellValue(map.get("ScorecardDescription").toString());
                        } else {
                            row.createCell(2).setCellValue("");
                        }
                    } else {
                        row.createCell(2).setCellValue("");
                    }
                    if (map.containsKey("PerspectiveID")) {
                        if (map.get("PerspectiveID") != null) {
                            row.createCell(3).setCellValue(map.get("PerspectiveID").toString());
                        } else {
                            row.createCell(3).setCellValue("");
                        }
                    } else {
                        row.createCell(3).setCellValue("");
                    }
                    if (map.containsKey("PerspectiveName")) {
                        if (map.get("PerspectiveName") != null) {
                            row.createCell(4).setCellValue(map.get("PerspectiveName").toString());
                        } else {
                            row.createCell(4).setCellValue("");
                        }
                    } else {
                        row.createCell(4).setCellValue("");
                    }
                    if (map.containsKey("PerspectiveDescription")) {
                        if (map.get("PerspectiveDescription") != null) {
                            row.createCell(5).setCellValue(map.get("PerspectiveDescription").toString());
                        } else {
                            row.createCell(5).setCellValue("");
                        }
                    } else {
                        row.createCell(5).setCellValue("");
                    }
                    if (map.containsKey("PerspectiveWeight")) {
                        if (map.get("PerspectiveWeight") != null) {
                            row.createCell(6).setCellValue(map.get("PerspectiveWeight").toString());
                        } else {
                            row.createCell(6).setCellValue("");
                        }
                    } else {
                        row.createCell(6).setCellValue("");
                    }
                    if (map.containsKey("PerspectiveType")) {
                        if (map.get("PerspectiveType") != null) {
                            row.createCell(7).setCellValue(map.get("PerspectiveType").toString());
                        } else {
                            row.createCell(7).setCellValue("");
                        }
                    } else {
                        row.createCell(7).setCellValue("");
                    }
                    if (map.containsKey("ObJectiveID")) {
                        if (map.get("ObJectiveID") != null) {
                            row.createCell(8).setCellValue(map.get("ObJectiveID").toString());
                        } else {
                            row.createCell(8).setCellValue("");
                        }
                    } else {
                        row.createCell(8).setCellValue("");
                    }
                    if (map.containsKey("ObjectiveName")) {
                        if (map.get("ObjectiveName") != null) {
                            row.createCell(9).setCellValue(map.get("ObjectiveName").toString());
                        } else {
                            row.createCell(9).setCellValue("");
                        }
                    } else {
                        row.createCell(9).setCellValue("");
                    }
                    if (map.containsKey("ObjectiveDescription")) {
                        if (map.get("ObjectiveDescription") != null) {
                            row.createCell(10).setCellValue(map.get("ObjectiveDescription").toString());
                        } else {
                            row.createCell(10).setCellValue("");
                        }
                    } else {
                        row.createCell(10).setCellValue("");
                    }
                    if (map.containsKey("ObjectiveWeight")) {
                        if (map.get("ObjectiveWeight") != null) {
                            row.createCell(11).setCellValue(map.get("ObjectiveWeight").toString());
                        } else {
                            row.createCell(11).setCellValue("");
                        }
                    } else {
                        row.createCell(11).setCellValue("");
                    }
                    if (map.containsKey("KPIID")) {
                        if (map.get("KPIID") != null) {
                            row.createCell(12).setCellValue(map.get("KPIID").toString());
                        } else {
                            row.createCell(12).setCellValue("");
                        }
                    } else {
                        row.createCell(12).setCellValue("");
                    }
                    if (map.containsKey("KPINAME")) {
                        if (map.get("KPINAME") != null) {
                            row.createCell(13).setCellValue(map.get("KPINAME").toString());
                        } else {
                            row.createCell(13).setCellValue("");
                        }
                    } else {
                        row.createCell(13).setCellValue("");
                    }
                    if (map.containsKey("KPIDescription")) {
                        if (map.get("KPIDescription") != null) {
                            row.createCell(14).setCellValue(map.get("KPIDescription").toString());
                        } else {
                            row.createCell(14).setCellValue("");
                        }
                    } else {
                        row.createCell(14).setCellValue("");
                    }
                    if (map.containsKey("KPIWeight")) {
                        if (map.get("KPIWeight") != null) {
                            row.createCell(15).setCellValue(map.get("KPIWeight").toString());
                        } else {
                            row.createCell(15).setCellValue("");
                        }
                    } else {
                        row.createCell(15).setCellValue("");
                    }
                    if (map.containsKey("KPIContribution")) {
                        if (map.get("KPIContribution") != null) {
                            row.createCell(16).setCellValue(map.get("KPIContribution").toString());
                        } else {
                            row.createCell(16).setCellValue("");
                        }
                    } else {
                        row.createCell(16).setCellValue("");
                    }
                    if (map.containsKey("Owner")) {
                        if (map.get("Owner") != null) {
                            row.createCell(17).setCellValue(map.get("Owner").toString());
                        } else {
                            row.createCell(17).setCellValue("");
                        }
                    } else {
                        row.createCell(17).setCellValue("");
                    }
                    if (map.containsKey("MeasurementFrequency")) {
                        if (map.get("MeasurementFrequency") != null) {
                            row.createCell(18).setCellValue(map.get("MeasurementFrequency").toString());
                        } else {
                            row.createCell(18).setCellValue("");
                        }
                    } else {
                        row.createCell(18).setCellValue("");
                    }
                    if (map.containsKey("KPIFormula")) {
                        if (map.get("KPIFormula") != null) {
                            row.createCell(19).setCellValue(map.get("KPIFormula").toString());
                        } else {
                            row.createCell(19).setCellValue("");
                        }
                    } else {
                        row.createCell(19).setCellValue("");
                    }
                    if (map.containsKey("ActualField")) {
                        if (map.get("ActualField") != null) {
                            row.createCell(20).setCellValue(map.get("ActualField").toString());
                        } else {
                            row.createCell(20).setCellValue("");
                        }
                    } else {
                        row.createCell(20).setCellValue("");
                    }
                    if (map.containsKey("TargetField")) {
                        if (map.get("TargetField") != null) {
                            row.createCell(21).setCellValue(map.get("TargetField").toString());
                        } else {
                            row.createCell(21).setCellValue("");
                        }
                    } else {
                        row.createCell(21).setCellValue("");
                    }
                    if (map.containsKey("BudgetField")) {
                        if (map.get("BudgetField") != null) {
                            row.createCell(22).setCellValue(map.get("BudgetField").toString());
                        } else {
                            row.createCell(22).setCellValue("");
                        }
                    } else {
                        row.createCell(22).setCellValue("");
                    }
                    if (map.containsKey("ForecastField")) {
                        if (map.get("ForecastField") != null) {
                            row.createCell(23).setCellValue(map.get("ForecastField").toString());
                        } else {
                            row.createCell(23).setCellValue("");
                        }
                    } else {
                        row.createCell(23).setCellValue("");
                    }
                    if (map.containsKey("DataSource")) {
                        row.createCell(24).setCellValue(map.get("DataSource").toString());
                    } else {
                        row.createCell(24).setCellValue("");
                    }
                    if (map.containsKey("Status")) {
                        if (map.get("Status") != null) {
                            row.createCell(25).setCellValue(map.get("Status").toString());
                        } else {
                            row.createCell(25).setCellValue("");
                        }
                    } else {
                        row.createCell(25).setCellValue("");
                    }
                    if (map.containsKey("Red")) {
                        if (map.get("Red") != null) {
                            row.createCell(26).setCellValue(map.get("Red").toString());
                        } else {
                            row.createCell(26).setCellValue("");
                        }
                    } else {
                        row.createCell(26).setCellValue("");
                    }
                    if (map.containsKey("Amber")) {
                        if (map.get("Amber") != null) {
                            row.createCell(27).setCellValue(map.get("Amber").toString());
                        } else {
                            row.createCell(27).setCellValue("");
                        }
                    } else {
                        row.createCell(27).setCellValue("");
                    }
                    if (map.containsKey("Green")) {
                        if (map.get("Green") != null) {
                            row.createCell(28).setCellValue(map.get("Green").toString());
                        } else {
                            row.createCell(28).setCellValue("");
                        }
                    } else {
                        row.createCell(28).setCellValue("");
                    }
                    if (map.containsKey("DataType")) {
                        if (map.get("DataType") != null) {
                            row.createCell(29).setCellValue(map.get("DataType").toString());
                        } else {
                            row.createCell(29).setCellValue("");
                        }
                    } else {
                        row.createCell(29).setCellValue("");
                    }
                    if (map.containsKey("Currency")) {
                        if (map.get("Currency") != null) {
                            row.createCell(30).setCellValue(map.get("Currency").toString());
                        } else {
                            row.createCell(30).setCellValue("");
                        }
                    } else {
                        row.createCell(30).setCellValue("");
                    }
                    if (map.containsKey("CustomThreshold")) {
                        if (map.get("CustomThreshold") != null) {
                            row.createCell(31).setCellValue(map.get("CustomThreshold").toString());
                        } else {
                            row.createCell(31).setCellValue("");
                        }
                    } else {
                        row.createCell(31).setCellValue("");
                    }
                    if (map.containsKey("YTDFormula")) {
                        if (map.get("YTDFormula") != null) {
                            row.createCell(32).setCellValue(map.get("YTDFormula").toString());
                        } else {
                            row.createCell(32).setCellValue("");
                        }
                    } else {
                        row.createCell(32).setCellValue("");
                    }
                    if (map.containsKey("KPIType")) {
                        if (map.get("KPIType") != null) {
                            row.createCell(33).setCellValue(map.get("KPIType").toString());
                        } else {
                            row.createCell(33).setCellValue("");
                        }
                    } else {
                        row.createCell(33).setCellValue("");
                    }
                    if (map.containsKey("SUBKPIID")) {
                        if (map.get("SUBKPIID") != null) {
                            row.createCell(34).setCellValue(map.get("SUBKPIID").toString());
                        } else {
                            row.createCell(34).setCellValue("");
                        }
                    } else {
                        row.createCell(34).setCellValue("");
                    }
                    if (map.containsKey("SUBKPINAME")) {
                        if (map.get("SUBKPINAME") != null) {
                            row.createCell(35).setCellValue(map.get("SUBKPINAME").toString());
                        } else {
                            row.createCell(35).setCellValue("");
                        }
                    } else {
                        row.createCell(35).setCellValue("");
                    }
                    if (map.containsKey("SubKPIDescription")) {
                        if (map.get("SubKPIDescription") != null) {
                            row.createCell(36).setCellValue(map.get("SubKPIDescription").toString());
                        } else {
                            row.createCell(36).setCellValue("");
                        }
                    } else {
                        row.createCell(36).setCellValue("");
                    }
                    if (map.containsKey("SubKPIWeight")) {
                        if (map.get("SubKPIWeight") != null) {
                            row.createCell(37).setCellValue(map.get("SubKPIWeight").toString());
                        } else {
                            row.createCell(37).setCellValue("");
                        }
                    } else {
                        row.createCell(37).setCellValue("");
                    }
                    if (map.containsKey("SubKPIContribution")) {
                        if (map.get("SubKPIContribution") != null) {
                            row.createCell(38).setCellValue(map.get("SubKPIContribution").toString());
                        } else {
                            row.createCell(38).setCellValue("");
                        }
                    } else {
                        row.createCell(38).setCellValue("");
                    }
                    if (map.containsKey("SubMeasurementFrequency")) {
                        if (map.get("SubMeasurementFrequency") != null) {
                            row.createCell(39).setCellValue(map.get("SubMeasurementFrequency").toString());
                        } else {
                            row.createCell(39).setCellValue("");
                        }
                    } else {
                        row.createCell(39).setCellValue("");
                    }
                    if (map.containsKey("SubKPIFormula")) {
                        if (map.get("SubKPIFormula") != null) {
                            row.createCell(40).setCellValue(map.get("SubKPIFormula").toString());
                        } else {
                            row.createCell(40).setCellValue("");
                        }
                    } else {
                        row.createCell(40).setCellValue("");
                    }
                    if (map.containsKey("SubDataType")) {
                        if (map.get("SubDataType") != null) {
                            row.createCell(41).setCellValue(map.get("SubDataType").toString());
                        } else {
                            row.createCell(41).setCellValue("");
                        }
                    } else {
                        row.createCell(41).setCellValue("");
                    }
                    if (map.containsKey("SubCurrency")) {
                        if (map.get("SubCurrency") != null) {
                            row.createCell(42).setCellValue(map.get("SubCurrency").toString());
                        } else {
                            row.createCell(42).setCellValue("");
                        }
                    } else {
                        row.createCell(42).setCellValue("");
                    }
                    if (map.containsKey("SubCustomThreshold")) {
                        if (map.get("SubCustomThreshold") != null) {
                            row.createCell(43).setCellValue(map.get("SubCustomThreshold").toString());
                        } else {
                            row.createCell(43).setCellValue("");
                        }
                    } else {
                        row.createCell(43).setCellValue("");
                    }
                    if (map.containsKey("SubKPIType")) {
                        if (map.get("SubKPIType") != null) {
                            row.createCell(44).setCellValue(map.get("SubKPIType").toString());
                        } else {
                            row.createCell(44).setCellValue("");
                        }
                    } else {
                        row.createCell(44).setCellValue("");
                    }
                    if (map.containsKey("Start/EndDate")) {
                        if (map.get("Start/EndDate") != null) {
                            row.createCell(45).setCellValue(map.get("Start/EndDate").toString());
                        } else {
                            row.createCell(45).setCellValue("");
                        }
                    } else {
                        row.createCell(45).setCellValue("");
                    }
                    if (map.containsKey("ObjectivePerformance")) {
                        if (map.get("ObjectivePerformance") != null) {
                            row.createCell(46).setCellValue(map.get("ObjectivePerformance").toString());
                        } else {
                            row.createCell(46).setCellValue("");
                        }
                    } else {
                        row.createCell(46).setCellValue("");
                    }
                    if (map.containsKey("PerspectivePerformance")) {
                        if (map.get("PerspectivePerformance") != null) {
                            row.createCell(47).setCellValue(map.get("PerspectivePerformance").toString());
                        } else {
                            row.createCell(47).setCellValue("");
                        }
                    } else {
                        row.createCell(47).setCellValue("");
                    }
                    if (map.containsKey("ScorecardPerformance")) {
                        if (map.get("ScorecardPerformance") != null) {
                            row.createCell(48).setCellValue(map.get("ScorecardPerformance").toString());
                        } else {
                            row.createCell(48).setCellValue("");
                        }
                    } else {
                        row.createCell(48).setCellValue("");
                    }
                    if (map.containsKey("DeleteSUBKPI")) {
                        if (map.get("DeleteSUBKPI") != null) {
                            row.createCell(49).setCellValue(map.get("DeleteSUBKPI").toString());
                        } else {
                            row.createCell(49).setCellValue("");
                        }
                    } else {
                        row.createCell(49).setCellValue("");
                    }
                    if (map.containsKey("DeleteKPI")) {
                        if (map.get("DeleteKPI") != null) {
                            row.createCell(50).setCellValue(map.get("DeleteKPI").toString());
                        } else {
                            row.createCell(50).setCellValue("");
                        }
                    } else {
                        row.createCell(50).setCellValue("");
                    }
                    if (map.containsKey("DeleteObj")) {
                        if (map.get("DeleteObj") != null) {
                            row.createCell(51).setCellValue(map.get("DeleteObj").toString());
                        } else {
                            row.createCell(51).setCellValue("");
                        }
                    } else {
                        row.createCell(51).setCellValue("");
                    }
                    Cell cell2 = row.createCell(52);
                }
                header.setContentType(new MediaType("application", "force-download"));
                header.set("Content-Disposition", "attachment; filename=" + scoreCardDTOList.getScoreCardName() + ".xlsx");
                workbook.write((OutputStream)stream);
                workbook.close();
                this.auditTrailService.save("Excel " + scoreCardDTOList.getScoreCardName() + "Downloaded");
                return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
            }
            COLUMNs = new String[]{"Department ID", "ScoreCardName", "Scorecard Description", "Perspective ID", "Perspective Name", "Perspective Description", "Perspective Weight", "Perspective Type", "ObJective ID", "Objective Name", "Objective Description", "Objective Weight", "KPI ID", "KPI  NAME", "KPI Description", "KPI Weight", "Owner", "Measurement Frequency", "KPI Formula", "Actual Field", "Target Field", "Budget Field", "Forecast Field", "Data Source", "Status", "Red", "Amber", "Green", "DataType", "Currency", "KPI Performance", "YTD", "KPIType", "Start/End Date", "Objective Performance", "Perspective Performance", "Scorecard Performance", "DeleteKPI", "DeleteObj"};
            workbook = new XSSFWorkbook();
            createHelper = workbook.getCreationHelper();
            sheetname = "ScorecardExportName";
            if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                sheetname = UserThreadLocal.get().getProfile().getFirstName();
            }
            sheet = workbook.createSheet(sheetname);
            headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLUE.getIndex());
            headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; ++col) {
                cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }
            header.setContentType(new MediaType("application", "force-download"));
            header.set("Content-Disposition", "attachment; filename=" + scoreCardDTOList.getScoreCardName() + ".xlsx");
            workbook.write((OutputStream)stream);
            workbook.close();
            this.auditTrailService.save("Excel " + scoreCardDTOList.getScoreCardName() + "Downloaded");
            return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

