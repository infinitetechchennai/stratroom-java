-- ============================================================
-- SCORECARD V2 ACTUALS MIGRATION
-- Populates sc_kpi_history (actual / target / baseline per period) from the
-- legacy org_kpi_details time-series.
--   org_kpi_details.org_kpi_id = kpi.id (legacy) -> sc_kpis.legacy_kpi_id
--   mtd_actual  -> actual_value
--   mtd_target  -> target_value
--   rolling_12_actual -> baseline_value
-- Values are varchar in the source; only numeric ones are taken.
-- Re-runnable via ON DUPLICATE KEY UPDATE on (kpi_id, period_start, period_end).
-- ============================================================

INSERT INTO sc_kpi_history (kpi_id, period_start, period_end, actual_value, target_value, baseline_value)
SELECT
    sk.id,
    d.real_date_from,
    d.real_date_to,
    CASE WHEN d.mtd_actual REGEXP '^-?[0-9]+(\\.[0-9]+)?$'        THEN CAST(d.mtd_actual AS DECIMAL(18,4)) END,
    CASE WHEN d.mtd_target REGEXP '^-?[0-9]+(\\.[0-9]+)?$'        THEN CAST(d.mtd_target AS DECIMAL(18,4)) END,
    CASE WHEN d.rolling_12_actual REGEXP '^-?[0-9]+(\\.[0-9]+)?$' THEN CAST(d.rolling_12_actual AS DECIMAL(18,4)) END
FROM org_kpi_details d
JOIN kpi lk     ON lk.id = d.org_kpi_id
JOIN sc_kpis sk ON sk.legacy_kpi_id = lk.id
WHERE d.real_date_from IS NOT NULL
  AND d.real_date_to IS NOT NULL
ON DUPLICATE KEY UPDATE
    actual_value   = VALUES(actual_value),
    target_value   = VALUES(target_value),
    baseline_value = VALUES(baseline_value);

-- Also lift the KPI's headline target_value from its most recent period target,
-- so KPIs still show a sensible target even outside a specific period view.
UPDATE sc_kpis sk
JOIN (
    SELECT h.kpi_id, h.target_value
    FROM sc_kpi_history h
    JOIN (SELECT kpi_id, MAX(period_end) max_end FROM sc_kpi_history GROUP BY kpi_id) m
      ON m.kpi_id = h.kpi_id AND m.max_end = h.period_end
) latest ON latest.kpi_id = sk.id
SET sk.target_value = COALESCE(latest.target_value, sk.target_value)
WHERE latest.target_value IS NOT NULL;
