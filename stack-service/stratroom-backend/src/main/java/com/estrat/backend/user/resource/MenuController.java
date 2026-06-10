/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.user.dto.MenuDTO
 *  com.estrat.backend.user.exception.RequestException
 *  com.estrat.backend.user.resource.MenuController
 *  com.estrat.backend.user.service.MenuService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.user.resource;

import com.estrat.backend.user.dto.MenuDTO;
import com.estrat.backend.user.exception.RequestException;
import com.estrat.backend.user.service.MenuService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MenuController {
    @Autowired
    protected MenuService menuService;

    @PostMapping(value={"/menus"})
    public ResponseEntity<MenuDTO> saveMenuDetails(@RequestBody MenuDTO menuDTO) throws RequestException {
        return new ResponseEntity((Object)this.menuService.saveMenus(menuDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/menus"})
    public ResponseEntity<MenuDTO> updateMenuDetails(@RequestBody MenuDTO initiativesDTO) throws RequestException {
        return new ResponseEntity((Object)this.menuService.updateMenus(initiativesDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/menus/{id}"})
    public ResponseEntity<MenuDTO> getMenuDetailsById(@PathVariable(value="id") long id) throws RequestException {
        return new ResponseEntity((Object)this.menuService.retrieveMenus(Long.valueOf(id)), HttpStatus.OK);
    }

    @DeleteMapping(value={"/menus/{id}"})
    public ResponseEntity<Boolean> deleteMenusDetailsById(@PathVariable(value="id") long id) throws RequestException {
        this.menuService.removeMenus(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/menuLists/{empId}"})
    public ResponseEntity<List<MenuDTO>> findAll(@PathVariable(value="empId") long empId) throws RequestException {
        List menuDTOList = this.menuService.findAll(empId);
        if (!menuDTOList.isEmpty()) {
            return new ResponseEntity((Object)menuDTOList, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}

