/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.PestelAnalysisController
 *  com.estrat.web.dto.PestelAnalysisDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.PestelAnalysisService
 *  com.estrat.web.util.RepositoryServices
 *  com.estrat.web.util.RequestSessionUtil
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
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
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.context.request.WebRequest
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.PestelAnalysisDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.PestelAnalysisService;
import com.estrat.web.util.RepositoryServices;
import com.estrat.web.util.RequestSessionUtil;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class PestelAnalysisController {
    private Logger log = LoggerFactory.getLogger(PestelAnalysisController.class);
    public static final String S3_ASSET_PATHS = "/pestelAnalysisDocuments";
    @Autowired
    protected PestelAnalysisService pestelAnalysisService;
    @Autowired
    protected RepositoryServices repositoryServices;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/pestelAnalysis"})
    public ResponseEntity<PestelAnalysisDTO> savePestelAnalysisDetails(@RequestBody PestelAnalysisDTO pestelAnalysisDTO, HttpServletRequest request) throws RequestException {
        pestelAnalysisDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.pestelAnalysisService.savePestelAnalysis(pestelAnalysisDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/pestelAnalysis"})
    public ResponseEntity<PestelAnalysisDTO> updatePestelAnalysisDetailsById(@RequestBody PestelAnalysisDTO pestelAnalysisDTO, HttpServletRequest request) throws RequestException {
        pestelAnalysisDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.pestelAnalysisService.updatePestelAnalysis(pestelAnalysisDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/pestelAnalysis/{id}"})
    public ResponseEntity<PestelAnalysisDTO> getPestelAnalysisDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.pestelAnalysisService.retrievePestelAnalysis(id), HttpStatus.OK);
    }

    @GetMapping(value={"/retrievePestelAnalysisList/{empId}"})
    public ResponseEntity<List<PestelAnalysisDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="flagType") String flagType, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List pestelAnalysisDTOList = this.pestelAnalysisService.findAllByEmpId(empId, flagType, pageId);
        return new ResponseEntity(pestelAnalysisDTOList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/pestelAnalysis/{id}"})
    public ResponseEntity<Boolean> deletePestelAnalysisDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.pestelAnalysisService.removePestelAnalysis(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @RequestMapping(value={"/updatePestelAttachment"}, method={RequestMethod.POST}, consumes={"multipart/form-data"})
    public ResponseEntity<Map> updateAttachmentUrlForPestelAnalysisDetails(WebRequest webRequest, @RequestParam(value="file") MultipartFile attachFile) throws RequestException {
        HashMap map = new HashMap();
        try {
            String fileName = attachFile.getOriginalFilename();
            InputStream inputStreamFile = attachFile.getInputStream();
            this.repositoryServices.putAsset(S3_ASSET_PATHS, fileName, inputStreamFile);
            String attachmentUrl = this.getS3ObjectLink(fileName);
            map.put("attachmentUrl", attachmentUrl);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity(map, HttpStatus.OK);
    }

    private String getS3ObjectLink(String fileName) throws UnsupportedEncodingException {
        return "http://" + this.repositoryServices.getAmazonBucket() + ".s3.amazonaws.com" + S3_ASSET_PATHS + "/" + URLEncoder.encode(fileName, "UTF-8");
    }
}

