/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.OrgstructureGroup
 *  com.estrat.service.db.dao.OrgstructureGroupRepository
 *  com.estrat.service.db.dto.MeetingManagementResponseDTO
 *  com.estrat.service.db.dto.OrgstructureGroupDTO
 *  com.estrat.service.db.service.OrgstructureGroupService
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.OrgstructureGroup;
import com.estrat.service.db.dao.OrgstructureGroupRepository;
import com.estrat.service.db.dto.MeetingManagementResponseDTO;
import com.estrat.service.db.dto.OrgstructureGroupDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrgstructureGroupService {
    private Logger log = Logger.getLogger(OrgstructureGroupService.class);
    @Autowired
    protected OrgstructureGroupRepository orgstructureGroupRepository;

    public Optional<OrgstructureGroup> findById(long id) {
        return this.orgstructureGroupRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public void delete(OrgstructureGroup orgstructureGroup) {
        this.orgstructureGroupRepository.delete((Object)orgstructureGroup);
    }

    public OrgstructureGroupDTO save(OrgstructureGroup orgstructureGroup) {
        OrgstructureGroup orgstructureGroupResponse = (OrgstructureGroup)this.orgstructureGroupRepository.save(orgstructureGroup);
        OrgstructureGroupDTO orgstructureGroupDTO = new OrgstructureGroupDTO(orgstructureGroupResponse);
        return orgstructureGroupDTO;
    }

    public List<OrgstructureGroupDTO> findAllValue() {
        List dbList = this.orgstructureGroupRepository.findAllByActive(0);
        List<OrgstructureGroupDTO> groupList = dbList.stream().map(dbValue -> new OrgstructureGroupDTO(dbValue)).collect(Collectors.toList());
        return groupList;
    }

    public MeetingManagementResponseDTO deleteByObj(Optional<OrgstructureGroup> orgstructureGroup) {
        MeetingManagementResponseDTO meetingManagementResponseDTO = new MeetingManagementResponseDTO();
        if (orgstructureGroup.isPresent()) {
            OrgstructureGroup management = orgstructureGroup.get();
            management.setActive(1);
            this.orgstructureGroupRepository.save(management);
            meetingManagementResponseDTO.setFlag(true);
            return meetingManagementResponseDTO;
        }
        meetingManagementResponseDTO.setFlag(false);
        return meetingManagementResponseDTO;
    }
}

