/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ActivitiesDTO
 *  com.estrat.web.dto.CommentsDTO
 *  com.estrat.web.dto.InitiativesDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.KPIDetailsDTO
 *  com.estrat.web.dto.MilestonesDTO
 *  com.estrat.web.dto.ObjectivesDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.ScoreCardDTO
 *  com.estrat.web.dto.SubInitiativesDTO
 *  com.estrat.web.service.ActivitiesService
 *  com.estrat.web.service.CommentService
 *  com.estrat.web.service.InitiativeService
 *  com.estrat.web.service.KPIService
 *  com.estrat.web.service.MilestonesService
 *  com.estrat.web.service.ObjectiveService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.ScoreCardService
 *  com.estrat.web.util.KPIReaderUtil
 *  com.estrat.web.util.UserThreadLocal
 *  com.fasterxml.jackson.core.JsonFactory
 *  com.fasterxml.jackson.databind.JsonNode
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  com.fasterxml.jackson.dataformat.yaml.YAMLFactory
 *  com.fasterxml.jackson.dataformat.yaml.YAMLMapper
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.apache.poi.ss.usermodel.CellType
 *  org.apache.poi.xssf.usermodel.XSSFRow
 *  org.apache.poi.xssf.usermodel.XSSFSheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.ActivitiesDTO;
