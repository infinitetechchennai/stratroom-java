/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.dto.ScorecardList
 */
package com.estrat.backend.scorecard.dto;

public class ScorecardList {
    private long id;
    private String name;
    private Long org;
    private Long pageId;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getOrg() {
        return this.org;
    }

    public void setOrg(Long org) {
        this.org = org;
    }

    public Long getPageId() {
        return this.pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }
}

