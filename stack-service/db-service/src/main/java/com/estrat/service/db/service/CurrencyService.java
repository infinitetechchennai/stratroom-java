/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.CurrencyDetailsPo
 *  com.estrat.service.db.dto.CurrencyDTO
 *  com.estrat.service.db.repository.CurrencyRepository
 *  com.estrat.service.db.service.CurrencyService
 *  javax.transaction.Transactional
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.CurrencyDetailsPo;
import com.estrat.service.db.dto.CurrencyDTO;
import com.estrat.service.db.repository.CurrencyRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class CurrencyService {
    @Autowired
    private CurrencyRepository currencyRepository;

    public void bulkSaveCurrency(Map<String, Object> currencyMap) {
        for (String key : currencyMap.keySet()) {
            Map subMap = (Map)currencyMap.get(key);
            CurrencyDetailsPo currencyDetailsPo = new CurrencyDetailsPo();
            currencyDetailsPo.setCurrencyCode(subMap.get("code").toString());
            currencyDetailsPo.setCurrencyName(subMap.get("name_plural").toString());
            currencyDetailsPo.setCurrencySymbol(subMap.get("symbol").toString());
            currencyDetailsPo.setNativeSymbol(subMap.get("symbol_native").toString());
            currencyDetailsPo.setDecimalDigits(((Integer)subMap.get("decimal_digits")).intValue());
            currencyDetailsPo.setRounding(new BigDecimal(subMap.get("rounding").toString()).doubleValue());
            this.currencyRepository.save(currencyDetailsPo);
        }
    }

    public List<CurrencyDTO> getCurrencyList() {
        List currencyDetailsPos = this.currencyRepository.findAll();
        return currencyDetailsPos.stream().map(currency -> new CurrencyDTO(currency)).collect(Collectors.toList());
    }
}

