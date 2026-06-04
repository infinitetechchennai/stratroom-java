/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.PageLinkDTO
 *  com.estrat.web.dto.PageLinkResponseDTO
 */
package com.estrat.web.dto;

import com.estrat.web.dto.PageLinkDTO;
import java.util.List;

public class PageLinkResponseDTO {
    public List<PageLinkDTO> pageLinkDTOS;
    public boolean createdFlag;
    public boolean updatedFlag;

    public List<PageLinkDTO> getPageLinkDTOS() {
        return this.pageLinkDTOS;
    }

    public void setPageLinkDTOS(List<PageLinkDTO> pageLinkDTOS) {
        this.pageLinkDTOS = pageLinkDTOS;
    }

    public boolean isCreatedFlag() {
        return this.createdFlag;
    }

    public void setCreatedFlag(boolean createdFlag) {
        this.createdFlag = createdFlag;
    }

    public boolean isUpdatedFlag() {
        return this.updatedFlag;
    }

    public void setUpdatedFlag(boolean updatedFlag) {
        this.updatedFlag = updatedFlag;
    }
}

