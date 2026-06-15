-- ============================================================
-- SCORECARD V2 DATA MIGRATION  (legacy blob tables -> sc_ schema)
--
-- Hierarchy mapping (confirmed from the data):
--   score_card_details  ->  sc_scorecards     (the page-level scorecard)
--   score_card          ->  sc_perspectives   (legacy "score_card" = a perspective)
--   objectives          ->  sc_objectives
--   kpi                 ->  sc_kpis
--   subkpi              ->  sc_sub_kpis
--
-- Attribute values are pulled out of the JSON stored in the *_val / *_value
-- LONGBLOB columns using JSON_EXTRACT (guarded by JSON_VALID).
-- Only legacy rows with active=0 (the app's "active" flag) are migrated.
--
-- Re-runnable: every INSERT is guarded with NOT EXISTS on the legacy_* link,
-- so running twice will not create duplicates.
-- ============================================================

-- ------------------------------------------------------------
-- 1) sc_scorecards  <-  score_card_details
-- ------------------------------------------------------------
INSERT INTO sc_scorecards
    (page_id, name, description, owner_id, department_id,
     classification_type, is_active, is_deleted, legacy_details_id,
     created_by, created_at)
SELECT
    COALESCE(d.page_id, 0),
    COALESCE(NULLIF(d.score_name, ''),
             CASE WHEN JSON_VALID(CAST(d.score_card_details_val AS CHAR))
                  THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(d.score_card_details_val AS CHAR), '$.name')) END,
             'Scorecard'),
    CASE WHEN JSON_VALID(CAST(d.score_card_details_val AS CHAR))
         THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(d.score_card_details_val AS CHAR), '$.description')) END,
    COALESCE(d.owner, 0),
    d.department_id,
    'THREE_COLOR', 1, 0, d.ID,
    COALESCE(d.created_by, 0),
    COALESCE(d.created_Time, NOW())
FROM score_card_details d
WHERE d.active = 0
  AND NOT EXISTS (SELECT 1 FROM sc_scorecards s WHERE s.legacy_details_id = d.ID);

-- ------------------------------------------------------------
-- 2) sc_perspectives  <-  score_card   (joined to its scorecard via scoreCardDetailsId)
-- ------------------------------------------------------------
INSERT INTO sc_perspectives
    (scorecard_id, code, name, description, display_order, weight,
     aggregation_method, classification_type, is_active, legacy_scorecard_id, created_at)
SELECT
    s.id,
    sc.perspective_id,
    COALESCE(CASE WHEN JSON_VALID(CAST(sc.score_card_val AS CHAR))
                  THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(sc.score_card_val AS CHAR), '$.name')) END,
             NULLIF(sc.score_name, ''), 'Perspective'),
    CASE WHEN JSON_VALID(CAST(sc.score_card_val AS CHAR))
         THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(sc.score_card_val AS CHAR), '$.description')) END,
    COALESCE(sc.perspective_id_seq, 0),
    0,
    'WEIGHTED', 'THREE_COLOR', 1, sc.id,
    COALESCE(sc.created_time, NOW())
FROM score_card sc
JOIN sc_scorecards s ON s.legacy_details_id = sc.scoreCardDetailsId
WHERE sc.active = 0
  AND NOT EXISTS (SELECT 1 FROM sc_perspectives p WHERE p.legacy_scorecard_id = sc.id);

-- ------------------------------------------------------------
-- 3) sc_objectives  <-  objectives
-- ------------------------------------------------------------
INSERT INTO sc_objectives
    (perspective_id, code, name, description, display_order, weight,
     aggregation_method, classification_type, is_active, legacy_objective_id, created_at)
SELECT
    p.id,
    o.objectives_id,
    COALESCE(CASE WHEN JSON_VALID(CAST(o.objectives_val AS CHAR))
                  THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(o.objectives_val AS CHAR), '$.name')) END,
             'Objective'),
    CASE WHEN JSON_VALID(CAST(o.objectives_val AS CHAR))
         THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(o.objectives_val AS CHAR), '$.description')) END,
    COALESCE(o.objective_id_seq, 0),
    CASE WHEN JSON_VALID(CAST(o.objectives_val AS CHAR))
          AND JSON_UNQUOTE(JSON_EXTRACT(CAST(o.objectives_val AS CHAR), '$.weight')) REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
         THEN CAST(JSON_UNQUOTE(JSON_EXTRACT(CAST(o.objectives_val AS CHAR), '$.weight')) AS DECIMAL(7,2))
         ELSE 0 END,
    COALESCE(CASE WHEN JSON_VALID(CAST(o.objectives_val AS CHAR))
                  THEN UPPER(JSON_UNQUOTE(JSON_EXTRACT(CAST(o.objectives_val AS CHAR), '$.status'))) END,
             'WEIGHTED'),
    'THREE_COLOR', 1, o.id,
    COALESCE(o.created_time, NOW())
FROM objectives o
JOIN sc_perspectives p ON p.legacy_scorecard_id = o.score_card_id
WHERE o.active = 0
  AND NOT EXISTS (SELECT 1 FROM sc_objectives x WHERE x.legacy_objective_id = o.id);

