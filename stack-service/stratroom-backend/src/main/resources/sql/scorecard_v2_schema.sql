-- ============================================================
-- SCORECARD V2 SCHEMA (MySQL 8)
-- Translated from the "Gold Standard" PostgreSQL schema.
--
-- Notes on the translation:
--   * BIGSERIAL              -> BIGINT AUTO_INCREMENT
--   * TIMESTAMPTZ            -> DATETIME (created_at/updated_at use
--                              CURRENT_TIMESTAMP + ON UPDATE instead of triggers)
--   * BOOLEAN                -> TINYINT(1)
--   * JSONB                  -> JSON
--   * Partial indexes (WHERE ...) -> plain indexes (MySQL has no partial idx)
--   * Postgres triggers      -> column-level ON UPDATE CURRENT_TIMESTAMP
--   * ON CONFLICT / INTERVAL  -> handled in the migration / Java layer
--
-- All tables are prefixed `sc_` so they never collide with the existing
-- orgstructure tables (objectives, kpi, subkpi, score_card, score_card_details,
-- strategy_map, ...). This is the new model; the legacy blob tables are left
-- untouched and the migration (separate script) copies data into these.
--
-- Idempotent: uses CREATE TABLE IF NOT EXISTS. Run against `orgstructure`.
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- LEVEL 1: SCORECARDS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sc_scorecards (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    page_id             BIGINT       NOT NULL,
    name                VARCHAR(255) NOT NULL,
    description         MEDIUMTEXT,
    owner_id            BIGINT       NOT NULL,
    department_id       BIGINT,
    classification_type VARCHAR(20)  NOT NULL DEFAULT 'THREE_COLOR',
    overall_score       DECIMAL(5,2),
    rag_status          VARCHAR(20),
    version             INT          NOT NULL DEFAULT 1,
    is_active           TINYINT(1)   NOT NULL DEFAULT 1,
    is_deleted          TINYINT(1)   NOT NULL DEFAULT 0,
    -- link back to the legacy row this was migrated from (nullable for new rows)
    legacy_details_id   BIGINT,
    created_by          BIGINT       NOT NULL,
    created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by          BIGINT,
    updated_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_sc_scorecards_page (page_id),
    KEY idx_sc_scorecards_owner (owner_id),
    KEY idx_sc_scorecards_legacy (legacy_details_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- LEVEL 2: PERSPECTIVES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sc_perspectives (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    scorecard_id        BIGINT       NOT NULL,
    code                VARCHAR(50),
    name                VARCHAR(255) NOT NULL,
    description         MEDIUMTEXT,
    display_order       INT          NOT NULL DEFAULT 0,
    weight              DECIMAL(7,2) NOT NULL DEFAULT 0 CHECK (weight >= 0),
    aggregation_method  VARCHAR(20)  NOT NULL DEFAULT 'WEIGHTED',
    classification_type VARCHAR(20)  NOT NULL DEFAULT 'THREE_COLOR',
    target_score        DECIMAL(5,2),
    is_active           TINYINT(1)   NOT NULL DEFAULT 1,
    legacy_scorecard_id BIGINT,
    created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_sc_perspectives_scorecard (scorecard_id),
    KEY idx_sc_perspectives_legacy (legacy_scorecard_id),
    CONSTRAINT fk_sc_persp_scorecard FOREIGN KEY (scorecard_id)
        REFERENCES sc_scorecards (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- LEVEL 3: OBJECTIVES
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sc_objectives (
    id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
    perspective_id       BIGINT       NOT NULL,
    code                 VARCHAR(50),
    name                 VARCHAR(255) NOT NULL,
    description          MEDIUMTEXT,
    display_order        INT          NOT NULL DEFAULT 0,
    weight               DECIMAL(7,2) NOT NULL DEFAULT 0 CHECK (weight >= 0),
    aggregation_method   VARCHAR(20)  NOT NULL DEFAULT 'WEIGHTED',
    classification_type  VARCHAR(20)  NOT NULL DEFAULT 'THREE_COLOR',
    knockout_enabled     TINYINT(1)   NOT NULL DEFAULT 0,
    knockout_threshold   DECIMAL(5,2) DEFAULT 80.00,
    pass_rate_threshold  DECIMAL(5,2) DEFAULT 95.00,
    target_score         DECIMAL(5,2),
    is_active            TINYINT(1)   NOT NULL DEFAULT 1,
    legacy_objective_id  BIGINT,
    created_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_sc_objectives_perspective (perspective_id),
    KEY idx_sc_objectives_legacy (legacy_objective_id),
    CONSTRAINT fk_sc_obj_perspective FOREIGN KEY (perspective_id)
        REFERENCES sc_perspectives (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- LEVEL 4: KPIS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sc_kpis (
    id                    BIGINT AUTO_INCREMENT PRIMARY KEY,
    objective_id          BIGINT       NOT NULL,
    code                  VARCHAR(50),
    name                  VARCHAR(255) NOT NULL,
    description           MEDIUMTEXT,
    unit                  VARCHAR(50),
    polarity              VARCHAR(20)  NOT NULL DEFAULT 'HIGHER'
                          CHECK (polarity IN ('HIGHER','LOWER','TARGET','RANGE')),
    target_value          DECIMAL(18,4) NOT NULL DEFAULT 0,
    min_target            DECIMAL(18,4),
    max_target            DECIMAL(18,4),
    data_type             VARCHAR(20)  NOT NULL DEFAULT 'NUMBER',
    currency_code         VARCHAR(3),
    weight                DECIMAL(7,2) NOT NULL DEFAULT 0 CHECK (weight >= 0),
    measurement_frequency VARCHAR(20),
    null_handling         VARCHAR(20)  NOT NULL DEFAULT 'EXCLUDE',
    achievement_cap       DECIMAL(5,2) NOT NULL DEFAULT 150.00,
    classification_type   VARCHAR(20)  NOT NULL DEFAULT 'THREE_COLOR',
    display_order         INT          NOT NULL DEFAULT 0,
    formula               MEDIUMTEXT,
    is_deleted            TINYINT(1)   NOT NULL DEFAULT 0,
    legacy_kpi_id         BIGINT,
    created_at            DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at            DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_sc_kpis_objective (objective_id),
    KEY idx_sc_kpis_legacy (legacy_kpi_id),
    CONSTRAINT fk_sc_kpi_objective FOREIGN KEY (objective_id)
        REFERENCES sc_objectives (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- LEVEL 5: SUB-KPIS
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sc_sub_kpis (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    kpi_id           BIGINT       NOT NULL,
    code             VARCHAR(50),
    name             VARCHAR(255) NOT NULL,
    target_value     DECIMAL(18,4) NOT NULL DEFAULT 0,
    polarity         VARCHAR(20)  NOT NULL DEFAULT 'HIGHER',
    weight           DECIMAL(7,2) NOT NULL DEFAULT 1.00,
    data_type        VARCHAR(20)  NOT NULL DEFAULT 'NUMBER',
    null_handling    VARCHAR(20)  NOT NULL DEFAULT 'EXCLUDE',
    achievement_cap  DECIMAL(5,2) NOT NULL DEFAULT 150.00,
    display_order    INT          NOT NULL DEFAULT 0,
    is_deleted       TINYINT(1)   NOT NULL DEFAULT 0,
    legacy_subkpi_id BIGINT,
    created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_sc_subkpis_kpi (kpi_id),
    KEY idx_sc_subkpis_legacy (legacy_subkpi_id),
    CONSTRAINT fk_sc_subkpi_kpi FOREIGN KEY (kpi_id)
        REFERENCES sc_kpis (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- HISTORICAL DATA (actuals per period)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sc_kpi_history (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    kpi_id        BIGINT NOT NULL,
    period_start  DATE   NOT NULL,
    period_end    DATE   NOT NULL,
    actual_value  DECIMAL(18,4),
    achievement   DECIMAL(7,2),
    rag_status    VARCHAR(20),
    calculated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_sc_kpihist (kpi_id, period_start, period_end),
    KEY idx_sc_kpihist_lookup (kpi_id, period_start),
    CONSTRAINT fk_sc_kpihist_kpi FOREIGN KEY (kpi_id)
        REFERENCES sc_kpis (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS sc_sub_kpi_history (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    sub_kpi_id    BIGINT NOT NULL,
    period_start  DATE   NOT NULL,
    period_end    DATE   NOT NULL,
    actual_value  DECIMAL(18,4),
    achievement   DECIMAL(7,2),
    calculated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_sc_subkpihist (sub_kpi_id, period_start, period_end),
    KEY idx_sc_subkpihist_lookup (sub_kpi_id, period_start),
    CONSTRAINT fk_sc_subkpihist_subkpi FOREIGN KEY (sub_kpi_id)
        REFERENCES sc_sub_kpis (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- RAG CONFIGURATION (3-color & 5-color)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sc_rag_config (
    id                       BIGINT AUTO_INCREMENT PRIMARY KEY,
    entity_type              VARCHAR(20) NOT NULL,
    entity_id                BIGINT,
    classification_type      VARCHAR(20) NOT NULL DEFAULT 'THREE_COLOR',
    green_threshold          DECIMAL(5,2) DEFAULT 95.00,
    amber_threshold          DECIMAL(5,2) DEFAULT 80.00,
    exceeds_threshold        DECIMAL(5,2) DEFAULT 120.00,
    light_green_threshold    DECIMAL(5,2) DEFAULT 85.00,
    amber_5_threshold        DECIMAL(5,2) DEFAULT 70.00,
    custom_exceeds_color     VARCHAR(20),
    custom_green_color       VARCHAR(20),
    custom_light_green_color VARCHAR(20),
    custom_amber_color       VARCHAR(20),
    custom_red_color         VARCHAR(20),
    is_active                TINYINT(1) NOT NULL DEFAULT 1,
    created_by               BIGINT     NOT NULL,
    created_at               DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_sc_rag_entity (entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Default configurations (insert once; ignore if already present)
INSERT INTO sc_rag_config (entity_type, entity_id, classification_type, created_by)
SELECT 'DEFAULT', 0, 'THREE_COLOR', 1
WHERE NOT EXISTS (SELECT 1 FROM sc_rag_config WHERE entity_type='DEFAULT' AND entity_id=0);

INSERT INTO sc_rag_config (entity_type, entity_id, classification_type, created_by)
SELECT 'DEFAULT_5', 0, 'FIVE_COLOR', 1
WHERE NOT EXISTS (SELECT 1 FROM sc_rag_config WHERE entity_type='DEFAULT_5' AND entity_id=0);

-- ------------------------------------------------------------
-- CALCULATION CACHE
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sc_calculation_cache (
    id            BIGINT AUTO_INCREMENT PRIMARY KEY,
    scorecard_id  BIGINT      NOT NULL,
    period_start  DATE        NOT NULL,
    period_end    DATE        NOT NULL,
    result_hash   VARCHAR(64) NOT NULL,
    result_json   JSON        NOT NULL,
    calculated_at DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at    DATETIME    NOT NULL DEFAULT (CURRENT_TIMESTAMP + INTERVAL 1 HOUR),
    UNIQUE KEY uq_sc_cache (scorecard_id, period_start, period_end),
    KEY idx_sc_cache_expires (expires_at),
    CONSTRAINT fk_sc_cache_scorecard FOREIGN KEY (scorecard_id)
        REFERENCES sc_scorecards (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- AUDIT LOG
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sc_audit_log (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    scorecard_id BIGINT      NOT NULL,
    action       VARCHAR(50) NOT NULL,
    entity_type  VARCHAR(50),
    entity_id    BIGINT,
    old_value    JSON,
    new_value    JSON,
    changed_by   BIGINT      NOT NULL,
    changed_at   DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    KEY idx_sc_audit_scorecard (scorecard_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
