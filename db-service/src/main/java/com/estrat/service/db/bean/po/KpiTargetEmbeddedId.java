/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.KpiTargetEmbeddedId
 *  javax.persistence.Column
 *  javax.persistence.Embeddable
 */
package com.estrat.service.db.bean.po;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class KpiTargetEmbeddedId
implements Serializable {
    @Column(name="kpi_id")
    private long kpiId;
    @Column(name="year")
    private long year;

    public long getKpiId() {
        return this.kpiId;
    }

    public void setKpiId(long kpiId) {
        this.kpiId = kpiId;
    }

    public long getYear() {
        return this.year;
    }

    public void setYear(long year) {
        this.year = year;
    }

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KpiTargetEmbeddedId)) {
            return false;
        }
        KpiTargetEmbeddedId that = (KpiTargetEmbeddedId)o;
        return Objects.equals(this.getKpiId(), that.getKpiId()) && Objects.equals(this.getYear(), that.getYear());
    }

    public int hashCode() {
        return Objects.hash(this.getKpiId(), this.getYear());
    }
}

