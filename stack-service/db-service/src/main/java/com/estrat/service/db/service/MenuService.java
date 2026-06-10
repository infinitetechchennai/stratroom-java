/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.MenuDetails
 *  com.estrat.service.db.dao.MenuRepository
 *  com.estrat.service.db.dto.MenuDTO
 *  com.estrat.service.db.service.MenuService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.MenuDetails;
import com.estrat.service.db.dao.MenuRepository;
import com.estrat.service.db.dto.MenuDTO;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
    @Autowired
    protected MenuRepository menuRepository;

    public Optional<MenuDetails> findById(long id) {
        return this.menuRepository.findByIdAndActive(Long.valueOf(id));
    }

    public void delete(MenuDetails menuDetails) {
        this.menuRepository.delete((Object)menuDetails);
    }

    public MenuDTO save(MenuDetails menuDetails) {
        return new MenuDTO((MenuDetails)this.menuRepository.save(menuDetails));
    }

    public List<MenuDTO> findAll(long empId) {
        List dbList = this.menuRepository.findAllByEmpId(Long.valueOf(empId));
        return dbList.stream().map(dbValue -> new MenuDTO(dbValue)).collect(Collectors.toList());
    }
}

