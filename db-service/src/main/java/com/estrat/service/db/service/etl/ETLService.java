/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.DepartmentDetails
 *  com.estrat.service.db.bean.po.KPI
 *  com.estrat.service.db.bean.po.KPIDetailsPo
 *  com.estrat.service.db.bean.po.KPIElementDetailsPo
 *  com.estrat.service.db.bean.po.KpiTargetDetailsPo
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.BatchDAO
 *  com.estrat.service.db.dao.KPIDAO
 *  com.estrat.service.db.dao.KPIDetailsRepository
 *  com.estrat.service.db.dao.KPIRepository
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.KPIDetailsDTO
 *  com.estrat.service.db.exception.ExceptionLogHelper
 *  com.estrat.service.db.repository.DepartmentDetailsRepository
 *  com.estrat.service.db.repository.KPITargetDetailsRepository
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.etl.ETLService
 *  javax.transaction.Transactional
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service.etl;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.DepartmentDetails;
import com.estrat.service.db.bean.po.KPI;
import com.estrat.service.db.bean.po.KPIDetailsPo;
import com.estrat.service.db.bean.po.KPIElementDetailsPo;
import com.estrat.service.db.bean.po.KpiTargetDetailsPo;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.BatchDAO;
import com.estrat.service.db.dao.KPIDAO;
import com.estrat.service.db.dao.KPIDetailsRepository;
import com.estrat.service.db.dao.KPIRepository;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.KPIDetailsDTO;
import com.estrat.service.db.exception.ExceptionLogHelper;
import com.estrat.service.db.repository.DepartmentDetailsRepository;
import com.estrat.service.db.repository.KPITargetDetailsRepository;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.EmployeeService;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import javax.transaction.Transactional;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class ETLService {
    private Logger logger = Logger.getLogger(ETLService.class);
    @Autowired
    private DBCache dbCache;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private KPIDetailsRepository kpiDetailsRepository;
    @Autowired
    private KPIRepository kpiRepository;
    @Autowired
    private KPITargetDetailsRepository kpiTargetDetailsRepository;
    @Autowired
    private KPIDAO kpidao;
    @Autowired
    private BatchDAO batchDAO;
    @Autowired
    private DepartmentDetailsRepository departmentDetailsRepository;

    public Map<String, Object> saveKpiDetails(List<KPIDetailsDTO> detailsDTOs, long batchId) {
        boolean flag = false;
        EmployeeDTO employeeDTO = new EmployeeDTO();
        HashMap<String, Object> response = new HashMap<String, Object>();
        employeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get()).longValue());
        Employee employee = this.employeeService.getEmployee(employeeDTO);
        long count = 0L;
        boolean annualTemplate = false;
        ArrayList<KPIDetailsDTO> failedList = new ArrayList<KPIDetailsDTO>();
        for (KPIDetailsDTO kpiDetails : detailsDTOs) {
            boolean proceed;
            if (this.isAnnualTargetTemplate(kpiDetails)) {
                annualTemplate = true;
                kpiDetails.setBatchId(batchId);
                proceed = this.saveKpiAnnualTarget(kpiDetails, employee, response);
                if (proceed) continue;
                ++count;
                failedList.add(kpiDetails);
                continue;
            }
            kpiDetails.setBatchId(batchId);
            proceed = this.saveOrgKpiDetails(kpiDetails, employee, response);
            if (!proceed) {
                ++count;
                failedList.add(kpiDetails);
                continue;
            }
            flag = true;
        }
        if (flag) {
            String cacheKey = String.join((CharSequence)"_withorg_", "nodeKeyList", String.valueOf(employee.getOrgDetails().getOrgId()));
            this.dbCache.remove((Object)cacheKey, "dbCache");
        }
        this.createErrorRecords(failedList);
        if (annualTemplate) {
            long updatedCount = response.get("updated") != null ? new Long(response.get("updated").toString()) : 0L;
            response.put("result", true);
            response.put("rejected", count);
            response.put("written", updatedCount);
            response.put("valueList", failedList);
        } else {
            long updatedCount = response.get("updated") != null ? new Long(response.get("updated").toString()) : 0L;
            long updatedSubCount = response.get("updatedSub") != null ? new Long(response.get("updatedSub").toString()) : 0L;
            long writtenCount = (long)detailsDTOs.size() - (count + updatedCount);
            long writtenSubCount = (long)detailsDTOs.size() - (count + updatedSubCount);
            response.put("result", true);
            response.put("rejected", count);
            response.put("written", writtenCount);
            response.put("writtenSub", writtenSubCount);
            response.put("valueList", failedList);
        }
        return response;
    }

    public void createErrorRecords(List<KPIDetailsDTO> detailsDTOs) {
        if (CollectionUtils.isNotEmpty(detailsDTOs)) {
            detailsDTOs.forEach(kpiDetailDTO -> this.batchDAO.createErrorRecords(kpiDetailDTO));
        }
    }

    public long createBatch(String batchName) {
        return this.batchDAO.createBatch(batchName);
    }

    public boolean isAnnualTargetTemplate(KPIDetailsDTO kpiDetailsDTO) {
        String templateType = StringUtils.trimToEmpty((String)kpiDetailsDTO.getTemplateType());
        return "AnnualTarget".equalsIgnoreCase(templateType) || StringUtils.isNotEmpty((CharSequence)kpiDetailsDTO.getTargetYear());
    }

    public boolean saveOrgKpiDetails(KPIDetailsDTO kpiDetails, Employee employee, Map<String, Object> response) {
        try {
            String empId;
            DepartmentDetails departmentDetails;
            Employee employeeObj;
            long orgKey;
            long updatedCount = response.get("updated") != null ? new Long(response.get("updated").toString()) : 0L;
            long updatedSubCount = response.get("updatedSub") != null ? new Long(response.get("updatedSub").toString()) : 0L;
            kpiDetails.setEmpId(Long.valueOf(UserThreadLocal.get()).longValue());
            long l = orgKey = StringUtils.isNotEmpty((CharSequence)kpiDetails.getOrgKey()) ? new BigDecimal(kpiDetails.getOrgKey()).longValue() : 0L;
            if (orgKey == 0L && StringUtils.isNotEmpty((CharSequence)kpiDetails.getEmailAddress())) {
                employeeObj = this.employeeService.getEmployeeIDByEmail(kpiDetails.getEmailAddress().trim());
                if (employeeObj == null) {
                    return false;
                }
                if (kpiDetails.getDepartmentUniqueId() != null && !kpiDetails.getDepartmentUniqueId().isEmpty()) {
                    this.logger.error((Object)("Department UniqueId  ::" + kpiDetails.getDepartmentUniqueId()));
                    departmentDetails = this.departmentDetailsRepository.findByDeptUniqueId(kpiDetails.getDepartmentUniqueId(), employeeObj.getOrgDetails().getOrgId(), "Active");
                    if (departmentDetails == null) {
                        this.logger.error((Object)("Exception while processing ETL kpi details Department ID not found " + kpiDetails.getDepartmentUniqueId()));
                        kpiDetails.setCauseOfFailure("Department unique Id not found " + kpiDetails.getDepartmentUniqueId());
                        return false;
                    }
                    kpiDetails.setDeptId(Long.valueOf(departmentDetails.getId()));
                }
                empId = String.valueOf(employeeObj != null ? employeeObj.getEmpId() : employee.getEmpId());
                String orgName = employeeObj != null ? employeeObj.getFirstName() : employee.getFirstName();
                kpiDetails.setOrgKey(empId);
                kpiDetails.setOrganizationName(orgName);
            } else if (orgKey == 0L && StringUtils.isNotEmpty((CharSequence)kpiDetails.getOrganizationName())) {
                employeeObj = this.employeeService.getEmployeeId(kpiDetails.getOrganizationName().trim(), employee.getOrgDetails().getOrgId());
                if (employeeObj == null) {
                    kpiDetails.setCauseOfFailure("Org not found " + kpiDetails.getOrganizationName());
                    this.logger.error((Object)("Exception while processing ETL kpi details Org not found ::" + kpiDetails.getOrganizationName()));
                    return false;
                }
                if (kpiDetails.getDepartmentUniqueId() != null && !kpiDetails.getDepartmentUniqueId().isEmpty()) {
                    this.logger.error((Object)("getDepartmentName is a dept uniqueId ::" + kpiDetails.getDepartmentUniqueId()));
                    departmentDetails = this.departmentDetailsRepository.findByDeptUniqueId(kpiDetails.getDepartmentUniqueId(), employeeObj.getOrgDetails().getOrgId(), "Active");
                    if (departmentDetails == null) {
                        kpiDetails.setCauseOfFailure("Department uniqueId  found " + kpiDetails.getDepartmentUniqueId());
                        this.logger.error((Object)("Exception while processing ETL kpi details Department not found ::" + kpiDetails.getDepartmentUniqueId()));
                        return false;
                    }
                    kpiDetails.setDeptId(Long.valueOf(departmentDetails.getId()));
                }
                empId = String.valueOf(employeeObj != null ? employeeObj.getEmpId() : employee.getEmpId());
                kpiDetails.setOrgKey(empId);
                kpiDetails.setOrganizationName(kpiDetails.getOrganizationName().trim());
            } else if (orgKey == 0L) {
                if (employee == null) {
                    kpiDetails.setCauseOfFailure("Org not found " + kpiDetails.getOrganizationName());
                    this.logger.error((Object)("Exception while processing ETL kpi details Org not found ::" + kpiDetails.getOrganizationName()));
                    return false;
                }
                if (kpiDetails.getDepartmentUniqueId() != null && !kpiDetails.getDepartmentUniqueId().isEmpty()) {
                    this.logger.error((Object)("getDepartmentName is a dept uniqueId ::" + kpiDetails.getDepartmentUniqueId()));
                    DepartmentDetails departmentDetails2 = this.departmentDetailsRepository.findByDeptUniqueId(kpiDetails.getDepartmentUniqueId(), employee.getOrgDetails().getOrgId(), "Active");
                    if (departmentDetails2 == null) {
                        kpiDetails.setCauseOfFailure("Department uniqueId  found " + kpiDetails.getDepartmentUniqueId());
                        this.logger.error((Object)("Exception while processing ETL kpi details Department not found ::" + kpiDetails.getDepartmentUniqueId()));
                        return false;
                    }
                    kpiDetails.setDeptId(Long.valueOf(departmentDetails2.getId()));
                }
                String empId2 = String.valueOf(employee != null ? employee.getEmpId() : employee.getEmpId());
                kpiDetails.setOrgKey(empId2);
                kpiDetails.setOrganizationName(employee.getFirstName());
            }
            if (!this.applyNodeKey(kpiDetails, employee)) {
                return false;
            }
            KPIDetailsDTO subkpidetails = kpiDetails;
            KPIDetailsPo detailsPo = new KPIDetailsPo(kpiDetails);
            if ((detailsPo = this.kpidao.validateAndUpdate(detailsPo)).getOrgKpiId() != 0L) {
                ++updatedCount;
            }
            if ((StringUtils.isNotEmpty((CharSequence)subkpidetails.getSubNodeKey()) || StringUtils.isNotEmpty((CharSequence)subkpidetails.getSubMeasureName())) && detailsPo.getMtdActual() != null && Double.parseDouble(detailsPo.getMtdActual()) != 0.0 && detailsPo.getMtdTarget() != null && Double.parseDouble(detailsPo.getMtdTarget()) != 0.0) {
                this.kpiDetailsRepository.save(detailsPo);
            } else if (StringUtils.isEmpty((CharSequence)subkpidetails.getSubNodeKey()) && StringUtils.isEmpty((CharSequence)subkpidetails.getSubMeasureName())) {
                this.kpiDetailsRepository.save(detailsPo);
            }
            if (StringUtils.isNotEmpty((CharSequence)subkpidetails.getSubNodeKey()) || StringUtils.isNotEmpty((CharSequence)subkpidetails.getSubMeasureName())) {
                if (!this.applyNodeKeyBySubMeasure(subkpidetails, employee)) {
                    return false;
                }
                KPIDetailsPo subDetailsPo = new KPIDetailsPo(subkpidetails);
                subDetailsPo.setMtdActual(subkpidetails.getSubMtdActual());
                subDetailsPo.setMtdTarget(subkpidetails.getSubMtdTarget());
                subDetailsPo.setMeasureType(1);
                if (subDetailsPo != null) {
                    if ((subDetailsPo = this.kpidao.validateAndUpdateSub(subDetailsPo)).getOrgKpiId() != 0L) {
                        ++updatedSubCount;
                    }
                    KPIDetailsPo kPIDetailsPo = (KPIDetailsPo)this.kpiDetailsRepository.save(subDetailsPo);
                }
            }
            response.put("updated", updatedCount);
            response.put("updatedSub", updatedSubCount);
        }
        catch (Exception e) {
            this.logger.error((Object)("Exception while processing ETL kpi details " + ExceptionLogHelper.convertToString((Exception)e)));
            kpiDetails.setCauseOfFailure("Exception while processing ETL kpi details " + e.getMessage());
            return false;
        }
        return true;
    }

    public boolean saveKpiAnnualTarget(KPIDetailsDTO kpiDetails, Employee employee, Map<String, Object> response) {
        try {
            String empId;
            Employee employeeObj;
            long orgKey;
            List kpiList = null;
            long updatedCount = response.get("updated") != null ? new Long(response.get("updated").toString()) : 0L;
            kpiDetails.setEmpId(Long.valueOf(UserThreadLocal.get()).longValue());
            long l = orgKey = StringUtils.isNotEmpty((CharSequence)kpiDetails.getOrgKey()) ? new BigDecimal(kpiDetails.getOrgKey()).longValue() : 0L;
            if (orgKey == 0L && StringUtils.isNotEmpty((CharSequence)kpiDetails.getEmailAddress())) {
                employeeObj = this.employeeService.getEmployeeIDByEmail(kpiDetails.getEmailAddress().trim());
                empId = String.valueOf(employeeObj != null ? Long.valueOf(employeeObj.getEmpId()) : "");
                if (StringUtils.isEmpty((CharSequence)empId)) {
                    this.logger.error((Object)"owner not found in DB and skipping the record ");
                    kpiDetails.setCauseOfFailure("owner not found in DB and skipping the record ");
                    return false;
                }
                String orgName = employeeObj != null ? employeeObj.getFirstName() : employee.getFirstName();
                kpiDetails.setOrgKey(empId);
                kpiDetails.setOrganizationName(orgName);
                if (StringUtils.isNotEmpty((CharSequence)kpiDetails.getMetricCode())) {
                    long orgId = employeeObj != null ? employeeObj.getOrgDetails().getOrgId() : 0L;
                    kpiList = this.kpiRepository.findByOrgIdAndKpiId(Long.valueOf(orgId), kpiDetails.getMetricCode());
                    if (CollectionUtils.isEmpty((Collection)kpiList)) {
                        this.logger.error((Object)"Given KPIId not found in DB");
                        kpiDetails.setCauseOfFailure("Given KPIId not found in DB ");
                        return false;
                    }
                } else {
                    kpiList = this.kpiRepository.findByKpiNameAndOwnerId(kpiDetails.getMeasureName(), Long.valueOf(kpiDetails.getOrgKey()));
                    if (CollectionUtils.isEmpty((Collection)kpiList)) {
                        this.logger.error((Object)"kpi record not found and skipping the record ");
                        kpiDetails.setCauseOfFailure("kpi record not found and skipping the record ");
                        return false;
                    }
                }
            } else if (orgKey == 0L && StringUtils.isNotEmpty((CharSequence)kpiDetails.getOrganizationName())) {
                employeeObj = this.employeeService.getEmployeeId(kpiDetails.getOrganizationName().trim(), employee.getOrgDetails().getOrgId());
                empId = String.valueOf(employeeObj != null ? Long.valueOf(employeeObj.getEmpId()) : "");
                if (StringUtils.isEmpty((CharSequence)empId)) {
                    this.logger.error((Object)"owner not found in DB and skipping the record ");
                    kpiDetails.setCauseOfFailure("owner not found in DB and skipping the record ");
                    return false;
                }
                kpiDetails.setOrgKey(empId);
                kpiDetails.setOrganizationName(kpiDetails.getOrganizationName().trim());
                if (StringUtils.isNotEmpty((CharSequence)kpiDetails.getMetricCode())) {
                    long orgId = employeeObj != null ? employeeObj.getOrgDetails().getOrgId() : 0L;
                    kpiList = this.kpiRepository.findByOrgIdAndKpiId(Long.valueOf(orgId), kpiDetails.getMetricCode());
                    if (CollectionUtils.isEmpty((Collection)kpiList)) {
                        this.logger.error((Object)"Given KPIId not found in DB");
                        kpiDetails.setCauseOfFailure("Given KPIId not found in DB ");
                        return false;
                    }
                } else {
                    kpiList = this.kpiRepository.findByKpiNameAndOwnerId(kpiDetails.getMeasureName(), Long.valueOf(kpiDetails.getOrgKey()));
                    if (CollectionUtils.isEmpty((Collection)kpiList)) {
                        this.logger.error((Object)"kpi record not found and skipping the record ");
                        kpiDetails.setCauseOfFailure("kpi record not found and skipping the record ");
                        return false;
                    }
                }
            } else if (orgKey == 0L && StringUtils.isEmpty((CharSequence)kpiDetails.getOrganizationName()) && StringUtils.isEmpty((CharSequence)kpiDetails.getEmailAddress())) {
                kpiDetails.setOrgKey(String.valueOf(employee.getEmpId()));
                kpiDetails.setOrganizationName(employee.getFirstName());
            }
            if (kpiDetails.getMtdActual() == null && kpiDetails.getMtdActual().isEmpty()) {
                kpiDetails.setMtdActual("0");
            }
            if (CollectionUtils.isEmpty(kpiList)) {
                this.logger.error((Object)"kpi record not found and skipping the record ");
                kpiDetails.setCauseOfFailure("kpi record not found and skipping the record ");
                return false;
            }
            for (KPI kpi : kpiList) {
                kpiDetails.setKpiId(kpi.getId());
                if (StringUtils.isEmpty((CharSequence)kpiDetails.getMeasureName())) {
                    kpiDetails.setMeasureName(kpi.getKpiName());
                }
                KpiTargetDetailsPo detailsPo = new KpiTargetDetailsPo(kpiDetails);
                detailsPo.setCreatedTime(LocalDateTime.now());
                detailsPo.setUpdatedTime(LocalDateTime.now());
                this.kpiTargetDetailsRepository.save(detailsPo);
                ++updatedCount;
            }
            response.put("updated", updatedCount);
        }
        catch (Exception e) {
            this.logger.error((Object)("Exception while processing ETL kpi details " + ExceptionLogHelper.convertToString((Exception)e)));
            kpiDetails.setCauseOfFailure("Exception while processing ETL kpi details " + e.getMessage());
            return false;
        }
        return true;
    }

    private boolean applyNodeKey(KPIDetailsDTO kpiDetails, Employee employee) {
        if (kpiDetails.getNodeKey() == null) {
            if (StringUtils.isEmpty((CharSequence)kpiDetails.getMeasureName()) && StringUtils.isEmpty((CharSequence)kpiDetails.getMetricCode())) {
                this.logger.error((Object)"measure name is null so skipped that record ");
                kpiDetails.setCauseOfFailure("measure name is null so skipped that record");
                return false;
            }
            if (StringUtils.isNotEmpty((CharSequence)kpiDetails.getMeasureName())) {
                KPIElementDetailsPo elementDetailsPo = null;
                elementDetailsPo = this.kpidao.getNodeKeyForMesaureName(kpiDetails.getMeasureName().trim(), employee.getOrgDetails().getOrgId());
                if (elementDetailsPo != null && elementDetailsPo.getMeasureType() == 0) {
                    kpiDetails.setNodeKey(String.valueOf(elementDetailsPo.getNodeKey()));
                } else {
                    KPIElementDetailsPo kpiElementDetailsPo = new KPIElementDetailsPo();
                    kpiElementDetailsPo.setElementType("ELEMENT");
                    kpiElementDetailsPo.setActive(0);
                    kpiElementDetailsPo.setMeasureName(kpiDetails.getMeasureName().trim());
                    kpiElementDetailsPo.setMeasureType(0);
                    kpiElementDetailsPo.setDeptId(kpiDetails.getDeptId());
                    kpiElementDetailsPo.setOrgId(employee.getOrgDetails().getOrgId());
                    kpiDetails.setNodeKey(String.valueOf(this.kpidao.saveKpiElementDetail(kpiElementDetailsPo).getNodeKey()));
                }
            }
        } else {
            KPIElementDetailsPo kpiElementDetailsPo = null;
            if (Objects.nonNull(kpiDetails.getDeptId())) {
                kpiElementDetailsPo = this.kpidao.getMeasureKeywithKpiandDept(kpiDetails.getNodeKey(), kpiDetails.getDeptId().longValue(), employee.getOrgDetails().getOrgId());
            } else if (Objects.nonNull(kpiDetails.getOrgKey())) {
                kpiElementDetailsPo = this.kpidao.getMeasureKeywithKpiandDept(kpiDetails.getNodeKey(), Long.parseLong(kpiDetails.getOrgKey()), employee.getOrgDetails().getOrgId());
            } else {
                kpiElementDetailsPo = this.kpidao.getMeasureKeywithKpi(kpiDetails.getNodeKey(), employee.getOrgDetails().getOrgId());
                kpiDetails.setOrgKey(String.valueOf(employee.getEmpId()));
            }
            if (kpiElementDetailsPo == null && Objects.nonNull(kpiDetails.getDeptId()) && kpiDetails.getDeptId() > 0L) {
                kpiElementDetailsPo = this.kpidao.getMeasureKeywithKpi(kpiDetails.getNodeKey(), employee.getOrgDetails().getOrgId());
            }
            if (kpiElementDetailsPo == null) {
                this.logger.error((Object)("wrong node key provided node key key not found in DB " + kpiDetails.getNodeKey() + " :: " + Long.parseLong(kpiDetails.getOrgKey()) + ":::" + employee.getOrgDetails().getOrgId()));
                kpiDetails.setCauseOfFailure("wrong node key provided node key key not found in DB " + kpiDetails.getNodeKey() + " :: " + Long.parseLong(kpiDetails.getOrgKey()) + ":::" + employee.getOrgDetails().getOrgId());
                return false;
            }
            kpiDetails.setNodeKey(String.valueOf(kpiElementDetailsPo.getNodeKey()));
            kpiDetails.setMeasureType(0);
        }
        return true;
    }

    private boolean applyNodeKeyBySubMeasure(KPIDetailsDTO kpiDetails, Employee employee) {
        if (StringUtils.isEmpty((CharSequence)kpiDetails.getSubMeasureName())) {
            this.logger.error((Object)"sub measure name is null so skipped that record ");
            kpiDetails.setCauseOfFailureBySub("sub measure name is null so skipped that record");
            return false;
        }
        if (StringUtils.isNotEmpty((CharSequence)kpiDetails.getSubMeasureName())) {
            kpiDetails.setMeasureKey(kpiDetails.getNodeKey());
            KPIElementDetailsPo elementDetailsPo = null;
            elementDetailsPo = this.kpidao.getNodeKeyForSubMeasureName(kpiDetails.getSubMeasureName().trim(), employee.getOrgDetails().getOrgId());
            if (elementDetailsPo != null && elementDetailsPo.getMeasureType() == 1) {
                kpiDetails.setNodeKey(String.valueOf(elementDetailsPo.getNodeKey()));
            } else {
                KPIElementDetailsPo kpiElementDetailsPo = new KPIElementDetailsPo();
                kpiElementDetailsPo.setElementType("ELEMENT");
                kpiElementDetailsPo.setActive(0);
                kpiElementDetailsPo.setMeasureName(kpiDetails.getSubMeasureName().trim());
                kpiElementDetailsPo.setMeasureType(1);
                kpiElementDetailsPo.setFrequency(kpiDetails.getFrequency());
                if (kpiDetails.getDeptId() != null) {
                    kpiElementDetailsPo.setDeptId(kpiDetails.getDeptId());
                }
                kpiElementDetailsPo.setMeasureKey(Long.valueOf(new BigDecimal(StringUtils.trim((String)kpiDetails.getNodeKey())).longValue()));
                kpiElementDetailsPo.setOrgId(employee.getOrgDetails().getOrgId());
                kpiDetails.setNodeKey(String.valueOf(this.kpidao.saveKpiElementDetail(kpiElementDetailsPo).getNodeKey()));
            }
        }
        return true;
    }
}

