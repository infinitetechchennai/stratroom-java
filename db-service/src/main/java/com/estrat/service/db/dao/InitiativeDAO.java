/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dao.InitiativeDAO
 *  com.estrat.service.db.dao.KPIDAO
 *  com.estrat.service.db.exception.ExceptionLogHelper
 *  javax.persistence.EntityManager
 *  javax.persistence.PersistenceContext
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.log4j.Logger
 *  org.hibernate.Session
 *  org.hibernate.query.NativeQuery
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.dao.DataAccessException
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.dao.KPIDAO;
import com.estrat.service.db.exception.ExceptionLogHelper;
import java.util.Collection;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.DataAccessException;

@Configuration
public class InitiativeDAO {
    private Logger log = Logger.getLogger(KPIDAO.class);
    @PersistenceContext
    private EntityManager entityManager;

    public Session getSession() {
        return (Session)this.entityManager.unwrap(Session.class);
    }

    public String getMaxId(Long empId, String prefix) {
        String query = "SELECT COALESCE(MAX(CAST(SUBSTRING(initiative_id, LENGTH(:prefix) + 1) AS UNSIGNED)), 0) + 1 FROM orgstructure.initiatives_details WHERE created_by = :empId AND initiative_id LIKE CONCAT(:prefix, '%')";
        String maxId = null;
        try {
            NativeQuery nativeQuery = this.getSession().createNativeQuery(query);
            nativeQuery.setParameter("empId", (Object)empId);
            nativeQuery.setParameter("prefix", (Object)prefix.toUpperCase());
            maxId = nativeQuery.uniqueResult().toString();
            this.log.info((Object)("maxId " + maxId));
        }
        catch (DataAccessException e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return maxId;
    }

    public boolean checkIdExist(Long empId, String initiativeId) {
        String query = "SELECT initiative_id FROM orgstructure.initiatives_details WHERE created_by = ? AND initiative_id = ?";
        boolean flag = false;
        try {
            NativeQuery nativeQuery = this.getSession().createNativeQuery(query);
            nativeQuery.setParameter(1, (Object)empId);
            nativeQuery.setParameter(2, (Object)initiativeId);
            List idList = nativeQuery.list();
            this.log.info((Object)("idList " + idList));
            if (CollectionUtils.isNotEmpty((Collection)idList)) {
                flag = true;
            }
        }
        catch (DataAccessException e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return flag;
    }
}

