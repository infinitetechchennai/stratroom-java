package com.estrat.backend.db.scv2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Map;
@RestController
public class TestController2 {
  private final JdbcTemplate jdbc;
  public TestController2(JdbcTemplate jdbc) { this.jdbc = jdbc; }
  @GetMapping("/testdb2")
  public List<Map<String, Object>> testdb2() {
    return jdbc.queryForList("SELECT id, name, code, target_value FROM sc_kpis WHERE name LIKE '%Forecast%'");
  }
}
