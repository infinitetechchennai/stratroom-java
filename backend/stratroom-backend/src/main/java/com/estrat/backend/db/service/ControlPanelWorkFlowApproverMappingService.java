/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.ControlPanelWorkFlowApproverMapping
 *  com.estrat.backend.db.dao.ControlPanelWorkFlowApproverMappingRepository
 *  com.estrat.backend.db.dto.ControlPanelWorkFlowApproverMappingDTO
 *  com.estrat.backend.db.service.ControlPanelWorkFlowApproverMappingService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.ControlPanelWorkFlowApproverMapping;
import com.estrat.backend.db.dao.ControlPanelWorkFlowApproverMappingRepository;
import com.estrat.backend.db.dto.ControlPanelWorkFlowApproverMappingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ControlPanelWorkFlowApproverMappingService {
    @Autowired
    ControlPanelWorkFlowApproverMappingRepository WorkFlowApproverMappingRepo;

    public ControlPanelWorkFlowApproverMappingDTO save(ControlPanelWorkFlowApproverMapping controlPanelWorkFlowApproverMapping) {
        ControlPanelWorkFlowApproverMapping WorkFlow = (ControlPanelWorkFlowApproverMapping)this.WorkFlowApproverMappingRepo.save(controlPanelWorkFlowApproverMapping);
        ControlPanelWorkFlowApproverMappingDTO controlPanelWorkFlowDTO = new ControlPanelWorkFlowApproverMappingDTO(WorkFlow);
        return controlPanelWorkFlowDTO;
    }
}

