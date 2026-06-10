/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeeGoals
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.EmployeeGoalsRepository
 *  com.estrat.backend.db.dto.EmployeeGoalsDTO
 *  com.estrat.backend.db.dto.EmployeeGoalsResponseDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.EmployeeGoalsService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.EmployeeGoals;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.EmployeeGoalsRepository;
import com.estrat.backend.db.dto.EmployeeGoalsDTO;
import com.estrat.backend.db.dto.EmployeeGoalsResponseDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeGoalsService {
    private Logger log = LoggerFactory.getLogger(EmployeeGoalsService.class);
    @Autowired
    protected EmployeeGoalsRepository employeeGoalsRepository;
    @Autowired
    private DBCache dbCache;

    public Optional<EmployeeGoals> findById(long id) {
        return this.employeeGoalsRepository.findById(id);
    }

    public EmployeeGoalsResponseDTO save(EmployeeGoals employeeGoals) {
        EmployeeGoals employeeGoalsResponse = this.employeeGoalsRepository.save(employeeGoals);
        EmployeeGoalsDTO responseDTO = new EmployeeGoalsDTO(employeeGoalsResponse);
        EmployeeGoalsResponseDTO employeeGoalsResponseDTO = new EmployeeGoalsResponseDTO();
        employeeGoalsResponseDTO.setEmployeeGoalsDTO(responseDTO);
        employeeGoalsResponseDTO.setFlag(false);
        this.dbCache.remove("retrieveEmployeeGoalsByEmpId" + UserThreadLocal.get(), "dbCache");
        return employeeGoalsResponseDTO;
    }

    public void delete(EmployeeGoals EmployeeGoals2) {
        this.employeeGoalsRepository.delete(EmployeeGoals2);
    }

    public List<EmployeeGoalsDTO> findAll(long empId) {
        List<EmployeeGoals> dbList = this.employeeGoalsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<EmployeeGoalsDTO> commentList = dbList.stream().map(dbValue -> {
            EmployeeGoalsDTO EmployeeGoalsDTO2 = new EmployeeGoalsDTO(dbValue);
            return EmployeeGoalsDTO2;
        }).collect(Collectors.toList());
        return commentList;
    }
}

