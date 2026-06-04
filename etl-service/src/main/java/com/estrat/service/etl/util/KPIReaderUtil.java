/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.dto.KPIDetailsDTO
 *  com.estrat.service.etl.util.KPIReaderUtil
 *  com.estrat.service.etl.util.UserThreadLocal
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.apache.poi.xssf.usermodel.XSSFRow
 *  org.apache.poi.xssf.usermodel.XSSFSheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.etl.util;

import com.estrat.service.etl.dto.KPIDetailsDTO;
import com.estrat.service.etl.util.UserThreadLocal;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

@Component
public class KPIReaderUtil {
    private Logger logger = Logger.getLogger(KPIReaderUtil.class);

    public List<KPIDetailsDTO> readKPIDetails(InputStream inputStream) {
        ArrayList<KPIDetailsDTO> detailsDTOs = new ArrayList<KPIDetailsDTO>();
        try {
            String[] cellArray = new String[]{"setMetricCode", "setOrganizationName", "setRealDate", "setMonthYear", "setFinancialMonth", "setMeasureName", "setMtdActual", "setMtdTarget", "setRolling12Actual", "setRolling12Budget", "setOrgKey", "setNodeKey"};
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd, yyyy");
            XSSFWorkbook myExcelBook = new XSSFWorkbook(inputStream);
            for (int sheetIndex = 0; sheetIndex < myExcelBook.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet myExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                if (myExcelSheet == null) {
                    this.logger.debug((Object)"Sheet not found");
                } else {
                    int totalRows = myExcelSheet.getPhysicalNumberOfRows();
                    for (int i = 1; i < totalRows; ++i) {
                        XSSFRow row = myExcelSheet.getRow(i);
                        int totalCells = row.getPhysicalNumberOfCells();
                        KPIDetailsDTO detailsDTO = new KPIDetailsDTO();
                        detailsDTO.setEmpId(Long.valueOf((String)UserThreadLocal.get().get("LOGGED_IN_EMPLOYEE_ID")).longValue());
                        for (int cellIndex = 0; cellIndex < cellArray.length; ++cellIndex) {
                            if (cellIndex == 2) {
                                Date cellValue = dateFormat.parse(row.getCell(cellIndex).getStringCellValue());
                                detailsDTO.setRealDateFrom(cellValue);
                                continue;
                            }
                            if (cellIndex == 10) {
                                if (row.getCell(cellIndex) == null || StringUtils.isEmpty((CharSequence)String.valueOf(row.getCell(cellIndex).getNumericCellValue()))) {
                                    detailsDTO.setOrgKey(null);
                                    continue;
                                }
                                detailsDTO.setOrgKey(new BigDecimal(row.getCell(cellIndex).getNumericCellValue()).toString());
                                continue;
                            }
                            if (row.getCell(cellIndex) == null) continue;
                            if (row.getCell(cellIndex).getCellType() == org.apache.poi.ss.usermodel.CellType.STRING) {
                                String cellValue = row.getCell(cellIndex).getStringCellValue();
                                detailsDTO.getClass().getMethod(cellArray[cellIndex], String.class).invoke((Object)detailsDTO, cellValue);
                                continue;
                            }
                            if (row.getCell(cellIndex).getCellType() == org.apache.poi.ss.usermodel.CellType.NUMERIC) {
                                double cellValue = row.getCell(cellIndex).getNumericCellValue();
                                detailsDTO.getClass().getMethod(cellArray[cellIndex], String.class).invoke((Object)detailsDTO, String.valueOf(cellValue));
                                continue;
                            }
                            String cellValue = row.getCell(cellIndex).getStringCellValue();
                            detailsDTO.getClass().getMethod(cellArray[cellIndex], String.class).invoke((Object)detailsDTO, cellValue);
                        }
                        detailsDTOs.add(detailsDTO);
                    }
                }
                myExcelBook.close();
            }
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return detailsDTOs;
    }
}

