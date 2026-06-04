/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.ImpactDataDto
 *  com.estrat.web.dto.ImpactSurvayDto
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.ImpactSurvayService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.util.ImpactSurveyReaderUtil
 *  com.estrat.web.util.UserThreadLocal
 *  com.itextpdf.text.BaseColor
 *  com.itextpdf.text.Document
 *  com.itextpdf.text.Element
 *  com.itextpdf.text.Font
 *  com.itextpdf.text.FontFactory
 *  com.itextpdf.text.PageSize
 *  com.itextpdf.text.Paragraph
 *  com.itextpdf.text.Phrase
 *  com.itextpdf.text.pdf.PdfPCell
 *  com.itextpdf.text.pdf.PdfPTable
 *  com.itextpdf.text.pdf.PdfWriter
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.commons.collections4.CollectionUtils
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
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.ImpactDataDto;
import com.estrat.web.dto.ImpactSurvayDto;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.ImpactSurvayService;
import com.estrat.web.service.PageService;
import com.estrat.web.util.UserThreadLocal;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
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
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.log4j.Logger;
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
@SuppressWarnings({"unchecked", "rawtypes"})
@Component
public class ImpactSurveyReaderUtil {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private PageService pageService;
    @Autowired
    private ImpactSurvayService impactSurvayService;
    @Autowired
    private ControlPanelGeneralService panelGeneralService;
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected AuditTrailService auditTrailService;
    private Logger logger = Logger.getLogger(ImpactSurveyReaderUtil.class);

