/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.BatchDetailsPo
 *  com.estrat.backend.db.dao.BatchDAO
 *  com.estrat.backend.db.dto.KPIDetailsDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  javax.persistence.EntityManager
 *  javax.persistence.PersistenceContext
 *  org.apache.log4j.Logger
 *  org.hibernate.Session
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.jdbc.core.JdbcTemplate
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.po.BatchDetailsPo;
import com.estrat.backend.db.dto.KPIDetailsDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import java.time.LocalDateTime;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class BatchDAO {
    private Logger log = Logger.getLogger(BatchDAO.class);
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PersistenceContext
    private EntityManager entityManager;

    public Session getSession() {
        return (Session)this.entityManager.unwrap(Session.class);
    }

    public long createBatch(String batchName) {
        BatchDetailsPo batchDetailsPo = new BatchDetailsPo();
        batchDetailsPo.setUploadedBy(Long.valueOf(UserThreadLocal.get()).longValue());
        batchDetailsPo.setCreatedTime(LocalDateTime.now());
        batchDetailsPo.setUpdatedTime(LocalDateTime.now());
        batchDetailsPo.setBatchName(batchName);
        return (Long)this.getSession().save(batchDetailsPo);
    }

    public void createErrorRecords(KPIDetailsDTO kpiDetailsDTO) {
        try {
            String query = "insert into batch_error_details (batch_id,batch_name,template_type,metric_code,org_name,email_address,real_date_from,real_date_to,month_year,financial_month,mtd_actual,mtd_target,rolling12_actual,rolling12_budget,node_key,measure_name,type,currency,cause_of_failure,target_year,uploaded_by) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ";
            Object[] inArray = new Object[]{kpiDetailsDTO.getBatchId(), UserThreadLocal.get((String)"BATCH_NAME"), kpiDetailsDTO.getTemplateType(), kpiDetailsDTO.getMetricCode(), kpiDetailsDTO.getOrganizationName(), kpiDetailsDTO.getEmailAddress(), kpiDetailsDTO.getRealDateFrom(), kpiDetailsDTO.getRealDateTo(), kpiDetailsDTO.getMonthYear(), kpiDetailsDTO.getFinancialMonth(), kpiDetailsDTO.getMtdActual(), kpiDetailsDTO.getMtdTarget(), kpiDetailsDTO.getRolling12Actual(), kpiDetailsDTO.getRolling12Budget(), kpiDetailsDTO.getNodeKey(), kpiDetailsDTO.getMeasureName(), kpiDetailsDTO.getType(), kpiDetailsDTO.getCurrency(), kpiDetailsDTO.getCauseOfFailure(), kpiDetailsDTO.getTargetYear(), UserThreadLocal.get()};
            this.jdbcTemplate.update(query, inArray);
        }
        catch (Exception e) {
            this.log.error((Object)"Exception while creating batch error records ", (Throwable)e);
        }
    }

    public void deleteExistingBatchRecords() {
        String deleteQuery = "delete from batch_error_details where uploaded_by=? and batch_name=?";
        this.jdbcTemplate.update(deleteQuery, new Object[]{UserThreadLocal.get(), UserThreadLocal.get((String)"BATCH_NAME")});
    }
}

