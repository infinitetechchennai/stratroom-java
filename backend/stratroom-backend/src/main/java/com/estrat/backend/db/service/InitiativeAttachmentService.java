/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.InitiativeAttachment
 *  com.estrat.backend.db.dao.InitiativeAttachmentRepository
 *  com.estrat.backend.db.dto.InitiativeAttachmentDto
 *  com.estrat.backend.db.service.InitiativeAttachmentService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.InitiativeAttachment;
import com.estrat.backend.db.dao.InitiativeAttachmentRepository;
import com.estrat.backend.db.dto.InitiativeAttachmentDto;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class InitiativeAttachmentService {
    @Autowired
    protected InitiativeAttachmentRepository initiativeAttachmentRepo;
    @Value(value="${backup.script.file.path}")
    public String filepath;

    public Optional<InitiativeAttachment> findById(long id) {
        return this.initiativeAttachmentRepo.findById(id);
    }

    public InitiativeAttachmentDto save(InitiativeAttachment initiativeAttachment) {
        System.out.println("initiativeAttachment : " + initiativeAttachment.getUniqueFileReference());
        this.kpiFileSave(initiativeAttachment);
        InitiativeAttachment initResponse = (InitiativeAttachment)this.initiativeAttachmentRepo.save(initiativeAttachment);
        InitiativeAttachmentDto response = new InitiativeAttachmentDto(initResponse);
        return response;
    }

    public void delete(InitiativeAttachment initiativeAttachment) {
        this.initiativeAttachmentRepo.delete(initiativeAttachment);
    }

    public List<InitiativeAttachmentDto> findAll(long initiativeId) {
        List<InitiativeAttachment> dbList = this.initiativeAttachmentRepo.findAllByInitId(Long.valueOf(initiativeId));
        List<InitiativeAttachmentDto> response = dbList.stream().map(dbValue -> new InitiativeAttachmentDto(dbValue)).collect(Collectors.toList());
        return response;
    }

    public List<InitiativeAttachmentDto> findAllByEmpId(Long empId) {
        List<InitiativeAttachment> dbList = this.initiativeAttachmentRepo.findAllByEmpId(empId, 0);
        return dbList.stream().map(dbValue -> new InitiativeAttachmentDto(dbValue)).collect(Collectors.toList());
    }

    public void kpiFileSave(InitiativeAttachment kpidoc) {
        System.out.println("Enter in save file");
        System.out.println("Base64 preview: " + kpidoc.getFile().substring(0, 50));
        String base64 = kpidoc.getFile();
        if (base64.contains(",")) {
            base64 = base64.substring(base64.indexOf(",") + 1);
        }
        System.out.println("after previde base :: " + base64);
        byte[] decodedBytes = Base64.getDecoder().decode(base64);
        System.out.println("uniqu referevce 64 :: " + kpidoc.getUniqueFileReference());
        String filePath = this.filepath + "/initiative/" + kpidoc.getUniqueFileReference();
        try {
            Files.write(Paths.get(filePath, new String[0]), decodedBytes, new OpenOption[0]);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
}