    public Map importImpact(InputStream inputStream, String type) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            if (type.equals("validation")) {
                resultMap = this.checkValidationForExcelSheet(myExcelBook);
            } else {
                resultMap = this.importImpactData(myExcelBook);
                this.auditTrailService.save("Excel - Risk Upload");
            }
        }
        catch (Exception e) {
            this.logger.error("Exception occured", (Throwable)e);
        }
        return resultMap;
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
        try {
            int sheetIndex = 0;
            while (true) {
                block38: {
                    int totalRows;
                    String excelSheetName;
                    XSSFSheet ExcelSheet;
                    block40: {
                        block36: {
                            block39: {
                                block37: {
                                    if (sheetIndex >= myExcelBook.getNumberOfSheets()) break block36;
                                    ExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                                    if (ExcelSheet != null) break block37;
                                    this.logger.debug("Sheet not found");
                                    break block38;
                                }
                                excelSheetName = ExcelSheet.getSheetName();
                                if ("Dict".equalsIgnoreCase(excelSheetName)) break block38;
                                XSSFRow row1 = ExcelSheet.getRow(0);
                                if (!row1.getCell(2).getStringCellValue().trim().equals("Impact Name") && !row1.getCell(2).getStringCellValue().trim().equals("ImpactName")) break block39;
                                totalRows = ExcelSheet.getPhysicalNumberOfRows();
                                if (totalRows != 1) break block40;
                                stringMap = new HashMap();
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("error", "ImpactSurvey Import Sheet is empty");
                                stringMap.put("rowNo", "");
                                stringMap.put("highLightcellName", "Excel-SheetName");
                                mapList.add(stringMap);
                                break block38;
                            }
                            stringMap = new HashMap();
                            stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                            stringMap.put("error", "This sheet is not a ImpactSurvay sheet");
                            stringMap.put("rowNo", "");
                            stringMap.put("highLightcellName", "");
                            mapList.add(stringMap);
                            break block38;
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
                            }
                        }
                        catch (Exception e) {
                            stringMap = new HashMap();
                            stringMap.put("Excel_SheetName", excelSheetName);
                            stringMap.put("error", e.getMessage());
                            mapList.add(stringMap);
                        }
                        try {
                            block35: {
                                if (ImpactSurveyReaderUtil.isRowEmpty((XSSFRow)row)) {
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
                                                break block35;
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
                                stringMap.put("error", "Owner is empty");
                                stringMap.put("highLightcellName", "Owner");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(3) == null || row.getCell(3).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Process(POS) is empty");
                                stringMap.put("highLightcellName", "Process(POS)");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(4) == null || row.getCell(4).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Justification for Critical & Risk Event (SLA, Regulations, other regulations) is Empty");
                                stringMap.put("highLightcellName", "Justification for Critical & Risk Event (SLA, Regulations, other regulations)");
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
                                stringMap.put("error", "<= 2 Hours is empty");
                                stringMap.put("highLightcellName", "<= 2 Hours");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(7) == null || row.getCell(7).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "<= 3 Hours is empty");
                                stringMap.put("highLightcellName", "<= 3 Hours");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(8) == null || row.getCell(8).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "<= 4 Hours is empty");
                                stringMap.put("highLightcellName", "<= 4 Hours Hours");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(9) == null || row.getCell(9).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "<= 5 Hours is empty");
                                stringMap.put("highLightcellName", "<= 5 Hours");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(10) == null || row.getCell(10).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "<= 6 Hours is empty");
                                stringMap.put("highLightcellName", "<= 6 Hours");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(11) == null || row.getCell(11).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "<= 8 Hours is empty");
                                stringMap.put("highLightcellName", "<= 8 Hours");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(12) == null || row.getCell(12).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "<= 1 days is empty");
                                stringMap.put("highLightcellName", "<= 1 days");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(13) == null || row.getCell(13).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "<= 2 days is empty");
                                stringMap.put("highLightcellName", "<= 2 days");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(14) == null || row.getCell(14).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "<= 4 days is empty");
                                stringMap.put("highLightcellName", "<= 4 days");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(15) == null || row.getCell(15).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "<= 1 week is empty");
                                stringMap.put("highLightcellName", "<= 1 week");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(16) == null || row.getCell(16).getCellType() == CellType.BLANK) {
                                stringMap = new HashMap();
                                stringMap.put("Excel_SheetName", excelSheetName);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "<= 2 week is empty");
                                stringMap.put("highLightcellName", "<= 2 week");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) continue;
                            stringMap = new HashMap();
                            stringMap.put("Excel_SheetName", excelSheetName);
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "<= 1 month is empty");
                            stringMap.put("highLightcellName", "<= 1 month");
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

    public Map importImpactData(XSSFWorkbook myExcelBook) throws IOException {
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
                    block30: {
                        Object riskMap = null;
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
                        HashMap pageMap = new HashMap();
                        try {
                            String excelImpact;
                            Long deptId;
                            Long pageId;
                            Long owner;
                            block31: {
                                if (ImpactSurveyReaderUtil.isRowEmpty((XSSFRow)row)) {
                                    this.logger.debug("Row is empty");
                                    break block30;
                                }
                                owner = null;
                                pageId = null;
                                if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    continue;
                                }
                                pageName = row.getCell(1).getStringCellValue().trim();
                                if (row.getCell(2) == null || row.getCell(12).getCellType() == CellType.BLANK) {
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
                                try {
                                    EmployeeDTO requestEmployeeDTO = new EmployeeDTO();
                                    String ownerValue = row.getCell(2).getStringCellValue().trim();
                                    if (ownerValue.contains("@")) {
                                        requestEmployeeDTO.setEmailAddress(ownerValue);
                                    } else {
                                        requestEmployeeDTO.setFirstName(ownerValue);
                                    }
                                    EmployeeDTO ownerDTO = this.employeeService.getEmployeeId(requestEmployeeDTO);
                                    if (Objects.nonNull(ownerDTO)) {
                                        owner = ownerDTO.getEmpId();
                                        break block31;
                                    }
                                    ++errordocs;
                                }
                                catch (Exception e) {
                                    this.logger.error("Exception occured", (Throwable)e);
                                    ++errordocs;
                                }
                                continue;
                            }
                            ImpactSurvayDto impactDTO = null;
                            impactDTO.setOwner(owner.longValue());
                            impactDTO.setCreateBy(PageOwner);
                            impactDTO.setPageId(pageId.longValue());
                            if (deptId != null) {
                                impactDTO.setDepartmentId(deptId.longValue());
                            }
                            if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                impactDTO.setJustificationForCritical(row.getCell(4).getStringCellValue().trim());
                            }
                            if (row.getCell(5) == null || row.getCell(5).getCellType() == CellType.BLANK || (excelImpact = row.getCell(5).getStringCellValue().trim()) == null || excelImpact != "") {
                                // empty if block
                            }
                            ImpactSurvayDto impactSurvayDto = this.buildAndSaveImpactSurvay(PageOwner, impactDTO);
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

    public ImpactSurvayDto buildAndSaveImpactSurvay(Long pageOwner, ImpactSurvayDto impactSurvayDto) {
        if (impactSurvayDto.getId() != 0L) {
            impactSurvayDto.setUpdateBy(pageOwner);
            impactSurvayDto.setUpdateTime(LocalDateTime.now());
            return this.impactSurvayService.updateImpact(impactSurvayDto);
        }
        return this.impactSurvayService.saveImpact(impactSurvayDto);
    }

    public ResponseEntity<ByteArrayResource> writeDocForImpactSurvay(List<ImpactSurvayDto> impactDTO) throws Exception {
        System.out.println("Downlode Impact => " + impactDTO);
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        ArrayList mapList = new ArrayList();
        String pageName = null;
        String deptUniqueID = null;
        try {
            if (CollectionUtils.isNotEmpty(impactDTO)) {
                for (Object _obj_impDtos : impactDTO) {
                    ImpactSurvayDto impDtos = (ImpactSurvayDto) _obj_impDtos;
                    System.out.println("======>" + impDtos);
                    if (!Objects.nonNull(impDtos)) continue;
                    if (impDtos.getDeptUniqueID() != null) {
                        deptUniqueID = impDtos.getDeptUniqueID();
                    }
                    if (impDtos.getPageName() != null) {
                        pageName = impDtos.getPageName();
                    }
                    if (impDtos.getImpactData().isEmpty()) continue;
                    for (Object _obj_impactDataDTO : impDtos.getImpactData()) {
                        ImpactDataDto impactDataDTO = (ImpactDataDto) _obj_impactDataDTO;
                        Map hourseDaysMonths;
                        HashMap dataMap = new HashMap();
                        if (impactDataDTO.getImpact() != "") {
                            dataMap.put("departmentId", deptUniqueID);
                            dataMap.put("pageName", pageName);
                            dataMap.put("owner", impDtos.getCreaterName());
                            dataMap.put("process", impDtos.getProcess().toString());
                            dataMap.put("justificationForCrtical", impDtos.getJustificationForCritical());
                            dataMap.put("impact", impactDataDTO.getImpact());
                        }
                        if (((String)(hourseDaysMonths = impactDataDTO.getHoursDaysMonths()).get("ls2Hours")).toString() != "") {
                            dataMap.put("ls2Hours", ((String)hourseDaysMonths.get("ls2Hours")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls3Hours")).toString() != "") {
                            dataMap.put("ls3Hours", ((String)hourseDaysMonths.get("ls3Hours")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls4Hours")).toString() != "") {
                            dataMap.put("ls4Hours", ((String)hourseDaysMonths.get("ls4Hours")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls5Hours")).toString() != "") {
                            dataMap.put("ls5Hours", ((String)hourseDaysMonths.get("ls5Hours")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls6Hours")).toString() != "") {
                            dataMap.put("ls6Hours", ((String)hourseDaysMonths.get("ls6Hours")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls8Hours")).toString() != "") {
                            dataMap.put("ls8Hours", ((String)hourseDaysMonths.get("ls8Hours")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls1days")).toString() != "") {
                            dataMap.put("ls1days", ((String)hourseDaysMonths.get("ls1days")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls2days")).toString() != "") {
                            dataMap.put("ls2days", ((String)hourseDaysMonths.get("ls2days")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls4days")).toString() != "") {
                            dataMap.put("ls4days", ((String)hourseDaysMonths.get("ls4days")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls1week")).toString() != "") {
                            dataMap.put("ls1week", ((String)hourseDaysMonths.get("ls1week")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls2week")).toString() != "") {
                            dataMap.put("ls2week", ((String)hourseDaysMonths.get("ls2week")).toString());
                        }
                        if (((String)hourseDaysMonths.get("ls1month")).toString() != "") {
                            dataMap.put("ls1month", ((String)hourseDaysMonths.get("ls1month")).toString());
                        }
                        mapList.add(dataMap);
                    }
                }
            }
            System.out.println("MapList==>" + mapList);
            if (mapList != null && CollectionUtils.isNotEmpty(mapList)) {
                String[] COLUMNs = new String[]{"Department ID", "Page Name", "Owner", "Process(POS)", "Justification for Critical & Risk Event (SLA, Regulations, other regulations)", "Impact", "<= 2 Hours", "<= 3 Hours", "<= 4 Hours", "<= 5 Hours", "<= 6 Hours", "<= 8 Hours", "<= 1 days", "<= 2 days", "<= 4 days", "<= 1 week", "<= 2 week", "<= 1 month"};
                XSSFWorkbook workbook = new XSSFWorkbook();
                CreationHelper createHelper = workbook.getCreationHelper();
                String sheetname = "ImpactSurvey";
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
                    if (map.containsKey("departmentId")) {
                        row.createCell(0).setCellValue((String)map.get("departmentId"));
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
                    if (map.containsKey("process")) {
                        if (map.get("process") != null) {
                            row.createCell(3).setCellValue((String)map.get("process"));
                        } else {
                            row.createCell(3).setCellValue("");
                        }
                    } else {
                        row.createCell(3).setCellValue("");
                    }
                    if (map.containsKey("justificationForCrtical")) {
                        if (map.get("justificationForCrtical") != null) {
                            row.createCell(4).setCellValue((String)map.get("justificationForCrtical"));
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
                    if (map.containsKey("ls2Hours")) {
                        if (map.get("ls2Hours") != null) {
                            row.createCell(6).setCellValue((String)map.get("ls2Hours"));
                        } else {
                            row.createCell(6).setCellValue("");
                        }
                    } else {
                        row.createCell(6).setCellValue("");
                    }
                    if (map.containsKey("ls3Hours")) {
                        if (map.get("ls3Hours") != null) {
                            row.createCell(7).setCellValue((String)map.get("ls3Hours"));
                        } else {
                            row.createCell(7).setCellValue("");
                        }
                    } else {
                        row.createCell(7).setCellValue("");
                    }
                    if (map.containsKey("ls4Hours")) {
                        if (map.get("ls4Hours") != null) {
                            row.createCell(8).setCellValue((String)map.get("ls4Hours"));
                        } else {
                            row.createCell(8).setCellValue("");
                        }
                    } else {
                        row.createCell(8).setCellValue("");
                    }
                    if (map.containsKey("ls5Hours")) {
                        if (map.get("ls5Hours") != null) {
                            row.createCell(9).setCellValue((String)map.get("ls5Hours"));
                        } else {
                            row.createCell(9).setCellValue("");
                        }
                    } else {
                        row.createCell(9).setCellValue("");
                    }
                    if (map.containsKey("ls6Hours")) {
                        if (map.get("ls6Hours") != null) {
                            row.createCell(10).setCellValue((String)map.get("ls6Hours"));
                        } else {
                            row.createCell(10).setCellValue("");
                        }
                    } else {
                        row.createCell(10).setCellValue("");
                    }
                    if (map.containsKey("ls8Hours")) {
                        if (map.get("ls8Hours") != null) {
                            row.createCell(11).setCellValue((String)map.get("ls8Hours"));
                        } else {
                            row.createCell(11).setCellValue("");
                        }
                    } else {
                        row.createCell(11).setCellValue("");
                    }
                    if (map.containsKey("ls1days")) {
                        if (map.get("ls1days") != null) {
                            row.createCell(12).setCellValue((String)map.get("ls1days"));
                        } else {
                            row.createCell(12).setCellValue("");
                        }
                    } else {
                        row.createCell(12).setCellValue("");
                    }
                    if (map.containsKey("ls2days")) {
                        if (map.get("ls2days") != null) {
                            row.createCell(13).setCellValue((String)map.get("ls2days"));
                        } else {
                            row.createCell(13).setCellValue("");
                        }
                    } else {
                        row.createCell(13).setCellValue("");
                    }
                    if (map.containsKey("ls4days")) {
                        if (map.get("ls4days") != null) {
                            row.createCell(14).setCellValue((String)map.get("ls4days"));
                        } else {
                            row.createCell(14).setCellValue("");
                        }
                    } else {
                        row.createCell(14).setCellValue("");
                    }
                    if (map.containsKey("ls1week")) {
                        if (map.get("ls1week") != null) {
                            row.createCell(15).setCellValue((String)map.get("ls1week"));
                        } else {
                            row.createCell(15).setCellValue("");
                        }
                    } else {
                        row.createCell(15).setCellValue("");
                    }
                    if (map.containsKey("ls2week")) {
                        if (map.get("ls2week") != null) {
                            row.createCell(16).setCellValue((String)map.get("ls2week"));
                        } else {
                            row.createCell(16).setCellValue("");
                        }
                    } else {
                        row.createCell(16).setCellValue("");
                    }
                    if (map.containsKey("ls1month")) {
                        if (map.get("ls1month") != null) {
                            row.createCell(17).setCellValue((String)map.get("ls1month"));
                        } else {
                            row.createCell(17).setCellValue("");
                        }
                    } else {
                        row.createCell(17).setCellValue("");
                    }
                    Cell cell = row.createCell(18);
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

    public ResponseEntity<?> writePdfForImpactSurvay(List<ImpactSurvayDto> impactDTO, HttpServletResponse response, String type) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        try {
            response.setContentType("application/pdf");
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=ImpactSurvey.pdf.pdf";
            response.setHeader(headerKey, headerValue);
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance((Document)document, (OutputStream)response.getOutputStream());
            document.open();
            com.itextpdf.text.Font font = FontFactory.getFont((String)"Helvetica");
            font.setSize(12.0f);
            font.setColor(BaseColor.GRAY);
            Paragraph p = new Paragraph("Impact Survey Details");
            p.setAlignment(1);
            document.add((Element)p);
            if (type.equalsIgnoreCase("all")) {
                PdfPTable table = new PdfPTable(18);
                table.setWidthPercentage(100.0f);
                table.setWidths(new float[]{10.0f, 10.0f, 10.0f, 10.0f, 18.5f, 10.0f, 5.0f, 5.0f, 5.0f, 5.0f, 5.0f, 5.0f, 5.0f, 5.0f, 5.0f, 5.0f, 5.0f, 5.0f});
                table.setSpacingBefore(10.0f);
                this.writeAllTableHeader(table);
                this.writeAllTableData(table, impactDTO);
                document.add((Element)table);
            }
            document.close();
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    private void writeAllTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(BaseColor.GRAY);
        cell.setPadding(5.0f);
        com.itextpdf.text.Font font = FontFactory.getFont((String)"Helvetica");
        font.setColor(BaseColor.WHITE);
        cell.setPhrase(new Phrase("Department ID", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Page Name", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Owner", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Process(POS)", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Justification for Critical & Risk Event (SLA, Regulations, other regulations)", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Impact", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 2 Hours", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 3 Hours", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 4 Hours", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 5 Hours", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 6 Hours", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 8 Hours", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 1 days", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 2 days", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 4 days", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 1 week", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 2 week", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("<= 1 month", font));
        table.addCell(cell);
    }

    private void writeAllTableData(PdfPTable table, List<ImpactSurvayDto> impactDTO) {
        ArrayList mapList = new ArrayList();
        String pageName = null;
        String deptUniqueID = null;
        if (CollectionUtils.isNotEmpty(impactDTO)) {
            for (Object _obj_impactSurvayDto : impactDTO) {
                ImpactSurvayDto impactSurvayDto = (ImpactSurvayDto) _obj_impactSurvayDto;
                System.out.println("======>" + impactSurvayDto);
                if (!Objects.nonNull(impactSurvayDto)) continue;
                if (impactSurvayDto.getDeptUniqueID() != null) {
                    deptUniqueID = impactSurvayDto.getDeptUniqueID();
                }
                if (impactSurvayDto.getPageName() != null) {
                    pageName = impactSurvayDto.getPageName();
                }
                if (impactSurvayDto.getImpactData().isEmpty()) continue;
                for (Object _obj_impactDataDTO : impactSurvayDto.getImpactData()) {
                    ImpactDataDto impactDataDTO = (ImpactDataDto) _obj_impactDataDTO;
                    Map hourseDaysMonths;
                    HashMap dataMap = new HashMap();
                    if (impactDataDTO.getImpact() != "") {
                        dataMap.put("departmentId", deptUniqueID);
                        dataMap.put("pageName", pageName);
                        dataMap.put("owner", impactSurvayDto.getCreaterName());
                        dataMap.put("process", impactSurvayDto.getProcess().toString());
                        dataMap.put("justificationForCrtical", impactSurvayDto.getJustificationForCritical());
                        dataMap.put("impact", impactDataDTO.getImpact());
                    }
                    if (((String)(hourseDaysMonths = impactDataDTO.getHoursDaysMonths()).get("ls2Hours")).toString() != "") {
                        dataMap.put("ls2Hours", ((String)hourseDaysMonths.get("ls2Hours")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls3Hours")).toString() != "") {
                        dataMap.put("ls3Hours", ((String)hourseDaysMonths.get("ls3Hours")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls4Hours")).toString() != "") {
                        dataMap.put("ls4Hours", ((String)hourseDaysMonths.get("ls4Hours")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls5Hours")).toString() != "") {
                        dataMap.put("ls5Hours", ((String)hourseDaysMonths.get("ls5Hours")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls6Hours")).toString() != "") {
                        dataMap.put("ls6Hours", ((String)hourseDaysMonths.get("ls6Hours")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls8Hours")).toString() != "") {
                        dataMap.put("ls8Hours", ((String)hourseDaysMonths.get("ls8Hours")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls1days")).toString() != "") {
                        dataMap.put("ls1days", ((String)hourseDaysMonths.get("ls1days")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls2days")).toString() != "") {
                        dataMap.put("ls2days", ((String)hourseDaysMonths.get("ls2days")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls4days")).toString() != "") {
                        dataMap.put("ls4days", ((String)hourseDaysMonths.get("ls4days")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls1week")).toString() != "") {
                        dataMap.put("ls1week", ((String)hourseDaysMonths.get("ls1week")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls2week")).toString() != "") {
                        dataMap.put("ls2week", ((String)hourseDaysMonths.get("ls2week")).toString());
                    }
                    if (((String)hourseDaysMonths.get("ls1month")).toString() != "") {
                        dataMap.put("ls1month", ((String)hourseDaysMonths.get("ls1month")).toString());
                    }
                    mapList.add(dataMap);
                }
            }
        }
        for (Object _obj_map : mapList) {
            Map map = (Map) _obj_map;
            if (map == null) continue;
            if (map.containsKey("departmentId")) {
                table.addCell((String)map.get("departmentId"));
            } else {
                table.addCell("");
            }
            if (map.containsKey("pageName")) {
                table.addCell((String)map.get("pageName"));
            } else {
                table.addCell("");
            }
            if (map.containsKey("owner")) {
                if (map.get("owner") != null) {
                    table.addCell((String)map.get("owner"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("process")) {
                if (map.get("process") != null) {
                    table.addCell((String)map.get("process"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("justificationForCrtical")) {
                if (map.get("justificationForCrtical") != null) {
                    table.addCell((String)map.get("justificationForCrtical"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("impact")) {
                if (map.get("impact") != null) {
                    table.addCell((String)map.get("impact"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls2Hours")) {
                if (map.get("ls2Hours") != null) {
                    table.addCell((String)map.get("ls2Hours"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls3Hours")) {
                if (map.get("ls3Hours") != null) {
                    table.addCell((String)map.get("ls3Hours"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls4Hours")) {
                if (map.get("ls4Hours") != null) {
                    table.addCell((String)map.get("ls4Hours"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls5Hours")) {
                if (map.get("ls5Hours") != null) {
                    table.addCell((String)map.get("ls5Hours"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls6Hours")) {
                if (map.get("ls6Hours") != null) {
                    table.addCell((String)map.get("ls6Hours"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls8Hours")) {
                if (map.get("ls8Hours") != null) {
                    table.addCell((String)map.get("ls8Hours"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls1days")) {
                if (map.get("ls1days") != null) {
                    table.addCell((String)map.get("ls1days"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls2days")) {
                if (map.get("ls2days") != null) {
                    table.addCell((String)map.get("ls2days"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls4days")) {
                if (map.get("ls4days") != null) {
                    table.addCell((String)map.get("ls4days"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls1week")) {
                if (map.get("ls1week") != null) {
                    table.addCell((String)map.get("ls1week"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls2week")) {
                if (map.get("ls2week") != null) {
                    table.addCell((String)map.get("ls2week"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("ls1month")) {
                if (map.get("ls1month") != null) {
                    table.addCell((String)map.get("ls1month"));
                    continue;
                }
                table.addCell("");
                continue;
            }
            table.addCell("");
        }
    }
}

