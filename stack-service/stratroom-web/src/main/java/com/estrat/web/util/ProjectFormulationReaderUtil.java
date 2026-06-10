/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.FormulationInitiativesDTO
 *  com.estrat.web.dto.FormulationSubInitiativesDTO
 *  com.estrat.web.dto.KPIResponseDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.ProjectFormulationDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.KPIService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.ProjectFormulationService
 *  com.estrat.web.util.ProjectFormulationReaderUtil
 *  com.estrat.web.util.ProjectFormulationUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.apache.poi.ss.usermodel.Cell
 *  org.apache.poi.ss.usermodel.CellType
 *  org.apache.poi.ss.usermodel.DataFormatter
 *  org.apache.poi.ss.usermodel.FormulaEvaluator
 *  org.apache.poi.xssf.usermodel.XSSFFormulaEvaluator
 *  org.apache.poi.xssf.usermodel.XSSFRow
 *  org.apache.poi.xssf.usermodel.XSSFSheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.FormulationInitiativesDTO;
import com.estrat.web.dto.FormulationSubInitiativesDTO;
import com.estrat.web.dto.KPIResponseDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.ProjectFormulationDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.KPIService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.ProjectFormulationService;
import com.estrat.web.util.ProjectFormulationUtil;
import com.estrat.web.util.UserThreadLocal;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
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
public class ProjectFormulationReaderUtil {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private PageService pageService;
    @Autowired
    private ProjectFormulationUtil projectFormulationUtil;
    @Autowired
    private ProjectFormulationService projectFormulationService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    private Logger logger = LoggerFactory.getLogger(ProjectFormulationReaderUtil.class);

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

