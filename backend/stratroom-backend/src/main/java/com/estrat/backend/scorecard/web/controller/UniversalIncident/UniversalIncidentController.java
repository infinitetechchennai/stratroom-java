/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.UniversalIncidentDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.UniversalIncidentService
 *  com.estrat.backend.scorecard.web.controller.UniversalIncident.UniversalIncidentController
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
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
package com.estrat.backend.scorecard.web.controller.UniversalIncident;

import com.estrat.backend.scorecard.dto.UniversalIncidentDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.UniversalIncidentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
public class UniversalIncidentController {
    @Autowired
    private UniversalIncidentService universalIncidentService;

    @PostMapping(value={"/universalIncident"})
    public ResponseEntity<UniversalIncidentDTO> saveUniversal(@RequestBody UniversalIncidentDTO universalIncidentDTO) throws RequestException {
        return new ResponseEntity((Object)this.universalIncidentService.saveUniversal(universalIncidentDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/universalIncident"})
    public ResponseEntity<UniversalIncidentDTO> updateUniversal(@RequestBody UniversalIncidentDTO universalIncidentDTO) throws RequestException {
        return new ResponseEntity((Object)this.universalIncidentService.updateUniversal(universalIncidentDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/universalIncident/{id}"})
    public ResponseEntity<UniversalIncidentDTO> getUniversal(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.universalIncidentService.retrieveUniversal(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/universalIncident/{id}"})
    public ResponseEntity<Boolean> deleteUniversal(@PathVariable(value="id") Long id) throws RequestException {
        this.universalIncidentService.removeUniversal(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/universalIncidentList"})
    public ResponseEntity<List<UniversalIncidentDTO>> findAll(@RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List meetingManagementDTOS = this.universalIncidentService.findAll(pageId);
        return new ResponseEntity((Object)meetingManagementDTOS, HttpStatus.OK);
    }
}

