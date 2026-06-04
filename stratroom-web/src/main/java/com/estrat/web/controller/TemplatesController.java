/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.TemplatesController
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.util.TemplateWriterUtil
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.context.request.WebRequest
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.service.AuditTrailService;
import com.estrat.web.util.TemplateWriterUtil;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class TemplatesController {
    @Autowired
    public TemplateWriterUtil writerUtil;
    @Autowired
    public AuditTrailService auditTrailService;

    @RequestMapping(value={"/uploadTemplateFile"}, method={RequestMethod.POST})
    public ResponseEntity<?> uploadTemplateFile(WebRequest webRequest, @RequestParam(value="templateFile", required=true) MultipartFile templateFile, @RequestParam(value="templateType", required=true) String templateType, @RequestParam(value="type", required=true) String type) {
        if (type.equalsIgnoreCase("validation")) {
            try {
                XSSFWorkbook myExcelBook = new XSSFWorkbook(templateFile.getInputStream());
                String response = this.writerUtil.checkValidationForExcelSheet(myExcelBook, templateType);
                return new ResponseEntity(response, HttpStatus.OK);
            }
            catch (Exception e) {
                throw new RuntimeException();
            }
        }
        Boolean response = this.writerUtil.uploadTemplateFile(templateFile, templateType);
        this.auditTrailService.save("Excel Template Uploaded");
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value={"/updateFileName"}, method={RequestMethod.POST})
    public ResponseEntity<?> updateFileName(WebRequest webRequest, @RequestParam(value="newFileName", required=true) String newFileName, @RequestParam(value="oldFileName", required=true) String oldFileName, @RequestParam(value="templateType", required=true) String templateType) {
        String response = this.writerUtil.updateTemplateFile(templateType, oldFileName, newFileName);
        this.auditTrailService.save("Excel Template Uploaded");
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value={"/deleteFileName"}, method={RequestMethod.DELETE})
    public ResponseEntity<?> deleteFileName(WebRequest webRequest, @RequestParam(value="fileName", required=true) String fileName, @RequestParam(value="templateType", required=true) String templateType) {
        String response = this.writerUtil.deleteFile(fileName, templateType);
        this.auditTrailService.save("Template File Delete");
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping(value={"/listOfFiles"}, method={RequestMethod.GET})
    public ResponseEntity<?> listOfFileName(WebRequest webRequest) {
        Map response = this.writerUtil.fileList();
        if (response != null) {
            return new ResponseEntity(response, HttpStatus.OK);
        }
        return new ResponseEntity("File Not Found", HttpStatus.OK);
    }

    @GetMapping(value={"/downloadTemplateFile"})
    public ResponseEntity<?> downloadTemplateFile(@RequestParam(value="fileName", required=false) String fileName, @RequestParam(value="templateType", required=true) String templateType, HttpServletRequest request) throws Exception {
        return this.writerUtil.writeDoc(fileName, templateType);
    }

    @GetMapping(value={"/downloadTemplate"})
    public ResponseEntity<?> downloadAuditTrail(@RequestParam(value="type", required=false) String type, HttpServletRequest request) throws Exception {
        if (type.equalsIgnoreCase("empOrg")) {
            return this.writerUtil.writeDocForEmpOrg();
        }
        if (type.equalsIgnoreCase("deptOrg")) {
            return this.writerUtil.writeDocForDeptOrg();
        }
        if (type.equalsIgnoreCase("userRole")) {
            return this.writerUtil.writeDocForUserRole();
        }
        if (type.equalsIgnoreCase("scorecard")) {
            return this.writerUtil.writeDocForScoreCard();
        }
        if (type.equalsIgnoreCase("initiative")) {
            return this.writerUtil.writeDocForInitiative();
        }
        if (type.equalsIgnoreCase("etl")) {
            return this.writerUtil.writeDocForEtl();
        }
        if (type.equalsIgnoreCase("risk")) {
            return this.writerUtil.writeDocForRisk();
        }
        if (type.equalsIgnoreCase("riskFormulation")) {
            return this.writerUtil.writeDocForRiskFormulation();
        }
        if (type.equalsIgnoreCase("projectFormulation")) {
            return this.writerUtil.writeDocForProjectFormulation();
        }
        return new ResponseEntity(HttpStatus.EXPECTATION_FAILED);
    }
}

