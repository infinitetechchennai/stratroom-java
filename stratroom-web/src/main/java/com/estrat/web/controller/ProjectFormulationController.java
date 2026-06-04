/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ProjectFormulationController
 *  com.estrat.web.dto.FormulationInitiativesDTO
 *  com.estrat.web.dto.FormulationSubInitiativesDTO
 *  com.estrat.web.dto.PageDTO
 *  com.estrat.web.dto.ProjectFormulationDTO
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.PageService
 *  com.estrat.web.service.ProjectFormulationService
 *  com.estrat.web.util.ProjectFormulationReaderUtil
 *  com.estrat.web.util.ProjectFormulationUtil
 *  com.estrat.web.util.RequestSessionUtil
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

import com.estrat.web.dto.FormulationInitiativesDTO;
import com.estrat.web.dto.FormulationSubInitiativesDTO;
import com.estrat.web.dto.PageDTO;
import com.estrat.web.dto.ProjectFormulationDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.PageService;
import com.estrat.web.service.ProjectFormulationService;
import com.estrat.web.util.ProjectFormulationReaderUtil;
import com.estrat.web.util.ProjectFormulationUtil;
import com.estrat.web.util.RequestSessionUtil;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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
@SuppressWarnings({"unchecked", "rawtypes"})
public class ProjectFormulationController {
    @Autowired
    private ProjectFormulationService projectFormulationService;
    @Autowired
    private ProjectFormulationUtil projectFormulationUtil;
    @Autowired
    private ProjectFormulationReaderUtil projectFormulationReaderUtil;
    @Autowired
    private PageService pageService;
    @Autowired
    private AuditTrailService auditTrailService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/projectFormulation"})
    public ResponseEntity<ProjectFormulationDTO> saveProjectFormulation(@RequestBody ProjectFormulationDTO formulationDTO) {
        return new ResponseEntity(this.projectFormulationService.saveProjectFormulation(formulationDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/projectFormulation/{formulationId}"})
    public ResponseEntity<ProjectFormulationDTO> getProjectFormulation(@PathVariable(value="formulationId") String formulationId, @RequestParam(value="loadFlag", required=false) String loadFlag) {
        return new ResponseEntity(this.projectFormulationService.getProjectFormulation(Long.valueOf(formulationId).longValue(), loadFlag), HttpStatus.OK);
    }

    @PostMapping(value={"/initiatives/projectFormulation"})
    public ResponseEntity<FormulationInitiativesDTO> saveProjectFormulationInitiatives(@RequestBody FormulationInitiativesDTO formulationInitiativesDTO) {
        return new ResponseEntity(this.projectFormulationService.saveFormulationInitiatives(formulationInitiativesDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/subinitiatives/projectFormulation"})
    public ResponseEntity<FormulationSubInitiativesDTO> saveProjectFormulationSubInitiatives(@RequestBody FormulationSubInitiativesDTO formulationSubInitiativesDTO) {
        return new ResponseEntity(this.projectFormulationService.saveFormulationSubInitiatives(formulationSubInitiativesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/subinitiatives/projectFormulation/{subInitiaitveId}"})
    public ResponseEntity<FormulationSubInitiativesDTO> viewProjectFormulationSubInitiatives(@PathVariable(value="subInitiaitveId") String subInitiaitveId) {
        return new ResponseEntity(this.projectFormulationService.getFormulationSubInitiatives(Long.valueOf(subInitiaitveId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/initiatives/projectFormulation/{initiativeId}"})
    public ResponseEntity<FormulationInitiativesDTO> viewProjectFormulationInitiatives(@PathVariable(value="initiativeId") String initiativeId) {
        return new ResponseEntity(this.projectFormulationService.getFormulationInitiatives(Long.valueOf(initiativeId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/subinitiatives/projectFormulation/{subInitiaitveId}"})
    public ResponseEntity<Boolean> deleteProjectFormulationSubInitiatives(@PathVariable(value="subInitiaitveId") String subInitiaitveId) {
        return new ResponseEntity(this.projectFormulationService.deleteFormulationSubInitiatives(Long.valueOf(subInitiaitveId).longValue()), HttpStatus.OK);
    }

    @DeleteMapping(value={"/initiatives/projectFormulation/{initiativeId}"})
    public ResponseEntity<Boolean> deleteProjectFormulationInitiatives(@PathVariable(value="initiativeId") String initiativeId) {
        return new ResponseEntity(this.projectFormulationService.deleteFormulationInitiatives(Long.valueOf(initiativeId).longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/formulationInitiativesList"})
    public ResponseEntity<List<FormulationInitiativesDTO>> formulationInitiativesList(@RequestParam(value="formulationId") String formulationId, @RequestParam(value="department", required=false) String department) {
        return new ResponseEntity(this.projectFormulationService.getInitiaitivesList(Long.valueOf(formulationId).longValue(), department), HttpStatus.OK);
    }

    @PostMapping(value={"/status/projectFormulation"})
    public ResponseEntity<Boolean> approveProjectFormulation(@RequestBody ProjectFormulationDTO formulationDTO) {
        return new ResponseEntity(this.projectFormulationService.updateFormulationStatus(formulationDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/download/formulationDetails"})
    public ResponseEntity<byte[]> downloadFormulationDetails(@RequestParam(value="formulationId") String formulationId) {
        PageDTO pageDTO = (PageDTO) (PageDTO)this.pageService.getPageDetails(Long.valueOf(formulationId).longValue()).getBody();
        ProjectFormulationDTO responseDTO = this.projectFormulationService.getProjectFormulation(Long.valueOf(formulationId).longValue(), String.valueOf(true));
        if (responseDTO != null) {
            return ((ResponseEntity.BodyBuilder)ResponseEntity.ok().header("Content-Disposition", new String[]{"attachment; filename=" + pageDTO.getPageName() + ".xls"})).contentType(MediaType.parseMediaType((String)"application/vnd.ms-excel")).body(this.projectFormulationUtil.getFormulationByteData(formulationId, pageDTO));
        }
        return ((ResponseEntity.BodyBuilder)ResponseEntity.ok().header("Content-Disposition", new String[]{"attachment; filename=" + pageDTO.getPageName() + ".xls"})).contentType(MediaType.parseMediaType((String)"application/vnd.ms-excel")).body(new byte[1]);
    }

    @RequestMapping(value={"/import/projectFormulation"}, method={RequestMethod.POST})
    public ResponseEntity<Map> importProjectFormulation(WebRequest webRequest, @RequestParam(value="projectFormulationData", required=true) MultipartFile formulation, @RequestParam(value="type", required=false) String type) {
        String message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.projectFormulationReaderUtil.importProjectmulation(formulation.getInputStream(), type);
        }
        catch (Exception e) {
            mapValue.put("message", message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        if (Objects.nonNull(type) && type.equals("save")) {
            this.auditTrailService.save("Excel - Project Formulation Upload");
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }
}

