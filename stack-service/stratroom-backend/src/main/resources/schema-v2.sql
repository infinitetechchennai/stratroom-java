-- ============================================================
-- SCORECARD V2 SCHEMA (PostgreSQL Compatible) - FIXED with SMALLINT and missing columns
-- ============================================================

-- First drop existing tables to recreate them cleanly
DROP TABLE IF EXISTS sc_kpi_history CASCADE;
DROP TABLE IF EXISTS sc_sub_kpis CASCADE;
DROP TABLE IF EXISTS sc_kpis CASCADE;
DROP TABLE IF EXISTS sc_objectives CASCADE;
DROP TABLE IF EXISTS sc_perspectives CASCADE;
DROP TABLE IF EXISTS sc_scorecards CASCADE;

-- ------------------------------------------------------------
-- LEVEL 1: SCORECARDS
-- ------------------------------------------------------------
CREATE TABLE sc_scorecards (
    id                  BIGSERIAL PRIMARY KEY,
    page_id             BIGINT       NOT NULL,
    name                VARCHAR(255) NOT NULL,
    description         TEXT,
    owner_id            BIGINT       NOT NULL,
    department_id       BIGINT,
    classification_type VARCHAR(20)  NOT NULL DEFAULT 'THREE_COLOR',
    overall_score       NUMERIC(5,2),
    rag_status          VARCHAR(20),
    formula             TEXT,
    version             INT          NOT NULL DEFAULT 1,
    is_active           SMALLINT     NOT NULL DEFAULT 1,
    is_deleted          SMALLINT     NOT NULL DEFAULT 0,
    legacy_details_id   BIGINT,
    created_by          BIGINT       NOT NULL,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by          BIGINT,
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sc_scorecards_page ON sc_scorecards (page_id);
CREATE INDEX idx_sc_scorecards_owner ON sc_scorecards (owner_id);
CREATE INDEX idx_sc_scorecards_legacy ON sc_scorecards (legacy_details_id);

-- Optional: Trigger function for updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_scorecards
BEFORE UPDATE ON sc_scorecards
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();


-- ------------------------------------------------------------
-- LEVEL 2: PERSPECTIVES
-- ------------------------------------------------------------
CREATE TABLE sc_perspectives (
    id                  BIGSERIAL PRIMARY KEY,
    scorecard_id        BIGINT       NOT NULL,
    code                VARCHAR(50),
    name                VARCHAR(255) NOT NULL,
    description         TEXT,
    display_order       INT          NOT NULL DEFAULT 0,
    weight              NUMERIC(7,2) NOT NULL DEFAULT 0 CHECK (weight >= 0),
    aggregation_method  VARCHAR(20)  NOT NULL DEFAULT 'WEIGHTED',
    classification_type VARCHAR(20)  NOT NULL DEFAULT 'THREE_COLOR',
    formula             TEXT,
    target_score        NUMERIC(5,2),
    is_active           SMALLINT     NOT NULL DEFAULT 1,
    legacy_scorecard_id BIGINT,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sc_persp_scorecard FOREIGN KEY (scorecard_id)
        REFERENCES sc_scorecards (id) ON DELETE CASCADE
);

CREATE INDEX idx_sc_perspectives_scorecard ON sc_perspectives (scorecard_id);
CREATE INDEX idx_sc_perspectives_legacy ON sc_perspectives (legacy_scorecard_id);

CREATE TRIGGER set_timestamp_perspectives
BEFORE UPDATE ON sc_perspectives
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();


-- ------------------------------------------------------------
-- LEVEL 3: OBJECTIVES
-- ------------------------------------------------------------
CREATE TABLE sc_objectives (
    id                   BIGSERIAL PRIMARY KEY,
    perspective_id       BIGINT       NOT NULL,
    code                 VARCHAR(50),
    name                 VARCHAR(255) NOT NULL,
    description          TEXT,
    display_order        INT          NOT NULL DEFAULT 0,
    weight               NUMERIC(7,2) NOT NULL DEFAULT 0 CHECK (weight >= 0),
    aggregation_method   VARCHAR(20)  NOT NULL DEFAULT 'WEIGHTED',
    classification_type  VARCHAR(20)  NOT NULL DEFAULT 'THREE_COLOR',
    knockout_enabled     SMALLINT     NOT NULL DEFAULT 0,
    knockout_threshold   NUMERIC(5,2) DEFAULT 80.00,
    pass_rate_threshold  NUMERIC(5,2) DEFAULT 95.00,
    formula              TEXT,
    target_score         NUMERIC(5,2),
    is_active            SMALLINT     NOT NULL DEFAULT 1,
    legacy_objective_id  BIGINT,
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sc_obj_perspective FOREIGN KEY (perspective_id)
        REFERENCES sc_perspectives (id) ON DELETE CASCADE
);

CREATE INDEX idx_sc_objectives_perspective ON sc_objectives (perspective_id);
CREATE INDEX idx_sc_objectives_legacy ON sc_objectives (legacy_objective_id);

CREATE TRIGGER set_timestamp_objectives
BEFORE UPDATE ON sc_objectives
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();


-- ------------------------------------------------------------
-- LEVEL 4: KPIS
-- ------------------------------------------------------------
CREATE TABLE sc_kpis (
    id                    BIGSERIAL PRIMARY KEY,
    objective_id          BIGINT       NOT NULL,
    code                  VARCHAR(50),
    name                  VARCHAR(255) NOT NULL,
    description           TEXT,
    unit                  VARCHAR(50),
    polarity              VARCHAR(20)  NOT NULL DEFAULT 'HIGHER'
                          CHECK (polarity IN ('HIGHER','LOWER','TARGET','RANGE')),
    target_value          NUMERIC(18,4) NOT NULL DEFAULT 0,
    min_target            NUMERIC(18,4),
    max_target            NUMERIC(18,4),
    data_type             VARCHAR(20)  NOT NULL DEFAULT 'NUMBER',
    currency_code         VARCHAR(3),
    weight                NUMERIC(7,2) NOT NULL DEFAULT 0 CHECK (weight >= 0),
    measurement_frequency VARCHAR(20),
    null_handling         VARCHAR(20)  NOT NULL DEFAULT 'EXCLUDE',
    achievement_cap       NUMERIC(5,2) NOT NULL DEFAULT 150.00,
    classification_type   VARCHAR(20)  NOT NULL DEFAULT 'THREE_COLOR',
    display_order         INT          NOT NULL DEFAULT 0,
    formula               TEXT,
    is_deleted            SMALLINT     NOT NULL DEFAULT 0,
    legacy_kpi_id         BIGINT,
    created_at            TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at            TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sc_kpi_objective FOREIGN KEY (objective_id)
        REFERENCES sc_objectives (id) ON DELETE CASCADE
);

CREATE INDEX idx_sc_kpis_objective ON sc_kpis (objective_id);
CREATE INDEX idx_sc_kpis_legacy ON sc_kpis (legacy_kpi_id);

CREATE TRIGGER set_timestamp_kpis
BEFORE UPDATE ON sc_kpis
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();


-- ------------------------------------------------------------
-- LEVEL 5: SUB-KPIS
-- ------------------------------------------------------------
CREATE TABLE sc_sub_kpis (
    id               BIGSERIAL PRIMARY KEY,
    kpi_id           BIGINT       NOT NULL,
    code             VARCHAR(50),
    name             VARCHAR(255) NOT NULL,
    target_value     NUMERIC(18,4) NOT NULL DEFAULT 0,
    polarity         VARCHAR(20)  NOT NULL DEFAULT 'HIGHER',
    weight           NUMERIC(7,2) NOT NULL DEFAULT 1.00,
    data_type        VARCHAR(20)  NOT NULL DEFAULT 'NUMBER',
    null_handling    VARCHAR(20)  NOT NULL DEFAULT 'EXCLUDE',
    achievement_cap  NUMERIC(5,2) NOT NULL DEFAULT 150.00,
    display_order    INT          NOT NULL DEFAULT 0,
    is_deleted       SMALLINT     NOT NULL DEFAULT 0,
    legacy_subkpi_id BIGINT,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sc_subkpi_kpi FOREIGN KEY (kpi_id)
        REFERENCES sc_kpis (id) ON DELETE CASCADE
);

CREATE INDEX idx_sc_subkpis_kpi ON sc_sub_kpis (kpi_id);
CREATE INDEX idx_sc_subkpis_legacy ON sc_sub_kpis (legacy_subkpi_id);

CREATE TRIGGER set_timestamp_sub_kpis
BEFORE UPDATE ON sc_sub_kpis
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();


-- ------------------------------------------------------------
-- HISTORICAL DATA (actuals per period)
-- ------------------------------------------------------------
CREATE TABLE sc_kpi_history (
    id            BIGSERIAL PRIMARY KEY,
    kpi_id        BIGINT NOT NULL,
    period_start  DATE   NOT NULL,
    period_end    DATE   NOT NULL,
    actual_value  NUMERIC(18,4),
    achievement   NUMERIC(7,2),
    rag_status    VARCHAR(20),
    calculated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    target_value  NUMERIC(18,4),
    baseline_value NUMERIC(18,4),
    CONSTRAINT uq_sc_kpihist UNIQUE (kpi_id, period_start, period_end),
    CONSTRAINT fk_sc_kpihist_kpi FOREIGN KEY (kpi_id)
        REFERENCES sc_kpis (id) ON DELETE CASCADE
);

CREATE INDEX idx_sc_kpihist_lookup ON sc_kpi_history (kpi_id, period_start);
