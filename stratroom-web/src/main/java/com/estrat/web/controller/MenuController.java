/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.MenuController
 *  com.estrat.web.dto.MenuDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.MenuService
 *  com.estrat.web.util.RequestSessionUtil
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.context.request.WebRequest
 */
package com.estrat.web.controller;

import com.estrat.web.dto.MenuDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.MenuService;
import com.estrat.web.util.RequestSessionUtil;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@RestController
public class MenuController {
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Autowired
    protected MenuService menuService;

    @RequestMapping(value={"/bscdashbord"}, method={RequestMethod.GET})
    public String dashboardStandardView(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/dashboard/bscdashbord";
    }

    @RequestMapping(value={"/strategymap"}, method={RequestMethod.GET})
    public String dashboardView(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response) {
        return "pages/dashboard/strategymap";
    }

    @PostMapping(value={"/menus"})
    public ResponseEntity<MenuDTO> saveMenuDetails(@RequestBody MenuDTO menuDTO) throws RequestException {
        return new ResponseEntity(this.menuService.saveMenus(menuDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/menus"})
    public ResponseEntity<MenuDTO> updateMenuDetails(@RequestBody MenuDTO initiativesDTO) throws RequestException {
        return new ResponseEntity(this.menuService.updateMenus(initiativesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/menus/{id}"})
    public ResponseEntity<MenuDTO> getMenuDetailsById(@PathVariable(value="id") long id) throws RequestException {
        return new ResponseEntity(this.menuService.retrieveMenus(Long.valueOf(id)), HttpStatus.OK);
    }

    @DeleteMapping(value={"/menus/{id}"})
    public ResponseEntity<Boolean> deleteMenusDetailsById(@PathVariable(value="id") long id) throws RequestException {
        this.menuService.removeMenus(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/menuLists/{empId}"})
    public ResponseEntity<List<MenuDTO>> findAll(@PathVariable(value="empId") long empId) throws RequestException {
        List menuDTOList = this.menuService.findAll(empId);
        if (!menuDTOList.isEmpty()) {
            return new ResponseEntity(menuDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}

