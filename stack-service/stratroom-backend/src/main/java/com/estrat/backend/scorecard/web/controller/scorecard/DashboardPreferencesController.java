/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.DashBoardPreferencesDTO
 *  com.estrat.backend.scorecard.dto.HomePreferencesDTO
 *  com.estrat.backend.scorecard.dto.PreferenceDTO
 *  com.estrat.backend.scorecard.exception.RequestException
 *  com.estrat.backend.scorecard.service.DashBoardPreferencesService
 *  com.estrat.backend.scorecard.web.controller.scorecard.DashboardPreferencesController
 *  javax.servlet.http.HttpServletRequest
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
package com.estrat.backend.scorecard.web.controller.scorecard;

import com.estrat.backend.scorecard.dto.DashBoardPreferencesDTO;
import com.estrat.backend.scorecard.dto.HomePreferencesDTO;
import com.estrat.backend.scorecard.dto.PreferenceDTO;
import com.estrat.backend.scorecard.exception.RequestException;
import com.estrat.backend.scorecard.service.DashBoardPreferencesService;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
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
public class DashboardPreferencesController {
    @Autowired
    private DashBoardPreferencesService dashBoardPreferencesService;

    @PostMapping(value={"/dashBoardPreferences"})
    public ResponseEntity<DashBoardPreferencesDTO> saveDashBoardPreferences(@RequestBody DashBoardPreferencesDTO dashBoardPreferencesDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.dashBoardPreferencesService.saveDashBoardPreferences(dashBoardPreferencesDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/dashBoardPreferences"})
    public ResponseEntity<DashBoardPreferencesDTO> updateDashBoardPreferences(@RequestBody DashBoardPreferencesDTO dashBoardPreferencesDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.dashBoardPreferencesService.updateDashBoardPreferences(dashBoardPreferencesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/dashBoardPreferences/{id}"})
    public ResponseEntity<DashBoardPreferencesDTO> retrieveDashBoardPreferences(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.dashBoardPreferencesService.retrieveDashBoardPreferences(id), HttpStatus.OK);
    }

    @DeleteMapping(value={"/dashBoardPreferences/{id}"})
    public ResponseEntity<Boolean> removeDashBoardPreferences(@PathVariable(value="id") Long id) throws RequestException {
        this.dashBoardPreferencesService.removeDashBoardPreferences(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/dashBoardPreferencesList/{empId}"})
    public ResponseEntity<List<DashBoardPreferencesDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List RiskPlanDTOList = this.dashBoardPreferencesService.findAllByEmpId(empId, pageId);
        return new ResponseEntity((Object)RiskPlanDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/homePagePreferences/{empId}"})
    public ResponseEntity<HomePreferencesDTO> findhomePageByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        HomePreferencesDTO homepagepreference = this.dashBoardPreferencesService.findByEmpId(empId);
        return new ResponseEntity((Object)homepagepreference, HttpStatus.OK);
    }

    @PostMapping(value={"/homePagePreferences"})
    public ResponseEntity<HomePreferencesDTO> saveHomePreferences(@RequestBody HomePreferencesDTO homePreferencesDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.dashBoardPreferencesService.updateHomePreferences(homePreferencesDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/preferences"})
    public ResponseEntity<PreferenceDTO> savepreferences(@RequestBody PreferenceDTO preferenceDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.dashBoardPreferencesService.savePreference(preferenceDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/preferences"})
    public ResponseEntity<PreferenceDTO> updatepreferences(@RequestBody PreferenceDTO preferenceDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.dashBoardPreferencesService.updatePreference(preferenceDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/preferences/{id}"})
    public ResponseEntity<PreferenceDTO> retrievepreferences(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.dashBoardPreferencesService.retrivePreference(id), HttpStatus.OK);
    }
}

