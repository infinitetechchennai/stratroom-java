/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ComplianceAreaDTO
 *  com.estrat.web.dto.ComplianceDetailsDTO
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.ComplianceDetailsService
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.util.ComplainceReaderUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.log4j.Logger
 *  org.apache.poi.ss.usermodel.Cell
 *  org.apache.poi.ss.usermodel.CellType
 *  org.apache.poi.ss.usermodel.DataFormatter
 *  org.apache.poi.xssf.usermodel.XSSFFormulaEvaluator
 *  org.apache.poi.xssf.usermodel.XSSFRow
 *  org.apache.poi.xssf.usermodel.XSSFSheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.ComplianceAreaDTO;
import com.estrat.web.dto.ComplianceDetailsDTO;
import com.estrat.web.dto.ControlPanelGeneralDTO;
import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.ComplianceDetailsService;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.PageService;
import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.XSSFFormulaEvaluator;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/*
 * Exception performing whole class analysis ignored.
 */
@SuppressWarnings({"unchecked", "rawtypes"})
@Component
public class ComplainceReaderUtil {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private ComplianceDetailsService complianceDetailsService;
    @Autowired
    private PageService pageService;
    @Autowired
    protected AuditTrailService auditTrailService;
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;
    private Logger logger = LoggerFactory.getLogger(ComplainceReaderUtil.class);

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

    public Map importBulkComplainceDetails(InputStream inputStream, String type) throws IOException {
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
                resultMap.put("result", "success");
            } else {
                System.out.println("enter in data check");
                resultMap = this.importBulkComplaince(myExcelBook);
                this.auditTrailService.save("Excel-Complaince Upload");
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        return resultMap;
    }

    public Map importBulkComplaince(XSSFWorkbook myExcelBook) throws IOException {
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
                    block39: {
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
                            Long pageId;
                            Long owner;
                            block40: {
                                if (ComplainceReaderUtil.isRowEmpty((XSSFRow)row)) {
                                    this.logger.debug("Row is empty");
                                    break block39;
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
                                if (pageName != null) {
                                    Object responsePage;
                                    Map response = this.pageService.checkpages(pageName, PageOwner.longValue());
                                    if (!response.containsKey("success")) {
                                        PageDTO pageDTO1 = new PageDTO();
                                        pageDTO1.setPageName(pageName);
                                        pageDTO1.setCreatedBy(PageOwner.longValue());
                                        pageDTO1.setPageType("Compliance");
                                        pageDTO1.setGroupType("Govern");
                                        pageDTO1.setCreatedTime(LocalDateTime.now());
                                        if (deptId != null) {
                                            pageDTO1.setDeptId(deptId);
                                        }
                                        if (Objects.nonNull(responsePage = (ScoreCardResponseDTO)this.pageService.saveDetails(pageDTO1).getBody())) {
                                            createStatus = true;
                                            checkcreaterowno = row.getCTRow().getR();
                                            pageId = ((ScoreCardResponseDTO)responsePage).getPageDTO().getId();
                                        }
                                    } else {
                                        updateStatus = true;
                                        checkupdaterowno = row.getCTRow().getR();
                                        String id = response.get("pageId").toString();
                                        pageId = Long.parseLong(id);
                                        responsePage = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
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
                                        break block40;
                                    }
                                    this.logger.error("Complaince owner not found");
                                    ++errordocs;
                                }
                                catch (Exception e) {
                                    e.printStackTrace();
                                    ++errordocs;
                                }
                                continue;
                            }
                            ComplianceDetailsDTO complianceDetailsDTO = new ComplianceDetailsDTO();
                            if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                complianceDetailsDTO.getComplainValue().put("controlId", row.getCell(3).getStringCellValue().trim());
                                complianceDetailsDTO.setOwner(owner.longValue());
                                complianceDetailsDTO.setPageId(pageId.longValue());
                            }
                            if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                complianceDetailsDTO.getComplainValue().put("controlDescription", row.getCell(4).getStringCellValue().trim());
                            }
                            if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                                complianceDetailsDTO.getComplainValue().put("regulationORStandar", row.getCell(5).getStringCellValue().trim());
                            }
                            String type = null;
                            if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                                type = row.getCell(6).getStringCellValue().trim();
                            }
                            System.out.println(" Complaincetype :: " + type);
                            ComplianceDetailsDTO complianceDetailsDTO2 = this.buildAndSaveComplainceDetails(PageOwner, pageId, complianceDetailsDTO, type);
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

    public ComplianceDetailsDTO buildAndSaveComplainceDetails(Long pageOwner, Long pageId, ComplianceDetailsDTO complianceDetailsDTO, String type) {
        boolean areaIsPresent = false;
        long catagoryId = 0L;
        if (type != null) {
            System.out.println("Enter in type is present -- " + type);
            List dTOList = this.complianceDetailsService.findAll(null, String.valueOf(pageId));
            System.out.println("dTOList :: " + dTOList);
            for (Object _obj : dTOList) {
                ComplianceAreaDTO dpList = (ComplianceAreaDTO) _obj;
                System.out.println(" type is - " + type + " dtoName :: " + dpList.getName());
                if (!type.equalsIgnoreCase(dpList.getName())) continue;
                System.out.println("enter in true");
                areaIsPresent = true;
                catagoryId = dpList.getId();
            }
            if (!areaIsPresent) {
                System.out.println("enter in False");
                ComplianceAreaDTO newDto = new ComplianceAreaDTO();
                newDto.setName(type);
                newDto.setCreatedBy(pageOwner.longValue());
                newDto.setCreatedTime(LocalDateTime.now());
                ComplianceAreaDTO savedArea = this.complianceDetailsService.saveArea(newDto);
                catagoryId = savedArea.getId();
            }
        }
        System.out.println("catagoryId :: " + catagoryId);
        if (catagoryId != 0L) {
            complianceDetailsDTO.setComplainAreaId(catagoryId);
        }
        if (complianceDetailsDTO.getId() != 0L) {
            complianceDetailsDTO.setUpdatedBy(pageOwner.longValue());
            complianceDetailsDTO.setUpdatedTime(LocalDateTime.now());
            return this.complianceDetailsService.updateComplain(complianceDetailsDTO);
        }
        complianceDetailsDTO.setCreatedBy(pageOwner.longValue());
        return this.complianceDetailsService.saveComplain(complianceDetailsDTO);
    }
}