    public Map importProjectmulation(InputStream inputStream, String type) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            resultMap = type.equals("validation") ? this.checkValidationForExcelSheet(myExcelBook) : this.importFormulation(myExcelBook);
        }
        catch (Exception exception) {
            // empty catch block
        }
        return resultMap;
    }

    public Map importFormulation(XSSFWorkbook myExcelBook) throws IOException {
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
                    block47: {
                        Map initiativeMap = null;
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
                            ++errordocs;
                            continue;
                        }
                        List kpiDTOList = ((KPIResponseDTO)this.kpiService.retrieveKpiList(String.valueOf(PageOwner), false, "").getBody()).getKpidtoList();
                        Map kpiMap = this.projectFormulationUtil.mapKPI(kpiDTOList);
                        kpiMap = kpiMap == null ? new HashMap() : kpiMap;
                        HashMap<String, Map> pageMap = new HashMap<String, Map>();
                        try {
                            Long pageId;
                            Long owner;
                            block48: {
                                if (ProjectFormulationReaderUtil.isRowEmpty((XSSFRow)row)) {
                                    this.logger.debug("Row is empty");
                                    break block47;
                                }
                                owner = null;
                                pageId = null;
                                if (row.getCell(0) == null || row.getCell(0).getCellType() == CellType.BLANK) {
                                    this.logger.debug("PageName empty");
                                    ++errordocs;
                                    continue;
                                }
                                pageName = row.getCell(0).getStringCellValue().trim();
                                if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    continue;
                                }
                                this.logger.info("Initiative valid");
                                if (row.getCell(2) == null || row.getCell(2).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    continue;
                                }
                                this.logger.info("owner valid");
                                if (row.getCell(3) == null || row.getCell(3).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    continue;
                                }
                                this.logger.info("StartDate EndDate valid");
                                if (row.getCell(4) == null || row.getCell(4).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    continue;
                                }
                                this.logger.info("Department valid");
                                if (row.getCell(5) == null || row.getCell(5).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    continue;
                                }
                                this.logger.info("DepartmentUniQueId valid");
                                if (pageName != null) {
                                    Map response = this.pageService.checkpages(pageName, PageOwner.longValue());
                                    if (!response.containsKey("success")) {
                                        PageDTO pageDTO1 = new PageDTO();
                                        pageDTO1.setPageName(pageName);
                                        pageDTO1.setCreatedBy(PageOwner.longValue());
                                        pageDTO1.setPageType("Project Formulation");
                                        pageDTO1.setCreatedTime(LocalDateTime.now());
                                        ScoreCardResponseDTO responsePage = (ScoreCardResponseDTO) (ScoreCardResponseDTO)this.pageService.saveDetails(pageDTO1).getBody();
                                        if (Objects.nonNull(responsePage)) {
                                            createStatus = true;
                                            checkcreaterowno = row.getCTRow().getR();
                                            pageId = responsePage.getPageDTO().getId();
                                            ProjectFormulationDTO projectFormulationDTO = this.projectFormulationService.getProjectFormulation(pageId.longValue(), String.valueOf(true));
                                            initiativeMap = this.projectFormulationUtil.mapPage(projectFormulationDTO.getInitiativesList());
                                            String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                            pageMap.put(key, initiativeMap);
                                        }
                                    } else {
                                        updateStatus = true;
                                        checkupdaterowno = row.getCTRow().getR();
                                        String id = response.get("pageId").toString();
                                        pageId = Long.parseLong(id);
                                        ProjectFormulationDTO saveFormulation = new ProjectFormulationDTO();
                                        saveFormulation.setId(pageId.longValue());
                                        this.projectFormulationService.saveProjectFormulation(saveFormulation);
                                        String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                        if (Objects.nonNull(pageMap.get(key))) {
                                            initiativeMap = (Map)pageMap.get(key);
                                        } else {
                                            ProjectFormulationDTO projectFormulationDTO = this.projectFormulationService.getProjectFormulation(pageId.longValue(), String.valueOf(true));
                                            initiativeMap = this.projectFormulationUtil.mapPage(projectFormulationDTO.getInitiativesList());
                                            pageMap.put(key, initiativeMap);
                                        }
                                    }
                                }
                                try {
                                    EmployeeDTO requestEmployeeDTO = new EmployeeDTO();
                                    requestEmployeeDTO.setEmailAddress(row.getCell(2).getStringCellValue().trim());
                                    EmployeeDTO ownerDTO = this.employeeService.getEmployeeId(requestEmployeeDTO);
                                    if (Objects.nonNull(ownerDTO)) {
                                        owner = ownerDTO.getEmpId();
                                        break block48;
                                    }
                                    this.logger.debug("owner issue");
                                    ++errordocs;
                                }
                                catch (Exception e) {
                                    this.logger.debug("owner issue");
                                    ++errordocs;
                                }
                                continue;
                            }
                            FormulationInitiativesDTO initiativesDTO = null;
                            HashMap typeMap = null;
                            if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                                initiativesDTO = (FormulationInitiativesDTO)initiativeMap.get(row.getCell(1).getStringCellValue().trim());
                                initiativesDTO = initiativesDTO == null ? new FormulationInitiativesDTO() : initiativesDTO;
                                initiativesDTO.getInitiativeValue().put("name", row.getCell(1).getStringCellValue().trim());
                                initiativesDTO.setOwner(owner.longValue());
                                initiativesDTO.setFormulationId(pageId.longValue());
                                initiativesDTO.setCreatedBy(PageOwner.longValue());
                                initiativesDTO.getInitiativeValue().put("type", "Initiative");
                                typeMap = new HashMap();
                            }
                            if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("daterange", row.getCell(3).getStringCellValue().trim());
                                initiativesDTO.getInitiativeValue().put("actual", true);
                                initiativesDTO.getInitiativeValue().put("target", true);
                                initiativesDTO.getInitiativeValue().put("budget", true);
                                initiativesDTO.getInitiativeValue().put("forecast", true);
                                initiativesDTO.getInitiativeValue().put("total", true);
                                initiativesDTO.getInitiativeValue().put("utilized", true);
                                initiativesDTO.getInitiativeValue().put("balance", true);
                            }
                            if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                initiativesDTO.setDepartment(row.getCell(4).getStringCellValue().trim());
                            }
                            if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                                String deptValue = null;
                                deptValue = row.getCell(5).getCellType() == CellType.NUMERIC ? row.getCell(5).getRawValue() : (row.getCell(5).getCellType() == CellType.STRING ? row.getCell(5).getStringCellValue().trim() : row.getCell(5).getRawValue());
                                FindDTO findDTO = new FindDTO();
                                findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                findDTO.setDeptUniqueId(deptValue);
                                DeptDetails deptDetails1 = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                                if (Objects.nonNull(deptDetails1) && deptDetails1.getName() != null) {
                                    initiativesDTO.setDepartmentId(Long.valueOf(deptDetails1.getId()));
                                }
                            }
                            if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                                initiativesDTO.setActive(new BigDecimal(row.getCell(12).getNumericCellValue()).intValue());
                            }
                            if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("Total", row.getCell(6).getRawValue());
                            }
                            if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                                typeMap.put("type", row.getCell(7).getStringCellValue().trim());
                            }
                            if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                                typeMap.put("name", row.getCell(8).getStringCellValue().trim());
                            }
                            if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                                typeMap.put("owners", row.getCell(9).getStringCellValue().trim());
                            }
                            if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK) {
                                typeMap.put("daterange", row.getCell(10).getStringCellValue().trim());
                            }
                            if (row.getCell(11) != null && row.getCell(11).getCellType() != CellType.BLANK) {
                                typeMap.put("mileStoneDateRange", row.getCell(11).getStringCellValue().trim());
                            }
                            if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK) {
                                typeMap.put("active", String.valueOf(Integer.valueOf(new BigDecimal(row.getCell(13).getNumericCellValue()).intValue())));
                            }
                            if (initiativesDTO.getActive() == 1 && initiativesDTO.getId() != 0L) {
                                initiativeMap.remove(this.getValue(initiativesDTO.getInitiativeValue(), "name"));
                                this.projectFormulationService.deleteFormulationInitiatives(initiativesDTO.getId());
                                break block47;
                            }
                            if (initiativesDTO.getActive() != 0) break block47;
                            FormulationInitiativesDTO responseDTO = this.buildAndSaveInitiaitiveDetails(PageOwner, initiativesDTO);
                            responseDTO.setSubInitiativeMap(initiativesDTO.getSubInitiativeMap());
                            responseDTO.setActivitiesMap(initiativesDTO.getActivitiesMap());
                            responseDTO.setMileStonesMap(initiativesDTO.getMileStonesMap());
                            this.buildAndUpdateTypeData(PageOwner, pageId, responseDTO, typeMap);
                            initiativeMap.put(this.getValue(responseDTO.getInitiativeValue(), "name"), responseDTO);
                        }
                        catch (Exception e) {
                            e.printStackTrace();
                            this.logger.debug("someexception issue");
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
            throw new RuntimeException(e);
        }
        finally {
            if (myExcelBook != null) {
                myExcelBook.close();
            }
        }
        return resultMap;
    }

    public FormulationInitiativesDTO buildAndSaveInitiaitiveDetails(Long pageOwner, FormulationInitiativesDTO initiativesDTO) {
        if (initiativesDTO.getId() != 0L) {
            initiativesDTO.setUpdatedBy(pageOwner.longValue());
            initiativesDTO.setUpdatedTime(LocalDateTime.now());
            return this.projectFormulationService.saveFormulationInitiatives(initiativesDTO);
        }
        return this.projectFormulationService.saveFormulationInitiatives(initiativesDTO);
    }

    public String getValue(Map inMap, String key) {
        String value = Objects.nonNull(inMap) && Objects.nonNull(inMap.get(key)) ? inMap.get(key).toString() : "";
        return value;
    }

    private String getMultipleOwnerIds(String multipleOwnerEmails) {
        StringBuffer owners = new StringBuffer();
        Stream.of(multipleOwnerEmails.split(",")).forEach(owner -> {
            EmployeeDTO employeeDTO = new EmployeeDTO();
            employeeDTO.setEmailAddress(owner);
            EmployeeDTO response = this.employeeService.getEmployeeId(employeeDTO);
            if (response != null) {
                owners.append(response.getEmpId());
                owners.append(",");
            }
        });
        return StringUtils.isNotEmpty((CharSequence)owners.toString()) ? owners.substring(0, owners.lastIndexOf(",")) : "";
    }

    public void buildAndUpdateTypeData(Long pageOwner, Long pageId, FormulationInitiativesDTO initiativesDTO, Map typeMap) {
        if (Objects.nonNull(typeMap.get("type"))) {
            HashMap<String, FormulationSubInitiativesDTO> map;
            FormulationSubInitiativesDTO subInitiativeRowDTO;
            HashMap stringObjectMap;
            int active;
            String type = typeMap.get("type").toString();
            int n = active = Objects.nonNull(typeMap.get("active")) ? Integer.valueOf(typeMap.get("active").toString()) : 0;
            if ("Sub Initiative".equalsIgnoreCase(type)) {
                stringObjectMap = new HashMap();
                stringObjectMap.put("name", this.getValue(typeMap, "name"));
                FormulationSubInitiativesDTO subInitiativesDTO = Objects.nonNull(initiativesDTO.getSubInitiativeMap()) ? (FormulationSubInitiativesDTO)initiativesDTO.getSubInitiativeMap().get(this.getValue(typeMap, "name")) : new FormulationSubInitiativesDTO();
                subInitiativesDTO = subInitiativesDTO == null ? new FormulationSubInitiativesDTO() : subInitiativesDTO;
                subInitiativesDTO.setType("Sub initiative");
                subInitiativesDTO.setCreatedBy(pageOwner.longValue());
                subInitiativesDTO.setInitiativeId(initiativesDTO.getId());
                stringObjectMap.put("progressval", this.getValue(typeMap, "progress"));
                stringObjectMap.put("progress", this.getValue(typeMap, "progress"));
                stringObjectMap.put("daterange", this.getValue(typeMap, "daterange"));
                stringObjectMap.put("description", this.getValue(typeMap, "description"));
                stringObjectMap.put("multipleowners", this.getMultipleOwnerIds(this.getValue(typeMap, "owners")));
                subInitiativesDTO.setSubInitiativeValue(stringObjectMap);
                if (subInitiativesDTO.getId() != 0L) {
                    subInitiativesDTO.setUpdatedBy(pageOwner.longValue());
                    subInitiativesDTO.setUpdatedTime(LocalDateTime.now());
                }
                if (active == 1 && subInitiativesDTO.getId() != 0L) {
                    initiativesDTO.getSubInitiativeMap().remove(this.getValue(typeMap, "name"));
                    this.projectFormulationService.deleteFormulationSubInitiatives(subInitiativesDTO.getId());
                } else if (active == 0) {
                    subInitiativeRowDTO = this.projectFormulationService.saveFormulationSubInitiatives(subInitiativesDTO);
                    if (initiativesDTO.getSubInitiativeMap() != null) {
                        initiativesDTO.getSubInitiativeMap().put(this.getValue(typeMap, "name"), subInitiativeRowDTO);
                    } else {
                        map = new HashMap();
                        map.put(this.getValue(typeMap, "name"), subInitiativeRowDTO);
                        initiativesDTO.setSubInitiativeMap(map);
                    }
                }
            }
            if ("Activities".equalsIgnoreCase(type)) {
                stringObjectMap = new HashMap();
                stringObjectMap.put("name", this.getValue(typeMap, "name"));
                FormulationSubInitiativesDTO activitiesDTO = Objects.nonNull(initiativesDTO.getActivitiesMap()) ? (FormulationSubInitiativesDTO)initiativesDTO.getActivitiesMap().get(this.getValue(typeMap, "name")) : new FormulationSubInitiativesDTO();
                activitiesDTO = activitiesDTO == null ? new FormulationSubInitiativesDTO() : activitiesDTO;
                activitiesDTO.setType("Activity");
                activitiesDTO.setCreatedBy(pageOwner.longValue());
                activitiesDTO.setInitiativeId(initiativesDTO.getId());
                stringObjectMap.put("progressval", "0");
                stringObjectMap.put("progress", "0");
                stringObjectMap.put("multipleowners", this.getMultipleOwnerIds(this.getValue(typeMap, "owners")));
                stringObjectMap.put("desc", this.getValue(typeMap, "name"));
                stringObjectMap.put("daterange", this.getValue(typeMap, "daterange"));
                stringObjectMap.put("status", "Pending");
                activitiesDTO.setSubInitiativeValue(stringObjectMap);
                if (activitiesDTO.getId() != 0L) {
                    activitiesDTO.setUpdatedBy(pageOwner.longValue());
                    activitiesDTO.setUpdatedTime(LocalDateTime.now());
                }
                if (active == 1 && activitiesDTO.getId() != 0L) {
                    initiativesDTO.getActivitiesMap().remove(this.getValue(typeMap, "name"));
                    this.projectFormulationService.deleteFormulationSubInitiatives(activitiesDTO.getId());
                } else if (active == 0) {
                    subInitiativeRowDTO = this.projectFormulationService.saveFormulationSubInitiatives(activitiesDTO);
                    if (initiativesDTO.getSubInitiativeMap() != null) {
                        initiativesDTO.getActivitiesMap().put(this.getValue(typeMap, "name"), subInitiativeRowDTO);
                    } else {
                        map = new HashMap();
                        map.put(this.getValue(typeMap, "name"), subInitiativeRowDTO);
                        initiativesDTO.setActivitiesMap(map);
                    }
                }
            }
            if ("MileStone".equalsIgnoreCase(type)) {
                stringObjectMap = new HashMap();
                stringObjectMap.put("name", this.getValue(typeMap, "name"));
                FormulationSubInitiativesDTO milestonesDTO = Objects.nonNull(initiativesDTO.getMileStonesMap()) ? (FormulationSubInitiativesDTO)initiativesDTO.getMileStonesMap().get(this.getValue(typeMap, "name")) : new FormulationSubInitiativesDTO();
                milestonesDTO = milestonesDTO == null ? new FormulationSubInitiativesDTO() : milestonesDTO;
                milestonesDTO.setType("Milestone");
                milestonesDTO.setCreatedBy(pageOwner.longValue());
                milestonesDTO.setInitiativeId(initiativesDTO.getId());
                stringObjectMap.put("progress", "0");
                stringObjectMap.put("desc", this.getValue(typeMap, "name"));
                stringObjectMap.put("status", "Pending");
                stringObjectMap.put("daterange", this.getValue(typeMap, "mileStoneDateRange"));
                milestonesDTO.setSubInitiativeValue(stringObjectMap);
                if (milestonesDTO.getId() != 0L) {
                    milestonesDTO.setUpdatedBy(pageOwner.longValue());
                    milestonesDTO.setUpdatedTime(LocalDateTime.now());
                }
                if (active == 1 && milestonesDTO.getId() != 0L) {
                    initiativesDTO.getMileStonesMap().remove(this.getValue(typeMap, "name"));
                    this.projectFormulationService.deleteFormulationSubInitiatives(milestonesDTO.getId());
                } else if (active == 0) {
                    subInitiativeRowDTO = this.projectFormulationService.saveFormulationSubInitiatives(milestonesDTO);
                    if (initiativesDTO.getSubInitiativeMap() != null) {
                        initiativesDTO.getMileStonesMap().put(this.getValue(typeMap, "name"), subInitiativeRowDTO);
                    } else {
                        map = new HashMap<String, FormulationSubInitiativesDTO>();
                        map.put(this.getValue(typeMap, "name"), subInitiativeRowDTO);
                        initiativesDTO.setMileStonesMap(map);
                    }
                }
            }
        }
    }

    public Map checkValidationForExcelSheet(XSSFWorkbook myExcelBook) {
        DataFormatter df = new DataFormatter();
        XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
        evaluator.evaluateAll();
        HashMap resultMap = new HashMap();
        Map stringMap = null;
        ArrayList<Map> mapList = new ArrayList<Map>();
        try {
            for (int sheetIndex = 0; sheetIndex < myExcelBook.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet ExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                if (ExcelSheet == null) {
                    this.logger.debug("Sheet not found");
                    continue;
                }
                String excelSheetName = ExcelSheet.getSheetName();
                if ("Dict".equalsIgnoreCase(excelSheetName)) continue;
                int totalRows = ExcelSheet.getPhysicalNumberOfRows();
                if (totalRows == 1) {
                    stringMap = new HashMap();
                    stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                    stringMap.put("error", "Initiative Import Sheet is empty");
                    stringMap.put("rowNo", "");
                    stringMap.put("highLightcellName", "Excel-SheetName");
                    mapList.add(stringMap);
                    continue;
                }
                for (int i = 1; i < totalRows; ++i) {
                    stringMap = new HashMap();
                    XSSFRow row = ExcelSheet.getRow(i);
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
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("error", "PageOwner NOT found");
                            stringMap.put("highLightcellName", "Excel-SheetName");
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            mapList.add(stringMap);
                        }
                    }
                    catch (Exception e) {
                        stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                        stringMap.put("error", e.getMessage());
                        mapList.add(stringMap);
                    }
                    try {
                        if (ProjectFormulationReaderUtil.isRowEmpty((XSSFRow)row)) {
                            this.logger.debug("Row is empty");
                            continue;
                        }
                        if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                            this.logger.info("Initiative valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "PageName is empty");
                            stringMap.put("highLightcellName", "PageName");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                            this.logger.info("Initiative valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Initiative Name is empty");
                            stringMap.put("highLightcellName", "Initiative Name");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                            try {
                                EmployeeDTO requestEmployeeDTO = new EmployeeDTO();
                                requestEmployeeDTO.setEmailAddress(row.getCell(2).getStringCellValue().trim());
                                EmployeeDTO ownerDTO = this.employeeService.getEmployeeId(requestEmployeeDTO);
                                if (!Objects.nonNull(ownerDTO)) {
                                    stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("error", "Owner NOT Found");
                                    stringMap.put("highLightcellName", "Owner");
                                    mapList.add(stringMap);
                                }
                            }
                            catch (Exception e) {
                                stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("error", e.getMessage());
                                stringMap.put("highLightcellName", "Owner");
                                mapList.add(stringMap);
                            }
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Owner is empty");
                            stringMap.put("highLightcellName", "Owner");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                            this.logger.info("StartDate EndDate valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("error", "Planned Start Date/End Date is empty");
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("highLightcellName", "Planned Start Date/End Date");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                            String deptValue = null;
                            deptValue = row.getCell(5).getCellType() == CellType.NUMERIC ? row.getCell(5).getRawValue() : (row.getCell(5).getCellType() == CellType.STRING ? row.getCell(5).getStringCellValue().trim() : row.getCell(5).getRawValue());
                            FindDTO findDTO = new FindDTO();
                            findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                            findDTO.setDeptUniqueId(deptValue);
                            DeptDetails deptDetails1 = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                            if (Objects.nonNull(deptDetails1) && deptDetails1.getName() != null) {
                                String deptName = null;
                                if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                    deptName = row.getCell(4).getStringCellValue().trim();
                                    if (deptDetails1.getName().equalsIgnoreCase(deptName)) {
                                        this.logger.info("Department is valid");
                                    } else {
                                        stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                        stringMap.put("error", "Department Name is NOt Match in Database : " + deptValue);
                                        stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                        stringMap.put("highLightcellName", "DepartmentUniQueID");
                                        mapList.add(stringMap);
                                    }
                                }
                            } else {
                                stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("error", "DepartmentUniQueID is NOt FOUND : " + deptValue);
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("highLightcellName", "DepartmentUniQueID");
                                mapList.add(stringMap);
                            }
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("error", "DepartmentUniQueID is Empty");
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("highLightcellName", "DepartmentUniQueID");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                            if (row.getCell(7).getStringCellValue().equals("Sub Initiative") || row.getCell(7).getStringCellValue().equals("Activities")) {
                                if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                                    this.logger.info("Name is valid");
                                } else {
                                    stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Type Name is Empty");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("highLightcellName", "Type Name");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                                    if (!this.employeepresent(row.getCell(9).getStringCellValue())) {
                                        stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                        stringMap.put("error", "Type Owner is not valid");
                                        stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                        stringMap.put("highLightcellName", "Type Owner");
                                        mapList.add(stringMap);
                                    }
                                } else {
                                    stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Type Owner is Empty");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("highLightcellName", "Type Owner");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK) {
                                    this.logger.info("Type Start - End Date is valid");
                                } else {
                                    stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Type Start - End Date is Missing");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("highLightcellName", "Type Start - End Date");
                                    mapList.add(stringMap);
                                }
                            } else if (row.getCell(7).getStringCellValue().equals("MileStone")) {
                                if (row.getCell(11) != null && row.getCell(11).getCellType() != CellType.BLANK) {
                                    this.logger.info("MileStone Date is valid");
                                } else {
                                    stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "MileStone Date is Missing");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("highLightcellName", "MileStone Date");
                                    mapList.add(stringMap);
                                }
                            }
                            this.logger.info("Type is valid");
                            continue;
                        }
                        stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                        stringMap.put("error", "Type is Empty");
                        stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                        stringMap.put("highLightcellName", "Type");
                        mapList.add(stringMap);
                        continue;
                    }
                    catch (Exception e) {
                        stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                        stringMap.put("error", e.getMessage());
                        stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
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
        return resultMap;
    }

    private boolean employeepresent(String emails) {
        Boolean[] ownerfound = new Boolean[]{false};
        Stream.of(emails.split(",")).forEach(owner -> {
            EmployeeDTO requestEmployeeDTO = new EmployeeDTO();
            requestEmployeeDTO.setEmailAddress(owner);
            EmployeeDTO ownerDTO = this.employeeService.getEmployeeId(requestEmployeeDTO);
            ownerfound[0] = Objects.nonNull(ownerDTO) ? Boolean.valueOf(true) : Boolean.valueOf(false);
        });
        return ownerfound[0] != false;
    }

    public Map getWriteDocForInitiatives(XSSFRow row, DataFormatter df, FormulaEvaluator evaluator, String excelSheetName) {
        HashMap map = new HashMap();
        map.put("Excel_SheetName", excelSheetName);
        evaluator.evaluateAll();
        try {
            if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                map.put("pageName", row.getCell(0).getStringCellValue().trim());
            } else {
                map.put("pageName", "");
            }
            if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                map.put("initiativeName", row.getCell(1).getStringCellValue().trim());
            } else {
                map.put("initiativeName", "");
            }
            if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                map.put("owner", row.getCell(2).getStringCellValue().trim());
            } else {
                map.put("owner", "");
            }
            if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                map.put("department", row.getCell(4).getStringCellValue().trim());
            } else {
                map.put("department", "");
            }
            if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                map.put("type", row.getCell(6).getRawValue());
            } else {
                map.put("type", "");
            }
            if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                map.put("typeName", row.getCell(7).getStringCellValue().trim());
            } else {
                map.put("typeName", "");
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