import com.estrat.web.dto.CommentsDTO;
import com.estrat.web.dto.InitiativesDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.KPIDetailsDTO;
import com.estrat.web.dto.MilestonesDTO;
import com.estrat.web.dto.ObjectivesDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.ScoreCardDTO;
import com.estrat.web.dto.SubInitiativesDTO;
import com.estrat.web.service.ActivitiesService;
import com.estrat.web.service.CommentService;
import com.estrat.web.service.InitiativeService;
import com.estrat.web.service.KPIService;
import com.estrat.web.service.MilestonesService;
import com.estrat.web.service.ObjectiveService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.ScoreCardService;
import com.estrat.web.util.UserThreadLocal;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class KPIReaderUtil {
    @Autowired
    private KPIService kpiService;
    @Autowired
    private ScoreCardService scoreCardService;
    @Autowired
    private ObjectiveService objectiveService;
    @Autowired
    private InitiativeService initiativeService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private MilestonesService milestonesService;
    @Autowired
    private PageService pageService;
    @Autowired
    private ActivitiesService activitiesService;
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
                    this.logger.debug("Sheet not found");
                } else {
                    int totalRows = myExcelSheet.getPhysicalNumberOfRows();
                    for (int i = 1; i < totalRows; ++i) {
                        XSSFRow row = myExcelSheet.getRow(i);
                        int totalCells = row.getPhysicalNumberOfCells();
                        KPIDetailsDTO detailsDTO = new KPIDetailsDTO();
                        detailsDTO.setEmpId(Long.valueOf(UserThreadLocal.get().getProfile().getEmpId()).longValue());
                        for (int cellIndex = 0; cellIndex < cellArray.length; ++cellIndex) {
                            if (cellIndex == 2) {
                                Date cellValue = dateFormat.parse(row.getCell(cellIndex).getStringCellValue());
                                detailsDTO.setRealDateFrom(cellValue);
                                continue;
                            }
                            if (cellIndex == 10) {
                                if (row.getCell(cellIndex) == null || StringUtils.isEmpty((CharSequence)String.valueOf(row.getCell(cellIndex).getNumericCellValue()))) {
                                    detailsDTO.setOrgKey("0");
                                    continue;
                                }
                                detailsDTO.setOrgKey(new BigDecimal(row.getCell(cellIndex).getNumericCellValue()).toPlainString());
                                continue;
                            }
                            if (row.getCell(cellIndex) == null) continue;
                            if (row.getCell(cellIndex).getCellType() == CellType.STRING) {
                                String cellValue = row.getCell(cellIndex).getStringCellValue();
                                detailsDTO.getClass().getMethod(cellArray[cellIndex], String.class).invoke(detailsDTO, cellValue);
                                continue;
                            }
                            if (row.getCell(cellIndex).getCellType() == CellType.NUMERIC) {
                                double cellValue = row.getCell(cellIndex).getNumericCellValue();
                                detailsDTO.getClass().getMethod(cellArray[cellIndex], String.class).invoke(detailsDTO, String.valueOf(cellValue));
                                continue;
                            }
                            String cellValue = row.getCell(cellIndex).getStringCellValue();
                            detailsDTO.getClass().getMethod(cellArray[cellIndex], String.class).invoke(detailsDTO, cellValue);
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

    public Boolean readFileDetails(InputStream inputStream, String dtoObjects) {
        HashMap<Integer, String> columnNameMap = new HashMap<Integer, String>();
        HashMap rowMap = new HashMap();
        ArrayList<KPIDetailsDTO> detailsDTOs = new ArrayList<KPIDetailsDTO>();
        ArrayList<KPIDTO> kpidtoList = new ArrayList<KPIDTO>();
        ArrayList<ScoreCardDTO> scoreCardDTOS = new ArrayList<ScoreCardDTO>();
        ArrayList<InitiativesDTO> initiativesDTOS = new ArrayList<InitiativesDTO>();
        ArrayList<SubInitiativesDTO> subInitiativesDTOS = new ArrayList<SubInitiativesDTO>();
        ArrayList<MilestonesDTO> milestonesDTOS = new ArrayList<MilestonesDTO>();
        ArrayList<ObjectivesDTO> objectivesDTOS = new ArrayList<ObjectivesDTO>();
        ArrayList<ActivitiesDTO> activitiesDTOS = new ArrayList<ActivitiesDTO>();
        ArrayList<PageDTO> pageDTOS = new ArrayList<PageDTO>();
        ArrayList<CommentsDTO> commentsDTOS = new ArrayList<CommentsDTO>();
        Boolean status = false;
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd, yyyy");
            XSSFWorkbook myExcelBook = new XSSFWorkbook(inputStream);
            for (int sheetIndex = 0; sheetIndex < myExcelBook.getNumberOfSheets(); ++sheetIndex) {
                XSSFSheet myExcelSheet = myExcelBook.getSheetAt(sheetIndex);
                if (myExcelSheet == null) {
                    this.logger.debug("Sheet not found");
                } else {
                    XSSFRow columnHeader = myExcelSheet.getRow(0);
                    if (columnHeader != null) {
                        int columnNameSize = columnHeader.getPhysicalNumberOfCells();
                        for (int j = 0; j < columnNameSize; ++j) {
                            columnNameMap.put(j, columnHeader.getCell(j).getStringCellValue());
                        }
                    }
                    int totalRows = myExcelSheet.getPhysicalNumberOfRows();
                    for (int i = 1; i < totalRows; ++i) {
                        XSSFRow row = myExcelSheet.getRow(i);
                        int totalCells = row.getPhysicalNumberOfCells();
                        int cellSize = columnNameMap.size();
                        for (int cellIndex = 0; cellIndex < cellSize; ++cellIndex) {
                            rowMap.put(columnNameMap.get(cellIndex), row.getCell(cellIndex).getStringCellValue());
                        }
                        JsonNode jsonNodeTree = new ObjectMapper().readTree((rowMap).toString());
                        String jsonAsYaml = new YAMLMapper().writeValueAsString(jsonNodeTree);
                        ObjectMapper mapper = new ObjectMapper((JsonFactory)new YAMLFactory());
                        if (dtoObjects.equals("ScoreCardDTO")) {
                            ScoreCardDTO scoreCardDTO = (ScoreCardDTO)mapper.readValue(jsonAsYaml, ScoreCardDTO.class);
                            scoreCardDTOS.add(scoreCardDTO);
                            continue;
                        }
                        if (dtoObjects.equals("ObjectivesDTO")) {
                            ObjectivesDTO objectivesDTO = (ObjectivesDTO)mapper.readValue(jsonAsYaml, ObjectivesDTO.class);
                            objectivesDTOS.add(objectivesDTO);
                            continue;
                        }
                        if (dtoObjects.equals("KPIDTO")) {
                            KPIDTO kpidto = (KPIDTO)mapper.readValue(jsonAsYaml, KPIDTO.class);
                            kpidtoList.add(kpidto);
                            continue;
                        }
                        if (dtoObjects.equals("KPIDetailsDTO")) {
                            KPIDetailsDTO kpiDetailsDTO = (KPIDetailsDTO)mapper.readValue(jsonAsYaml, KPIDetailsDTO.class);
                            detailsDTOs.add(kpiDetailsDTO);
                            continue;
                        }
                        if (dtoObjects.equals("InitiativesDTO")) {
                            InitiativesDTO initiativesDTO = (InitiativesDTO)mapper.readValue(jsonAsYaml, InitiativesDTO.class);
                            initiativesDTOS.add(initiativesDTO);
                            continue;
                        }
                        if (dtoObjects.equals("SubInitiativesDTO")) {
                            SubInitiativesDTO subInitiativesDTO = (SubInitiativesDTO)mapper.readValue(jsonAsYaml, SubInitiativesDTO.class);
                            subInitiativesDTOS.add(subInitiativesDTO);
                            continue;
                        }
                        if (dtoObjects.equals("MilestonesDTO")) {
                            MilestonesDTO milestonesDTO = (MilestonesDTO)mapper.readValue(jsonAsYaml, MilestonesDTO.class);
                            milestonesDTOS.add(milestonesDTO);
                            continue;
                        }
                        if (dtoObjects.equals("CommentsDTO")) {
                            CommentsDTO commentsDTO = (CommentsDTO)mapper.readValue(jsonAsYaml, CommentsDTO.class);
                            commentsDTOS.add(commentsDTO);
                            continue;
                        }
                        if (dtoObjects.equals("PageDTO")) {
                            PageDTO pageDTO = (PageDTO)mapper.readValue(jsonAsYaml, PageDTO.class);
                            pageDTOS.add(pageDTO);
                            continue;
                        }
                        if (!dtoObjects.equals("ActivitiesDTO")) continue;
                        ActivitiesDTO activitiesDTO = (ActivitiesDTO)mapper.readValue(jsonAsYaml, ActivitiesDTO.class);
                        activitiesDTOS.add(activitiesDTO);
                    }
                }
                myExcelBook.close();
                if (!scoreCardDTOS.isEmpty()) {
                    for (Object _obj_scoreCardDTO : scoreCardDTOS) {
                        ScoreCardDTO scoreCardDTO = (ScoreCardDTO) _obj_scoreCardDTO;
                        this.scoreCardService.saveOrUpdateScoreCardDetails(scoreCardDTO, "Save");
                    }
                    status = true;
                    continue;
                }
                if (!objectivesDTOS.isEmpty()) {
                    for (Object _obj_objectivesDTO : objectivesDTOS) {
                        ObjectivesDTO objectivesDTO = (ObjectivesDTO) _obj_objectivesDTO;
                        this.objectiveService.saveOrUpdateObjectiveDetails(objectivesDTO, "Save");
                    }
                    status = true;
                    continue;
                }
                if (!kpidtoList.isEmpty()) {
                    for (Object _obj_kpidto : kpidtoList) {
                        KPIDTO kpidto = (KPIDTO) _obj_kpidto;
                        this.kpiService.saveOrUpdateDetails(kpidto, "Save");
                    }
                    status = true;
                    continue;
                }
                if (!detailsDTOs.isEmpty()) {
                    status = true;
                    continue;
                }
                if (!initiativesDTOS.isEmpty()) {
                    for (Object _obj_initiativesDTO : initiativesDTOS) {
                        InitiativesDTO initiativesDTO = (InitiativesDTO) _obj_initiativesDTO;
                        this.initiativeService.saveInitiatives(initiativesDTO);
                    }
                    status = true;
                    continue;
                }
                if (!subInitiativesDTOS.isEmpty()) {
                    for (Object _obj_initiativesDTO : initiativesDTOS) {
                        InitiativesDTO initiativesDTO = (InitiativesDTO) _obj_initiativesDTO;
                        this.initiativeService.saveInitiatives(initiativesDTO);
                    }
                    status = true;
                    continue;
                }
                if (!milestonesDTOS.isEmpty()) {
                    for (Object _obj_milestonesDTO : milestonesDTOS) {
                        MilestonesDTO milestonesDTO = (MilestonesDTO) _obj_milestonesDTO;
                        this.milestonesService.createMilestones(milestonesDTO);
                    }
                    status = true;
                    continue;
                }
                if (!commentsDTOS.isEmpty()) {
                    for (Object _obj_commentsDTO : commentsDTOS) {
                        CommentsDTO commentsDTO = (CommentsDTO) _obj_commentsDTO;
                        this.commentService.createComment(commentsDTO);
                    }
                    status = true;
                    continue;
                }
                if (!pageDTOS.isEmpty()) {
                    for (Object _obj_pageDTO : pageDTOS) {
                        PageDTO pageDTO = (PageDTO) _obj_pageDTO;
                        this.pageService.saveDetails(pageDTO);
                    }
                    status = true;
                    continue;
                }
                if (activitiesDTOS.isEmpty()) continue;
                for (Object _obj_activitiesDTO : activitiesDTOS) {
                    ActivitiesDTO activitiesDTO = (ActivitiesDTO) _obj_activitiesDTO;
                    this.activitiesService.saveActivity(activitiesDTO);
                }
                status = true;
            }
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return status;
    }
}