-- ------------------------------------------------------------
-- 4) sc_kpis  <-  kpi
-- ------------------------------------------------------------
INSERT INTO sc_kpis
    (objective_id, code, name, description, polarity, target_value, data_type,
     weight, measurement_frequency, classification_type, display_order,
     is_deleted, legacy_kpi_id, created_at)
SELECT
    o.id,
    k.kpi_id,
    COALESCE(CASE WHEN JSON_VALID(CAST(k.kpi_value AS CHAR))
                  THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(k.kpi_value AS CHAR), '$.name')) END,
             NULLIF(k.kpi_name, ''), 'KPI'),
    CASE WHEN JSON_VALID(CAST(k.kpi_value AS CHAR))
         THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(k.kpi_value AS CHAR), '$.description')) END,
    'HIGHER',
    CASE WHEN JSON_VALID(CAST(k.kpi_value AS CHAR))
          AND JSON_UNQUOTE(JSON_EXTRACT(CAST(k.kpi_value AS CHAR), '$.target')) REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
         THEN CAST(JSON_UNQUOTE(JSON_EXTRACT(CAST(k.kpi_value AS CHAR), '$.target')) AS DECIMAL(18,4))
         ELSE 0 END,
    COALESCE(CASE WHEN JSON_VALID(CAST(k.kpi_value AS CHAR))
                  THEN UPPER(JSON_UNQUOTE(JSON_EXTRACT(CAST(k.kpi_value AS CHAR), '$.dataType'))) END,
             'NUMBER'),
    CASE WHEN JSON_VALID(CAST(k.kpi_value AS CHAR))
          AND JSON_UNQUOTE(JSON_EXTRACT(CAST(k.kpi_value AS CHAR), '$.weight')) REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
         THEN CAST(JSON_UNQUOTE(JSON_EXTRACT(CAST(k.kpi_value AS CHAR), '$.weight')) AS DECIMAL(7,2))
         ELSE 0 END,
    CASE WHEN JSON_VALID(CAST(k.kpi_value AS CHAR))
         THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(k.kpi_value AS CHAR), '$.kpi_measurement')) END,
    'THREE_COLOR',
    COALESCE(k.kpi_id_sequence, 0),
    0, k.id,
    COALESCE(k.created_time, NOW())
FROM kpi k
JOIN sc_objectives o ON o.legacy_objective_id = k.objective_id
WHERE k.active = 0
  AND NOT EXISTS (SELECT 1 FROM sc_kpis x WHERE x.legacy_kpi_id = k.id);

-- ------------------------------------------------------------
-- 5) sc_sub_kpis  <-  subkpi
-- ------------------------------------------------------------
INSERT INTO sc_sub_kpis
    (kpi_id, code, name, target_value, polarity, weight, data_type,
     display_order, is_deleted, legacy_subkpi_id, created_at)
SELECT
    k.id,
    sk.subkpi_id,
    COALESCE(CASE WHEN JSON_VALID(CAST(sk.subkpi_value AS CHAR))
                  THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(sk.subkpi_value AS CHAR), '$.name')) END,
             CASE WHEN JSON_VALID(CAST(sk.subkpi_value AS CHAR))
                  THEN JSON_UNQUOTE(JSON_EXTRACT(CAST(sk.subkpi_value AS CHAR), '$.subMeasureName')) END,
             NULLIF(sk.sub_kpi_name, ''), 'Sub-KPI'),
    CASE WHEN JSON_VALID(CAST(sk.subkpi_value AS CHAR))
          AND JSON_UNQUOTE(JSON_EXTRACT(CAST(sk.subkpi_value AS CHAR), '$.target')) REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
         THEN CAST(JSON_UNQUOTE(JSON_EXTRACT(CAST(sk.subkpi_value AS CHAR), '$.target')) AS DECIMAL(18,4))
         ELSE 0 END,
    'HIGHER',
    CASE WHEN JSON_VALID(CAST(sk.subkpi_value AS CHAR))
          AND JSON_UNQUOTE(JSON_EXTRACT(CAST(sk.subkpi_value AS CHAR), '$.weight')) REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
         THEN CAST(JSON_UNQUOTE(JSON_EXTRACT(CAST(sk.subkpi_value AS CHAR), '$.weight')) AS DECIMAL(7,2))
         ELSE 1 END,
    COALESCE(CASE WHEN JSON_VALID(CAST(sk.subkpi_value AS CHAR))
                  THEN UPPER(JSON_UNQUOTE(JSON_EXTRACT(CAST(sk.subkpi_value AS CHAR), '$.dataType'))) END,
             'NUMBER'),
    COALESCE(sk.sub_kpi_id_sequence, 0),
    0, sk.id,
    COALESCE(sk.created_time, NOW())
FROM subkpi sk
JOIN sc_kpis k ON k.legacy_kpi_id = sk.kpi_id
WHERE sk.active = 0
  AND NOT EXISTS (SELECT 1 FROM sc_sub_kpis x WHERE x.legacy_subkpi_id = sk.id);
