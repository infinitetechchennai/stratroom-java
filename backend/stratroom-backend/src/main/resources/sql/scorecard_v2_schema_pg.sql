-- Scorecard V2 schema for PostgreSQL (orgstructure database).
-- Idempotent: CREATE IF NOT EXISTS, ADD COLUMN IF NOT EXISTS, then indexes.

SET search_path TO orgstructure;

-- ------------------------------------------------------------
-- TABLES (create shell if missing)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sc_scorecards (
    id BIGSERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS sc_perspectives (
    id BIGSERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS sc_objectives (
    id BIGSERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS sc_kpis (
    id BIGSERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS sc_sub_kpis (
    id BIGSERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS sc_kpi_history (
    id BIGSERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS sc_sub_kpi_history (
    id BIGSERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS sc_rag_config (
    id BIGSERIAL PRIMARY KEY
);

-- ------------------------------------------------------------
-- COLUMN MIGRATIONS (upgrade partial / legacy sc_* tables)
-- ------------------------------------------------------------
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS page_id BIGINT;
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS owner_id BIGINT NOT NULL DEFAULT 0;
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS department_id BIGINT;
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS classification_type VARCHAR(20) NOT NULL DEFAULT 'THREE_COLOR';
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS overall_score DECIMAL(5,2);
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS rag_status VARCHAR(20);
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS version INT NOT NULL DEFAULT 1;
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS legacy_details_id BIGINT;
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS created_by BIGINT NOT NULL DEFAULT 0;
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS updated_by BIGINT;
ALTER TABLE sc_scorecards ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS scorecard_id BIGINT;
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS code VARCHAR(50);
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0;
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS weight DECIMAL(7,2) NOT NULL DEFAULT 0;
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS aggregation_method VARCHAR(20) NOT NULL DEFAULT 'WEIGHTED';
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS classification_type VARCHAR(20) NOT NULL DEFAULT 'THREE_COLOR';
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS target_score DECIMAL(5,2);
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS legacy_scorecard_id BIGINT;
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE sc_perspectives ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS perspective_id BIGINT;
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS code VARCHAR(50);
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0;
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS weight DECIMAL(7,2) NOT NULL DEFAULT 0;
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS aggregation_method VARCHAR(20) NOT NULL DEFAULT 'WEIGHTED';
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS classification_type VARCHAR(20) NOT NULL DEFAULT 'THREE_COLOR';
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS knockout_enabled BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS knockout_threshold DECIMAL(5,2) DEFAULT 80.00;
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS pass_rate_threshold DECIMAL(5,2) DEFAULT 95.00;
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS target_score DECIMAL(5,2);
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS legacy_objective_id BIGINT;
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE sc_objectives ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS objective_id BIGINT;
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS code VARCHAR(50);
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS unit VARCHAR(50);
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS polarity VARCHAR(20) NOT NULL DEFAULT 'HIGHER';
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS target_value DECIMAL(18,4) NOT NULL DEFAULT 0;
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS min_target DECIMAL(18,4);
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS max_target DECIMAL(18,4);
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS data_type VARCHAR(20) NOT NULL DEFAULT 'NUMBER';
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS currency_code VARCHAR(3);
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS weight DECIMAL(7,2) NOT NULL DEFAULT 0;
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS measurement_frequency VARCHAR(20);
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS null_handling VARCHAR(20) NOT NULL DEFAULT 'EXCLUDE';
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS achievement_cap DECIMAL(5,2) NOT NULL DEFAULT 150.00;
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS classification_type VARCHAR(20) NOT NULL DEFAULT 'THREE_COLOR';
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0;
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS formula TEXT;
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS legacy_kpi_id BIGINT;
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE sc_kpis ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS kpi_id BIGINT;
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS code VARCHAR(50);
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS name VARCHAR(255);
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS target_value DECIMAL(18,4) NOT NULL DEFAULT 0;
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS polarity VARCHAR(20) NOT NULL DEFAULT 'HIGHER';
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS weight DECIMAL(7,2) NOT NULL DEFAULT 1.00;
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS data_type VARCHAR(20) NOT NULL DEFAULT 'NUMBER';
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS null_handling VARCHAR(20) NOT NULL DEFAULT 'EXCLUDE';
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS achievement_cap DECIMAL(5,2) NOT NULL DEFAULT 150.00;
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0;
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS legacy_subkpi_id BIGINT;
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE sc_sub_kpis ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE sc_kpi_history ADD COLUMN IF NOT EXISTS kpi_id BIGINT;
ALTER TABLE sc_kpi_history ADD COLUMN IF NOT EXISTS period_start DATE;
ALTER TABLE sc_kpi_history ADD COLUMN IF NOT EXISTS period_end DATE;
ALTER TABLE sc_kpi_history ADD COLUMN IF NOT EXISTS actual_value DECIMAL(18,4);
ALTER TABLE sc_kpi_history ADD COLUMN IF NOT EXISTS target_value DECIMAL(18,4);
ALTER TABLE sc_kpi_history ADD COLUMN IF NOT EXISTS baseline_value DECIMAL(18,4);
ALTER TABLE sc_kpi_history ADD COLUMN IF NOT EXISTS achievement DECIMAL(7,2);
ALTER TABLE sc_kpi_history ADD COLUMN IF NOT EXISTS rag_status VARCHAR(20);
ALTER TABLE sc_kpi_history ADD COLUMN IF NOT EXISTS calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE sc_sub_kpi_history ADD COLUMN IF NOT EXISTS sub_kpi_id BIGINT;
ALTER TABLE sc_sub_kpi_history ADD COLUMN IF NOT EXISTS period_start DATE;
ALTER TABLE sc_sub_kpi_history ADD COLUMN IF NOT EXISTS period_end DATE;
ALTER TABLE sc_sub_kpi_history ADD COLUMN IF NOT EXISTS actual_value DECIMAL(18,4);
ALTER TABLE sc_sub_kpi_history ADD COLUMN IF NOT EXISTS achievement DECIMAL(7,2);
ALTER TABLE sc_sub_kpi_history ADD COLUMN IF NOT EXISTS calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS entity_type VARCHAR(20);
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS entity_id BIGINT;
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS classification_type VARCHAR(20) NOT NULL DEFAULT 'THREE_COLOR';
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS green_threshold DECIMAL(5,2) DEFAULT 95.00;
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS amber_threshold DECIMAL(5,2) DEFAULT 80.00;
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS exceeds_threshold DECIMAL(5,2) DEFAULT 120.00;
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS light_green_threshold DECIMAL(5,2) DEFAULT 85.00;
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS amber_5_threshold DECIMAL(5,2) DEFAULT 70.00;
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS custom_exceeds_color VARCHAR(20);
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS custom_green_color VARCHAR(20);
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS custom_light_green_color VARCHAR(20);
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS custom_amber_color VARCHAR(20);
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS custom_red_color VARCHAR(20);
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS created_by BIGINT NOT NULL DEFAULT 1;
ALTER TABLE sc_rag_config ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- ------------------------------------------------------------
-- INDEXES (after columns exist)
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_sc_scorecards_page ON sc_scorecards (page_id);
CREATE INDEX IF NOT EXISTS idx_sc_scorecards_owner ON sc_scorecards (owner_id);
CREATE INDEX IF NOT EXISTS idx_sc_perspectives_scorecard ON sc_perspectives (scorecard_id);
CREATE INDEX IF NOT EXISTS idx_sc_objectives_perspective ON sc_objectives (perspective_id);
CREATE INDEX IF NOT EXISTS idx_sc_kpis_objective ON sc_kpis (objective_id);
CREATE INDEX IF NOT EXISTS idx_sc_kpis_code ON sc_kpis (code);
CREATE INDEX IF NOT EXISTS idx_sc_subkpis_kpi ON sc_sub_kpis (kpi_id);
CREATE INDEX IF NOT EXISTS idx_sc_kpihist_lookup ON sc_kpi_history (kpi_id, period_start);

CREATE UNIQUE INDEX IF NOT EXISTS uq_sc_kpihist ON sc_kpi_history (kpi_id, period_start, period_end);
CREATE UNIQUE INDEX IF NOT EXISTS uq_sc_subkpihist ON sc_sub_kpi_history (sub_kpi_id, period_start, period_end);
CREATE UNIQUE INDEX IF NOT EXISTS uq_sc_rag_entity ON sc_rag_config (entity_type, entity_id);

INSERT INTO sc_rag_config (entity_type, entity_id, classification_type, created_by)
SELECT 'DEFAULT', 0, 'THREE_COLOR', 1
WHERE NOT EXISTS (SELECT 1 FROM sc_rag_config WHERE entity_type = 'DEFAULT' AND entity_id = 0);

INSERT INTO sc_rag_config (entity_type, entity_id, classification_type, created_by)
SELECT 'DEFAULT_5', 0, 'FIVE_COLOR', 1
WHERE NOT EXISTS (SELECT 1 FROM sc_rag_config WHERE entity_type = 'DEFAULT_5' AND entity_id = 0);
