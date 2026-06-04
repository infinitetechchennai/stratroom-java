/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.ScoreCardDAO
 *  javax.persistence.EntityManager
 *  javax.persistence.PersistenceContext
 *  org.apache.log4j.Logger
 *  org.hibernate.Session
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.jdbc.core.JdbcTemplate
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.cache.DBCache;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class ScoreCardDAO {
    private Logger log = Logger.getLogger(ScoreCardDAO.class);
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private DBCache dbCache;
    @PersistenceContext
    private EntityManager entityManager;

    public Session getSession() {
        return (Session)this.entityManager.unwrap(Session.class);
    }

    public void updateCustomRepotee(long scoreCardId, String customRepotee) {
        String repoteeQuery = "UPDATE ScoreCard sc SET sc.customReportees=? WHERE sc.scoreCardDetailsId.id=?";
        this.jdbcTemplate.update(repoteeQuery, new Object[]{customRepotee, scoreCardId});
    }
}

