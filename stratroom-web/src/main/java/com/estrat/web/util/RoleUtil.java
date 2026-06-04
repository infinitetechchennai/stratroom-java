/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ModuleDTO
 *  com.estrat.web.dto.ModulePrivilegeMappingDTO
 *  com.estrat.web.util.PermissionLocal
 *  com.estrat.web.util.RoleConstants
 *  com.estrat.web.util.RoleUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.commons.collections4.CollectionUtils
 */
package com.estrat.web.util;

import com.estrat.web.dto.ModuleDTO;
import com.estrat.web.dto.ModulePrivilegeMappingDTO;
import com.estrat.web.util.PermissionLocal;
import com.estrat.web.util.RoleConstants;
import com.estrat.web.util.UserThreadLocal;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.BiPredicate;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

/*
 * Exception performing whole class analysis ignored.
 */
public class RoleUtil {
    static BiPredicate<List<Object>, List<String>> privAnyMatchPredicate = (inPrivList, eligibleList) -> CollectionUtils.isNotEmpty((Collection)eligibleList) ? inPrivList.stream().anyMatch(val -> eligibleList.contains(val.toString())) : false;
    static BiPredicate<List<Object>, List<String>> privAllMatchPredicate = (inPrivList, eligibleList) -> CollectionUtils.isNotEmpty((Collection)eligibleList) ? inPrivList.stream().allMatch(val -> eligibleList.contains(val.toString())) : false;
    static BiPredicate<String, List<String>> validateLicenseModules = (key, licenseList) -> CollectionUtils.isNotEmpty((Collection)licenseList) ? licenseList.contains(key) || RoleConstants.nonLicenseModules.contains(key) : RoleConstants.nonLicenseModules.contains(key);

    public static boolean validatePrivileges(String[] modules, String[] privileges, boolean matchAll, Map<String, List<String>> privMap) {
        if (privMap == null) {
            return false;
        }
        List<String> moduleList = Arrays.asList(modules);
        List<String> privList = Arrays.asList(privileges);
        boolean privFlag = false;
        privFlag = matchAll ? moduleList.stream().anyMatch(key -> privAllMatchPredicate.test((List<Object>)(List)privList, privMap.get(key.toString()))) : moduleList.stream().anyMatch(key -> privAnyMatchPredicate.test((List<Object>)(List)privList, privMap.get(key.toString())));
        return privFlag;
    }

    public static boolean hasPrivilege(String modules, String privileges, boolean matchAll) {
        String[] moduleArray = modules.split("\\,");
        String[] privilegeArray = privileges.split("\\,");
        return RoleUtil.validatePrivileges((String[])moduleArray, (String[])privilegeArray, (boolean)matchAll, (Map)UserThreadLocal.get().getUserPermissions());
    }

    public static Map<String, List<String>> filterPermissionModules(Map<String, List<String>> permissions, List<String> licenseModules) {
        if (CollectionUtils.isEmpty(licenseModules) || permissions == null) {
            return Collections.emptyMap();
        }
        return permissions.entrySet().stream().filter(entry -> validateLicenseModules.test(entry.getKey(), licenseModules)).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public static List<ModuleDTO> filterModules(List<ModuleDTO> moduleList, List<String> licenseModules) {
        if (CollectionUtils.isEmpty(licenseModules)) {
            return Collections.emptyList();
        }
        return moduleList.stream().filter(module -> validateLicenseModules.test(module.getModuleName(), licenseModules)).collect(Collectors.toList());
    }

    public static boolean hasPrivileges(String modules, String tagName, String privileges) {
        return RoleUtil.validatePrivileges((String)modules, (String)tagName, (String)privileges);
    }

    public static boolean validatePrivileges(String modules, String tagNames, String privileges) {
        boolean status = false;
        List modulePrivilegeMappingDTOList = PermissionLocal.get().getPrivilegeMappingDTOS();
        for (Object _obj_modulePrivilegeMappingDTO : modulePrivilegeMappingDTOList) {
            ModulePrivilegeMappingDTO modulePrivilegeMappingDTO = (ModulePrivilegeMappingDTO) _obj_modulePrivilegeMappingDTO;
            if (!modulePrivilegeMappingDTO.getModuleName().equalsIgnoreCase(modules) || !modulePrivilegeMappingDTO.getTagName().equalsIgnoreCase(tagNames)) continue;
            if (privileges.equalsIgnoreCase("Create")) {
                if (!modulePrivilegeMappingDTO.getCreate().equalsIgnoreCase("TRUE")) continue;
                status = true;
                continue;
            }
            if (privileges.equalsIgnoreCase("Update")) {
                if (!modulePrivilegeMappingDTO.getUpdate().equalsIgnoreCase("TRUE")) continue;
                status = true;
                continue;
            }
            if (privileges.equalsIgnoreCase("View")) {
                if (!modulePrivilegeMappingDTO.getView().equalsIgnoreCase("TRUE")) continue;
                status = true;
                continue;
            }
            if (!privileges.equalsIgnoreCase("Delete") || !modulePrivilegeMappingDTO.getDelete().equalsIgnoreCase("TRUE")) continue;
            status = true;
        }
        return status;
    }

    public static boolean validatePrivilegesPage(String modules) {
        boolean status = false;
        List modulePrivilegeMappingDTOList = PermissionLocal.get().getPrivilegeMappingDTOS();
        for (Object _obj_modulePrivilegeMappingDTO : modulePrivilegeMappingDTOList) {
            ModulePrivilegeMappingDTO modulePrivilegeMappingDTO = (ModulePrivilegeMappingDTO) _obj_modulePrivilegeMappingDTO;
            if (!modulePrivilegeMappingDTO.getModuleName().equalsIgnoreCase(modules) || !modulePrivilegeMappingDTO.getCreate().equalsIgnoreCase("TRUE")) continue;
            status = true;
        }
        return status;
    }

    public static boolean validateViewPrivilegesPage(String modules) {
        boolean status = false;
        List modulePrivilegeMappingDTOList = PermissionLocal.get().getPrivilegeMappingDTOS();
        for (Object _obj_modulePrivilegeMappingDTO : modulePrivilegeMappingDTOList) {
            ModulePrivilegeMappingDTO modulePrivilegeMappingDTO = (ModulePrivilegeMappingDTO) _obj_modulePrivilegeMappingDTO;
            if (!modulePrivilegeMappingDTO.getModuleName().equalsIgnoreCase(modules) || !modulePrivilegeMappingDTO.getView().equalsIgnoreCase("TRUE")) continue;
            status = true;
        }
        return status;
    }
}

