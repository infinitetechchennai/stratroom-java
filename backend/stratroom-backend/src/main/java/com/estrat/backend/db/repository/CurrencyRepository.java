/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.CurrencyDetailsPo
 *  com.estrat.backend.db.repository.CurrencyRepository
 *  org.springframework.data.jpa.repository.JpaRepository
 *  org.springframework.stereotype.Repository
 */
package com.estrat.backend.db.repository;

import com.estrat.backend.db.bean.po.CurrencyDetailsPo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyRepository
extends JpaRepository<CurrencyDetailsPo, String> {
}

