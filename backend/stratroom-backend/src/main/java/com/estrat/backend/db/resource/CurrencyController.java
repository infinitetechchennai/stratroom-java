/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.CurrencyDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.CurrencyController
 *  com.estrat.backend.db.service.CurrencyService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.db.resource;

import com.estrat.backend.db.dto.CurrencyDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.service.CurrencyService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrencyController {
    @Autowired
    private CurrencyService currencyService;

    @PostMapping(value={"/saveAllCurrency"})
    public ResponseEntity<Boolean> saveActivitiesAndTasksDetails(@RequestBody Map<String, Object> currencyMap) throws RequestException {
        this.currencyService.bulkSaveCurrency(currencyMap);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/currencyList"})
    public ResponseEntity<List<CurrencyDTO>> currencyList() throws RequestException {
        return new ResponseEntity((Object)this.currencyService.getCurrencyList(), HttpStatus.OK);
    }
}

