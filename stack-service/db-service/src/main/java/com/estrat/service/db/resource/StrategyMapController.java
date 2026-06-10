/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.StrategyMap
 *  com.estrat.service.db.dto.StrategyMapDto
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.StrategyMapController
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.ScoreCardService
 *  com.estrat.service.db.service.StrategyMapService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.StrategyMap;
import com.estrat.service.db.dto.StrategyMapDto;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.EmployeeService;
import com.estrat.service.db.service.ScoreCardService;
import com.estrat.service.db.service.StrategyMapService;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StrategyMapController {
    @Autowired
    protected StrategyMapService strategyMapService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected ScoreCardService scorecardService;

    @PostMapping(value={"/saveStrategy"})
    public ResponseEntity<StrategyMapDto> saveStrategyMap(@RequestBody StrategyMapDto strategymapDto) {
        StrategyMap strategyMap = new StrategyMap(strategymapDto);
        strategyMap.setCreateAt(LocalDateTime.now());
        StrategyMapDto saveStrategyDto = this.strategyMapService.save(strategyMap);
        return new ResponseEntity((Object)saveStrategyDto, HttpStatus.OK);
    }

    @GetMapping(value={"/strategyMap/{id}"})
    public ResponseEntity<StrategyMapDto> getstrategyMap(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.strategyMapService.findById(id), HttpStatus.OK);
    }
}

