/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ObjectivesDTO
 *  com.estrat.backend.scorecard.service.ObjectiveService
 *  com.estrat.backend.scorecard.web.controller.scorecard.ObjectivesController
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.scorecard.web.controller.scorecard;

import com.estrat.backend.scorecard.dto.ObjectivesDTO;
import com.estrat.backend.scorecard.service.ObjectiveService;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ObjectivesController {
    @Autowired
    private ObjectiveService objectiveService;

    @GetMapping(value={"/objectives/{id}"})
    public ResponseEntity<ObjectivesDTO> getDetailsById(@PathVariable long id) {
        return this.objectiveService.getObjectiveDetails(id);
    }

    @PostMapping(value={"/objectives"})
    public ResponseEntity<ObjectivesDTO> saveOrUpdateDetails(@RequestBody ObjectivesDTO objectives) {
        objectives.setCreatedTime(LocalDateTime.now());
        return this.objectiveService.saveOrUpdateDetails(objectives);
    }

    @DeleteMapping(value={"/objectives/{id}"})
    public ResponseEntity<Boolean> deleteDetails(@PathVariable long id) {
        return this.objectiveService.deleteObjectiveDetails(id);
    }

    @PutMapping(value={"/objectives"})
    public ResponseEntity<ObjectivesDTO> updateDetails(@RequestBody ObjectivesDTO objectives) {
        objectives.setUpdatedTime(LocalDateTime.now());
        return this.objectiveService.saveOrUpdateDetails(objectives);
    }

    @GetMapping(value={"/objectivesList/{scoreCardId}"})
    public ResponseEntity<List<ObjectivesDTO>> objectivesList(@PathVariable(value="scoreCardId") long id, @RequestParam(value="loadFlag", required=false) String loadFlag) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        return this.objectiveService.getObjectiveList(id, flag);
    }

    @GetMapping(value={"/objectivesListByDate/{scoreCardId}"})
    public ResponseEntity<List<ObjectivesDTO>> objectivesListByDate(@PathVariable(value="scoreCardId") long scoreCardId, @RequestParam(value="loadFlag", required=false) String loadFlag, @RequestParam(value="dateRange", required=false) String dateRange) {
        boolean flag = loadFlag != null ? Boolean.valueOf(loadFlag) : true;
        return this.objectiveService.objectivesListByDate(scoreCardId, flag, dateRange);
    }
}

