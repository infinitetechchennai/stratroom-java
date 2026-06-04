/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.RiskFormulationController
 *  com.estrat.web.dto.FormulationRiskActivitiesDTO
 *  com.estrat.web.dto.FormulationRiskDTO
 *  com.estrat.web.dto.FormulationSubRiskDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.RiskFormulationDTO
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.RiskFormulationService
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.RiskFormulationReaderUtil
 *  com.estrat.web.util.RiskFormulationUtil
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.MediaType
 *  org.springframework.http.ResponseEntity
 *  org.springframework.http.ResponseEntity$BodyBuilder
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.context.request.WebRequest
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.FormulationRiskActivitiesDTO;
import com.estrat.web.dto.FormulationRiskDTO;
import com.estrat.web.dto.FormulationSubRiskDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.RiskFormulationDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.RiskFormulationService;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.RiskFormulationReaderUtil;
import com.estrat.web.util.RiskFormulationUtil;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class RiskFormulationController {
    @Autowired
    private RiskFormulationService riskFormulationService;
    @Autowired
    private RiskFormulationReaderUtil riskFormulationReaderUtil;
    @Autowired
    private RiskFormulationUtil riskFormulationUtil;
    @Autowired
    private PageService pageService;
    @Autowired
    private AuditTrailService auditTrailService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/riskFormulation"})
    public ResponseEntity<RiskFormulationDTO> saveRiskFormulation(@RequestBody RiskFormulationDTO formulationDTO) {
        return new ResponseEntity(this.riskFormulationService.saveRiskFormulation(formulationDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/riskFormulation/{formulationId}"})
    public ResponseEntity<RiskFormulationDTO> getRiskFormulation(@PathVariable(value="formulationId") String formulationId, @RequestParam(value="loadFlag", required=false) String loadFlag) {
        boolean flag = StringUtils.isNotEmpty((CharSequence)loadFlag) ? Boolean.valueOf(loadFlag) : false;
        return new ResponseEntity(this.riskFormulationService.getRiskFormulation(Long.valueOf(formulationId).longValue(), flag), HttpStatus.OK);
    }

    @PostMapping(value={"/risk/riskFormulation"})
    public ResponseEntity<FormulationRiskDTO> saveFormulationRisk(@RequestBody FormulationRiskDTO formulationRiskDTO) {
        return new ResponseEntity(this.riskFormulationService.saveFormulationRisk(formulationRiskDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/subRisk/riskFormulation"})
    public ResponseEntity<FormulationSubRiskDTO> saveFormulationSubRisk(@RequestBody FormulationSubRiskDTO formulationSubRiskDTO) {
        return new ResponseEntity(this.riskFormulationService.saveFormulationSubRisk(formulationSubRiskDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/activity/riskFormulation"})
    public ResponseEntity<FormulationRiskActivitiesDTO> saveFormulationRiskActivity(@RequestBody FormulationRiskActivitiesDTO formulationRiskActivitiesDTO) {
        return new ResponseEntity(this.riskFormulationService.saveFormulationRiskActivities(formulationRiskActivitiesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subRisk/riskFormulation/{subRiskId}"})
    public ResponseEntity<FormulationSubRiskDTO> getFormulationSubRisk(@PathVariable(value="subRiskId") String subRiskId) {
        return new ResponseEntity(this.riskFormulationService.getFormulationSubRisk(Long.valueOf(subRiskId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/risk/riskFormulation/{riskId}"})
    public ResponseEntity<FormulationRiskDTO> getFormulationRisk(@PathVariable(value="riskId") String riskId) {
        return new ResponseEntity(this.riskFormulationService.getFormulationRisk(Long.valueOf(riskId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/activity/riskFormulation/{activityId}"})
    public ResponseEntity<FormulationRiskActivitiesDTO> getFormulationRiskActivity(@PathVariable(value="activityId") String activityId) {
        return new ResponseEntity(this.riskFormulationService.getFormulationRiskActivities(Long.valueOf(activityId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subRisk/riskFormulation/{subRiskId}"})
    public ResponseEntity<Boolean> deleteFormulationSubrisk(@PathVariable(value="subRiskId") String subRiskId) {
        return new ResponseEntity(this.riskFormulationService.deleteFormulationSubRisk(Long.valueOf(subRiskId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/risk/riskFormulation/{riskId}"})
    public ResponseEntity<Boolean> deleteFormulationRisk(@PathVariable(value="riskId") String riskId) {
        return new ResponseEntity(this.riskFormulationService.deleteFormulationRisk(Long.valueOf(riskId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/activity/riskFormulation/{activityId}"})
    public ResponseEntity<Boolean> deleteFormulationRiskActivity(@PathVariable(value="activityId") String activityId) {
        return new ResponseEntity(this.riskFormulationService.deleteFormulationRiskActivity(Long.valueOf(activityId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/formulationRiskList"})
    public ResponseEntity<List<FormulationRiskDTO>> formulationRiskList(@RequestParam(value="formulationId") String formulationId, @RequestParam(value="department", required=false) String department) {
        return new ResponseEntity(this.riskFormulationService.getRiskList(Long.valueOf(formulationId).longValue(), department), HttpStatus.OK);
    }

    @PostMapping(value={"/status/riskFormulation"})
    public ResponseEntity<Boolean> approveRiskFormulation(@RequestBody RiskFormulationDTO formulationDTO) {
        return new ResponseEntity(this.riskFormulationService.updateFormulationStatus(formulationDTO), HttpStatus.OK);
    }

    @RequestMapping(value={"/import/riskFormulation"}, method={RequestMethod.POST})
    public ResponseEntity<Map> riskFormulation(WebRequest webRequest, @RequestParam(value="riskFormulationData", required=true) MultipartFile formulation, @RequestParam(value="type", required=false) String type) {
        String message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.riskFormulationReaderUtil.importRiskFormulation(formulation.getInputStream(), type);
        }
        catch (Exception e) {
            mapValue.put("message", message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        if (Objects.nonNull(type) && type.equals("save")) {
            this.auditTrailService.save("Excel - Risk Formulation Upload");
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @GetMapping(value={"/download/riskFormulationDetails"})
    public ResponseEntity<byte[]> downloadFormulationDetails(@RequestParam(value="formulationId") String formulationId) {
        PageDTO pageDTO = (PageDTO) (PageDTO)this.pageService.getPageDetails(Long.valueOf(formulationId).longValue()).getBody();
        return ((ResponseEntity.BodyBuilder)ResponseEntity.ok().header("Content-Disposition", new String[]{"attachment; filename=" + pageDTO.getPageName() + ".xls"})).contentType(MediaType.parseMediaType((String)"application/vnd.ms-excel")).body(this.riskFormulationUtil.getFormulationByteData(formulationId, pageDTO));
    }
}

