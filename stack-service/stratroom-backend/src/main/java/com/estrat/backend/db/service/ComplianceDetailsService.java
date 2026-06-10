/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ComplianceArea
 *  com.estrat.backend.db.bean.po.ComplianceDetails
 *  com.estrat.backend.db.bean.po.ComplianceDetailsAttachment
 *  com.estrat.backend.db.dao.ComplianceAreaRepository
 *  com.estrat.backend.db.dao.ComplianceDetailsAttachmentRepository
 *  com.estrat.backend.db.dao.ComplianceDetailsRepository
 *  com.estrat.backend.db.dto.ComplianceAreaDTO
 *  com.estrat.backend.db.dto.ComplianceDetailsAttachmentDTO
 *  com.estrat.backend.db.dto.ComplianceDetailsDTO
 *  com.estrat.backend.db.service.ComplianceDetailsService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.ComplianceArea;
import com.estrat.backend.db.bean.po.ComplianceDetails;
import com.estrat.backend.db.bean.po.ComplianceDetailsAttachment;
import com.estrat.backend.db.dao.ComplianceAreaRepository;
import com.estrat.backend.db.dao.ComplianceDetailsAttachmentRepository;
import com.estrat.backend.db.dao.ComplianceDetailsRepository;
import com.estrat.backend.db.dto.ComplianceAreaDTO;
import com.estrat.backend.db.dto.ComplianceDetailsAttachmentDTO;
import com.estrat.backend.db.dto.ComplianceDetailsDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComplianceDetailsService {
    @Autowired
    protected ComplianceDetailsRepository complianceDetailsRepository;
    @Autowired
    protected ComplianceAreaRepository complianceAreaRepository;
    @Autowired
    protected ComplianceDetailsAttachmentRepository complainceAttachmentRepository;

    public ComplianceAreaDTO saveArea(ComplianceArea complianceArea) {
        ComplianceArea response = (ComplianceArea)this.complianceAreaRepository.save(complianceArea);
        ComplianceAreaDTO taskDTO = new ComplianceAreaDTO(response);
        return taskDTO;
    }

    public List<ComplianceAreaDTO> findAllValue(String dateRange, String pageId) {
        List<ComplianceArea> dbList = this.complianceAreaRepository.findAll();
        List<ComplianceAreaDTO> complainList = dbList.stream().map(dbValue -> {
            ComplianceAreaDTO taskDto = new ComplianceAreaDTO(dbValue);
            this.populateImpactDesc(taskDto, dateRange, pageId);
            return taskDto;
        }).filter(dto -> dto.getComplainsDetailsList() != null && !dto.getComplainsDetailsList().isEmpty()).collect(Collectors.toList());
        return complainList;
    }

    public void populateImpactDesc(ComplianceAreaDTO complianceAreaDTO, String dateRange, String pageId) {
        List<ComplianceDetails> complain = new ArrayList<>();
        if (complianceAreaDTO.getId() != 0L) {
            complain = this.complianceDetailsRepository.findAllByPageId(complianceAreaDTO.getId(), Long.valueOf(pageId).longValue());
            List<ComplianceDetailsDTO> complainList = complain.stream().map(dbValue -> {
                ComplianceDetailsDTO taskDto = new ComplianceDetailsDTO(dbValue);
                ComplianceDetailsAttachment complainceAttachment = this.complainceAttachmentRepository.findAllByComplainDetailId(Long.valueOf(taskDto.getId()));
                if (complainceAttachment != null) {
                    taskDto.setComplainceAttachment(new ComplianceDetailsAttachmentDTO(complainceAttachment));
                }
                return taskDto;
            }).collect(Collectors.toList());
            complianceAreaDTO.setComplainsDetailsList(complainList);
        }
    }

    public Optional<ComplianceArea> findByAreaId(long id) {
        return this.complianceAreaRepository.findById(id);
    }

    public void deleteArea(ComplianceArea complianceArea) {
        this.complianceAreaRepository.delete(complianceArea);
    }

    public Optional<ComplianceDetails> findById(long id) {
        return this.complianceDetailsRepository.findById(id);
    }

    public ComplianceDetailsDTO save(ComplianceDetails complianceDetails) {
        ComplianceDetails response = (ComplianceDetails)this.complianceDetailsRepository.save(complianceDetails);
        ComplianceDetailsDTO taskDTO = new ComplianceDetailsDTO(response);
        return taskDTO;
    }

    public void delete(ComplianceDetails complianceDetails) {
        this.complianceDetailsRepository.delete(complianceDetails);
    }

    public void populateComplainceImpactDesc(ComplianceDetailsDTO complianceDetailsDTO) {
        ComplianceDetailsAttachment complainceAttachment = this.complainceAttachmentRepository.findAllByComplainDetailId(Long.valueOf(complianceDetailsDTO.getId()));
        if (complainceAttachment != null) {
            complianceDetailsDTO.setComplainceAttachment(new ComplianceDetailsAttachmentDTO(complainceAttachment));
        }
    }
}

