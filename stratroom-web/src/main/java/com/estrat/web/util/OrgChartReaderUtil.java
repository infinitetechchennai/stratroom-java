/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.DeptImportDTO
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.OrganizationDetails
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.util.OrgChartReaderUtil
 *  com.estrat.web.util.PasswordEncoder
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.log4j.Logger
 *  org.apache.poi.ss.usermodel.CellType
 *  org.apache.poi.xssf.usermodel.XSSFCell
 *  org.apache.poi.xssf.usermodel.XSSFRow
 *  org.apache.poi.xssf.usermodel.XSSFSheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.DeptImportDTO;
import com.estrat.web.dto.Employee;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.OrganizationDetails;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.util.PasswordEncoder;
import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/*
 * Exception performing whole class analysis ignored.
 */
@Component
public class OrgChartReaderUtil {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    private AuditTrailService auditTrailService;
    private Logger logger = Logger.getLogger(OrgChartReaderUtil.class);

    public Map<String, Object> readuserDetails(InputStream inputStream, String type) throws IOException {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            if (type.equals("validation")) {
                resultMap = this.checkValidationForExcelSheet(myExcelBook);
            } else {
                resultMap = this.saveuserDetails(myExcelBook);
                this.auditTrailService.save("Excel-Organisation Upload");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return resultMap;
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public Map<String, Object> checkValidationForExcelSheet(XSSFWorkbook orgdata) {
        int totalRows = 0;
        int processedrows = 0;
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        HashMap<String, Object> datamap = null;
        ArrayList result = new ArrayList();
        Object orgName = null;
        long newUserCount = 0L;
        try {
            int sheetIndex = 0;
            while (true) {
                block49: {
                    int i;
                    ArrayList<String> checkParentList;
                    XSSFRow checkrow;
                    PasswordEncoder encoder;
                    XSSFSheet orgSheet;
                    block51: {
                        block47: {
                            block50: {
                                block48: {
                                    if (sheetIndex >= orgdata.getNumberOfSheets()) break block47;
                                    orgSheet = orgdata.getSheetAt(sheetIndex);
                                    if (orgSheet != null) break block48;
                                    this.logger.debug("Sheet not found");
                                    break block49;
                                }
                                totalRows = orgSheet.getPhysicalNumberOfRows();
                                encoder = new PasswordEncoder();
                                checkrow = orgSheet.getRow(0);
                                if (checkrow.getCell(0) == null || checkrow.getCell(0).getCellType() == CellType.BLANK) break block49;
                                String checkSheet = checkrow.getCell(0).getStringCellValue().trim();
                                if (!checkSheet.equalsIgnoreCase("Parent Email")) break block50;
                                checkParentList = new ArrayList<String>();
                                for (i = 1; i < totalRows; ++i) {
                                    XSSFRow row = orgSheet.getRow(i);
                                    if (row == null || row.getCell(5) == null || row.getCell(5).getCellType() == CellType.BLANK) continue;
                                    checkParentList.add(row.getCell(5).getStringCellValue().trim());
                                }
                                break block51;
                            }
                            datamap = new HashMap();
                            datamap.put("rowNo", checkrow.getCTRow().getR());
                            datamap.put("error", "This sheet is not valid Organization sheet. please select & import valid sheet");
                            result.add(datamap);
                            break block49;
                        }
                        long orgUserCount = this.employeeService.getOrgUserCount(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                        long totalUserCount = newUserCount + orgUserCount;
                        if (totalUserCount > UserThreadLocal.get().getLicenseResponseDTO().getTotalAllowedUsers()) {
                            datamap = new HashMap();
                            String msg = "User count higher than enrolled users in license please remove users to match with license";
                            datamap.put("rowNo", processedrows);
                            datamap.put("error", msg);
                            datamap.put("columnName", "Organization");
                            result.add(datamap);
                        }
                        String Message = "Processed " + processedrows + " out of " + totalRows;
                        resultMap.put("message", Message);
                        if (result != null && !result.isEmpty()) {
                            resultMap.put("parsingError", result);
                            resultMap.put("result", "Not-Success");
                            return resultMap;
                        }
                        resultMap.put("result", "success");
                        return resultMap;
                    }
                    for (i = 1; i < totalRows; ++i) {
                        block52: {
                            EmployeeDTO employeeDTO;
                            long ParentID;
                            XSSFCell ParentExist;
                            XSSFRow row;
                            EmployeeDTO employeeDetails;
                            EmployeeDTO employee;
                            block44: {
                                block53: {
                                    List employees;
                                    OrganizationDetails organizationDetails;
                                    employee = new EmployeeDTO();
                                    employeeDetails = null;
                                    row = orgSheet.getRow(i);
                                    if (row == null) break block52;
                                    ParentExist = row.getCell(0);
                                    ParentID = 0L;
                                    if (ParentExist != null && ParentExist.getCellType() != CellType.BLANK) break block53;
                                    if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK && (organizationDetails = this.employeeService.findByName(row.getCell(9).getStringCellValue().trim())) != null && (employees = this.employeeService.checkParentEmployee(Long.valueOf(organizationDetails.getId()))) != null && !employees.isEmpty() && employees.size() > 0) {
                                        EmployeeDTO employeeDTO2 = new EmployeeDTO();
                                        if (row.getCell(5) != null) {
                                            employeeDTO2.setEmailAddress(row.getCell(5).getStringCellValue().trim());
                                        } else {
                                            datamap = new HashMap();
                                            datamap.put("rowNo", row.getCTRow().getR());
                                            datamap.put("error", "Email Address cannot be empty or null. Please provide valid email.");
                                            datamap.put("columnName", "Email");
                                            result.add(datamap);
                                        }
                                        EmployeeDTO check = this.employeeService.getEmployeeId(employeeDTO2);
                                        if (check != null) {
                                            if (check.getParentEmpId() != 0L) {
                                                datamap = new HashMap();
                                                datamap.put("rowNo", row.getCTRow().getR());
                                                datamap.put("error", "Root Node already exist for this organization. Please provide parent email for adding users");
                                                datamap.put("columnName", "Parent Email");
                                                result.add(datamap);
                                            }
                                            break block44;
                                        } else {
                                            datamap = new HashMap();
                                            datamap.put("rowNo", row.getCTRow().getR());
                                            datamap.put("error", "Root Node already exist for this organization. Please provide parent email for adding users");
                                            datamap.put("columnName", "Parent Email");
                                            result.add(datamap);
                                        }
                                    }
                                    break block44;
                                }
                                if (row.getCTRow().getR() == 2L) {
                                    EmployeeDTO employeeDTO3 = new EmployeeDTO();
                                    employeeDTO3.setEmailAddress(row.getCell(0).getStringCellValue().trim());
                                    EmployeeDTO parentCheck = this.employeeService.getEmployeeId(employeeDTO3);
                                    if (parentCheck != null) {
                                        this.logger.debug("valid");
                                    } else {
                                        datamap = new HashMap();
                                        datamap.put("rowNo", row.getCTRow().getR());
                                        datamap.put("error", "Parent email is not in org structure. Please provide valid parent email for adding users");
                                        datamap.put("columnName", "Parent Email");
                                        result.add(datamap);
                                    }
                                } else if (!checkParentList.contains(ParentExist.getStringCellValue().trim())) {
                                    datamap = new HashMap();
                                    datamap.put("rowNo", row.getCTRow().getR());
                                    datamap.put("error", "Parent email is not in org structure. Please provide valid parent email for adding users");
                                    datamap.put("columnName", "Parent Email");
                                    result.add(datamap);
                                }
                            }
                            if (ParentExist != null && row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK && row.getCell(5).getStringCellValue().trim().equals(ParentExist.getStringCellValue().trim())) {
                                datamap = new HashMap();
                                datamap.put("rowNo", row.getCTRow().getR());
                                datamap.put("error", "Parent Email and User Email cannot be same");
                                datamap.put("columnName", "Parent Email");
                                result.add(datamap);
                            }
                            if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                                employee.setFirstName(row.getCell(1).getStringCellValue().trim());
                                employee.setParentEmpId(ParentID);
                                employee.setPassword(encoder.encodedPassword("changeme"));
                            } else {
                                datamap = new HashMap();
                                datamap.put("rowNo", row.getCTRow().getR());
                                datamap.put("error", "Employee Name is empty");
                                datamap.put("columnName", "Employee Name");
                                result.add(datamap);
                            }
                            String deptValue = null;
                            if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                if (row.getCell(3).getCellType() == CellType.NUMERIC) {
                                    employee.setDepartment(row.getCell(4).getStringCellValue().trim());
                                    deptValue = row.getCell(3).getRawValue().trim();
                                } else {
                                    if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                        employee.setDepartment(row.getCell(4).getStringCellValue().trim());
                                    }
                                    deptValue = row.getCell(3).getStringCellValue().trim();
                                }
                                FindDTO findDTO = new FindDTO();
                                findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                findDTO.setDeptUniqueId(deptValue);
                                DeptDetails deptDetails1 = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                                if (null != deptDetails1 && deptDetails1.getDeptID() != null) {
                                    this.logger.debug("Department details valid");
                                } else if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                    this.logger.debug("Department Name valid");
                                } else {
                                    datamap = new HashMap();
                                    datamap.put("rowNo", row.getCTRow().getR());
                                    datamap.put("error", "Department Name is empty");
                                    datamap.put("columnName", "Department Name");
                                    result.add(datamap);
                                }
                            }
                            if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                                EmployeeDTO employeeDTO2 = new EmployeeDTO();
                                employeeDTO2.setEmailAddress(row.getCell(5).getStringCellValue().trim());
                                employeeDetails = this.employeeService.getEmployeeId(employeeDTO2);
                                this.logger.debug("Email valid");
                                if (employeeDetails != null && employeeDetails.getParentEmpId() == 0L && ParentExist != null) {
                                    if (employeeDetails.getCreateVia() != null && employeeDetails.getCreateVia().equalsIgnoreCase("UserModule")) {
                                        this.logger.debug("Employee  email  valid");
                                    } else {
                                        datamap = new HashMap();
                                        datamap.put("rowNo", row.getCTRow().getR());
                                        datamap.put("error", "Employee is a root node, adding Parent will remove the orgStructure. Please delete existing org structure and create new");
                                        datamap.put("columnName", "Parent Email");
                                        result.add(datamap);
                                    }
                                }
                            } else {
                                datamap = new HashMap();
                                datamap.put("rowNo", row.getCTRow().getR());
                                datamap.put("error", "Email is empty");
                                datamap.put("columnName", "Email");
                                result.add(datamap);
                            }
                            if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                                if (employeeDetails == null || employeeDetails.getEmpId() == 0L) {
                                    EmployeeDTO employeeDTO3 = new EmployeeDTO();
                                    employeeDTO3.setEmailAddress(row.getCell(6).getStringCellValue().trim());
                                    employeeDetails = this.employeeService.getEmployeeId(employeeDTO3);
                                }
                                if (row.getCell(5).getStringCellValue().trim().equalsIgnoreCase(row.getCell(6).getStringCellValue().trim())) {
                                    datamap = new HashMap();
                                    datamap.put("rowNo", row.getCTRow().getR());
                                    datamap.put("error", "Email already Exist");
                                    datamap.put("columnName", "Email");
                                    result.add(datamap);
                                }
                            }
                            if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                                OrganizationDetails organizationDetails = this.employeeService.findByName(row.getCell(9).getStringCellValue().trim());
                                if (organizationDetails != null) {
                                    this.logger.debug("Organization Name valid");
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
                            if (employeeDetails == null || employeeDetails.getEmpId() == 0L) {
                                ++newUserCount;
                            }
                            ++processedrows;
                            continue;
                        }
                        datamap = new HashMap();
                        datamap.put("rowNo", checkrow.getCTRow().getR());
                        datamap.put("error", "Invalid Record, please delete Row and Process");
                        result.add(datamap);
                    }
                }
                ++sheetIndex;
            }
        }
        catch (NullPointerException e) {
            datamap = new HashMap<String, Object>();
            datamap.put("rowNo", processedrows);
            datamap.put("error", "Invalid Rows Present in Excel");
            datamap.put("columnName", "Organization");
            result.add(datamap);
            String Message = "Processed " + processedrows + " out of " + totalRows;
            resultMap.put("message", Message);
            if (result != null && !result.isEmpty()) {
                resultMap.put("parsingError", result);
                resultMap.put("result", "Not-Success");
                return resultMap;
            }
            resultMap.put("result", "success");
            return resultMap;
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Map<String, Object> saveuserDetails(XSSFWorkbook orgdata) {
        int totalRows = 0;
        int processedrows = 0;
        int failedrows = 0;
        ArrayList<EmployeeDTO> employees = new ArrayList<EmployeeDTO>();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        try {
            for (int sheetIndex = 0; sheetIndex < orgdata.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet orgsheet = orgdata.getSheetAt(sheetIndex);
                    XSSFRow checkrow = null;
                if (orgsheet == null) {
                    this.logger.debug("Sheet not found");
                    continue;
                }
                totalRows = orgsheet.getPhysicalNumberOfRows();
                PasswordEncoder encoder = new PasswordEncoder();
                for (int i = 1; i < totalRows; ++i) {
                    EmployeeDTO employee = new EmployeeDTO();
                    XSSFRow row = orgsheet.getRow(i);
                    XSSFCell ParentExist = row.getCell(0);
                    long ParentID = 0L;
                    if (ParentExist == null || ParentExist.getCellType() == CellType.BLANK) {
                        employee.setParentEmpId(0L);
                    } else {
                        employee.setParentEmployeeName(row.getCell(0).getStringCellValue().trim());
                    }
                    if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                        employee.setFirstName(row.getCell(1).getStringCellValue().trim());
                        employee.setParentEmpId(ParentID);
                        employee.setPassword(encoder.encodedPassword("changeme"));
                    }
                    if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                        employee.setTitle(row.getCell(2).getStringCellValue().trim());
                    }
                    if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                        if (row.getCell(3).getCellType() == CellType.NUMERIC) {
                            employee.setDeptUniqueId(row.getCell(3).getRawValue());
                        } else if (row.getCell(3).getCellType() == CellType.STRING) {
                            employee.setDeptUniqueId(row.getCell(3).getStringCellValue().trim());
                        } else {
                            employee.setDeptUniqueId(row.getCell(3).getRawValue());
                        }
                    }
                    if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                        employee.setDepartment(row.getCell(4).getStringCellValue().trim());
                    }
                    if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                        employee.setEmailAddress(row.getCell(5).getStringCellValue().trim());
                    }
                    if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                        employee.setNewEmailAddress(row.getCell(6).getStringCellValue().trim());
                    }
                    if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                        employee.setPhoneNumber(row.getCell(7).getRawValue());
                    }
                    if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                        employee.setLocation(row.getCell(8).getStringCellValue().trim());
                    }
                    if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                        OrganizationDetails organizationDetails = new OrganizationDetails();
                        organizationDetails.setName(row.getCell(9).getStringCellValue().trim());
                        organizationDetails.setStatus("Active");
                        employee.setOrgDetails(organizationDetails);
                    }
                    employees.add(employee);
                    ++processedrows;
                }
            }
        }
        catch (Exception E) {
            ++failedrows;
            throw new RuntimeException(E);
        }
        boolean checkFlag = this.employeeService.createBulkEmployee(employees);
        if (checkFlag) {
            Employee profle = this.employeeService.getProfileDetails();
            UserThreadLocal.get().setProfile(profle);
        }
        String Message = "Processed " + processedrows + " out of " + totalRows;
        resultMap.put("no_of_failed", failedrows);
        resultMap.put("no_of_processed", processedrows);
        resultMap.put("Message", Message);
        resultMap.put("result", "Success");
        resultMap.put("message", "Import Successful");
        return resultMap;
    }

    public Map<String, Object> readDeptDetails(InputStream inputStream, String type) throws IOException {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            if (type.equals("validation")) {
                resultMap = this.checkDeptValidationForExcelSheet(myExcelBook);
            } else {
                resultMap = this.saveDepartmentDetails(myExcelBook);
                this.auditTrailService.save("Excel -Organisation Uploaded");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return resultMap;
    }

    /*
     * Could not resolve type clashes
     * Unable to fully structure code
     */
        public Map<String, Object> checkDeptValidationForExcelSheet(XSSFWorkbook orgdata) {
        int totalRows = 0;
        int processedrows = 0;
        Map<String, Object> resultMap = new HashMap<String, Object>();
        Map<String, Object> datamap = null;
        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

        try {
            for (int sheetIndex = 0; sheetIndex < orgdata.getNumberOfSheets(); ++sheetIndex) {
                XSSFRow checkrow = null;
                block43: {
                    XSSFSheet orgsheet = orgdata.getSheetAt(sheetIndex);
                    if (orgsheet == null) {
                        this.logger.debug("Sheet not found");
                        continue;
                    }
                    totalRows = orgsheet.getPhysicalNumberOfRows();
                    checkrow = orgsheet.getRow(0);
                    if (checkrow.getCell(0) == null || checkrow.getCell(0).getCellType() == CellType.BLANK) continue;
                    String checkSheet = checkrow.getCell(0).getStringCellValue().trim();
                    if (!checkSheet.equalsIgnoreCase("Parent ID")) break block43;
                    List<String> checkParentList = new ArrayList<String>();
                    for (int i = 1; i < totalRows; ++i) {
                        XSSFRow row = orgsheet.getRow(i);
                        if (row.getCell(1).getCellType() == CellType.BLANK) continue;
                        checkParentList.add(row.getCell(1).getStringCellValue().trim());
                    }
                    for (int i = 1; i < totalRows; ++i) {
                        DeptDetails deptDetails = null;
                        XSSFRow row = orgsheet.getRow(i);
                        XSSFCell ParentExist = row.getCell(0);
                        if (ParentExist == null || ParentExist.getCellType() == CellType.BLANK) {
                            OrganizationDetails organizationDetails;
                            List departmentCharts;
                            if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK && (organizationDetails = this.employeeService.findByName(row.getCell(5).getStringCellValue().trim())) != null && (departmentCharts = this.employeeService.checkDepartmentChart(Long.valueOf(organizationDetails.getId()))) != null && !departmentCharts.isEmpty()) {
                                FindDTO findDTO = new FindDTO();
                                findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                if (row.getCell(1).getCellType() == CellType.NUMERIC) {
                                    findDTO.setDeptUniqueId(row.getCell(1).getRawValue().trim());
                                } else {
                                    findDTO.setDeptUniqueId(row.getCell(1).getStringCellValue().trim());
                                }
                                DeptDetails check = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                                if (check != null && check.getDeptID() != null) {
                                    com.estrat.web.dto.DepartmentChartDTO departmentChartDTO = this.employeeService.getDepartmentMapping(check.getId());
                                    if (departmentChartDTO != null) {
                                        if (departmentChartDTO.getDeptParentId() != 0L) {
                                            datamap = new HashMap<String, Object>();
                                            datamap.put("rowNo", row.getCTRow().getR());
                                            datamap.put("error", "Root Node already exist. Please delete and create org structure.");
                                            datamap.put("columnName", "Parent ID");
                                            result.add(datamap);
                                        }
                                    } else {
                                        datamap = new HashMap<String, Object>();
                                        datamap.put("rowNo", row.getCTRow().getR());
                                        datamap.put("error", "Root Node already exist. Please delete and create org structure.");
                                        datamap.put("columnName", "Parent ID");
                                        result.add(datamap);
                                    }
                                } else {
                                    datamap = new HashMap<String, Object>();
                                    datamap.put("rowNo", row.getCTRow().getR());
                                    datamap.put("error", "Root Node already exist. Please delete and create org structure.");
                                    datamap.put("columnName", "Parent ID");
                                    result.add(datamap);
                                }
                            }
                        } else if (row.getCTRow().getR() == 2L) {
                            FindDTO findDTO = new FindDTO();
                            findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                            if (row.getCell(0).getCellType() == CellType.NUMERIC) {
                                findDTO.setDeptUniqueId(row.getCell(0).getRawValue().trim());
                            } else {
                                findDTO.setDeptUniqueId(row.getCell(0).getStringCellValue().trim());
                            }
                            DeptDetails check = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                            if (check != null && check.getDeptID() != null) {
                                this.logger.debug("valid");
                            } else {
                                datamap = new HashMap<String, Object>();
                                datamap.put("rowNo", row.getCTRow().getR());
                                datamap.put("error", "Parent Department ID is not in org structure. Please provide valid Parent Department ID for create org structure");
                                datamap.put("columnName", "Parent ID");
                                result.add(datamap);
                            }
                        } else if (!checkParentList.contains(ParentExist.getStringCellValue().trim())) {
                            datamap = new HashMap<String, Object>();
                            datamap.put("rowNo", row.getCTRow().getR());
                            datamap.put("error", "Parent Department ID is not in org structure. Please provide valid Parent Department ID for create org structure");
                            datamap.put("columnName", "Parent ID");
                            result.add(datamap);
                        }
                        if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                            FindDTO findDTO = new FindDTO();
                            findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                            if (row.getCell(1).getCellType() == CellType.NUMERIC) {
                                findDTO.setDeptUniqueId(row.getCell(1).getRawValue().trim());
                            } else {
                                findDTO.setDeptUniqueId(row.getCell(1).getStringCellValue().trim());
                            }
                            deptDetails = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                            if (deptDetails != null && deptDetails.getDeptID() != null) {
                                this.logger.debug("Department ID valid");
                            }
                        }
                        if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                            this.logger.debug("Department Name valid");
                        } else {
                            datamap = new HashMap<String, Object>();
                            datamap.put("rowNo", row.getCTRow().getR());
                            datamap.put("error", "Department Name is empty");
                            datamap.put("columnName", "Department Name");
                            result.add(datamap);
                        }
                        if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                            EmployeeDTO employeeDTO = new EmployeeDTO();
                            employeeDTO.setEmailAddress(row.getCell(3).getStringCellValue().trim());
                            EmployeeDTO employee = this.employeeService.getEmployeeId(employeeDTO);
                            if (employee != null) {
                                this.logger.info("Owner valid");
                            } else {
                                datamap = new HashMap<String, Object>();
                                datamap.put("rowNo", row.getCTRow().getR());
                                datamap.put("error", "Owner not Found : " + row.getCell(3).getStringCellValue().trim());
                                datamap.put("columnName", "Email Address");
                                result.add(datamap);
                            }
                        }
                        if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                            String email = row.getCell(4).getStringCellValue().trim();
                            List<String> emails = new ArrayList<String>();
                            if (email.contains(",")) {
                                emails = Arrays.asList(email.split("\\,"));
                            } else {
                                emails.add(email);
                            }
                            for (String emailaddress : emails) {
                                if (emailaddress.trim().isEmpty()) continue;
                                EmployeeDTO employeeDTO2 = new EmployeeDTO();
                                employeeDTO2.setEmailAddress(emailaddress.trim());
                                EmployeeDTO employee = this.employeeService.getEmployeeId(employeeDTO2);
                                if (null != employee) {
                                    this.logger.info("Member valid");
                                    continue;
                                }
                                datamap = new HashMap<String, Object>();
                                datamap.put("rowNo", row.getCTRow().getR());
                                datamap.put("error", "Member not found : " + emailaddress);
                                datamap.put("columnName", "Member");
                                result.add(datamap);
                            }
                        }
                        if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                            OrganizationDetails organizationDetails = this.employeeService.findByName(row.getCell(5).getStringCellValue().trim());
                            if (organizationDetails != null) {
                                this.logger.debug("organizationDetails valid");
                            } else {
                                datamap = new HashMap<String, Object>();
                                datamap.put("rowNo", row.getCTRow().getR());
                                datamap.put("error", "Organization is NotFound");
                                datamap.put("columnName", "Organization");
                                result.add(datamap);
                            }
                        } else {
                            datamap = new HashMap<String, Object>();
                            datamap.put("rowNo", row.getCTRow().getR());
                            datamap.put("error", "Organization is empty");
                            datamap.put("columnName", "Organization");
                            result.add(datamap);
                        }
                        ++processedrows;
                    }
                    continue;
                }
                datamap = new HashMap<String, Object>();
                datamap.put("rowNo", checkrow.getCTRow().getR());
                datamap.put("error", "This sheet is not valid Organization sheet. please select & import valid sheet");
                result.add(datamap);
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
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return resultMap;
    }

    public Map<String, Object> saveDepartmentDetails(XSSFWorkbook orgdata) {
        int totalRows = 0;
        int processedrows = 0;
        int failedrows = 0;
        ArrayList<DeptImportDTO> deptList = new ArrayList<DeptImportDTO>();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        try {
            for (int sheetIndex = 0; sheetIndex < orgdata.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet orgsheet = orgdata.getSheetAt(sheetIndex);
                    XSSFRow checkrow = null;
                if (orgsheet == null) {
                    this.logger.debug("Sheet not found");
                    continue;
                }
                totalRows = orgsheet.getPhysicalNumberOfRows();
                for (int i = 1; i < totalRows; ++i) {
                    DeptImportDTO deptImportDTO = new DeptImportDTO();
                    PasswordEncoder encoder = new PasswordEncoder();
                    XSSFRow row = orgsheet.getRow(i);
                    XSSFCell ParentExist = row.getCell(0);
                    long ParentID = 0L;
                    if (ParentExist == null || ParentExist.getCellType() == CellType.BLANK) {
                        deptImportDTO.setParentId(0L);
                    } else if (row.getCell(0).getCellType() == CellType.NUMERIC) {
                        deptImportDTO.setParentDeptID(row.getCell(0).getRawValue());
                    } else {
                        deptImportDTO.setParentDeptID(row.getCell(0).getStringCellValue().trim());
                    }
                    if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                        if (row.getCell(1).getCellType() == CellType.NUMERIC) {
                            deptImportDTO.setDeptID(row.getCell(1).getRawValue());
                        } else {
                            deptImportDTO.setDeptID(row.getCell(1).getStringCellValue().trim());
                        }
                    }
                    if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                        deptImportDTO.setDeptName(row.getCell(2).getStringCellValue().trim());
                    }
                    if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                        deptImportDTO.setEmailAddress(row.getCell(3).getStringCellValue().trim());
                    }
                    if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                        deptImportDTO.setMember(row.getCell(4).getStringCellValue().trim());
                    }
                    if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                        deptImportDTO.setOrgName(row.getCell(5).getStringCellValue().trim());
                    }
                    deptList.add(deptImportDTO);
                    ++processedrows;
                }
            }
        }
        catch (Exception E) {
            ++failedrows;
            throw new RuntimeException(E);
        }
        boolean checkFlag = this.employeeService.createBulkDeptMapping(deptList);
        if (checkFlag) {
            Employee profle = this.employeeService.getProfileDetails();
            UserThreadLocal.get().setProfile(profle);
        }
        String Message = "Processed " + processedrows + " out of " + totalRows;
        resultMap.put("no_of_failed", failedrows);
        resultMap.put("no_of_processed", processedrows);
        resultMap.put("Message", Message);
        resultMap.put("result", "Success");
        resultMap.put("message", "Import Successful");
        return resultMap;
    }

    private boolean checkEmail(String email) {
        String emailAddress;
        boolean status = false;
        List<String> emailList = Arrays.asList(email.split("\\,"));
        Iterator<String> iterator = emailList.iterator();
        while (iterator.hasNext() && (status = OrgChartReaderUtil.isValid((String)(emailAddress = iterator.next())))) {
        }
        return status;
    }

    private boolean userCheck(String email) {
        boolean status = false;
        List<String> emailList = Arrays.asList(email.split("\\,"));
        for (String emailAddress : emailList) {
            Map map = this.employeeService.checkEmail(emailAddress, "");
            if (map.containsKey("success")) {
                status = false;
                break;
            }
            status = true;
        }
        return status;
    }

    public static boolean isValid(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pat = Pattern.compile(emailRegex);
        if (email == null) {
            return false;
        }
        return pat.matcher(email).matches();
    }

    private boolean checkDeptValue(String deptValue) {
        String regex = "[0-9]+";
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(deptValue);
        return m.matches();
    }
}

