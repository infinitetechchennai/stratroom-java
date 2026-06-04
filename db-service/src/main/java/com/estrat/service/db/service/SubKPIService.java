/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.KPI
 *  com.estrat.service.db.bean.po.KPIElementDetailsPo
 *  com.estrat.service.db.bean.po.Objectives
 *  com.estrat.service.db.bean.po.SubKPI
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.KPIDAO
 *  com.estrat.service.db.dao.SubKPIRepository
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.ObjectivesDTO
 *  com.estrat.service.db.dto.ScoreCardResponseDTO
 *  com.estrat.service.db.dto.SubKPIDTO
 *  com.estrat.service.db.generators.NodeKeyGenerators
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.KPIService
 *  com.estrat.service.db.service.ObjectivesService
 *  com.estrat.service.db.service.SubKPIService
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.KPI;
import com.estrat.service.db.bean.po.KPIElementDetailsPo;
import com.estrat.service.db.bean.po.Objectives;
import com.estrat.service.db.bean.po.SubKPI;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.KPIDAO;
import com.estrat.service.db.dao.SubKPIRepository;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.ObjectivesDTO;
import com.estrat.service.db.dto.ScoreCardResponseDTO;
import com.estrat.service.db.dto.SubKPIDTO;
import com.estrat.service.db.generators.NodeKeyGenerators;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.KPIService;
import com.estrat.service.db.service.ObjectivesService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubKPIService {
    private Logger logger = Logger.getLogger(SubKPIService.class);
    @Autowired
    private SubKPIRepository subKPIRepository;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private NodeKeyGenerators nodekeygen;
    @Autowired
    private KPIService kpiService;
    @Autowired
    private KPIDAO kpidao;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private ObjectivesService objectivesService;

    public Optional<SubKPI> findById(long id) {
        return this.subKPIRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public SubKPIDTO save(SubKPIDTO subKpiDTO) {
        System.out.println(subKpiDTO.getId() + "  ... " + subKpiDTO.getSubKpiName() + "  ... " + subKpiDTO.getKpiId());
        SubKPI kpi = new SubKPI(subKpiDTO);
        kpi.setCreatedTime(LocalDateTime.now());
        if (StringUtils.isEmpty((CharSequence)kpi.getSubKpiId())) {
            this.createsubKPIId(kpi);
        }
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (subKpiDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(subKpiDTO.getCreatedBy());
        } else {
            employeeDTO.setEmployeeId(subKpiDTO.getUpdatedBy());
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
        SubKPIDTO outObj = new SubKPIDTO((SubKPI)this.subKPIRepository.save(kpi));
        System.out.println(outObj.getId() + "  ... " + outObj.getSubKpiName());
        this.saveKPIElementDetails(outObj, employee);
        return outObj;
    }

    private void saveKPIElementDetails(SubKPIDTO outObj, Employee employee) {
        KPIElementDetailsPo kpiElementDetailsPo = new KPIElementDetailsPo();
        kpiElementDetailsPo.setElementType("SUBKPI");
        kpiElementDetailsPo.setMeasureName(outObj.getSubKpiName());
        kpiElementDetailsPo.setActive(outObj.getActive());
        kpiElementDetailsPo.setNodeKey(outObj.getId());
        kpiElementDetailsPo.setMeasureType(1);
        kpiElementDetailsPo.setOrgId(employee.getOrgDetails().getOrgId());
        this.saveKPIElementDetails(kpiElementDetailsPo);
        KPIElementDetailsPo elementDetails = this.kpidao.getNodeKeyForMesaureName(outObj.getSubKpiName().trim(), employee.getOrgDetails().getOrgId());
        if (elementDetails == null) {
            Optional kpiElemnts = this.kpiService.findById(outObj.getKpiId());
            KPIElementDetailsPo result = this.kpidao.getNodeKeyForMesaureName(((KPI)kpiElemnts.get()).getKpiName().trim(), employee.getOrgDetails().getOrgId());
            if (Objects.nonNull(outObj.getSubKpiName())) {
                Long kpinode = this.nodekeygen.generateNodeKey();
                String subMeasureName = outObj.getSubKpiName();
                if (subMeasureName != null) {
                    KPIElementDetailsPo subKpiElementDetailsPo = new KPIElementDetailsPo();
                    subKpiElementDetailsPo.setElementType("ELEMENT");
                    subKpiElementDetailsPo.setMeasureName(subMeasureName);
                    subKpiElementDetailsPo.setActive(outObj.getActive());
                    subKpiElementDetailsPo.setNodeKey(kpinode.longValue());
                    subKpiElementDetailsPo.setMeasureKey(Long.valueOf(result.getNodeKey()));
                    subKpiElementDetailsPo.setMeasureType(1);
                    subKpiElementDetailsPo.setDeptId(Long.valueOf(employee.getDeptDetails().getId()));
                    subKpiElementDetailsPo.setOrgId(employee.getOrgDetails().getOrgId());
                    this.saveKPIElementDetails(subKpiElementDetailsPo);
                }
            }
        }
    }

    public KPIElementDetailsPo saveKPIElementDetails(KPIElementDetailsPo elementDetailsPo) {
        return this.kpidao.saveKpiElementDetail(elementDetailsPo);
    }

    private void createsubKPIId(SubKPI kpidto) {
        if (kpidto.getId() == 0L && kpidto.getObjectiveId() != 0L) {
            Objectives objectives = (Objectives)this.objectivesService.findById(kpidto.getObjectiveId()).get();
            ObjectivesDTO objectivesDTO = new ObjectivesDTO(objectives, false);
            String objPrefix = objectivesDTO.getObjectiveId();
            String maxId = this.kpidao.getMaxId(Long.valueOf(objectivesDTO.getId()), "subkpi");
            String kpiId = String.join((CharSequence)".", objPrefix, maxId);
            kpidto.setSubKpiIdSequence(Long.valueOf(maxId));
            kpidto.setSubKpiId(kpiId);
        }
    }

    public ScoreCardResponseDTO deleteKPIById(long subkpiId) {
        ScoreCardResponseDTO cardResponseDTO = new ScoreCardResponseDTO();
        Optional kpiOptional = this.findById(subkpiId);
        if (kpiOptional.isPresent()) {
            SubKPI kpi = (SubKPI)kpiOptional.get();
            kpi.setActive(1);
            this.kpidao.deleteKPIById(subkpiId);
            this.subKPIRepository.save(kpi);
            cardResponseDTO.setFlag(true);
            return cardResponseDTO;
        }
        cardResponseDTO.setFlag(false);
        return cardResponseDTO;
    }

    public String kpiDeptId(long kpiId) {
        String deptId = this.subKPIRepository.findDeptbyKPI(Long.valueOf(kpiId), 0);
        return deptId;
    }

    public List<SubKPIDTO> subkpiList(long objId) {
        List dbList = this.subKPIRepository.findByObjIdAndActive(Long.valueOf(objId), 0);
        return dbList.stream().map(dbValue -> new SubKPIDTO(dbValue)).collect(Collectors.toList());
    }

    public List<SubKPIDTO> retrieveSubKpiEntryDataList(long scoreCardId) {
        List dbList = this.subKPIRepository.findSubKPIByScorecardId(Long.valueOf(scoreCardId), 0);
        return dbList.stream().map(dbValue -> new SubKPIDTO(dbValue)).collect(Collectors.toList());
    }
}

