/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.dto.PageLinkDTO
 *  com.estrat.service.user.dto.PageLinkResponseDTO
 */
package com.estrat.service.user.dto;

import com.estrat.service.user.dto.PageLinkDTO;
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

