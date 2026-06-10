/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.ControlPanelGeneralDTO
 *  com.estrat.service.db.dto.OrgTrackerDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.OrgTrackerController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.ControlPanelGeneralService
 *  com.estrat.service.db.service.DeptTrackerService
 *  com.estrat.service.db.service.OrgTrackerService
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
package com.estrat.service.db.resource;

import com.estrat.service.db.dto.ControlPanelGeneralDTO;
import com.estrat.service.db.dto.OrgTrackerDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.ControlPanelGeneralService;
import com.estrat.service.db.service.DeptTrackerService;
import com.estrat.service.db.service.OrgTrackerService;
import java.util.List;
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
    public DeptTrackerService deptTrackerService;
    @Autowired
    public ControlPanelGeneralService controlPanelGeneralService;

    @GetMapping(value={"/orgTrackList"})
    public ResponseEntity<List<OrgTrackerDTO>> findAll(@RequestParam(value="flagType") String flagType, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="id", required=false) String id) throws RequestException {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)flagType, (String[])searchArray, (String[])replaceArray);
        String date = StringUtils.replaceEach((String)datePeriod, (String[])searchArray, (String[])replaceArray);
        List orgTrackerDTOList = null;
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        orgTrackerDTOList = controlPanelGeneral != null && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Department") ? this.deptTrackerService.findAll(result, date, id) : this.orgTrackerService.findAll(result, date);
        return new ResponseEntity((Object)orgTrackerDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/orgTrackAllList"})
    public ResponseEntity<List<OrgTrackerDTO>> orgTrackAllList(@RequestParam(value="datePeriod", required=false) String datePeriod) throws RequestException {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String date = StringUtils.replaceEach((String)datePeriod, (String[])searchArray, (String[])replaceArray);
        List orgTrackerDTOList = null;
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        orgTrackerDTOList = controlPanelGeneral != null && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Department") ? this.deptTrackerService.findAll(date) : this.orgTrackerService.findAll(date);
        return new ResponseEntity((Object)orgTrackerDTOList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/clearOrgTrack/{id}"})
    public ResponseEntity<Boolean> clearOrgTrack(@PathVariable(value="id") Long id, @RequestParam(value="type", required=false) String type) throws RequestException {
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        if (controlPanelGeneral != null && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Department")) {
            this.deptTrackerService.clearDeptTracker(id, type);
        } else {
            this.orgTrackerService.clearOrgTracker(id, type);
        }
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/orgTrackSearchList"})
    public ResponseEntity<List<OrgTrackerDTO>> orgTrackSearchList(@RequestParam(value="flagType") String flagType, @RequestParam(value="datePeriod", required=false) String datePeriod) throws RequestException {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)flagType, (String[])searchArray, (String[])replaceArray);
        String date = StringUtils.replaceEach((String)datePeriod, (String[])searchArray, (String[])replaceArray);
        List orgTrackerDTOList = null;
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        orgTrackerDTOList = controlPanelGeneral != null && controlPanelGeneral.getImplementationType().equalsIgnoreCase("Department") ? this.deptTrackerService.deptTrackSearchList(result, date) : this.orgTrackerService.orgTrackSearchList(result, date);
        return new ResponseEntity((Object)orgTrackerDTOList, HttpStatus.OK);
    }
}

