/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.UserDTO
 *  com.estrat.web.service.UserRoleManagementService
 *  com.estrat.web.service.UserRoleManagementService$1
 *  com.estrat.web.service.UserRoleManagementService$2
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.UserDTO;
import com.estrat.web.service.UserRoleManagementService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class UserRoleManagementService {
    @Autowired
    private CommonRestTemplate commonRestTemplate;
    @Value(value="${userservice.menus.url}")
    private String userUrl;

    public UserDTO saveUserRole(UserDTO userDTO) {
        String url = this.userUrl + "/userRole";
        return (UserDTO)this.commonRestTemplate.postForObject(url, userDTO, UserDTO.class);
    }

    public UserDTO updateUserRole(UserDTO userDTO) {
        String url = this.userUrl + "/userRole";
        return (UserDTO)this.commonRestTemplate.putForObject(url, userDTO, UserDTO.class);
    }

    public UserDTO findById(long id) {
        String url = this.userUrl + "/userRole/" + id;
        return (UserDTO)this.commonRestTemplate.getForObject(url, UserDTO.class);
    }

    public void removeUserRole(long id) {
        String url = this.userUrl + "/userRole/" + id;
        this.commonRestTemplate.deleteForObject(url);
    }

    public List<UserDTO> findByUser(FindDTO findDTO) {
        String url = this.userUrl + "/findByUser";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List userDTOList = (List)this.commonRestTemplate.getForObject(url, findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
        return userDTOList;
    }

    public List<UserDTO> getUserList(FindDTO findDTO) {
        String url = this.userUrl + "/userList";
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference<Object>() {};
        List userDTOList = (List)this.commonRestTemplate.getForObject(url, findDTO, (ParameterizedTypeReference)parameterizedTypeReference);
        return userDTOList;
    }

    public boolean createBulkUser(List<UserDTO> users) {
        String url = this.userUrl + "/createBulkUser";
        return (Boolean)this.commonRestTemplate.postForObject(url, users, Boolean.class);
    }
}


