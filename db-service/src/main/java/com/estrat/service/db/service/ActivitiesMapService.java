/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ActivitiesDetails
 *  com.estrat.service.db.bean.po.ActivitiesMap
 *  com.estrat.service.db.dao.ActivitiesMapRepository
 *  com.estrat.service.db.dto.ActivitiesMapDTO
 *  com.estrat.service.db.service.ActivitiesMapService
 *  com.estrat.service.db.service.EmployeeService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ActivitiesDetails;
import com.estrat.service.db.bean.po.ActivitiesMap;
import com.estrat.service.db.dao.ActivitiesMapRepository;
import com.estrat.service.db.dto.ActivitiesMapDTO;
import com.estrat.service.db.service.EmployeeService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivitiesMapService {
    @Autowired
    protected ActivitiesMapRepository activitiesMapRepository;
    @Autowired
    protected EmployeeService employeeService;
    private Logger log = Logger.getLogger(ActivitiesMapService.class);

    public Optional<ActivitiesMap> findById(long id) {
        return this.activitiesMapRepository.findById(id);
    }

    public ActivitiesMapDTO save(ActivitiesMapDTO activitiesMapDTO) {
        ActivitiesDetails activitiesDetails = new ActivitiesDetails();
        activitiesDetails.setId(activitiesMapDTO.getActivitiesId());
        ActivitiesMap activitiesMap = (ActivitiesMap)this.activitiesMapRepository.save(new ActivitiesMap(activitiesDetails, activitiesMapDTO.getEmpId()));
        ActivitiesMapDTO activitiesMapDTO2 = new ActivitiesMapDTO(activitiesMap);
        return activitiesMapDTO2;
    }

    public List<ActivitiesMapDTO> findAllByActivitiesId(Long activitiesId) {
        List dbList = this.activitiesMapRepository.findAllByActivitiesId(activitiesId);
        return dbList.stream().map(dbValue -> new ActivitiesMapDTO(dbValue)).collect(Collectors.toList());
    }

    public void saveDeleteMultipleOwner(Long activitiesId) {
        List activitiesMaps = this.activitiesMapRepository.findAllByActivitiesId(activitiesId);
        if (activitiesMaps != null) {
            for (ActivitiesMap map : activitiesMaps) {
                this.activitiesMapRepository.save(map);
            }
        }
    }
}

