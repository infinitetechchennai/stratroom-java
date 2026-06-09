/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ActivitiesDTO
 *  com.estrat.web.dto.ActivitiesMapDTO
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.dto.DeptDetails
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.InitiativeBudgetDTO
 *  com.estrat.web.dto.InitiativesDTO
 *  com.estrat.web.dto.InitiativesTrackerDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.KPIResponseDTO
 *  com.estrat.web.dto.MilestonesDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.ScoreCardResponseDTO
 *  com.estrat.web.dto.SubActivitiesDTO
 *  com.estrat.web.dto.SubInitiativesDTO
 *  com.estrat.web.dto.SubInitiativesMapDTO
 *  com.estrat.web.service.ActivitiesService
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.service.DepartmentDetailsService
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.InitiativeService
 *  com.estrat.web.service.KPIService
 *  com.estrat.web.service.MilestonesService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.SubActivitiesService
 *  com.estrat.web.service.SubInitiativeService
 *  com.estrat.web.util.InitiativesReaderUtil
 *  com.estrat.web.util.InitiativesUtil
 *  com.estrat.web.util.RepositoryServices
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.apache.poi.ss.usermodel.Cell
 *  org.apache.poi.ss.usermodel.CellStyle
 *  org.apache.poi.ss.usermodel.CellType
 *  org.apache.poi.ss.usermodel.CreationHelper
 *  org.apache.poi.ss.usermodel.DataFormatter
 *  org.apache.poi.ss.usermodel.DateUtil
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
 *  org.springframework.core.io.ByteArrayResource
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.MediaType
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Component
 *  org.springframework.util.MultiValueMap
 */
package com.estrat.web.util;

import com.estrat.web.dto.ActivitiesDTO;
import com.estrat.web.dto.ActivitiesMapDTO;
import com.estrat.web.dto.ControlPanelGeneralDTO;
import com.estrat.web.dto.DeptDetails;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.InitiativeBudgetDTO;
import com.estrat.web.dto.InitiativesDTO;
import com.estrat.web.dto.InitiativesTrackerDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.KPIResponseDTO;
import com.estrat.web.dto.MilestonesDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.ScoreCardResponseDTO;
import com.estrat.web.dto.SubActivitiesDTO;
import com.estrat.web.dto.SubInitiativesDTO;
import com.estrat.web.dto.SubInitiativesMapDTO;
import com.estrat.web.service.ActivitiesService;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.service.DepartmentDetailsService;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.InitiativeService;
import com.estrat.web.service.KPIService;
import com.estrat.web.service.MilestonesService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.SubActivitiesService;
import com.estrat.web.service.SubInitiativeService;
import com.estrat.web.util.InitiativesUtil;
import com.estrat.web.util.RepositoryServices;
import com.estrat.web.util.UserThreadLocal;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
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
public class InitiativesReaderUtil {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private PageService pageService;
    @Autowired
    private InitiativeService initiativeService;
    @Autowired
    private SubInitiativeService subInitiativeService;
    @Autowired
    private ActivitiesService activitiesService;
    @Autowired
    private MilestonesService milestonesService;
    @Autowired
    private InitiativesUtil initiativeUtil;
    @Autowired
    protected RepositoryServices repositoryServices;
    @Autowired
    protected AuditTrailService auditTrailService;
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    protected DepartmentDetailsService departmentDetailsService;
    @Autowired
    protected SubActivitiesService subActivitiesService;
    public static final String S3_ASSET_PATHS_INITIATIVE = "/InitiativeImportDataFile";
    private static final String SUFFIX = "/";
    private Logger logger = LoggerFactory.getLogger(InitiativesReaderUtil.class);

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

    public Map importBulkInitiativesDetails(InputStream inputStream, String type) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            DataFormatter df = new DataFormatter();
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            if (type.equals("validation")) {
                resultMap = this.checkValidationForExcelSheet(myExcelBook);
            } else {
                resultMap = this.importBulkInitiatives(myExcelBook);
                this.auditTrailService.save("Excel-Initiative Upload");
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        return resultMap;
    }

    public Map importInitiativesData(InputStream inputStream, String type) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            DataFormatter df = new DataFormatter();
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            if (type.equals("validation")) {
                resultMap = this.checkValidationForExcelSheetData(myExcelBook);
            } else {
                resultMap = this.importInitiativesData(myExcelBook);
                this.auditTrailService.save("Excel-Initiative Data Upload");
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        return resultMap;
    }

