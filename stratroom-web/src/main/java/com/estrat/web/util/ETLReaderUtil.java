/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.util.ETLReaderUtil
 *  com.estrat.web.util.RepositoryServices
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
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.PageService;
import com.estrat.web.util.RepositoryServices;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
import org.springframework.stereotype.Component;

/*
 * Exception performing whole class analysis ignored.
 */
@Component
public class ETLReaderUtil {
    private Logger logger = Logger.getLogger(ETLReaderUtil.class);
    public static final String S3_ASSET_PATHS_SCORECARD = "/scoreCardImportDataFile";
    private static final String SUFFIX = "/";
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private PageService pageService;
    @Autowired
    protected RepositoryServices repositoryServices;

    public Map readEtl(InputStream inputStream) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            resultMap = this.checkValidationForExcelSheet(myExcelBook);
        }
        catch (Exception exception) {
            // empty catch block
        }
        return resultMap;
    }

    public Map readxls(InputStream inputStream) throws IOException {
        HashMap resultMap = new HashMap();
        resultMap.put("result", "success");
        return resultMap;
    }

    public static boolean isValidFormat(String format, String value) {
        Date date = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            date = sdf.parse(value);
            if (!value.equals(sdf.format(date))) {
                date = null;
            }
        }
        catch (ParseException ex) {
            ex.printStackTrace();
        }
        return date != null;
    }

    public Map checkValidationForExcelSheet(XSSFWorkbook myExcelBook) throws IOException {
        ArrayList mapList = new ArrayList();
        HashMap stringMap = null;
        HashMap resultMap = new HashMap();
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
                XSSFRow row1 = ExcelSheet.getRow(0);
                if (row1.getCell(0).getStringCellValue().trim().equals("node key")) {
                    int totalRows = ExcelSheet.getPhysicalNumberOfRows();
                    if (totalRows == 1) {
                        stringMap = new HashMap();
                        stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                        stringMap.put("error", "ETL Import Sheet is empty");
                        stringMap.put("rowNo", "");
                        stringMap.put("cellName", "");
                        mapList.add(stringMap);
                        continue;
                    }
                    for (int i = 1; i < totalRows; ++i) {
                        HashMap stringmap;
                        XSSFRow row = ExcelSheet.getRow(i);
                        stringMap = new HashMap();
                        if (ETLReaderUtil.isRowEmpty((XSSFRow)row)) {
                            this.logger.debug("Row is empty");
                            continue;
                        }
                        try {
                            HashMap stringmap2;
                            this.logger.debug(("row no : " + row.getCTRow().getR()));
                            if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                                this.logger.info("validate node key / measurename is empty");
                            } else {
                                stringmap2 = new HashMap();
                                stringmap2.put("error", "node key / measurename is empty is empty");
                                stringmap2.put("rowNo", row.getCTRow().getR());
                                stringmap2.put("cellName", "Node Key");
                                mapList.add(stringmap2);
                            }
                            if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                                this.logger.info("validate Employee ID");
                                try {
                                    EmployeeDTO employeeRequestDTO = new EmployeeDTO();
                                    employeeRequestDTO.setFirstName(row.getCell(1).getStringCellValue());
                                    EmployeeDTO employeeDTO = this.employeeService.getEmployeeId(employeeRequestDTO);
                                    if (employeeDTO == null) {
                                        HashMap stringmap3 = new HashMap();
                                        stringmap3.put("rowNo", row.getCTRow().getR());
                                        stringmap3.put("cellName", "Employee Name");
                                        stringmap3.put("error", "Employee Name NOT found");
                                        mapList.add(stringmap3);
                                    }
                                }
                                catch (Exception e) {
                                    stringmap = new HashMap();
                                    stringmap.put("error", e.getMessage());
                                    mapList.add(stringmap);
                                }
                            } else {
                                stringmap2 = new HashMap();
                                stringmap2.put("error", "Employee Name is empty");
                                stringmap2.put("rowNo", row.getCTRow().getR());
                                stringmap2.put("cellName", "Employee Name");
                                mapList.add(stringmap2);
                            }
                            if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                                this.logger.info("validate From Date");
                                if (!ETLReaderUtil.isValidFormat((String)"MMM dd, yyyy", (String)row.getCell(2).getStringCellValue())) {
                                    stringmap2 = new HashMap();
                                    stringmap2.put("error", "FromRealDate not valid MMM dd, yyyy format");
                                    stringmap2.put("rowNo", row.getCTRow().getR());
                                    stringmap2.put("cellName", "FromRealDate");
                                    mapList.add(stringmap2);
                                }
                            } else {
                                stringmap2 = new HashMap();
                                stringmap2.put("error", "FromRealDate is empty");
                                stringmap2.put("rowNo", row.getCTRow().getR());
                                stringmap2.put("cellName", "FromRealDate");
                                mapList.add(stringmap2);
                            }
                            if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                this.logger.info("validate todate");
                                if (ETLReaderUtil.isValidFormat((String)"MMM dd, yyyy", (String)row.getCell(3).getStringCellValue())) continue;
                                stringmap2 = new HashMap();
                                stringmap2.put("error", "ToRealDate not valid MMM dd, yyyy format");
                                stringmap2.put("rowNo", row.getCTRow().getR());
                                stringmap2.put("cellName", "ToRealDate");
                                mapList.add(stringmap2);
                                continue;
                            }
                            stringmap2 = new HashMap();
                            stringmap2.put("error", "ToRealDate is empty");
                            stringmap2.put("rowNo", row.getCTRow().getR());
                            stringmap2.put("cellName", "ToRealDate");
                            mapList.add(stringmap2);
                            continue;
                        }
                        catch (Exception e) {
                            stringmap = new HashMap();
                            stringmap.put("error", e.getMessage());
                            stringmap.put("rowNo", row.getCTRow().getR());
                            mapList.add(stringmap);
                        }
                    }
                    continue;
                }
                stringMap = new HashMap();
                stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                stringMap.put("error", "This sheet is not a ETL Import Sheet");
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
                        map.put("Scorecard Description", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Scorecard Description", "");
                    continue;
                }
                if (cellIndex == 5) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Perspective Name", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Perspective Name", "");
                    continue;
                }
                if (cellIndex == 6) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Perspective Type", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Perspective Type", "");
                    continue;
                }
                if (cellIndex == 7) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Perspective Description", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Perspective Description", "");
                    continue;
                }
                if (cellIndex == 10) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Objective Name", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Objective Name", "");
                    continue;
                }
                if (cellIndex == 11) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("Objective Description", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("Objective Description", "");
                    continue;
                }
                if (cellIndex == 14) {
                    if (row.getCell(cellIndex) != null && row.getCell(cellIndex).getCellType() != CellType.BLANK) {
                        map.put("KPI NAME", row.getCell(cellIndex).getStringCellValue().trim());
                        continue;
                    }
                    map.put("KPI NAME", "");
                    continue;
                }
                if (cellIndex != 17) continue;
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

    public String writeDocForScoreCard(List<Map> mapList, String excelFilePath) throws IOException {
        String writeDocUrl = null;
        try {
            String[] COLUMNs = new String[]{"ScoreCardName", "ScorecardDescription", "PerspectiveID", "PerspectiveName", "PerspectiveDescription", "PerspectiveWeight", "ObJectiveID", "ObjectiveName", "ObjectiveDescription", "ObjectiveWeight", "KPIID", "KPINAME", "KPIDescription", "KPIWeight", "Owner", "MeasurementFrequency", "KPIFormula", "DataSource", "Target", "Red", "Amber", "Green", "Status", "Start/EndDate"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            Sheet sheet = workbook.createSheet("ScoreCardImportSheet");
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
                row.createCell(0).setCellValue(map.get("pageName").toString());
                row.createCell(1).setCellValue(map.get("pageDescription").toString());
                row.createCell(2).setCellValue(map.get("scoreCardId").toString());
                row.createCell(3).setCellValue(map.get("scoreCardName").toString());
                row.createCell(4).setCellValue(map.get("scoreCardDec").toString());
                row.createCell(5).setCellValue(map.get("scoreCardWeight").toString());
                row.createCell(6).setCellValue(map.get("objectiveUniqueID").toString());
                row.createCell(7).setCellValue(map.get("objectiveName").toString());
                row.createCell(8).setCellValue(map.get("objectiveDec").toString());
                row.createCell(9).setCellValue(map.get("objectiveWeight").toString());
                row.createCell(10).setCellValue(map.get("kpiIdUniqueID").toString());
                row.createCell(11).setCellValue(map.get("kpiName").toString());
                row.createCell(12).setCellValue(map.get("kpidec").toString());
                row.createCell(13).setCellValue(map.get("kpiWeight").toString());
                row.createCell(14).setCellValue(map.get("owner").toString());
                row.createCell(15).setCellValue(map.get("kpiMeasureValue").toString());
                row.createCell(16).setCellValue(map.get("kpiFormula").toString());
                row.createCell(17).setCellValue(map.get("dataSource").toString());
                row.createCell(18).setCellValue(map.get("target").toString());
                row.createCell(19).setCellValue(map.get("red").toString());
                row.createCell(20).setCellValue(map.get("amber").toString());
                row.createCell(21).setCellValue(map.get("green").toString());
                row.createCell(22).setCellValue(map.get("status").toString());
                row.createCell(23).setCellValue(map.get("start_endDate").toString());
                Cell cell = row.createCell(24);
            }
            Throwable throwable = null;
            try (FileOutputStream outputStream = new FileOutputStream(excelFilePath);){
                workbook.write((OutputStream)outputStream);
            }
            catch (Throwable throwable2) {
                Throwable throwable3 = throwable2;
                throw throwable2;
            }
            String folderName = "scoreCardImportDataFile";
            this.repositoryServices.createFolder(folderName);
            String string = folderName + "/" + excelFilePath;
            this.repositoryServices.putObj(string, excelFilePath);
            writeDocUrl = this.getS3ObjectLink(excelFilePath, "/scoreCardImportDataFile");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return writeDocUrl;
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
                    status = progress != null && !progress.isEmpty() ? Boolean.valueOf(false) : Boolean.valueOf(true);
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
}

