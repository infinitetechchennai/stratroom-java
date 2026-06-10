/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.OrgTrackerController
 *  com.estrat.web.dto.OrgTrackerDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.OrgTrackerService
 *  com.estrat.web.util.OrgTrackUtil
 *  com.estrat.web.util.RequestSessionUtil
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.OrgTrackerDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.OrgTrackerService;
import com.estrat.web.util.OrgTrackUtil;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
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
    @Autowired
    public OrgTrackUtil orgTrackUtil;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @GetMapping(value={"/orgTrackList"})
    public ResponseEntity<List<OrgTrackerDTO>> findAll(@RequestParam(value="type", required=false) String type, @RequestParam(value="flagType") String flagType, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="id", required=false) String id) throws RequestException {
        String date = datePeriod.replace("%20", "");
        return new ResponseEntity(this.orgTrackerService.orgTrackList(flagType, date, id), HttpStatus.OK);
    }

    @GetMapping(value={"/download"})
    public ResponseEntity<?> download(@RequestParam(value="flagType", required=false) String flagType, @RequestParam(value="type", required=false) String type, @RequestParam(value="datePeriod", required=false) String datePeriod, HttpServletResponse response) throws Exception {
        String date = datePeriod.replace("%20", "");
        List orgTrackList = null;
        if (StringUtils.isNotEmpty((CharSequence)flagType)) {
            orgTrackList = date != null ? this.orgTrackerService.orgTrackList(flagType, date, "") : this.orgTrackerService.orgTrackList(flagType, "", "");
            if (type.equalsIgnoreCase("xlsx")) {
                return this.orgTrackUtil.writeDocForOrgTracker(orgTrackList);
            }
            if (type.equalsIgnoreCase("pdf")) {
                return this.orgTrackUtil.writePdfForOrgTracker(orgTrackList, response, "");
            }
            return this.orgTrackUtil.writeCSVForOrgTracker(orgTrackList, response);
        }
        orgTrackList = date != null ? this.orgTrackerService.orgTrackAllList(date) : this.orgTrackerService.orgTrackAllList("");
        if (type.equalsIgnoreCase("xlsx")) {
            return this.orgTrackUtil.writeDocForAllOrgTracker(orgTrackList);
        }
        if (type.equalsIgnoreCase("pdf")) {
            return this.orgTrackUtil.writePdfForOrgTracker(orgTrackList, response, "all");
        }
        return this.orgTrackUtil.writeCSVForAllOrgTracker(orgTrackList, response);
    }

    @DeleteMapping(value={"/clearOrgTrack/{id}"})
    public ResponseEntity<Boolean> clearOrgTrack(@PathVariable(value="id") String id, @RequestParam(value="type", required=false) String type) throws RequestException {
        this.orgTrackerService.clearOrgTrack(id, type);
        return new ResponseEntity(true, HttpStatus.OK);
    }
}

