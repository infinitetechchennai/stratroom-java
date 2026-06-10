/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.MenuDetails
 *  com.estrat.service.db.dto.MenuDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.MenuController
 *  com.estrat.service.db.service.MenuService
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.MenuDetails;
import com.estrat.service.db.dto.MenuDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.MenuService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
        MenuDetails menuDetails = new MenuDetails(menuDTO);
        menuDetails.setCreatedTime(LocalDateTime.now());
        return new ResponseEntity((Object)this.menuService.save(menuDetails), HttpStatus.OK);
    }

    @PutMapping(value={"/menus"})
    public ResponseEntity<MenuDTO> updateMenuDetails(@RequestBody MenuDTO menuDTO) throws RequestException {
        MenuDetails menuDetails = new MenuDetails(menuDTO);
        menuDetails.setUpdatedTime(LocalDateTime.now());
        return new ResponseEntity((Object)this.menuService.save(menuDetails), HttpStatus.OK);
    }

    @GetMapping(value={"/menus/{id}"})
    public ResponseEntity<MenuDTO> getMenuDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        MenuDetails menuDetails = (MenuDetails)this.menuService.findById(id.longValue()).get();
        return new ResponseEntity((Object)new MenuDTO(menuDetails), HttpStatus.OK);
    }

    @DeleteMapping(value={"/menus/{id}"})
    public ResponseEntity<MenuDTO> deleteMenusDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        Optional menuDetails = this.menuService.findById(id.longValue());
        if (menuDetails.isPresent()) {
            MenuDetails menuDetails1 = (MenuDetails)menuDetails.get();
            menuDetails1.setActive(1);
            this.menuService.save(menuDetails1);
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
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

