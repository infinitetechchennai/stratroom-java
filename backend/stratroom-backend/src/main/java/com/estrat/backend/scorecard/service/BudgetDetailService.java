/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.dto.BudgetDTO
 *  com.estrat.backend.scorecard.service.BudgetDetailService
 *  com.estrat.backend.scorecard.service.BudgetDetailService$1
 *  com.estrat.backend.scorecard.service.BudgetDetailService$2
 *  com.estrat.backend.scorecard.service.BudgetDetailService$3
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 *  org.springframework.web.util.UriComponentsBuilder
 */
package com.estrat.backend.scorecard.service;

import com.estrat.backend.scorecard.config.CommonRestTemplate;
import com.estrat.backend.scorecard.dto.BudgetDTO;
import com.estrat.backend.scorecard.service.BudgetDetailService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class BudgetDetailService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public BudgetDTO saveBudget(BudgetDTO budgetDTO) {
        String url = this.dbUrl + "/budgets";
        return (BudgetDTO)this.commonRestTemplate.postForObject(url, (Object)budgetDTO, BudgetDTO.class);
    }

    public BudgetDTO findById(long id) {
        String stUrl = this.dbUrl + "/budgets";
        String url = String.join((CharSequence)"/", stUrl, String.valueOf(id));
        return (BudgetDTO)this.commonRestTemplate.getForObject(url, BudgetDTO.class);
    }

    public void removeBudget(long id) {
        String stUrl = this.dbUrl + "/budgets";
        String url = String.join((CharSequence)"/", stUrl, String.valueOf(id));
        this.commonRestTemplate.deleteForObject(url);
    }

    public BudgetDTO updateBudget(BudgetDTO budgetDTO) {
        String url = this.dbUrl + "/budgets";
        return (BudgetDTO)this.commonRestTemplate.putForObject(url, (Object)budgetDTO, BudgetDTO.class);
    }

    public List<BudgetDTO> findAllBYEmpId(Long empId) {
        String stUrl = this.dbUrl + "/budgets";
        String url = String.join((CharSequence)"/", stUrl, String.valueOf(empId));
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(url, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<BudgetDTO> findByAllPageId(long pageId, String status) {
        String stUrl = this.dbUrl + "/budgetsList";
        String url = String.join((CharSequence)"/", stUrl, String.valueOf(pageId));
        String finalurl = UriComponentsBuilder.fromHttpUrl((String)url).queryParam("status", new Object[]{status}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalurl, (ParameterizedTypeReference)parameterizedTypeReference);
    }

    public List<BudgetDTO> findByAllchangeId(Long changeId) {
        String stUrl = this.dbUrl + "/budgetsListview";
        String finalurl = UriComponentsBuilder.fromHttpUrl((String)stUrl).queryParam("changeId", new Object[]{changeId}).toUriString();
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        return (List)this.commonRestTemplate.getForObject(finalurl, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}

