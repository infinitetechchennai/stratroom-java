/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.StrategyMapController
 *  com.estrat.web.dto.ScoreCardDTO
 *  com.estrat.web.dto.StrategyMapDto
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.StrategyMapService
 *  com.estrat.web.util.RequestSessionUtil
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.ScoreCardDTO;
import com.estrat.web.dto.StrategyMapDto;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.StrategyMapService;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StrategyMapController {
    @Autowired
    protected StrategyMapService strategyMapService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/saveStrategy"})
    public ResponseEntity<StrategyMapDto> saveSwotAnalysisDetails(@RequestBody StrategyMapDto strategyMapDto, HttpServletRequest request) throws RequestException {
        System.out.println("Save Strategy    " + strategyMapDto.getScorecardPageId());
        strategyMapDto.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.strategyMapService.saveStrategyMap(strategyMapDto), HttpStatus.OK);
    }

    @GetMapping(value={"/Strategy/{pageid}"})
    public ResponseEntity<List<ScoreCardDTO>> findScoreCardList(@PathVariable(value="pageid") long pageid, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity(this.strategyMapService.findAllScoreCardList(Long.valueOf(pageid), dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/strategyMap/{id}"})
    public ResponseEntity<StrategyMapDto> findStrategyMap(@PathVariable(value="id") long id, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity(this.strategyMapService.findStrategy(Long.valueOf(id)), HttpStatus.OK);
    }
}

