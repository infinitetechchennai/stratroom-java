/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.ObjectivesDTO
 *  com.estrat.web.dto.RiskEventDTO
 *  com.estrat.web.dto.ScoreCardDTO
 *  com.estrat.web.dto.ScoreCardDetailsDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.RiskDetailsService
 *  com.estrat.web.util.RepositoryServices
 *  com.estrat.web.util.RiskEventReaderUtil
 *  com.estrat.web.util.RiskEventReaderUtil$1
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.commons.collections4.CollectionUtils
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

import com.estrat.web.dto.ControlPanelGeneralDTO;
import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.ObjectivesDTO;
import com.estrat.web.dto.RiskEventDTO;
import com.estrat.web.dto.ScoreCardDTO;
import com.estrat.web.dto.ScoreCardDetailsDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.RiskDetailsService;
import com.estrat.web.util.RepositoryServices;
import com.estrat.web.util.RiskEventReaderUtil;
import com.estrat.web.util.UserThreadLocal;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class RiskEventReaderUtil {
    private Logger logger = LoggerFactory.getLogger(RiskEventReaderUtil.class);
    @Autowired
    protected RepositoryServices repositoryServices;
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected AuditTrailService auditTrailService;
    @Autowired
    protected RiskDetailsService riskDetailService;

    public Map readBulkRiskEventDetails(InputStream inputStream, String type, Long pageId) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            if (type.equals("validation")) {
                resultMap = this.checkValidationForExcelSheet(myExcelBook, pageId);
            } else {
                resultMap = this.saveBulkRiskEvent(myExcelBook, pageId);
                this.auditTrailService.save("Excel - RiskEvent Upload");
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
    public Map checkValidationForExcelSheet(XSSFWorkbook myExcelBook, Long pageId) throws IOException {
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
                if (row1.getCell(1).getStringCellValue().trim().equals("RiskCode") || row1.getCell(1).getStringCellValue().trim().equals("Risk Code")) {
                    int totalRows = ExcelSheet.getPhysicalNumberOfRows();
                    if (totalRows == 1) {
                        stringMap = new HashMap();
                        stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                        stringMap.put("error", "Risk Event Import Sheet is empty");
                        stringMap.put("rowNo", "");
                        stringMap.put("cellName", "");
                        mapList.add(stringMap);
                        continue;
                    }
                    for (int i = 1; i < totalRows; ++i) {
                        XSSFRow row = ExcelSheet.getRow(i);
                        stringMap = new HashMap();
                        if (RiskEventReaderUtil.isRowEmpty((XSSFRow)row)) {
                            this.logger.debug("Row is empty");
                            continue;
                        }
                        try {
                            this.logger.debug(("row no : " + row.getCTRow().getR()));
                            ControlPanelGeneralDTO cpanel = this.controlPanelGeneralService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                            if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                                String inputStr = row.getCell(1).getStringCellValue().trim();
                                Pattern pattern = Pattern.compile(new String("^[ a-zA-Z0-9&_\\-.]+$"));
                                Matcher matcher = pattern.matcher(inputStr);
                                if (matcher.matches()) {
                                    this.logger.info("validate Risk Code");
                                } else {
                                    stringMap = this.getWriteDocForRiskEvent(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Risk Code is invalid please check and remove special character");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("cellName", "Risk Code");
                                    mapList.add(stringMap);
                                }
                                this.logger.info("validate Risk Code");
                                continue;
                            }
                            stringMap = this.getWriteDocForRiskEvent(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("error", "Risk Code is empty");
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("cellName", "Risk Code");
                            mapList.add(stringMap);
                            continue;
                        }
                        catch (Exception e) {
                            stringMap = this.getWriteDocForRiskEvent(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("error", e.getMessage());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            mapList.add(stringMap);
                        }
                    }
                    continue;
                }
                stringMap = new HashMap();
                stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                stringMap.put("error", "This sheet is not a Risk Event sheet");
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

    private Optional<Long> getLongFromCell(Cell cell) {
        if (cell != null) {
            switch (cell.getCellType()) {
                case NUMERIC: {
                    return Optional.of((long)cell.getNumericCellValue());
                }
                case STRING: {
                    try {
                        return Optional.of(Long.parseLong(cell.getStringCellValue().trim()));
                    }
                    catch (NumberFormatException e) {
                        this.logger.error(("Number format exception for cell value: " + cell.getStringCellValue()), (Throwable)e);
                        break;
                    }
                }
                default: {
                    this.logger.warn(("Unsupported cell type: " + cell.getCellType()));
                }
            }
        }
        return Optional.empty();
    }

    private String getStringFromCell(Cell cell) {
        if (cell != null) {
            switch (cell.getCellType()) {
                case STRING: {
                    return cell.getStringCellValue().trim();
                }
                case NUMERIC: {
                    return String.format("%.0f", cell.getNumericCellValue());
                }
                case FORMULA: {
                    return "";
                }
            }
            this.logger.warn(("Unsupported cell type for extracting string: " + cell.getCellType()));
            return "";
        }
        return "";
    }

    public Map saveBulkRiskEvent(XSSFWorkbook myExcelBook, Long pageId) throws IOException {
        int processedrows = 0;
        int failedrows = 0;
        HashMap stringMap = null;
        HashMap resultMap = new HashMap();
        try {
            ControlPanelGeneralDTO cpanel = this.controlPanelGeneralService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
            for (int sheetIndex = 0; sheetIndex < myExcelBook.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet ExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                if (ExcelSheet == null) {
                    this.logger.debug("Sheet not found");
                    continue;
                }
                int totalRows = ExcelSheet.getPhysicalNumberOfRows();
                ArrayList<RiskEventDTO> riskEventDtoList = new ArrayList<RiskEventDTO>();
                for (int i = 1; i < totalRows; ++i) {
                    RiskEventDTO riskEvent = new RiskEventDTO();
                    XSSFRow row = ExcelSheet.getRow(i);
                    stringMap = new HashMap();
                    if (RiskEventReaderUtil.isRowEmpty((XSSFRow)row)) {
                        this.logger.debug("Row is empty");
                        continue;
                    }
                    try {
                        Optional optionalId;
                        this.logger.debug(("row no : " + row.getCTRow().getR()));
                        if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK && (optionalId = this.getLongFromCell((Cell)row.getCell(0))).isPresent() && (Long)optionalId.get() > 0L) {
                            riskEvent.setId((Long)optionalId.get());
                        }
                        riskEvent.setPageId(pageId);
                        if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                            ++failedrows;
                            continue;
                        }
                        riskEvent.setRiskCode(this.getStringFromCell((Cell)row.getCell(1)));
                        if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                            riskEvent.setIncident(this.getStringFromCell((Cell)row.getCell(2)));
                        }
                        if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                            riskEvent.setIncidentDate(this.getStringFromCell((Cell)row.getCell(3)));
                        }
                        if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                            riskEvent.setEventType(this.getStringFromCell((Cell)row.getCell(4)));
                        }
                        if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                            riskEvent.setIncidentCategory(this.getStringFromCell((Cell)row.getCell(5)));
                        }
                        if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                            riskEvent.setIncidentDescription(this.getStringFromCell((Cell)row.getCell(6)));
                        }
                        if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                            riskEvent.setImpactCategory(this.getStringFromCell((Cell)row.getCell(7)));
                        }
                        if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                            riskEvent.setImpactDescription(this.getStringFromCell((Cell)row.getCell(8)));
                        }
                        if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                            riskEvent.setImpactLevel(this.getStringFromCell((Cell)row.getCell(9)));
                        }
                        if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK) {
                            riskEvent.setCorrectiveAction(this.getStringFromCell((Cell)row.getCell(10)));
                        }
                        if (row.getCell(11) != null && row.getCell(11).getCellType() != CellType.BLANK) {
                            riskEvent.setRiskMitigation(this.getStringFromCell((Cell)row.getCell(11)));
                        }
                        if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                            riskEvent.setEventStatus(this.getStringFromCell((Cell)row.getCell(12)));
                        }
                        Long deptId = null;
                        if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK) {
                            String deptUniqueId = this.getStringFromCell((Cell)row.getCell(13));
                            FindDTO findDTO = new FindDTO();
                            findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                            findDTO.setDeptUniqueId(deptUniqueId);
                            DeptDetails deptDetails = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                            if (Objects.nonNull(deptDetails) && deptDetails.getName() != null) {
                                deptId = deptDetails.getId();
                                riskEvent.setDepartmentId(deptId);
                            }
                        } else {
                            ++failedrows;
                            continue;
                        }
                        riskEventDtoList.add(riskEvent);
                    }
                    catch (Exception e) {
                        --i;
                        e.printStackTrace();
                    }
                    var statuscode = this.riskDetailService.riskeventadd(riskEvent).getStatusCode();
                    if (statuscode == null || !statuscode.isSameCodeAs(HttpStatus.OK)) continue;
                    ++processedrows;
                }
            }
            resultMap.put("result", "success");
            resultMap.put("no_of_failed", failedrows);
            resultMap.put("no_of_processed", processedrows);
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

    public String getValue(Map inMap, String key) {
        String value = Objects.nonNull(inMap) && Objects.nonNull(inMap.get(key)) ? inMap.get(key).toString() : "";
        return value;
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

    public Map getWriteDocForRiskEvent(XSSFRow row, DataFormatter df, FormulaEvaluator evaluator, String excelSheetName) {
        HashMap map = new HashMap();
        map.put("Excel_SheetName", excelSheetName);
        evaluator.evaluateAll();
        try {
            for (int cellIndex = 0; cellIndex < row.getPhysicalNumberOfCells(); ++cellIndex) {
                if (cellIndex == 0) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("RiskCode", row.getCell(0).getStringCellValue().trim());
                        continue;
                    }
                    map.put("RiskCode", "");
                    continue;
                }
                if (cellIndex == 2) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Incident", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Incident", "");
                    continue;
                }
                if (cellIndex != 3) continue;
                if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                    map.put("Type of Event", row.getCell(cellIndex).getStringCellValue().trim());
                    continue;
                }
                map.put("Type of Event", "");
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
                    status = progress != null && !progress.isEmpty() ? (RiskEventReaderUtil.isNumeric((String)progress) ? Boolean.valueOf(true) : Boolean.valueOf(false)) : Boolean.valueOf(true);
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
                    mapList.add(stringObjectMap);
                }
            }
            if (mapList != null && CollectionUtils.isNotEmpty(mapList)) {
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
                    Cell cell = headerRow.createCell(col);
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
                    if (map.containsKey("Owner")) {
                        if (map.get("Owner") != null) {
                            row.createCell(16).setCellValue(map.get("Owner").toString());
                        } else {
                            row.createCell(16).setCellValue("");
                        }
                    } else {
                        row.createCell(16).setCellValue("");
                    }
                    if (map.containsKey("MeasurementFrequency")) {
                        if (map.get("MeasurementFrequency") != null) {
                            row.createCell(17).setCellValue(map.get("MeasurementFrequency").toString());
                        } else {
                            row.createCell(17).setCellValue("");
                        }
                    } else {
                        row.createCell(17).setCellValue("");
                    }
                    if (map.containsKey("KPIFormula")) {
                        if (map.get("KPIFormula") != null) {
                            row.createCell(18).setCellValue(map.get("KPIFormula").toString());
                        } else {
                            row.createCell(18).setCellValue("");
                        }
                    } else {
                        row.createCell(18).setCellValue("");
                    }
                    if (map.containsKey("ActualField")) {
                        if (map.get("ActualField") != null) {
                            row.createCell(19).setCellValue(map.get("ActualField").toString());
                        } else {
                            row.createCell(19).setCellValue("");
                        }
                    } else {
                        row.createCell(19).setCellValue("");
                    }
                    if (map.containsKey("TargetField")) {
                        if (map.get("TargetField") != null) {
                            row.createCell(20).setCellValue(map.get("TargetField").toString());
                        } else {
                            row.createCell(20).setCellValue("");
                        }
                    } else {
                        row.createCell(20).setCellValue("");
                    }
                    if (map.containsKey("BudgetField")) {
                        if (map.get("BudgetField") != null) {
                            row.createCell(21).setCellValue(map.get("BudgetField").toString());
                        } else {
                            row.createCell(21).setCellValue("");
                        }
                    } else {
                        row.createCell(21).setCellValue("");
                    }
                    if (map.containsKey("ForecastField")) {
                        if (map.get("ForecastField") != null) {
                            row.createCell(22).setCellValue(map.get("ForecastField").toString());
                        } else {
                            row.createCell(22).setCellValue("");
                        }
                    } else {
                        row.createCell(22).setCellValue("");
                    }
                    if (map.containsKey("DataSource")) {
                        row.createCell(23).setCellValue(map.get("DataSource").toString());
                    } else {
                        row.createCell(23).setCellValue("");
                    }
                    if (map.containsKey("Status")) {
                        if (map.get("Status") != null) {
                            row.createCell(24).setCellValue(map.get("Status").toString());
                        } else {
                            row.createCell(24).setCellValue("");
                        }
                    } else {
                        row.createCell(24).setCellValue("");
                    }
                    if (map.containsKey("Red")) {
                        if (map.get("Red") != null) {
                            row.createCell(25).setCellValue(map.get("Red").toString());
                        } else {
                            row.createCell(25).setCellValue("");
                        }
                    } else {
                        row.createCell(25).setCellValue("");
                    }
                    if (map.containsKey("Amber")) {
                        if (map.get("Amber") != null) {
                            row.createCell(26).setCellValue(map.get("Amber").toString());
                        } else {
                            row.createCell(26).setCellValue("");
                        }
                    } else {
                        row.createCell(26).setCellValue("");
                    }
                    if (map.containsKey("Green")) {
                        if (map.get("Green") != null) {
                            row.createCell(27).setCellValue(map.get("Green").toString());
                        } else {
                            row.createCell(27).setCellValue("");
                        }
                    } else {
                        row.createCell(27).setCellValue("");
                    }
                    if (map.containsKey("DataType")) {
                        if (map.get("DataType") != null) {
                            row.createCell(28).setCellValue(map.get("DataType").toString());
                        } else {
                            row.createCell(28).setCellValue("");
                        }
                    } else {
                        row.createCell(28).setCellValue("");
                    }
                    if (map.containsKey("Currency")) {
                        if (map.get("Currency") != null) {
                            row.createCell(29).setCellValue(map.get("Currency").toString());
                        } else {
                            row.createCell(29).setCellValue("");
                        }
                    } else {
                        row.createCell(29).setCellValue("");
                    }
                    if (map.containsKey("CustomThreshold")) {
                        if (map.get("CustomThreshold") != null) {
                            row.createCell(30).setCellValue(map.get("CustomThreshold").toString());
                        } else {
                            row.createCell(30).setCellValue("");
                        }
                    } else {
                        row.createCell(30).setCellValue("");
                    }
                    if (map.containsKey("YTDFormula")) {
                        if (map.get("YTDFormula") != null) {
                            row.createCell(31).setCellValue(map.get("YTDFormula").toString());
                        } else {
                            row.createCell(31).setCellValue("");
                        }
                    } else {
                        row.createCell(31).setCellValue("");
                    }
                    if (map.containsKey("KPIType")) {
                        if (map.get("KPIType") != null) {
                            row.createCell(32).setCellValue(map.get("KPIType").toString());
                        } else {
                            row.createCell(32).setCellValue("");
                        }
                    } else {
                        row.createCell(32).setCellValue("");
                    }
                    if (map.containsKey("Start/EndDate")) {
                        if (map.get("Start/EndDate") != null) {
                            row.createCell(33).setCellValue(map.get("Start/EndDate").toString());
                        } else {
                            row.createCell(33).setCellValue("");
                        }
                    } else {
                        row.createCell(33).setCellValue("");
                    }
                    if (map.containsKey("ObjectivePerformance")) {
                        if (map.get("ObjectivePerformance") != null) {
                            row.createCell(34).setCellValue(map.get("ObjectivePerformance").toString());
                        } else {
                            row.createCell(34).setCellValue("");
                        }
                    } else {
                        row.createCell(34).setCellValue("");
                    }
                    if (map.containsKey("PerspectivePerformance")) {
                        if (map.get("PerspectivePerformance") != null) {
                            row.createCell(35).setCellValue(map.get("PerspectivePerformance").toString());
                        } else {
                            row.createCell(35).setCellValue("");
                        }
                    } else {
                        row.createCell(35).setCellValue("");
                    }
                    if (map.containsKey("ScorecardPerformance")) {
                        if (map.get("ScorecardPerformance") != null) {
                            row.createCell(36).setCellValue(map.get("ScorecardPerformance").toString());
                        } else {
                            row.createCell(36).setCellValue("");
                        }
                    } else {
                        row.createCell(36).setCellValue("");
                    }
                    if (map.containsKey("DeleteKPI")) {
                        if (map.get("DeleteKPI") != null) {
                            row.createCell(37).setCellValue(map.get("DeleteKPI").toString());
                        } else {
                            row.createCell(37).setCellValue("");
                        }
                    } else {
                        row.createCell(37).setCellValue("");
                    }
                    if (map.containsKey("DeleteObj")) {
                        if (map.get("DeleteObj") != null) {
                            row.createCell(38).setCellValue(map.get("DeleteObj").toString());
                        } else {
                            row.createCell(38).setCellValue("");
                        }
                    } else {
                        row.createCell(38).setCellValue("");
                    }
                    Cell cell = row.createCell(39);
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
                Cell cell = headerRow.createCell(col);
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

