/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ModulePrivillageMapping
 *  com.estrat.service.db.dao.BatchDAO
 *  com.estrat.service.db.dao.ModulePrivilegeMappingDAO
 *  com.estrat.service.db.exception.ExceptionLogHelper
 *  javax.persistence.EntityManager
 *  javax.persistence.PersistenceContext
 *  org.apache.log4j.Logger
 *  org.hibernate.Session
 *  org.hibernate.query.NativeQuery
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.dao.DataAccessException
 *  org.springframework.jdbc.core.JdbcTemplate
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.ModulePrivillageMapping;
import com.estrat.service.db.dao.BatchDAO;
import com.estrat.service.db.exception.ExceptionLogHelper;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class ModulePrivilegeMappingDAO {
    private Logger log = LoggerFactory.getLogger(BatchDAO.class);
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PersistenceContext
    private EntityManager entityManager;

    public Session getSession() {
        return (Session)this.entityManager.unwrap(Session.class);
    }

    public List<String> getModuleList() {
        String query = "SELECT DISTINCT module_name FROM orgstructure.module_details";
        List actionList = null;
        try {
            NativeQuery nativeQuery = this.getSession().createSQLQuery(query);
            actionList = nativeQuery.getResultList();
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)e)));
        }
        return actionList;
    }

    public List<String> getModuleTagList(String moduleName) {
        String query = "SELECT DISTINCT tag_name FROM orgstructure.module_details WHERE module_name =:moduleName";
        List actionList = null;
        try {
            NativeQuery nativeQuery = this.getSession().createSQLQuery(query);
            nativeQuery.setParameter("moduleName", (Object)moduleName);
            actionList = nativeQuery.getResultList();
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)e)));
        }
        return actionList;
    }

    public ModulePrivillageMapping getPrivilegesList(Long roleId, String moduleName, String tagName) {
        String query = "SELECT * FROM orgstructure.module_privilege_mapping WHERE role_id =:roleId AND module_name =:moduleName AND tag_name=:tagName";
        List actionList = null;
        try {
            NativeQuery nativeQuery = this.getSession().createSQLQuery(query);
            nativeQuery.setParameter("roleId", (Object)roleId);
            nativeQuery.setParameter("moduleName", (Object)moduleName);
            nativeQuery.setParameter("tagName", (Object)tagName);
            actionList = nativeQuery.getResultList();
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)e)));
        }
        return actionList == null || actionList.isEmpty() ? null : (ModulePrivillageMapping)actionList.get(0);
    }

    public List<String> getPrivilegesList(Long roleId, String moduleName) {
        String query = "SELECT privilege_name FROM  orgstructure.module_privilege_mapping WHERE role_id =:roleId AND module_name =:moduleName";
        List actionList = null;
        try {
            NativeQuery nativeQuery = this.getSession().createSQLQuery(query);
            nativeQuery.setParameter("roleId", (Object)roleId);
            nativeQuery.setParameter("moduleName", (Object)moduleName);
            actionList = nativeQuery.getResultList();
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)e)));
        }
        return actionList;
    }

    public List<Map<String, Object>> getDefaultRoles() {
        StringBuffer query = new StringBuffer("SELECT * FROM roles");
        List kpiDetailsList = null;
        try {
            kpiDetailsList = this.jdbcTemplate.queryForList(query.toString());
        }
        catch (DataAccessException e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public List<Map<String, Object>> getDefaultRoles(Long orgId) {
        ArrayList<Long> paramList = new ArrayList<Long>();
        StringBuffer query = new StringBuffer("SELECT role_id, role_name FROM  orgstructure.role_details WHERE type=0 AND ");
        query.append(" org_id =?  ");
        paramList.add(orgId);
        List mapList = null;
        try {
            mapList = this.jdbcTemplate.queryForList(query.toString(), paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return mapList;
    }

    public List<Map<String, Object>> getCustomRoles(Long orgId) {
        ArrayList<Long> paramList = new ArrayList<Long>();
        StringBuffer query = new StringBuffer("SELECT role_id, role_name FROM  orgstructure.role_details WHERE type=1 AND ");
        query.append(" org_id =?  ");
        paramList.add(orgId);
        List mapList = null;
        try {
            mapList = this.jdbcTemplate.queryForList(query.toString(), paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return mapList;
    }

    public Map<String, Object> getPrivilegesListMap(Long roleId, String moduleName, String tagName) {
        ArrayList<Object> paramList = new ArrayList<Object>();
        Map actionList = null;
        StringBuffer query = new StringBuffer("SELECT privilegeCreate,privilegeUpdate,privilegeView,privilegeDelete FROM orgstructure.module_privilege_mapping WHERE ");
        query.append(" role_id =?   AND");
        paramList.add(roleId);
        query.append(" module_name =?   AND");
        paramList.add(moduleName);
        query.append(" tag_name =?  ");
        paramList.add(tagName);
        try {
            actionList = this.jdbcTemplate.queryForMap(query.toString(), paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return actionList;
    }

    public List<Map<String, Object>> getPrivilegesListMap(Long roleId, String moduleName) {
        ArrayList<Object> paramList = new ArrayList<Object>();
        StringBuffer query = new StringBuffer("SELECT privilegeCreate,privilegeUpdate,privilegeView,privilegeDelete FROM orgstructure.module_privilege_mapping WHERE ");
        query.append(" role_id =?  AND");
        paramList.add(roleId);
        query.append(" module_name =?   ");
        paramList.add(moduleName);
        List mapList = null;
        try {
            mapList = this.jdbcTemplate.queryForList(query.toString(), paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error((Object)("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return mapList;
    }
}

