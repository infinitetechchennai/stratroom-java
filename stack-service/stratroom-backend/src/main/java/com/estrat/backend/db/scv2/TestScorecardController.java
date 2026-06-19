package com.estrat.backend.db.scv2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class TestScorecardController {

    @Autowired
    private ScorecardCalculationService service;

    @GetMapping("/testScorecardV2/{pageId}")
    public Map<String, Object> testGet(@PathVariable Long pageId, @RequestParam(required = false) String dateRange) {
        return service.calculateByPage(pageId, dateRange);
    }
}
