package com.estrat.backend.db.scv2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Map;
@RestController
public class TestController {
  private final JdbcTemplate jdbc;
  public TestController(JdbcTemplate jdbc) { this.jdbc = jdbc; }
  @GetMapping("/testdb")
  public List<Map<String, Object>> testdb() {
    return jdbc.queryForList("SELECT kpi_id, period_start, actual_value FROM sc_kpi_history WHERE kpi_id = 111 OR actual_value IN (55, 60, 58) ORDER BY kpi_id, period_start LIMIT 50");
  }
}
