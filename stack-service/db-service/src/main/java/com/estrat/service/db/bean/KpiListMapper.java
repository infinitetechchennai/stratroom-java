/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.KpiListMapper
 *  com.estrat.service.db.dto.KpiList
 *  org.springframework.jdbc.core.RowMapper
 */
package com.estrat.service.db.bean;

import com.estrat.service.db.dto.KpiList;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class KpiListMapper
implements RowMapper<KpiList> {
    public KpiList mapRow(ResultSet rs, int i) throws SQLException {
        KpiList kpiList = new KpiList();
        kpiList.setId(rs.getLong("id"));
        kpiList.setName(rs.getString("name"));
        kpiList.setOrg(String.valueOf(rs.getLong("org")));
        kpiList.setScorecardId(Long.valueOf(rs.getLong("scorecardId")));
        return kpiList;
    }
}

