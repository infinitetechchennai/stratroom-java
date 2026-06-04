/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ObjectivesController
 *  com.estrat.web.dto.ObjectivesDTO
 *  com.estrat.web.service.ObjectiveService
 *  com.estrat.web.util.RequestSessionUtil
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.web.controller;

import com.estrat.web.dto.ObjectivesDTO;
import com.estrat.web.service.ObjectiveService;
import com.estrat.web.util.RequestSessionUtil;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ObjectivesController {
    @Autowired
    private ObjectiveService objectiveService;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @GetMapping(value={"/objectives/{id}"})
    public ResponseEntity<ObjectivesDTO> getDeptDetailsById(@PathVariable long id) {
        return this.objectiveService.getObjectiveDetails(id);
    }

    @RequestMapping(value={"/updateDatePeriod"}, method={RequestMethod.GET})
    public boolean updateDatePeriod(HttpServletRequest request, HttpServletResponse response) {
        if (request.getSession().getAttribute("startdatePeriod") == null || request.getSession().getAttribute("enddatePeriod") == null) {
            request.getSession().setAttribute("startdatePeriod", request.getParameter("startdatePeriod"));
            request.getSession().setAttribute("enddatePeriod", request.getParameter("enddatePeriod"));
            String startDate = request.getParameter("startdatePeriod");
            String endDate = request.getParameter("enddatePeriod");
            request.getSession().setAttribute("datePeriod", this.convertDateToString(startDate, endDate));
            return false;
        }
        if (!request.getParameter("startdatePeriod").trim().equals(request.getSession().getAttribute("startdatePeriod").toString().trim())) {
            request.getSession().setAttribute("startdatePeriod", request.getParameter("startdatePeriod"));
            request.getSession().setAttribute("enddatePeriod", request.getParameter("enddatePeriod"));
            String startDate = request.getParameter("startdatePeriod");
            String endDate = request.getParameter("enddatePeriod");
            request.getSession().setAttribute("datePeriod", this.convertDateToString(startDate, endDate));
            return true;
        }
        if (!request.getParameter("enddatePeriod").trim().equals(request.getSession().getAttribute("enddatePeriod").toString().trim())) {
            request.getSession().setAttribute("startdatePeriod", request.getParameter("startdatePeriod"));
            request.getSession().setAttribute("enddatePeriod", request.getParameter("enddatePeriod"));
            String startDate = request.getParameter("startdatePeriod");
            String endDate = request.getParameter("enddatePeriod");
            request.getSession().setAttribute("datePeriod", this.convertDateToString(startDate, endDate));
            return true;
        }
        return false;
    }

    private String convertDateToString(String startDateIn, String endDateIn) {
        Calendar startDate = Calendar.getInstance();
        startDate.setTimeInMillis(Long.valueOf(startDateIn));
        Calendar endDate = Calendar.getInstance();
        endDate.setTimeInMillis(Long.valueOf(endDateIn));
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        return String.join((CharSequence)"-", dateFormat.format(startDate.getTime()), dateFormat.format(endDate.getTime()));
    }

    @ResponseBody
    @PostMapping(value={"/objectives"})
    public ObjectivesDTO saveOrUpdateObjectiveDetails(@RequestBody ObjectivesDTO objectives, HttpServletRequest request) {
        objectives.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return (ObjectivesDTO)this.objectiveService.saveOrUpdateObjectiveDetails(objectives, "Save").getBody();
    }

    @DeleteMapping(value={"/objectives/{id}"})
    public ResponseEntity<Boolean> deleteDeptDetails(@PathVariable long id) {
        return this.objectiveService.deleteObjectiveDetails(id);
    }

    @PutMapping(value={"/objectives"})
    public ResponseEntity<ObjectivesDTO> updateObjectiveDetails(@RequestBody ObjectivesDTO objectives, HttpServletRequest request) {
        objectives.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return this.objectiveService.saveOrUpdateObjectiveDetails(objectives, "Update");
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

