/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.OrgTrackerDTO
 *  com.estrat.backend.user.exception.RequestException
 *  com.estrat.backend.user.resource.OrgTrackerController
 *  com.estrat.backend.user.service.OrgTrackerService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.user.resource;

import com.estrat.backend.user.dto.OrgTrackerDTO;
import com.estrat.backend.user.exception.RequestException;
import com.estrat.backend.user.service.OrgTrackerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrgTrackerController {
    @Autowired
    public OrgTrackerService orgTrackerService;

    @GetMapping(value={"/orgTrackList"})
    public ResponseEntity<List<OrgTrackerDTO>> findAll(@RequestParam(value="flagType") String flagType, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="id", required=false) String id) throws RequestException {
        String date = datePeriod.replace("%20", " ");
        return new ResponseEntity((Object)this.orgTrackerService.orgTrackList(flagType, date, id), HttpStatus.OK);
    }

    @GetMapping(value={"/orgTrackSearchList"})
    public ResponseEntity<List<OrgTrackerDTO>> orgTrackSearchList(@RequestParam(value="flagType") String flagType, @RequestParam(value="datePeriod", required=false) String datePeriod) throws RequestException {
        String date = datePeriod.replace("%20", " ");
        return new ResponseEntity((Object)this.orgTrackerService.orgTrackSearchList(flagType, date), HttpStatus.OK);
    }

    @GetMapping(value={"/orgTrackAllList"})
    public ResponseEntity<List<OrgTrackerDTO>> orgTrackAllList(@RequestParam(value="datePeriod", required=false) String datePeriod) throws RequestException {
        String date = datePeriod.replace("%20", " ");
        List orgTrackerDTOList = this.orgTrackerService.orgTrackAllList(date);
        return new ResponseEntity((Object)orgTrackerDTOList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/clearOrgTrack/{id}"})
    public ResponseEntity<Boolean> clearOrgTrack(@RequestParam(value="type", required=false) String type, @PathVariable(value="id") String id) throws RequestException {
        this.orgTrackerService.clearOrgTrack(id, type);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }
}

