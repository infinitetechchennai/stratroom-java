/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.EmployeePagesLinkDetails
 *  com.estrat.backend.db.dao.EmployeePagesLinkDetailsRepository
 *  com.estrat.backend.db.dto.PageLinkDTO
 *  com.estrat.backend.db.dto.PageLinkResponseDTO
 *  com.estrat.backend.db.service.EmployeePagesLinkDetailsService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.EmployeePagesLinkDetails;
import com.estrat.backend.db.dao.EmployeePagesLinkDetailsRepository;
import com.estrat.backend.db.dto.PageLinkDTO;
import com.estrat.backend.db.dto.PageLinkResponseDTO;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeePagesLinkDetailsService {
    @Autowired
    protected EmployeePagesLinkDetailsRepository linkDetailsRepository;

    public PageLinkResponseDTO save(PageLinkDTO pageLinkDTO) {
        PageLinkResponseDTO responseDTO = new PageLinkResponseDTO();
        EmployeePagesLinkDetails pagesDetails = this.linkDetailsRepository.findAllByEmpIdAndPageType(Long.valueOf(pageLinkDTO.getEmpId()), pageLinkDTO.getType());
        if (pagesDetails != null) {
            pagesDetails.setEmpId(pageLinkDTO.getEmpId());
            pagesDetails.setActive(0);
            pagesDetails.setUpdatedBy(pageLinkDTO.getCreatedBy());
            pagesDetails.setTypeName(pageLinkDTO.getTypeName());
            pagesDetails.setTypeId(pageLinkDTO.getTypeId());
            pagesDetails.setPageId(pageLinkDTO.getPageId());
            pagesDetails.setUpdatedTime(LocalDateTime.now());
            this.linkDetailsRepository.save(pagesDetails);
            responseDTO.setUpdatedFlag(true);
        } else {
            this.linkDetailsRepository.save(new EmployeePagesLinkDetails(pageLinkDTO));
            responseDTO.setCreatedFlag(true);
        }
        return responseDTO;
    }

    public PageLinkResponseDTO update(PageLinkDTO pageLinkDTO) {
        EmployeePagesLinkDetails employeePagesLinkDetails = (EmployeePagesLinkDetails)this.linkDetailsRepository.save(new EmployeePagesLinkDetails(pageLinkDTO));
        PageLinkResponseDTO responseDTO = new PageLinkResponseDTO();
        responseDTO.setUpdatedFlag(true);
        return responseDTO;
    }

    public void updateUser(long empId) {
        List<EmployeePagesLinkDetails> dbList = this.linkDetailsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        if (!dbList.isEmpty()) {
            for (EmployeePagesLinkDetails employeePagesLinkDetails : dbList) {
                employeePagesLinkDetails.setActive(1);
                this.linkDetailsRepository.save(employeePagesLinkDetails);
            }
        }
    }

    public List<PageLinkDTO> findAll(long empId) {
        List<EmployeePagesLinkDetails> dbList = this.linkDetailsRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<PageLinkDTO> pageLinkDTOS = dbList.stream().map(dbValue -> {
            PageLinkDTO pageLinkDTO = new PageLinkDTO(dbValue);
            return pageLinkDTO;
        }).collect(Collectors.toList());
        return pageLinkDTOS;
    }

    public String getDefaultPageURL(String empID, String pageType) {
        EmployeePagesLinkDetails pagesDetails = this.linkDetailsRepository.findAllByEmpIdAndPageType(Long.valueOf(empID), 0, pageType);
        if (pagesDetails != null) {
            if (pagesDetails.getType().equals("SCORECARD")) {
                return String.join((CharSequence)"?pageId=", "dashboard/" + empID, String.valueOf(pagesDetails.getPageId()));
            }
            if (pagesDetails.getType().equals("INITIATIVE")) {
                return String.join((CharSequence)"?pageId=", "dashboard/" + empID, String.valueOf(pagesDetails.getPageId()));
            }
            if (pagesDetails.getType().equals("RISK")) {
                return String.join((CharSequence)"?pageId=", "risks", String.valueOf(pagesDetails.getPageId()));
            }
            if (pagesDetails.getType().equals("KPI")) {
                return "kpiView?empId=" + empID;
            }
        }
        return "";
    }
}

