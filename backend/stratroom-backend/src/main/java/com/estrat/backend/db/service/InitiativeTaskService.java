/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.InitiativeTask
 *  com.estrat.backend.db.dao.InitiativeTaskRepository
 *  com.estrat.backend.db.dto.InitiativeTaskDto
 *  com.estrat.backend.db.service.InitiativeTaskService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.InitiativeTask;
import com.estrat.backend.db.dao.InitiativeTaskRepository;
import com.estrat.backend.db.dto.InitiativeTaskDto;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InitiativeTaskService {
    @Autowired
    protected InitiativeTaskRepository initiativeTaskRepository;
    private Logger log = LoggerFactory.getLogger(InitiativeTaskService.class);

    public Optional<InitiativeTask> findById(long id) {
        return this.initiativeTaskRepository.findById(id);
    }

    public InitiativeTaskDto save(InitiativeTask initiativeTask) {
        InitiativeTask taskResponse = (InitiativeTask)this.initiativeTaskRepository.save(initiativeTask);
        InitiativeTaskDto response = new InitiativeTaskDto(taskResponse);
        return response;
    }

    public InitiativeTaskDto delete(InitiativeTask initiativeTask) {
        this.initiativeTaskRepository.delete(initiativeTask);
        return new InitiativeTaskDto(initiativeTask);
    }

    public List<InitiativeTaskDto> findAllByInitiativesId(Long initiativesId) {
        List<InitiativeTask> dbList = this.initiativeTaskRepository.findAllByInitiativesId(initiativesId);
        return dbList.stream().map(dbValue -> new InitiativeTaskDto(dbValue)).collect(Collectors.toList());
    }

    public List<InitiativeTaskDto> findAllByEmpId(Long empId) {
        List<InitiativeTask> dbList = this.initiativeTaskRepository.findAllByEmpId(empId, 0);
        return dbList.stream().map(dbValue -> new InitiativeTaskDto(dbValue)).collect(Collectors.toList());
    }
}

