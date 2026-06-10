/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.ChildParentEmp
 *  com.estrat.service.db.bean.ChildParentEmpMapper
 *  org.springframework.jdbc.core.RowMapper
 */
package com.estrat.service.db.bean;

import com.estrat.service.db.bean.ChildParentEmp;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.Objects;
import org.springframework.jdbc.core.RowMapper;

public class ChildParentEmpMapper
implements RowMapper<ChildParentEmp> {
    public ChildParentEmp mapRow(ResultSet rs, int i) throws SQLException {
        ChildParentEmp childParent = new ChildParentEmp();
        childParent.setEmpId(rs.getLong("child_id"));
        childParent.setEmpParentId(rs.getLong("parent_id"));
        if (Objects.nonNull(rs.getTimestamp("from_date"))) {
            childParent.setFromDate((Date)rs.getTimestamp("from_date"));
        }
        if (Objects.nonNull(rs.getTimestamp("to_date"))) {
            childParent.setToDate((Date)rs.getTimestamp("to_date"));
        }
        if (Objects.nonNull(rs.getString("immediateChildParentName"))) {
            childParent.setEmpImmediateParentName(rs.getString("immediateChildParentName"));
        }
        if (Objects.nonNull(rs.getLong("immediateChildParentId"))) {
            childParent.setEmpImmediateParentId(Long.valueOf(rs.getLong("immediateChildParentId")));
        }
        return childParent;
    }
}

