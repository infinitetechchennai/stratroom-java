/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping
 *  com.estrat.service.db.dao.ControlPanelWorkFlowApproverMappingRepository
 *  com.estrat.service.db.dto.ControlPanelWorkFlowApproverMappingDTO
 *  com.estrat.service.db.service.ControlPanelWorkFlowApproverMappingService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ControlPanelWorkFlowApproverMapping;
import com.estrat.service.db.dao.ControlPanelWorkFlowApproverMappingRepository;
import com.estrat.service.db.dto.ControlPanelWorkFlowApproverMappingDTO;
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

