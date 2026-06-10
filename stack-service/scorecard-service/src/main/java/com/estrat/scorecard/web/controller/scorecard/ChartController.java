/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ChartDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.ChartService
 *  com.estrat.scorecard.web.controller.scorecard.ChartController
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
package com.estrat.scorecard.web.controller.scorecard;

import com.estrat.scorecard.dto.ChartDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.ChartService;
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
public class ChartController {
    @Autowired
    protected ChartService chartService;

    @PostMapping(value={"/charts"})
    public ResponseEntity<ChartDTO> saveCharts(@RequestBody ChartDTO chartDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.chartService.saveCharts(chartDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/charts"})
    public ResponseEntity<ChartDTO> updateCharts(@RequestBody ChartDTO chartDTO) throws RequestException {
        return new ResponseEntity((Object)this.chartService.updateCharts(chartDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/charts/{id}"})
    public ResponseEntity<ChartDTO> retrieveChartsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity((Object)this.chartService.retrieveCharts(id), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveChartsList/{empId}"})
    public ResponseEntity<List<ChartDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List ChartDTOList = this.chartService.findAllByEmpId(empId, pageId);
        return new ResponseEntity((Object)ChartDTOList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/charts/{id}"})
    public ResponseEntity<Boolean> removeChartsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.chartService.removeCharts(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }
}

