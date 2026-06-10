/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ModulePrivilegeMappingDTO
 *  com.estrat.web.util.PermissionPricipal
 */
package com.estrat.web.util;

import com.estrat.web.dto.ModulePrivilegeMappingDTO;
import java.util.List;

public class PermissionPricipal {
    List<ModulePrivilegeMappingDTO> privilegeMappingDTOS;

    public List<ModulePrivilegeMappingDTO> getPrivilegeMappingDTOS() {
        return this.privilegeMappingDTOS;
    }

    public void setPrivilegeMappingDTOS(List<ModulePrivilegeMappingDTO> privilegeMappingDTOS) {
        this.privilegeMappingDTOS = privilegeMappingDTOS;
    }
}

