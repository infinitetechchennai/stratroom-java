/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.RiskPlan
 *  com.estrat.service.db.dto.RiskDTO
 *  com.estrat.service.db.dto.RiskMonitoringDTO
 *  com.estrat.service.db.dto.RiskResponseDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.RiskMonitoringController
 *  com.estrat.service.db.service.RiskMonitoringService
 *  javax.servlet.http.HttpServletRequest
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

import com.estrat.service.db.bean.po.RiskPlan;
import com.estrat.service.db.dto.RiskDTO;
import com.estrat.service.db.dto.RiskMonitoringDTO;
import com.estrat.service.db.dto.RiskResponseDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.RiskMonitoringService;
import java.text.ParseException;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import jakarta.servlet.http.HttpServletRequest;
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
public class RiskMonitoringController {
    @Autowired
    protected RiskMonitoringService riskMonitoringService;

    @GetMapping(value={"/riskMonitoring/{id}"})
    public ResponseEntity<RiskMonitoringDTO> getRiskMonitoringDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        RiskMonitoringDTO riskMonitoringDTO = new RiskMonitoringDTO((RiskPlan)this.riskMonitoringService.findById(id.longValue()).get(), Boolean.valueOf(false));
        return new ResponseEntity((Object)riskMonitoringDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskMonitoring/{id}"})
    public ResponseEntity<RiskResponseDTO> deleteRiskMonitoringDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.riskMonitoringService.delete(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/riskMonitoringList/{riskId}"})
    public ResponseEntity<List<RiskMonitoringDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List riskMonitoringDTOS = this.riskMonitoringService.findAllByRiskDetailsId(riskId);
        return new ResponseEntity((Object)riskMonitoringDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskMonitoringList/{empId}"})
    public ResponseEntity<List<RiskMonitoringDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List riskMonitoringDTOList = this.riskMonitoringService.findAll(empId.longValue());
        return new ResponseEntity((Object)riskMonitoringDTOList, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> riskMonitoringValue) {
        if (Objects.isNull(riskMonitoringValue.get("progressval")) || StringUtils.isEmpty((CharSequence)riskMonitoringValue.get("progressval").toString())) {
            riskMonitoringValue.put("progressval", "0");
        }
    }

    @GetMapping(value={"/riskMonitoringListWithChild/{empId}"})
    public ResponseEntity<List<RiskMonitoringDTO>> riskMonitorListWithChild(@PathVariable(value="empId") long empId, @RequestParam(value="riskIds", required=false) String riskIds, @RequestParam(value="dateRange", required=false) String dateRange) throws RequestException {
        List riskMonitorDTOS = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)riskIds, (String[])searchArray, (String[])replaceArray);
        riskMonitorDTOS = result != null && !result.isEmpty() && !result.equals("") ? this.riskMonitoringService.findAllByRiskIDList(result, dateRange) : this.riskMonitoringService.findAllByEmpIds(empId);
        return new ResponseEntity((Object)riskMonitorDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/riskMonitoringListWithDeptids"})
    public ResponseEntity<List<RiskDTO>> riskMonitorListWithDeptids(@RequestParam(value="deptIds", required=false) String deptIds) throws RequestException, ParseException {
        List riskDTOS = null;
        String[] searchArray = new String[]{"%20", "%2520"};
        String[] replaceArray = new String[]{" ", " "};
        String result = StringUtils.replaceEach((String)deptIds, (String[])searchArray, (String[])replaceArray);
        if (result != null && !result.isEmpty() && !result.equals("")) {
            riskDTOS = this.riskMonitoringService.findRiskMonitorIdListDept(result);
        }
        return new ResponseEntity(riskDTOS, HttpStatus.OK);
    }
}

