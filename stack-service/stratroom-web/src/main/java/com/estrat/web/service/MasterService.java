/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.MasterDto
 *  com.estrat.web.service.MasterService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.MasterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MasterService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${scorecardService.master.url}")
    private String masterUrl;

    public MasterDto saveMaster(MasterDto masterDto) {
        return (MasterDto)this.commonRestTemplate.postForObject(this.masterUrl, masterDto, MasterDto.class);
    }
}

