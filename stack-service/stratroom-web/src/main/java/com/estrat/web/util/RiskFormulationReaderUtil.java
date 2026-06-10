/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.FormulationRiskActivitiesDTO
 *  com.estrat.web.dto.FormulationRiskDTO
 *  com.estrat.web.dto.FormulationSubRiskDTO
 *  com.estrat.web.dto.KPIResponseDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.RiskFormulationDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.KPIService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.RiskFormulationService
 *  com.estrat.web.util.RiskFormulationReaderUtil
 *  com.estrat.web.util.RiskFormulationUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.commons.lang3.StringUtils
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

import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.FormulationRiskActivitiesDTO;
import com.estrat.web.dto.FormulationRiskDTO;
import com.estrat.web.dto.FormulationSubRiskDTO;
import com.estrat.web.dto.KPIResponseDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.RiskFormulationDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.KPIService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.RiskFormulationService;
import com.estrat.web.util.RiskFormulationUtil;
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
public class RiskFormulationReaderUtil {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private PageService pageService;
    @Autowired
    private RiskFormulationUtil riskUtil;
    @Autowired
    private RiskFormulationService riskFormulationService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    private Logger logger = LoggerFactory.getLogger(RiskFormulationReaderUtil.class);

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

    public Map<String, Object> importRiskFormulation(InputStream inputStream, String type) throws IOException {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            resultMap = type.equals("validation") ? this.checkValidationForExcelSheet(myExcelBook) : this.importFormulation(myExcelBook);
        }
        catch (Exception e) {
            this.logger.error("Exception occured", (Throwable)e);
        }
        return resultMap;
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public Map<String, Object> importFormulation(XSSFWorkbook myExcelBook) throws IOException {
        String pageName = null;
        Long PageOwner = null;
        HashMap<String, Integer> impactscore = new HashMap<String, Integer>();
        HashMap<String, Integer> likelihoodscore = new HashMap<String, Integer>();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        int proceededdocs = 0;
        int errordocs = 0;
        int createrows = 0;
        int updatedrows = 0;
        Boolean updateStatus = false;
        Boolean createStatus = false;
        Long checkupdaterowno = null;
        Long checkcreaterowno = null;
        impactscore.put("Insignificant", 1);
        impactscore.put("Minor", 2);
        impactscore.put("Moderate", 3);
        impactscore.put("Major", 4);
        impactscore.put("Catastrophic", 5);
        likelihoodscore.put("Rare", 1);
        likelihoodscore.put("Unlikely", 2);
        likelihoodscore.put("Possible", 3);
        likelihoodscore.put("Likely", 4);
        likelihoodscore.put("Almost Certain", 5);
        try {
            DataFormatter df = new DataFormatter();
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            int sheetIndex = 0;
            while (true) {
                block68: {
                    int totalRows;
                    XSSFSheet ExcelSheet;
                    block69: {
                        block66: {
                            block67: {
                                if (sheetIndex >= myExcelBook.getNumberOfSheets()) break block66;
                                ExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                                if (ExcelSheet != null) break block67;
                                this.logger.debug("Sheet not found");
                                break block68;
                            }
                            String excelSheetName = ExcelSheet.getSheetName();
                            if ("Dict".equalsIgnoreCase(excelSheetName)) break block68;
                            totalRows = ExcelSheet.getPhysicalNumberOfRows();
                            break block69;
                        }
                        resultMap.put("result", "success");
                        resultMap.put("no_of_failed", errordocs);
                        resultMap.put("no_of_processed", proceededdocs);
                        resultMap.put("no_of_created", createrows);
                        resultMap.put("no_of_updated", updatedrows);
                        resultMap.put("message", "Import Successful");
                        return resultMap;
                    }
                    for (int i = 1; i < totalRows; ++i) {
                        XSSFRow row;
                        block64: {
                            Map riskMap = null;
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
                            List kpiDTOList = ((KPIResponseDTO)this.kpiService.retrieveKpiList(String.valueOf(PageOwner), false, "").getBody()).getKpidtoList();
                            Map kpiMap = this.riskUtil.mapKPI(kpiDTOList);
                            kpiMap = kpiMap == null ? new HashMap() : kpiMap;
                            HashMap<String, Map> pageMap = new HashMap<String, Map>();
                            try {
                                String type;
                                FormulationRiskActivitiesDTO riskConsequenceDTO;
                                FormulationRiskActivitiesDTO riskActivitiesDTO;
                                FormulationSubRiskDTO riskPlanDTO;
                                FormulationSubRiskDTO causeAndConsequenceDTO;
                                FormulationRiskDTO riskDTO;
                                block76: {
                                    Long owner;
                                    block78: {
                                        block77: {
                                            block75: {
                                                Long pageId;
                                                block65: {
                                                    block73: {
                                                        block74: {
                                                            block71: {
                                                                block72: {
                                                                    block70: {
                                                                        if (RiskFormulationReaderUtil.isRowEmpty((XSSFRow)row)) {
                                                                            this.logger.debug("Row is empty");
                                                                            break block64;
                                                                        }
                                                                        owner = null;
                                                                        pageId = null;
                                                                        if (row.getCell(0) == null || row.getCell(0).getCellType() == CellType.BLANK) break block70;
                                                                        pageName = row.getCell(0).getStringCellValue().trim();
                                                                        if (row.getCell(2) == null) break block71;
                                                                        break block72;
                                                                    }
                                                                    ++errordocs;
                                                                    this.logger.debug("PageName missing");
                                                                    continue;
                                                                }
                                                                if (row.getCell(2).getCellType() == CellType.BLANK) break block71;
                                                                this.logger.info("owner valid");
                                                                if (pageName == null) break block73;
                                                                break block74;
                                                            }
                                                            ++errordocs;
                                                            this.logger.debug("Owner missing");
                                                            continue;
                                                        }
                                                        Map response = this.pageService.checkpages(pageName, PageOwner.longValue());
                                                        if (!response.containsKey("success")) {
                                                            PageDTO pageDTO1 = new PageDTO();
                                                            pageDTO1.setPageName(pageName);
                                                            pageDTO1.setCreatedBy(PageOwner.longValue());
                                                            pageDTO1.setPageType("Risk Formulation");
                                                            pageDTO1.setCreatedTime(LocalDateTime.now());
                                                            ScoreCardResponseDTO responsePage = (ScoreCardResponseDTO) (ScoreCardResponseDTO)this.pageService.saveDetails(pageDTO1).getBody();
                                                            if (Objects.nonNull(responsePage)) {
                                                                createStatus = true;
                                                                checkcreaterowno = row.getCTRow().getR();
                                                                pageId = responsePage.getPageDTO().getId();
                                                                RiskFormulationDTO formulationDTO = this.riskFormulationService.getRiskFormulation(pageId.longValue(), true);
                                                                riskMap = this.riskUtil.mapPage(formulationDTO);
                                                                String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                                                pageMap.put(key, riskMap);
                                                            }
                                                        } else {
                                                            updateStatus = true;
                                                            checkupdaterowno = row.getCTRow().getR();
                                                            String id = response.get("pageId").toString();
                                                            pageId = Long.parseLong(id);
                                                            RiskFormulationDTO saveFormulation = new RiskFormulationDTO();
                                                            saveFormulation.setId(pageId.longValue());
                                                            this.riskFormulationService.saveRiskFormulation(saveFormulation);
                                                            String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                                            if (Objects.nonNull(pageMap.get(key))) {
                                                                riskMap = (Map)pageMap.get(key);
                                                            } else {
                                                                RiskFormulationDTO formulationDTO = this.riskFormulationService.getRiskFormulation(pageId.longValue(), true);
                                                                riskMap = this.riskUtil.mapPage(formulationDTO);
                                                                pageMap.put(key, riskMap);
                                                            }
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
                                                            break block65;
                                                        }
                                                        ++errordocs;
                                                        this.logger.debug("Owner not found");
                                                    }
                                                    catch (Exception e) {
                                                        this.logger.error("Exception occured", (Throwable)e);
                                                        ++errordocs;
                                                    }
                                                    continue;
                                                }
                                                riskDTO = null;
                                                causeAndConsequenceDTO = null;
                                                riskPlanDTO = null;
                                                riskActivitiesDTO = null;
                                                riskConsequenceDTO = null;
                                                if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                                                    riskDTO = (FormulationRiskDTO)riskMap.get(row.getCell(1).getStringCellValue().trim());
                                                    riskDTO = riskDTO == null ? new FormulationRiskDTO() : riskDTO;
                                                    riskDTO.getRiskValue().put("name", row.getCell(1).getStringCellValue().trim());
                                                    riskDTO.setOwner(owner.longValue());
                                                    riskDTO.setFormulationId(pageId.longValue());
                                                    riskDTO.setCreatedBy(PageOwner.longValue());
                                                }
                                                if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                                                    riskDTO.getRiskValue().put("desc", row.getCell(1).getStringCellValue().trim());
                                                }
                                                if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                                    riskDTO.getRiskValue().put("likelihood", row.getCell(3).getStringCellValue().trim());
                                                }
                                                if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                                    riskDTO.getRiskValue().put("impact", row.getCell(4).getStringCellValue().trim());
                                                }
                                                if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK && row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                                    int impactval = (Integer)impactscore.get(row.getCell(4).getStringCellValue().trim());
                                                    int likelihoodval = (Integer)likelihoodscore.get(row.getCell(3).getStringCellValue().trim());
                                                    riskDTO.getRiskValue().put("score", impactval * likelihoodval);
                                                    riskDTO.getRiskValue().put("status", this.getstatus(impactval, likelihoodval));
                                                }
                                                if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                                                    riskDTO.getRiskValue().put("category", row.getCell(5).getStringCellValue().trim());
                                                }
                                                if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                                                    riskDTO.getRiskValue().put("dateraised", row.getCell(6).getStringCellValue().trim());
                                                }
                                                if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                                                    riskDTO.setDepartment(row.getCell(7).getStringCellValue().trim());
                                                }
                                                if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                                                    String deptValue = null;
                                                    deptValue = row.getCell(8).getCellType() == CellType.NUMERIC ? row.getCell(8).getRawValue() : (row.getCell(8).getCellType() == CellType.STRING ? row.getCell(8).getStringCellValue().trim() : row.getCell(8).getRawValue());
                                                    FindDTO findDTO = new FindDTO();
                                                    findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                                                    findDTO.setDeptUniqueId(deptValue);
                                                    DeptDetails deptDetails1 = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                                                    if (Objects.nonNull(deptDetails1) && deptDetails1.getName() != null) {
                                                        riskDTO.setDepartmentId(Long.valueOf(deptDetails1.getId()));
                                                    }
                                                }
                                                type = "";
                                                if (row.getCell(11) != null && row.getCell(11).getCellType() != CellType.BLANK) {
                                                    type = row.getCell(11).getStringCellValue().trim();
                                                }
                                                if (!"Cause".equalsIgnoreCase(type)) break block75;
                                                if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                                                    causeAndConsequenceDTO = (FormulationSubRiskDTO)riskDTO.getCauseConqMap().get(row.getCell(12).getStringCellValue().trim());
                                                    causeAndConsequenceDTO = causeAndConsequenceDTO == null ? new FormulationSubRiskDTO() : causeAndConsequenceDTO;
                                                    causeAndConsequenceDTO.getSubRiskValue().put("name", row.getCell(12).getStringCellValue().trim());
                                                    causeAndConsequenceDTO.getSubRiskValue().put("desc", row.getCell(12).getStringCellValue().trim());
                                                    causeAndConsequenceDTO.setCreatedBy(PageOwner.longValue());
                                                    causeAndConsequenceDTO.getSubRiskValue().put("type", type);
                                                    causeAndConsequenceDTO.getSubRiskValue().put("multipleowners", String.valueOf(owner));
                                                }
                                                if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK && causeAndConsequenceDTO != null) {
                                                    causeAndConsequenceDTO.getSubRiskValue().put("rating", row.getCell(13).getStringCellValue().trim());
                                                }
                                                if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK && causeAndConsequenceDTO != null) {
                                                    causeAndConsequenceDTO.setActive(new BigDecimal(row.getCell(18).getNumericCellValue()).intValue());
                                                }
                                                break block76;
                                            }
                                            if (!"Plan".equalsIgnoreCase(type)) break block77;
                                            if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                                                riskPlanDTO = (FormulationSubRiskDTO)riskDTO.getPlanMap().get(row.getCell(12).getStringCellValue().trim());
                                                riskPlanDTO = riskPlanDTO == null ? new FormulationSubRiskDTO() : riskPlanDTO;
                                                riskPlanDTO.getSubRiskValue().put("name", row.getCell(12).getStringCellValue().trim());
                                                riskPlanDTO.getSubRiskValue().put("type", type);
                                                riskPlanDTO.setCreatedBy(PageOwner.longValue());
                                                riskPlanDTO.getSubRiskValue().put("multipleowners", String.valueOf(owner));
                                            }
                                            if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                                                String action = row.getCell(14).getStringCellValue().trim();
                                                riskPlanDTO.getSubRiskValue().put("action", action);
                                            }
                                            if (row.getCell(15) != null && row.getCell(15).getCellType() != CellType.BLANK) {
                                                riskPlanDTO.getSubRiskValue().put("resolveby", row.getCell(15).getStringCellValue().trim());
                                                riskPlanDTO.getSubRiskValue().put("progressval", "0");
                                            }
                                            if ((causeAndConsequenceDTO = (FormulationSubRiskDTO)riskDTO.getCauseConqMap().get(row.getCell(9).getStringCellValue().trim())) == null) {
                                                ++errordocs;
                                                this.logger.debug("causeAndConsequenceDTO is missing");
                                                continue;
                                            }
                                            riskPlanDTO.getSubRiskValue().put("plancause", causeAndConsequenceDTO.getId());
                                            if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK && riskPlanDTO != null) {
                                                riskPlanDTO.setActive(new BigDecimal(row.getCell(18).getNumericCellValue()).intValue());
                                            }
                                            break block76;
                                        }
                                        if (!"Action".equalsIgnoreCase(type)) break block78;
                                        if (row.getCell(10) == null || row.getCell(10).getCellType() == CellType.BLANK) break block76;
                                        riskPlanDTO = (FormulationSubRiskDTO)riskDTO.getPlanMap().get(row.getCell(10).getStringCellValue().trim());
                                        if (riskPlanDTO != null) {
                                            if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                                                riskActivitiesDTO = (FormulationRiskActivitiesDTO)riskPlanDTO.getPlanActivityMap().get(row.getCell(12).getStringCellValue().trim());
                                                riskActivitiesDTO = riskActivitiesDTO == null ? new FormulationRiskActivitiesDTO() : riskActivitiesDTO;
                                                riskActivitiesDTO.getActivityValue().put("name", row.getCell(12).getStringCellValue().trim());
                                                riskActivitiesDTO.getActivityValue().put("desc", row.getCell(12).getStringCellValue().trim());
                                                riskActivitiesDTO.getActivityValue().put("multipleowners", String.valueOf(owner));
                                                riskActivitiesDTO.getActivityValue().put("type", type);
                                                riskActivitiesDTO.getActivityValue().put("id", String.valueOf(riskPlanDTO.getId()));
                                                riskActivitiesDTO.setSubRiskId(riskPlanDTO.getId());
                                                riskActivitiesDTO.setCreatedBy(PageOwner.longValue());
                                            }
                                            if (row.getCell(15) != null && row.getCell(15).getCellType() != CellType.BLANK) {
                                                riskActivitiesDTO.getActivityValue().put("resolveby", row.getCell(15).getStringCellValue().trim());
                                            }
                                            if (row.getCell(16) != null && row.getCell(16).getCellType() != CellType.BLANK) {
                                                riskActivitiesDTO.getActivityValue().put("status", row.getCell(16).getStringCellValue().trim());
                                                riskActivitiesDTO.getActivityValue().put("progress", "0");
                                            }
                                            if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK && riskActivitiesDTO != null) {
                                                riskActivitiesDTO.setActive(new BigDecimal(row.getCell(18).getNumericCellValue()).intValue());
                                            }
                                            break block76;
                                        } else {
                                            ++errordocs;
                                            this.logger.debug("Action is missing");
                                            continue;
                                        }
                                    }
                                    if ("Consequence".equalsIgnoreCase(type) && row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                                        causeAndConsequenceDTO = (FormulationSubRiskDTO)riskDTO.getCauseConqMap().get(row.getCell(9).getStringCellValue().trim());
                                        if (causeAndConsequenceDTO != null) {
                                            if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                                                riskConsequenceDTO = (FormulationRiskActivitiesDTO)causeAndConsequenceDTO.getConsequenceMap().get(row.getCell(12).getStringCellValue().trim());
                                                riskConsequenceDTO = riskConsequenceDTO == null ? new FormulationRiskActivitiesDTO() : riskConsequenceDTO;
                                                riskConsequenceDTO.getActivityValue().put("name", row.getCell(12).getStringCellValue().trim());
                                                riskConsequenceDTO.getActivityValue().put("description", row.getCell(12).getStringCellValue().trim());
                                                riskConsequenceDTO.getActivityValue().put("multipleowners", String.valueOf(owner));
                                                riskConsequenceDTO.getActivityValue().put("type", type);
                                                riskConsequenceDTO.getActivityValue().put("id", String.valueOf(owner));
                                                riskConsequenceDTO.setSubRiskId(owner.longValue());
                                                riskConsequenceDTO.setCreatedBy(PageOwner.longValue());
                                            }
                                            if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK && riskConsequenceDTO != null) {
                                                riskConsequenceDTO.getActivityValue().put("rating", row.getCell(13).getStringCellValue().trim());
                                            }
                                            if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK && riskConsequenceDTO != null) {
                                                riskConsequenceDTO.setActive(new BigDecimal(row.getCell(18).getNumericCellValue()).intValue());
                                            }
                                        } else {
                                            ++errordocs;
                                            this.logger.debug("CauseConsequence valid is missing");
                                            continue;
                                        }
                                        if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK && riskDTO != null) {
                                            riskDTO.setActive(new BigDecimal(row.getCell(17).getNumericCellValue()).intValue());
                                        }
                                    }
                                }
                                if (riskDTO.getActive() == 1 && riskDTO.getId() != 0L) {
                                    riskMap.remove(this.getValue(riskDTO.getRiskValue(), "name"));
                                    this.riskFormulationService.deleteFormulationRisk(riskDTO.getId());
                                    break block64;
                                }
                                if (riskDTO.getActive() == 0) {
                                    FormulationRiskDTO responseDTO = this.buildAndSaveRiskDetails(PageOwner, riskDTO);
                                    responseDTO.setPlanMap(riskDTO.getPlanMap());
                                    responseDTO.setCauseConqMap(riskDTO.getCauseConqMap());
                                    if ("Plan".equalsIgnoreCase(type) || "Action".equalsIgnoreCase(type)) {
                                        riskPlanDTO.setType("Plan");
                                        this.buildAndUpdateSubRiskPlanData(PageOwner.longValue(), responseDTO, riskPlanDTO, riskActivitiesDTO);
                                    } else if ("Cause".equalsIgnoreCase(type) || "Consequence".equalsIgnoreCase(type)) {
                                        causeAndConsequenceDTO.setType("Cause");
                                        this.buildAndUpdateSubRiskData(PageOwner.longValue(), responseDTO, causeAndConsequenceDTO, riskConsequenceDTO);
                                    }
                                    riskMap.put(this.getValue(responseDTO.getRiskValue(), "name"), responseDTO);
                                }
                            }
                            catch (Exception e) {
                                this.logger.error("Exception occured", (Throwable)e);
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
                ++sheetIndex;
            }
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
    }

    private String getstatus(int impact, int likelihood) {
        if ((impact == 1 || impact == 2) && likelihood == 1) {
            return "Very Low";
        }
        if (impact == 1 && likelihood == 2) {
            return "Very Low";
        }
        if ((impact == 3 || impact == 4) && likelihood == 1) {
            return "Low";
        }
        if ((impact == 2 || impact == 3) && likelihood == 2) {
            return "Low";
        }
        if (impact == 1 && likelihood == 3) {
            return "Low";
        }
        if (impact == 5 && likelihood == 1) {
            return "Tolerable";
        }
        if (impact == 4 && likelihood == 2) {
            return "Tolerable";
        }
        if ((impact == 2 || impact == 3) && likelihood == 3) {
            return "Tolerable";
        }
        if ((impact == 1 || impact == 2) && likelihood == 4) {
            return "Tolerable";
        }
        if (impact == 1 && likelihood == 5) {
            return "Tolerable";
        }
        if (impact == 5 && likelihood == 2) {
            return "High";
        }
        if ((impact == 4 || impact == 5) && likelihood == 3) {
            return "High";
        }
        if (impact == 3 && likelihood == 4) {
            return "High";
        }
        if ((impact == 2 || impact == 3) && likelihood == 5) {
            return "High";
        }
        if (impact == 5 && likelihood == 3) {
            return "Very High";
        }
        if ((impact == 4 || impact == 5) && likelihood == 4) {
            return "Very High";
        }
        if ((impact == 4 || impact == 5) && likelihood == 5) {
            return "Very High";
        }
        return "Low";
    }

    public FormulationRiskDTO buildAndSaveRiskDetails(Long pageOwner, FormulationRiskDTO riskDTO) {
        if (riskDTO.getId() != 0L) {
            riskDTO.setUpdatedBy(pageOwner.longValue());
            riskDTO.setUpdatedTime(LocalDateTime.now());
            return this.riskFormulationService.saveFormulationRisk(riskDTO);
        }
        return this.riskFormulationService.saveFormulationRisk(riskDTO);
    }

    public String getValue(Map<String, Object> inMap, String key) {
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

    public void buildAndUpdateSubRiskData(long pageOwner, FormulationRiskDTO riskDTO, FormulationSubRiskDTO causeAndConsequenceDTO, FormulationRiskActivitiesDTO consequence) {
        if (causeAndConsequenceDTO != null) {
            int active = causeAndConsequenceDTO.getActive();
            causeAndConsequenceDTO.setCreatedBy(pageOwner);
            causeAndConsequenceDTO.setRiskId(riskDTO.getId());
            if (causeAndConsequenceDTO.getId() != 0L) {
                causeAndConsequenceDTO.setUpdatedBy(pageOwner);
                causeAndConsequenceDTO.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && causeAndConsequenceDTO.getId() != 0L) {
                riskDTO.getCauseConqMap().remove(this.getValue(causeAndConsequenceDTO.getSubRiskValue(), "name"));
                this.riskFormulationService.deleteFormulationSubRisk(causeAndConsequenceDTO.getId());
            } else if (active == 0) {
                FormulationSubRiskDTO consequenceDTO = this.riskFormulationService.saveFormulationSubRisk(causeAndConsequenceDTO);
                riskDTO.getCauseConqMap().put(this.getValue(causeAndConsequenceDTO.getSubRiskValue(), "name"), consequenceDTO);
                this.buildAndUpdateConsequenceData(pageOwner, consequenceDTO, consequence);
            }
        }
    }

    public void buildAndUpdateConsequenceData(long pageOwner, FormulationSubRiskDTO andConsequenceDTO, FormulationRiskActivitiesDTO consequence) {
        if (consequence != null) {
            int active = Objects.nonNull(andConsequenceDTO.getSubRiskValue().get("active")) ? Integer.valueOf(andConsequenceDTO.getSubRiskValue().get("active").toString()) : 0;
            consequence.setCreatedBy(pageOwner);
            consequence.setSubRiskId(andConsequenceDTO.getId());
            if (consequence.getId() != 0L) {
                consequence.setUpdatedBy(pageOwner);
                consequence.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && consequence.getId() != 0L) {
                andConsequenceDTO.getConsequenceMap().remove(this.getValue(consequence.getActivityValue(), "name"));
                this.riskFormulationService.deleteFormulationRiskActivity(consequence.getId());
            } else if (active == 0) {
                FormulationRiskActivitiesDTO consequenceDTO = this.riskFormulationService.saveFormulationRiskActivities(consequence);
                andConsequenceDTO.getConsequenceMap().put(this.getValue(consequence.getActivityValue(), "name"), consequenceDTO);
            }
        }
    }

    public void buildAndUpdateSubRiskPlanData(long pageOwner, FormulationRiskDTO riskDTO, FormulationSubRiskDTO planDto, FormulationRiskActivitiesDTO action) {
        if (planDto != null) {
            int active = planDto.getActive();
            planDto.setCreatedBy(pageOwner);
            planDto.setRiskId(riskDTO.getId());
            if (planDto.getId() != 0L) {
                planDto.setUpdatedBy(pageOwner);
                planDto.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && planDto.getId() != 0L) {
                riskDTO.getPlanMap().remove(this.getValue(planDto.getSubRiskValue(), "name"));
                this.riskFormulationService.deleteFormulationSubRisk(planDto.getId());
            } else if (active == 0) {
                FormulationSubRiskDTO actionDTO = this.riskFormulationService.saveFormulationSubRisk(planDto);
                riskDTO.getPlanMap().put(this.getValue(planDto.getSubRiskValue(), "name"), actionDTO);
                this.buildAndUpdateactionData(pageOwner, actionDTO, action);
            }
        }
    }

    public void buildAndUpdateactionData(long pageOwner, FormulationSubRiskDTO actionDTO, FormulationRiskActivitiesDTO action) {
        if (action != null) {
            int active = Objects.nonNull(actionDTO.getSubRiskValue().get("active")) ? Integer.valueOf(actionDTO.getSubRiskValue().get("active").toString()) : 0;
            action.setCreatedBy(pageOwner);
            action.setSubRiskId(actionDTO.getId());
            if (action.getId() != 0L) {
                action.setUpdatedBy(pageOwner);
                action.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && action.getId() != 0L) {
                actionDTO.getPlanActivityMap().remove(this.getValue(action.getActivityValue(), "name"));
                this.riskFormulationService.deleteFormulationRiskActivity(action.getId());
            } else if (active == 0) {
                FormulationRiskActivitiesDTO actionandDTO = this.riskFormulationService.saveFormulationRiskActivities(action);
                actionDTO.getPlanActivityMap().put(this.getValue(action.getActivityValue(), "name"), actionandDTO);
            }
        }
    }

    public Map<String, Object> checkValidationForExcelSheet(XSSFWorkbook myExcelBook) {
        XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
        evaluator.evaluateAll();
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
        HashMap<String, Object> stringMap = null;
        ArrayList mapList = new ArrayList();
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
                    stringMap = new HashMap<String, Object>();
                    stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                    stringMap.put("error", "Risk Import Sheet is empty");
                    stringMap.put("rowNo", "");
                    stringMap.put("highLightcellName", "Excel-SheetName");
                    mapList.add(stringMap);
                    continue;
                }
                for (int i = 1; i < totalRows; ++i) {
                    EmployeeDTO employeeDTO;
                    EmployeeDTO employeeRequestDTO;
                    stringMap = new HashMap();
                    XSSFRow row = ExcelSheet.getRow(i);
                    try {
                        employeeRequestDTO = new EmployeeDTO();
                        if (ExcelSheet.getSheetName().contains("@")) {
                            employeeRequestDTO.setEmailAddress(ExcelSheet.getSheetName());
                        } else {
                            employeeRequestDTO.setFirstName(ExcelSheet.getSheetName());
                        }
                        employeeDTO = this.employeeService.getEmployeeId(employeeRequestDTO);
                        if (employeeDTO == null) {
                            this.logger.debug("invalid user");
                            stringMap.put("error", "PageOwner NOT found");
                            stringMap.put("highLightcellName", "Excel-SheetName");
                            stringMap.put("rowNo", row.getCTRow().getR());
                            mapList.add(stringMap);
                        } else if (employeeDTO.getFirstName() == null) {
                            this.logger.debug("invalid user");
                            stringMap.put("error", "PageOwner NOT found");
                            stringMap.put("highLightcellName", "Excel-SheetName");
                            stringMap.put("rowNo", row.getCTRow().getR());
                            mapList.add(stringMap);
                        }
                    }
                    catch (Exception e) {
                        stringMap.put("error", e.getMessage());
                        mapList.add(stringMap);
                    }
                    try {
                        if (RiskFormulationReaderUtil.isRowEmpty((XSSFRow)row)) {
                            this.logger.debug("Row is empty");
                            continue;
                        }
                        stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                        if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "RiskName is empty");
                            stringMap.put("highLightcellName", "RiskName");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(2) == null || row.getCell(2).getCellType() == CellType.BLANK) {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "Owner is empty");
                            stringMap.put("highLightcellName", "Owner");
                            mapList.add(stringMap);
                        } else {
                            employeeRequestDTO = new EmployeeDTO();
                            employeeRequestDTO.setEmailAddress(row.getCell(2).getStringCellValue().trim());
                            employeeDTO = this.employeeService.getEmployeeId(employeeRequestDTO);
                            if (employeeDTO == null) {
                                this.logger.debug("invalid user");
                                stringMap.put("error", "Owner NOT found");
                                stringMap.put("highLightcellName", "Owner");
                                stringMap.put("rowNo", row.getCTRow().getR());
                                mapList.add(stringMap);
                            } else if (employeeDTO.getFirstName() == null) {
                                this.logger.debug("invalid user");
                                stringMap.put("error", "PageOwner NOT found");
                                stringMap.put("highLightcellName", "Excel-SheetName");
                                stringMap.put("rowNo", row.getCTRow().getR());
                                mapList.add(stringMap);
                            }
                        }
                        if (row.getCell(6) == null || row.getCell(6).getCellType() == CellType.BLANK) {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "Date Raised is empty");
                            stringMap.put("highLightcellName", "Data Raised");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                            String deptValue = null;
                            deptValue = row.getCell(8).getCellType() == CellType.NUMERIC ? row.getCell(8).getRawValue() : (row.getCell(8).getCellType() == CellType.STRING ? row.getCell(8).getStringCellValue().trim() : row.getCell(8).getRawValue());
                            FindDTO findDTO = new FindDTO();
                            findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
                            findDTO.setDeptUniqueId(deptValue);
                            DeptDetails deptDetails1 = this.departmentDetailsService.findByDeptUniqueId(findDTO);
                            if (Objects.nonNull(deptDetails1) && deptDetails1.getName() != null) {
                                String deptName = null;
                                if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                                    deptName = row.getCell(7).getStringCellValue().trim();
                                    if (deptDetails1.getName().equalsIgnoreCase(deptName)) {
                                        this.logger.info("Department is valid");
                                    } else {
                                        stringMap.put("error", "Department Name is NOt Match in Database : " + deptValue);
                                        stringMap.put("rowNo", row.getCTRow().getR());
                                        stringMap.put("highLightcellName", "DepartmentUniQueID");
                                        mapList.add(stringMap);
                                    }
                                }
                            } else {
                                stringMap.put("error", "DepartmentUniQueID is NOt FOUND : " + deptValue);
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("highLightcellName", "DepartmentUniQueID");
                                mapList.add(stringMap);
                            }
                        } else {
                            stringMap.put("error", "DepartmentUniQueID is Empty");
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("highLightcellName", "DepartmentUniQueID");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(11) != null && row.getCell(11).getCellType() != CellType.BLANK) {
                            if (row.getCell(11).getStringCellValue().equals("NA")) continue;
                            if (row.getCell(12) == null || row.getCell(12).getCellType() == CellType.BLANK) {
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Type Name is empty");
                                stringMap.put("highLightcellName", "Type Name");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(11).getStringCellValue().equals("Cause") || row.getCell(11).getStringCellValue().equals("Consequence")) {
                                if (row.getCell(13) == null || row.getCell(13).getCellType() == CellType.BLANK) {
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Rating is empty");
                                    stringMap.put("highLightcellName", "Rating");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(11).getStringCellValue().equals("Consequence") && (row.getCell(9) == null || row.getCell(9).getCellType() == CellType.BLANK)) {
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Cause is empty for Consequence");
                                    stringMap.put("highLightcellName", "Cause Name");
                                    mapList.add(stringMap);
                                }
                            }
                            if ((row.getCell(11).getStringCellValue().equals("Plan") || row.getCell(11).getStringCellValue().equals("Action")) && (row.getCell(15) == null || row.getCell(15).getCellType() == CellType.BLANK)) {
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Resolve By is empty");
                                stringMap.put("highLightcellName", "Resolve By");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(11).getStringCellValue().equals("Plan")) {
                                if (row.getCell(14) == null || row.getCell(14).getCellType() == CellType.BLANK) {
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Action is empty");
                                    stringMap.put("highLightcellName", "Action");
                                    mapList.add(stringMap);
                                }
                                if (row.getCell(9) == null || row.getCell(9).getCellType() == CellType.BLANK) {
                                    stringMap.put("rowNo", row.getCTRow().getR());
                                    stringMap.put("error", "Cause is empty for Plan");
                                    stringMap.put("highLightcellName", "Cause Name");
                                    mapList.add(stringMap);
                                }
                            }
                            if (!row.getCell(11).getStringCellValue().equals("Action")) continue;
                            if (row.getCell(16) == null || row.getCell(16).getCellType() == CellType.BLANK) {
                                stringMap.put("rowNo", row.getCTRow().getR());
                                stringMap.put("error", "Status is empty");
                                stringMap.put("highLightcellName", "Status");
                                mapList.add(stringMap);
                            }
                            if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK) continue;
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "Plan Name is required");
                            stringMap.put("highLightcellName", "Plan Name");
                            mapList.add(stringMap);
                            continue;
                        }
                        stringMap.put("rowNo", row.getCTRow().getR());
                        stringMap.put("error", "Type is empty");
                        stringMap.put("highLightcellName", "Type");
                        mapList.add(stringMap);
                        continue;
                    }
                    catch (Exception e) {
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
        return resultMap;
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

