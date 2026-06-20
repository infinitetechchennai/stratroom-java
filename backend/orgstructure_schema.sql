-- PostgreSQL clean schema (no data) converted from MySQL orgstructure.sql
-- Run: psql -U postgres -d orgstructure -f orgstructure_schema.sql

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- ------------------------------------------------------

--
-- Table structure for table activities_details
--

DROP TABLE IF EXISTS activities_details;
CREATE TABLE activities_details (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT NULL,
  activities_value text,
  initiative_id bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  subinitiative_id bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table activities_map
--

DROP TABLE IF EXISTS activities_map;
CREATE TABLE activities_map (
  ID bigserial NOT NULL,
  activities_id bigint DEFAULT NULL,
  emp_ID bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table agent_sessions
--

DROP TABLE IF EXISTS agent_sessions;
CREATE TABLE agent_sessions (
  id serial NOT NULL,
  emp_id int NOT NULL,
  org_id int NOT NULL,
  project_id int DEFAULT NULL,
  mode varchar(20) NOT NULL DEFAULT 'extract',
  prompt text NOT NULL,
  response text,
  status varchar(100) DEFAULT 'completed',
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table agent_suggested_tasks
--

DROP TABLE IF EXISTS agent_suggested_tasks;
CREATE TABLE agent_suggested_tasks (
  id serial NOT NULL,
  session_id int NOT NULL,
  emp_id int NOT NULL,
  org_id int NOT NULL,
  project_id int DEFAULT NULL,
  task_name varchar(500) NOT NULL,
  description text,
  priority varchar(20) DEFAULT 'Medium',
  status varchar(100) DEFAULT 'suggested',
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  category_id int DEFAULT NULL,
  assignee_id int DEFAULT NULL,
  raw_json text,
  approved_at timestamp DEFAULT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT agent_suggested_tasks_ibfk_1 FOREIGN KEY (session_id) REFERENCES agent_sessions (id)
);

--
--

--
-- Table structure for table audit_management
--

DROP TABLE IF EXISTS audit_management;
CREATE TABLE audit_management (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  managementvalue text,
  page_id bigint DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table audit_trail_details
--

DROP TABLE IF EXISTS audit_trail_details;
CREATE TABLE audit_trail_details (
  ID bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  userId bigint DEFAULT NULL,
  typeId bigint DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  action varchar(255) DEFAULT NULL,
  accessDate date DEFAULT NULL,
  systemIp varchar(255) DEFAULT NULL,
  orgId bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table auditmanagement_attachment
--

DROP TABLE IF EXISTS auditmanagement_attachment;
CREATE TABLE auditmanagement_attachment (
  id bigserial NOT NULL,
  active int DEFAULT '0',
  auditmanagementid bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  file_name varchar(255) DEFAULT NULL,
  size varchar(255) DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  file text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  uniquereference varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table batch_details
--

DROP TABLE IF EXISTS batch_details;
CREATE TABLE batch_details (
  id bigserial NOT NULL,
  batch_name varchar(600) DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  uploaded_by bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table batch_error_details
--

DROP TABLE IF EXISTS batch_error_details;
CREATE TABLE batch_error_details (
  id bigserial NOT NULL,
  batch_id bigint DEFAULT NULL,
  batch_name varchar(300) DEFAULT NULL,
  template_type varchar(300) DEFAULT NULL,
  metric_code varchar(300) DEFAULT NULL,
  org_name varchar(300) DEFAULT NULL,
  email_address varchar(300) DEFAULT NULL,
  real_date_from date DEFAULT NULL,
  real_date_to date DEFAULT NULL,
  month_year varchar(300) DEFAULT NULL,
  financial_month varchar(300) DEFAULT NULL,
  mtd_actual varchar(300) DEFAULT NULL,
  mtd_target varchar(300) DEFAULT NULL,
  rolling12_actual varchar(300) DEFAULT NULL,
  rolling12_budget varchar(300) DEFAULT NULL,
  node_key varchar(300) DEFAULT NULL,
  measure_name varchar(600) DEFAULT NULL,
  type varchar(150) DEFAULT NULL,
  currency varchar(150) DEFAULT NULL,
  cause_of_failure text,
  target_year bigint DEFAULT NULL,
  uploaded_by bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table budget_detail
--

DROP TABLE IF EXISTS budget_detail;
CREATE TABLE budget_detail (
  id bigserial NOT NULL,
  budgetvalues json DEFAULT NULL,
  create_by bigint DEFAULT '0',
  update_by bigint DEFAULT '0',
  create_time timestamp DEFAULT NULL,
  update_time timestamp DEFAULT NULL,
  deptid bigint DEFAULT '0',
  owner bigint DEFAULT '0',
  active bigint DEFAULT '0',
  page_id varchar(45) DEFAULT NULL,
  initiative_id bigint DEFAULT '0',
  subinitiative_id bigint DEFAULT '0',
  activity_id bigint DEFAULT '0',
  subactivity_id bigint DEFAULT '0',
  version bigint DEFAULT '0',
  status varchar(100) DEFAULT NULL,
  change_id bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table chart_details
--

DROP TABLE IF EXISTS chart_details;
CREATE TABLE chart_details (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  chart_value text,
  page_id bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table child_tracker
--

DROP TABLE IF EXISTS child_tracker;
CREATE TABLE child_tracker (
  id bigserial NOT NULL,
  parent_id bigint NOT NULL,
  child_id bigint NOT NULL,
  from_date timestamp DEFAULT NULL,
  to_date timestamp DEFAULT NULL,
  org_id bigint DEFAULT NULL,
  imp_type varchar(50) DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table child_tracker_backup_20250917
--

DROP TABLE IF EXISTS child_tracker_backup_20250917;
CREATE TABLE child_tracker_backup_20250917 (
  id bigint NOT NULL DEFAULT '0',
  parent_id bigint NOT NULL,
  child_id bigint NOT NULL,
  from_date timestamp DEFAULT NULL,
  to_date timestamp DEFAULT NULL,
  org_id bigint DEFAULT NULL,
  imp_type varchar(50) DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  created_by bigint DEFAULT NULL
);

--
--

--
-- Table structure for table comment_mapping
--

DROP TABLE IF EXISTS comment_mapping;
CREATE TABLE comment_mapping (
  ID bigserial NOT NULL,
  empId bigint DEFAULT NULL,
  comment_id bigint DEFAULT NULL,
  PRIMARY KEY (ID),
  UNIQUE (empId,comment_id)
);

--
--

--
-- Table structure for table comments_details
--

DROP TABLE IF EXISTS comments_details;
CREATE TABLE comments_details (
  id bigserial NOT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  comments_value text,
  initiative_id bigint DEFAULT NULL,
  active int DEFAULT NULL,
  like_count bigint DEFAULT NULL,
  comments_parendId bigint DEFAULT '0',
  comment_type bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table compliance_area
--

DROP TABLE IF EXISTS compliance_area;
CREATE TABLE compliance_area (
  ID bigserial NOT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  name varchar(200) DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table compliance_details
--

DROP TABLE IF EXISTS compliance_details;
CREATE TABLE compliance_details (
  ID bigserial NOT NULL,
  complainarea_id bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT '0',
  complain_value text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  risklevel varchar(100) DEFAULT NULL,
  status varchar(100) DEFAULT NULL,
  assessment_date date DEFAULT NULL,
  review_date date DEFAULT NULL,
  due_date date DEFAULT NULL,
  lastaudit_date date DEFAULT NULL,
  deptid bigint DEFAULT NULL,
  page_id bigint DEFAULT '0',
  PRIMARY KEY (ID),
  CONSTRAINT compliance_area FOREIGN KEY (complainarea_id) REFERENCES compliance_area (ID)
);

--
--

--
-- Table structure for table compliance_details_attachment
--

DROP TABLE IF EXISTS compliance_details_attachment;
CREATE TABLE compliance_details_attachment (
  id bigserial NOT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  size varchar(255) DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  filename text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  complaindetal_id bigint DEFAULT '0',
  uniquereference varchar(100) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE (complaindetal_id)
);

--
--

--
-- Table structure for table control_panel_custom_performance
--

DROP TABLE IF EXISTS control_panel_custom_performance;
CREATE TABLE control_panel_custom_performance (
  org_id bigint NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  custom_value text,
  risksetting text,
  PRIMARY KEY (org_id)
);

--
--

--
-- Table structure for table control_panel_general
--

DROP TABLE IF EXISTS control_panel_general;
CREATE TABLE control_panel_general (
  orgId bigint NOT NULL,
  site_name varchar(255) DEFAULT NULL,
  site_language varchar(255) DEFAULT NULL,
  admin_email_id varchar(255) DEFAULT NULL,
  currency_type varchar(255) DEFAULT NULL,
  calendar_year varchar(255) DEFAULT NULL,
  time_zone varchar(255) DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  general_setting_value text,
  currency_view varchar(45) DEFAULT NULL,
  default_date_period varchar(45) DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  department varchar(45) DEFAULT NULL,
  implementation varchar(45) DEFAULT NULL,
  implementation_type varchar(45) DEFAULT NULL,
  start_month varchar(45) DEFAULT NULL,
  end_month varchar(45) DEFAULT NULL,
  PRIMARY KEY (orgId)
);

--
--

--
-- Table structure for table control_panel_security
--

DROP TABLE IF EXISTS control_panel_security;
CREATE TABLE control_panel_security (
  orgId bigint NOT NULL,
  security_type varchar(255) DEFAULT NULL,
  single_sign_url varchar(255) DEFAULT NULL,
  audience_url varchar(255) DEFAULT NULL,
  default_relay_state varchar(255) DEFAULT NULL,
  update_application_username varchar(255) DEFAULT NULL,
  name_id_format varchar(45) DEFAULT NULL,
  recipientUrl smallint DEFAULT '0',
  allowSSo smallint DEFAULT '0',
  application_username varchar(255) DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  PRIMARY KEY (orgId)
);

--
--

--
-- Table structure for table control_panel_theme
--

DROP TABLE IF EXISTS control_panel_theme;
CREATE TABLE control_panel_theme (
  orgId bigint NOT NULL,
  login_logo text,
  login_theme text,
  theme_color varchar(255) DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  theme_name varchar(200) DEFAULT NULL,
  PRIMARY KEY (orgId)
);

--
--

--
-- Table structure for table control_panel_workflow
--

DROP TABLE IF EXISTS control_panel_workflow;
CREATE TABLE control_panel_workflow (
  id bigserial NOT NULL,
  workflow_name varchar(200) DEFAULT NULL,
  type varchar(100) DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  department bigint DEFAULT NULL,
  conditions varchar(225) DEFAULT NULL,
  creatername varchar(45) DEFAULT NULL,
  updatername varchar(45) DEFAULT NULL,
  description varchar(225) DEFAULT NULL,
  approved_by varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table control_panel_workflow_history
--

DROP TABLE IF EXISTS control_panel_workflow_history;
CREATE TABLE control_panel_workflow_history (
  entity_id serial NOT NULL,
  workFlow_id bigint DEFAULT '0',
  approverid bigint DEFAULT '0',
  action_taken varchar(50) DEFAULT NULL,
  action_by int DEFAULT NULL,
  action_date timestamp DEFAULT NULL,
  comments varchar(200) DEFAULT NULL,
  change_id bigint DEFAULT '0',
  version bigint DEFAULT '0',
  PRIMARY KEY (entity_id),
  CONSTRAINT control_panel_workflow_history_ibfk_1 FOREIGN KEY (workFlow_id) REFERENCES control_panel_workflow (id),
  CONSTRAINT control_panel_workflow_history_ibfk_2 FOREIGN KEY (approverid) REFERENCES controlpanel_workflow_approversmapping (id)
);

--
--

--
-- Table structure for table controlpanel_workflow_approversmapping
--

DROP TABLE IF EXISTS controlpanel_workflow_approversmapping;
CREATE TABLE controlpanel_workflow_approversmapping (
  id bigserial NOT NULL,
  workflow_id bigint DEFAULT NULL,
  aprovername varchar(225) DEFAULT NULL,
  aproval_role_id bigint DEFAULT NULL,
  status varchar(105) DEFAULT NULL,
  approver_order bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table currency_details
--

DROP TABLE IF EXISTS currency_details;
CREATE TABLE currency_details (
  currency_code varchar(150) NOT NULL,
  currency_name varchar(900) DEFAULT NULL,
  currency_symbol varchar(150) NOT NULL,
  decimal_digits int DEFAULT NULL,
  rounding int DEFAULT NULL,
  symbol_native varchar(150) NOT NULL
);

--
--

--
-- Table structure for table dashboard_preferences
--

DROP TABLE IF EXISTS dashboard_preferences;
CREATE TABLE dashboard_preferences (
  id bigserial NOT NULL,
  active int DEFAULT NULL,
  owner bigint DEFAULT NULL,
  dashboard_preferences_value text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  page_id bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table department_chart_details
--

DROP TABLE IF EXISTS department_chart_details;
CREATE TABLE department_chart_details (
  deptId bigint NOT NULL,
  dept_name varchar(100) DEFAULT NULL,
  deptParentId bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  scorecardPageId bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_Time timestamp DEFAULT NULL,
  initiativePageId bigint DEFAULT NULL,
  riskPageId bigint DEFAULT NULL,
  kpiId bigint DEFAULT NULL,
  active int DEFAULT '0',
  deptImage text,
  owner bigint DEFAULT NULL,
  emailAddress varchar(255) DEFAULT NULL,
  orgId bigint NOT NULL,
  deptUniqueId varchar(45) DEFAULT NULL,
  PRIMARY KEY (deptId)
);

--
--

--
-- Table structure for table department_chart_details_his
--

DROP TABLE IF EXISTS department_chart_details_his;
CREATE TABLE department_chart_details_his (
  id bigserial NOT NULL,
  deptId bigint NOT NULL,
  year int NOT NULL,
  dept_name varchar(255) DEFAULT NULL,
  deptParentId bigint DEFAULT NULL,
  orgId bigint DEFAULT NULL,
  scorecardPageId bigint DEFAULT NULL,
  active int NOT NULL,
  created_by bigint NOT NULL,
  updated_by bigint DEFAULT NULL,
  created_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_time timestamp DEFAULT NULL,
  initiativePageId bigint DEFAULT NULL,
  riskPageId bigint DEFAULT NULL,
  kpiId bigint DEFAULT NULL,
  deptImage text,
  owner bigint DEFAULT NULL,
  emailAddress varchar(255) DEFAULT NULL,
  deptUniqueId varchar(255) DEFAULT NULL,
  snapshot_date date DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE (deptId,year)
);

--
--

--
-- Table structure for table department_details
--

DROP TABLE IF EXISTS department_details;
CREATE TABLE department_details (
  dept_id serial NOT NULL,
  department_name varchar(50) DEFAULT NULL,
  status varchar(10) DEFAULT NULL,
  org_id int DEFAULT NULL,
  PRIMARY KEY (dept_id)
);

--
--

--
-- Table structure for table dept_owner_mapping
--

DROP TABLE IF EXISTS dept_owner_mapping;
CREATE TABLE dept_owner_mapping (
  ID bigserial NOT NULL,
  empId bigint DEFAULT NULL,
  deptId bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table dept_owner_mapping_his
--

DROP TABLE IF EXISTS dept_owner_mapping_his;
CREATE TABLE dept_owner_mapping_his (
  ID bigserial NOT NULL,
  empId bigint DEFAULT NULL,
  deptId bigint DEFAULT NULL,
  year int DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table dept_tracker
--

DROP TABLE IF EXISTS dept_tracker;
CREATE TABLE dept_tracker (
  Id bigserial NOT NULL,
  deptId bigint DEFAULT NULL,
  parent_id bigint DEFAULT NULL,
  who_user_id bigint DEFAULT NULL,
  active int DEFAULT '0',
  start_date timestamp DEFAULT NULL,
  end_date timestamp DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  type varchar(45) DEFAULT NULL,
  orgId bigint DEFAULT NULL,
  pageId bigint DEFAULT NULL,
  pageName varchar(45) DEFAULT NULL,
  owner bigint DEFAULT NULL,
  PRIMARY KEY (Id)
);

--
--

--
-- Table structure for table emp_comment_mapping
--

DROP TABLE IF EXISTS emp_comment_mapping;
CREATE TABLE emp_comment_mapping (
  ID bigserial NOT NULL,
  empId bigint DEFAULT NULL,
  comment_id bigint DEFAULT NULL,
  PRIMARY KEY (ID),
  UNIQUE (empId,comment_id)
);

--
--

--
-- Table structure for table employee_comments
--

DROP TABLE IF EXISTS employee_comments;
CREATE TABLE employee_comments (
  id bigserial NOT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  comments_value text,
  active int DEFAULT NULL,
  like_count bigint DEFAULT NULL,
  comments_parendId bigint DEFAULT '0',
  comment_type bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table employee_credentials
--

DROP TABLE IF EXISTS employee_credentials;
CREATE TABLE employee_credentials (
  emp_id bigint NOT NULL,
  org_id bigint DEFAULT NULL,
  user_name varchar(50) DEFAULT NULL,
  password varchar(50) DEFAULT NULL,
  status varchar(10) DEFAULT NULL,
  email_address varchar(100) DEFAULT NULL,
  created_date timestamp DEFAULT NULL,
  updated_date timestamp DEFAULT NULL,
  dept_id bigint DEFAULT NULL,
  PRIMARY KEY (emp_id)
);

--
--

--
-- Table structure for table employee_department_mapping
--

DROP TABLE IF EXISTS employee_department_mapping;
CREATE TABLE employee_department_mapping (
  ID bigserial NOT NULL,
  active int DEFAULT NULL,
  status varchar(45) DEFAULT NULL,
  empId bigint DEFAULT NULL,
  deptId bigint DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_Time timestamp DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  firstName varchar(45) DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table employee_details
--

DROP TABLE IF EXISTS employee_details;
CREATE TABLE employee_details (
  emp_id bigserial NOT NULL,
  org_id bigint DEFAULT NULL,
  dept_id bigint DEFAULT NULL,
  first_name varchar(100) DEFAULT NULL,
  last_name varchar(100) DEFAULT NULL,
  user_role int DEFAULT NULL,
  profile_image text,
  parent_emp_id int DEFAULT NULL,
  title varchar(200) DEFAULT NULL,
  location varchar(200) DEFAULT NULL,
  email_address varchar(150) DEFAULT NULL,
  status varchar(20) DEFAULT NULL,
  created_date timestamp DEFAULT NULL,
  updated_date timestamp DEFAULT NULL,
  department varchar(100) DEFAULT NULL,
  phone_number varchar(100) DEFAULT NULL,
  currency varchar(255) DEFAULT NULL,
  currency_symbol varchar(255) DEFAULT NULL,
  create_via varchar(45) DEFAULT NULL,
  emp_category varchar(200) DEFAULT NULL,
  emp_type varchar(100) DEFAULT NULL,
  emp_uniqid varchar(250) DEFAULT NULL,
  PRIMARY KEY (emp_id)
);

--
--

--
-- Table structure for table employee_documents
--

DROP TABLE IF EXISTS employee_documents;
CREATE TABLE employee_documents (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  documents_value text,
  created_time timestamp DEFAULT NULL,
  updated_Time timestamp DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table employee_goals
--

DROP TABLE IF EXISTS employee_goals;
CREATE TABLE employee_goals (
  ID bigserial NOT NULL,
  active int DEFAULT NULL,
  goals_value text,
  created_time date DEFAULT NULL,
  updated_Time date DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table employee_pages_link
--

DROP TABLE IF EXISTS employee_pages_link;
CREATE TABLE employee_pages_link (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  page_id bigint DEFAULT NULL,
  typeId bigint DEFAULT NULL,
  page_type varchar(255) DEFAULT NULL,
  type_name varchar(45) DEFAULT NULL,
  emp_id bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_Time timestamp DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table employee_preferences
--

DROP TABLE IF EXISTS employee_preferences;
CREATE TABLE employee_preferences (
  id bigserial NOT NULL,
  page_name varchar(100) DEFAULT NULL,
  status varchar(10) DEFAULT NULL,
  emp_id bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table formulation_initiatives
--

DROP TABLE IF EXISTS formulation_initiatives;
CREATE TABLE formulation_initiatives (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT NULL,
  initiative_value text,
  impact_kpi_id bigint DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  formulation_id bigint DEFAULT NULL,
  department varchar(100) DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table formulation_kpi
--

DROP TABLE IF EXISTS formulation_kpi;
CREATE TABLE formulation_kpi (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  objective_id bigint DEFAULT NULL,
  kpi_value text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  kpi_name varchar(300) DEFAULT NULL,
  owner bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table formulation_objectives
--

DROP TABLE IF EXISTS formulation_objectives;
CREATE TABLE formulation_objectives (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  score_card_id bigint DEFAULT NULL,
  objectives_val text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table formulation_risk_activities
--

DROP TABLE IF EXISTS formulation_risk_activities;
CREATE TABLE formulation_risk_activities (
  ID bigserial NOT NULL,
  activity_value text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  sub_risk_id bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table formulation_risk_details
--

DROP TABLE IF EXISTS formulation_risk_details;
CREATE TABLE formulation_risk_details (
  ID bigserial NOT NULL,
  risk_value text,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  impact_kpi_id bigint DEFAULT NULL,
  formulation_id bigint DEFAULT NULL,
  department varchar(100) DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table formulation_score_card
--

DROP TABLE IF EXISTS formulation_score_card;
CREATE TABLE formulation_score_card (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  score_card_val text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  formulation_id bigint DEFAULT NULL,
  score_name varchar(100) DEFAULT NULL,
  owner bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table formulation_sub_risk_mapping
--

DROP TABLE IF EXISTS formulation_sub_risk_mapping;
CREATE TABLE formulation_sub_risk_mapping (
  sub_risk_id bigint NOT NULL,
  emp_ID bigint NOT NULL
);

--
--

--
-- Table structure for table formulation_sub_risks
--

DROP TABLE IF EXISTS formulation_sub_risks;
CREATE TABLE formulation_sub_risks (
  ID bigserial NOT NULL,
  risk_id bigint DEFAULT NULL,
  sub_risk_value text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table formulation_subinitiative_mapping
--

DROP TABLE IF EXISTS formulation_subinitiative_mapping;
CREATE TABLE formulation_subinitiative_mapping (
  subinitiative_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table formulation_subinitiatives
--

DROP TABLE IF EXISTS formulation_subinitiatives;
CREATE TABLE formulation_subinitiatives (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  sub_initiative_value text,
  initiative_id bigint DEFAULT NULL,
  type varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table formulation_subkpi
--

DROP TABLE IF EXISTS formulation_subkpi;
CREATE TABLE formulation_subkpi (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  objective_id bigint DEFAULT NULL,
  kpi_id bigint DEFAULT NULL,
  subkpi_value text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  subkpi_name varchar(300) DEFAULT NULL,
  owner bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table formulation_user_mapping
--

DROP TABLE IF EXISTS formulation_user_mapping;
CREATE TABLE formulation_user_mapping (
  formulation_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table home_page_pref
--

DROP TABLE IF EXISTS home_page_pref;
CREATE TABLE home_page_pref (
  id bigint NOT NULL,
  page_name varchar(100) NOT NULL,
  page_id bigint DEFAULT NULL,
  created_dt timestamp DEFAULT NULL,
  updated_dt timestamp DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table impactdata
--

DROP TABLE IF EXISTS impactdata;
CREATE TABLE impactdata (
  id bigserial NOT NULL,
  hours_days_months json DEFAULT NULL,
  impact_id bigint DEFAULT '0',
  impact varchar(225) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table impactsurvey
--

DROP TABLE IF EXISTS impactsurvey;
CREATE TABLE impactsurvey (
  id bigserial NOT NULL,
  process json DEFAULT NULL,
  justification_for_crtical varchar(2000) DEFAULT NULL,
  create_by bigint DEFAULT NULL,
  update_by bigint DEFAULT NULL,
  create_time timestamp DEFAULT NULL,
  update_time timestamp DEFAULT NULL,
  department_id bigint DEFAULT '0',
  owner bigint DEFAULT '0',
  page_id varchar(45) DEFAULT NULL,
  creatername varchar(225) DEFAULT NULL,
  updatername varchar(225) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table initiative_attachment
--

DROP TABLE IF EXISTS initiative_attachment;
CREATE TABLE initiative_attachment (
  id bigserial NOT NULL,
  active int DEFAULT '0',
  initiativesid bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  file_name varchar(255) DEFAULT NULL,
  size varchar(255) DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  file text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  uniquereference varchar(105) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table initiative_task
--

DROP TABLE IF EXISTS initiative_task;
CREATE TABLE initiative_task (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT NULL,
  taskvalue text,
  initiative_id bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table initiatives_budget
--

DROP TABLE IF EXISTS initiatives_budget;
CREATE TABLE initiatives_budget (
  id bigserial NOT NULL,
  initiative_id varchar(20) DEFAULT NULL,
  end_date date DEFAULT NULL,
  total_asset_budget decimal(20,2) DEFAULT NULL,
  total_realization_asset decimal(20,2) DEFAULT NULL,
  total_liabilities_budget decimal(20,2) DEFAULT NULL,
  total_realization_liabilities decimal(20,2) DEFAULT NULL,
  total_budget decimal(20,2) DEFAULT NULL,
  total_realization_budget decimal(20,2) DEFAULT NULL,
  created_dt timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_dt timestamp DEFAULT CURRENT_TIMESTAMP,
  created_by bigint DEFAULT NULL,
  org_id bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table initiatives_details
--

DROP TABLE IF EXISTS initiatives_details;
CREATE TABLE initiatives_details (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT NULL,
  initiative_value text,
  page_id bigint DEFAULT NULL,
  initiative_id varchar(50) DEFAULT NULL,
  initiative_id_seq bigint DEFAULT NULL,
  impact_kpi_id bigint DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  scorecard_id bigint DEFAULT '0',
  perspective_id bigint DEFAULT '0',
  objective_id bigint DEFAULT '0',
  language varchar(200) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table initiatives_tracker
--

DROP TABLE IF EXISTS initiatives_tracker;
CREATE TABLE initiatives_tracker (
  id bigserial NOT NULL,
  initiative_id varchar(40) NOT NULL,
  end_date timestamp DEFAULT NULL,
  actual varchar(45) DEFAULT NULL,
  target varchar(45) DEFAULT NULL,
  created_dt timestamp DEFAULT NULL,
  updated_dt timestamp DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  org_id bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table ip_address
--

DROP TABLE IF EXISTS ip_address;
CREATE TABLE ip_address (
  empId bigint NOT NULL,
  ip varchar(45) DEFAULT NULL,
  orgId bigint DEFAULT NULL,
  PRIMARY KEY (empId)
);

--
--

--
-- Table structure for table kpi
--

DROP TABLE IF EXISTS kpi;
CREATE TABLE kpi (
  id bigserial NOT NULL,
  active int DEFAULT '0',
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  owner bigint DEFAULT NULL,
  objective_id bigint DEFAULT NULL,
  kpi_value text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  kpi_id varchar(50) DEFAULT NULL,
  kpi_id_sequence bigint DEFAULT NULL,
  kpi_name varchar(300) DEFAULT NULL,
  org_id bigint DEFAULT NULL,
  include_reportee smallint DEFAULT '0',
  custom_repotees varchar(255) DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  act_type int DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table kpi_comment_mapping
--

DROP TABLE IF EXISTS kpi_comment_mapping;
CREATE TABLE kpi_comment_mapping (
  ID bigserial NOT NULL,
  empId bigint DEFAULT NULL,
  comment_id bigint DEFAULT NULL,
  PRIMARY KEY (ID),
  UNIQUE (empId,comment_id)
);

--
--

--
-- Table structure for table kpi_comments_details
--

DROP TABLE IF EXISTS kpi_comments_details;
CREATE TABLE kpi_comments_details (
  id bigserial NOT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  comments_value text,
  kpi_id bigint DEFAULT NULL,
  active int DEFAULT NULL,
  like_count bigint DEFAULT NULL,
  comments_parendId bigint DEFAULT '0',
  comment_type bigint DEFAULT '0',
  type varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table kpi_element_details
--

DROP TABLE IF EXISTS kpi_element_details;
CREATE TABLE kpi_element_details (
  node_key bigint NOT NULL,
  measure_name varchar(250) DEFAULT NULL,
  element_type varchar(30) DEFAULT NULL,
  active int DEFAULT '0',
  org_id bigint DEFAULT '0',
  measure_type int DEFAULT '0',
  measureKey bigint DEFAULT NULL,
  dept_id bigint DEFAULT NULL,
  frequency varchar(100) DEFAULT NULL,
  PRIMARY KEY (node_key)
);

--
--

--
-- Table structure for table kpi_target_details
--

DROP TABLE IF EXISTS kpi_target_details;
CREATE TABLE kpi_target_details (
  kpi_id bigint NOT NULL,
  kpi_name varchar(300) DEFAULT NULL,
  year bigint NOT NULL,
  org_id bigint DEFAULT NULL,
  organization_name varchar(100) DEFAULT NULL,
  type varchar(50) DEFAULT NULL,
  currency varchar(50) DEFAULT NULL,
  mtd_target bigint DEFAULT NULL,
  uploaded_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  batch_id bigint DEFAULT NULL
);

--
--

--
-- Table structure for table kpidetail_attachment
--

DROP TABLE IF EXISTS kpidetail_attachment;
CREATE TABLE kpidetail_attachment (
  id bigserial NOT NULL,
  kpidata_id bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  size varchar(255) DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  filename text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  kpi_id bigint DEFAULT '0',
  uniquereference varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table masters
--

DROP TABLE IF EXISTS masters;
CREATE TABLE masters (
  id bigserial NOT NULL,
  master_name varchar(255) DEFAULT NULL,
  value bigint DEFAULT '0',
  created_by bigint DEFAULT NULL,
  update_by bigint DEFAULT NULL,
  created_date date DEFAULT NULL,
  updated_date date DEFAULT NULL,
  department varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table mastervalue
--

DROP TABLE IF EXISTS mastervalue;
CREATE TABLE mastervalue (
  id bigserial NOT NULL,
  name varchar(255) DEFAULT NULL,
  created_by bigint DEFAULT '0',
  updated_by bigint DEFAULT '0',
  created_at date DEFAULT NULL,
  updated_at date DEFAULT NULL,
  department bigint DEFAULT '0',
  type varchar(255) DEFAULT NULL,
  master_id bigint DEFAULT '0',
  data json DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table meeting_management
--

DROP TABLE IF EXISTS meeting_management;
CREATE TABLE meeting_management (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  meetingManagementValue text,
  page_id bigint DEFAULT NULL,
  meeting_time timestamp DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table meeting_management_attachment
--

DROP TABLE IF EXISTS meeting_management_attachment;
CREATE TABLE meeting_management_attachment (
  id bigserial NOT NULL,
  active int DEFAULT '0',
  meeting_management_id bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  size varchar(255) DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  file text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table meeting_user_mapping
--

DROP TABLE IF EXISTS meeting_user_mapping;
CREATE TABLE meeting_user_mapping (
  meeting_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table milestones_details
--

DROP TABLE IF EXISTS milestones_details;
CREATE TABLE milestones_details (
  id bigserial NOT NULL,
  active int DEFAULT NULL,
  owner bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  created_time timestamp NULL DEFAULT NULL,
  updated_time timestamp NULL DEFAULT NULL,
  milestones_value text,
  initiative_id bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table mision_vision_value
--

DROP TABLE IF EXISTS mision_vision_value;
CREATE TABLE mision_vision_value (
  ID bigserial NOT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  missionvisionvalue text,
  dept_id bigint DEFAULT '0',
  org_id bigint DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table module_details
--

DROP TABLE IF EXISTS module_details;
CREATE TABLE module_details (
  module_id bigserial NOT NULL,
  module_name varchar(100) DEFAULT NULL,
  tag_name varchar(100) DEFAULT NULL,
  PRIMARY KEY (module_id)
);

--
--

--
-- Table structure for table module_privilege_mapping
--

DROP TABLE IF EXISTS module_privilege_mapping;
CREATE TABLE module_privilege_mapping (
  id serial NOT NULL,
  role_id bigint DEFAULT NULL,
  module_id bigint DEFAULT NULL,
  module_name varchar(255) DEFAULT NULL,
  tag_name varchar(255) DEFAULT NULL,
  active int DEFAULT '0',
  privilegeCreate varchar(45) DEFAULT NULL,
  privilegeUpdate varchar(45) DEFAULT NULL,
  privilegeView varchar(45) DEFAULT NULL,
  privilegeDelete varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table notification_details
--

DROP TABLE IF EXISTS notification_details;
CREATE TABLE notification_details (
  id bigint NOT NULL DEFAULT '0',
  notification_value text,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  status varchar(255) DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  target_id bigint DEFAULT NULL,
  type varchar(100) DEFAULT NULL,
  meeting_time timestamp DEFAULT NULL
);

--
--

--
-- Table structure for table notification_details_bkp
--

DROP TABLE IF EXISTS notification_details_bkp;
CREATE TABLE notification_details_bkp (
  id bigserial NOT NULL,
  notification_value text,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  status varchar(255) DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  target_id bigint DEFAULT NULL,
  type varchar(100) DEFAULT NULL,
  meeting_time timestamp DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table notification_queue
--

DROP TABLE IF EXISTS notification_queue;
CREATE TABLE notification_queue (
  id bigserial NOT NULL,
  kpi_id varchar(255) NOT NULL,
  notification_type int NOT NULL,
  date_of_notification date NOT NULL,
  target_value varchar(255) DEFAULT NULL,
  actual_value varchar(255) DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  month_year varchar(255) DEFAULT NULL,
  kpi_name varchar(255) DEFAULT NULL,
  department_name varchar(255) DEFAULT NULL,
  owner bigint DEFAULT NULL,
  frequency varchar(255) DEFAULT NULL,
  employee_email varchar(255) DEFAULT NULL,
  employee_full_name varchar(255) DEFAULT NULL,
  sent boolean NOT NULL DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE (kpi_id,notification_type,date_of_notification)
);

--
--

--
-- Table structure for table objectives
--

DROP TABLE IF EXISTS objectives;
CREATE TABLE objectives (
  id bigserial NOT NULL,
  active int DEFAULT '0',
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  owner bigint DEFAULT NULL,
  score_card_id bigint DEFAULT NULL,
  objectives_val text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  objectives_id varchar(50) DEFAULT NULL,
  objective_id_seq bigint DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT objective_constraint FOREIGN KEY (score_card_id) REFERENCES score_card (id)
);

--
--

--
-- Table structure for table org_department_details
--

DROP TABLE IF EXISTS org_department_details;
CREATE TABLE org_department_details (
  dept_id bigserial NOT NULL,
  dept_name varchar(255) DEFAULT NULL,
  status varchar(45) DEFAULT NULL,
  orgId bigint DEFAULT NULL,
  dept_unique_id varchar(255) DEFAULT NULL,
  PRIMARY KEY (dept_id)
);

--
--

--
-- Table structure for table org_department_details_his
--

DROP TABLE IF EXISTS org_department_details_his;
CREATE TABLE org_department_details_his (
  id bigserial NOT NULL,
  dept_id bigint NOT NULL,
  dept_unique_id varchar(255) DEFAULT NULL,
  dept_name varchar(255) DEFAULT NULL,
  status varchar(255) DEFAULT NULL,
  orgId bigint DEFAULT NULL,
  year int NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (dept_id,year)
);

--
--

--
-- Table structure for table org_group_member_mapping
--

DROP TABLE IF EXISTS org_group_member_mapping;
CREATE TABLE org_group_member_mapping (
  orggroup_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table org_group_user_mapping
--

DROP TABLE IF EXISTS org_group_user_mapping;
CREATE TABLE org_group_user_mapping (
  orggroup_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table org_kpi_details
--

DROP TABLE IF EXISTS org_kpi_details;
CREATE TABLE org_kpi_details (
  org_kpi_id bigserial NOT NULL,
  metric_code varchar(20) DEFAULT NULL,
  organization_name varchar(100) DEFAULT NULL,
  real_date_from date DEFAULT NULL,
  month_year varchar(30) DEFAULT NULL,
  financial_month varchar(30) DEFAULT NULL,
  mtd_actual varchar(50) DEFAULT NULL,
  mtd_target varchar(50) DEFAULT NULL,
  rolling_12_actual varchar(50) DEFAULT NULL,
  rolling_12_budget varchar(50) DEFAULT NULL,
  org_key bigint DEFAULT NULL,
  node_key bigint DEFAULT NULL,
  uploaded_by bigint DEFAULT NULL,
  real_date_to date DEFAULT NULL,
  type varchar(50) DEFAULT NULL,
  currency varchar(50) DEFAULT NULL,
  batch_id bigint DEFAULT NULL,
  measureKey bigint DEFAULT NULL,
  measureType int DEFAULT '0',
  dept_id bigint DEFAULT NULL,
  formData int DEFAULT '0',
  PRIMARY KEY (org_kpi_id),
  CONSTRAINT org_key_emp_Id FOREIGN KEY (org_key) REFERENCES employee_details (emp_id)
);

--
--

--
-- Table structure for table org_kpi_entry
--

DROP TABLE IF EXISTS org_kpi_entry;
CREATE TABLE org_kpi_entry (
  id bigserial NOT NULL,
  preferenc_id bigint DEFAULT NULL,
  self_rating int DEFAULT NULL,
  manager_rating int DEFAULT NULL,
  consensual_rating int DEFAULT NULL,
  kpi_name varchar(225) DEFAULT NULL,
  kpi_id bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table org_structure_details
--

DROP TABLE IF EXISTS org_structure_details;
CREATE TABLE org_structure_details (
  Id bigserial NOT NULL,
  empId bigint DEFAULT NULL,
  status varchar(45) DEFAULT NULL,
  parent_id bigint DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_Time timestamp DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  active int DEFAULT '0',
  PRIMARY KEY (Id)
);

--
--

--
-- Table structure for table org_subkpi_entry
--

DROP TABLE IF EXISTS org_subkpi_entry;
CREATE TABLE org_subkpi_entry (
  id bigserial NOT NULL,
  preferenc_id bigint DEFAULT NULL,
  self_rating int DEFAULT NULL,
  manager_rating int DEFAULT NULL,
  consensual_rating int DEFAULT NULL,
  subkpi_name varchar(225) DEFAULT NULL,
  subkpi_id bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table org_tracker
--

DROP TABLE IF EXISTS org_tracker;
CREATE TABLE org_tracker (
  Id bigserial NOT NULL,
  empId bigint DEFAULT NULL,
  parent_id bigint DEFAULT NULL,
  type varchar(45) DEFAULT NULL,
  who_user_id bigint DEFAULT NULL,
  orgId bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  start_date timestamp DEFAULT NULL,
  end_date timestamp DEFAULT NULL,
  active int DEFAULT '0',
  pageName varchar(45) DEFAULT NULL,
  pageId bigint DEFAULT NULL,
  PRIMARY KEY (Id)
);

--
--

--
-- Table structure for table organization_details
--

DROP TABLE IF EXISTS organization_details;
CREATE TABLE organization_details (
  org_id serial NOT NULL,
  org_name varchar(50) DEFAULT NULL,
  status varchar(10) DEFAULT NULL,
  PRIMARY KEY (org_id)
);

--
--

--
-- Table structure for table orgstructure_group
--

DROP TABLE IF EXISTS orgstructure_group;
CREATE TABLE orgstructure_group (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  groupValue text,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table page_details
--

DROP TABLE IF EXISTS page_details;
CREATE TABLE page_details (
  ID bigserial NOT NULL,
  page_name varchar(100) DEFAULT NULL,
  page_type varchar(50) DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  active int DEFAULT '0',
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  default_page varchar(1) DEFAULT 'N',
  dept_id bigint DEFAULT NULL,
  column_type varchar(255) DEFAULT NULL,
  language varchar(200) DEFAULT NULL,
  group_type varchar(50) DEFAULT NULL,
  pinned varchar(45) DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table password_reset
--

DROP TABLE IF EXISTS password_reset;
CREATE TABLE password_reset (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  user_id bigint DEFAULT '0',
  status int DEFAULT '0',
  token varchar(500) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table performance_contract
--

DROP TABLE IF EXISTS performance_contract;
CREATE TABLE performance_contract (
  id bigserial NOT NULL,
  scorecard_id bigint DEFAULT NULL,
  type varchar(100) DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  deptid bigint DEFAULT NULL,
  performance_value text,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table pestel_analysis
--

DROP TABLE IF EXISTS pestel_analysis;
CREATE TABLE pestel_analysis (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  flagType varchar(255) DEFAULT NULL,
  pestelAnalysisValue text,
  page_id bigint DEFAULT NULL,
  dept_id bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table pestel_analysis_attachment
--

DROP TABLE IF EXISTS pestel_analysis_attachment;
CREATE TABLE pestel_analysis_attachment (
  id bigserial NOT NULL,
  active int DEFAULT '0',
  pestel_analysis_id bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  size varchar(255) DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  file text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table pestel_user_mapping
--

DROP TABLE IF EXISTS pestel_user_mapping;
CREATE TABLE pestel_user_mapping (
  pestel_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table preference_details
--

DROP TABLE IF EXISTS preference_details;
CREATE TABLE preference_details (
  id bigserial NOT NULL,
  page_id bigint DEFAULT NULL,
  enabled varchar(30) DEFAULT NULL,
  preference_name varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table preference_sub_detail
--

DROP TABLE IF EXISTS preference_sub_detail;
CREATE TABLE preference_sub_detail (
  ID bigserial NOT NULL,
  daskhboard_id bigint DEFAULT NULL,
  preference_value text,
  record_type varchar(100) DEFAULT NULL,
  record_id bigint DEFAULT '0',
  chart_id bigint DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table privilege_details
--

DROP TABLE IF EXISTS privilege_details;
CREATE TABLE privilege_details (
  privilege_id bigserial NOT NULL,
  privilege_name varchar(100) DEFAULT NULL,
  PRIMARY KEY (privilege_id)
);

--
--

--
-- Table structure for table processenabler
--

DROP TABLE IF EXISTS processenabler;
CREATE TABLE processenabler (
  id bigserial NOT NULL,
  posvalues json DEFAULT NULL,
  create_by bigint DEFAULT NULL,
  update_by bigint DEFAULT NULL,
  create_time timestamp DEFAULT NULL,
  update_time timestamp DEFAULT NULL,
  deptid bigint DEFAULT '0',
  owner bigint DEFAULT '0',
  page_id varchar(45) DEFAULT NULL,
  change_id bigint DEFAULT '0',
  status varchar(105) DEFAULT NULL,
  version bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table processenabler_history
--

DROP TABLE IF EXISTS processenabler_history;
CREATE TABLE processenabler_history (
  id bigserial NOT NULL,
  pos_id bigint DEFAULT '0',
  posvalues json DEFAULT NULL,
  create_by bigint DEFAULT NULL,
  update_by bigint DEFAULT NULL,
  create_time timestamp DEFAULT NULL,
  update_time timestamp DEFAULT NULL,
  deptid bigint DEFAULT '0',
  owner bigint DEFAULT '0',
  page_id varchar(45) DEFAULT NULL,
  change_id bigint DEFAULT '0',
  status varchar(105) DEFAULT NULL,
  version bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table project_formulation
--

DROP TABLE IF EXISTS project_formulation;
CREATE TABLE project_formulation (
  id bigint NOT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  approved_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  approved_date date DEFAULT NULL,
  status varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table project_formulation_user_mapping
--

DROP TABLE IF EXISTS project_formulation_user_mapping;
CREATE TABLE project_formulation_user_mapping (
  formulation_id bigint DEFAULT NULL,
  emp_id bigint DEFAULT NULL
);

--
--

--
-- Table structure for table project_planning
--

DROP TABLE IF EXISTS project_planning;
CREATE TABLE project_planning (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  planningvalue text,
  page_id bigint DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  initiative_id bigint DEFAULT '0',
  initiativepage_id bigint DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_Project_planning
--

DROP TABLE IF EXISTS risk_Project_planning;
CREATE TABLE risk_Project_planning (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  riskplanningvalue text,
  page_id bigint DEFAULT NULL,
  identified_date date DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  risk_id bigint DEFAULT '0',
  riskpage_id bigint DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_activities
--

DROP TABLE IF EXISTS risk_activities;
CREATE TABLE risk_activities (
  ID bigserial NOT NULL,
  risk_plan_id bigint DEFAULT NULL,
  risk_activities_value text,
  active varchar(45) DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  version bigint DEFAULT '0',
  change_id bigint DEFAULT '0',
  status varchar(100) DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_activities_history
--

DROP TABLE IF EXISTS risk_activities_history;
CREATE TABLE risk_activities_history (
  ID bigserial NOT NULL,
  risk_activities_id bigint DEFAULT NULL,
  risk_activities_value text,
  created_time date DEFAULT NULL,
  version bigint DEFAULT '0',
  change_id bigint DEFAULT '0',
  status varchar(100) DEFAULT NULL,
  riskplanid bigint DEFAULT '0',
  active int DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_activities_user_mapping
--

DROP TABLE IF EXISTS risk_activities_user_mapping;
CREATE TABLE risk_activities_user_mapping (
  activities_id bigint DEFAULT NULL,
  emp_ID bigint DEFAULT NULL
);

--
--

--
-- Table structure for table risk_attachment
--

DROP TABLE IF EXISTS risk_attachment;
CREATE TABLE risk_attachment (
  id bigserial NOT NULL,
  active int DEFAULT '0',
  riskid bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  file_name varchar(255) DEFAULT NULL,
  size varchar(255) DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  file text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  uniquereference varchar(105) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table risk_cause_consequence
--

DROP TABLE IF EXISTS risk_cause_consequence;
CREATE TABLE risk_cause_consequence (
  ID bigserial NOT NULL,
  risk_id bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT '0',
  cause_consequence_value text,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  status varchar(100) DEFAULT NULL,
  version bigint DEFAULT '0',
  change_id bigint DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_cause_consequence_history
--

DROP TABLE IF EXISTS risk_cause_consequence_history;
CREATE TABLE risk_cause_consequence_history (
  ID bigserial NOT NULL,
  risk_cause_id bigint DEFAULT NULL,
  risk_id bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT '0',
  cause_consequence_value text,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  status varchar(100) DEFAULT NULL,
  version bigint DEFAULT '0',
  change_id bigint DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_comment_mapping
--

DROP TABLE IF EXISTS risk_comment_mapping;
CREATE TABLE risk_comment_mapping (
  ID bigserial NOT NULL,
  empId bigint DEFAULT NULL,
  comment_id bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_comments
--

DROP TABLE IF EXISTS risk_comments;
CREATE TABLE risk_comments (
  ID bigserial NOT NULL,
  risk_id bigint DEFAULT NULL,
  risk_comments_value text,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  from_page varchar(50) DEFAULT NULL,
  like_count bigint DEFAULT NULL,
  comments_parendId bigint DEFAULT '0',
  comment_type bigint DEFAULT '0',
  version bigint DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_consequence
--

DROP TABLE IF EXISTS risk_consequence;
CREATE TABLE risk_consequence (
  ID bigserial NOT NULL,
  cause_conq_id bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT '0',
  consequence_value text,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  status varchar(100) DEFAULT NULL,
  version bigint DEFAULT '0',
  change_id bigint DEFAULT '0',
  PRIMARY KEY (ID),
  CONSTRAINT cause_and_consequence FOREIGN KEY (cause_conq_id) REFERENCES risk_cause_consequence (ID)
);

--
--

--
-- Table structure for table risk_consequence_history
--

DROP TABLE IF EXISTS risk_consequence_history;
CREATE TABLE risk_consequence_history (
  history_id bigserial NOT NULL,
  id bigint DEFAULT NULL,
  cause_conq_id bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT '0',
  consequence_value text,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  status varchar(100) DEFAULT NULL,
  version bigint DEFAULT '0',
  change_id bigint DEFAULT '0',
  PRIMARY KEY (history_id)
);

--
--

--
-- Table structure for table risk_custom_score
--

DROP TABLE IF EXISTS risk_custom_score;
CREATE TABLE risk_custom_score (
  id serial NOT NULL,
  description varchar(100) DEFAULT NULL,
  score varchar(10) DEFAULT NULL,
  priority int DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table risk_details
--

DROP TABLE IF EXISTS risk_details;
CREATE TABLE risk_details (
  ID bigserial NOT NULL,
  risk_value text,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  impact_kpi_id bigint DEFAULT NULL,
  page_id bigint DEFAULT NULL,
  raised_date date DEFAULT NULL,
  completed_date date DEFAULT NULL,
  department_id varchar(100) DEFAULT NULL,
  risk_id varchar(45) DEFAULT NULL,
  version bigint DEFAULT '0',
  status varchar(100) DEFAULT NULL,
  change_id bigint DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_details_history
--

DROP TABLE IF EXISTS risk_details_history;
CREATE TABLE risk_details_history (
  ID bigserial NOT NULL,
  risk_detail_id bigint DEFAULT '0',
  risk_value text,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  impact_kpi_id bigint DEFAULT NULL,
  page_id bigint DEFAULT NULL,
  raised_date date DEFAULT NULL,
  completed_date date DEFAULT NULL,
  department_id varchar(100) DEFAULT NULL,
  risk_id varchar(45) DEFAULT NULL,
  version bigint DEFAULT '0',
  status varchar(100) DEFAULT NULL,
  change_id bigint DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_event
--

DROP TABLE IF EXISTS risk_event;
CREATE TABLE risk_event (
  id bigserial NOT NULL,
  incident_date varchar(50) DEFAULT NULL,
  risk_code varchar(50) DEFAULT NULL,
  incident varchar(1000) DEFAULT NULL,
  event_type varchar(1000) DEFAULT NULL,
  incident_category varchar(1000) DEFAULT NULL,
  incident_description varchar(1000) DEFAULT NULL,
  impact_category varchar(1000) DEFAULT NULL,
  impact_description varchar(1000) DEFAULT NULL,
  impact_level varchar(1000) DEFAULT NULL,
  corrective_action varchar(1000) DEFAULT NULL,
  risk_mitigation varchar(1000) DEFAULT NULL,
  event_status varchar(100) DEFAULT NULL,
  reporter varchar(250) DEFAULT NULL,
  reporter_name varchar(50) DEFAULT NULL,
  created_at timestamp DEFAULT NULL,
  updated_at timestamp DEFAULT NULL,
  created_by varchar(50) DEFAULT NULL,
  updated_by varchar(50) DEFAULT NULL,
  page_id bigint DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  incident_impact_data varchar(1000) DEFAULT NULL,
  change_id bigint DEFAULT '0',
  status varchar(105) DEFAULT NULL,
  version bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table risk_event_history
--

DROP TABLE IF EXISTS risk_event_history;
CREATE TABLE risk_event_history (
  id bigserial NOT NULL,
  risk_event_id bigint DEFAULT NULL,
  incident_date varchar(50) DEFAULT NULL,
  risk_code varchar(50) DEFAULT NULL,
  incident varchar(1000) DEFAULT NULL,
  event_type varchar(1000) DEFAULT NULL,
  incident_category varchar(1000) DEFAULT NULL,
  incident_description varchar(1000) DEFAULT NULL,
  impact_category varchar(1000) DEFAULT NULL,
  impact_description varchar(1000) DEFAULT NULL,
  impact_level varchar(1000) DEFAULT NULL,
  corrective_action varchar(1000) DEFAULT NULL,
  risk_mitigation varchar(1000) DEFAULT NULL,
  event_status varchar(100) DEFAULT NULL,
  reporter varchar(250) DEFAULT NULL,
  reporter_name varchar(50) DEFAULT NULL,
  created_at timestamp DEFAULT NULL,
  updated_at timestamp DEFAULT NULL,
  created_by varchar(50) DEFAULT NULL,
  updated_by varchar(50) DEFAULT NULL,
  page_id bigint DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  incident_impact_data varchar(1000) DEFAULT NULL,
  version bigint DEFAULT '0',
  status varchar(105) DEFAULT NULL,
  change_id bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table risk_formulation
--

DROP TABLE IF EXISTS risk_formulation;
CREATE TABLE risk_formulation (
  id bigint NOT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  approved_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  status varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table risk_formulation_user_mapping
--

DROP TABLE IF EXISTS risk_formulation_user_mapping;
CREATE TABLE risk_formulation_user_mapping (
  formulation_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table risk_monitoring
--

DROP TABLE IF EXISTS risk_monitoring;
CREATE TABLE risk_monitoring (
  ID bigserial NOT NULL,
  risk_id bigint DEFAULT NULL,
  risk_monitoring_value text,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_options
--

DROP TABLE IF EXISTS risk_options;
CREATE TABLE risk_options (
  id serial NOT NULL,
  value varchar(200) DEFAULT NULL,
  type_val varchar(30) DEFAULT NULL,
  option_val varchar(200) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table risk_plan
--

DROP TABLE IF EXISTS risk_plan;
CREATE TABLE risk_plan (
  ID bigserial NOT NULL,
  risk_id bigint DEFAULT NULL,
  risk_plan_value text,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  type_flag varchar(255) DEFAULT NULL,
  status varchar(100) DEFAULT NULL,
  version bigint DEFAULT '0',
  change_id bigint DEFAULT '0',
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table risk_plan_history
--

DROP TABLE IF EXISTS risk_plan_history;
CREATE TABLE risk_plan_history (
  history_id bigserial NOT NULL,
  risk_plan_id bigint DEFAULT NULL,
  risk_id bigint DEFAULT NULL,
  risk_plan_value text,
  active int DEFAULT '0',
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  type_flag varchar(255) DEFAULT NULL,
  status varchar(100) DEFAULT NULL,
  version bigint DEFAULT '0',
  change_id bigint DEFAULT '0',
  PRIMARY KEY (history_id)
);

--
--

--
-- Table structure for table risk_plan_user_mapping
--

DROP TABLE IF EXISTS risk_plan_user_mapping;
CREATE TABLE risk_plan_user_mapping (
  risk_plan_id bigint DEFAULT NULL,
  emp_ID bigint DEFAULT NULL
);

--
--

--
-- Table structure for table role_details
--

DROP TABLE IF EXISTS role_details;
CREATE TABLE role_details (
  role_id bigserial NOT NULL,
  role_name varchar(100) DEFAULT NULL,
  status int DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  org_id bigint DEFAULT NULL,
  role_type varchar(45) DEFAULT NULL,
  type int DEFAULT '0',
  PRIMARY KEY (role_id)
);

--
--

--
-- Table structure for table role_module_mapping
--

DROP TABLE IF EXISTS role_module_mapping;
CREATE TABLE role_module_mapping (
  role_id bigint NOT NULL,
  module_id bigint NOT NULL
);

--
--

--
-- Table structure for table role_privilege_mapping
--

DROP TABLE IF EXISTS role_privilege_mapping;
CREATE TABLE role_privilege_mapping (
  role_id bigint NOT NULL,
  privilege_id bigint NOT NULL
);

--
--

--
-- Table structure for table role_user_mapping
--

DROP TABLE IF EXISTS role_user_mapping;
CREATE TABLE role_user_mapping (
  role_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table roles
--

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  role_id bigserial NOT NULL,
  role_name varchar(255) DEFAULT NULL,
  PRIMARY KEY (role_id)
);

--
--

--
-- Table structure for table rpo
--

DROP TABLE IF EXISTS rpo;
CREATE TABLE rpo (
  id bigserial NOT NULL,
  rpovalues json DEFAULT NULL,
  create_by bigint DEFAULT '0',
  update_by bigint DEFAULT '0',
  create_time timestamp DEFAULT NULL,
  update_time timestamp DEFAULT NULL,
  deptid bigint DEFAULT '0',
  owner bigint DEFAULT '0',
  page_id varchar(45) DEFAULT NULL,
  change_id bigint DEFAULT '0',
  status varchar(105) DEFAULT NULL,
  version bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table rpo_history
--

DROP TABLE IF EXISTS rpo_history;
CREATE TABLE rpo_history (
  id bigserial NOT NULL,
  rpo_id bigint DEFAULT '0',
  rpovalues json DEFAULT NULL,
  create_by bigint DEFAULT '0',
  update_by bigint DEFAULT '0',
  create_time timestamp DEFAULT NULL,
  update_time timestamp DEFAULT NULL,
  deptid bigint DEFAULT '0',
  owner bigint DEFAULT '0',
  page_id varchar(45) DEFAULT NULL,
  change_id bigint DEFAULT '0',
  status varchar(105) DEFAULT NULL,
  version bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table scheduler_batch_details
--

DROP TABLE IF EXISTS scheduler_batch_details;
CREATE TABLE scheduler_batch_details (
  orgId bigint NOT NULL,
  uploaded_by bigint DEFAULT NULL,
  scheduler_type varchar(255) DEFAULT NULL,
  backup_file_path varchar(255) DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  current_batch_time timestamp DEFAULT NULL,
  next_batch_time timestamp DEFAULT NULL,
  backup_path varchar(255) DEFAULT NULL,
  PRIMARY KEY (orgId)
);

--
--

--
-- Table structure for table score_card
--

DROP TABLE IF EXISTS score_card;
CREATE TABLE score_card (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  score_card_val text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  page_id bigint DEFAULT NULL,
  score_name varchar(100) DEFAULT NULL,
  include_reportee smallint DEFAULT '0',
  custom_repotees varchar(255) DEFAULT NULL,
  perspective_id varchar(50) DEFAULT NULL,
  perspective_id_seq bigint DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  scoreCardDetailsId bigint DEFAULT NULL,
  language varchar(200) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table score_card_details
--

DROP TABLE IF EXISTS score_card_details;
CREATE TABLE score_card_details (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  score_card_details_val text,
  page_id bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_Time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  score_name varchar(255) DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  language varchar(200) DEFAULT NULL,
  PRIMARY KEY (ID),
  UNIQUE (active,page_id,owner)
);

--
--

--
-- Table structure for table staging_changes
--

DROP TABLE IF EXISTS staging_changes;
CREATE TABLE staging_changes (
  change_id bigserial NOT NULL,
  table_name varchar(255) DEFAULT NULL,
  record_id bigint DEFAULT NULL,
  column_name varchar(255) DEFAULT NULL,
  old_value text,
  new_value text,
  status varchar(20) DEFAULT 'PENDING_APPROVAL',
  submitted_by bigint DEFAULT NULL,
  type varchar(100) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  comments text,
  workflow_id bigint DEFAULT NULL,
  version bigint DEFAULT '0',
  parent_id bigint DEFAULT '0',
  condition_type varchar(145) DEFAULT NULL,
  approved_version bigint DEFAULT '0',
  parent_record_id bigint DEFAULT '0',
  PRIMARY KEY (change_id)
);

--
--

--
-- Table structure for table strategy_formulation
--

DROP TABLE IF EXISTS strategy_formulation;
CREATE TABLE strategy_formulation (
  id bigserial NOT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  plan_type varchar(50) DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  approved_by bigint DEFAULT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  approved_date date DEFAULT NULL,
  status varchar(50) DEFAULT NULL,
  page_id bigint DEFAULT NULL,
  name varchar(300) DEFAULT NULL,
  dept varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table strategy_map
--

DROP TABLE IF EXISTS strategy_map;
CREATE TABLE strategy_map (
  id bigserial NOT NULL,
  name varchar(255) DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  scorecard_detail_id bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  update_by bigint DEFAULT NULL,
  create_at timestamp NULL DEFAULT NULL,
  update_at timestamp NULL DEFAULT NULL,
  setting text,
  page_id bigint DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_strategy_map_page FOREIGN KEY (page_id) REFERENCES page_details (ID)
);

--
--

--
-- Table structure for table sub_initiatives_details
--

DROP TABLE IF EXISTS sub_initiatives_details;
CREATE TABLE sub_initiatives_details (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT NULL,
  sub_initiative_value text,
  initiative_id bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table sub_initiatives_map
--

DROP TABLE IF EXISTS sub_initiatives_map;
CREATE TABLE sub_initiatives_map (
  ID bigserial NOT NULL,
  sub_initiative_id bigint DEFAULT NULL,
  emp_ID bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table subactivities_details
--

DROP TABLE IF EXISTS subactivities_details;
CREATE TABLE subactivities_details (
  id bigserial NOT NULL,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT NULL,
  activities_value text,
  activity_id bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table subkpi
--

DROP TABLE IF EXISTS subkpi;
CREATE TABLE subkpi (
  id bigserial NOT NULL,
  active int DEFAULT '0',
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  owner bigint DEFAULT NULL,
  kpi_id bigint DEFAULT NULL,
  subkpi_value text,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  subkpi_id varchar(50) DEFAULT NULL,
  sub_kpi_id_sequence bigint DEFAULT NULL,
  sub_kpi_name varchar(300) DEFAULT NULL,
  org_id bigint DEFAULT NULL,
  include_reportee smallint DEFAULT '0',
  custom_repotees varchar(255) DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  act_type int DEFAULT '0',
  objective_id bigint DEFAULT '0',
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table swot_analysis
--

DROP TABLE IF EXISTS swot_analysis;
CREATE TABLE swot_analysis (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  flag_type varchar(255) DEFAULT NULL,
  swot_analysis_value text,
  page_id bigint DEFAULT NULL,
  dept_id bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table swot_analysis_attachment
--

DROP TABLE IF EXISTS swot_analysis_attachment;
CREATE TABLE swot_analysis_attachment (
  id bigserial NOT NULL,
  active int DEFAULT '0',
  swot_analysis_id bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  size varchar(255) DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  file text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table swot_user_mapping
--

DROP TABLE IF EXISTS swot_user_mapping;
CREATE TABLE swot_user_mapping (
  swot_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table task_categorys
--

DROP TABLE IF EXISTS task_categorys;
CREATE TABLE task_categorys (
  ID bigserial NOT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT '0',
  task_category_value text,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  deptid bigint DEFAULT '0',
  pageid bigint DEFAULT '0',
  type varchar(205) DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table task_details
--

DROP TABLE IF EXISTS task_details;
CREATE TABLE task_details (
  ID bigserial NOT NULL,
  task_category_id bigint DEFAULT NULL,
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  active int DEFAULT '0',
  task_value text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  priority varchar(100) DEFAULT NULL,
  status varchar(100) DEFAULT NULL,
  start_date date DEFAULT NULL,
  end_date date DEFAULT NULL,
  PRIMARY KEY (ID),
  CONSTRAINT task_categorys FOREIGN KEY (task_category_id) REFERENCES task_categorys (ID)
);

--
--

--
-- Table structure for table task_owner_mapping
--

DROP TABLE IF EXISTS task_owner_mapping;
CREATE TABLE task_owner_mapping (
  task_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table task_user_mapping
--

DROP TABLE IF EXISTS task_user_mapping;
CREATE TABLE task_user_mapping (
  task_id bigint NOT NULL,
  emp_id bigint NOT NULL
);

--
--

--
-- Table structure for table universal_incident
--

DROP TABLE IF EXISTS universal_incident;
CREATE TABLE universal_incident (
  ID bigserial NOT NULL,
  active int DEFAULT '0',
  owner bigint DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  created_time date DEFAULT NULL,
  updated_time date DEFAULT NULL,
  incident_value text,
  page_id bigint DEFAULT NULL,
  department_id bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table universal_incident_attachment
--

DROP TABLE IF EXISTS universal_incident_attachment;
CREATE TABLE universal_incident_attachment (
  id bigserial NOT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  size varchar(255) DEFAULT NULL,
  type varchar(255) DEFAULT NULL,
  filename text,
  created_time timestamp DEFAULT NULL,
  updated_time timestamp DEFAULT NULL,
  incident_id bigint DEFAULT '0',
  uniquereference varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
);

--
--

--
-- Table structure for table user_dept_mapping
--

DROP TABLE IF EXISTS user_dept_mapping;
CREATE TABLE user_dept_mapping (
  ID bigserial NOT NULL,
  empId bigint DEFAULT NULL,
  dept_id bigint DEFAULT NULL,
  PRIMARY KEY (ID)
);

--
--

--
-- Table structure for table user_role_management
--

DROP TABLE IF EXISTS user_role_management;
CREATE TABLE user_role_management (
  emp_id bigint NOT NULL,
  dept_id bigint DEFAULT NULL,
  org_id bigint DEFAULT NULL,
  name varchar(45) DEFAULT NULL,
  profile_image text,
  department varchar(100) DEFAULT NULL,
  location varchar(45) DEFAULT NULL,
  email_address varchar(45) DEFAULT NULL,
  phone_number varchar(45) DEFAULT NULL,
  created_date timestamp DEFAULT NULL,
  updated_date timestamp DEFAULT NULL,
  created_by bigint DEFAULT NULL,
  updated_by bigint DEFAULT NULL,
  status varchar(45) DEFAULT NULL,
  designation varchar(45) DEFAULT NULL,
  role varchar(45) DEFAULT NULL,
  login_status varchar(45) DEFAULT NULL,
  active int DEFAULT '0',
  userAccess int DEFAULT NULL,
  role_id bigint DEFAULT NULL,
  user_category varchar(200) DEFAULT NULL,
  user_type varchar(100) DEFAULT NULL,
  user_uniqid varchar(200) DEFAULT NULL,
  PRIMARY KEY (emp_id)
);

--
--

-- Dump completed on 2026-06-14  7:17:14
