-- =============================================================
-- Seed pages for Thor (emp_id=1656, org_id=3)
-- This creates one page per module type so all 6 nav dropdowns
-- have at least one submodule item after login.
--
-- Run against the  orgstructure  database:
--   mysql -u root -p123456 orgstructure < seed_pages_thor.sql
-- =============================================================

USE orgstructure;

-- Plan dropdown items (pageType drives routing in left-navigation.jsp)
INSERT IGNORE INTO `page_details`
  (`page_name`, `page_type`, `created_time`, `active`, `created_by`, `updated_by`, `default_page`, `group_type`)
VALUES
  ('My SWOT',              'SWOT',                  NOW(), 0, 1656, 1656, 'Y', 'Plan'),
  ('My PESTEL',            'PESTEL',                NOW(), 0, 1656, 1656, 'N', 'Plan'),
  ('Strategy Formulation', 'Strategy Formulation',  NOW(), 0, 1656, 1656, 'N', 'Plan');

-- Execute dropdown items
INSERT IGNORE INTO `page_details`
  (`page_name`, `page_type`, `created_time`, `active`, `created_by`, `updated_by`, `default_page`, `group_type`)
VALUES
  ('My Initiatives', 'Initiatives & Projects', NOW(), 0, 1656, 1656, 'Y', 'Execute');

-- Govern dropdown items
INSERT IGNORE INTO `page_details`
  (`page_name`, `page_type`, `created_time`, `active`, `created_by`, `updated_by`, `default_page`, `group_type`)
VALUES
  ('Risk Register', 'Risk', NOW(), 0, 1656, 1656, 'Y', 'Govern');

-- Meet dropdown items
INSERT IGNORE INTO `page_details`
  (`page_name`, `page_type`, `created_time`, `active`, `created_by`, `updated_by`, `default_page`, `group_type`)
VALUES
  ('Management Meetings', 'Meetings', NOW(), 0, 1656, 1656, 'Y', 'Meet');

SELECT 'Pages seeded successfully for Thor (emp_id=1656)' AS result;
SELECT id, page_name, page_type, group_type FROM page_details WHERE created_by = 1656 ORDER BY id;
