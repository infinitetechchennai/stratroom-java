/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dao.ObjectivesDAO
 *  com.estrat.backend.db.exception.ExceptionLogHelper
 *  javax.persistence.EntityManager
 *  javax.persistence.PersistenceContext
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.log4j.Logger
 *  org.hibernate.Session
 *  org.hibernate.query.NativeQuery
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.dao.DataAccessException
 *  org.springframework.jdbc.core.JdbcTemplate
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.exception.ExceptionLogHelper;
import java.util.Collection;
import java.util.List;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class ObjectivesDAO {
    private Logger log = LoggerFactory.getLogger(ObjectivesDAO.class);
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Session getSession() {
        return (Session)this.entityManager.unwrap(Session.class);
    }

    public String getMaxId(Long empId, String prefix) {
        String query = "SELECT COALESCE(MAX(objective_id_seq),0)+1 as maxIdSequence FROM orgstructure.objectives WHERE created_by=? and upper(objectives_id) like '" + prefix.toUpperCase() + "%'";
        String maxId = null;
        try {
            NativeQuery nativeQuery = this.getSession().createNativeQuery(query);
            nativeQuery.setParameter(1, (Object)empId);
            maxId = nativeQuery.uniqueResult().toString();
            this.log.info(("maxId " + maxId));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return maxId;
    }

    public String getMaxId(Long empId) {
        String query = "SELECT COALESCE(MAX(perspective_id_seq),0)+1 as maxIdSequence FROM orgstructure.score_card WHERE created_by=?";
        String maxId = null;
        try {
            NativeQuery nativeQuery = this.getSession().createNativeQuery(query);
            nativeQuery.setParameter(1, (Object)empId);
            maxId = nativeQuery.uniqueResult().toString();
            this.log.info(("maxId " + maxId));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return maxId;
    }

    public boolean checkIdExist(Long empId, String objectiveId) {
        String query = "SELECT objectives_id from orgstructure.objectives WHERE created_by=? AND objectives_id=?";
        boolean flag = false;
        try {
            NativeQuery nativeQuery = this.getSession().createNativeQuery(query);
            nativeQuery.setParameter(1, (Object)empId);
            nativeQuery.setParameter(2, (Object)objectiveId);
            List idList = nativeQuery.list();
            this.log.info(("idList " + idList));
            if (CollectionUtils.isNotEmpty((Collection)idList)) {
                flag = true;
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return flag;
    }

    public void deleteObjectiveById(long objId) {
        String commentsQuery = "delete FROM orgstructure.kpi_comments_details WHERE kpi_id IN (SELECT id FROM orgstructure.kpi WHERE objective_id=? )";
        String elementQuery = "delete FROM orgstructure.kpi_element_details WHERE element_type='KPI' and  node_key IN (SELECT id FROM orgstructure.kpi WHERE objective_id=? )";
        String targetQuery = "delete FROM orgstructure.kpi_target_details WHERE kpi_id IN (SELECT id FROM orgstructure.kpi WHERE objective_id=? )";
        this.jdbcTemplate.update(commentsQuery, new Object[]{objId});
        this.jdbcTemplate.update(elementQuery, new Object[]{objId});
        this.jdbcTemplate.update(targetQuery, new Object[]{objId});
    }

    public void deleteScorecardById(long scoreCardId) {
        String commentsQuery = "delete FROM orgstructure.kpi_comments_details WHERE kpi_id IN (SELECT id FROM orgstructure.kpi WHERE objective_id IN (SELECT id FROM objectives WHERE score_card_id=?))";
        String elementQuery = "delete FROM orgstructure.kpi_element_details WHERE element_type='KPI' and  node_key IN (SELECT id FROM orgstructure.kpi WHERE objective_id IN (SELECT id FROM orgstructure.objectives WHERE score_card_id=?))";
        String targetQuery = "delete FROM orgstructure.kpi_target_details WHERE kpi_id IN (SELECT id FROM orgstructure.kpi WHERE objective_id IN (SELECT id FROM orgstructure.objectives WHERE score_card_id=?))";
        this.jdbcTemplate.update(commentsQuery, new Object[]{scoreCardId});
        this.jdbcTemplate.update(elementQuery, new Object[]{scoreCardId});
        this.jdbcTemplate.update(targetQuery, new Object[]{scoreCardId});
    }
}

