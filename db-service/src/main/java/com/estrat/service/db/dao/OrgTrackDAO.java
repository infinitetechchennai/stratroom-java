/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.OrgTracker
 *  com.estrat.service.db.dao.EmployeeDAO
 *  com.estrat.service.db.dao.OrgTrackDAO
 *  javax.persistence.EntityManager
 *  javax.persistence.PersistenceContext
 *  org.apache.log4j.Logger
 *  org.hibernate.Session
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.jdbc.core.JdbcTemplate
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.OrgTracker;
import com.estrat.service.db.dao.EmployeeDAO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class OrgTrackDAO {
    private Logger log = LoggerFactory.getLogger(EmployeeDAO.class);
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Session getSession() {
        return (Session)this.entityManager.unwrap(Session.class);
    }

    public void createOrgTracker(OrgTracker orgTracker) {
        this.getSession().merge((Object)orgTracker);
    }
}

