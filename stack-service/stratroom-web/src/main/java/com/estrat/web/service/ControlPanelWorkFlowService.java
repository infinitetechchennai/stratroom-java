/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.ControlPanelWorkFlowDTO
 *  com.estrat.web.service.ControlPanelWorkFlowService
 *  com.estrat.web.service.ControlPanelWorkFlowService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.ControlPanelWorkFlowDTO;
import com.estrat.web.service.ControlPanelWorkFlowService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class ControlPanelWorkFlowService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${userservice.employee.remove.url}")
    private String dbUrl;
    @Value(value="${userService.control.panel.workflow.url}")
    private String savedbUrl;

    public ControlPanelWorkFlowDTO saveWorkFlow(ControlPanelWorkFlowDTO controlPanelWorkFlowDTO) {
        return (ControlPanelWorkFlowDTO)this.commonRestTemplate.postForObject(this.savedbUrl, controlPanelWorkFlowDTO, ControlPanelWorkFlowDTO.class);
    }

    public List<ControlPanelWorkFlowDTO> findWorkFlow() {
        String url = this.dbUrl + "/retriveWorkFlow";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public ControlPanelWorkFlowDTO findWorkFlowById(long id) {
        String url = this.dbUrl + "/retriveWorkFlow";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        return (ControlPanelWorkFlowDTO)this.commonRestTemplate.getForObject(url1, ControlPanelWorkFlowDTO.class);
    }

    public void removeWorkFlow(long id) {
        String url = this.dbUrl + "/deleteWorkFlow";
        String url1 = String.join((CharSequence)"/", url, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url1);
    }

    public ControlPanelWorkFlowDTO updateWorkFlow(ControlPanelWorkFlowDTO controlPanelWorkFlowDTO) {
        String url = this.dbUrl + "/updateWorkFlow";
        return (ControlPanelWorkFlowDTO)this.commonRestTemplate.putForObject(url, controlPanelWorkFlowDTO, ControlPanelWorkFlowDTO.class);
    }
}


