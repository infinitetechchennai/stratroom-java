/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.ChildParent
 *  com.estrat.backend.db.bean.ChildParentMapper
 *  org.springframework.jdbc.core.RowMapper
 */
package com.estrat.backend.db.bean;

import com.estrat.backend.db.bean.ChildParent;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.Objects;
import org.springframework.jdbc.core.RowMapper;

public class ChildParentMapper
implements RowMapper<ChildParent> {
    public ChildParent mapRow(ResultSet rs, int i) throws SQLException {
        ChildParent childParent = new ChildParent();
        childParent.setDeptId(rs.getLong("child_id"));
        if (Objects.nonNull(rs.getLong("parent_id"))) {
            childParent.setDeptParentId(rs.getLong("parent_id"));
        }
        if (Objects.nonNull(rs.getTimestamp("from_date"))) {
            childParent.setFromDate((Date)rs.getTimestamp("from_date"));
        }
        if (Objects.nonNull(rs.getTimestamp("to_date"))) {
            childParent.setToDate((Date)rs.getTimestamp("to_date"));
        }
        if (Objects.nonNull(rs.getLong("parent_id"))) {
            childParent.setDeptParentId(rs.getLong("parent_id"));
        }
        if (Objects.nonNull(rs.getString("immediateChildParentName"))) {
            childParent.setDeptImmediateParentName(rs.getString("immediateChildParentName"));
        }
        if (Objects.nonNull(rs.getLong("immediateChildParentId"))) {
            childParent.setDeptImmediateParentId(Long.valueOf(rs.getLong("immediateChildParentId")));
        }
        return childParent;
    }
}

