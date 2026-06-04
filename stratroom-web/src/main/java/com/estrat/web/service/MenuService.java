/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.dto.MenuDTO
 *  com.estrat.web.service.MenuService
 *  com.estrat.web.service.MenuService$1
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.dto.MenuDTO;
import com.estrat.web.service.MenuService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
    @Autowired
    private CommonRestTemplate restTemplate;
    @Value(value="${userservice.menus.url}")
    private String menuUrl;

    public MenuDTO saveMenus(MenuDTO menuDTO) {
        return (MenuDTO)this.restTemplate.postForObject(this.menuUrl + "menus", menuDTO, MenuDTO.class);
    }

    public MenuDTO updateMenus(MenuDTO menuDTO) {
        return (MenuDTO)this.restTemplate.putForObject(this.menuUrl + "menus", menuDTO, MenuDTO.class);
    }

    public MenuDTO retrieveMenus(Long id) {
        return (MenuDTO)this.restTemplate.getForObject(this.menuUrl + "menus/" + id, MenuDTO.class);
    }

    public MenuDTO removeMenus(long id) {
        return (MenuDTO)this.restTemplate.getForObject(this.menuUrl + "/menus/" + id, MenuDTO.class);
    }

    public List<MenuDTO> findAll(long empID) {
        org.springframework.core.ParameterizedTypeReference parameterizedTypeReference = new org.springframework.core.ParameterizedTypeReference() {};
        return (List)this.restTemplate.getForObject(this.menuUrl + "menuLists/" + empID, (ParameterizedTypeReference)parameterizedTypeReference);
    }
}


