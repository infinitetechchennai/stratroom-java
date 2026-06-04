/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.TaskDetails
 *  com.estrat.service.db.dao.TaskDetailsRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.data.jpa.repository.Query
 *  org.springframework.data.repository.query.Param
 *  org.springframework.stereotype.Repository
 */
package com.estrat.service.db.dao;

import com.estrat.service.db.bean.po.TaskDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskDetailsRepository
extends JpaRepository<TaskDetails, Long> {
    @Query(value="SELECT t FROM TaskDetails t WHERE t.taskCategoryId = :categoryId")
    public List<TaskDetails> findAllByTaskCategoryId(@Param(value="categoryId") Long var1);
}

