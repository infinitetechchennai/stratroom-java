/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.SubActivitiesDetails
 *  com.estrat.service.db.dao.SubActivitiesRepository
 *  com.estrat.service.db.dto.SubActivitiesDTO
 *  com.estrat.service.db.service.SubActivitiesService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.SubActivitiesDetails;
import com.estrat.service.db.dao.SubActivitiesRepository;
import com.estrat.service.db.dto.SubActivitiesDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubActivitiesService {
    @Autowired
    protected SubActivitiesRepository subActivitiesRepository;

    public Optional<SubActivitiesDetails> findById(long id) {
        return this.subActivitiesRepository.findById(id);
    }

    public SubActivitiesDTO save(SubActivitiesDetails activities) {
        SubActivitiesDetails activitiesAndTasks1 = (SubActivitiesDetails)this.subActivitiesRepository.save(activities);
        return new SubActivitiesDTO(activitiesAndTasks1);
    }

    public SubActivitiesDTO saveDelete(SubActivitiesDetails activitiesAndTasks) {
        this.subActivitiesRepository.delete((Object)activitiesAndTasks);
        return new SubActivitiesDTO(activitiesAndTasks);
    }

    public SubActivitiesDTO findByActivitiesId(long id) {
        SubActivitiesDTO activitiesAndTasksDTO = new SubActivitiesDTO((SubActivitiesDetails)this.subActivitiesRepository.getOne(id));
        return activitiesAndTasksDTO;
    }

    public List<SubActivitiesDTO> findAllByActivityId(Long activityId) {
        List dbList = this.subActivitiesRepository.findAllByActivityId(activityId);
        return dbList.stream().map(dbValue -> new SubActivitiesDTO(dbValue)).collect(Collectors.toList());
    }

    public List<SubActivitiesDTO> findByEmpId(Long empId) {
        List dbList = this.subActivitiesRepository.findByEmpId(empId, 0);
        return dbList.stream().map(dbValue -> new SubActivitiesDTO(dbValue)).collect(Collectors.toList());
    }
}

