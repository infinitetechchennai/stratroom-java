/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.InitiativeTask
 *  com.estrat.service.db.dao.InitiativeTaskRepository
 *  com.estrat.service.db.dto.InitiativeTaskDto
 *  com.estrat.service.db.service.InitiativeTaskService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.InitiativeTask;
import com.estrat.service.db.dao.InitiativeTaskRepository;
import com.estrat.service.db.dto.InitiativeTaskDto;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InitiativeTaskService {
    @Autowired
    protected InitiativeTaskRepository initiativeTaskRepository;
    private Logger log = Logger.getLogger(InitiativeTaskService.class);

    public Optional<InitiativeTask> findById(long id) {
        return this.initiativeTaskRepository.findById(id);
    }

    public InitiativeTaskDto save(InitiativeTask initiativeTask) {
        InitiativeTask taskResponse = (InitiativeTask)this.initiativeTaskRepository.save(initiativeTask);
        InitiativeTaskDto response = new InitiativeTaskDto(taskResponse);
        return response;
    }

    public InitiativeTaskDto delete(InitiativeTask initiativeTask) {
        this.initiativeTaskRepository.delete((Object)initiativeTask);
        return new InitiativeTaskDto(initiativeTask);
    }

    public List<InitiativeTaskDto> findAllByInitiativesId(Long initiativesId) {
        List dbList = this.initiativeTaskRepository.findAllByInitiativesId(initiativesId);
        return dbList.stream().map(dbValue -> new InitiativeTaskDto(dbValue)).collect(Collectors.toList());
    }

    public List<InitiativeTaskDto> findAllByEmpId(Long empId) {
        List dbList = this.initiativeTaskRepository.findAllByEmpId(empId, 0);
        return dbList.stream().map(dbValue -> new InitiativeTaskDto(dbValue)).collect(Collectors.toList());
    }
}

