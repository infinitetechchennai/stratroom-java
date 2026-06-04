/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FormulationInitiativesDTO
 *  com.estrat.web.dto.FormulationSubInitiativesDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.ProjectFormulationDTO
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.ProjectFormulationService
 *  com.estrat.web.util.ProjectFormulationUtil
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.poi.ss.usermodel.Cell
 *  org.apache.poi.xssf.usermodel.XSSFRow
 *  org.apache.poi.xssf.usermodel.XSSFSheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.Employee;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FormulationInitiativesDTO;
import com.estrat.web.dto.FormulationSubInitiativesDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.ProjectFormulationDTO;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.ProjectFormulationService;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@SuppressWarnings({"unchecked", "rawtypes"})
@Component
public class ProjectFormulationUtil {
    @Autowired
    private ProjectFormulationService formulationService;
    @Autowired
    private EmployeeService employeeService;

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public byte[] getFormulationByteData(String formulationId, PageDTO pageDTO) {
        try {
            Object object;
            ProjectFormulationDTO responseDTO = this.formulationService.getProjectFormulation(Long.valueOf(formulationId).longValue(), String.valueOf(true));
            EmployeeDTO employeeDTO = this.employeeService.getEmployeeDetails(String.valueOf(responseDTO.getCreatedBy()));
            List initiativesList = responseDTO.getInitiativesList();
            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet(employeeDTO.getEmailAddress());
            Object[] headers = new Object[]{"PageName", "Initiative ID", "Initiative Name", "Initiative Description", "Owner", "Impact", "Progress", "Primary Status", "Status Type", "Planned Start Date/End Date", "Actual Start Date/End Date", "Actual Indicator", "Target Indicator", "Budget Indicator", "Forecast Indicator", "Total Indicator", "Utillized Indicator", "Balance Indicator", "Total Value", "Utilized Value", "Type", "Type Name", "Type Description", "Type Progress", "MultipleOwners", "Start End Date", "MileStrone EndDate", "Delete Initiative", "Delete Type"};
            this.createHeaders(headers, sheet);
            int rowCount = 1;
            if (initiativesList != null) {
                for (Object _obj_formulationInitiativesDTO : initiativesList) {
                    FormulationInitiativesDTO formulationInitiativesDTO = (FormulationInitiativesDTO) _obj_formulationInitiativesDTO;
                    if (CollectionUtils.isNotEmpty((Collection)formulationInitiativesDTO.getSubInitiativeList())) {
                        object = formulationInitiativesDTO.getSubInitiativeList().iterator();
                        while (((java.util.Iterator)object).hasNext()) {
                            FormulationSubInitiativesDTO initiativesDTO = (FormulationSubInitiativesDTO)((java.util.Iterator)object).next();
                            this.createRow(formulationInitiativesDTO, initiativesDTO, pageDTO, sheet, rowCount);
                            ++rowCount;
                        }
                        continue;
                    }
                    this.createRow(formulationInitiativesDTO, pageDTO, sheet, rowCount);
                    ++rowCount;
                }
            }
            try (ByteArrayOutputStream arrayOutputStream = new ByteArrayOutputStream();){
                workbook.write((OutputStream)arrayOutputStream);
                object = arrayOutputStream.toByteArray();
                return (byte[]) object;
            }
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void createRow(FormulationInitiativesDTO formulationInitiativesDTO, FormulationSubInitiativesDTO initiativesDTO, PageDTO pageDTO, XSSFSheet sheet, int rowCount) {
        XSSFRow row = sheet.createRow(rowCount);
        Cell pageName = row.createCell(0);
        Cell initiativeId = row.createCell(1);
        Cell initiativeName = row.createCell(2);
        Cell initiativeDesc = row.createCell(3);
        Cell owner = row.createCell(4);
        Cell impact = row.createCell(5);
        Cell progress = row.createCell(6);
        Cell primaryStatus = row.createCell(7);
        Cell statusType = row.createCell(8);
        Cell plannedStartEndDate = row.createCell(9);
        Cell actualStartEndDate = row.createCell(10);
        Cell actual = row.createCell(11);
        Cell target = row.createCell(12);
        Cell budget = row.createCell(13);
        Cell forecast = row.createCell(14);
        Cell total = row.createCell(15);
        Cell utilized = row.createCell(16);
        Cell balance = row.createCell(17);
        Cell totalValue = row.createCell(18);
        Cell utlizedValue = row.createCell(19);
        Cell type = row.createCell(20);
        Cell typeName = row.createCell(21);
        Cell typeDesc = row.createCell(22);
        Cell typeProgress = row.createCell(23);
        Cell typeOwners = row.createCell(24);
        Cell startEndDate = row.createCell(25);
        Cell milestoneEndDate = row.createCell(26);
        Cell deleteInitiative = row.createCell(27);
        Cell deleteType = row.createCell(28);
        pageName.setCellValue(pageDTO.getPageName());
        initiativeId.setCellValue("");
        initiativeName.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "name"));
        initiativeDesc.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "name"));
        impact.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "impactDesc"));
        owner.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "ownerName"));
        progress.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "progress"));
        primaryStatus.setCellValue("");
        statusType.setCellValue("");
        plannedStartEndDate.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "daterange"));
        actualStartEndDate.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "startDate"));
        actual.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "actual"));
        target.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "target"));
        budget.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "budget"));
        forecast.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "forecast"));
        total.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "total"));
        utilized.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "utilized"));
        balance.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "balance"));
        totalValue.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "Total"));
        utlizedValue.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "Utilized"));
        deleteInitiative.setCellValue(0.0);
        deleteType.setCellValue(0.0);
        type.setCellValue(initiativesDTO.getType());
        typeName.setCellValue(this.getValue(initiativesDTO.getSubInitiativeValue(), "name"));
        typeDesc.setCellValue(this.getValue(initiativesDTO.getSubInitiativeValue(), "name"));
        typeProgress.setCellValue(this.getValue(initiativesDTO.getSubInitiativeValue(), "progress"));
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getEmployeeList())) {
            typeOwners.setCellValue(this.getMultipleOwnerEmails(initiativesDTO.getEmployeeList()));
        } else {
            typeOwners.setCellValue("");
        }
        if (initiativesDTO.getType().equals("Milestone")) {
            milestoneEndDate.setCellValue(this.getValue(initiativesDTO.getSubInitiativeValue(), "daterange"));
        } else {
            startEndDate.setCellValue(this.getValue(initiativesDTO.getSubInitiativeValue(), "daterange"));
        }
    }

    public void createRow(FormulationInitiativesDTO formulationInitiativesDTO, PageDTO pageDTO, XSSFSheet sheet, int rowCount) {
        XSSFRow row = sheet.createRow(rowCount);
        Cell pageName = row.createCell(0);
        Cell initiativeId = row.createCell(1);
        Cell initiativeName = row.createCell(2);
        Cell initiativeDesc = row.createCell(3);
        Cell owner = row.createCell(4);
        Cell impact = row.createCell(5);
        Cell progress = row.createCell(6);
        Cell primaryStatus = row.createCell(7);
        Cell statusType = row.createCell(8);
        Cell plannedStartEndDate = row.createCell(9);
        Cell actualStartEndDate = row.createCell(10);
        Cell actual = row.createCell(11);
        Cell target = row.createCell(12);
        Cell budget = row.createCell(13);
        Cell forecast = row.createCell(14);
        Cell total = row.createCell(15);
        Cell utilized = row.createCell(16);
        Cell balance = row.createCell(17);
        Cell totalValue = row.createCell(18);
        Cell utlizedValue = row.createCell(19);
        Cell type = row.createCell(20);
        Cell typeName = row.createCell(21);
        Cell typeDesc = row.createCell(22);
        Cell typeProgress = row.createCell(23);
        Cell typeOwners = row.createCell(24);
        Cell startEndDate = row.createCell(25);
        Cell milestoneEndDate = row.createCell(26);
        Cell deleteInitiative = row.createCell(27);
        Cell deleteType = row.createCell(28);
        pageName.setCellValue(pageDTO.getPageName());
        initiativeId.setCellValue("");
        initiativeName.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "name"));
        initiativeDesc.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "name"));
        impact.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "impactDesc"));
        owner.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "ownerName"));
        progress.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "progress"));
        primaryStatus.setCellValue("");
        statusType.setCellValue("");
        plannedStartEndDate.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "daterange"));
        actualStartEndDate.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "startDate"));
        actual.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "actual"));
        target.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "target"));
        budget.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "budget"));
        forecast.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "forecast"));
        total.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "total"));
        utilized.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "utilized"));
        balance.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "balance"));
        totalValue.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "total"));
        utlizedValue.setCellValue(this.getValue(formulationInitiativesDTO.getInitiativeValue(), "utilized"));
        deleteInitiative.setCellValue(0.0);
        deleteType.setCellValue(0.0);
        type.setCellValue("");
        typeName.setCellValue("");
        typeDesc.setCellValue("");
        typeProgress.setCellValue("");
        typeOwners.setCellValue("");
        startEndDate.setCellValue("");
        milestoneEndDate.setCellValue("");
    }

    private String getValue(Map mapObject, String key) {
        if (Objects.nonNull(mapObject) && Objects.nonNull(mapObject.get(key))) {
            return StringUtils.stripToEmpty((String)mapObject.get(key).toString());
        }
        return "";
    }

    public void createHeaders(Object[] headres, XSSFSheet sheet) {
        XSSFRow row = sheet.createRow(0);
        int columnCount = 0;
        for (Object field : headres) {
            Cell cell = row.createCell(columnCount);
            cell.setCellValue((String)field);
            ++columnCount;
        }
    }

    public Map<String, FormulationInitiativesDTO> mapPage(List<FormulationInitiativesDTO> initiativeList) {
        HashMap<String, FormulationInitiativesDTO> initiativesMap = new HashMap<String, FormulationInitiativesDTO>();
        if (CollectionUtils.isNotEmpty(initiativeList)) {
            initiativeList.forEach(initiative -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(initiative.getInitiativeValue(), "name"))) {
                    initiativesMap.put(this.getValue(initiative.getInitiativeValue(), "name"), this.mapChildInitiatives(initiative));
                }
            });
        }
        return initiativesMap;
    }

    public FormulationInitiativesDTO mapChildInitiatives(FormulationInitiativesDTO initiativesDTO) {
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
            HashMap activitiesMap = new HashMap();
            initiativesDTO.getSubInitiativeList().forEach(activity -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(activity.getSubInitiativeValue(), "name")) && "Activities".equalsIgnoreCase(activity.getType())) {
                    activitiesMap.put(this.getValue(activity.getSubInitiativeValue(), "name"), activity);
                }
            });
            initiativesDTO.setActivitiesMap(activitiesMap);
        }
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
            HashMap mileStonesMap = new HashMap();
            initiativesDTO.getSubInitiativeList().forEach(milestones -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(milestones.getSubInitiativeValue(), "name")) && "Milestone".equalsIgnoreCase(milestones.getType())) {
                    mileStonesMap.put(this.getValue(milestones.getSubInitiativeValue(), "name"), milestones);
                }
            });
            initiativesDTO.setMileStonesMap(mileStonesMap);
        }
        if (CollectionUtils.isNotEmpty((Collection)initiativesDTO.getSubInitiativeList())) {
            HashMap subInitiaitivesMap = new HashMap();
            initiativesDTO.getSubInitiativeList().forEach(subInitiaitive -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(subInitiaitive.getSubInitiativeValue(), "name")) && "Sub initiative".equalsIgnoreCase(subInitiaitive.getType())) {
                    subInitiaitivesMap.put(this.getValue(subInitiaitive.getSubInitiativeValue(), "name"), subInitiaitive);
                }
            });
            initiativesDTO.setSubInitiativeMap(subInitiaitivesMap);
        }
        return initiativesDTO;
    }

    public Map<String, KPIDTO> mapKPI(List<KPIDTO> kpiList) {
        HashMap<String, KPIDTO> kpiMap = new HashMap<String, KPIDTO>();
        if (CollectionUtils.isNotEmpty(kpiList)) {
            kpiList.forEach(kpi -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(kpi.getKpiValue(), "name"))) {
                    kpiMap.put(kpi.getKpiName(), (KPIDTO)kpi);
                }
            });
        }
        return kpiMap;
    }

    private String getMultipleOwnerEmails(List<Employee> list) {
        if (CollectionUtils.isNotEmpty(list)) {
            StringBuffer owners = new StringBuffer();
            list.forEach(owner -> {
                if (owner != null) {
                    owners.append(owner.getEmailAddress());
                    owners.append(",");
                }
            });
            return StringUtils.isNotEmpty((CharSequence)owners.toString()) ? owners.substring(0, owners.lastIndexOf(",")) : "";
        }
        return "";
    }
}

