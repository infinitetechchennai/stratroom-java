/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.AuditManagementAttachment
 *  com.estrat.service.db.dao.AuditManagementAttachmentRepository
 *  com.estrat.service.db.dto.AuditManagementAttachmentDTO
 *  com.estrat.service.db.service.AuditManagementAttachmentService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.AuditManagementAttachment;
import com.estrat.service.db.dao.AuditManagementAttachmentRepository;
import com.estrat.service.db.dto.AuditManagementAttachmentDTO;
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
public class AuditManagementAttachmentService {
    @Autowired
    protected AuditManagementAttachmentRepository auditManagementAttachmentRepo;
    @Value(value="${backup.script.file.path}")
    public String filepath;

    public Optional<AuditManagementAttachment> findById(long id) {
        return this.auditManagementAttachmentRepo.findById(id);
    }

    public AuditManagementAttachmentDTO save(AuditManagementAttachment auditManagementAttachment) {
        this.kpiFileSave(auditManagementAttachment);
        AuditManagementAttachment responsedetail = (AuditManagementAttachment)this.auditManagementAttachmentRepo.save(auditManagementAttachment);
        AuditManagementAttachmentDTO response = new AuditManagementAttachmentDTO(responsedetail);
        return response;
    }

    public void delete(AuditManagementAttachment auditManagementAttachment) {
        this.auditManagementAttachmentRepo.delete((Object)auditManagementAttachment);
    }

    public List<AuditManagementAttachmentDTO> findAll(long auditId) {
        List dbList = this.auditManagementAttachmentRepo.findAllByAuditId(Long.valueOf(auditId));
        List<AuditManagementAttachmentDTO> response = dbList.stream().map(dbValue -> new AuditManagementAttachmentDTO(dbValue)).collect(Collectors.toList());
        return response;
    }

    public void kpiFileSave(AuditManagementAttachment kpidoc) {
        System.out.println("Enter in save file");
        System.out.println("Base64 preview: " + kpidoc.getFile().substring(0, 50));
        String base64 = kpidoc.getFile();
        if (base64.contains(",")) {
            base64 = base64.substring(base64.indexOf(",") + 1);
        }
        System.out.println("after previde base :: " + base64);
        byte[] decodedBytes = Base64.getDecoder().decode(base64);
        System.out.println("uniqu referevce 64 :: " + kpidoc.getUniqueFileReference());
        String filePath = this.filepath + "/Audit/" + kpidoc.getUniqueFileReference();
        try {
            Files.write(Paths.get(filePath, new String[0]), decodedBytes, new OpenOption[0]);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
    }
}

