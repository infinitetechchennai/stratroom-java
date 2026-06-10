/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.config.CommonRestTemplate
 *  com.estrat.scorecard.dto.MasterDto
 *  com.estrat.scorecard.service.MasterService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.scorecard.service;

import com.estrat.scorecard.config.CommonRestTemplate;
import com.estrat.scorecard.dto.MasterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MasterService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbService.master.url}")
    private String masterUrl;

    public MasterDto saveMaster(MasterDto masterDto) {
        return (MasterDto)this.commonRestTemplate.postForObject(this.masterUrl, (Object)masterDto, MasterDto.class);
    }
}

