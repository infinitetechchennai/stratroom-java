/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.EmployeeDTO
 *  com.estrat.web.dto.FormulationRiskActivitiesDTO
 *  com.estrat.web.dto.FormulationRiskDTO
 *  com.estrat.web.dto.FormulationSubRiskDTO
 *  com.estrat.web.dto.KPIDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.RiskFormulationDTO
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.RiskFormulationService
 *  com.estrat.web.util.RiskFormulationUtil
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.poi.ss.usermodel.Cell
 *  org.apache.poi.ss.usermodel.Row
 *  org.apache.poi.xssf.usermodel.XSSFRow
 *  org.apache.poi.xssf.usermodel.XSSFSheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.web.util;

import com.estrat.web.dto.Employee;
import com.estrat.web.dto.EmployeeDTO;
import com.estrat.web.dto.FormulationRiskActivitiesDTO;
import com.estrat.web.dto.FormulationRiskDTO;
import com.estrat.web.dto.FormulationSubRiskDTO;
import com.estrat.web.dto.KPIDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.RiskFormulationDTO;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.RiskFormulationService;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RiskFormulationUtil {
    @Autowired
    private RiskFormulationService formulationService;
    @Autowired
    private EmployeeService employeeService;

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public byte[] getFormulationByteData(String formulationId, PageDTO pageDTO) {
        try {
            RiskFormulationDTO responseDTO = this.formulationService.getRiskFormulation(Long.valueOf(formulationId).longValue(), true);
            EmployeeDTO employeeDTO = this.employeeService.getEmployeeDetails(String.valueOf(responseDTO.getCreatedBy()));
            List riskList = responseDTO.getRiskList();
            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet(employeeDTO.getEmailAddress());
            Object[] headers = new Object[]{"PageName", "Name", "Description", "Owner", "Likelihood", "Impact", "Category", "Business Impact", "Financial Impact", "Date Raised", "Date Completed", "Next Assessment", "Type", "Type Name", "Type Description", "Type Owners", "Activity Name", "Activity Description", "Rating", "Action", "Resolve By", "Progress", "Status", "Cause", "RiskDelete", "TypeDelete", "ActivityDelete"};
            this.createHeaders(headers, sheet);
            int rowCount = 1;
            Map riskMap = this.getSubRiskMap(riskList);
            List subRiskList = (List)riskMap.get("subRiskList");
            List riskListData = (List)riskMap.get("riskList");
            Map causeMap = (Map)riskMap.get("causeMap");
            if (riskListData != null) {
                for (Object _obj_riskDTO : riskListData) {
                    FormulationRiskDTO riskDTO = (FormulationRiskDTO) _obj_riskDTO;
                    this.createRow(riskDTO, pageDTO, sheet, rowCount);
                    ++rowCount;
                }
            }
            if (subRiskList != null) {
                for (Object _obj_formulationSubRiskDTO : subRiskList) {
                    FormulationSubRiskDTO formulationSubRiskDTO = (FormulationSubRiskDTO) _obj_formulationSubRiskDTO;
                    if (CollectionUtils.isNotEmpty((Collection)formulationSubRiskDTO.getActivitiesList())) {
                        java.util.Iterator _iter = formulationSubRiskDTO.getActivitiesList().iterator();
                        while (_iter.hasNext()) {
                            FormulationRiskActivitiesDTO formulationRiskActivitiesDTO = (FormulationRiskActivitiesDTO)_iter.next();
                            this.createRow(formulationRiskActivitiesDTO, pageDTO, sheet, rowCount, causeMap);
                            ++rowCount;
                        }
                        continue;
                    }
                    this.createRow(formulationSubRiskDTO, pageDTO, sheet, rowCount, causeMap);
                    ++rowCount;
                }
            }
            try (ByteArrayOutputStream arrayOutputStream = new ByteArrayOutputStream();){
                workbook.write((OutputStream)arrayOutputStream);
                return arrayOutputStream.toByteArray();
            }
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Map<String, Object> getSubRiskMap(List<FormulationRiskDTO> riskList) {
        LinkedHashMap<String, Object> subInitiativesMap = new LinkedHashMap<String, Object>();
        if (CollectionUtils.isNotEmpty(riskList)) {
            List riskListValue;
            List subRiskList = riskList.stream().filter(risk -> CollectionUtils.isNotEmpty((Collection)risk.getSubRiskList())).flatMap(risk -> risk.getSubRiskList().stream()).collect(Collectors.toList());
            if (CollectionUtils.isNotEmpty(subRiskList)) {
                subInitiativesMap.put("subRiskList", subRiskList);
                Map<Long, FormulationSubRiskDTO> causeMap = ((java.util.List<FormulationSubRiskDTO>)subRiskList).stream().filter(risk -> "Cause".equalsIgnoreCase(risk.getType())).collect(Collectors.toMap(FormulationSubRiskDTO::getId, risk -> risk));
                subInitiativesMap.put("causeMap", causeMap);
            }
            if (CollectionUtils.isNotEmpty(riskListValue = riskList.stream().filter(risk -> CollectionUtils.isEmpty((Collection)risk.getSubRiskList())).collect(Collectors.toList()))) {
                subInitiativesMap.put("riskList", riskListValue);
            }
        }
        return subInitiativesMap;
    }

    public Row createRow(FormulationRiskDTO formulationRiskDTO, PageDTO pageDTO, XSSFSheet sheet, int rowCount) {
        XSSFRow row = sheet.createRow(rowCount);
        Cell pageName = row.createCell(0);
        Cell name = row.createCell(1);
        Cell desc = row.createCell(2);
        Cell owner = row.createCell(3);
        Cell liklihood = row.createCell(4);
        Cell impact = row.createCell(5);
        Cell category = row.createCell(6);
        Cell businessImpact = row.createCell(7);
        Cell financialImpact = row.createCell(8);
        Cell dateRaised = row.createCell(9);
        Cell dateCompleted = row.createCell(10);
        Cell nextAssessment = row.createCell(11);
        Cell type = row.createCell(12);
        Cell typeName = row.createCell(13);
        Cell typeDesc = row.createCell(14);
        Cell typeOwners = row.createCell(15);
        Cell activityName = row.createCell(16);
        Cell activityDesc = row.createCell(17);
        Cell rating = row.createCell(18);
        Cell action = row.createCell(19);
        Cell resolveBy = row.createCell(20);
        Cell progress = row.createCell(21);
        Cell status = row.createCell(22);
        Cell cause = row.createCell(23);
        Cell riskDelete = row.createCell(24);
        Cell typeDelete = row.createCell(25);
        Cell activityDelete = row.createCell(26);
        action.setCellValue("NA");
        pageName.setCellValue(pageDTO.getPageName());
        name.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "name"));
        desc.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "name"));
        owner.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "ownerName"));
        liklihood.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "likelihood"));
        impact.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "impact"));
        category.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "category"));
        businessImpact.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "businessimpact"));
        financialImpact.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "financialImpact"));
        dateRaised.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "dateraised"));
        dateCompleted.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "dateCompleted"));
        nextAssessment.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "nextAssessment"));
        type.setCellValue("");
        typeName.setCellValue("");
        typeDesc.setCellValue("");
        typeOwners.setCellValue("");
        activityName.setCellValue("");
        activityDesc.setCellValue("");
        rating.setCellValue("");
        resolveBy.setCellValue("");
        progress.setCellValue("");
        status.setCellValue("");
        cause.setCellValue("");
        riskDelete.setCellValue(0.0);
        typeDelete.setCellValue(0.0);
        activityDelete.setCellValue(0.0);
        return row;
    }

    public Row createRow(FormulationRiskActivitiesDTO formulationRiskActivitiesDTO, PageDTO pageDTO, XSSFSheet sheet, int rowCount, Map<Long, FormulationSubRiskDTO> causeMap) {
        FormulationSubRiskDTO formulationSubRiskDTO = formulationRiskActivitiesDTO.getSubRiskDTO();
        FormulationRiskDTO formulationRiskDTO = formulationSubRiskDTO.getRiskDTO();
        XSSFRow row = sheet.createRow(rowCount);
        Cell pageName = row.createCell(0);
        Cell name = row.createCell(1);
        Cell desc = row.createCell(2);
        Cell owner = row.createCell(3);
        Cell liklihood = row.createCell(4);
        Cell impact = row.createCell(5);
        Cell category = row.createCell(6);
        Cell businessImpact = row.createCell(7);
        Cell financialImpact = row.createCell(8);
        Cell dateRaised = row.createCell(9);
        Cell dateCompleted = row.createCell(10);
        Cell nextAssessment = row.createCell(11);
        Cell type = row.createCell(12);
        Cell typeName = row.createCell(13);
        Cell typeDesc = row.createCell(14);
        Cell typeOwners = row.createCell(15);
        Cell activityName = row.createCell(16);
        Cell activityDesc = row.createCell(17);
        Cell rating = row.createCell(18);
        Cell action = row.createCell(19);
        Cell resolveBy = row.createCell(20);
        Cell progress = row.createCell(21);
        Cell status = row.createCell(22);
        Cell cause = row.createCell(23);
        Cell riskDelete = row.createCell(24);
        Cell typeDelete = row.createCell(25);
        Cell activityDelete = row.createCell(26);
        action.setCellValue("NA");
        pageName.setCellValue(pageDTO.getPageName());
        name.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "name"));
        desc.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "name"));
        owner.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "ownerName"));
        liklihood.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "likelihood"));
        impact.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "impact"));
        category.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "category"));
        businessImpact.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "businessimpact"));
        financialImpact.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "financialImpact"));
        dateRaised.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "dateraised"));
        dateCompleted.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "dateCompleted"));
        nextAssessment.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "nextAssessment"));
        type.setCellValue(formulationSubRiskDTO.getType());
        typeName.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "name"));
        typeDesc.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "name"));
        typeOwners.setCellValue(this.getMultipleOwnerEmails(formulationSubRiskDTO.getEmployeeList()));
        activityName.setCellValue(this.getValue(formulationRiskActivitiesDTO.getActivityValue(), "name"));
        activityDesc.setCellValue(this.getValue(formulationRiskActivitiesDTO.getActivityValue(), "name"));
        rating.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "rating"));
        resolveBy.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "resolveby"));
        progress.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "progressval"));
        status.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "status"));
        String causeId = this.getValue(formulationSubRiskDTO.getSubRiskValue(), "plancause");
        if (StringUtils.isNotEmpty((CharSequence)causeId)) {
            FormulationSubRiskDTO subRiskDTO = Objects.nonNull(causeMap) ? causeMap.get(Long.valueOf(causeId)) : new FormulationSubRiskDTO();
            cause.setCellValue(this.getValue(subRiskDTO.getSubRiskValue(), "name"));
        } else {
            cause.setCellValue("");
        }
        riskDelete.setCellValue(0.0);
        typeDelete.setCellValue(0.0);
        activityDelete.setCellValue(0.0);
        return row;
    }

    public Row createRow(FormulationSubRiskDTO formulationSubRiskDTO, PageDTO pageDTO, XSSFSheet sheet, int rowCount, Map<Long, FormulationSubRiskDTO> causeMap) {
        FormulationRiskDTO formulationRiskDTO = formulationSubRiskDTO.getRiskDTO();
        XSSFRow row = sheet.createRow(rowCount);
        Cell pageName = row.createCell(0);
        Cell name = row.createCell(1);
        Cell desc = row.createCell(2);
        Cell owner = row.createCell(3);
        Cell liklihood = row.createCell(4);
        Cell impact = row.createCell(5);
        Cell category = row.createCell(6);
        Cell businessImpact = row.createCell(7);
        Cell financialImpact = row.createCell(8);
        Cell dateRaised = row.createCell(9);
        Cell dateCompleted = row.createCell(10);
        Cell nextAssessment = row.createCell(11);
        Cell type = row.createCell(12);
        Cell typeName = row.createCell(13);
        Cell typeDesc = row.createCell(14);
        Cell typeOwners = row.createCell(15);
        Cell activityName = row.createCell(16);
        Cell activityDesc = row.createCell(17);
        Cell rating = row.createCell(18);
        Cell action = row.createCell(19);
        Cell resolveBy = row.createCell(20);
        Cell progress = row.createCell(21);
        Cell status = row.createCell(22);
        Cell cause = row.createCell(23);
        Cell riskDelete = row.createCell(24);
        Cell typeDelete = row.createCell(25);
        Cell activityDelete = row.createCell(26);
        action.setCellValue("NA");
        pageName.setCellValue(pageDTO.getPageName());
        name.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "name"));
        desc.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "name"));
        owner.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "ownerName"));
        liklihood.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "likelihood"));
        impact.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "impact"));
        category.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "category"));
        businessImpact.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "businessimpact"));
        financialImpact.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "financialImpact"));
        dateRaised.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "dateRaised"));
        dateCompleted.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "dateCompleted"));
        nextAssessment.setCellValue(this.getValue(formulationRiskDTO.getRiskValue(), "nextAssessment"));
        type.setCellValue(formulationSubRiskDTO.getType());
        typeName.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "name"));
        typeDesc.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "name"));
        typeOwners.setCellValue(this.getMultipleOwnerEmails(formulationSubRiskDTO.getEmployeeList()));
        activityName.setCellValue("");
        activityDesc.setCellValue("");
        rating.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "rating"));
        resolveBy.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "resolveby"));
        progress.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "progressval"));
        status.setCellValue(this.getValue(formulationSubRiskDTO.getSubRiskValue(), "status"));
        String causeId = this.getValue(formulationSubRiskDTO.getSubRiskValue(), "plancause");
        if (StringUtils.isNotEmpty((CharSequence)causeId)) {
            FormulationSubRiskDTO subRiskDTO = Objects.nonNull(causeMap) ? causeMap.get(Long.valueOf(causeId)) : new FormulationSubRiskDTO();
            cause.setCellValue(this.getValue(subRiskDTO.getSubRiskValue(), "name"));
        } else {
            cause.setCellValue("");
        }
        riskDelete.setCellValue(0.0);
        typeDelete.setCellValue(0.0);
        activityDelete.setCellValue(0.0);
        return row;
    }

    public Map<String, FormulationRiskDTO> mapPage(RiskFormulationDTO riskFormulationDTO) {
        HashMap<String, FormulationRiskDTO> riskMap = new HashMap<String, FormulationRiskDTO>();
        if (CollectionUtils.isNotEmpty((Collection)riskFormulationDTO.getRiskList())) {
            riskFormulationDTO.getRiskList().forEach(risk -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(risk.getRiskValue(), "name"))) {
                    riskMap.put(this.getValue(risk.getRiskValue(), "name"), this.mapChildRisk(risk));
                }
            });
        }
        return riskMap;
    }

    public FormulationRiskDTO mapChildRisk(FormulationRiskDTO riskDTO) {
        if (CollectionUtils.isNotEmpty((Collection)riskDTO.getSubRiskList())) {
            HashMap planMap = new HashMap();
            riskDTO.getSubRiskList().forEach(subRisk -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(subRisk.getSubRiskValue(), "name")) && "Plan".equalsIgnoreCase(subRisk.getType())) {
                    planMap.put(this.getValue(subRisk.getSubRiskValue(), "name"), this.mapChildRiskActivity(subRisk, "Plan"));
                }
            });
            riskDTO.setPlanMap(planMap);
        }
        if (CollectionUtils.isNotEmpty((Collection)riskDTO.getSubRiskList())) {
            HashMap causeMap = new HashMap();
            riskDTO.getSubRiskList().forEach(subRisk -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(subRisk.getSubRiskValue(), "name")) && "Cause".equalsIgnoreCase(subRisk.getType())) {
                    causeMap.put(this.getValue(subRisk.getSubRiskValue(), "name"), this.mapChildRiskActivity(subRisk, "Consequence"));
                }
            });
            riskDTO.setCauseConqMap(causeMap);
        }
        return riskDTO;
    }

    public FormulationSubRiskDTO mapChildRiskActivity(FormulationSubRiskDTO subRiskDTO, String type) {
        if (CollectionUtils.isNotEmpty((Collection)subRiskDTO.getActivitiesList())) {
            HashMap planMap = new HashMap();
            subRiskDTO.getActivitiesList().forEach(acivity -> {
                if (StringUtils.isNotEmpty((CharSequence)this.getValue(acivity.getActivityValue(), "name"))) {
                    planMap.put(this.getValue(acivity.getActivityValue(), "name"), acivity);
                }
            });
            if ("Plan".equalsIgnoreCase(type)) {
                subRiskDTO.setPlanActivityMap(planMap);
            } else {
                subRiskDTO.setConsequenceMap(planMap);
            }
        }
        return subRiskDTO;
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

    private String getValue(Map<String, Object> mapObject, String key) {
        if (Objects.nonNull(mapObject) && Objects.nonNull(mapObject.get(key))) {
            return StringUtils.stripToEmpty((String)mapObject.get(key).toString());
        }
        return "";
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

    public void createHeaders(Object[] headres, XSSFSheet sheet) {
        XSSFRow row = sheet.createRow(0);
        int columnCount = 0;
        for (Object field : headres) {
            Cell cell = row.createCell(columnCount);
            cell.setCellValue((String)field);
            ++columnCount;
        }
    }
}

