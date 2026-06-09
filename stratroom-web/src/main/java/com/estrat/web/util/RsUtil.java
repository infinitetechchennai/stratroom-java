/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.KPIResponseDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.RiskActivitiesDTO
 *  com.estrat.web.dto.RiskCauseAndConsequenceDTO
 *  com.estrat.web.dto.RiskConsequenceDTO
 *  com.estrat.web.dto.RiskDTO
 *  com.estrat.web.dto.RiskPlanDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.KPIService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.RiskActivitiesService
 *  com.estrat.web.service.RiskCauseAndConsequenceService
 *  com.estrat.web.service.RiskDetailsService
 *  com.estrat.web.service.RiskPlanService
 *  com.estrat.web.util.RiskReaderUtil
 *  com.estrat.web.util.RiskUtil
 *  com.estrat.web.util.RsUtil
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

import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.KPIResponseDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.RiskActivitiesDTO;
import com.estrat.web.dto.RiskCauseAndConsequenceDTO;
import com.estrat.web.dto.RiskConsequenceDTO;
import com.estrat.web.dto.RiskDTO;
import com.estrat.web.dto.RiskPlanDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.KPIService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.RiskActivitiesService;
import com.estrat.web.service.RiskCauseAndConsequenceService;
import com.estrat.web.service.RiskDetailsService;
import com.estrat.web.service.RiskPlanService;
import com.estrat.web.util.RiskReaderUtil;
import com.estrat.web.util.RiskUtil;
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
public class RsUtil {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private PageService pageService;
    @Autowired
    private RiskDetailsService riskDetailsService;
    @Autowired
    private RiskPlanService riskPlanService;
    @Autowired
    private RiskCauseAndConsequenceService riskCauseAndConsequenceService;
    @Autowired
    private RiskActivitiesService riskActivitiesService;
    @Autowired
    private RiskUtil riskUtil;
    private Logger logger = LoggerFactory.getLogger(RiskReaderUtil.class);

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

