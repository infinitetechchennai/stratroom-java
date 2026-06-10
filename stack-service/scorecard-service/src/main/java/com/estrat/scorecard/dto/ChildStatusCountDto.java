/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.ChildStatusCountDto
 *  com.estrat.scorecard.dto.InitiativesDTO
 *  com.estrat.scorecard.dto.KPIDTO
 *  com.fasterxml.jackson.annotation.JsonInclude
 *  com.fasterxml.jackson.annotation.JsonInclude$Include
 */
package com.estrat.scorecard.dto;

import com.estrat.scorecard.dto.InitiativesDTO;
import com.estrat.scorecard.dto.KPIDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(value=JsonInclude.Include.NON_NULL)
public class ChildStatusCountDto {
    private Long id;
    private String childName;
    private long parentId;
    private Long red;
    private List<KPIDTO> redKpi;
    private List<KPIDTO> amberKpi;
    private List<KPIDTO> greenKpi;
    private List<KPIDTO> lightredKpi;
    private List<KPIDTO> lightgreenKpi;
    private List<InitiativesDTO> redInitiative;
    private List<InitiativesDTO> greenInitiative;
    private List<InitiativesDTO> amberInitiative;
    private Long amber;
    private Long green;
    private Long lightred;
    private Long lightgreen;
    private Long inProgress;
    private Long completed;
    private Long blankkpi;
    private Long blankinitiativecount;
    private List<InitiativesDTO> blankinitiative;
    private List<KPIDTO> blankpiList;
    private List<KPIDTO> kpi;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChildName() {
        return this.childName;
    }

    public void setChildName(String childName) {
        this.childName = childName;
    }

    public Long getRed() {
        return this.red;
    }

    public void setRed(Long red) {
        this.red = red;
    }

    public Long getAmber() {
        return this.amber;
    }

    public void setAmber(Long amber) {
        this.amber = amber;
    }

    public Long getGreen() {
        return this.green;
    }

    public void setGreen(Long green) {
        this.green = green;
    }

    public long getParentId() {
        return this.parentId;
    }

    public void setParentId(long parentId) {
        this.parentId = parentId;
    }

    public Long getInProgress() {
        return this.inProgress;
    }

    public void setInProgress(Long inProgress) {
        this.inProgress = inProgress;
    }

    public Long getCompleted() {
        return this.completed;
    }

    public void setCompleted(Long completed) {
        this.completed = completed;
    }

    public Long getBlankkpi() {
        return this.blankkpi;
    }

    public void setBlankkpi(Long blankkpi) {
        this.blankkpi = blankkpi;
    }

    public Long getLightred() {
        return this.lightred;
    }

    public void setLightred(Long lightred) {
        this.lightred = lightred;
    }

    public Long getLightgreen() {
        return this.lightgreen;
    }

    public void setLightgreen(Long lightgreen) {
        this.lightgreen = lightgreen;
    }

    public List<KPIDTO> getKpi() {
        return this.kpi;
    }

    public void setKpi(List<KPIDTO> kpi) {
        this.kpi = kpi;
    }

    public Long getBlankinitiativecount() {
        return this.blankinitiativecount;
    }

    public void setBlankinitiativecount(Long blankinitiativecount) {
        this.blankinitiativecount = blankinitiativecount;
    }

    public List<KPIDTO> getRedKpi() {
        return this.redKpi;
    }

    public void setRedKpi(List<KPIDTO> redKpi) {
        this.redKpi = redKpi;
    }

    public List<KPIDTO> getAmberKpi() {
        return this.amberKpi;
    }

    public void setAmberKpi(List<KPIDTO> amberKpi) {
        this.amberKpi = amberKpi;
    }

    public List<KPIDTO> getGreenKpi() {
        return this.greenKpi;
    }

    public void setGreenKpi(List<KPIDTO> greenKpi) {
        this.greenKpi = greenKpi;
    }

    public List<KPIDTO> getLightredKpi() {
        return this.lightredKpi;
    }

    public void setLightredKpi(List<KPIDTO> lightredKpi) {
        this.lightredKpi = lightredKpi;
    }

    public List<KPIDTO> getLightgreenKpi() {
        return this.lightgreenKpi;
    }

    public void setLightgreenKpi(List<KPIDTO> lightgreenKpi) {
        this.lightgreenKpi = lightgreenKpi;
    }

    public List<InitiativesDTO> getRedInitiative() {
        return this.redInitiative;
    }

    public void setRedInitiative(List<InitiativesDTO> redInitiative) {
        this.redInitiative = redInitiative;
    }

    public List<InitiativesDTO> getGreenInitiative() {
        return this.greenInitiative;
    }

    public void setGreenInitiative(List<InitiativesDTO> greenInitiative) {
        this.greenInitiative = greenInitiative;
    }

    public List<InitiativesDTO> getAmberInitiative() {
        return this.amberInitiative;
    }

    public void setAmberInitiative(List<InitiativesDTO> amberInitiative) {
        this.amberInitiative = amberInitiative;
    }

    public List<InitiativesDTO> getBlankinitiative() {
        return this.blankinitiative;
    }

    public void setBlankinitiative(List<InitiativesDTO> blankinitiative) {
        this.blankinitiative = blankinitiative;
    }

    public List<KPIDTO> getBlankpiList() {
        return this.blankpiList;
    }

    public void setBlankpiList(List<KPIDTO> blankpiList) {
        this.blankpiList = blankpiList;
    }
}

