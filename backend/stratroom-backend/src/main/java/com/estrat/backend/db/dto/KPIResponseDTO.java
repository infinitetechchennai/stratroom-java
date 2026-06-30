package com.estrat.backend.db.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class KPIResponseDTO {
    private List<KPIDTO> kpidtoList;
    private List<SubKPIDTO> subkpidtoList;
    private Map<String, Object> values;

    public List<KPIDTO> getKpidtoList() {
        return kpidtoList;
    }

    public void setKpidtoList(List<KPIDTO> kpidtoList) {
        this.kpidtoList = kpidtoList;
    }

    public List<SubKPIDTO> getSubkpidtoList() {
        return subkpidtoList;
    }

    public void setSubkpidtoList(List<SubKPIDTO> subkpidtoList) {
        this.subkpidtoList = subkpidtoList;
    }

    public Map<String, Object> getValues() {
        return values;
    }

    public void setValues(Map<String, Object> values) {
        this.values = values;
    }
}
