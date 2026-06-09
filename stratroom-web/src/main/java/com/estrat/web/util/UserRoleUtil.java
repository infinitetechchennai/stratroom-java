/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.OrganizationDetails
 *  com.estrat.web.dto.UserDTO
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.UserRoleManagementService
 *  com.estrat.web.util.PasswordEncoder
 *  com.estrat.web.util.UserRoleUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.log4j.Logger
 *  org.apache.poi.ss.usermodel.Cell
 *  org.apache.poi.ss.usermodel.CellStyle
 *  org.apache.poi.ss.usermodel.CellType
 *  org.apache.poi.ss.usermodel.CreationHelper
 *  org.apache.poi.ss.usermodel.Font
 *  org.apache.poi.ss.usermodel.IndexedColors
 *  org.apache.poi.ss.usermodel.Row
 *  org.apache.poi.ss.usermodel.Sheet
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
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.OrganizationDetails;
import com.estrat.web.dto.UserDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.UserRoleManagementService;
import com.estrat.web.util.PasswordEncoder;
import com.estrat.web.util.UserThreadLocal;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Pattern;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
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
public class UserRoleUtil {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected UserRoleManagementService userRoleManagementService;
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected AuditTrailService auditTrailService;
    private Logger logger = LoggerFactory.getLogger(UserRoleUtil.class);

    public Map readuserDetails(InputStream inputStream, String type) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            if (type.equals("validation")) {
                resultMap = this.checkValidationForExcelSheet(myExcelBook);
            } else {
                resultMap = this.saveUserDetails(myExcelBook);
                this.auditTrailService.save("Excel-UserRole Upload");
                this.auditTrailService.save("User Role Assigned");
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        return resultMap;
    }

    public static boolean isValid(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pat = Pattern.compile(emailRegex);
        return pat.matcher(email).matches();
    }

