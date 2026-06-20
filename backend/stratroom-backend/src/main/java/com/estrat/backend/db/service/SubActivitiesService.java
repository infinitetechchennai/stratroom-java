/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.SubActivitiesDetails
 *  com.estrat.backend.db.dao.SubActivitiesRepository
 *  com.estrat.backend.db.dto.SubActivitiesDTO
 *  com.estrat.backend.db.service.SubActivitiesService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.SubActivitiesDetails;
import com.estrat.backend.db.dao.SubActivitiesRepository;
import com.estrat.backend.db.dto.SubActivitiesDTO;
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
        this.subActivitiesRepository.delete(activitiesAndTasks);
        return new SubActivitiesDTO(activitiesAndTasks);
    }

    public SubActivitiesDTO findByActivitiesId(long id) {
        SubActivitiesDTO activitiesAndTasksDTO = new SubActivitiesDTO((SubActivitiesDetails)this.subActivitiesRepository.getOne(id));
        return activitiesAndTasksDTO;
    }

    public List<SubActivitiesDTO> findAllByActivityId(Long activityId) {
        List<SubActivitiesDetails> dbList = this.subActivitiesRepository.findAllByActivityId(activityId);
        return dbList.stream().map(dbValue -> new SubActivitiesDTO(dbValue)).collect(Collectors.toList());
    }

    public List<SubActivitiesDTO> findByEmpId(Long empId) {
        List<SubActivitiesDetails> dbList = this.subActivitiesRepository.findByEmpId(empId, 0);
        return dbList.stream().map(dbValue -> new SubActivitiesDTO(dbValue)).collect(Collectors.toList());
    }
}

