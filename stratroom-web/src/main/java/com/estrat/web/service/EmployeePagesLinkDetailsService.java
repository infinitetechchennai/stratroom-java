/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.PageLinkDTO
 *  com.estrat.web.dto.PageLinkResponseDTO
 *  com.estrat.web.service.EmployeePagesLinkDetailsService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.PageLinkDTO;
import com.estrat.web.dto.PageLinkResponseDTO;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmployeePagesLinkDetailsService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${user.service.page.link.url}")
    private String pageLinkUrl;
    @Value(value="${user.service.page.link.list.url}")
    private String pageLinkList;

    public PageLinkResponseDTO save(List<PageLinkDTO> pageLinkDTOList) {
        return (PageLinkResponseDTO)this.commonRestTemplate.postForObject(this.pageLinkUrl, pageLinkDTOList, PageLinkResponseDTO.class);
    }

    public PageLinkResponseDTO update(List<PageLinkDTO> pageLinkDTOList) {
        return (PageLinkResponseDTO)this.commonRestTemplate.putForObject(this.pageLinkUrl, pageLinkDTOList, PageLinkResponseDTO.class);
    }

    public PageLinkResponseDTO findAll(Long empId) {
        String url = String.join((CharSequence)"/", this.pageLinkList, String.valueOf(empId));
        PageLinkResponseDTO pageLinkResponseDTO = (PageLinkResponseDTO)this.commonRestTemplate.getForObject(url, PageLinkResponseDTO.class);
        return pageLinkResponseDTO;
    }

    public PageLinkResponseDTO remove(Long id) {
        String url = this.pageLinkUrl + "/" + id;
        PageLinkResponseDTO pageLinkResponseDTO = (PageLinkResponseDTO)this.commonRestTemplate.getForObject(url, PageLinkResponseDTO.class);
        return pageLinkResponseDTO;
    }
}