    public Map<String, Object> importRisk(InputStream inputStream, String type) throws IOException {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            resultMap = type.equals("validation") ? this.checkValidationForExcelSheet(myExcelBook) : this.importRiskData(myExcelBook);
        }
        catch (Exception e) {
            this.logger.error("Exception occured", (Throwable)e);
        }
        return resultMap;
    }

    public Map<String, Object> importRiskData(XSSFWorkbook myExcelBook) throws IOException {
        String pageName = null;
        Long PageOwner = null;
        HashMap<String, Object> resultMap = new HashMap<String, Object>();
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
                int totalRows = ExcelSheet.getPhysicalNumberOfRows();
                for (int i = 1; i < totalRows; ++i) {
                    XSSFRow row;
                    block79: {
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
                            KPIDTO kpidto;
                            Long pageId;
                            Long owner;
                            block80: {
                                if (RsUtil.isRowEmpty((XSSFRow)row)) {
                                    this.logger.debug("Row is empty");
                                    break block79;
                                }
                                owner = null;
                                pageId = null;
                                if (row.getCell(0) == null || row.getCell(0).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    continue;
                                }
                                pageName = row.getCell(0).getStringCellValue().trim();
                                if (row.getCell(3) == null || row.getCell(3).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    continue;
                                }
                                this.logger.info("owner valid");
                                if (pageName != null) {
                                    List riskList;
                                    Map response = this.pageService.checkpages(pageName, PageOwner.longValue());
                                    if (!response.containsKey("success")) {
                                        PageDTO pageDTO1 = new PageDTO();
                                        pageDTO1.setPageName(pageName);
                                        pageDTO1.setCreatedBy(PageOwner.longValue());
                                        pageDTO1.setPageType("Risk");
                                        pageDTO1.setCreatedTime(LocalDateTime.now());
                                        ScoreCardResponseDTO responsePage = (ScoreCardResponseDTO) (ScoreCardResponseDTO)this.pageService.saveDetails(pageDTO1).getBody();
                                        if (Objects.nonNull(responsePage)) {
                                            createStatus = true;
                                            checkcreaterowno = row.getCTRow().getR();
                                            pageId = responsePage.getPageDTO().getId();
                                            riskList = this.riskDetailsService.findAll(String.valueOf(PageOwner), String.valueOf(pageId), "", "Risk");
                                            riskMap = this.riskUtil.mapPage(riskList);
                                            String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                            pageMap.put(key, riskMap);
                                        }
                                    } else {
                                        updateStatus = true;
                                        checkupdaterowno = row.getCTRow().getR();
                                        String id = response.get("pageId").toString();
                                        pageId = Long.parseLong(id);
                                        String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                        if (Objects.nonNull(pageMap.get(key))) {
                                            riskMap = (Map)pageMap.get(key);
                                        } else {
                                            riskList = this.riskDetailsService.findAll(String.valueOf(PageOwner), String.valueOf(pageId), "", "Risk");
                                            riskMap = this.riskUtil.mapPage(riskList);
                                            pageMap.put(key, riskMap);
                                        }
                                    }
                                }
                                try {
                                    EmployeeDTO requestEmployeeDTO = new EmployeeDTO();
                                    String ownerValue = row.getCell(3).getStringCellValue().trim();
                                    if (ownerValue.contains("@")) {
                                        requestEmployeeDTO.setEmailAddress(ownerValue);
                                    } else {
                                        requestEmployeeDTO.setFirstName(ownerValue);
                                    }
                                    EmployeeDTO ownerDTO = this.employeeService.getEmployeeId(requestEmployeeDTO);
                                    if (Objects.nonNull(ownerDTO)) {
                                        owner = ownerDTO.getEmpId();
                                        break block80;
                                    }
                                    ++errordocs;
                                }
                                catch (Exception e) {
                                    this.logger.error("Exception occured", (Throwable)e);
                                    ++errordocs;
                                }
                                continue;
                            }
                            RiskDTO riskDTO = null;
                            RiskCauseAndConsequenceDTO causeAndConsequenceDTO = null;
                            RiskPlanDTO riskPlanDTO = null;
                            RiskActivitiesDTO riskActivitiesDTO = null;
                            RiskConsequenceDTO riskConsequenceDTO = null;
                            if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                                riskDTO = (RiskDTO)riskMap.get(row.getCell(1).getStringCellValue().trim());
                                riskDTO = riskDTO == null ? new RiskDTO() : riskDTO;
                                riskDTO.getRiskValue().put("name", row.getCell(1).getStringCellValue().trim());
                                riskDTO.setOwner(owner.longValue());
                                riskDTO.setPageId(pageId.longValue());
                                riskDTO.setCreatedBy(PageOwner.longValue());
                            }
                            if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("desc", row.getCell(2).getStringCellValue().trim());
                            }
                            if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK && (kpidto = (KPIDTO)kpiMap.get(row.getCell(7).getStringCellValue().trim())) != null) {
                                riskDTO.setImpactId(kpidto.getId());
                                riskDTO.getRiskValue().put("impactDesc", kpidto.getKpiName());
                                riskDTO.getRiskValue().put("businessimpact", kpidto.getId());
                            }
                            if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("likeliHood", row.getCell(4).getStringCellValue().trim());
                            }
                            if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("impact", row.getCell(5).getStringCellValue().trim());
                            }
                            if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("riskcategory", row.getCell(6).getStringCellValue().trim());
                            }
                            if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("financialImpact", row.getCell(8).getRawValue().trim());
                            }
                            if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("dateRaised", row.getCell(9).getStringCellValue().trim());
                            }
                            if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("dateCompleted", row.getCell(10).getStringCellValue().trim());
                            }
                            if (row.getCell(11) != null && row.getCell(11).getCellType() != CellType.BLANK) {
                                riskDTO.getRiskValue().put("nextAssessment", row.getCell(11).getStringCellValue().trim());
                            }
                            String type = "";
                            if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                                type = row.getCell(12).getStringCellValue().trim();
                            }
                            if ("Plan".equalsIgnoreCase(type)) {
                                if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK) {
                                    riskPlanDTO = (RiskPlanDTO)riskDTO.getRiskPlanMap().get(row.getCell(13).getStringCellValue().trim());
                                    riskPlanDTO = riskPlanDTO == null ? new RiskPlanDTO() : riskPlanDTO;
                                    riskPlanDTO.getRiskPlanValue().put("name", row.getCell(13).getStringCellValue().trim());
                                    riskPlanDTO.setCreatedBy(PageOwner.longValue());
                                }
                                if (riskPlanDTO != null) {
                                    if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                                        riskPlanDTO.getRiskPlanValue().put("desc", row.getCell(14).getStringCellValue().trim());
                                    }
                                    if (row.getCell(15) != null && row.getCell(15).getCellType() != CellType.BLANK) {
                                        riskPlanDTO.getRiskPlanValue().put("multipleowners", this.getMultipleOwnerIds(row.getCell(15).getStringCellValue().trim()));
                                    }
                                    if (row.getCell(16) != null && row.getCell(16).getCellType() != CellType.BLANK) {
                                        riskActivitiesDTO = (RiskActivitiesDTO)riskPlanDTO.getRiskActivitiesMap().get(row.getCell(16).getStringCellValue().trim());
                                        riskActivitiesDTO = riskActivitiesDTO == null ? new RiskActivitiesDTO() : riskActivitiesDTO;
                                        riskActivitiesDTO.getRiskActivitiesValue().put("name", row.getCell(16).getStringCellValue().trim());
                                        riskActivitiesDTO.setCreatedBy(PageOwner.longValue());
                                    }
                                    if (row.getCell(19) != null && row.getCell(19).getCellType() != CellType.BLANK) {
                                        String action = row.getCell(19).getStringCellValue().trim();
                                        if (!"NA".equalsIgnoreCase(action)) {
                                            riskPlanDTO.getRiskPlanValue().put("action", action);
                                        } else {
                                            riskPlanDTO.getRiskPlanValue().put("action", "");
                                        }
                                    } else {
                                        riskPlanDTO.getRiskPlanValue().put("action", "");
                                    }
                                    if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) {
                                        riskPlanDTO.getRiskPlanValue().put("resolveDate", row.getCell(20).getStringCellValue().trim());
                                        if (riskActivitiesDTO != null) {
                                            riskActivitiesDTO.getRiskActivitiesValue().put("resolveby", row.getCell(20).getStringCellValue().trim());
                                        }
                                    } else {
                                        riskPlanDTO.getRiskPlanValue().put("resolveDate", "");
                                        if (riskActivitiesDTO != null) {
                                            riskActivitiesDTO.getRiskActivitiesValue().put("resolveby", "");
                                        }
                                    }
                                    if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                                        riskPlanDTO.getRiskPlanValue().put("progressval", row.getCell(21).getRawValue().trim());
                                        if (riskActivitiesDTO != null) {
                                            riskActivitiesDTO.getRiskActivitiesValue().put("progress", row.getCell(21).getRawValue().trim());
                                        }
                                    }
                                    if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                        String status = row.getCell(22).getStringCellValue().trim();
                                        if (!"NA".equalsIgnoreCase(status)) {
                                            riskPlanDTO.getRiskPlanValue().put("status", status);
                                        }
                                        if (riskActivitiesDTO != null) {
                                            riskActivitiesDTO.getRiskActivitiesValue().put("status", status);
                                        }
                                    }
                                    if (row.getCell(23) != null && row.getCell(23).getCellType() != CellType.BLANK) {
                                        String causeName = row.getCell(23).getStringCellValue().trim();
                                        causeAndConsequenceDTO = (RiskCauseAndConsequenceDTO)riskDTO.getRiskCauseAndConsequenceMap().get(causeName);
                                        causeAndConsequenceDTO = causeAndConsequenceDTO == null ? new RiskCauseAndConsequenceDTO() : causeAndConsequenceDTO;
                                        riskPlanDTO.getRiskPlanValue().put("cause", causeAndConsequenceDTO.getId());
                                    }
                                }
                                if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK && riskActivitiesDTO != null) {
                                    riskActivitiesDTO.getRiskActivitiesValue().put("desc", row.getCell(17).getStringCellValue().trim());
                                }
                                if (row.getCell(25) != null && row.getCell(25).getCellType() != CellType.BLANK && riskPlanDTO != null) {
                                    riskPlanDTO.setActive(new BigDecimal(row.getCell(25).getNumericCellValue()).intValue());
                                }
                                if (row.getCell(26) != null && row.getCell(26).getCellType() != CellType.BLANK && riskActivitiesDTO != null) {
                                    riskActivitiesDTO.setActive(new BigDecimal(row.getCell(26).getNumericCellValue()).intValue());
                                }
                            } else {
                                if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK) {
                                    causeAndConsequenceDTO = (RiskCauseAndConsequenceDTO)riskDTO.getRiskCauseAndConsequenceMap().get(row.getCell(13).getStringCellValue().trim());
                                    causeAndConsequenceDTO = causeAndConsequenceDTO == null ? new RiskCauseAndConsequenceDTO() : causeAndConsequenceDTO;
                                    causeAndConsequenceDTO.getCauseAndConsequenceValue().put("name", row.getCell(13).getStringCellValue().trim());
                                    causeAndConsequenceDTO.setCreatedBy(PageOwner.longValue());
                                }
                                if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                                    causeAndConsequenceDTO.getCauseAndConsequenceValue().put("description", row.getCell(14).getStringCellValue().trim());
                                }
                                if (row.getCell(16) != null && row.getCell(16).getCellType() != CellType.BLANK) {
                                    riskConsequenceDTO = (RiskConsequenceDTO)causeAndConsequenceDTO.getRiskConsequenceMap().get(row.getCell(16).getStringCellValue().trim());
                                    riskConsequenceDTO = riskConsequenceDTO == null ? new RiskConsequenceDTO() : riskConsequenceDTO;
                                    riskConsequenceDTO.getConsequenceValue().put("name", row.getCell(16).getStringCellValue().trim());
                                    riskConsequenceDTO.setCreatedBy(PageOwner.longValue());
                                }
                                if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK && riskConsequenceDTO != null) {
                                    riskConsequenceDTO.getConsequenceValue().put("description", row.getCell(17).getBooleanCellValue());
                                }
                                if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK) {
                                    if (causeAndConsequenceDTO != null) {
                                        causeAndConsequenceDTO.getCauseAndConsequenceValue().put("riskRating", row.getCell(18).getRawValue().trim());
                                    }
                                    if (riskConsequenceDTO != null) {
                                        riskConsequenceDTO.getConsequenceValue().put("riskRating", row.getCell(18).getRawValue().trim());
                                    }
                                }
                                if (row.getCell(25) != null && row.getCell(25).getCellType() != CellType.BLANK && causeAndConsequenceDTO != null) {
                                    causeAndConsequenceDTO.setActive(new BigDecimal(row.getCell(25).getNumericCellValue()).intValue());
                                }
                                if (row.getCell(26) != null && row.getCell(26).getCellType() != CellType.BLANK && riskConsequenceDTO != null) {
                                    riskConsequenceDTO.setActive(new BigDecimal(row.getCell(26).getNumericCellValue()).intValue());
                                }
                            }
                            if (row.getCell(24) != null && row.getCell(24).getCellType() != CellType.BLANK && riskDTO != null) {
                                riskDTO.setActive(new BigDecimal(row.getCell(24).getNumericCellValue()).intValue());
                            }
                            if (riskDTO.getActive() == 1 && riskDTO.getId() != 0L) {
                                riskMap.remove(this.getValue(riskDTO.getRiskValue(), "name"));
                                this.riskDetailsService.removeRiskDetails(Long.valueOf(riskDTO.getId()));
                                break block79;
                            }
                            if (riskDTO.getActive() != 0) break block79;
                            RiskDTO responseDTO = this.buildAndSaveRiskDetails(PageOwner, riskDTO);
                            responseDTO.setRiskPlanMap(riskDTO.getRiskPlanMap());
                            responseDTO.setRiskCauseAndConsequenceMap(riskDTO.getRiskCauseAndConsequenceMap());
                            if ("Plan".equalsIgnoreCase(type)) {
                                this.buildAndUpdatePlanData(PageOwner, responseDTO, riskPlanDTO, riskActivitiesDTO);
                            } else {
                                this.buildAndUpdateCauseData(PageOwner.longValue(), responseDTO, causeAndConsequenceDTO, riskConsequenceDTO);
                            }
                            riskMap.put(this.getValue(responseDTO.getRiskValue(), "name"), responseDTO);
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

    public RiskDTO buildAndSaveRiskDetails(Long pageOwner, RiskDTO riskDTO) {
        if (riskDTO.getId() != 0L) {
            riskDTO.setUpdatedBy(pageOwner.longValue());
            riskDTO.setUpdatedTime(LocalDateTime.now());
            return this.riskDetailsService.saveRisk(riskDTO).getRiskDTO();
        }
        return this.riskDetailsService.saveRisk(riskDTO).getRiskDTO();
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

    public void buildAndUpdateCauseData(long pageOwner, RiskDTO riskDTO, RiskCauseAndConsequenceDTO causeAndConsequenceDTO, RiskConsequenceDTO consequence) {
        if (causeAndConsequenceDTO != null) {
            int active = Objects.nonNull(causeAndConsequenceDTO.getCauseAndConsequenceValue().get("active")) ? Integer.valueOf(causeAndConsequenceDTO.getCauseAndConsequenceValue().get("active").toString()) : 0;
            causeAndConsequenceDTO.setCreatedBy(pageOwner);
            causeAndConsequenceDTO.setRiskId(riskDTO.getId());
            if (causeAndConsequenceDTO.getId() != 0L) {
                causeAndConsequenceDTO.setUpdatedBy(pageOwner);
                causeAndConsequenceDTO.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && causeAndConsequenceDTO.getId() != 0L) {
                riskDTO.getRiskCauseAndConsequenceMap().remove(this.getValue(causeAndConsequenceDTO.getCauseAndConsequenceValue(), "name"));
                this.riskCauseAndConsequenceService.removeRiskCauseAndConsequence(Long.valueOf(causeAndConsequenceDTO.getId()));
            } else if (active == 0) {
                RiskCauseAndConsequenceDTO consequenceDTO = this.riskCauseAndConsequenceService.saveRiskCauseAndConsequence(causeAndConsequenceDTO).getRiskCauseAndConsequenceDTO();
                riskDTO.getRiskCauseAndConsequenceMap().put(this.getValue(causeAndConsequenceDTO.getCauseAndConsequenceValue(), "name"), consequenceDTO);
                this.buildAndUpdateConsequenceData(pageOwner, consequenceDTO, consequence);
            }
        }
    }

    public void buildAndUpdateConsequenceData(long pageOwner, RiskCauseAndConsequenceDTO andConsequenceDTO, RiskConsequenceDTO consequence) {
        if (consequence != null) {
            int active = Objects.nonNull(andConsequenceDTO.getCauseAndConsequenceValue().get("active")) ? Integer.valueOf(andConsequenceDTO.getCauseAndConsequenceValue().get("active").toString()) : 0;
            consequence.setCreatedBy(pageOwner);
            consequence.setCauseConqId(andConsequenceDTO.getId());
            if (consequence.getId() != 0L) {
                consequence.setUpdatedBy(pageOwner);
                consequence.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && consequence.getId() != 0L) {
                andConsequenceDTO.getRiskConsequenceMap().remove(this.getValue(consequence.getConsequenceValue(), "name"));
                this.riskCauseAndConsequenceService.removeRiskConsequence(Long.valueOf(consequence.getId()));
            } else if (active == 0) {
                RiskConsequenceDTO consequenceDTO = this.riskCauseAndConsequenceService.saveRiskConsequence(consequence);
                andConsequenceDTO.getRiskConsequenceMap().put(this.getValue(consequence.getConsequenceValue(), "name"), consequenceDTO);
            }
        }
    }

    public void buildAndUpdatePlanData(Long pageOwner, RiskDTO riskDTO, RiskPlanDTO riskPlanDTO, RiskActivitiesDTO riskActivitiesDTO) {
        if (riskPlanDTO != null) {
            int active = Objects.nonNull(riskPlanDTO.getRiskPlanValue().get("active")) ? Integer.valueOf(riskPlanDTO.getRiskPlanValue().get("active").toString()) : 0;
            riskPlanDTO.setCreatedBy(pageOwner.longValue());
            riskPlanDTO.setRiskId(riskDTO.getId());
            riskPlanDTO.setTypeFlag("RiskPlan");
            if (riskPlanDTO.getId() != 0L) {
                riskPlanDTO.setUpdatedBy(pageOwner.longValue());
                riskPlanDTO.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && riskPlanDTO.getId() != 0L) {
                riskDTO.getRiskPlanMap().remove(this.getValue(riskPlanDTO.getRiskPlanValue(), "name"));
                this.riskPlanService.removeRiskPlan(Long.valueOf(riskPlanDTO.getId()));
            } else if (active == 0) {
                RiskPlanDTO planDTO = this.riskPlanService.saveRiskPlan(riskPlanDTO).getRiskPlanDTO();
                riskDTO.getRiskPlanMap().put(this.getValue(riskPlanDTO.getRiskPlanValue(), "name"), planDTO);
                this.buildAndUpdateActivitiesData(pageOwner, planDTO, riskActivitiesDTO);
            }
        }
    }

    public void buildAndUpdateActivitiesData(Long pageOwner, RiskPlanDTO riskPlanDTO, RiskActivitiesDTO riskActivitiesDTO) {
        if (riskActivitiesDTO != null) {
            int active = Objects.nonNull(riskActivitiesDTO.getRiskActivitiesValue().get("active")) ? Integer.valueOf(riskActivitiesDTO.getRiskActivitiesValue().get("active").toString()) : 0;
            riskActivitiesDTO.setCreatedBy(pageOwner.longValue());
            riskActivitiesDTO.setRiskPlanId(riskPlanDTO.getId());
            if (riskActivitiesDTO.getId() != 0L) {
                riskActivitiesDTO.setUpdatedBy(pageOwner.longValue());
                riskActivitiesDTO.setUpdatedTime(LocalDateTime.now());
            }
            if (active == 1 && riskPlanDTO.getId() != 0L) {
                riskPlanDTO.getRiskActivitiesMap().remove(this.getValue(riskActivitiesDTO.getRiskActivitiesValue(), "name"));
                this.riskActivitiesService.removeRiskActivities(Long.valueOf(riskActivitiesDTO.getId()));
            } else if (active == 0) {
                RiskActivitiesDTO activitiesDTO = this.riskActivitiesService.saveRiskActivities(riskActivitiesDTO).getRiskActivitiesDTO();
                riskPlanDTO.getRiskActivitiesMap().put(this.getValue(riskActivitiesDTO.getRiskActivitiesValue(), "name"), activitiesDTO);
            }
        }
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
                        if (RsUtil.isRowEmpty((XSSFRow)row)) {
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
                        if (row.getCell(9) == null || row.getCell(9).getCellType() == CellType.BLANK) {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "Date Raised is empty");
                            stringMap.put("highLightcellName", "Data Raised");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(10) == null || row.getCell(10).getCellType() == CellType.BLANK) {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "Date Completed is empty");
                            stringMap.put("highLightcellName", "Date Completed");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(11) == null || row.getCell(11).getCellType() == CellType.BLANK) {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "Next Assessment is empty");
                            stringMap.put("highLightcellName", "Next Assessment");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(12) == null || row.getCell(12).getCellType() == CellType.BLANK) {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "Type is empty");
                            stringMap.put("highLightcellName", "Type");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(13) == null || row.getCell(13).getCellType() == CellType.BLANK) {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "Type Name is empty");
                            stringMap.put("highLightcellName", "Plan Name");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(16) == null || row.getCell(16).getCellType() == CellType.BLANK) {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "Activity Name is empty");
                            stringMap.put("highLightcellName", "Activity Name");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) continue;
                        stringMap.put("rowNo", row.getCTRow().getR());
                        stringMap.put("error", "Resolved Date is empty");
                        stringMap.put("highLightcellName", "Resolved Date");
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
}

