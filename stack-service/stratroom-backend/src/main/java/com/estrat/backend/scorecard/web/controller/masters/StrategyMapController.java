/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ScoreCardDTO
 *  com.estrat.backend.scorecard.dto.StrategyMapDto
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.StrategyMapService
 *  com.estrat.backend.scorecard.web.controller.masters.StrategyMapController
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
package com.estrat.backend.scorecard.web.controller.masters;

import com.estrat.backend.scorecard.dto.ScoreCardDTO;
import com.estrat.backend.scorecard.dto.StrategyMapDto;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.StrategyMapService;
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

    @PostMapping(value={"/saveStrategy"})
    public ResponseEntity<StrategyMapDto> saveStrategyMap(@RequestBody StrategyMapDto strategyMapDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.strategyMapService.saveStrategyMap(strategyMapDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/Strategy/{pageid}"})
    public ResponseEntity<List<ScoreCardDTO>> findAllScoreCardList(@PathVariable(value="pageid") long pageid, @RequestParam(value="dateRange", required=false) String dateRange) {
        return new ResponseEntity((Object)this.strategyMapService.findAllScoreCardList(Long.valueOf(pageid), dateRange), HttpStatus.OK);
    }

    @GetMapping(value={"/strategyMap/{id}"})
    public ResponseEntity<StrategyMapDto> findStrategyMap(@PathVariable(value="id") long id, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        return new ResponseEntity((Object)this.strategyMapService.getStrategyMap(Long.valueOf(id)), HttpStatus.OK);
    }
}

