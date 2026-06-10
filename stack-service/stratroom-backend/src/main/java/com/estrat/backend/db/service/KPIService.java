/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.ControlPanelGeneral
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.KPI
 *  com.estrat.backend.db.bean.po.KPIDetailsPo
 *  com.estrat.backend.db.bean.po.KPIElementDetailsPo
 *  com.estrat.backend.db.bean.po.KpiDetailsAttachments
 *  com.estrat.backend.db.bean.po.Objectives
 *  com.estrat.backend.db.bean.po.SubKPI
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.ControlPanelGeneralRepository
 *  com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository
 *  com.estrat.backend.db.dao.KPICommentsRepository
 *  com.estrat.backend.db.dao.KPICriteria
 *  com.estrat.backend.db.dao.KPIDAO
 *  com.estrat.backend.db.dao.KPIDetailsRepository
 *  com.estrat.backend.db.dao.KPIRepository
 *  com.estrat.backend.db.dao.KpiDetailsAttachmentsRepository
 *  com.estrat.backend.db.dao.SubKPIRepository
 *  com.estrat.backend.db.dto.CustomPerformance
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.KPIDTO
 *  com.estrat.backend.db.dto.KPIDetailsDTO
 *  com.estrat.backend.db.dto.KPIElementDTO
 *  com.estrat.backend.db.dto.KpiDetailsAttachmentsDTO
 *  com.estrat.backend.db.dto.KpiList
 *  com.estrat.backend.db.dto.ObjectivesDTO
 *  com.estrat.backend.db.dto.ScoreCardResponseDTO
 *  com.estrat.backend.db.dto.SubKPIDTO
 *  com.estrat.backend.db.generators.NodeKeyGenerators
 *  com.estrat.backend.db.repository.ChildTrackerRepository
 *  com.estrat.backend.db.repository.DepartmentChartMappingRepository
 *  com.estrat.backend.db.repository.EmployeeProfilePoRepo
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.ControlPanelGeneralService
 *  com.estrat.backend.db.service.DepartmentDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.KPIService
 *  com.estrat.backend.db.service.ObjectivesService
 *  javax.transaction.Transactional
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.ControlPanelGeneral;
import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.KPI;
import com.estrat.backend.db.bean.po.KPIDetailsPo;
import com.estrat.backend.db.bean.po.KPIElementDetailsPo;
import com.estrat.backend.db.bean.po.KpiDetailsAttachments;
import com.estrat.backend.db.bean.po.Objectives;
import com.estrat.backend.db.bean.po.SubKPI;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.ControlPanelGeneralRepository;
import com.estrat.backend.db.dao.EmployeeDepartmentMappingRepository;
import com.estrat.backend.db.dao.KPICommentsRepository;
import com.estrat.backend.db.dao.KPICriteria;
import com.estrat.backend.db.dao.KPIDAO;
import com.estrat.backend.db.dao.KPIDetailsRepository;
import com.estrat.backend.db.dao.KPIRepository;
import com.estrat.backend.db.dao.KpiDetailsAttachmentsRepository;
import com.estrat.backend.db.dao.SubKPIRepository;
import com.estrat.backend.db.dto.CustomPerformance;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.KPIDTO;
import com.estrat.backend.db.dto.KPIDetailsDTO;
import com.estrat.backend.db.dto.KPIElementDTO;
import com.estrat.backend.db.dto.KpiElementPoObject;
import com.estrat.backend.db.dto.KpiDetailsAttachmentsDTO;
import com.estrat.backend.db.dto.KpiList;
import com.estrat.backend.db.dto.ObjectivesDTO;
import com.estrat.backend.db.dto.ScoreCardResponseDTO;
import com.estrat.backend.db.dto.SubKPIDTO;
import com.estrat.backend.db.generators.NodeKeyGenerators;
import com.estrat.backend.db.repository.ChildTrackerRepository;
import com.estrat.backend.db.repository.DepartmentChartMappingRepository;
import com.estrat.backend.db.repository.EmployeeProfilePoRepo;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.ControlPanelGeneralService;
import com.estrat.backend.db.service.DepartmentDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.ObjectivesService;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class KPIService {
    private org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(KPIService.class);
    private Logger log = LoggerFactory.getLogger(KPIService.class);
    private final ConcurrentHashMap<String, ControlPanelGeneral> cpanelLocalCache = new ConcurrentHashMap();
    private final ConcurrentHashMap<String, Map<String, Object>> customPerfLocalCache = new ConcurrentHashMap();
    @Value(value="${backup.script.file.path}")
    public String filepath;
    @Autowired
    private KPIRepository kpiRepository;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private ObjectivesService objectivesService;
    @Autowired
    private DepartmentDetailsService departmentDetailsService;
    @Autowired
    private KPIDAO kpidao;
    @Autowired
    private EmployeeProfilePoRepo profilePoRepo;
    @Autowired
    private ControlPanelGeneralRepository cpanel;
    @Autowired
    private ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentChartMappingRepository departmentchart;
    @Autowired
    private ChildTrackerRepository childTrackerRepository;
    @Autowired
    private KPIDetailsRepository kpiDetailsRepository;
    @Autowired
    private NodeKeyGenerators nodekeygen;
    @Autowired
    private EmployeeDepartmentMappingRepository departmentMappingRepository;
    @Autowired
    private KpiDetailsAttachmentsRepository kpiDetailsAttachmentsRepository;
    @Autowired
    private KPICommentsRepository kpiCommentsRepository;
    @Autowired
    private SubKPIRepository subKPIRepository;

    public Optional<KPI> findById(long id) {
        return this.kpiRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public KPIDTO save(KPIDTO kpiDTO) {
        KPI kpi = new KPI(kpiDTO);
        kpi.setCreatedTime(LocalDateTime.now());
        if (StringUtils.isEmpty((CharSequence)kpi.getKpiId())) {
            this.createKPIId(kpi);
        }
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (kpiDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(kpiDTO.getCreatedBy());
        } else {
            employeeDTO.setEmployeeId(kpiDTO.getUpdatedBy());
        }
        Employee employee = this.employeeService.getEmployee(employeeDTO);
        kpi.setOrgId(employee.getOrgDetails().getOrgId());
        Long kpinode = 0L;
        if (Objects.isNull(kpi.getId()) || Objects.nonNull(kpi.getId()) && kpi.getId() == 0L) {
            kpinode = this.nodekeygen.generateNodeKey();
        }
        if (Objects.nonNull(kpinode) && kpinode != 0L) {
            kpi.setId(kpinode.longValue());
        }
        KPIDTO outObj = new KPIDTO((KPI)this.kpiRepository.save(kpi));
        this.saveKPIElementDetails(outObj, employee);
        return outObj;
    }

    private void saveKPIElementDetails(KPIDTO outObj, Employee employee) {
        String subMeasureName;
        ArrayList<String> subMeasureNameList;
        KPIElementDetailsPo kpiElementDetailsPo = new KPIElementDetailsPo();
        kpiElementDetailsPo.setElementType("KPI");
        kpiElementDetailsPo.setMeasureName(outObj.getKpiValue().get("name").toString());
        kpiElementDetailsPo.setActive(outObj.getActive());
        kpiElementDetailsPo.setNodeKey(outObj.getId());
        kpiElementDetailsPo.setMeasureType(0);
        kpiElementDetailsPo.setOrgId(employee.getOrgDetails().getOrgId());
        this.saveKPIElementDetails(kpiElementDetailsPo);
        KPIElementDetailsPo elementDetailsPo = this.kpidao.getNodeKeyForMesaureName(kpiElementDetailsPo.getMeasureName().trim(), employee.getOrgDetails().getOrgId());
        if (elementDetailsPo == null) {
            kpiElementDetailsPo.setNodeKey(0L);
            kpiElementDetailsPo.setElementType("ELEMENT");
            kpiElementDetailsPo.setActive(0);
            this.saveKPIElementDetails(kpiElementDetailsPo);
            String cacheKey = String.join((CharSequence)"_withorg_", "nodeKeyList", String.valueOf(employee.getOrgDetails().getOrgId()));
            this.dbCache.remove((Object)cacheKey, "dbCache");
        }
        KPIElementDetailsPo result = this.kpidao.getNodeKeyForMesaureName(kpiElementDetailsPo.getMeasureName().trim(), employee.getOrgDetails().getOrgId());
        if (outObj.getKpiValue().containsKey("subMeasureName") && !(subMeasureNameList = new ArrayList<String>(Arrays.asList((subMeasureName = outObj.getKpiValue().get("subMeasureName").toString()).split(",")))).isEmpty()) {
            for (String subMeasure : subMeasureNameList) {
                KPIElementDetailsPo subKpiElementDetailsPo = new KPIElementDetailsPo();
                subKpiElementDetailsPo.setElementType("KPI");
                subKpiElementDetailsPo.setMeasureName(subMeasure);
                subKpiElementDetailsPo.setActive(outObj.getActive());
                subKpiElementDetailsPo.setNodeKey(outObj.getId());
                subKpiElementDetailsPo.setMeasureType(1);
                subKpiElementDetailsPo.setOrgId(employee.getOrgDetails().getOrgId());
                this.saveKPIElementDetails(subKpiElementDetailsPo);
                KPIElementDetailsPo elementDetailsSubMeasure = this.kpidao.getNodeKeyForMesaureName(subKpiElementDetailsPo.getMeasureName().trim(), employee.getOrgDetails().getOrgId());
                if (elementDetailsSubMeasure != null) continue;
                subKpiElementDetailsPo.setNodeKey(0L);
                subKpiElementDetailsPo.setElementType("ELEMENT");
                subKpiElementDetailsPo.setActive(0);
                this.saveKPIElementDetails(subKpiElementDetailsPo);
                String cacheKey = String.join((CharSequence)"_withorg_", "nodeKeyList", String.valueOf(employee.getOrgDetails().getOrgId()));
                this.dbCache.remove((Object)cacheKey, "dbCache");
            }
        }
    }

    public KPIElementDetailsPo saveKPIElementDetails(KPIElementDetailsPo elementDetailsPo) {
        return this.kpidao.saveKpiElementDetail(elementDetailsPo);
    }

    public List<KPIElementDTO> getkpielements(String kpiName) {
        List<KpiElementPoObject> kpiElementDetailsPo = this.kpiDetailsRepository.findAllMeasure(kpiName, Long.valueOf(Long.parseLong(UserThreadLocal.get((String)"USER_ORG_ID"))));
        List<KPIElementDTO> elementDTOs = kpiElementDetailsPo.stream().map(val -> new KPIElementDTO(val)).collect(Collectors.toList());
        return elementDTOs;
    }

    public KPIDTO updateKPI(KPI kpi) {
        kpi.setCreatedTime(LocalDateTime.now());
        Long kpinode = 0L;
        if (Objects.isNull(kpi.getId()) || Objects.nonNull(kpi.getId()) && kpi.getId() == 0L) {
            kpinode = this.nodekeygen.generateNodeKey();
        }
        if (Objects.nonNull(kpinode) && kpinode != 0L) {
            kpi.setId(kpinode.longValue());
        }
        KPIDTO outObj = new KPIDTO((KPI)this.kpiRepository.save(kpi));
        KPIElementDetailsPo kpiElementDetailsPo = this.kpidao.getElementDetails(kpi.getId());
        if (kpiElementDetailsPo != null) {
            kpiElementDetailsPo.setActive(kpi.getActive());
            this.kpidao.saveKpiElementDetail(kpiElementDetailsPo);
        }
        return outObj;
    }

    public List<KPIDTO> kpiList(long objId) {
        List<KPI> dbList = this.kpiRepository.findByObjIdAndActive(Long.valueOf(objId), 0);
        return dbList.stream().map(dbValue -> new KPIDTO(dbValue)).collect(Collectors.toList());
    }

    public String kpiDeptId(long kpiId) {
        String deptId = this.kpiRepository.findDeptbyKPI(Long.valueOf(kpiId), 0);
        return deptId;
    }

    public List<KPIDetailsDTO> retrieveKpiDetailsList() {
        String orgId = null;
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
            orgId = UserThreadLocal.get((String)"USER_ORG_ID");
        } else {
            EmployeeDTO employeeDTO = new EmployeeDTO();
            employeeDTO.setEmployeeId(Long.valueOf(UserThreadLocal.get()).longValue());
            Employee employee = this.employeeService.getEmployee(employeeDTO);
            orgId = String.valueOf(employee.getOrgDetails().getOrgId());
        }
        String cacheKey = String.join((CharSequence)"_withorg_", "nodeKeyList", orgId);
        this.logger.debug((Object)"populating retrieveNodeKeyList details into cache");
        List<KPIDetailsDTO> kpiList = this.kpidao.retrieveNodeKeyList(Long.valueOf(orgId).longValue());
        return kpiList;
    }

    /*
     * WARNING - void declaration
     * Enabled aggressive block sorting
     */
    public List<Map<String, Object>> retrieveKPIDetails(KPICriteria criteria) {
        block32: {
            String orgId = null;
            if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
                orgId = UserThreadLocal.get((String)"USER_ORG_ID");
            }
            if (criteria.isRetrieveKpiTarget()) {
                Calendar startDate = Calendar.getInstance();
                startDate.setTimeInMillis((Long)criteria.getRealDates().get(0));
                Calendar endDate = Calendar.getInstance();
                endDate.setTimeInMillis((Long)criteria.getRealDates().get(1));
                return this.kpidao.getAnnualTarget(criteria, (long)startDate.get(1), (long)endDate.get(1));
            }
            if (criteria.isRetrieveYTD()) {
                return this.retrieveYTD(criteria);
            }
            if (CollectionUtils.isNotEmpty((Collection)criteria.getRealDates())) {
                ArrayList<Object> realDates = new ArrayList<Object>();
                for (Object object : criteria.getRealDates()) {
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(new Date((Long)object));
                    calendar.set(14, 0);
                    calendar.set(13, 0);
                    calendar.set(12, 0);
                    calendar.set(10, 0);
                    realDates.add(calendar.getTime());
                }
                criteria.setRealDates(realDates);
            }
            if (criteria.isRetrieveRowCount()) {
                return this.kpidao.getOrgKPIDetails(criteria, "SELECT DISTINCT org.node_key AS NODE_KEY FROM orgstructure.org_kpi_details org WHERE");
            }
            Date fromDt = null;
            Date toDt = null;
            if (criteria.getRealDates() != null && criteria.getRealDates().size() > 0) {
                fromDt = (Date)criteria.getRealDates().get(0);
                toDt = (Date)criteria.getRealDates().get(1);
            }
            if (orgId != null) {
                ControlPanelGeneral cpaneldto = this.cpanel.findAllByOrgId(Long.valueOf(orgId));
                CustomPerformance customPerformance = new CustomPerformance(this.controlPanelGeneralService.findCustomPerformanceByOrgId());
                if (cpaneldto != null && cpaneldto.getImplementationType() != null) {
                    if (cpaneldto.getImplementationType().equalsIgnoreCase("department")) {
                        String empId = null;
                        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"))) {
                            empId = UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID");
                        }
                        if (Objects.nonNull(criteria.getEmpId())) {
                            empId = criteria.getEmpId();
                        }
                        System.out.println("criteria.getDepartmentId() :: " + criteria.getDepartmentId());
                        System.out.println("criteria.getDeptName()2 :: " + criteria.getDeptName());
                        if (Objects.nonNull(criteria.getDepartmentId()) && criteria.getDepartmentId() > 0L && Objects.isNull(criteria.getDeptName())) {
                            ArrayList<Long> listToUse = new ArrayList<Long>();
                            Map childMap = new HashMap();
                            if (!customPerformance.isAggregation()) {
                                listToUse.add(criteria.getDepartmentId());
                            } else {
                                childMap = this.kpidao.getDepartmentListRecursive(criteria.getDepartmentId(), fromDt, toDt);
                                if (childMap != null) {
                                    listToUse = new ArrayList<Long>(childMap.keySet());
                                }
                            }
                            System.out.println("departmentList det2  :: " + listToUse);
                            DepartmentChartMapping departmentChartMapping = this.departmentchart.getOne(Long.valueOf(criteria.getDepartmentId()));
                            return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(true), departmentChartMapping, null, childMap);
                        }
                        if (empId != null && Objects.isNull(criteria.getDeptName())) {
                            System.out.println("Enter in gate 2 iff ");
                            EmployeeDTO employeeDTO = new EmployeeDTO();
                            System.out.println("Long.valueOf(empId) -+- " + Long.valueOf(empId));
                            employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
                            Employee employee = this.employeeService.getEmployee(employeeDTO);
                            if (employee != null && employee.getDeptDetails() != null && employee.getDeptDetails().getId() > 0L) {
                                DepartmentChartMapping departmentChartMapping = this.departmentchart.getOne(Long.valueOf(employee.getDeptDetails().getId()));
                                ArrayList<Long> listToUse = new ArrayList<Long>();
                                Map childMap = new HashMap();
                                if (!customPerformance.isAggregation()) {
                                    listToUse.add(criteria.getDepartmentId());
                                    return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(true), departmentChartMapping, null, childMap);
                                }
                                childMap = this.kpidao.getDepartmentListRecursive(criteria.getDepartmentId(), fromDt, toDt);
                                if (childMap == null) return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(true), departmentChartMapping, null, childMap);
                                listToUse = new ArrayList<Long>(childMap.keySet());
                                return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(true), departmentChartMapping, null, childMap);
                            }
                            break block32;
                        } else {
                            System.out.println("Enter in gate 3 iff ");
                            ArrayList<String> arrayList = new ArrayList<String>(Arrays.asList(criteria.getDeptName().split("\\-")));
                            DepartmentChartMapping parentDepartment = null;
                            DepartmentChartMapping departmentChartMapping = this.departmentchart.getOne(Long.valueOf((String)arrayList.get(1)), 0);
                            if (departmentChartMapping.getDeptParentId() != 0L) {
                                parentDepartment = this.departmentchart.getOne(departmentChartMapping.getDeptParentId(), 0);
                            }
                            ArrayList<Long> listToUse = new ArrayList<Long>();
                            Map childMap = new HashMap();
                            if (!customPerformance.isAggregation()) {
                                listToUse.add(departmentChartMapping.getDeptId());
                            } else {
                                childMap = this.kpidao.getDepartmentListRecursive(departmentChartMapping.getDeptId().longValue(), fromDt, toDt);
                                if (childMap != null) {
                                    listToUse = new ArrayList<Long>(childMap.keySet());
                                }
                            }
                            System.out.println("childMap :: " + childMap);
                            System.out.println("departmentList :::::: " + listToUse);
                            return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(false), departmentChartMapping, parentDepartment, childMap);
                        }
                    }
                    String empId = null;
                    if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"))) {
                        empId = UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID");
                    }
                    if (Objects.nonNull(criteria.getEmpId())) {
                        empId = criteria.getEmpId();
                    }
                    if (empId != null && Objects.isNull(criteria.getDeptName())) {
                        EmployeeDTO employeeDTO = new EmployeeDTO();
                        employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
                        Employee employee = this.employeeService.getEmployee(employeeDTO);
                        if (employee != null && employee.getDeptDetails() != null && employee.getDeptDetails().getId() > 0L) {
                            ArrayList<Long> listToUse = new ArrayList<Long>();
                            HashMap hashMap = new HashMap();
                            if (!customPerformance.isAggregation()) {
                                listToUse.add(employee.getEmpId());
                                return this.kpidao.getOrgKPIDetailsEmployee(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, ed.department AS dept, org.measureKey as measureKey, org.measureType,kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.employee_details ed, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(true), employee, null, (Map)hashMap);
                            }
                            Map map = this.kpidao.getEmployeeListRecursive(employee.getEmpId(), fromDt, toDt);
                            if (map == null) return this.kpidao.getOrgKPIDetailsEmployee(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, ed.department AS dept, org.measureKey as measureKey, org.measureType,kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.employee_details ed, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(true), employee, null, (Map)hashMap);
                            listToUse = new ArrayList<Long>(map.keySet());
                            return this.kpidao.getOrgKPIDetailsEmployee(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, ed.department AS dept, org.measureKey as measureKey, org.measureType,kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.employee_details ed, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(true), employee, null, (Map)map);
                        }
                    } else {
                        EmployeeProfilePo employeeProfilePo = this.profilePoRepo.findByFirstName(criteria.getDeptName(), Long.valueOf(orgId).longValue(), "Active");
                        Employee employeeParent = null;
                        if (employeeProfilePo.getParentEmpId() != 0L) {
                            EmployeeProfilePo employeeProfilePo2 = this.profilePoRepo.getOne(employeeProfilePo.getParentEmpId(), "Active");
                            employeeParent = new Employee(employeeProfilePo2, Boolean.valueOf(false));
                        }
                        Employee employee = new Employee(employeeProfilePo, Boolean.valueOf(false));
                        ArrayList<Long> listToUse = new ArrayList<Long>();
                        Map childMap = new HashMap();
                        if (!customPerformance.isAggregation()) {
                            listToUse.add(employee.getEmpId());
                            return this.kpidao.getOrgKPIDetailsEmployee(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, ed.department AS dept, org.measureKey as measureKey, org.measureType,kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.employee_details ed, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(false), employee, employeeParent, childMap);
                        }
                        childMap = this.kpidao.getEmployeeListRecursive(employee.getEmpId(), fromDt, toDt);
                        if (childMap == null) return this.kpidao.getOrgKPIDetailsEmployee(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, ed.department AS dept, org.measureKey as measureKey, org.measureType,kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.employee_details ed, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(false), employee, employeeParent, childMap);
                        listToUse = new ArrayList<Long>(childMap.keySet());
                        return this.kpidao.getOrgKPIDetailsEmployee(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, ed.department AS dept, org.measureKey as measureKey, org.measureType,kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.employee_details ed, orgstructure.kpi_element_details kpi_elem WHERE ", (List)listToUse, Boolean.valueOf(false), employee, employeeParent, childMap);
                    }
                }
            }
        }
        if (criteria.getGroupBy() == null) return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency FROM orgstructure.org_kpi_details org WHERE");
        if (!criteria.getGroupBy().equalsIgnoreCase("Dept")) return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency FROM orgstructure.org_kpi_details org WHERE");
        return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual AS A,org.mtd_target AS T,org.rolling_12_actual AS RA,org.rolling_12_budget AS B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency AS currency, ed.department AS dept FROM orgstructure.org_kpi_details org, orgstructure.employee_details ed WHERE ");
    }

    public List<KpiList> checkkpiListByEmpId(long empId, boolean loadFlag) {
        List<Employee> employees = this.employeeService.getAllReporteeList(empId);
        List empList = employees.stream().map(val -> val.getEmpId()).collect(Collectors.toList());
        List dbList = this.kpidao.getkpilistbyempid(empList);
        return dbList;
    }

    public List<KpiList> checkkpiListByDeptId() {
        List<com.estrat.backend.db.dto.DeptDetails> deptDetails = this.departmentDetailsService.childList();
        List deptList = deptDetails.stream().map(val -> val.getId()).collect(Collectors.toList());
        List dbList = this.kpidao.getkpilistbydeptid(deptList);
        return dbList;
    }

    public List<KPIElementDTO> checkSubmeasureKpiElement(String nodeKey) {
        List<Object[]> kpiElementDetailsPo = this.kpiDetailsRepository.findAllSubMeasure(nodeKey, Long.valueOf(Long.parseLong(UserThreadLocal.get((String)"USER_ORG_ID"))));
        ArrayList<KPIElementDTO> elementDTOs = new ArrayList<KPIElementDTO>();
        for (Object[] elem : kpiElementDetailsPo) {
            KPIElementDTO temp = new KPIElementDTO();
            temp.setNodeKey(new BigInteger(String.valueOf(elem[0])).longValue());
            temp.setMeasureName(String.valueOf(elem[1]));
            temp.setOrgId(new BigInteger(String.valueOf(elem[2])).longValue());
            temp.setMeasureType(((Integer)elem[3]).intValue());
            temp.setMeasureKey(Long.valueOf(new BigInteger(String.valueOf(elem[4])).longValue()));
            temp.setDeptId(Long.valueOf(new BigInteger(String.valueOf(elem[5])).longValue()));
            temp.setFrequency(String.valueOf(elem[6]));
            temp.setFrequency(nodeKey);
            elementDTOs.add(temp);
        }
        return elementDTOs;
    }

    public String getDefaultPageUrl(long kpiId) {
        String baseUrl = "kpiView";
        if (kpiId != 0L) {
            return String.join((CharSequence)"?", baseUrl, String.join((CharSequence)"&", "kpiId=" + kpiId));
        }
        return "";
    }

    public KPIElementDTO checkSubmeasureElementData(String nodeKey) {
        List elem_obj = this.kpiDetailsRepository.findSubMeasurebynode(nodeKey, Long.valueOf(Long.parseLong(UserThreadLocal.get((String)"USER_ORG_ID"))));
        Object[] elem = (Object[])elem_obj.get(0);
        KPIElementDTO temp = new KPIElementDTO();
        temp.setNodeKey(new BigInteger(String.valueOf(elem[0])).longValue());
        temp.setMeasureName(String.valueOf(elem[1]));
        temp.setOrgId(new BigInteger(String.valueOf(elem[2])).longValue());
        temp.setMeasureType(((Integer)elem[3]).intValue());
        if (elem[4] != null) {
            temp.setMeasureKey(Long.valueOf(new BigInteger(String.valueOf(elem[4])).longValue()));
        }
        if (elem[5] != null) {
            temp.setDeptId(Long.valueOf(new BigInteger(String.valueOf(elem[5])).longValue()));
        }
        if (elem[6] != null) {
            temp.setFrequency(String.valueOf(elem[6]));
        }
        temp.setFrequency(nodeKey);
        return temp;
    }

    public List<Map<String, Object>> retrieveOrgKPIDetailsSubMeasure(KPICriteria criteria) {
        String orgId = null;
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
            orgId = UserThreadLocal.get((String)"USER_ORG_ID");
        }
        if (criteria.isRetrieveKpiTarget()) {
            Calendar startDate = Calendar.getInstance();
            startDate.setTimeInMillis((Long)criteria.getRealDates().get(0));
            Calendar endDate = Calendar.getInstance();
            endDate.setTimeInMillis((Long)criteria.getRealDates().get(1));
            return this.kpidao.getAnnualTarget(criteria, (long)startDate.get(1), (long)endDate.get(1));
        }
        if (criteria.isRetrieveYTD()) {
            return this.retrieveYTD(criteria);
        }
        if (CollectionUtils.isNotEmpty((Collection)criteria.getRealDates())) {
            ArrayList<Object> realDates = new ArrayList<Object>();
            for (Object object : criteria.getRealDates()) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(new Date((Long)object));
                calendar.set(14, 0);
                calendar.set(13, 0);
                calendar.set(12, 0);
                calendar.set(10, 0);
                realDates.add(calendar.getTime());
            }
            criteria.setRealDates(realDates);
        }
        if (criteria.isRetrieveRowCount()) {
            return this.kpidao.getOrgKPIDetails(criteria, "SELECT DISTINCT org.node_key AS NODE_KEY FROM orgstructure.org_kpi_details org WHERE");
        }
        if (orgId != null) {
            ControlPanelGeneral cpaneldto;
            Date fromDt = null;
            Date toDt = null;
            if (criteria.getRealDates() != null && criteria.getRealDates().size() > 0) {
                fromDt = (Date)criteria.getRealDates().get(0);
                toDt = (Date)criteria.getRealDates().get(1);
            }
            if ((cpaneldto = this.cpanel.findAllByOrgId(Long.valueOf(orgId))) != null && cpaneldto.getImplementationType() != null && cpaneldto.getImplementationType().equalsIgnoreCase("department")) {
                String empId = null;
                if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"))) {
                    empId = UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID");
                }
                if (Objects.nonNull(criteria.getEmpId())) {
                    empId = criteria.getEmpId();
                }
                if (empId != null && Objects.isNull(criteria.getDeptName())) {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
                    Employee employee = this.employeeService.getEmployee(employeeDTO);
                    if (employee != null && employee.getDeptDetails() != null && employee.getDeptDetails().getId() > 0L) {
                        ArrayList<Long> departmentList = new ArrayList();
                        Map childMap = new HashMap();
                        childMap = this.kpidao.getDepartmentListRecursive(criteria.getDepartmentId(), fromDt, toDt);
                        if (childMap != null) {
                            departmentList = new ArrayList(childMap.keySet());
                        }
                        DepartmentChartMapping detpartmentmapping = this.departmentchart.getOne(Long.valueOf(employee.getDeptDetails().getId()));
                        return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", departmentList, Boolean.valueOf(true), detpartmentmapping, null, childMap);
                    }
                } else {
                    DepartmentChartMapping parentDepartment = null;
                    DepartmentChartMapping departmentMapping = this.departmentchart.getOneDepartment(criteria.getDeptName(), 0);
                    if (departmentMapping.getDeptParentId() != 0L) {
                        parentDepartment = this.departmentchart.getOne(departmentMapping.getDeptParentId(), 0);
                    }
                    ArrayList<Long> departmentlist = new ArrayList();
                    Map childMap = new HashMap();
                    if (parentDepartment != null) {
                        childMap = this.kpidao.getDepartmentListRecursive(departmentMapping.getDeptParentId().longValue(), fromDt, toDt);
                        if (childMap != null) {
                            departmentlist = new ArrayList(childMap.keySet());
                        }
                    } else {
                        childMap = this.kpidao.getDepartmentListRecursive(departmentMapping.getDeptId().longValue(), fromDt, toDt);
                        if (childMap != null) {
                            departmentlist = new ArrayList(childMap.keySet());
                        }
                    }
                    return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", departmentlist, Boolean.valueOf(false), departmentMapping, parentDepartment, childMap);
                }
            }
        }
        if (criteria.getGroupBy() != null && criteria.getGroupBy().equalsIgnoreCase("Dept")) {
            return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual AS A,org.mtd_target AS T,org.rolling_12_actual AS RA,org.rolling_12_budget AS B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency AS currency, ed.department AS dept FROM orgstructure.org_kpi_details org, orgstructure.employee_details ed WHERE ");
        }
        return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency FROM orgstructure.org_kpi_details org WHERE");
    }

    public List<Map<String, Object>> retrieveYTD(KPICriteria criteria) {
        if (CollectionUtils.isNotEmpty((Collection)criteria.getRealDates())) {
            ArrayList<Object> realDates = new ArrayList<Object>();
            for (Object object : criteria.getRealDates()) {
                realDates.add(new Date((Long)object));
            }
            criteria.setRealDates(realDates);
        }
        if ("Percentage".equalsIgnoreCase(criteria.getKpiType())) {
            return this.kpidao.getOrgKPIDetails(criteria, "SELECT ROUND(AVG(CAST(temp.mtd_actual AS DECIMAL(38,2))),2) AS YTD, temp.type as type,temp.currency as currency FROM  (SELECT AVG(CAST(org.mtd_actual AS DECIMAL(38,2))) AS mtd_actual,org.type,org.currency   FROM orgstructure.org_kpi_details org  WHERE  where_replace GROUP BY org.real_date_from, org.real_date_to, org.type,org.currency ) temp group by type, currency");
        }
        return this.kpidao.getOrgKPIDetails(criteria, "SELECT MAX(CAST(temp.mtd_actual AS DECIMAL(38,2))) AS YTD, temp.type as type, temp.currency as currency FROM  (SELECT SUM(CAST(org.mtd_actual AS DECIMAL(38,2))) AS mtd_actual,org.type,org.currency  FROM orgstructure.org_kpi_details org  WHERE  where_replace GROUP BY org.real_date_from, org.real_date_to, org.type, org.currency ) temp group by type, currency");
    }

    public List<KPIDTO> getKpiList(long empId, boolean employeeView) {
        List<KPI> dbList = null;
        dbList = employeeView ? this.kpiRepository.findByOwnerAndActive(Long.valueOf(empId), 0) : this.kpiRepository.findAllByEmpIdAndActive(Long.valueOf(empId), 0);
        return dbList.stream().map(dbValue -> new KPIDTO(dbValue)).collect(Collectors.toList());
    }

    public List<KPIDTO> orgKpiList(String orgId) {
        List<KPI> dbList = this.kpiRepository.findAllByOrgId(Long.valueOf(Long.parseLong(orgId)));
        return dbList.stream().map(dbValue -> new KPIDTO(dbValue)).collect(Collectors.toList());
    }

    private void createKPIId(KPI kpidto) {
        if (kpidto.getId() == 0L && kpidto.getObjectiveId() != 0L) {
            Objectives objectives = (Objectives)this.objectivesService.findById(kpidto.getObjectiveId()).get();
            ObjectivesDTO objectivesDTO = new ObjectivesDTO(objectives, false);
            String objPrefix = objectivesDTO.getObjectiveId();
            String maxId = this.kpidao.getMaxId(Long.valueOf(objectivesDTO.getId()), "kpi");
            String kpiId = String.join((CharSequence)".", objPrefix, maxId);
            kpidto.setKpiIdSequence(Long.valueOf(maxId));
            kpidto.setKpiId(kpiId);
        }
    }

    public List<Map<String, Object>> getNodeKeyType(List<String> nodeKeyList) {
        return this.kpidao.getNodeKeyType(nodeKeyList);
    }

    public ScoreCardResponseDTO deleteKPIById(long kpiId) {
        ScoreCardResponseDTO cardResponseDTO = new ScoreCardResponseDTO();
        Optional kpiOptional = this.findById(kpiId);
        if (kpiOptional.isPresent()) {
            KPI kpi = (KPI)kpiOptional.get();
            kpi.setActive(1);
            this.kpidao.deleteKPIById(kpiId);
            this.kpiRepository.save(kpi);
            cardResponseDTO.setFlag(true);
            return cardResponseDTO;
        }
        cardResponseDTO.setFlag(false);
        return cardResponseDTO;
    }

    public void updateCustomRepotee(long scoreCardId, boolean inculde_reportee, String custom_reportee) {
        this.kpidao.updateCustomRepotee(scoreCardId, inculde_reportee, custom_reportee);
    }

    public void updateKpiReportee(List<KPIDTO> kpiList, boolean includeReportee, String customReportees) {
        for (KPIDTO kpidto : kpiList) {
            if (kpidto == null) continue;
            kpidto.setCustomReportees(customReportees);
            kpidto.setIncludeReportee(includeReportee);
            Long kpinode = 0L;
            if (Objects.isNull(kpidto.getId()) || Objects.nonNull(kpidto.getId()) && kpidto.getId() == 0L) {
                kpinode = this.nodekeygen.generateNodeKey();
            }
            if (Objects.nonNull(kpinode) && kpinode != 0L) {
                kpidto.setId(kpinode.longValue());
            }
            this.kpiRepository.save(new KPI(kpidto));
        }
    }

    public KPIDetailsPo getnodekeyTarget(KPIDetailsDTO kpiDetailsDTO, String startDate, String endDate) {
        List org_details_list = this.kpiDetailsRepository.findBykeyandDate(Long.valueOf(Long.parseLong(kpiDetailsDTO.getNodeKey())), Long.valueOf(Long.parseLong(kpiDetailsDTO.getOrgKey())), startDate, endDate);
        KPIDetailsPo org_details = null;
        if (org_details_list != null && org_details_list.size() > 0) {
            org_details = (KPIDetailsPo)org_details_list.get(0);
        }
        return org_details;
    }

    public KPIDetailsDTO saveOrgKpiDetails(KPIDetailsDTO kpiDetailsDTO) {
        String initialDate = null;
        String finalDate = null;
        SimpleDateFormat dateFormat_qy = new SimpleDateFormat("yyyy-MM-dd");
        initialDate = dateFormat_qy.format(kpiDetailsDTO.getRealDateFrom());
        finalDate = dateFormat_qy.format(kpiDetailsDTO.getRealDateTo());
        List kpidetaillist = this.kpiDetailsRepository.findBykeyandDate(Long.valueOf(Long.parseLong(kpiDetailsDTO.getNodeKey())), Long.valueOf(Long.parseLong(kpiDetailsDTO.getOrgKey())), initialDate, finalDate);
        if (kpidetaillist != null && kpidetaillist.size() > 1) {
            this.kpiDetailsRepository.deletedifferent(Long.valueOf(Long.parseLong(kpiDetailsDTO.getNodeKey())), initialDate, finalDate, finalDate);
        }
        KPIDetailsPo kpiDetailsPo = new KPIDetailsPo(kpiDetailsDTO);
        kpiDetailsPo.setFormData(1);
        KPIDetailsPo response = (KPIDetailsPo)this.kpiDetailsRepository.save(kpiDetailsPo);
        if (kpiDetailsDTO.getKpiAttachment() != null) {
            for (KpiDetailsAttachmentsDTO kpidoc : kpiDetailsDTO.getKpiAttachment()) {
                KpiDetailsAttachments kpiattachdocument = new KpiDetailsAttachments(kpidoc);
                kpiattachdocument.setKpiDataId(Long.valueOf(response.getOrgKpiId()));
                kpiattachdocument.setCreatedTime(LocalDateTime.now());
                kpiattachdocument.setCreatedBy(response.getOrgKey());
                kpiattachdocument.setKpiId(Long.valueOf(kpiDetailsDTO.getKpiId()));
                this.kpiDetailsAttachmentsRepository.save(kpiattachdocument);
            }
        }
        KPIDetailsDTO detailsDTO = new KPIDetailsDTO();
        detailsDTO.setOrgKpiId(response.getOrgKpiId());
        return detailsDTO;
    }

    public void kpiFileSave(KpiDetailsAttachmentsDTO kpidoc) {
        System.out.println("Enter in save file");
        byte[] decodedBytes = Base64.getDecoder().decode(kpidoc.getFile());
        String filePath = this.filepath + "/kpi/" + kpidoc.getUniqueFileReference();
        try {
            Files.write(Paths.get(filePath, new String[0]), decodedBytes, new OpenOption[0]);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<KPIDTO> kpiListByDate(long objId, String dateRange) {
        Date firstDate = null;
        Date secondDate = null;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                firstDate = dateFormat.parse(startDate);
                secondDate = dateFormat.parse(endDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        List<KPI> dbList = this.kpiRepository.findByObjIdAndActiveByDate(Long.valueOf(objId), 0, firstDate, secondDate);
        return dbList.stream().map(dbValue -> new KPIDTO(dbValue)).collect(Collectors.toList());
    }

    public List<KPI> findByName(Long empId, String name) {
        List<KPI> dbList = this.kpiRepository.findByName(empId, name, 0);
        return dbList;
    }

    public List<Map<String, Object>> getSubMeasureNodeKeyList(Long nodeKey) {
        List<Map<String, Object>> result = this.kpidao.getSubMeasureNodeKeyList(nodeKey.longValue());
        ArrayList<Map<String, Object>> finalResult = new ArrayList<Map<String, Object>>();
        for (Map map : result) {
            map.put("subMeasureName", this.getmeasurename(Long.valueOf(map.get("node_key").toString())));
            map.put("real_date_from", this.getDateString(map.get("real_date_from").toString()));
            map.put("real_date_to", this.getDateString(map.get("real_date_to").toString()));
            finalResult.add(map);
        }
        return finalResult;
    }

    public String getDateString(String date) {
        String formatDateTime = null;
        try {
            SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-mm-dd");
            Date date2 = formatter2.parse(date);
            SimpleDateFormat formatter = new SimpleDateFormat("MMM dd, yyyy");
            formatDateTime = formatter.format(date2);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return formatDateTime;
    }

    public String getmeasurename(Long nodeKey) {
        KPIElementDetailsPo result = this.kpidao.getElementDetails(nodeKey.longValue());
        return result.getMeasureName();
    }

    public KPIElementDetailsPo getkpielementname(Long nodeKey) {
        KPIElementDetailsPo result = this.kpidao.getElementDetails(nodeKey.longValue());
        return result;
    }

    public List<Map<String, Object>> retrieveSubMeasureKPIDetails(KPICriteria criteria) {
        String orgId = null;
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
            orgId = UserThreadLocal.get((String)"USER_ORG_ID");
        }
        if (criteria.isRetrieveKpiTarget()) {
            Calendar startDate = Calendar.getInstance();
            startDate.setTimeInMillis((Long)criteria.getRealDates().get(0));
            Calendar endDate = Calendar.getInstance();
            endDate.setTimeInMillis((Long)criteria.getRealDates().get(1));
            return this.kpidao.getAnnualTarget(criteria, (long)startDate.get(1), (long)endDate.get(1));
        }
        if (criteria.isRetrieveYTD()) {
            return this.retrieveYTD(criteria);
        }
        if (CollectionUtils.isNotEmpty((Collection)criteria.getRealDates())) {
            ArrayList<Object> realDates = new ArrayList<Object>();
            for (Object object : criteria.getRealDates()) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(new Date((Long)object));
                calendar.set(14, 0);
                calendar.set(13, 0);
                calendar.set(12, 0);
                calendar.set(10, 0);
                realDates.add(calendar.getTime());
            }
            criteria.setRealDates(realDates);
        }
        if (criteria.isRetrieveRowCount()) {
            return this.kpidao.getOrgKPIDetails(criteria, "SELECT DISTINCT org.node_key AS NODE_KEY FROM orgstructure.org_kpi_details org WHERE");
        }
        if (orgId != null) {
            ControlPanelGeneral cpaneldto;
            Date fromDt = null;
            Date toDt = null;
            if (criteria.getRealDates() != null && criteria.getRealDates().size() > 0) {
                fromDt = (Date)criteria.getRealDates().get(0);
                toDt = (Date)criteria.getRealDates().get(1);
            }
            if ((cpaneldto = this.cpanel.findAllByOrgId(Long.valueOf(orgId))) != null && cpaneldto.getImplementationType() != null) {
                if (cpaneldto.getImplementationType().equalsIgnoreCase("department")) {
                    String empId = null;
                    if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"))) {
                        empId = UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID");
                    }
                    if (Objects.nonNull(criteria.getEmpId())) {
                        empId = criteria.getEmpId();
                    }
                    if (empId != null && Objects.isNull(criteria.getDeptName())) {
                        EmployeeDTO employeeDTO = new EmployeeDTO();
                        employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
                        Employee employee = this.employeeService.getEmployee(employeeDTO);
                        if (employee != null && employee.getDeptDetails() != null && employee.getDeptDetails().getId() > 0L) {
                            ArrayList<Long> departmentlist = new ArrayList();
                            Map childMap = new HashMap();
                            childMap = this.kpidao.getDepartmentListRecursive(employee.getDeptDetails().getId(), fromDt, toDt);
                            if (childMap != null) {
                                departmentlist = new ArrayList(childMap.keySet());
                            }
                            DepartmentChartMapping detpartmentmapping = this.departmentchart.getOne(Long.valueOf(employee.getDeptDetails().getId()));
                            return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", departmentlist, Boolean.valueOf(true), detpartmentmapping, null, childMap);
                        }
                    }
                } else {
                    DepartmentChartMapping detpartmentmapping = this.departmentchart.getOneDepartment(criteria.getDeptName(), 0);
                    Map childMap = new HashMap();
                    ArrayList<Long> departmentlist = new ArrayList();
                    childMap = this.kpidao.getDepartmentListRecursive(detpartmentmapping.getDeptId().longValue(), fromDt, toDt);
                    if (childMap != null) {
                        departmentlist = new ArrayList(childMap.keySet());
                    }
                    return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", departmentlist, Boolean.valueOf(false), detpartmentmapping, null, childMap);
                }
            }
        }
        return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency FROM orgstructure.org_kpi_details org WHERE");
    }

    public List<KPIDTO> findAllByDeptId(long deptId) {
        Collection<KPI> dbList = null;
        List idList = this.departmentMappingRepository.departmentByEmployeeIdList(deptId, "Active");
        if (!idList.isEmpty()) {
            dbList = this.kpiRepository.findAllByEmpIds(idList, 0);
        }
        if (dbList != null) {
            return dbList.stream().map(dbValue -> new KPIDTO(dbValue)).collect(Collectors.toList());
        }
        return new ArrayList<KPIDTO>();
    }

    public void checkNodeKey() {
        List<KPI> kpis = this.kpiRepository.findAll();
        List<KPIDTO> kpidtos = kpis.stream().map(dbValue -> new KPIDTO(dbValue)).collect(Collectors.toList());
        for (KPIDTO kpi : kpidtos) {
            Map stringObjectMap = kpi.getKpiValue();
            stringObjectMap.put("kpiFormula", "");
            stringObjectMap.put("ytdFormula", "");
            kpi.setKpiValue(stringObjectMap);
            KPI kpi1 = new KPI(kpi);
            this.kpiRepository.save(kpi1);
        }
    }

    public List<KPIDTO> retrieveKpiFormDataList(long scoreCardId) {
        List<KPI> dbList = this.kpiRepository.findByScorecardId(Long.valueOf(scoreCardId), 0);
        return dbList.stream().map(dbValue -> new KPIDTO(dbValue)).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getSubMeasureNodeKeyListForm(Long nodeKey, String dateRange, String empId) {
        ArrayList<Long> departmentList = new ArrayList<Long>();
        String initialDate = null;
        String finalDate = null;
        Date firstDate = null;
        Date secondDate = null;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd,yyyy");
            try {
                firstDate = dateFormat.parse(startDate);
                secondDate = dateFormat.parse(endDate);
                SimpleDateFormat dateFormat_qy = new SimpleDateFormat("yyyy-MM-dd");
                initialDate = dateFormat_qy.format(firstDate);
                finalDate = dateFormat_qy.format(secondDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        if (empId != null) {
            EmployeeDTO employeeDTO = new EmployeeDTO();
            employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
            Employee employee = this.employeeService.getEmployee(employeeDTO);
            departmentList.add(employee.getDeptDetails().getId());
        }
        List<Long> result = new ArrayList();
        result = departmentList != null && departmentList.size() > 0 ? this.kpiDetailsRepository.findNodeKeyByMeasureKeydept(nodeKey, initialDate, finalDate, departmentList) : this.kpiDetailsRepository.findNodeKeyByMeasureKey(nodeKey, initialDate, finalDate);
        ArrayList<Map<String, Object>> finalResult = new ArrayList<Map<String, Object>>();
        for (Long nodeKeyresut : result) {
            HashMap<String, Object> map = new HashMap<String, Object>();
            KPIElementDetailsPo elem = this.getkpielementname(nodeKeyresut);
            map.put("subMeasureName", elem.getMeasureName());
            map.put("frequency", elem.getFrequency());
            map.put("nodeKey", nodeKeyresut);
            finalResult.add(map);
        }
        return finalResult;
    }

    public Map<String, Object> nodeKeyDataCheck(Long nodeKey, String dateRange) {
        List result_list;
        String initialDate = null;
        String finalDate = null;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd,yyyy");
            try {
                Date firstDate = dateFormat.parse(startDate);
                Date secondDate = dateFormat.parse(endDate);
                SimpleDateFormat dateFormat_qy = new SimpleDateFormat("yyyy-MM-dd");
                initialDate = dateFormat_qy.format(firstDate);
                finalDate = dateFormat_qy.format(secondDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        if ((result_list = this.kpiDetailsRepository.nodeKeyDataCheck1(nodeKey, Long.valueOf(UserThreadLocal.get()), initialDate, finalDate)) != null && result_list.size() > 0) {
            KPIDetailsPo result = (KPIDetailsPo)result_list.get(0);
            HashMap<String, Object> map = new HashMap<String, Object>();
            map.put("MeasureName", this.getmeasurename(result.getNodeKey()));
            map.put("nodeKey", result.getNodeKey());
            map.put("message", "present");
            return map;
        }
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("message", "notPresent");
        return map;
    }

    public Map<String, Object> subNodeKeyData(Long nodeKey, Long measureKey, String dateRange) {
        KPIDetailsPo result;
        String initialDate = null;
        String finalDate = null;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd,yyyy");
            try {
                Date firstDate = dateFormat.parse(startDate);
                Date secondDate = dateFormat.parse(endDate);
                SimpleDateFormat dateFormat_qy = new SimpleDateFormat("yyyy-MM-dd");
                initialDate = dateFormat_qy.format(firstDate);
                finalDate = dateFormat_qy.format(secondDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        if ((result = this.kpiDetailsRepository.nodeKeyDataCheck(nodeKey, measureKey, initialDate, finalDate)) != null) {
            HashMap<String, Object> map = new HashMap<String, Object>();
            map.put("actual", result.getMtdActual());
            map.put("orgkpiId", result.getOrgKpiId());
            map.put("target", result.getMtdTarget());
            return map;
        }
        return new HashMap<String, Object>();
    }

    public List<Map<String, Object>> retrieveOrgKpiDetailsByReportee(KPICriteria criteria) {
        this.log.info("1224 check retriveorgkpidetails  start timing: {} ", (Object)LocalDateTime.now());
        String orgId = null;
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
            orgId = UserThreadLocal.get((String)"USER_ORG_ID");
        }
        if (criteria.isRetrieveKpiTarget()) {
            Calendar startDate = Calendar.getInstance();
            startDate.setTimeInMillis((Long)criteria.getRealDates().get(0));
            Calendar endDate = Calendar.getInstance();
            endDate.setTimeInMillis((Long)criteria.getRealDates().get(1));
            return this.kpidao.getAnnualTarget(criteria, (long)startDate.get(1), (long)endDate.get(1));
        }
        if (criteria.isRetrieveYTD()) {
            return this.retrieveYTD(criteria);
        }
        if (CollectionUtils.isNotEmpty((Collection)criteria.getRealDates())) {
            ArrayList<Object> realDates = new ArrayList<Object>();
            for (Object object : criteria.getRealDates()) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(new Date((Long)object));
                calendar.set(14, 0);
                calendar.set(13, 0);
                calendar.set(12, 0);
                calendar.set(10, 0);
                realDates.add(calendar.getTime());
            }
            criteria.setRealDates(realDates);
        }
        if (criteria.isRetrieveRowCount()) {
            return this.kpidao.getOrgKPIDetails(criteria, "SELECT DISTINCT org.node_key AS NODE_KEY FROM orgstructure.org_kpi_details org WHERE");
        }
        if (orgId != null) {
            Date fromDt = null;
            Date toDt = null;
            if (criteria.getRealDates() != null && criteria.getRealDates().size() > 0) {
                fromDt = (Date)criteria.getRealDates().get(0);
                toDt = (Date)criteria.getRealDates().get(1);
            }
            String orgIdFinal = orgId;
            ControlPanelGeneral cpaneldto = this.cpanelLocalCache.computeIfAbsent(orgId, k -> this.cpanel.findAllByOrgId(Long.valueOf(orgIdFinal)));
            CustomPerformance customPerformance = new CustomPerformance(this.customPerfLocalCache.computeIfAbsent(orgId, k -> this.controlPanelGeneralService.findCustomPerformanceByOrgId()));
            if (cpaneldto != null && cpaneldto.getImplementationType() != null && cpaneldto.getImplementationType().equalsIgnoreCase("department")) {
                String empId = null;
                if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"))) {
                    empId = UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID");
                }
                if (Objects.nonNull(criteria.getEmpId())) {
                    empId = criteria.getEmpId();
                }
                if (Objects.nonNull(criteria.getDepartmentId()) && criteria.getDepartmentId() > 0L) {
                    ArrayList<Long> departmentlist = new ArrayList<Long>();
                    Map childMap = new HashMap();
                    if (customPerformance.isAggregation() && !customPerformance.isCustomAggregation()) {
                        childMap = this.kpidao.getDepartmentListRecursive(criteria.getDepartmentId(), fromDt, toDt);
                        if (childMap != null) {
                            departmentlist = new ArrayList(childMap.keySet());
                        } else {
                            departmentlist.add(criteria.getDepartmentId());
                        }
                    } else if (customPerformance.isAggregation() && customPerformance.isCustomAggregation()) {
                        departmentlist.add(criteria.getDepartmentId());
                        if (criteria.getDeptReportee() != "" && criteria.getDeptReportee() != null) {
                            departmentlist.addAll(Arrays.asList(criteria.getDeptReportee().split(",")).stream().map(s -> Long.parseLong(s.trim())).collect(Collectors.toList()));
                        }
                    } else {
                        departmentlist.add(criteria.getDepartmentId());
                    }
                    DepartmentChartMapping detpartmentmapping = this.departmentchart.getOne(Long.valueOf(criteria.getDepartmentId()));
                    return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", departmentlist, Boolean.valueOf(true), detpartmentmapping, null, childMap);
                }
                if (empId != null && Objects.isNull(criteria.getDeptName())) {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
                    Employee employee = this.employeeService.getEmployee(employeeDTO);
                    if (employee != null && employee.getDeptDetails() != null && employee.getDeptDetails().getId() > 0L) {
                        ArrayList<Long> departmentlist = new ArrayList<Long>();
                        Map childMap = new HashMap();
                        if (customPerformance.isAggregation() && !customPerformance.isCustomAggregation()) {
                            childMap = this.kpidao.getDepartmentListRecursive(criteria.getDepartmentId(), fromDt, toDt);
                            if (childMap != null) {
                                departmentlist = new ArrayList(childMap.keySet());
                            } else {
                                departmentlist.add(criteria.getDepartmentId());
                            }
                        } else if (customPerformance.isAggregation() && customPerformance.isCustomAggregation()) {
                            departmentlist.add(employee.getDeptDetails().getId());
                            if (criteria.getDeptReportee() != "" && criteria.getDeptReportee() != null) {
                                departmentlist.addAll(Arrays.asList(criteria.getDeptReportee().split(",")).stream().map(s -> Long.parseLong(s.trim())).collect(Collectors.toList()));
                            }
                        } else {
                            departmentlist.add(employee.getDeptDetails().getId());
                        }
                        DepartmentChartMapping detpartmentmapping = this.departmentchart.getOne(Long.valueOf(employee.getDeptDetails().getId()));
                        return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", departmentlist, Boolean.valueOf(true), detpartmentmapping, null, childMap);
                    }
                } else {
                    DepartmentChartMapping parentDepartment = null;
                    DepartmentChartMapping departmentMapping = this.departmentchart.getOneDepartment(criteria.getDeptName(), 0);
                    if (departmentMapping.getDeptParentId() != 0L) {
                        parentDepartment = this.departmentchart.getOne(departmentMapping.getDeptParentId(), 0);
                    }
                    Map childMap = new HashMap();
                    ArrayList<Long> departmentlist = new ArrayList<Long>();
                    if (parentDepartment != null) {
                        childMap = this.kpidao.getDepartmentListRecursive(departmentMapping.getDeptParentId().longValue(), fromDt, toDt);
                        if (childMap != null) {
                            departmentlist = new ArrayList(childMap.keySet());
                        } else {
                            departmentlist.add(departmentMapping.getDeptParentId());
                        }
                    } else {
                        childMap = this.kpidao.getDepartmentListRecursive(departmentMapping.getDeptId().longValue(), fromDt, toDt);
                        if (childMap != null) {
                            departmentlist = new ArrayList(childMap.keySet());
                        } else {
                            departmentlist.add(departmentMapping.getDeptId());
                        }
                    }
                    this.log.info("1379 check enter liin laterelse end timing: {} ", (Object)LocalDateTime.now());
                    return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", departmentlist, Boolean.valueOf(false), departmentMapping, parentDepartment, childMap);
                }
            }
        }
        if (criteria.getGroupBy() != null && criteria.getGroupBy().equalsIgnoreCase("Dept")) {
            this.log.info("1390 check getgroipby  end timing: {} ", (Object)LocalDateTime.now());
            return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual AS A,org.mtd_target AS T,org.rolling_12_actual AS RA,org.rolling_12_budget AS B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency AS currency, ed.department AS dept FROM orgstructure.org_kpi_details org, orgstructure.employee_details ed WHERE ");
        }
        return this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency FROM orgstructure.org_kpi_details org WHERE");
    }

    public void updateCustomThresholdValue(Long orgId, String option1, String option2, String option3, String option4, String option5) {
        List<KPI> kpiList = this.kpiRepository.findAllByOrgIdAndAct(orgId);
        kpiList.stream().map(kpi -> {
            KPIDTO kpidto = new KPIDTO(kpi, true);
            Map stringObjectMap = kpidto.getKpiValue();
            stringObjectMap.put("optioncolor1", option1);
            stringObjectMap.put("optioncolor2", option2);
            stringObjectMap.put("optioncolor3", option3);
            stringObjectMap.put("optioncolor4", option4);
            stringObjectMap.put("optioncolor5", option5);
            kpidto.setKpiValue(stringObjectMap);
            KPI kpi1 = new KPI(kpidto);
            this.kpiRepository.save(kpi1);
            return kpi;
        }).collect(Collectors.toList());
    }

    public List<KPIDTO> kpiListByDeptId(long deptId) {
        List<KPI> dbList = this.kpiRepository.findByDeptId(Long.valueOf(deptId), 0);
        return dbList.stream().map(dbValue -> new KPIDTO(dbValue)).collect(Collectors.toList());
    }

    public List<KPIDTO> kpiListByDeptId(long deptId, String dateRange) {
        Date firstDate = null;
        Date secondDate = null;
        String[] dataRanges = null;
        if (Objects.nonNull(dateRange)) {
            String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
        }
        if (dataRanges != null && dataRanges.length > 1) {
            String startDate = dataRanges[0].trim();
            String endDate = dataRanges[1].trim();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                firstDate = dateFormat.parse(startDate);
                secondDate = dateFormat.parse(endDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        List<KPI> dbList = this.kpiRepository.findByDeptIdbydate(Long.valueOf(deptId), 0, firstDate, secondDate);
        return dbList.stream().map(dbValue -> new KPIDTO(dbValue)).collect(Collectors.toList());
    }

    public Map<String, Object> checkNodeKey(String nodeKey) {
        return this.kpidao.checkNodeKey(nodeKey);
    }

    public Map<String, Object> retrieveOrgKpiDetailsByFunction(KPICriteria criteria, String type) {
        String orgId = null;
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
            orgId = UserThreadLocal.get((String)"USER_ORG_ID");
        }
        if (CollectionUtils.isNotEmpty((Collection)criteria.getRealDates())) {
            ArrayList<Object> realDates = new ArrayList<Object>();
            for (Object object : criteria.getRealDates()) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(new Date((Long)object));
                calendar.set(14, 0);
                calendar.set(13, 0);
                calendar.set(12, 0);
                calendar.set(10, 0);
                realDates.add(calendar.getTime());
            }
            criteria.setRealDates(realDates);
        }
        if (orgId != null) {
            ControlPanelGeneral cpaneldto = this.cpanel.findAllByOrgId(Long.valueOf(orgId));
            CustomPerformance customPerformance = new CustomPerformance(this.controlPanelGeneralService.findCustomPerformanceByOrgId());
            if (cpaneldto != null && cpaneldto.getImplementationType() != null && cpaneldto.getImplementationType().equalsIgnoreCase("department")) {
                String empId = null;
                if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"))) {
                    empId = UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID");
                }
                if (empId != null && Objects.isNull(criteria.getDeptName())) {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
                    Employee employee = this.employeeService.getEmployee(employeeDTO);
                    if (employee != null && employee.getDeptDetails() != null && employee.getDeptDetails().getId() > 0L) {
                        List departmentlist = new ArrayList<Long>();
                        if (customPerformance.isAggregation() && !customPerformance.isCustomAggregation()) {
                            departmentlist = this.kpidao.getDepartmentList(employee.getDeptDetails().getId(), departmentlist);
                        } else if (customPerformance.isAggregation() && customPerformance.isCustomAggregation()) {
                            departmentlist.add(employee.getDeptDetails().getId());
                            if (criteria.getDeptReportee() != "" && criteria.getDeptReportee() != null) {
                                departmentlist.addAll(Arrays.asList(criteria.getDeptReportee().split(",")).stream().map(s -> Long.parseLong(s.trim())).collect(Collectors.toList()));
                            }
                        } else {
                            departmentlist.add(employee.getDeptDetails().getId());
                        }
                        DepartmentChartMapping detpartmentmapping = this.departmentchart.getOne(Long.valueOf(employee.getDeptDetails().getId()));
                        if (departmentlist != null && departmentlist.size() > 0) {
                            return this.kpidao.getOrgKPIDetailsDeptFunctionData(criteria, "SELECT sum(org.mtd_actual) as A  FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt WHERE ", departmentlist, Boolean.valueOf(true), detpartmentmapping, null);
                        }
                    }
                } else {
                    DepartmentChartMapping parentDepartment = null;
                    DepartmentChartMapping departmentMapping = this.departmentchart.getOneDepartment(criteria.getDeptName(), 0);
                    if (departmentMapping.getDeptParentId() != 0L) {
                        parentDepartment = this.departmentchart.getOne(departmentMapping.getDeptParentId(), 0);
                    }
                    List departmentlist = new ArrayList();
                    departmentlist = parentDepartment != null ? this.kpidao.getDepartmentList(departmentMapping.getDeptParentId().longValue(), departmentlist) : this.kpidao.getDepartmentList(departmentMapping.getDeptId().longValue(), departmentlist);
                    if (departmentlist != null && departmentlist.size() > 0) {
                        return this.kpidao.getOrgKPIDetailsDeptFunctionData(criteria, "SELECT sum(org.mtd_actual) as A  FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt WHERE ", departmentlist, Boolean.valueOf(false), departmentMapping, parentDepartment);
                    }
                }
            }
        }
        if (type.equalsIgnoreCase("Actual")) {
            return this.kpidao.getOrgKPIDetailsGetFunctionData(criteria, "SELECT sum(mtd_actual) as A FROM orgstructure.org_kpi_details  WHERE ");
        }
        return this.kpidao.getOrgKPIDetailsGetFunctionData(criteria, "SELECT sum(mtd_target) as T FROM orgstructure.org_kpi_details  WHERE ");
    }

    public Map<String, Object> retrieveOrgKpiDetailsForSubMeasure(KPICriteria kpiCriteria, String type) {
        if (type.equalsIgnoreCase("Actual")) {
            return this.kpidao.getOrgKpiDetailsForSubMeasure(kpiCriteria, "SELECT sum(mtd_actual) as A FROM orgstructure.org_kpi_details  WHERE ");
        }
        return this.kpidao.getOrgKpiDetailsForSubMeasure(kpiCriteria, "SELECT sum(mtd_target) as T FROM orgstructure.org_kpi_details  WHERE ");
    }

    public List<Map<String, Object>> retrieveKPIDetailsForDrillDown(KPICriteria criteria) {
        List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
        String orgId = null;
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
            orgId = UserThreadLocal.get((String)"USER_ORG_ID");
        }
        if (CollectionUtils.isNotEmpty((Collection)criteria.getRealDates())) {
            ArrayList<Object> realDates = new ArrayList<Object>();
            for (Object object : criteria.getRealDates()) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(new Date((Long)object));
                calendar.set(14, 0);
                calendar.set(13, 0);
                calendar.set(12, 0);
                calendar.set(10, 0);
                realDates.add(calendar.getTime());
            }
            criteria.setRealDates(realDates);
        }
        if (orgId != null) {
            Date fromDt = null;
            Date toDt = null;
            if (criteria.getRealDates() != null && criteria.getRealDates().size() > 0) {
                fromDt = (Date)criteria.getRealDates().get(0);
                toDt = (Date)criteria.getRealDates().get(1);
            }
            ControlPanelGeneral cpaneldto = this.cpanel.findAllByOrgId(Long.valueOf(orgId));
            CustomPerformance customPerformance = new CustomPerformance(this.controlPanelGeneralService.findCustomPerformanceByOrgId());
            if (cpaneldto != null && cpaneldto.getImplementationType() != null) {
                if (cpaneldto.getImplementationType().equalsIgnoreCase("department")) {
                    String empId = null;
                    if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"))) {
                        empId = UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID");
                    }
                    if (empId != null && Objects.isNull(criteria.getDeptName())) {
                        EmployeeDTO employeeDTO = new EmployeeDTO();
                        employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
                        Employee employee = this.employeeService.getEmployee(employeeDTO);
                        List<Long> departmentlist = new ArrayList();
                        departmentlist = this.kpidao.getDepartmentList(employee.getDeptDetails().getId(), departmentlist);
                        DepartmentChartMapping detpartmentmapping = this.departmentchart.getOne(Long.valueOf(employee.getDeptDetails().getId()));
                        Map childMap = new HashMap();
                        childMap = this.kpidao.getDepartmentListRecursive(employee.getDeptDetails().getId(), fromDt, toDt);
                        if (childMap != null) {
                            departmentlist = new ArrayList(childMap.keySet());
                        } else {
                            departmentlist.add(employee.getDeptDetails().getId());
                        }
                        mapList = this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", departmentlist, Boolean.valueOf(true), detpartmentmapping, null, childMap);
                    }
                } else {
                    DepartmentChartMapping parentDepartment = null;
                    DepartmentChartMapping departmentMapping = this.departmentchart.getOneDepartment(criteria.getDeptName(), 0);
                    if (departmentMapping.getDeptParentId() != 0L) {
                        parentDepartment = this.departmentchart.getOne(departmentMapping.getDeptParentId(), 0);
                    }
                    ArrayList<Long> departmentlist = new ArrayList<Long>();
                    Map childMap = new HashMap();
                    if (parentDepartment != null) {
                        childMap = this.kpidao.getDepartmentListRecursive(departmentMapping.getDeptParentId().longValue(), fromDt, toDt);
                        if (childMap != null) {
                            departmentlist = new ArrayList(childMap.keySet());
                        } else {
                            departmentlist.add(departmentMapping.getDeptParentId());
                        }
                    } else {
                        childMap = this.kpidao.getDepartmentListRecursive(departmentMapping.getDeptId().longValue(), fromDt, toDt);
                        if (childMap != null) {
                            departmentlist = new ArrayList(childMap.keySet());
                        } else {
                            departmentlist.add(departmentMapping.getDeptId());
                        }
                    }
                    mapList = this.kpidao.getOrgKPIDetails(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ", departmentlist, Boolean.valueOf(false), departmentMapping, parentDepartment, childMap);
                }
            } else {
                String empId = null;
                if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"))) {
                    empId = UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID");
                }
                if (empId != null && Objects.isNull(criteria.getDeptName())) {
                    EmployeeDTO employeeDTO = new EmployeeDTO();
                    employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
                    Employee employee = this.employeeService.getEmployee(employeeDTO);
                    ArrayList<Long> employeeList = new ArrayList<Long>();
                    Map childMap = new HashMap();
                    if (!customPerformance.isAggregation()) {
                        employeeList.add(employee.getEmpId());
                    } else {
                        childMap = this.kpidao.getEmployeeListRecursive(employee.getEmpId(), fromDt, toDt);
                        if (childMap != null) {
                            employeeList = new ArrayList(childMap.keySet());
                        } else {
                            employeeList.add(employee.getEmpId());
                        }
                    }
                    mapList = this.kpidao.getOrgKPIDetailsEmployee(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, ed.department AS dept, org.measureKey as measureKey, org.measureType,kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.employee_details ed, orgstructure.kpi_element_details kpi_elem WHERE ", employeeList, Boolean.valueOf(true), employee, null, childMap);
                } else {
                    Employee parentEmployee = null;
                    EmployeeProfilePo employeeProfilePo = this.profilePoRepo.getOneByDepartment(criteria.getDeptName(), "Active");
                    if (employeeProfilePo.getParentEmpId() != 0L) {
                        EmployeeProfilePo parentEmp = this.profilePoRepo.getOne(employeeProfilePo.getParentEmpId(), "Active");
                        parentEmployee = new Employee(parentEmp, Boolean.valueOf(false));
                    }
                    Employee employee = new Employee(employeeProfilePo, Boolean.valueOf(false));
                    ArrayList<Long> employeeList = new ArrayList<Long>();
                    Map childMap = new HashMap();
                    if (!customPerformance.isAggregation()) {
                        employeeList.add(employee.getEmpId());
                    } else {
                        childMap = this.kpidao.getEmployeeListRecursive(employee.getEmpId(), fromDt, toDt);
                        if (childMap != null) {
                            employeeList = new ArrayList(childMap.keySet());
                        } else {
                            employeeList.add(employee.getEmpId());
                        }
                    }
                    mapList = this.kpidao.getOrgKPIDetailsEmployee(criteria, "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, ed.department AS dept, org.measureKey as measureKey, org.measureType,kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.employee_details ed, orgstructure.kpi_element_details kpi_elem WHERE ", employeeList, Boolean.valueOf(false), employee, parentEmployee, childMap);
                }
            }
        }
        return mapList;
    }

    public List<KpiDetailsAttachmentsDTO> retriveAttachmentByKpiId(Long kpiId) {
        List<com.estrat.backend.db.bean.po.KpiDetailsAttachments> kpiAttachments = this.kpiDetailsAttachmentsRepository.findAllAttachment(kpiId);
        return kpiAttachments.stream().map(dbValue -> new KpiDetailsAttachmentsDTO(dbValue)).collect(Collectors.toList());
    }

    public String kpiContributionPercentagebyDeptId(Long kpiId, String deptId, String type) {
        String result = null;
        ArrayList<Long> deptIds = new ArrayList<Long>();
        deptIds.add(Long.valueOf(deptId));
        if (type.equalsIgnoreCase("kpi")) {
            Optional kpi = this.kpiRepository.findById(kpiId);
            if (kpi.isPresent()) {
                String orgId = null;
                if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
                    orgId = UserThreadLocal.get((String)"USER_ORG_ID");
                }
                List<KPI> kpiList = this.kpiRepository.kpiListByDeptsAndKpiNameAndOrg(deptIds, ((KPI)kpi.get()).getKpiName(), 0, Long.valueOf(orgId));
                List<KPIDTO> kpidtos = kpiList.stream().map(KPIDTO::new).collect(Collectors.toList());
                double totalScore = kpidtos.stream().map(KPIDTO::getKpiValue).filter(Objects::nonNull).map(map -> map.get("contribution")).filter(Objects::nonNull).mapToDouble(value -> {
                    if (value instanceof Number) {
                        return ((Number)value).doubleValue();
                    }
                    if (value instanceof String) {
                        try {
                            return Double.parseDouble((String)value);
                        }
                        catch (NumberFormatException e) {
                            return 0.0;
                        }
                    }
                    return 0.0;
                }).sum();
                result = String.valueOf(totalScore);
            }
        } else {
            Optional kpi = this.subKPIRepository.findById(kpiId);
            if (kpi.isPresent()) {
                String orgId = null;
                if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
                    orgId = UserThreadLocal.get((String)"USER_ORG_ID");
                }
                List<SubKPI> kpiList = this.subKPIRepository.subkpiListBySubKpiNameANDDeptIds(deptIds, ((SubKPI)kpi.get()).getSubKpiName(), 0, Long.valueOf(orgId));
                List<SubKPIDTO> kpidtos = kpiList.stream().map(SubKPIDTO::new).collect(Collectors.toList());
                double totalScore = kpidtos.stream().filter(dto -> dto.getSubKpiValue() != null).filter(dto -> dto.getSubKpiValue().containsKey("contribution")).filter(dto -> dto.getSubKpiValue().get("contribution") != null).mapToDouble(dto -> ((Number)dto.getSubKpiValue().get("contribution")).doubleValue()).sum();
                result = String.valueOf(totalScore);
            }
        }
        return result;
    }

    public String kpiContributionPercentage(Long kpiId, String deptName, String type) {
        List deptIds;
        String orgId;
        Optional kpi;
        String result = null;
        Long deptId = 0L;
        if (deptName != null && deptName.contains("-")) {
            ArrayList<String> detIds = new ArrayList<String>(Arrays.asList(deptName.split("\\-")));
            List departmentChartMappings = this.departmentchart.getByDeptName(((String)detIds.get(0)).trim(), Long.valueOf((String)detIds.get(1)), 0);
            if (departmentChartMappings.size() > 0) {
                deptId = ((DepartmentChartMapping)departmentChartMappings.get(0)).getDeptId();
            }
        } else {
            String empId = null;
            if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID"))) {
                empId = UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID");
            }
            if (empId != null) {
                EmployeeDTO employeeDTO = new EmployeeDTO();
                employeeDTO.setEmployeeId(Long.valueOf(empId).longValue());
                Employee employee = this.employeeService.getEmployee(employeeDTO);
                deptId = employee.getDeptDetails().getId();
            }
        }
        if (type.equalsIgnoreCase("kpi")) {
            kpi = this.kpiRepository.findById(kpiId);
            if (kpi.isPresent()) {
                orgId = null;
                if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
                    orgId = UserThreadLocal.get((String)"USER_ORG_ID");
                }
                deptIds = this.departmentchart.getAllDepartmentidByParentIdmysql(deptId);
                deptIds.add(deptId);
                List<KPI> kpiList = this.kpiRepository.kpiListByDeptsAndKpiNameAndOrg(deptIds, ((KPI)kpi.get()).getKpiName(), 0, Long.valueOf(orgId));
                List<KPIDTO> kpidtos = kpiList.stream().map(KPIDTO::new).collect(Collectors.toList());
                double totalScore = kpidtos.stream().map(KPIDTO::getKpiValue).filter(Objects::nonNull).map(map -> map.get("contribution")).filter(Objects::nonNull).mapToDouble(value -> {
                    if (value instanceof Number) {
                        return ((Number)value).doubleValue();
                    }
                    if (value instanceof String) {
                        try {
                            return Double.parseDouble((String)value);
                        }
                        catch (NumberFormatException e) {
                            return 0.0;
                        }
                    }
                    return 0.0;
                }).sum();
                result = String.valueOf(totalScore);
            }
        } else {
            kpi = this.subKPIRepository.findById(kpiId);
            if (kpi.isPresent()) {
                orgId = null;
                if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"USER_ORG_ID"))) {
                    orgId = UserThreadLocal.get((String)"USER_ORG_ID");
                }
                deptIds = this.departmentchart.getAllDepartmentidByParentIdmysql(deptId);
                List<SubKPI> kpiList = this.subKPIRepository.subkpiListBySubKpiNameANDDeptIds(deptIds, ((SubKPI)kpi.get()).getSubKpiName(), 0, Long.valueOf(orgId));
                List<SubKPIDTO> kpidtos = kpiList.stream().map(SubKPIDTO::new).collect(Collectors.toList());
                double totalScore = kpidtos.stream().filter(dto -> dto.getSubKpiValue() != null).filter(dto -> dto.getSubKpiValue().containsKey("contribution")).filter(dto -> dto.getSubKpiValue().get("contribution") != null).mapToDouble(dto -> ((Number)dto.getSubKpiValue().get("contribution")).doubleValue()).sum();
                result = String.valueOf(totalScore);
            }
        }
        return result;
    }

    public Map<String, String> kpiContributionPercentagesBulk(Long kpiId, List<String> deptIds, String type) {
        HashMap<String, String> result = new HashMap<String, String>();
        if (deptIds == null || deptIds.isEmpty()) {
            return result;
        }
        for (String deptId : deptIds) {
            try {
                result.put(deptId, this.kpiContributionPercentagebyDeptId(kpiId, deptId, type));
            }
            catch (Exception e) {
                this.log.warn("Contribution bulk[{}] deptId={} failed: {}", new Object[]{kpiId, deptId, e.getMessage()});
                result.put(deptId, "100");
            }
        }
        return result;
    }

    public Map<Integer, List<Map<String, Object>>> retrieveOrgKpiDetailsByReporteeBulk(List<KPICriteria> criteriaList) {
        LinkedHashMap<Integer, List<Map<String, Object>>> result = new LinkedHashMap<Integer, List<Map<String, Object>>>();
        if (criteriaList == null) {
            return result;
        }
        for (int i = 0; i < criteriaList.size(); ++i) {
            try {
                result.put(i, this.retrieveOrgKpiDetailsByReportee(criteriaList.get(i)));
                continue;
            }
            catch (Exception e) {
                this.log.warn("Bulk criteria[{}] failed: {}", (Object)i, (Object)e.getMessage());
                result.put(i, Collections.emptyList());
            }
        }
        return result;
    }
}