    public Map importInitiativesBudget(InputStream inputStream, String type) throws IOException {
        Map resultMap = new HashMap();
        XSSFWorkbook myExcelBook = null;
        try {
            myExcelBook = new XSSFWorkbook(inputStream);
            DataFormatter df = new DataFormatter();
            XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
            evaluator.evaluateAll();
            if (type.equals("validation")) {
                resultMap = this.checkValidationForBudget(myExcelBook);
            } else {
                resultMap = this.importInitiativesBudget(myExcelBook);
                this.auditTrailService.save("Excel-Initiative Data Upload");
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        return resultMap;
    }

    public Map importBulkInitiatives(XSSFWorkbook myExcelBook) throws IOException {
        String pageName = null;
        Long PageOwner = null;
        Map resultMap = new HashMap();
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
                    block122: {
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
                            e.printStackTrace();
                            ++errordocs;
                            continue;
                        }
                        List kpiDTOList = ((KPIResponseDTO)this.kpiService.retrieveKpiList(String.valueOf(PageOwner), false, "").getBody()).getKpidtoList();
                        Map kpiMap = this.initiativeUtil.mapKPI(kpiDTOList);
                        kpiMap = kpiMap == null ? new HashMap() : kpiMap;
                        HashMap<String, Map> pageMap = new HashMap<String, Map>();
                        try {
                            String initId;
                            Long deptId;
                            Long pageId;
                            Long owner;
                            block123: {
                                if (InitiativesReaderUtil.isRowEmpty((XSSFRow)row)) {
                                    this.logger.debug("Row is empty");
                                    break block122;
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
                                if (row.getCell(3) == null || row.getCell(3).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    this.logger.error("Initiative name invalid");
                                    continue;
                                }
                                this.logger.info("Initiative valid");
                                if (row.getCell(5) == null || row.getCell(5).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    this.logger.error("Initiative Owner invalid");
                                    continue;
                                }
                                this.logger.info("owner valid");
                                if (row.getCell(10) == null || row.getCell(10).getCellType() == CellType.BLANK) {
                                    ++errordocs;
                                    this.logger.error("Initiative Owner invalid");
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
                                if (pageName != null) {
                                    List initiativesList;
                                    Map response = this.pageService.checkpages(pageName, PageOwner.longValue());
                                    if (!response.containsKey("success")) {
                                        ScoreCardResponseDTO responsePage;
                                        PageDTO pageDTO1 = new PageDTO();
                                        pageDTO1.setPageName(pageName);
                                        pageDTO1.setCreatedBy(PageOwner.longValue());
                                        pageDTO1.setPageType("Initiatives & Projects");
                                        pageDTO1.setGroupType("Execute");
                                        pageDTO1.setCreatedTime(LocalDateTime.now());
                                        if (deptId != null) {
                                            pageDTO1.setDeptId(deptId);
                                        }
                                        if (Objects.nonNull(responsePage = (ScoreCardResponseDTO)this.pageService.saveDetails(pageDTO1).getBody())) {
                                            createStatus = true;
                                            checkcreaterowno = row.getCTRow().getR();
                                            pageId = responsePage.getPageDTO().getId();
                                            initiativesList = this.initiativeService.findAll(true, String.valueOf(pageId), String.valueOf(PageOwner), "nodate");
                                            initiativeMap = this.initiativeUtil.mapPage(initiativesList);
                                            String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                            pageMap.put(key, initiativeMap);
                                        }
                                    } else {
                                        updateStatus = true;
                                        checkupdaterowno = row.getCTRow().getR();
                                        String id = response.get("pageId").toString();
                                        pageId = Long.parseLong(id);
                                        String key = String.join((CharSequence)"#", String.valueOf(pageId), String.valueOf(PageOwner));
                                        if (Objects.nonNull(pageMap.get(key))) {
                                            initiativeMap = (Map)pageMap.get(key);
                                        } else {
                                            initiativesList = this.initiativeService.findAll(true, String.valueOf(pageId), String.valueOf(PageOwner), "nodate");
                                            initiativeMap = this.initiativeUtil.mapPage(initiativesList);
                                            pageMap.put(key, initiativeMap);
                                        }
                                    }
                                }
                                try {
                                    EmployeeDTO requestEmployeeDTO = new EmployeeDTO();
                                    String ownerStr = row.getCell(5).getStringCellValue().trim();
                                    if (ownerStr.contains("@")) {
                                        requestEmployeeDTO.setEmailAddress(ExcelSheet.getSheetName());
                                    } else {
                                        requestEmployeeDTO.setFirstName(ExcelSheet.getSheetName());
                                    }
                                    EmployeeDTO ownerDTO = this.employeeService.getEmployeeId(requestEmployeeDTO);
                                    if (Objects.nonNull(ownerDTO)) {
                                        owner = ownerDTO.getEmpId();
                                        break block123;
                                    }
                                    this.logger.error("Initiative Owner not found");
                                    ++errordocs;
                                }
                                catch (Exception e) {
                                    e.printStackTrace();
                                    ++errordocs;
                                }
                                continue;
                            }
                            InitiativesDTO initiativesDTO = null;
                            SubInitiativesDTO subInitiativesDTO = null;
                            ActivitiesDTO activitiesDTO = null;
                            SubActivitiesDTO subActivitiesDTO = null;
                            MilestonesDTO milestonesDTO = null;
                            HashMap typeMap = null;
                            if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                                initiativesDTO = (InitiativesDTO)initiativeMap.get(row.getCell(3).getStringCellValue().trim());
                                initiativesDTO = initiativesDTO == null ? new InitiativesDTO() : initiativesDTO;
                                System.out.println("initiativesDTO data filed name :: " + row.getCell(3).getStringCellValue().trim());
                                System.out.println("initiativesDTO details map data get or present :: " + initiativesDTO);
                                initiativesDTO.getInitiativeValue().put("name", row.getCell(3).getStringCellValue().trim());
                                initiativesDTO.setOwner(owner.longValue());
                                initiativesDTO.setPageId(pageId.longValue());
                                if (deptId != null) {
                                    initiativesDTO.setDepartmentId(deptId);
                                }
                                System.out.println("page owner init :: " + PageOwner);
                                initiativesDTO.setCreatedBy(PageOwner.longValue());
                                typeMap = new HashMap();
                            }
                            if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK && !"NA".equalsIgnoreCase(initId = row.getCell(2).getStringCellValue())) {
                                initiativesDTO.setInitiativeId(initId);
                            }
                            if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("description", row.getCell(4).getStringCellValue().trim());
                            }
                            if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                                KPIDTO kpidto = (KPIDTO)kpiMap.get(row.getCell(6).getStringCellValue().trim());
                                if (kpidto != null) {
                                    initiativesDTO.setImpactId(Long.valueOf(kpidto.getId()));
                                    initiativesDTO.getInitiativeValue().put("impactDesc", kpidto.getKpiName());
                                } else {
                                    initiativesDTO.setImpactId(Long.valueOf(0L));
                                    initiativesDTO.getInitiativeValue().put("impactDesc", "NA");
                                }
                            }
                            if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                                if (row.getCell(7).getCellType() == CellType.NUMERIC) {
                                    initiativesDTO.getInitiativeValue().put("progressval", row.getCell(7).getRawValue());
                                } else if (row.getCell(7).getCellType() == CellType.STRING) {
                                    initiativesDTO.getInitiativeValue().put("progressval", row.getCell(7).getStringCellValue().trim());
                                } else {
                                    initiativesDTO.getInitiativeValue().put("progressval", row.getCell(7).getRawValue().trim());
                                }
                            }
                            if (row.getCell(8) != null && row.getCell(8).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("statusprimary", row.getCell(8).getStringCellValue().trim());
                            }
                            if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                                if (row.getCell(9).getStringCellValue().trim().equalsIgnoreCase("weighted")) {
                                    initiativesDTO.getInitiativeValue().put("statusType", "weighted");
                                } else if (row.getCell(9).getStringCellValue().trim().equalsIgnoreCase("manual")) {
                                    initiativesDTO.getInitiativeValue().put("statusType", "manual");
                                } else if (row.getCell(9).getStringCellValue().trim().equalsIgnoreCase("first")) {
                                    initiativesDTO.getInitiativeValue().put("statusType", "first");
                                } else if (row.getCell(9).getStringCellValue().trim().equalsIgnoreCase("second")) {
                                    initiativesDTO.getInitiativeValue().put("statusType", "second");
                                } else if (row.getCell(9).getStringCellValue().trim().equalsIgnoreCase("third")) {
                                    initiativesDTO.getInitiativeValue().put("statusType", "third");
                                }
                            }
                            if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("daterange", row.getCell(10).getStringCellValue().trim());
                            }
                            if (row.getCell(11) != null && row.getCell(11).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("actualdaterange", row.getCell(11).getStringCellValue().trim());
                            }
                            if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("actual", this.getStatus(row, 12));
                            }
                            if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("target", this.getStatus(row, 13));
                            }
                            if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("budget", this.getStatus(row, 14));
                            }
                            if (row.getCell(15) != null && row.getCell(15).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("forecast", this.getStatus(row, 15));
                            }
                            if (row.getCell(16) != null && row.getCell(16).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("total", this.getStatus(row, 16));
                            }
                            if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("utilized", this.getStatus(row, 17));
                            }
                            if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("balance", this.getStatus(row, 18));
                            }
                            if (row.getCell(19) != null && row.getCell(19).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("Total", row.getCell(19).getRawValue());
                            }
                            if (row.getCell(20) != null && row.getCell(20).getCellType() != CellType.BLANK) {
                                initiativesDTO.getInitiativeValue().put("Utilized", row.getCell(20).getRawValue());
                            }
                            if (row.getCell(38) != null && row.getCell(38).getCellType() != CellType.BLANK) {
                                if (this.getIntValueStatus(row, 38) != null) {
                                    initiativesDTO.setActive(new BigDecimal(this.getIntValueStatus(row, 38)).intValue());
                                } else {
                                    initiativesDTO.setActive(new BigDecimal(0).intValue());
                                }
                            }
                            String type = null;
                            if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                                type = row.getCell(21).getStringCellValue().trim();
                            }
                            if (type != null && type.equalsIgnoreCase("MileStone")) {
                                String milestoneKey;
                                if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                    milestoneKey = row.getCell(22).getStringCellValue().trim();
                                    milestonesDTO = (MilestonesDTO)initiativesDTO.getMileStonesMap().get(milestoneKey);
                                    milestonesDTO = milestonesDTO == null ? new MilestonesDTO() : milestonesDTO;
                                    System.out.println("milestonesDTO data field name :: " + milestoneKey);
                                    System.out.println("milestonesDTO details map data get or present :: " + milestonesDTO);
                                    milestonesDTO.getMileStonesValue().put("desc", milestoneKey);
                                    milestonesDTO.getMileStonesValue().put("name", milestoneKey);
                                    milestonesDTO.getMileStonesValue().put("status", "Pending");
                                    milestonesDTO.setOwner(owner.longValue());
                                    milestonesDTO.setCreatedBy(PageOwner.longValue());
                                    initiativesDTO.getMileStonesMap().put(milestoneKey, milestonesDTO);
                                    typeMap = new HashMap();
                                }
                                if (milestonesDTO != null) {
                                    if (row.getCell(23) != null && row.getCell(23).getCellType() != CellType.BLANK) {
                                        milestonesDTO.getMileStonesValue().put("description", row.getCell(23).getStringCellValue().trim());
                                    }
                                    if (row.getCell(24) != null && row.getCell(24).getCellType() != CellType.BLANK) {
                                        if (this.getIntValueStatus(row, 24) != null) {
                                            milestonesDTO.getMileStonesValue().put("progress", this.getIntValueStatus(row, 24));
                                        } else {
                                            milestonesDTO.getMileStonesValue().put("progress", 0);
                                        }
                                    }
                                    if (row.getCell(27) != null && row.getCell(27).getCellType() != CellType.BLANK) {
                                        milestonesDTO.getMileStonesValue().put("dateRange", row.getCell(27).getStringCellValue().trim());
                                    }
                                    if (row.getCell(42) != null && row.getCell(42).getCellType() != CellType.BLANK) {
                                        if (this.getIntValueStatus(row, 42) != null) {
                                            milestonesDTO.setActive(new BigDecimal(this.getIntValueStatus(row, 42)).intValue());
                                        } else {
                                            milestonesDTO.setActive(new BigDecimal(0).intValue());
                                        }
                                    }
                                    if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                        milestoneKey = row.getCell(22).getStringCellValue().trim();
                                        initiativesDTO.getMileStonesMap().put(milestoneKey, milestonesDTO);
                                    }
                                }
                            }
                            if (type != null && type.equalsIgnoreCase("Sub Initiative")) {
                                String subInitiativeKey;
                                if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                    System.out.println("Enter sub initiative");
                                    subInitiativeKey = row.getCell(22).getStringCellValue().trim();
                                    subInitiativesDTO = (SubInitiativesDTO)initiativesDTO.getSubInitiativeMap().get(subInitiativeKey);
                                    if (subInitiativesDTO == null) {
                                        subInitiativesDTO = new SubInitiativesDTO();
                                        subInitiativesDTO.setSubInitiativeValue(new HashMap());
                                        subInitiativesDTO.setActivitiesMap(new HashMap());
                                    }
                                    System.out.println("subInitiativesDTO data field name :: " + subInitiativeKey);
                                    subInitiativesDTO.getSubInitiativeValue().put("description", subInitiativeKey);
                                    subInitiativesDTO.setOwner(owner.longValue());
                                    subInitiativesDTO.setCreatedBy(PageOwner.longValue());
                                    initiativesDTO.getSubInitiativeMap().put(subInitiativeKey, subInitiativesDTO);
                                }
                                if (subInitiativesDTO != null) {
                                    if (row.getCell(24) != null && row.getCell(24).getCellType() != CellType.BLANK) {
                                        if (this.getIntValueStatus(row, 24) != null) {
                                            subInitiativesDTO.getSubInitiativeValue().put("progressval", this.getIntValueStatus(row, 24));
                                        } else {
                                            subInitiativesDTO.getSubInitiativeValue().put("progressval", 0);
                                        }
                                    }
                                    if (row.getCell(25) != null && row.getCell(25).getCellType() != CellType.BLANK) {
                                        String multiOwner = row.getCell(25).getStringCellValue().trim();
                                        subInitiativesDTO.getSubInitiativeValue().put("multipleowners", this.getMultipleOwnerIds(multiOwner));
                                    }
                                    if (row.getCell(26) != null && row.getCell(26).getCellType() != CellType.BLANK) {
                                        subInitiativesDTO.getSubInitiativeValue().put("dateRange", row.getCell(26).getStringCellValue().trim());
                                    }
                                    if (row.getCell(39) != null && row.getCell(39).getCellType() != CellType.BLANK) {
                                        if (this.getIntValueStatus(row, 39) != null) {
                                            subInitiativesDTO.setActive(new BigDecimal(this.getIntValueStatus(row, 39)).intValue());
                                        } else {
                                            subInitiativesDTO.setActive(new BigDecimal(0).intValue());
                                        }
                                    }
                                    if (row.getCell(22) != null && row.getCell(22).getCellType() != CellType.BLANK) {
                                        subInitiativeKey = row.getCell(22).getStringCellValue().trim();
                                        initiativesDTO.getSubInitiativeMap().put(subInitiativeKey, subInitiativesDTO);
                                    }
                                }
                                if (row.getCell(28) != null && row.getCell(28).getCellType() != CellType.BLANK) {
                                    String activityKey = row.getCell(28).getStringCellValue().trim();
                                    activitiesDTO = new ActivitiesDTO();
                                    activitiesDTO.setActivitiesValue(new HashMap());
                                    activitiesDTO.setSubActivitiesMap(new HashMap());
                                    System.out.println("activitiesDTO data field name :: " + activityKey);
                                    activitiesDTO.getActivitiesValue().put("desc", activityKey);
                                    activitiesDTO.getActivitiesValue().put("name", activityKey);
                                    activitiesDTO.setOwner(owner.longValue());
                                    activitiesDTO.setCreatedBy(PageOwner.longValue());
                                    if (row.getCell(29) != null && row.getCell(29).getCellType() != CellType.BLANK) {
                                        activitiesDTO.getActivitiesValue().put("description", row.getCell(29).getStringCellValue().trim());
                                    }
                                    if (row.getCell(30) != null && row.getCell(30).getCellType() != CellType.BLANK) {
                                        if (this.getIntValueStatus(row, 30) != null) {
                                            activitiesDTO.getActivitiesValue().put("progress", this.getIntValueStatus(row, 30));
                                        } else {
                                            activitiesDTO.getActivitiesValue().put("progress", 0);
                                        }
                                    }
                                    if (row.getCell(31) != null && row.getCell(31).getCellType() != CellType.BLANK) {
                                        String activityMultiOwner = row.getCell(31).getStringCellValue().trim();
                                        activitiesDTO.getActivitiesValue().put("multipleowners", this.getMultipleOwnerIds(activityMultiOwner));
                                    }
                                    if (row.getCell(32) != null && row.getCell(32).getCellType() != CellType.BLANK) {
                                        activitiesDTO.getActivitiesValue().put("dateRange", row.getCell(32).getStringCellValue().trim());
                                    }
                                    if (row.getCell(40) != null && row.getCell(40).getCellType() != CellType.BLANK) {
                                        if (this.getIntValueStatus(row, 40) != null) {
                                            activitiesDTO.setActive(new BigDecimal(this.getIntValueStatus(row, 40)).intValue());
                                        } else {
                                            activitiesDTO.setActive(new BigDecimal(0).intValue());
                                        }
                                    }
                                }
                                if (activitiesDTO != null && row.getCell(33) != null && row.getCell(33).getCellType() != CellType.BLANK) {
                                    String subActivityKey = row.getCell(33).getStringCellValue().trim();
                                    subActivitiesDTO = new SubActivitiesDTO();
                                    subActivitiesDTO.setActivitiesValue(new HashMap());
                                    System.out.println("subactivity data field name :: " + subActivityKey);
                                    subActivitiesDTO.getActivitiesValue().put("desc", subActivityKey);
                                    subActivitiesDTO.getActivitiesValue().put("name", subActivityKey);
                                    subActivitiesDTO.setOwner(owner.longValue());
                                    subActivitiesDTO.setCreatedBy(PageOwner.longValue());
                                    if (row.getCell(34) != null && row.getCell(34).getCellType() != CellType.BLANK) {
                                        subActivitiesDTO.getActivitiesValue().put("description", row.getCell(34).getStringCellValue().trim());
                                    }
                                    if (row.getCell(35) != null && row.getCell(35).getCellType() != CellType.BLANK) {
                                        if (this.getIntValueStatus(row, 35) != null) {
                                            subActivitiesDTO.getActivitiesValue().put("progress", this.getIntValueStatus(row, 35));
                                        } else {
                                            subActivitiesDTO.getActivitiesValue().put("progress", 0);
                                        }
                                    }
                                    if (row.getCell(36) != null && row.getCell(36).getCellType() != CellType.BLANK) {
                                        String SubActivmultiOwner = row.getCell(36).getStringCellValue().trim();
                                        subActivitiesDTO.getActivitiesValue().put("multipleowners", this.getMultipleOwnerIds(SubActivmultiOwner));
                                    }
                                    if (row.getCell(37) != null && row.getCell(37).getCellType() != CellType.BLANK) {
                                        subActivitiesDTO.getActivitiesValue().put("dateRange", row.getCell(37).getStringCellValue().trim());
                                    }
                                    if (row.getCell(41) != null && row.getCell(41).getCellType() != CellType.BLANK) {
                                        if (this.getIntValueStatus(row, 41) != null) {
                                            subActivitiesDTO.setActive(new BigDecimal(this.getIntValueStatus(row, 41)).intValue());
                                        } else {
                                            subActivitiesDTO.setActive(new BigDecimal(0).intValue());
                                        }
                                    }
                                }
                            }
                            InitiativesDTO responseDTO = this.buildAndUpdateRowDetails(initiativesDTO, subInitiativesDTO, activitiesDTO, subActivitiesDTO, milestonesDTO, type, pageId, PageOwner);
                            initiativeMap.put(this.getValue(responseDTO.getInitiativeValue(), "name"), responseDTO);
                        }
                        catch (Exception e) {
                            e.printStackTrace();
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
            resultMap.put("no_of_processed", proceededdocs + errordocs);
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

    public Map importInitiativesData(XSSFWorkbook myExcelBook) throws IOException {
        Map resultMap = new HashMap();
        boolean proceededdocs = false;
        Boolean updateStatus = false;
        ArrayList<InitiativesTrackerDTO> trackerDTOs = new ArrayList<InitiativesTrackerDTO>();
        Boolean createStatus = false;
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
                ArrayList listinitiativesTracker = new ArrayList();
                for (int i = 1; i < totalRows; ++i) {
                    InitiativesTrackerDTO initiativesTrackerDTO = new InitiativesTrackerDTO();
                    XSSFRow row = ExcelSheet.getRow(i);
                    try {
                        if (InitiativesReaderUtil.isRowEmpty((XSSFRow)row)) {
                            this.logger.debug("Row is empty");
                            continue;
                        }
                        if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                            if (row.getCell(0).getCellType() == CellType.NUMERIC) {
                                initiativesTrackerDTO.setInitiativesId(row.getCell(0).getRawValue());
                            } else if (row.getCell(0).getCellType() == CellType.STRING) {
                                initiativesTrackerDTO.setInitiativesId(row.getCell(0).getStringCellValue().trim());
                            } else {
                                initiativesTrackerDTO.setInitiativesId(row.getCell(0).getRawValue());
                            }
                        } else {
                            this.logger.error("Initiative  invalid");
                            continue;
                        }
                        if (row.getCell(1) != null && row.getCell(1).getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted((Cell)row.getCell(1))) {
                            double excelDate = row.getCell(1).getNumericCellValue();
                            System.out.println("Excel serial date: " + excelDate);
                            if (DateUtil.isValidExcelDate((double)excelDate)) {
                                Date javaDate = DateUtil.getJavaDate((double)excelDate);
                                System.out.println("Java Date: " + javaDate);
                                LocalDateTime localDateTime = javaDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().with(LocalTime.MAX);
                                System.out.println("LocalDateTime set to end of day: " + localDateTime);
                                initiativesTrackerDTO.setEnd_date(localDateTime);
                            }
                        } else {
                            System.out.println("Not a date cell or cell is empty");
                        }
                        if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                            if (row.getCell(2).getCellType() == CellType.NUMERIC) {
                                initiativesTrackerDTO.setActual(row.getCell(2).getRawValue());
                            } else if (row.getCell(2).getCellType() == CellType.STRING) {
                                initiativesTrackerDTO.setActual(row.getCell(2).getStringCellValue().trim());
                            } else {
                                initiativesTrackerDTO.setActual(row.getCell(2).getRawValue());
                            }
                        }
                        if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                            if (row.getCell(3).getCellType() == CellType.NUMERIC) {
                                initiativesTrackerDTO.setTarget(row.getCell(3).getRawValue());
                            } else if (row.getCell(3).getCellType() == CellType.STRING) {
                                initiativesTrackerDTO.setTarget(row.getCell(3).getStringCellValue().trim());
                            } else {
                                initiativesTrackerDTO.setTarget(row.getCell(3).getRawValue());
                            }
                        }
                        trackerDTOs.add(initiativesTrackerDTO);
                        continue;
                    }
                    catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
            resultMap = this.buildAndSaveInitiaitiveDataDetails(trackerDTOs);
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

    public Map importInitiativesBudget(XSSFWorkbook myExcelBook) throws IOException {
        Map resultMap = new HashMap();
        boolean proceededdocs = false;
        Boolean updateStatus = false;
        ArrayList<InitiativeBudgetDTO> budgetDTOs = new ArrayList<InitiativeBudgetDTO>();
        Boolean createStatus = false;
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
                    InitiativeBudgetDTO initiativesBudgetDTO = new InitiativeBudgetDTO();
                    XSSFRow row = ExcelSheet.getRow(i);
                    try {
                        if (InitiativesReaderUtil.isRowEmpty((XSSFRow)row)) {
                            this.logger.debug("Row is empty");
                            continue;
                        }
                        if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                            if (row.getCell(0).getCellType() == CellType.NUMERIC) {
                                initiativesBudgetDTO.setInitiativeId(row.getCell(0).getRawValue());
                            } else if (row.getCell(0).getCellType() == CellType.STRING) {
                                initiativesBudgetDTO.setInitiativeId(row.getCell(0).getStringCellValue().trim());
                            } else {
                                initiativesBudgetDTO.setInitiativeId(row.getCell(0).getRawValue());
                            }
                        } else {
                            this.logger.error("Initiative  invalid");
                            continue;
                        }
                        if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                            Date date;
                            String dateFormat = "yyyy-MM-dd";
                            SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
                            if (row.getCell(1).getCellType() == CellType.STRING) {
                                date = sdf.parse(row.getCell(1).getStringCellValue().trim());
                                initiativesBudgetDTO.setEndDate(date);
                            } else {
                                System.out.println(row.getCell(1).getRawValue());
                                date = row.getCell(1).getDateCellValue();
                                initiativesBudgetDTO.setEndDate(date);
                            }
                        } else {
                            this.logger.error("Initiative  End Date Format invalid");
                            continue;
                        }
                        if (row.getCell(2) != null && row.getCell(2).getCellType() != CellType.BLANK) {
                            if (row.getCell(2).getCellType() == CellType.NUMERIC) {
                                initiativesBudgetDTO.setTotalAssetBudget(new BigDecimal(row.getCell(2).getRawValue()));
                            } else if (row.getCell(2).getCellType() == CellType.STRING) {
                                initiativesBudgetDTO.setTotalAssetBudget(new BigDecimal(row.getCell(2).getStringCellValue().trim()));
                            } else {
                                initiativesBudgetDTO.setTotalAssetBudget(new BigDecimal(row.getCell(2).getRawValue()));
                            }
                        }
                        if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                            if (row.getCell(3).getCellType() == CellType.NUMERIC) {
                                initiativesBudgetDTO.setTotalRealizationAsset(new BigDecimal(row.getCell(3).getRawValue()));
                            } else if (row.getCell(3).getCellType() == CellType.STRING) {
                                initiativesBudgetDTO.setTotalRealizationAsset(new BigDecimal(row.getCell(3).getStringCellValue().trim()));
                            } else {
                                initiativesBudgetDTO.setTotalRealizationAsset(new BigDecimal(row.getCell(3).getRawValue()));
                            }
                        }
                        if (row.getCell(4) != null && row.getCell(4).getCellType() != CellType.BLANK) {
                            if (row.getCell(4).getCellType() == CellType.NUMERIC) {
                                initiativesBudgetDTO.setTotalLiabilitiesBudget(new BigDecimal(row.getCell(4).getRawValue()));
                            } else if (row.getCell(4).getCellType() == CellType.STRING) {
                                initiativesBudgetDTO.setTotalLiabilitiesBudget(new BigDecimal(row.getCell(4).getStringCellValue().trim()));
                            } else {
                                initiativesBudgetDTO.setTotalLiabilitiesBudget(new BigDecimal(row.getCell(4).getRawValue()));
                            }
                        }
                        if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                            if (row.getCell(5).getCellType() == CellType.NUMERIC) {
                                initiativesBudgetDTO.setTotalRealizationLiabilities(new BigDecimal(row.getCell(5).getRawValue()));
                            } else if (row.getCell(5).getCellType() == CellType.STRING) {
                                initiativesBudgetDTO.setTotalRealizationLiabilities(new BigDecimal(row.getCell(5).getStringCellValue().trim()));
                            } else {
                                initiativesBudgetDTO.setTotalRealizationLiabilities(new BigDecimal(row.getCell(5).getRawValue()));
                            }
                        }
                        if (row.getCell(6) != null && row.getCell(6).getCellType() != CellType.BLANK) {
                            if (row.getCell(6).getCellType() == CellType.NUMERIC) {
                                initiativesBudgetDTO.setTotalBudget(new BigDecimal(row.getCell(6).getRawValue()));
                            } else if (row.getCell(6).getCellType() == CellType.STRING) {
                                initiativesBudgetDTO.setTotalBudget(new BigDecimal(row.getCell(6).getStringCellValue().trim()));
                            } else {
                                initiativesBudgetDTO.setTotalBudget(new BigDecimal(row.getCell(6).getRawValue()));
                            }
                        }
                        if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                            if (row.getCell(7).getCellType() == CellType.NUMERIC) {
                                initiativesBudgetDTO.setTotalRealizationBudget(new BigDecimal(row.getCell(7).getRawValue()));
                            } else if (row.getCell(7).getCellType() == CellType.STRING) {
                                initiativesBudgetDTO.setTotalRealizationBudget(new BigDecimal(row.getCell(7).getStringCellValue().trim()));
                            } else {
                                initiativesBudgetDTO.setTotalRealizationBudget(new BigDecimal(row.getCell(7).getRawValue()));
                            }
                        }
                        budgetDTOs.add(initiativesBudgetDTO);
                        continue;
                    }
                    catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
            resultMap = this.buildAndSaveInitiaitiveBudgetDetails(budgetDTOs);
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

    public InitiativesDTO buildAndSaveInitiaitiveDetails(Long pageOwner, Long pageId, InitiativesDTO initiativesDTO) {
        if (initiativesDTO.getId() != 0L) {
            initiativesDTO.setUpdatedBy(pageOwner.longValue());
            initiativesDTO.setUpdatedTime(LocalDateTime.now());
            return this.initiativeService.updateInitiatives(initiativesDTO).getInitiativesDTO();
        }
        return this.initiativeService.saveInitiatives(initiativesDTO).getInitiativesDTO();
    }

    public Map buildAndSaveInitiaitiveDataDetails(List<InitiativesTrackerDTO> initiativesDTO) {
        return this.initiativeService.saveInitiativesData(initiativesDTO);
    }

    public Map buildAndSaveInitiaitiveBudgetDetails(List<InitiativeBudgetDTO> initiativesDTO) {
        return this.initiativeService.saveInitiativesBudget(initiativesDTO);
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

    public InitiativesDTO buildAndUpdateRowDetails(InitiativesDTO initiativesDTO, SubInitiativesDTO subInitiativesDTO, ActivitiesDTO activitiesDTO, SubActivitiesDTO subActivitiesDTO, MilestonesDTO milestonesDTO, String type, Long pageOwner, Long pageId) {
        System.out.println("**********************save detail start***************************************");
        if (initiativesDTO.getId() != 0L) {
            initiativesDTO.setUpdatedBy(pageOwner.longValue());
            initiativesDTO.setUpdatedTime(LocalDateTime.now());
            initiativesDTO = this.initiativeService.updateInitiatives(initiativesDTO).getInitiativesDTO();
        } else {
            initiativesDTO.setCreatedTime(LocalDateTime.now());
            initiativesDTO.setCreatedBy(pageOwner.longValue());
            initiativesDTO = this.initiativeService.saveInitiatives(initiativesDTO).getInitiativesDTO();
        }
        if (type != null && type.equalsIgnoreCase("MileStone")) {
            MilestonesDTO saveMilestonesDTO;
            Map milestoneRowMap = initiativesDTO.getMileStonesMap() != null ? initiativesDTO.getMileStonesMap() : new HashMap();
            milestonesDTO.setInitiativeId(initiativesDTO.getId());
            if (milestonesDTO.getId() != 0L) {
                milestonesDTO.setUpdatedBy(pageOwner.longValue());
                milestonesDTO.setUpdatedTime(LocalDateTime.now());
                saveMilestonesDTO = this.milestonesService.updateMilestones(milestonesDTO);
            } else {
                milestonesDTO.setCreatedBy(pageOwner.longValue());
                saveMilestonesDTO = this.milestonesService.createMilestones(milestonesDTO);
            }
            System.out.println("saveMilestonesDTO ::: > " + saveMilestonesDTO);
            MilestonesDTO completeMilestone = this.milestonesService.retriveMilestones(Long.valueOf(saveMilestonesDTO.getId()));
            String milestoneKey = this.getValue(completeMilestone.getMileStonesValue(), "desc");
            if (milestoneKey != null && !milestoneKey.isEmpty()) {
                milestoneRowMap.put(milestoneKey, completeMilestone);
            }
            initiativesDTO.setMileStonesMap(milestoneRowMap);
        } else if (type != null && type.equalsIgnoreCase("Sub Initiative")) {
            String activityKey;
            SubInitiativesDTO saveSubInitiativeDTO;
            subInitiativesDTO.setInitiativeId(initiativesDTO.getId());
            if (subInitiativesDTO.getId() != 0L) {
                subInitiativesDTO.setUpdatedBy(pageOwner.longValue());
                subInitiativesDTO.setUpdatedTime(LocalDateTime.now());
                saveSubInitiativeDTO = this.subInitiativeService.updateSubInitiatives(subInitiativesDTO).getSubInitiativesDTO();
            } else {
                subInitiativesDTO.setCreatedBy(pageOwner.longValue());
                saveSubInitiativeDTO = this.subInitiativeService.saveSubInitiatives(subInitiativesDTO).getSubInitiativesDTO();
            }
            System.out.println("saveSubInitiativeDTO ::: > " + saveSubInitiativeDTO);
            if (activitiesDTO != null && (activityKey = this.getValue(activitiesDTO.getActivitiesValue(), "name")) != null && !activityKey.isEmpty()) {
                String subActivityKey;
                ActivitiesDTO saveActivityDTO;
                activitiesDTO.setSubInitiativeId(String.valueOf(saveSubInitiativeDTO.getId()));
                Long existingActivityId = this.findExistingActivityId(Long.valueOf(saveSubInitiativeDTO.getId()), activityKey);
                if (existingActivityId != null) {
                    activitiesDTO.setId(existingActivityId.longValue());
                }
                if (activitiesDTO.getId() != 0L) {
                    activitiesDTO.setUpdatedBy(pageOwner.longValue());
                    activitiesDTO.setUpdatedTime(LocalDateTime.now());
                    saveActivityDTO = this.activitiesService.updateActivities(activitiesDTO);
                } else {
                    activitiesDTO.setCreatedBy(pageOwner.longValue());
                    saveActivityDTO = this.activitiesService.saveActivity(activitiesDTO);
                }
                System.out.println("saveActivityDTO ::: > " + saveActivityDTO);
                if (subActivitiesDTO != null && (subActivityKey = this.getValue(subActivitiesDTO.getActivitiesValue(), "name")) != null && !subActivityKey.isEmpty()) {
                    SubActivitiesDTO saveSubActivitiesDTO;
                    subActivitiesDTO.setActivitieId(saveActivityDTO.getId());
                    if (subActivitiesDTO.getId() != 0L) {
                        subActivitiesDTO.setUpdatedBy(pageOwner.longValue());
                        subActivitiesDTO.setUpdatedTime(LocalDateTime.now());
                        saveSubActivitiesDTO = this.subActivitiesService.updateSubActivities(subActivitiesDTO);
                    } else {
                        subActivitiesDTO.setCreatedBy(pageOwner.longValue());
                        saveSubActivitiesDTO = this.subActivitiesService.saveSubActivity(subActivitiesDTO);
                    }
                    System.out.println("saveSubActivitiesDTO ::: > " + saveSubActivitiesDTO);
                }
            }
            SubInitiativesDTO completeSubInitiative = this.subInitiativeService.retriveSubInitiatives(Long.valueOf(saveSubInitiativeDTO.getId()));
            Map subINtRowMap = initiativesDTO.getSubInitiativeMap() != null ? initiativesDTO.getSubInitiativeMap() : new HashMap();
            String subInitiativeKey = this.getValue(completeSubInitiative.getSubInitiativeValue(), "description");
            if (subInitiativeKey != null && !subInitiativeKey.isEmpty()) {
                subINtRowMap.put(subInitiativeKey, completeSubInitiative);
            }
            initiativesDTO.setSubInitiativeMap(subINtRowMap);
        }
        System.out.println("**********************save detail end***************************************");
        return initiativesDTO;
    }

    private Long findExistingActivityId(Long subInitiativeId, String activityName) {
        try {
            List activitiesList = this.activitiesService.retrieveSubInitiativeLists(subInitiativeId);
            if (activitiesList != null) {
                for (Object _obj_activity : activitiesList) {
                    ActivitiesDTO activity = (ActivitiesDTO) _obj_activity;
                    String existingActivityName = this.getValue(activity.getActivitiesValue(), "desc");
                    if (!activityName.equals(existingActivityName)) continue;
                    return activity.getId();
                }
            }
        }
        catch (Exception e) {
            System.out.println("Error finding existing activity: " + e.getMessage());
        }
        return null;
    }

    public void buildAndUpdateTypeData(Long pageOwner, Long pageId, InitiativesDTO initiativesDTO, Map typeMap) {
        if (Objects.nonNull(typeMap.get("type"))) {
            String type = typeMap.get("type").toString();
            int active = Objects.nonNull(typeMap.get("active")) ? Integer.valueOf(typeMap.get("active").toString()) : 0;
            Map stringObjectMap = new HashMap();
            stringObjectMap.put("name", this.getValue(typeMap, "name"));
            if ("Sub Initiative".equalsIgnoreCase(type)) {
                SubInitiativesDTO subInitiativesDTO = (SubInitiativesDTO)initiativesDTO.getSubInitiativeMap().get(this.getValue(typeMap, "name"));
                subInitiativesDTO = subInitiativesDTO == null ? new SubInitiativesDTO() : subInitiativesDTO;
                subInitiativesDTO.setCreatedBy(pageOwner.longValue());
                subInitiativesDTO.setActive(active);
                subInitiativesDTO.setInitiativeId(initiativesDTO.getId());
                stringObjectMap.put("progressval", this.getValue(typeMap, "progress"));
                stringObjectMap.put("dateRange", this.getValue(typeMap, "dateRange"));
                stringObjectMap.put("description", this.getValue(typeMap, "name"));
                stringObjectMap.put("multipleowners", this.getMultipleOwnerIds(this.getValue(typeMap, "owners")));
                subInitiativesDTO.setSubInitiativeValue(stringObjectMap);
                if (subInitiativesDTO.getId() != 0L) {
                    subInitiativesDTO.setUpdatedBy(pageOwner.longValue());
                    subInitiativesDTO.setUpdatedTime(LocalDateTime.now());
                }
                SubInitiativesDTO subInitiativeRowDTO = this.subInitiativeService.saveSubInitiatives(subInitiativesDTO).getSubInitiativesDTO();
                initiativesDTO.getSubInitiativeMap().put(this.getValue(typeMap, "name"), subInitiativeRowDTO);
            }
            if ("Activities".equalsIgnoreCase(type)) {
                ActivitiesDTO activitiesDTO = (ActivitiesDTO)initiativesDTO.getActivitiesMap().get(this.getValue(typeMap, "name"));
                activitiesDTO = activitiesDTO == null ? new ActivitiesDTO() : activitiesDTO;
                activitiesDTO.setCreatedBy(pageOwner.longValue());
                activitiesDTO.setActive(active);
                activitiesDTO.setInitiativeId(initiativesDTO.getId());
                stringObjectMap.put("progress", this.getValue(typeMap, "progress"));
                stringObjectMap.put("multipleowners", this.getMultipleOwnerIds(this.getValue(typeMap, "owners")));
                stringObjectMap.put("desc", this.getValue(typeMap, "name"));
                stringObjectMap.put("dateRange", this.getValue(typeMap, "dateRange"));
                stringObjectMap.put("status", "Pending");
                activitiesDTO.setActivitiesValue(stringObjectMap);
                if (activitiesDTO.getId() != 0L) {
                    activitiesDTO.setUpdatedBy(pageOwner.longValue());
                    activitiesDTO.setUpdatedTime(LocalDateTime.now());
                }
                ActivitiesDTO activitiesRowDTO = this.activitiesService.saveActivity(activitiesDTO);
                initiativesDTO.getActivitiesMap().put(this.getValue(typeMap, "name"), activitiesRowDTO);
            }
            if ("MileStone".equalsIgnoreCase(type)) {
                MilestonesDTO milestonesDTO = (MilestonesDTO)initiativesDTO.getMileStonesMap().get(this.getValue(typeMap, "name"));
                milestonesDTO = milestonesDTO == null ? new MilestonesDTO() : milestonesDTO;
                milestonesDTO.setCreatedBy(pageOwner.longValue());
                milestonesDTO.setActive(active);
                milestonesDTO.setOwner(pageOwner.longValue());
                milestonesDTO.setInitiativeId(initiativesDTO.getId());
                stringObjectMap.put("progress", this.getValue(typeMap, "progress"));
                stringObjectMap.put("desc", this.getValue(typeMap, "name"));
                stringObjectMap.put("status", "Pending");
                stringObjectMap.put("dateRange", this.getValue(typeMap, "mileStoneDateRange"));
                milestonesDTO.setMileStonesValue(stringObjectMap);
                if (milestonesDTO.getId() != 0L) {
                    milestonesDTO.setUpdatedBy(pageOwner.longValue());
                    milestonesDTO.setUpdatedTime(LocalDateTime.now());
                }
                MilestonesDTO mileStonesRowDTO = this.milestonesService.createMilestones(milestonesDTO);
                initiativesDTO.getMileStonesMap().put(this.getValue(typeMap, "name"), mileStonesRowDTO);
            }
        }
    }

    public Map checkValidationForExcelSheet(XSSFWorkbook myExcelBook) {
        DataFormatter df = new DataFormatter();
        XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
        evaluator.evaluateAll();
        Map resultMap = new HashMap();
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
                        block56: {
                            if (InitiativesReaderUtil.isRowEmpty((XSSFRow)row)) {
                                this.logger.debug("Row is empty");
                                continue;
                            }
                            ControlPanelGeneralDTO cpanel = this.controlPanelGeneralService.findByOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
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
                                            break block56;
                                        }
                                        stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                        stringMap.put("error", "Department ID NOT Found : " + deptValue);
                                        stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                        stringMap.put("highLightcellName", "Department ID");
                                        mapList.add(stringMap);
                                    }
                                    catch (Exception e) {
                                        stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                        stringMap.put("error", e.getMessage());
                                        stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                        stringMap.put("highLightcellName", "Department ID");
                                        mapList.add(stringMap);
                                    }
                                } else {
                                    stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                    stringMap.put("error", "Department id is empty");
                                    stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                    stringMap.put("highLightcellName", "Department ID");
                                    mapList.add(stringMap);
                                }
                            }
                        }
                        if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                            this.logger.info("Initiative valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "PageName is empty");
                            stringMap.put("highLightcellName", "PageName");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                            this.logger.info("Initiative valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Initiative Name is empty");
                            stringMap.put("highLightcellName", "Initiative Name");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                            this.logger.info("owner valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Owner is empty");
                            stringMap.put("highLightcellName", "Owner");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK) {
                            this.logger.info("owner valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("error", "Planned Start Date/End Date is empty");
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("highLightcellName", "Planned Start Date/End Date");
                            mapList.add(stringMap);
                        }
                        try {
                            EmployeeDTO requestEmployeeDTO = new EmployeeDTO();
                            String owner = row.getCell(5).getStringCellValue().trim();
                            if (owner.contains("@")) {
                                requestEmployeeDTO.setEmailAddress(ExcelSheet.getSheetName());
                            } else {
                                requestEmployeeDTO.setFirstName(ExcelSheet.getSheetName());
                            }
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
                        if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK) {
                            if (this.getvalueStatus(row)) {
                                this.logger.info("Initiative valid");
                            } else {
                                stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("highLightcellName", "Progress");
                                stringMap.put("error", "progress value is not numeric, please provide numeric only");
                                stringMap.put("highLightcellName", "Progress");
                                mapList.add(stringMap);
                            }
                        }
                        if (row.getCell(9) != null && row.getCell(9).getCellType() != CellType.BLANK) {
                            this.logger.info("Initiative valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Status Type is empty");
                            stringMap.put("highLightcellName", "Status Type");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(10) != null && row.getCell(10).getCellType() != CellType.BLANK) {
                            if (this.isValid(row.getCell(10).getStringCellValue().trim())) {
                                this.logger.info("Initiative valid");
                            } else {
                                stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                                stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                                stringMap.put("error", "Date format is invalid, please provide MM/DD/YYYY only");
                                stringMap.put("highLightcellName", "Planned Start Date/End Date");
                                mapList.add(stringMap);
                            }
                        }
                        if (row.getCell(11) != null && row.getCell(11).getCellType() != CellType.BLANK && !this.isValid(row.getCell(10).getStringCellValue().trim())) {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Date format is invalid, please provide MM/DD/YYYY only");
                            stringMap.put("highLightcellName", "Actual Start Date/End Date");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(12) != null && row.getCell(12).getCellType() != CellType.BLANK) {
                            this.logger.info("Initiative valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Actual Indicator is empty");
                            stringMap.put("highLightcellName", "Actual Indicator");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(13) != null && row.getCell(13).getCellType() != CellType.BLANK) {
                            this.logger.info("Target Indicator valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Target Indicator is empty");
                            stringMap.put("highLightcellName", "Target Indicator");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(14) != null && row.getCell(14).getCellType() != CellType.BLANK) {
                            this.logger.info("Budget Indicator valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Budget Indicator is empty");
                            stringMap.put("highLightcellName", "Budget Indicator");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(15) == null || row.getCell(15).getCellType() == CellType.BLANK) {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Forecast Indicator is empty");
                            stringMap.put("highLightcellName", "Forecast Indicator");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(16) != null && row.getCell(16).getCellType() != CellType.BLANK) {
                            this.logger.info("Total Indicator valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Total Indicator is empty");
                            stringMap.put("highLightcellName", "Total Indicator");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(17) != null && row.getCell(17).getCellType() != CellType.BLANK) {
                            this.logger.info("Initiative valid");
                        } else {
                            stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                            stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                            stringMap.put("error", "Utilized Indicator is empty");
                            stringMap.put("highLightcellName", "Utilized Indicator");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(18) != null && row.getCell(18).getCellType() != CellType.BLANK) {
                            this.logger.info("Balance Indicator valid");
                            continue;
                        }
                        stringMap = this.getWriteDocForInitiatives(row, df, (FormulaEvaluator)evaluator, ExcelSheet.getSheetName());
                        stringMap.put("rowNo", String.valueOf(Long.valueOf(row.getCTRow().getR())));
                        stringMap.put("error", "Balance Indicator is empty");
                        stringMap.put("highLightcellName", "Balance Indicator");
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

    public Map checkValidationForExcelSheetData(XSSFWorkbook myExcelBook) {
        DataFormatter df = new DataFormatter();
        XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
        evaluator.evaluateAll();
        Map resultMap = new HashMap();
        HashMap stringMap = null;
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
                    stringMap = new HashMap();
                    stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                    stringMap.put("error", "Initiative Data Sheet is empty");
                    stringMap.put("rowNo", "");
                    stringMap.put("highLightcellName", "Excel-SheetName");
                    mapList.add(stringMap);
                    continue;
                }
                for (int i = 1; i < totalRows; ++i) {
                    stringMap = new HashMap();
                    XSSFRow row = ExcelSheet.getRow(i);
                    try {
                        if (InitiativesReaderUtil.isRowEmpty((XSSFRow)row)) {
                            this.logger.debug("Row is empty");
                            continue;
                        }
                        if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                            this.logger.info("Initiative id is required");
                        } else {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "InitiativeId is empty");
                            stringMap.put("highLightcellName", "InitiativeId");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                            this.logger.info("End Date is Mandatory");
                            continue;
                        }
                        stringMap.put("rowNo", row.getCTRow().getR());
                        stringMap.put("error", "End Date is empty");
                        stringMap.put("highLightcellName", "End Date");
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

    public Map checkValidationForBudget(XSSFWorkbook myExcelBook) {
        DataFormatter df = new DataFormatter();
        XSSFFormulaEvaluator evaluator = myExcelBook.getCreationHelper().createFormulaEvaluator();
        evaluator.evaluateAll();
        Map resultMap = new HashMap();
        HashMap stringMap = null;
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
                    stringMap = new HashMap();
                    stringMap.put("Excel_SheetName", ExcelSheet.getSheetName());
                    stringMap.put("error", "Initiative Budget Sheet is empty");
                    stringMap.put("rowNo", "");
                    stringMap.put("highLightcellName", "Excel-SheetName");
                    mapList.add(stringMap);
                    continue;
                }
                for (int i = 1; i < totalRows; ++i) {
                    stringMap = new HashMap();
                    XSSFRow row = ExcelSheet.getRow(i);
                    try {
                        if (InitiativesReaderUtil.isRowEmpty((XSSFRow)row)) {
                            this.logger.debug("Row is empty");
                            continue;
                        }
                        if (row.getCell(0) != null && row.getCell(0).getCellType() != CellType.BLANK) {
                            this.logger.info("Initiative id is required");
                        } else {
                            stringMap.put("rowNo", row.getCTRow().getR());
                            stringMap.put("error", "InitiativeId is empty");
                            stringMap.put("highLightcellName", "InitiativeId");
                            mapList.add(stringMap);
                        }
                        if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                            this.logger.info("End Date is Mandatory");
                            continue;
                        }
                        stringMap.put("rowNo", row.getCTRow().getR());
                        stringMap.put("error", "End Date is empty");
                        stringMap.put("highLightcellName", "End Date");
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

    public boolean getStatus(XSSFRow row, int no) {
        boolean status = false;
        String status1 = null;
        try {
            if (row.getCell(no).getCellType() == CellType.BOOLEAN) {
                status = row.getCell(no).getBooleanCellValue();
            } else if (row.getCell(no).getCellType() == CellType.STRING) {
                status1 = row.getCell(no).getStringCellValue().trim();
            }
            if (status1.equalsIgnoreCase("TRUE")) {
                status = true;
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }

    public Map getWriteDocForInitiatives(XSSFRow row, DataFormatter df, FormulaEvaluator evaluator, String excelSheetName) {
        Map map = new HashMap();
        map.put("Excel_SheetName", excelSheetName);
        evaluator.evaluateAll();
        try {
            if (row.getCell(1) != null && row.getCell(1).getCellType() != CellType.BLANK) {
                map.put("pageName", row.getCell(1).getStringCellValue().trim());
            } else {
                map.put("pageName", "");
            }
            if (row.getCell(3) != null && row.getCell(3).getCellType() != CellType.BLANK) {
                map.put("initiativeName", row.getCell(3).getStringCellValue().trim());
            } else {
                map.put("initiativeName", "");
            }
            if (row.getCell(5) != null && row.getCell(5).getCellType() != CellType.BLANK) {
                map.put("owner", row.getCell(5).getStringCellValue().trim());
            } else {
                map.put("owner", "");
            }
            if (row.getCell(21) != null && row.getCell(21).getCellType() != CellType.BLANK) {
                map.put("type", row.getCell(21).getRawValue());
            } else {
                map.put("type", "");
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

    public String getCellName(int no) {
        String Name = null;
        if (no == 0) {
            Name = "PageName";
        } else if (no == 1) {
            Name = "Initiative ID";
        } else if (no == 2) {
            Name = "Initiative Name";
        } else if (no == 3) {
            Name = "Initiative Description";
        } else if (no == 4) {
            Name = "Owner ";
        } else if (no == 5) {
            Name = "Impact";
        } else if (no == 6) {
            Name = "Progress";
        } else if (no == 7) {
            Name = "Primary Status";
        } else if (no == 8) {
            Name = "Status Type ";
        } else if (no == 9) {
            Name = "Planned Start Date/End Date";
        } else if (no == 10) {
            Name = "Actual Start Date/End Date";
        } else if (no == 11) {
            Name = "Actual Indicator";
        } else if (no == 12) {
            Name = "Target Indicator";
        } else if (no == 13) {
            Name = "Budget Indicator";
        } else if (no == 14) {
            Name = "Forecast Indicator";
        } else if (no == 15) {
            Name = "Total Indicator";
        } else if (no == 16) {
            Name = "Utilized Indicator";
        } else if (no == 17) {
            Name = "Balance Indicator";
        } else if (no == 18) {
            Name = "Total Value";
        } else if (no == 19) {
            Name = "Utillized Value";
        } else if (no == 20) {
            Name = "Type";
        } else if (no == 21) {
            Name = "Type Name";
        } else if (no == 22) {
            Name = "Type Description";
        } else if (no == 23) {
            Name = "Type Progress";
        } else if (no == 24) {
            Name = " Owners (Comma Seperated)";
        } else if (no == 25) {
            Name = "Start End Date";
        } else if (no == 26) {
            Name = "MileStrone EndDate";
        } else if (no == 27) {
            Name = "Delete Initiative";
        } else if (no == 28) {
            Name = "Delete Type";
        }
        return Name;
    }

    public String writeDocForInitiative(List<Map> mapList, String excelFilePath) throws IOException {
        String writeDocUrl = null;
        try {
            String[] COLUMNs = new String[]{"PageName", "InitiativeID", "InitiativeName", "InitiativeDescription", "Impact", "Owner", "Progress", "PrimaryStatus ", "StatusType", "PlannedStart_Date/End_Date", "Actual_Start_Date/End_Date", "Actual", "Target", "Budget", "Forecast", "setTotal", "Utillized", "Balance", "SubInitiativeName", "SubInitiativeDescription", "SubInitiativeProgress", "MultipleOwners", "ActivitiesName", "ActivitiesDescription", "ActivitiesProgress", "MilestonesName", "MilestonesDescription", "MilestonesProgress", "CommentsName", "CommentsDescription"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            Sheet sheet = workbook.createSheet("InitiativeImportSheet");
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
                row.createCell(1).setCellValue(map.get("initiativeUniqueID").toString());
                row.createCell(2).setCellValue(map.get("initiativeName").toString());
                row.createCell(3).setCellValue(map.get("initiativeDesc").toString());
                row.createCell(4).setCellValue(map.get("impactName").toString());
                row.createCell(5).setCellValue(map.get("owner").toString());
                row.createCell(6).setCellValue(map.get("progress").toString());
                row.createCell(7).setCellValue(map.get("primaryStatus").toString());
                row.createCell(8).setCellValue(map.get("statusType").toString());
                row.createCell(9).setCellValue(map.get("planned_start_endDate").toString());
                row.createCell(10).setCellValue(map.get("actual_start_endDate").toString());
                row.createCell(11).setCellValue(map.get("actual").toString());
                row.createCell(12).setCellValue(map.get("target").toString());
                row.createCell(13).setCellValue(map.get("budget").toString());
                row.createCell(14).setCellValue(map.get("forecast").toString());
                row.createCell(15).setCellValue(map.get("total").toString());
                row.createCell(16).setCellValue(map.get("utilized").toString());
                row.createCell(17).setCellValue(map.get("balance").toString());
                row.createCell(18).setCellValue(map.get("subInitiativeName").toString());
                row.createCell(19).setCellValue(map.get("subInitiativeDesc").toString());
                row.createCell(20).setCellValue(map.get("sub_initiative_progress").toString());
                row.createCell(21).setCellValue(map.get("multipleOwners").toString());
                row.createCell(22).setCellValue(map.get("activitiesName").toString());
                row.createCell(23).setCellValue(map.get("activitiesDesc").toString());
                row.createCell(24).setCellValue(map.get("activities_progress").toString());
                row.createCell(25).setCellValue(map.get("milestonesName").toString());
                row.createCell(26).setCellValue(map.get("milestonesDesc").toString());
                row.createCell(27).setCellValue(map.get("milestones_progress").toString());
                row.createCell(28).setCellValue(map.get("commentsName").toString());
                row.createCell(29).setCellValue(map.get("commentsDesc").toString());
                Cell cell = row.createCell(30);
            }
            Throwable throwable = null;
            try (FileOutputStream outputStream = new FileOutputStream(excelFilePath);){
                workbook.write((OutputStream)outputStream);
            }
            catch (Throwable throwable2) {
                Throwable throwable3 = throwable2;
                throw throwable2;
            }
            String folderName = "InitiativeImportDataFile";
            this.repositoryServices.createFolder(folderName);
            String string = folderName + "/" + excelFilePath;
            this.repositoryServices.putObj(string, excelFilePath);
            writeDocUrl = this.getS3ObjectLink(excelFilePath, "/InitiativeImportDataFile");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return writeDocUrl;
    }

    private String getS3ObjectLink(String fileName, String S3_ASSET_PATHS) throws UnsupportedEncodingException {
        return "http://" + this.repositoryServices.getAmazonBucket() + ".s3.amazonaws.com" + S3_ASSET_PATHS + "/" + URLEncoder.encode(fileName, "UTF-8");
    }

    public boolean getvalueStatus(XSSFRow row) {
        Boolean status;
        block3: {
            status = false;
            String progress = null;
            try {
                String exp;
                if (row.getCell(7) != null && row.getCell(7).getCellType() != CellType.BLANK && (progress = row.getCell(7).getCellType() == CellType.NUMERIC ? row.getCell(7).getRawValue().trim() : (row.getCell(7).getCellType() == CellType.STRING ? row.getCell(7).getStringCellValue().trim() : row.getCell(7).getRawValue().trim())).matches(exp = "^[-+]?[\\d+([,]\\d+)]*\\.?[0-9]+$")) {
                    status = true;
                }
            }
            catch (IllegalStateException e) {
                String msg = e.getMessage();
                if (!msg.equalsIgnoreCase("Cannot get a text value from a numeric cell")) break block3;
                status = true;
            }
        }
        return status;
    }

    public Integer getIntValueStatus(XSSFRow row, int no) {
        Integer intval = null;
        String progress = null;
        try {
            if (row.getCell(no) != null && row.getCell(no).getCellType() != CellType.BLANK) {
                progress = row.getCell(no).getCellType() == CellType.NUMERIC ? row.getCell(no).getRawValue().trim() : (row.getCell(no).getCellType() == CellType.STRING ? row.getCell(no).getStringCellValue().trim() : row.getCell(no).getRawValue().trim());
                intval = Integer.valueOf(progress);
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        return intval;
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

    public ResponseEntity<ByteArrayResource> writeDocForInitiativesDetails(List<InitiativesDTO> initiativesDTOS) throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        ArrayList mapList = new ArrayList();
        String pageName = null;
        String deptUniqueID = null;
        boolean updateStatus = true;
        try {
            if (CollectionUtils.isNotEmpty(initiativesDTOS)) {
                for (Object _obj_initiativesDTO : initiativesDTOS) {
                    InitiativesDTO initiativesDTO = (InitiativesDTO) _obj_initiativesDTO;
                    Map stringObjectMap;
                    HashMap stringMap;
                    if (!Objects.nonNull(initiativesDTO)) continue;
                    updateStatus = true;
                    if (initiativesDTO.getDeptUniqueId() != null) {
                        deptUniqueID = initiativesDTO.getDeptUniqueId();
                    }
                    pageName = initiativesDTO.getPageName();
                    if (!initiativesDTO.getSubInitiativeList().isEmpty()) {
                        for (Object _obj_subInitiativesDTO : initiativesDTO.getSubInitiativeList()) {
                            SubInitiativesDTO subInitiativesDTO = (SubInitiativesDTO) _obj_subInitiativesDTO;
                            updateStatus = false;
                            stringMap = new HashMap();
                            if (deptUniqueID != null) {
                                stringMap.put("departmentID", deptUniqueID);
                            }
                            stringMap.put("pageName", pageName);
                            stringMap.put("initiativeID", initiativesDTO.getInitiativeId());
                            stringObjectMap = initiativesDTO.getInitiativeValue();
                            stringMap.put("initiativeName", stringObjectMap.get("name").toString());
                            if (stringObjectMap.containsKey("description")) {
                                stringMap.put("initiativeDesc", stringObjectMap.get("description").toString());
                            }
                            stringMap.put("owner", stringObjectMap.get("ownerName").toString());
                            if (stringObjectMap.containsKey("impactDesc")) {
                                stringMap.put("impact", stringObjectMap.get("impactDesc").toString());
                            }
                            if (stringObjectMap.containsKey("progressval")) {
                                stringMap.put("progressval", stringObjectMap.get("progressval").toString());
                            }
                            if (stringObjectMap.containsKey("statusType")) {
                                stringMap.put("statusType", stringObjectMap.get("statusType").toString());
                            }
                            stringMap.put("daterange", stringObjectMap.get("daterange").toString());
                            if (stringObjectMap.containsKey("actualdaterange")) {
                                stringMap.put("actualdaterange", stringObjectMap.get("actualdaterange").toString());
                            }
                            if (stringObjectMap.get("actual").toString().equalsIgnoreCase("true")) {
                                stringMap.put("actual", "TRUE");
                            } else {
                                stringMap.put("actual", "FALSE");
                            }
                            if (stringObjectMap.get("target").toString().equalsIgnoreCase("true")) {
                                stringMap.put("target", "TRUE");
                            } else {
                                stringMap.put("target", "FALSE");
                            }
                            if (stringObjectMap.get("budget").toString().equalsIgnoreCase("true")) {
                                stringMap.put("budget", "TRUE");
                            } else {
                                stringMap.put("budget", "FALSE");
                            }
                            if (stringObjectMap.get("forecast").toString().equalsIgnoreCase("true")) {
                                stringMap.put("forecast", "TRUE");
                            } else {
                                stringMap.put("forecast", "FALSE");
                            }
                            if (stringObjectMap.get("total").toString().equalsIgnoreCase("true")) {
                                stringMap.put("total", "TRUE");
                            } else {
                                stringMap.put("total", "FALSE");
                            }
                            if (stringObjectMap.get("utilized").toString().equalsIgnoreCase("true")) {
                                stringMap.put("utilized", "TRUE");
                            } else {
                                stringMap.put("utilized", "FALSE");
                            }
                            if (stringObjectMap.get("balance").toString().equalsIgnoreCase("true")) {
                                stringMap.put("balance", "TRUE");
                            } else {
                                stringMap.put("balance", "FALSE");
                            }
                            if (stringObjectMap.containsKey("totalValue")) {
                                stringMap.put("totalValue", stringObjectMap.get("totalValue").toString());
                            }
                            if (stringObjectMap.containsKey("utilizedValue")) {
                                stringMap.put("utilizedValue", stringObjectMap.get("utilizedValue").toString());
                            }
                            stringMap.put("implementationType", "Sub Initiative");
                            Map subInitiativeValue = subInitiativesDTO.getSubInitiativeValue();
                            if (subInitiativeValue.containsKey("description")) {
                                stringMap.put("typeDesc", subInitiativeValue.get("description").toString());
                                stringMap.put("typeName", subInitiativeValue.get("description").toString());
                            }
                            stringMap.put("typeDateRange", subInitiativeValue.get("dateRange").toString());
                            if (subInitiativeValue.containsKey("progressval")) {
                                stringMap.put("typeProgress", subInitiativeValue.get("progressval").toString());
                            }
                            stringMap.put("typeActive", String.valueOf(subInitiativesDTO.getActive()));
                            if (!subInitiativesDTO.getSubInitiativesMapDTOList().isEmpty()) {
                                stringMap.put("multipleOwners", this.getSubMultipleOwner(subInitiativesDTO.getSubInitiativesMapDTOList()));
                            }
                            stringMap.put("initiativeActive", String.valueOf(initiativesDTO.getActive()));
                            mapList.add(stringMap);
                        }
                    }
                    if (!initiativesDTO.getActivitiesList().isEmpty()) {
                        for (Object _obj_activitiesDTO : initiativesDTO.getActivitiesList()) {
                            ActivitiesDTO activitiesDTO = (ActivitiesDTO) _obj_activitiesDTO;
                            updateStatus = false;
                            stringMap = new HashMap();
                            if (deptUniqueID != null) {
                                stringMap.put("departmentID", deptUniqueID);
                            }
                            stringMap.put("pageName", pageName);
                            stringMap.put("initiativeID", initiativesDTO.getInitiativeId());
                            stringObjectMap = initiativesDTO.getInitiativeValue();
                            stringMap.put("initiativeName", stringObjectMap.get("name").toString());
                            if (stringObjectMap.containsKey("description")) {
                                stringMap.put("initiativeDesc", stringObjectMap.get("description").toString());
                            }
                            stringMap.put("owner", stringObjectMap.get("ownerName").toString());
                            if (stringObjectMap.containsKey("impactDesc")) {
                                stringMap.put("impact", stringObjectMap.get("impactDesc").toString());
                            }
                            if (stringObjectMap.containsKey("progressval")) {
                                stringMap.put("progressval", stringObjectMap.get("progressval").toString());
                            }
                            if (stringObjectMap.containsKey("statusType")) {
                                stringMap.put("statusType", stringObjectMap.get("statusType").toString());
                            }
                            stringMap.put("daterange", stringObjectMap.get("daterange").toString());
                            if (stringObjectMap.containsKey("actualdaterange")) {
                                stringMap.put("actualdaterange", stringObjectMap.get("actualdaterange").toString());
                            }
                            if (stringObjectMap.get("actual").toString().equalsIgnoreCase("true")) {
                                stringMap.put("actual", "TRUE");
                            } else {
                                stringMap.put("actual", "FALSE");
                            }
                            if (stringObjectMap.get("target").toString().equalsIgnoreCase("true")) {
                                stringMap.put("target", "TRUE");
                            } else {
                                stringMap.put("target", "FALSE");
                            }
                            if (stringObjectMap.get("budget").toString().equalsIgnoreCase("true")) {
                                stringMap.put("budget", "TRUE");
                            } else {
                                stringMap.put("budget", "FALSE");
                            }
                            if (stringObjectMap.get("forecast").toString().equalsIgnoreCase("true")) {
                                stringMap.put("forecast", "TRUE");
                            } else {
                                stringMap.put("forecast", "FALSE");
                            }
                            if (stringObjectMap.get("total").toString().equalsIgnoreCase("true")) {
                                stringMap.put("total", "TRUE");
                            } else {
                                stringMap.put("total", "FALSE");
                            }
                            if (stringObjectMap.get("utilized").toString().equalsIgnoreCase("true")) {
                                stringMap.put("utilized", "TRUE");
                            } else {
                                stringMap.put("utilized", "FALSE");
                            }
                            if (stringObjectMap.get("balance").toString().equalsIgnoreCase("true")) {
                                stringMap.put("balance", "TRUE");
                            } else {
                                stringMap.put("balance", "FALSE");
                            }
                            if (stringObjectMap.containsKey("totalValue")) {
                                stringMap.put("totalValue", stringObjectMap.get("totalValue").toString());
                            }
                            if (stringObjectMap.containsKey("utilizedValue")) {
                                stringMap.put("utilizedValue", stringObjectMap.get("utilizedValue").toString());
                            }
                            stringMap.put("initiativeActive", String.valueOf(initiativesDTO.getActive()));
                            stringMap.put("implementationType", "Activity");
                            Map activitiesValue = activitiesDTO.getActivitiesValue();
                            if (activitiesValue.containsKey("desc")) {
                                stringMap.put("typeName", activitiesValue.get("desc").toString());
                                stringMap.put("typeDesc", activitiesValue.get("desc").toString());
                            }
                            stringMap.put("typeDateRange", activitiesValue.get("dateRange").toString());
                            if (activitiesValue.containsKey("progress")) {
                                stringMap.put("typeProgress", activitiesValue.get("progress").toString());
                            }
                            stringMap.put("typeActive", String.valueOf(activitiesDTO.getActive()));
                            if (!activitiesDTO.getActivitiesMapDTOList().isEmpty()) {
                                stringMap.put("multipleOwners", this.getActMultipleOwner(activitiesDTO.getActivitiesMapDTOList()));
                            }
                            mapList.add(stringMap);
                        }
                    }
                    if (!initiativesDTO.getMileStonesList().isEmpty()) {
                        for (Object _obj_milestonesDTO : initiativesDTO.getMileStonesList()) {
                            MilestonesDTO milestonesDTO = (MilestonesDTO) _obj_milestonesDTO;
                            updateStatus = false;
                            stringMap = new HashMap();
                            if (deptUniqueID != null) {
                                stringMap.put("departmentID", deptUniqueID);
                            }
                            stringMap.put("pageName", pageName);
                            stringMap.put("initiativeID", initiativesDTO.getInitiativeId());
                            stringObjectMap = initiativesDTO.getInitiativeValue();
                            stringMap.put("initiativeName", stringObjectMap.get("name").toString());
                            if (stringObjectMap.containsKey("description")) {
                                stringMap.put("initiativeDesc", stringObjectMap.get("description").toString());
                            }
                            stringMap.put("owner", stringObjectMap.get("ownerName").toString());
                            if (stringObjectMap.containsKey("impactDesc")) {
                                stringMap.put("impact", stringObjectMap.get("impactDesc").toString());
                            }
                            if (stringObjectMap.containsKey("progressval")) {
                                stringMap.put("progressval", stringObjectMap.get("progressval").toString());
                            }
                            if (stringObjectMap.containsKey("statusType")) {
                                stringMap.put("statusType", stringObjectMap.get("statusType").toString());
                            }
                            stringMap.put("daterange", stringObjectMap.get("daterange").toString());
                            if (stringObjectMap.containsKey("actualdaterange")) {
                                stringMap.put("actualdaterange", stringObjectMap.get("actualdaterange").toString());
                            }
                            if (stringObjectMap.get("actual").toString().equalsIgnoreCase("true")) {
                                stringMap.put("actual", "TRUE");
                            } else {
                                stringMap.put("actual", "FALSE");
                            }
                            if (stringObjectMap.get("target").toString().equalsIgnoreCase("true")) {
                                stringMap.put("target", "TRUE");
                            } else {
                                stringMap.put("target", "FALSE");
                            }
                            if (stringObjectMap.get("budget").toString().equalsIgnoreCase("true")) {
                                stringMap.put("budget", "TRUE");
                            } else {
                                stringMap.put("budget", "FALSE");
                            }
                            if (stringObjectMap.get("forecast").toString().equalsIgnoreCase("true")) {
                                stringMap.put("forecast", "TRUE");
                            } else {
                                stringMap.put("forecast", "FALSE");
                            }
                            if (stringObjectMap.get("total").toString().equalsIgnoreCase("true")) {
                                stringMap.put("total", "TRUE");
                            } else {
                                stringMap.put("total", "FALSE");
                            }
                            if (stringObjectMap.get("utilized").toString().equalsIgnoreCase("true")) {
                                stringMap.put("utilized", "TRUE");
                            } else {
                                stringMap.put("utilized", "FALSE");
                            }
                            if (stringObjectMap.get("balance").toString().equalsIgnoreCase("true")) {
                                stringMap.put("balance", "TRUE");
                            } else {
                                stringMap.put("balance", "FALSE");
                            }
                            if (stringObjectMap.containsKey("totalValue")) {
                                stringMap.put("totalValue", stringObjectMap.get("totalValue").toString());
                            }
                            if (stringObjectMap.containsKey("utilizedValue")) {
                                stringMap.put("utilizedValue", stringObjectMap.get("utilizedValue").toString());
                            }
                            stringMap.put("initiativeActive", String.valueOf(initiativesDTO.getActive()));
                            stringMap.put("implementationType", "MileStone");
                            Map mileStonesValue = milestonesDTO.getMileStonesValue();
                            if (mileStonesValue.containsKey("desc")) {
                                stringMap.put("typeName", mileStonesValue.get("desc").toString());
                                stringMap.put("typeDesc", mileStonesValue.get("desc").toString());
                            }
                            stringMap.put("mileStoneEndDate", mileStonesValue.get("dateRange").toString());
                            if (mileStonesValue.containsKey("progress")) {
                                stringMap.put("typeProgress", mileStonesValue.get("progress").toString());
                            }
                            stringMap.put("typeActive", String.valueOf(milestonesDTO.getActive()));
                            mapList.add(stringMap);
                        }
                    }
                    if (!updateStatus) continue;
                    Map stringMap2 = new HashMap();
                    if (deptUniqueID != null) {
                        stringMap2.put("departmentID", deptUniqueID);
                    }
                    stringMap2.put("pageName", pageName);
                    stringMap2.put("initiativeID", initiativesDTO.getInitiativeId());
                    Map stringObjectMap2 = initiativesDTO.getInitiativeValue();
                    stringMap2.put("initiativeName", stringObjectMap2.get("name").toString());
                    if (stringObjectMap2.containsKey("description")) {
                        stringMap2.put("initiativeDesc", stringObjectMap2.get("description").toString());
                    }
                    stringMap2.put("owner", stringObjectMap2.get("ownerName").toString());
                    if (stringObjectMap2.containsKey("impactDesc")) {
                        stringMap2.put("impact", stringObjectMap2.get("impactDesc").toString());
                    }
                    if (stringObjectMap2.containsKey("progressval")) {
                        stringMap2.put("progressval", stringObjectMap2.get("progressval").toString());
                    }
                    if (stringObjectMap2.containsKey("statusType")) {
                        stringMap2.put("statusType", stringObjectMap2.get("statusType").toString());
                    }
                    stringMap2.put("daterange", stringObjectMap2.get("daterange").toString());
                    if (stringObjectMap2.containsKey("actualdaterange")) {
                        stringMap2.put("actualdaterange", stringObjectMap2.get("actualdaterange").toString());
                    }
                    if (stringObjectMap2.get("actual").toString().equalsIgnoreCase("true")) {
                        stringMap2.put("actual", "TRUE");
                    } else {
                        stringMap2.put("actual", "FALSE");
                    }
                    if (stringObjectMap2.get("target").toString().equalsIgnoreCase("true")) {
                        stringMap2.put("target", "TRUE");
                    } else {
                        stringMap2.put("target", "FALSE");
                    }
                    if (stringObjectMap2.get("budget").toString().equalsIgnoreCase("true")) {
                        stringMap2.put("budget", "TRUE");
                    } else {
                        stringMap2.put("budget", "FALSE");
                    }
                    if (stringObjectMap2.get("forecast").toString().equalsIgnoreCase("true")) {
                        stringMap2.put("forecast", "TRUE");
                    } else {
                        stringMap2.put("forecast", "FALSE");
                    }
                    if (stringObjectMap2.get("total").toString().equalsIgnoreCase("true")) {
                        stringMap2.put("total", "TRUE");
                    } else {
                        stringMap2.put("total", "FALSE");
                    }
                    if (stringObjectMap2.get("utilized").toString().equalsIgnoreCase("true")) {
                        stringMap2.put("utilized", "TRUE");
                    } else {
                        stringMap2.put("utilized", "FALSE");
                    }
                    if (stringObjectMap2.get("balance").toString().equalsIgnoreCase("true")) {
                        stringMap2.put("balance", "TRUE");
                    } else {
                        stringMap2.put("balance", "FALSE");
                    }
                    if (stringObjectMap2.containsKey("totalValue")) {
                        stringMap2.put("totalValue", stringObjectMap2.get("totalValue").toString());
                    }
                    if (stringObjectMap2.containsKey("utilizedValue")) {
                        stringMap2.put("utilizedValue", stringObjectMap2.get("utilizedValue").toString());
                    }
                    stringMap2.put("initiativeActive", String.valueOf(initiativesDTO.getActive()));
                    mapList.add(stringMap2);
                }
            }
            if (mapList != null && CollectionUtils.isNotEmpty(mapList)) {
                String[] COLUMNs = new String[]{"Department ID", "PageName", "Initiative ID", "Initiative Name", "Initiative Description", "Owner", "Impact", "Progress", "Primary Status", "Status Type", "Planned Start Date/End Date", "Actual Start Date/End Date", "Actual Indicator", "Target Indicator", "Budget Indicator", "Forecast Indicator", "Total Indicator", "Utillized Indicator", "Balance Indicator", "Total Value", " Utilized Value", "Type", "Type Name", "Type Description", "Type Progress", "MultipleOwners", "Start End Date", "MileStone EndDate", "Delete Initiative", "Delete Type"};
                XSSFWorkbook workbook = new XSSFWorkbook();
                CreationHelper createHelper = workbook.getCreationHelper();
                String sheetname = "InitiativeExportName";
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
                    if (map.containsKey("departmentID")) {
                        row.createCell(0).setCellValue((String)map.get("departmentID"));
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
                    if (map.containsKey("initiativeID")) {
                        if (map.get("initiativeID") != null) {
                            row.createCell(2).setCellValue((String)map.get("initiativeID"));
                        } else {
                            row.createCell(2).setCellValue("");
                        }
                    } else {
                        row.createCell(2).setCellValue("");
                    }
                    if (map.containsKey("initiativeName")) {
                        if (map.get("initiativeName") != null) {
                            row.createCell(3).setCellValue((String)map.get("initiativeName"));
                        } else {
                            row.createCell(3).setCellValue("");
                        }
                    } else {
                        row.createCell(3).setCellValue("");
                    }
                    if (map.containsKey("initiativeDesc")) {
                        if (map.get("initiativeDesc") != null) {
                            row.createCell(4).setCellValue((String)map.get("initiativeDesc"));
                        } else {
                            row.createCell(4).setCellValue("");
                        }
                    } else {
                        row.createCell(4).setCellValue("");
                    }
                    if (map.containsKey("owner")) {
                        if (map.get("owner") != null) {
                            row.createCell(5).setCellValue((String)map.get("owner"));
                        } else {
                            row.createCell(5).setCellValue("");
                        }
                    } else {
                        row.createCell(5).setCellValue("");
                    }
                    if (map.containsKey("impact")) {
                        if (map.get("impact") != null) {
                            row.createCell(6).setCellValue((String)map.get("impact"));
                        } else {
                            row.createCell(6).setCellValue("");
                        }
                    } else {
                        row.createCell(6).setCellValue("");
                    }
                    if (map.containsKey("progressval")) {
                        if (map.get("progressval") != null) {
                            row.createCell(7, CellType.STRING).setCellValue((String)map.get("progressval"));
                        } else {
                            row.createCell(7, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(7, CellType.STRING).setCellValue("");
                    }
                    row.createCell(8, CellType.STRING).setCellValue("");
                    if (map.containsKey("statusType")) {
                        if (map.get("statusType") != null) {
                            row.createCell(9).setCellValue((String)map.get("statusType"));
                        } else {
                            row.createCell(9).setCellValue("");
                        }
                    } else {
                        row.createCell(9).setCellValue("");
                    }
                    if (map.containsKey("daterange")) {
                        if (map.get("daterange") != null) {
                            row.createCell(10).setCellValue((String)map.get("daterange"));
                        } else {
                            row.createCell(10).setCellValue("");
                        }
                    } else {
                        row.createCell(10).setCellValue("");
                    }
                    if (map.containsKey("actualdaterange")) {
                        if (map.get("actualdaterange") != null) {
                            row.createCell(11).setCellValue((String)map.get("actualdaterange"));
                        } else {
                            row.createCell(11).setCellValue("");
                        }
                    } else {
                        row.createCell(11).setCellValue("");
                    }
                    if (map.containsKey("actual")) {
                        if (map.get("actual") != null) {
                            row.createCell(12).setCellValue((String)map.get("actual"));
                        } else {
                            row.createCell(12).setCellValue("");
                        }
                    } else {
                        row.createCell(12).setCellValue("");
                    }
                    if (map.containsKey("target")) {
                        if (map.get("target") != null) {
                            row.createCell(13).setCellValue((String)map.get("target"));
                        } else {
                            row.createCell(13).setCellValue("");
                        }
                    } else {
                        row.createCell(13).setCellValue("");
                    }
                    if (map.containsKey("budget")) {
                        if (map.get("budget") != null) {
                            row.createCell(14).setCellValue((String)map.get("budget"));
                        } else {
                            row.createCell(14).setCellValue("");
                        }
                    } else {
                        row.createCell(14).setCellValue("");
                    }
                    if (map.containsKey("forecast")) {
                        if (map.get("forecast") != null) {
                            row.createCell(15).setCellValue((String)map.get("forecast"));
                        } else {
                            row.createCell(15).setCellValue("");
                        }
                    } else {
                        row.createCell(15).setCellValue("");
                    }
                    if (map.containsKey("total")) {
                        if (map.get("total") != null) {
                            row.createCell(16).setCellValue((String)map.get("total"));
                        } else {
                            row.createCell(16).setCellValue("");
                        }
                    } else {
                        row.createCell(16).setCellValue("");
                    }
                    if (map.containsKey("utilized")) {
                        if (map.get("utilized") != null) {
                            row.createCell(17).setCellValue((String)map.get("utilized"));
                        } else {
                            row.createCell(17).setCellValue("");
                        }
                    } else {
                        row.createCell(17).setCellValue("");
                    }
                    if (map.containsKey("balance")) {
                        if (map.get("balance") != null) {
                            row.createCell(18).setCellValue((String)map.get("balance"));
                        } else {
                            row.createCell(18).setCellValue("");
                        }
                    } else {
                        row.createCell(18).setCellValue("");
                    }
                    if (map.containsKey("totalValue")) {
                        if (map.get("totalValue") != null) {
                            row.createCell(19).setCellValue((String)map.get("totalValue"));
                        } else {
                            row.createCell(19).setCellValue("");
                        }
                    } else {
                        row.createCell(19).setCellValue("");
                    }
                    if (map.containsKey("utilizedValue")) {
                        if (map.get("utilizedValue") != null) {
                            row.createCell(20).setCellValue((String)map.get("utilizedValue"));
                        } else {
                            row.createCell(20).setCellValue("");
                        }
                    } else {
                        row.createCell(20).setCellValue("");
                    }
                    if (map.containsKey("implementationType")) {
                        if (map.get("implementationType") != null) {
                            row.createCell(21, CellType.STRING).setCellValue((String)map.get("implementationType"));
                        } else {
                            row.createCell(21, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(21, CellType.STRING).setCellValue("");
                    }
                    if (map.containsKey("typeName")) {
                        if (map.get("typeName") != null) {
                            row.createCell(22).setCellValue((String)map.get("typeName"));
                        } else {
                            row.createCell(22).setCellValue("");
                        }
                    } else {
                        row.createCell(22).setCellValue("");
                    }
                    if (map.containsKey("typeDesc")) {
                        if (map.get("typeDesc") != null) {
                            row.createCell(23).setCellValue((String)map.get("typeDesc"));
                        } else {
                            row.createCell(23).setCellValue("");
                        }
                    } else {
                        row.createCell(23).setCellValue("");
                    }
                    if (map.containsKey("typeProgress")) {
                        if (map.get("typeProgress") != null) {
                            row.createCell(24, CellType.STRING).setCellValue((String)map.get("typeProgress"));
                        } else {
                            row.createCell(24, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(24, CellType.STRING).setCellValue("");
                    }
                    if (map.containsKey("multipleOwners")) {
                        if (map.get("multipleOwners") != null) {
                            row.createCell(25, CellType.STRING).setCellValue((String)map.get("multipleOwners"));
                        } else {
                            row.createCell(25, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(25, CellType.STRING).setCellValue("");
                    }
                    if (map.containsKey("typeDateRange")) {
                        if (map.get("typeDateRange") != null) {
                            row.createCell(26, CellType.STRING).setCellValue((String)map.get("typeDateRange"));
                        } else {
                            row.createCell(26, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(26, CellType.STRING).setCellValue("");
                    }
                    if (map.containsKey("mileStoneEndDate")) {
                        if (map.get("mileStoneEndDate") != null) {
                            row.createCell(27, CellType.STRING).setCellValue((String)map.get("mileStoneEndDate"));
                        } else {
                            row.createCell(27, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(27, CellType.STRING).setCellValue("");
                    }
                    if (map.containsKey("initiativeActive")) {
                        if (map.get("initiativeActive") != null) {
                            row.createCell(28, CellType.STRING).setCellValue((String)map.get("initiativeActive"));
                        } else {
                            row.createCell(28, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(28, CellType.STRING).setCellValue("");
                    }
                    if (map.containsKey("typeActive")) {
                        if (map.get("typeActive") != null) {
                            row.createCell(29, CellType.STRING).setCellValue((String)map.get("typeActive"));
                        } else {
                            row.createCell(29, CellType.STRING).setCellValue("");
                        }
                    } else {
                        row.createCell(29, CellType.STRING).setCellValue("");
                    }
                    Cell cell = row.createCell(30);
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

    public String getSubMultipleOwner(List<SubInitiativesMapDTO> multipleOwners) {
        String email = null;
        if (!multipleOwners.isEmpty() && multipleOwners != null) {
            for (Object _obj_subInitiativesMapDTO : multipleOwners) {
                SubInitiativesMapDTO subInitiativesMapDTO = (SubInitiativesMapDTO) _obj_subInitiativesMapDTO;
                if (email == null) {
                    email = subInitiativesMapDTO.getEmployeeProfilePos().getEmailAddress();
                    continue;
                }
                email = email + ", " + subInitiativesMapDTO.getEmployeeProfilePos().getEmailAddress();
            }
        }
        return email;
    }

    public String getActMultipleOwner(List<ActivitiesMapDTO> multipleOwners) {
        String email = null;
        if (!multipleOwners.isEmpty() && multipleOwners != null) {
            for (Object _obj_activitiesMapDTO : multipleOwners) {
                ActivitiesMapDTO activitiesMapDTO = (ActivitiesMapDTO) _obj_activitiesMapDTO;
                if (email == null) {
                    email = activitiesMapDTO.getEmployeeProfilePos().getEmailAddress();
                    continue;
                }
                email = email + ", " + activitiesMapDTO.getEmployeeProfilePos().getEmailAddress();
            }
        }
        return email;
    }
}