    public Map checkValidationForExcelSheet(XSSFWorkbook orgdata) {
        int totalRows = 0;
        int processedrows = 0;
        int newUserCount = 0;
        HashMap resultMap = new HashMap();
        HashMap datamap = null;
        ArrayList result = new ArrayList();
        try {
            for (int sheetIndex = 0; sheetIndex < orgdata.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet orgsheet = orgdata.getSheetAt(sheetIndex);
                if (orgsheet == null) {
                    this.logger.debug("Sheet not found");
                    continue;
                }
                totalRows = orgsheet.getPhysicalNumberOfRows();
                for (int i = 1; i < totalRows; ++i) {
                    DeptDetails deptDetails1;
                    FindDTO findDTO;
                    String[] departmentIds;
                    Object deptDetails = null;
                    XSSFRow row = orgsheet.getRow(i);
                    if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                        this.logger.debug("Name valid");
                    } else {
                        datamap = new HashMap();
                        datamap.put("rowNo", row.getCTRow().getR());
                        datamap.put("error", "Name is empty");
                        datamap.put("columnName", "Name");
                        result.add(datamap);
                    }
                    if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                        String value = row.getCell(1).toString();
                        if (UserRoleUtil.isValid((String)value)) {
                            this.logger.debug("EmailAddress valid");
                        } else {
                            datamap = new HashMap();
                            datamap.put("rowNo", row.getCTRow().getR());
                            datamap.put("error", "EmailAddress Wrong Syntax");
                            datamap.put("columnName", "EmailAddress");
                            result.add(datamap);
                        }
                    } else {
                        datamap = new HashMap();
                        datamap.put("rowNo", row.getCTRow().getR());
                        datamap.put("error", "EmailAddress is empty");
                        datamap.put("columnName", "EmailAddress");
                        result.add(datamap);
                    }
                    ControlPanelGeneralDTO cpanel = this.controlPanelGeneralService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                    if (cpanel != null && cpanel.getImplementationType() != null && cpanel.getImplementationType().equalsIgnoreCase("department")) {
                        if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                            this.logger.debug("Department ID valid");
                            if (row.getCell(2).getStringCellValue().trim().contains(",")) {
                                for (String deptID : departmentIds = row.getCell(2).getStringCellValue().trim().split("\\,")) {
                                    if (deptID.trim().isEmpty()) continue;
                                    findDTO = new FindDTO();
                                    findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                    findDTO.setDeptUniqueId(deptID);
                                    deptDetails1 = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                                    if (null != deptDetails1) {
                                        this.logger.info("Department ID valid");
                                        continue;
                                    }
                                    datamap = new HashMap();
                                    datamap.put("rowNo", row.getCTRow().getR());
                                    datamap.put("error", "Department ID not found : " + deptID);
                                    datamap.put("columnName", "DepartmentID");
                                    result.add(datamap);
                                }
                            }
                        }
                    } else if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                        this.logger.debug("Department Id  valid");
                        if (row.getCell(2).getStringCellValue().trim().contains(",")) {
                            for (String deptID : departmentIds = row.getCell(2).getStringCellValue().trim().split("\\,")) {
                                if (deptID.trim().isEmpty()) continue;
                                findDTO = new FindDTO();
                                findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                findDTO.setDeptUniqueId(deptID);
                                deptDetails1 = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                                if (null != deptDetails1) {
                                    this.logger.info("Department ID valid");
                                    continue;
                                }
                                datamap = new HashMap();
                                datamap.put("rowNo", row.getCTRow().getR());
                                datamap.put("error", "Department ID not found : " + deptID);
                                datamap.put("columnName", "DepartmentID");
                                result.add(datamap);
                            }
                        }
                    }
                    if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                        this.logger.debug("Role valid");
                    } else {
                        datamap = new HashMap();
                        datamap.put("rowNo", row.getCTRow().getR());
                        datamap.put("error", "Role is empty");
                        datamap.put("columnName", "Role");
                        result.add(datamap);
                    }
                    if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                        OrganizationDetails organizationDetails = this.employeeService.findByName(row.getCell(8).getStringCellValue().trim());
                        if (organizationDetails != null) {
                            this.logger.debug("organizationDetails valid");
                        } else {
                            datamap = new HashMap();
                            datamap.put("rowNo", row.getCTRow().getR());
                            datamap.put("error", "Organization is NotFound");
                            datamap.put("columnName", "Organization");
                            result.add(datamap);
                        }
                    } else {
                        datamap = new HashMap();
                        datamap.put("rowNo", row.getCTRow().getR());
                        datamap.put("error", "Organization is empty");
                        datamap.put("columnName", "Organization");
                        result.add(datamap);
                    }
                    if (deptDetails == null || ((com.estrat.web.dto.DeptDetails)deptDetails).getName() == null) {
                        ++newUserCount;
                    }
                    ++processedrows;
                }
            }
            String Message = "Processed " + processedrows + " out of " + totalRows;
            resultMap.put("message", Message);
            if (result != null && !result.isEmpty()) {
                resultMap.put("parsingError", result);
                resultMap.put("result", "Not-Success");
            } else {
                resultMap.put("result", "success");
            }
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return resultMap;
    }

    public Map saveUserDetails(XSSFWorkbook orgdata) {
        int totalRows = 0;
        int processedrows = 0;
        int failedrows = 0;
        ArrayList<UserDTO> userDTOList = new ArrayList<UserDTO>();
        HashMap resultMap = new HashMap();
        try {
            for (int sheetIndex = 0; sheetIndex < orgdata.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet orgsheet = orgdata.getSheetAt(sheetIndex);
                if (orgsheet == null) {
                    this.logger.debug("Sheet not found");
                    continue;
                }
                totalRows = orgsheet.getPhysicalNumberOfRows();
                for (int i = 1; i < totalRows; ++i) {
                    OrganizationDetails organizationDetails;
                    UserDTO userDTO = new UserDTO();
                    PasswordEncoder encoder = new PasswordEncoder();
                    XSSFRow row = orgsheet.getRow(i);
                    Boolean roleStatus = false;
                    if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                        userDTO.setName(row.getCell(0).getStringCellValue().trim());
                    }
                    if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                        userDTO.setEmailAddress(row.getCell(1).getStringCellValue().trim());
                        userDTO.setPassword(encoder.encodedPassword("changeme"));
                        userDTO.setCreatedBy(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()).longValue());
                    }
                    if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                        if (row.getCell(2).getCellType() == CellType.STRING) {
                            userDTO.setDeptValue(row.getCell(2).getStringCellValue().trim());
                        } else if (row.getCell(2).getCellType() == CellType.NUMERIC) {
                            userDTO.setDeptValue(row.getCell(2).getRawValue());
                        } else {
                            userDTO.setDeptValue(row.getCell(2).getRawValue());
                        }
                    }
                    if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                        userDTO.setDesignation(row.getCell(3).getStringCellValue().trim());
                    }
                    if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                        String role = row.getCell(4).getStringCellValue().trim();
                        userDTO.setUserRole(role);
                        if (role.equalsIgnoreCase("Super User")) {
                            roleStatus = true;
                        }
                    }
                    if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                        userDTO.setLocation(row.getCell(5).getStringCellValue().trim());
                    }
                    if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                        if (row.getCell(6).getCellType() == CellType.NUMERIC) {
                            userDTO.setPhoneNumber(row.getCell(6).getRawValue().trim());
                        } else if (row.getCell(6).getCellType() == CellType.STRING) {
                            userDTO.setPhoneNumber(row.getCell(6).getStringCellValue().trim());
                        }
                    }
                    if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                        userDTO.setStatus(row.getCell(7).getStringCellValue().trim());
                    }
                    if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK && (organizationDetails = this.employeeService.findByName(row.getCell(8).getStringCellValue().trim())) != null) {
                        userDTO.setOrgId(organizationDetails.getId());
                    }
                    if (roleStatus.booleanValue()) {
                        ++failedrows;
                        continue;
                    }
                    userDTOList.add(userDTO);
                    ++processedrows;
                }
            }
        }
        catch (Exception E) {
            ++failedrows;
            throw new RuntimeException(E);
        }
        boolean checkFlag = this.userRoleManagementService.createBulkUser(userDTOList);
        if (checkFlag) {
            Employee profile = this.employeeService.getProfileDetails();
            UserThreadLocal.get().setProfile(profile);
        }
        String Message = "Processed " + processedrows + " out of " + totalRows;
        resultMap.put("no_of_failed", failedrows);
        resultMap.put("no_of_processed", processedrows);
        resultMap.put("Message", Message);
        resultMap.put("result", "Success");
        resultMap.put("message", "Import Successful");
        return resultMap;
    }

    public ResponseEntity<ByteArrayResource> writeDocForUserRole(List<UserDTO> userDTOS) throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        ArrayList mapList = new ArrayList();
        try {
            if (CollectionUtils.isNotEmpty(userDTOS)) {
                for (Object _obj_userDTO : userDTOS) {
                    UserDTO userDTO = (UserDTO) _obj_userDTO;
                    if (!Objects.nonNull(userDTO)) continue;
                    HashMap stringMap = new HashMap();
                    stringMap.put("name", userDTO.getName());
                    stringMap.put("email", userDTO.getEmailAddress());
                    if (!userDTO.getDepartmentList().isEmpty()) {
                        List deptDetailsList = userDTO.getDepartmentList();
                        String deptName = null;
                        for (Object _obj_deptDetails : deptDetailsList) {
                            DeptDetails deptDetails = (DeptDetails) _obj_deptDetails;
                            if (deptName == null) {
                                deptName = ((com.estrat.web.dto.DeptDetails)deptDetails).getName();
                                continue;
                            }
                            deptName = deptName + ", " + ((com.estrat.web.dto.DeptDetails)deptDetails).getName();
                        }
                        stringMap.put("deptId", deptName);
                    }
                    stringMap.put("designation", userDTO.getDesignation());
                    stringMap.put("role", userDTO.getUserRole());
                    stringMap.put("location", userDTO.getLocation());
                    stringMap.put("phoneNum", userDTO.getPhoneNumber());
                    stringMap.put("status", userDTO.getStatus());
                    OrganizationDetails organizationDetails = this.employeeService.findByOrgId(Long.valueOf(userDTO.getOrgId()));
                    if (organizationDetails != null) {
                        stringMap.put("orgName", organizationDetails.getName());
                    }
                    mapList.add(stringMap);
                }
            }
            if (mapList != null && CollectionUtils.isNotEmpty(mapList)) {
                String[] COLUMNs = new String[]{"Name", "Email Address", "Department ID", "Designation", "Role", "Location", "Phone no ", "Status", "Organization"};
                XSSFWorkbook workbook = new XSSFWorkbook();
                CreationHelper createHelper = workbook.getCreationHelper();
                String sheetname = "UserRoleExportName";
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
                    if (map.containsKey("name")) {
                        row.createCell(0).setCellValue((String)map.get("name"));
                    } else {
                        row.createCell(0).setCellValue("");
                    }
                    if (map.containsKey("email")) {
                        if (map.get("email") != null) {
                            row.createCell(1).setCellValue((String)map.get("email"));
                        } else {
                            row.createCell(1).setCellValue("");
                        }
                    } else {
                        row.createCell(1).setCellValue("");
                    }
                    if (map.containsKey("deptId")) {
                        if (map.get("deptId") != null) {
                            row.createCell(2).setCellValue((String)map.get("deptId"));
                        } else {
                            row.createCell(2).setCellValue("");
                        }
                    } else {
                        row.createCell(2).setCellValue("");
                    }
                    if (map.containsKey("designation")) {
                        if (map.get("designation") != null) {
                            row.createCell(3).setCellValue((String)map.get("designation"));
                        } else {
                            row.createCell(3).setCellValue("");
                        }
                    } else {
                        row.createCell(3).setCellValue("");
                    }
                    if (map.containsKey("role")) {
                        if (map.get("role") != null) {
                            row.createCell(4).setCellValue((String)map.get("role"));
                        } else {
                            row.createCell(4).setCellValue("");
                        }
                    } else {
                        row.createCell(4).setCellValue("");
                    }
                    if (map.containsKey("location")) {
                        if (map.get("location") != null) {
                            row.createCell(5).setCellValue((String)map.get("location"));
                        } else {
                            row.createCell(5).setCellValue("");
                        }
                    } else {
                        row.createCell(5).setCellValue("");
                    }
                    if (map.containsKey("phoneNum")) {
                        if (map.get("phoneNum") != null) {
                            row.createCell(6).setCellValue((String)map.get("phoneNum"));
                        } else {
                            row.createCell(6).setCellValue("");
                        }
                    } else {
                        row.createCell(6).setCellValue("");
                    }
                    if (map.containsKey("status")) {
                        if (map.get("status") != null) {
                            row.createCell(7).setCellValue((String)map.get("status"));
                        } else {
                            row.createCell(7).setCellValue("");
                        }
                    } else {
                        row.createCell(7).setCellValue("");
                    }
                    if (map.containsKey("orgName")) {
                        if (map.get("orgName") != null) {
                            row.createCell(8).setCellValue((String)map.get("orgName"));
                        } else {
                            row.createCell(8).setCellValue("");
                        }
                    } else {
                        row.createCell(8).setCellValue("");
                    }
                    Cell cell = row.createCell(9);
                }
                header.setContentType(new MediaType("application", "force-download"));
                header.set("Content-Disposition", "attachment; filename=UserRole.xlsx");
                workbook.write((OutputStream)stream);
                workbook.close();
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

