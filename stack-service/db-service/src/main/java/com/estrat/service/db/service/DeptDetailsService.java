/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.DeptDetails
 *  com.estrat.service.db.dao.DeptDetailsRepository
 *  com.estrat.service.db.service.DeptDetailsService
 *  javax.transaction.Transactional
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.DeptDetails;
import com.estrat.service.db.dao.DeptDetailsRepository;
import java.util.Optional;
import jakarta.transaction.Transactional;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class DeptDetailsService {
    @Autowired
    private DeptDetailsRepository deptDetailsRepository;

    public Optional<DeptDetails> findById(long id) {
        return this.deptDetailsRepository.findById(id);
    }

    public DeptDetails save(DeptDetails deptDetails) {
        return (DeptDetails)this.deptDetailsRepository.save(deptDetails);
    }
}

