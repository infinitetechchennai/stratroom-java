/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.db.dto.OrgTrackerDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.OrgTrackerController
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.ControlPanelGeneralService
 *  com.estrat.backend.db.service.DeptTrackerService
 *  com.estrat.backend.db.service.OrgTrackerService
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
package com.estrat.backend.db.resource;

import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.estrat.backend.db.dto.OrgTrackerDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.ControlPanelGeneralService;
import com.estrat.backend.db.service.DeptTrackerService;
import com.estrat.backend.db.service.OrgTrackerService;
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

    private long resolveOrgId() {
        String orgIdStr = UserThreadLocal.get("USER_ORG_ID");
        if (StringUtils.isBlank(orgIdStr)) {
            return 1L;
        }
        return Long.parseLong(orgIdStr);
    }

    private boolean isDepartmentMode(ControlPanelGeneralDTO controlPanelGeneral) {
        return controlPanelGeneral != null
                && "Department".equalsIgnoreCase(controlPanelGeneral.getImplementationType());
    }

    private String normalizeDatePeriod(String datePeriod) {
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        return StringUtils.replaceEach((String)datePeriod, (String[])searchArray, (String[])replaceArray);
    }

    @GetMapping(value={"/orgTrackList"})
    public ResponseEntity<List<OrgTrackerDTO>> findAll(@RequestParam(value="flagType") String flagType, @RequestParam(value="datePeriod", required=false) String datePeriod, @RequestParam(value="id", required=false) String id) throws RequestException {
        String result = this.normalizeDatePeriod(flagType);
        String date = this.normalizeDatePeriod(datePeriod);
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(this.resolveOrgId());
        boolean listAll = StringUtils.isBlank(result) && StringUtils.isBlank(id);
        List orgTrackerDTOList;
        if (this.isDepartmentMode(controlPanelGeneral)) {
            orgTrackerDTOList = listAll
                    ? this.deptTrackerService.findAll(date)
                    : this.deptTrackerService.findAll(result, date, id);
        } else {
            orgTrackerDTOList = listAll
                    ? this.orgTrackerService.findAll(date)
                    : this.orgTrackerService.findAll(result, date);
        }
        return new ResponseEntity((Object)orgTrackerDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/orgTrackAllList"})
    public ResponseEntity<List<OrgTrackerDTO>> orgTrackAllList(@RequestParam(value="datePeriod", required=false) String datePeriod) throws RequestException {
        String date = this.normalizeDatePeriod(datePeriod);
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(this.resolveOrgId());
        List orgTrackerDTOList = this.isDepartmentMode(controlPanelGeneral)
                ? this.deptTrackerService.findAll(date)
                : this.orgTrackerService.findAll(date);
        return new ResponseEntity((Object)orgTrackerDTOList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/clearOrgTrack/{id}"})
    public ResponseEntity<Boolean> clearOrgTrack(@PathVariable(value="id") Long id, @RequestParam(value="type", required=false) String type) throws RequestException {
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(this.resolveOrgId());
        if (this.isDepartmentMode(controlPanelGeneral)) {
            this.deptTrackerService.clearDeptTracker(id, type);
        } else {
            this.orgTrackerService.clearOrgTracker(id, type);
        }
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/orgTrackSearchList"})
    public ResponseEntity<List<OrgTrackerDTO>> orgTrackSearchList(@RequestParam(value="flagType") String flagType, @RequestParam(value="datePeriod", required=false) String datePeriod) throws RequestException {
        String result = this.normalizeDatePeriod(flagType);
        String date = this.normalizeDatePeriod(datePeriod);
        ControlPanelGeneralDTO controlPanelGeneral = this.controlPanelGeneralService.findByOrgId(this.resolveOrgId());
        List orgTrackerDTOList = this.isDepartmentMode(controlPanelGeneral)
                ? this.deptTrackerService.deptTrackSearchList(result, date)
                : this.orgTrackerService.orgTrackSearchList(result, date);
        return new ResponseEntity((Object)orgTrackerDTOList, HttpStatus.OK);
    }
}

