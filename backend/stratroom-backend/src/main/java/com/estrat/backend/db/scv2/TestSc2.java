package com.estrat.backend.db.scv2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Map;
@Component
public class TestSc2 implements CommandLineRunner {
  private final JdbcTemplate jdbc;
  public TestSc2(JdbcTemplate jdbc) { this.jdbc = jdbc; }
  @Override
  public void run(String... args) throws Exception {
    List<Map<String, Object>> rows = jdbc.queryForList("SELECT kpi_id, period_start, actual_value FROM sc_kpi_history WHERE actual_value IN (55, 60, 58) ORDER BY kpi_id, period_start");
    for (Map<String, Object> r : rows) {
      System.out.println("KPI: " + r.get("kpi_id") + " START: " + r.get("period_start") + " ACTUAL: " + r.get("actual_value"));
    }
  }
}
