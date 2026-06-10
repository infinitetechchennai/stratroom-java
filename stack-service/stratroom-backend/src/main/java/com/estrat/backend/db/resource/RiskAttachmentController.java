/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskAttachment
 *  com.estrat.backend.db.dto.RiskAttachmentDto
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.RiskAttachmentController
 *  com.estrat.backend.db.service.RiskAttachmentService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.RiskAttachment;
import com.estrat.backend.db.dto.RiskAttachmentDto;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.service.RiskAttachmentService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RiskAttachmentController {
    @Value(value="${backup.script.file.path}")
    public String filepath;
    @Autowired
    protected RiskAttachmentService riskAttachmentService;

    @PostMapping(value={"/riskAttach"})
    public ResponseEntity<RiskAttachmentDto> saveRiskAttachment(@RequestBody RiskAttachmentDto riskAttachmentDto, HttpServletRequest request) throws RequestException {
        RiskAttachment riskAttachment = new RiskAttachment(riskAttachmentDto);
        riskAttachment.setCreatedTime(LocalDateTime.now());
        byte[] decodedBytes = Base64.getDecoder().decode(riskAttachmentDto.getFile());
        String filePath = this.filepath + "/kpi/" + riskAttachmentDto.getUniqueFileReference();
        try {
            Files.write(Paths.get(filePath, new String[0]), decodedBytes, new OpenOption[0]);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        RiskAttachmentDto response = this.riskAttachmentService.save(riskAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @GetMapping(value={"/riskAttach/{id}"})
    public ResponseEntity<RiskAttachmentDto> getRiskAttachmentById(@PathVariable(value="id") Long id) throws RequestException {
        RiskAttachmentDto initAttachmentDTO = new RiskAttachmentDto((RiskAttachment)this.riskAttachmentService.findById(id.longValue()).get());
        return new ResponseEntity((Object)initAttachmentDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/riskAttach"})
    public ResponseEntity<RiskAttachmentDto> updateRiskAttachment(@RequestBody RiskAttachmentDto riskAttachmentDto) throws RequestException {
        RiskAttachment riskAttachment = new RiskAttachment(riskAttachmentDto);
        riskAttachment.setUpdatedTime(LocalDateTime.now());
        RiskAttachmentDto response = this.riskAttachmentService.save(riskAttachment);
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskAttach/{id}"})
    public ResponseEntity<Boolean> deleteRiskAttachmentById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional riskAttachment = this.riskAttachmentService.findById(id.longValue());
        if (riskAttachment.isPresent()) {
            RiskAttachment analysisAttachment = (RiskAttachment)riskAttachment.get();
            this.riskAttachmentService.delete(analysisAttachment);
            return new ResponseEntity((Object)true, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/riskAttachList/{initiativeId}"})
    public ResponseEntity<List<RiskAttachmentDto>> riskAttachmentList(@PathVariable(value="initiativeId") Long initiativeId) throws RequestException {
        List attachmentDTOList = this.riskAttachmentService.findAllByRiskId(initiativeId.longValue());
        return new ResponseEntity((Object)attachmentDTOList, HttpStatus.OK);
    }

    @GetMapping(value={"/emp/riskAttachList/{empId}"})
    public ResponseEntity<List<RiskAttachmentDto>> findByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List taskDTOList = this.riskAttachmentService.findAllByEmpId(empId);
        return new ResponseEntity((Object)taskDTOList, HttpStatus.OK);
    }
}

