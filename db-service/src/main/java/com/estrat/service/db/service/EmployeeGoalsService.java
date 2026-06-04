/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeGoals
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.EmployeeGoalsRepository
 *  com.estrat.service.db.dto.EmployeeGoalsDTO
 *  com.estrat.service.db.dto.EmployeeGoalsResponseDTO
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.EmployeeGoalsService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.EmployeeGoals;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.EmployeeGoalsRepository;
import com.estrat.service.db.dto.EmployeeGoalsDTO;
import com.estrat.service.db.dto.EmployeeGoalsResponseDTO;
import com.estrat.service.db.resource.util.UserThreadLocal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeGoalsService {
    private Logger log = Logger.getLogger(EmployeeGoalsService.class);
    @Autowired
    protected EmployeeGoalsRepository employeeGoalsRepository;
    @Autowired
    private DBCache dbCache;

    public Optional<EmployeeGoals> findById(long id) {
        return this.employeeGoalsRepository.findById(id);
    }

    public EmployeeGoalsResponseDTO save(EmployeeGoals employeeGoals) {
        EmployeeGoals employeeGoalsResponse = (EmployeeGoals)this.employeeGoalsRepository.save(employeeGoals);
        EmployeeGoalsDTO responseDTO = new EmployeeGoalsDTO(employeeGoalsResponse);
        EmployeeGoalsResponseDTO employeeGoalsResponseDTO = new EmployeeGoalsResponseDTO();
        employeeGoalsResponseDTO.setEmployeeGoalsDTO(responseDTO);
        employeeGoalsResponseDTO.setFlag(false);
        this.dbCache.remove((Object)("retrieveEmployeeGoalsByEmpId" + UserThreadLocal.get()), "dbCache");
        return employeeGoalsResponseDTO;
    }

    public void delete(EmployeeGoals EmployeeGoals2) {
        this.employeeGoalsRepository.delete((Object)EmployeeGoals2);
    }

    public List<EmployeeGoalsDTO> findAll(long empId) {
        List dbList = this.employeeGoalsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<EmployeeGoalsDTO> commentList = dbList.stream().map(dbValue -> {
            EmployeeGoalsDTO EmployeeGoalsDTO2 = new EmployeeGoalsDTO(dbValue);
            return EmployeeGoalsDTO2;
        }).collect(Collectors.toList());
        return commentList;
    }
}

