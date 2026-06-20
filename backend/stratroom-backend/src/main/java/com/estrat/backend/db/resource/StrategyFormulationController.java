/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.FormulationKPIDTO
 *  com.estrat.backend.db.dto.FormulationObjectiveDTO
 *  com.estrat.backend.db.dto.FormulationScoreCardDTO
 *  com.estrat.backend.db.dto.FormulationSubKPIDTO
 *  com.estrat.backend.db.dto.StrategyFormulationDTO
 *  com.estrat.backend.db.resource.StrategyFormulationController
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.StrategyFormulationService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.db.resource;

import com.estrat.backend.db.dto.FormulationKPIDTO;
import com.estrat.backend.db.dto.FormulationObjectiveDTO;
import com.estrat.backend.db.dto.FormulationScoreCardDTO;
import com.estrat.backend.db.dto.FormulationSubKPIDTO;
import com.estrat.backend.db.dto.StrategyFormulationDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.StrategyFormulationService;
import java.util.Set;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StrategyFormulationController {
    @Autowired
    private StrategyFormulationService strategyFormulationService;
    @Autowired
    private AuditDetailsService auditService;

    @PostMapping(value={"/strategyFormulation"})
    public ResponseEntity<StrategyFormulationDTO> saveStrategyFormulation(@RequestBody StrategyFormulationDTO strategyFormulationDTO) {
        Boolean updated = false;
        if (strategyFormulationDTO.getId() > 0L) {
            updated = true;
        }
        StrategyFormulationDTO response = this.strategyFormulationService.saveStrategyFormulation(strategyFormulationDTO);
        if (updated.booleanValue()) {
            this.auditService.updateAudit("Strategy Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation Modified");
        } else {
            this.auditService.saveAudit("Strategy Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation Created");
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @PostMapping(value={"/objectives/strategyFormulation"})
    public ResponseEntity<FormulationObjectiveDTO> saveStrategyFormulationObjectives(@RequestBody FormulationObjectiveDTO formulationObjectiveDTO) {
        Boolean updated = false;
        if (formulationObjectiveDTO.getId() > 0L) {
            updated = true;
        }
        FormulationObjectiveDTO response = this.strategyFormulationService.saveFormulationObjectives(formulationObjectiveDTO);
        if (updated.booleanValue()) {
            this.auditService.updateAudit("Strategy Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation Objective Modified");
        } else {
            this.auditService.saveAudit("Strategy Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation Objective Created");
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @PostMapping(value={"/scorecard/strategyFormulation"})
    public ResponseEntity<FormulationScoreCardDTO> saveStrategyFormulationScoreCard(@RequestBody FormulationScoreCardDTO formulationScoreCardDTO) {
        Boolean updated = false;
        if (formulationScoreCardDTO.getId() > 0L) {
            updated = true;
        }
        FormulationScoreCardDTO response = this.strategyFormulationService.saveFormulationScorecard(formulationScoreCardDTO);
        if (updated.booleanValue()) {
            this.auditService.updateAudit("Strategy Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation Scorecard Modified");
        } else {
            this.auditService.saveAudit("Strategy Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation Scorecard Created");
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @PostMapping(value={"/kpi/strategyFormulation"})
    public ResponseEntity<FormulationKPIDTO> saveStrategyFormulationKPI(@RequestBody FormulationKPIDTO formulationKPIDTO) {
        Boolean updated = false;
        if (formulationKPIDTO.getId() > 0L) {
            updated = true;
        }
        FormulationKPIDTO response = this.strategyFormulationService.saveFormulationKPI(formulationKPIDTO);
        if (updated.booleanValue()) {
            this.auditService.updateAudit("Strategy Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation KPI Modified");
        } else {
            this.auditService.saveAudit("Strategy Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation KPI Created");
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @PostMapping(value={"/subkpi/strategyFormulation"})
    public ResponseEntity<FormulationSubKPIDTO> saveStrategyFormulationSubKPI(@RequestBody FormulationSubKPIDTO formulationSubKPIDTO) {
        Boolean updated = false;
        if (formulationSubKPIDTO.getId() > 0L) {
            updated = true;
        }
        FormulationSubKPIDTO response = this.strategyFormulationService.saveFormulationSubKPI(formulationSubKPIDTO);
        if (updated.booleanValue()) {
            this.auditService.updateAudit("Strategy Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation SubKPI Modified");
        } else {
            this.auditService.saveAudit("Strategy Formulation", response.getId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation SubKPI Created");
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/strategyFormulation/{id}"})
    public ResponseEntity<StrategyFormulationDTO> getFormulationDetails(@PathVariable(value="id") Long id) {
        return new ResponseEntity((Object)this.strategyFormulationService.getFormulationDetails(id.longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/strategyFormulation/{id}"})
    public ResponseEntity<Boolean> deleteFormulationDetails(@PathVariable(value="id") Long id) {
        this.auditService.saveAudit("Strategy Formulation", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation Deleted");
        return new ResponseEntity((Object)this.strategyFormulationService.deleteFormulationDetails(id.longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/objectives/strategyFormulation/{id}"})
    public ResponseEntity<Boolean> deleteFormulationObjectives(@PathVariable(value="id") Long id) {
        this.auditService.saveAudit("Strategy Formulation", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation Objective Deleted");
        return new ResponseEntity((Object)this.strategyFormulationService.deleteFormulationObjectives(id.longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/scorecard/strategyFormulation/{id}"})
    public ResponseEntity<Boolean> deleteFormulationScorecard(@PathVariable(value="id") Long id) {
        this.auditService.saveAudit("Strategy Formulation", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation Scorecard Deleted");
        return new ResponseEntity((Object)this.strategyFormulationService.deleteFormulationScorecard(id.longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/kpi/strategyFormulation/{id}"})
    public ResponseEntity<Boolean> deleteFormulationKPI(@PathVariable(value="id") Long id) {
        this.auditService.saveAudit("Strategy Formulation", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation KPI Deleted");
        return new ResponseEntity((Object)this.strategyFormulationService.deleteFormulationKPI(id.longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subkpi/strategyFormulation/{id}"})
    public ResponseEntity<Boolean> deleteFormulationSubKPI(@PathVariable(value="id") Long id) {
        this.auditService.saveAudit("Strategy Formulation", id.longValue(), Long.valueOf(UserThreadLocal.get()).longValue(), "Strategic Formulation SubKPI Deleted");
        return new ResponseEntity((Object)this.strategyFormulationService.deleteFormulationSubKPI(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/scorecard/strategyFormulation/{id}"})
    public ResponseEntity<FormulationScoreCardDTO> getFormulationScoreCard(@PathVariable(value="id") Long id) {
        return new ResponseEntity((Object)this.strategyFormulationService.getFormulationScoreCard(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/objectives/strategyFormulation/{id}"})
    public ResponseEntity<FormulationObjectiveDTO> getFormulationObjectives(@PathVariable(value="id") Long id) {
        return new ResponseEntity((Object)this.strategyFormulationService.getFormulationObjectives(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/kpi/strategyFormulation/{id}"})
    public ResponseEntity<FormulationKPIDTO> getFormulationKPI(@PathVariable(value="id") Long id) {
        return new ResponseEntity((Object)this.strategyFormulationService.getFormulationKPI(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/subkpi/strategyFormulation/{id}"})
    public ResponseEntity<FormulationSubKPIDTO> getFormulationSubKPI(@PathVariable(value="id") Long id) {
        return new ResponseEntity((Object)this.strategyFormulationService.getFormulationSubKPI(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/strategyFormulationList"})
    public ResponseEntity<Set<StrategyFormulationDTO>> strategyFormulationList(@RequestParam(name="status", required=false) String status, @RequestParam(name="pageId", required=false) String pageId) {
        if (StringUtils.isNotEmpty((CharSequence)pageId)) {
            return new ResponseEntity((Object)this.strategyFormulationService.getFormulationListWithPageId(status, pageId), HttpStatus.OK);
        }
        return new ResponseEntity((Object)this.strategyFormulationService.getFormulationList(status), HttpStatus.OK);
    }

    @GetMapping(value={"/formulation/applyFormulation"})
    public ResponseEntity<StrategyFormulationDTO> applyFormulation(@RequestParam(value="formulationId") String status) {
        return new ResponseEntity((Object)this.strategyFormulationService.applyFormulation(status), HttpStatus.OK);
    }

    @PostMapping(value={"/perspective/strategyFormulation"})
    public ResponseEntity<FormulationScoreCardDTO> savePerspective(@RequestBody FormulationScoreCardDTO formulationScoreCardDTO) {
        Boolean updated = false;
        if (formulationScoreCardDTO.getId() > 0L) {
            updated = true;
        }
        FormulationScoreCardDTO response = this.strategyFormulationService.savePersepctiveFormulationScorecard(formulationScoreCardDTO);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }
}

