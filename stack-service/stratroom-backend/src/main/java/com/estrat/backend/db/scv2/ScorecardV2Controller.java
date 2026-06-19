package com.estrat.backend.db.scv2;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Scorecard V2 endpoints (the gold-standard calculation engine over the sc_
 * schema). All paths live under /scorecardV2/** so they never collide with the
 * existing legacy ScoreCardController mappings. With the backend context-path
 * /api, the React app calls these at /api/scorecardV2/**.
 */
@RestController
public class ScorecardV2Controller {

    private final ScorecardCalculationService calculationService;
    private final ScorecardCrudService crudService;

    @Autowired
    public ScorecardV2Controller(ScorecardCalculationService calculationService,
                                 ScorecardCrudService crudService) {
        this.calculationService = calculationService;
        this.crudService = crudService;
    }

    // -------- primary load (calculation) --------

    @GetMapping("/scorecardV2/{pageId}")
    public ResponseEntity<Map<String, Object>> getScorecard(
            @PathVariable("pageId") Long pageId,
            @RequestParam(value = "dateRange", required = false) String dateRange) {
        return ResponseEntity.ok(calculationService.calculateByPage(pageId, dateRange));
    }

    // KPI story-card detail (header + monthly actual/target history) from the sc_ schema
    @GetMapping("/scorecardV2/kpi/{id}/storycard")
    public ResponseEntity<Map<String, Object>> kpiStoryCard(
            @PathVariable("id") Long id,
            @RequestParam(value = "dateRange", required = false) String dateRange) {
        return ResponseEntity.ok(calculationService.kpiStoryCard(id, dateRange));
    }

    // List of measures for the formula calculators
    @GetMapping("/scorecardV2/retrieveNodeKeyList")
    public ResponseEntity<List<Map<String, Object>>> retrieveNodeKeyList(
            @RequestParam("pageId") Long pageId,
            @RequestParam(value = "dateRange", required = false) String dateRange,
            @RequestParam(value = "nodeType", required = false) String nodeType,
            @RequestParam(value = "nodeId", required = false) String nodeId) {
        return ResponseEntity.ok(calculationService.retrieveNodeKeyList(pageId, dateRange, nodeType, nodeId));
    }

    // -------- scorecard CRUD --------

    @PostMapping("/scorecardV2/scorecard")
    public ResponseEntity<Map<String, Object>> createScorecard(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(idResult(crudService.createScorecard(body)));
    }

    @PutMapping("/scorecardV2/scorecard/{id}")
    public ResponseEntity<Map<String, Object>> updateScorecard(@PathVariable long id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(okResult(crudService.updateScorecard(id, body)));
    }

    @DeleteMapping("/scorecardV2/scorecard/{id}")
    public ResponseEntity<Map<String, Object>> deleteScorecard(@PathVariable long id) {
        return ResponseEntity.ok(okResult(crudService.deleteScorecard(id)));
    }

    // -------- perspective CRUD --------

    @PostMapping("/scorecardV2/perspective")
    public ResponseEntity<Map<String, Object>> createPerspective(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(idResult(crudService.createPerspective(body)));
    }

    @PutMapping("/scorecardV2/perspective/{id}")
    public ResponseEntity<Map<String, Object>> updatePerspective(@PathVariable long id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(okResult(crudService.updatePerspective(id, body)));
    }

    @DeleteMapping("/scorecardV2/perspective/{id}")
    public ResponseEntity<Map<String, Object>> deletePerspective(@PathVariable long id) {
        return ResponseEntity.ok(okResult(crudService.deletePerspective(id)));
    }

    // -------- objective CRUD --------

    @PostMapping("/scorecardV2/objective")
    public ResponseEntity<Map<String, Object>> createObjective(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(idResult(crudService.createObjective(body)));
    }

    @PutMapping("/scorecardV2/objective/{id}")
    public ResponseEntity<Map<String, Object>> updateObjective(@PathVariable long id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(okResult(crudService.updateObjective(id, body)));
    }

    @DeleteMapping("/scorecardV2/objective/{id}")
    public ResponseEntity<Map<String, Object>> deleteObjective(@PathVariable long id) {
        return ResponseEntity.ok(okResult(crudService.deleteObjective(id)));
    }

    // -------- KPI CRUD --------

    @PostMapping("/scorecardV2/kpi")
    public ResponseEntity<Map<String, Object>> createKpi(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(idResult(crudService.createKpi(body)));
    }

    @PutMapping("/scorecardV2/kpi/{id}")
    public ResponseEntity<Map<String, Object>> updateKpi(@PathVariable long id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(okResult(crudService.updateKpi(id, body)));
    }

    @DeleteMapping("/scorecardV2/kpi/{id}")
    public ResponseEntity<Map<String, Object>> deleteKpi(@PathVariable long id) {
        return ResponseEntity.ok(okResult(crudService.deleteKpi(id)));
    }

    // -------- sub-KPI CRUD --------

    @PostMapping("/scorecardV2/subkpi")
    public ResponseEntity<Map<String, Object>> createSubKpi(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(idResult(crudService.createSubKpi(body)));
    }

    @PutMapping("/scorecardV2/subkpi/{id}")
    public ResponseEntity<Map<String, Object>> updateSubKpi(@PathVariable long id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(okResult(crudService.updateSubKpi(id, body)));
    }

    @DeleteMapping("/scorecardV2/subkpi/{id}")
    public ResponseEntity<Map<String, Object>> deleteSubKpi(@PathVariable long id) {
        return ResponseEntity.ok(okResult(crudService.deleteSubKpi(id)));
    }

    // -------- actuals --------

    @PostMapping("/scorecardV2/kpi/actual")
    public ResponseEntity<Map<String, Object>> recordKpiActual(@RequestBody Map<String, Object> body) {
        crudService.recordKpiActual(body);
        return ResponseEntity.ok(okResult(true));
    }

    @PostMapping("/scorecardV2/subkpi/actual")
    public ResponseEntity<Map<String, Object>> recordSubKpiActual(@RequestBody Map<String, Object> body) {
        crudService.recordSubKpiActual(body);
        return ResponseEntity.ok(okResult(true));
    }

    // Bulk Actual/Target import from an uploaded scorecard Excel (matched by KPI code).
    @PostMapping("/scorecardV2/import/actuals")
    public ResponseEntity<Map<String, Object>> importActuals(
            @RequestParam("pageId") Long pageId,
            @RequestParam(value = "dateRange", required = false) String dateRange,
            @RequestBody List<Map<String, Object>> rows) {
        return ResponseEntity.ok(crudService.importActuals(pageId, dateRange, rows));
    }

    // -------- response helpers --------

    private Map<String, Object> idResult(long id) {
        Map<String, Object> m = new java.util.LinkedHashMap<>();
        m.put("flag", id > 0);
        m.put("id", id);
        return m;
    }

    private Map<String, Object> okResult(boolean ok) {
        return Collections.singletonMap("flag", ok);
    }
}
