/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.MenuDetails
 *  com.estrat.backend.db.dao.MenuRepository
 *  com.estrat.backend.db.dto.MenuDTO
 *  com.estrat.backend.db.service.MenuService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.MenuDetails;
import com.estrat.backend.db.dao.MenuRepository;
import com.estrat.backend.db.dto.MenuDTO;
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
        this.menuRepository.delete(menuDetails);
    }

    public MenuDTO save(MenuDetails menuDetails) {
        return new MenuDTO(this.menuRepository.save(menuDetails));
    }

    public List<MenuDTO> findAll(long empId) {
        List<MenuDetails> dbList = this.menuRepository.findAllByEmpId(Long.valueOf(empId));
        return dbList.stream().map(dbValue -> new MenuDTO(dbValue)).collect(Collectors.toList());
    }
}

