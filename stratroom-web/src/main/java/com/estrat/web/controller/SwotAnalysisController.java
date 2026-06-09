/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.SwotAnalysisController
 *  com.estrat.web.dto.SWOTAnalysisDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.SwotAnalysisService
 *  com.estrat.web.util.RepositoryServices
 *  com.estrat.web.util.RequestSessionUtil
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
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.context.request.WebRequest
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.SWOTAnalysisDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.SwotAnalysisService;
import com.estrat.web.util.RepositoryServices;
import com.estrat.web.util.RequestSessionUtil;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class SwotAnalysisController {
    public static final String S3_ASSET_PATHS = "/swotAnalysisDocuments";
    @Autowired
    protected SwotAnalysisService swotAnalysisService;
    @Autowired
    protected RepositoryServices repositoryServices;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/swotAnalysis"})
    public ResponseEntity<SWOTAnalysisDTO> saveSwotAnalysisDetails(@RequestBody SWOTAnalysisDTO swotAnalysisDTO, HttpServletRequest request) throws RequestException {
        swotAnalysisDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.swotAnalysisService.saveSWOTAnalysis(swotAnalysisDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/swotAnalysis"})
    public ResponseEntity<SWOTAnalysisDTO> updateSwotAnalysisDetailsById(@RequestBody SWOTAnalysisDTO swotAnalysisDTO, HttpServletRequest request) throws RequestException {
        swotAnalysisDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.swotAnalysisService.updateSWOTAnalysis(swotAnalysisDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/swotAnalysis/{id}"})
    public ResponseEntity<SWOTAnalysisDTO> getSwotAnalysisDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.swotAnalysisService.retrieveSWOTAnalysis(id), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveSwotAnalysisList/{empId}"})
    public ResponseEntity<List<SWOTAnalysisDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="flagType") String flagType, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List swotAnalysisDTOList = this.swotAnalysisService.findAllByEmpId(empId, flagType, pageId);
        return new ResponseEntity(swotAnalysisDTOList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/swotAnalysis/{id}"})
    public ResponseEntity<Boolean> deleteSwotAnalysisDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.swotAnalysisService.removeSWOTAnalysis(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @RequestMapping(value={"/updateSwotAttachment"}, method={RequestMethod.POST}, consumes={"multipart/form-data"})
    public ResponseEntity<Map> updateAttachmentUrlForSwotAnalysis(WebRequest webRequest, @RequestParam(value="file") MultipartFile attachFile) throws RequestException {
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

