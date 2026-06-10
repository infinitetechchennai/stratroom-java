/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.config.CommonRestTemplate
 *  com.estrat.service.user.dto.FindDTO
 *  com.estrat.service.user.dto.UserDTO
 *  com.estrat.service.user.service.UserRoleManagementService
 *  com.estrat.service.user.service.UserRoleManagementService$1
 *  com.estrat.service.user.service.UserRoleManagementService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.user.service;

import com.estrat.service.user.config.CommonRestTemplate;
import com.estrat.service.user.dto.FindDTO;
import com.estrat.service.user.dto.UserDTO;
import com.estrat.service.user.service.UserRoleManagementService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class UserRoleManagementService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${dbservice.url}")
    private String dbUrl;

    public UserDTO saveUserRole(UserDTO userDTO) {
        String url = this.dbUrl + "/userRole";
        return (UserDTO)this.commonRestTemplate.postForObject(url, (Object)userDTO, UserDTO.class);
    }

    public UserDTO updateUserRole(UserDTO userDTO) {
        String url = this.dbUrl + "/userRole";
        return (UserDTO)this.commonRestTemplate.putForObject(url, (Object)userDTO, UserDTO.class);
    }

    public UserDTO findById(long id) {
        String url = this.dbUrl + "/userRole/" + id;
        return (UserDTO)this.commonRestTemplate.getForObject(url, UserDTO.class);
    }

    public void removeUserRole(long id) {
        String url = this.dbUrl + "/userRole/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<UserDTO> findByUser(FindDTO findDTO) {
        String url = this.dbUrl + "/findByUser";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List userDTOList = (List)this.commonRestTemplate.getForObject(url, (Object)findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
        return userDTOList;
    }

    public List<UserDTO> getUserList(FindDTO findDTO) {
        String url = this.dbUrl + "/userList";
        ParameterizedTypeReference<Object> parameterizedTypeReference = new ParameterizedTypeReference<Object>() {};
        List userDTOList = (List)this.commonRestTemplate.getForObject(url, (Object)findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
        return userDTOList;
    }

    public boolean createBulkUser(List<UserDTO> users) {
        String url = this.dbUrl + "/createBulkUser";
        return (Boolean)this.commonRestTemplate.postForObject(url, users, Boolean.class);
    }
}

