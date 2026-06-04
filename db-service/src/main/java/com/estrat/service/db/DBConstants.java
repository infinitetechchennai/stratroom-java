/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.DBConstants
 */
package com.estrat.service.db;

public class DBConstants {
    public static final String DB_CACHE = "dbCache";
    public static final String NODE_KEY_LIST = "nodeKeyList";
    public static final String SELECT_QUERY = "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency FROM orgstructure.org_kpi_details org WHERE";
    public static final String SELECT_QUERY_BY_DPT = "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, dpt.dept_name  AS dept,org.measureKey as measureKey, org.measureType, kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt, orgstructure.kpi_element_details kpi_elem WHERE ";
    public static final String SELECT_QUERY_WIth_DPT = "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual as A,org.mtd_target as T,org.rolling_12_actual as RA,org.rolling_12_budget as B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency, org.dept_id, ed.department AS dept, org.measureKey as measureKey, org.measureType,kpi_elem.measure_name as measureName FROM orgstructure.org_kpi_details org , orgstructure.employee_details ed, orgstructure.kpi_element_details kpi_elem WHERE ";
    public static final String YTD_QUERY = "SELECT MAX(CAST(temp.mtd_actual AS DECIMAL(38,2))) AS YTD, temp.type as type, temp.currency as currency FROM  (SELECT SUM(CAST(org.mtd_actual AS DECIMAL(38,2))) AS mtd_actual,org.type,org.currency  FROM orgstructure.org_kpi_details org  WHERE  where_replace GROUP BY org.real_date_from, org.real_date_to, org.type, org.currency ) temp group by type, currency";
    public static final String AVG_YTD_QUERY = "SELECT ROUND(AVG(CAST(temp.mtd_actual AS DECIMAL(38,2))),2) AS YTD, temp.type as type,temp.currency as currency FROM  (SELECT AVG(CAST(org.mtd_actual AS DECIMAL(38,2))) AS mtd_actual,org.type,org.currency   FROM orgstructure.org_kpi_details org  WHERE  where_replace GROUP BY org.real_date_from, org.real_date_to, org.type,org.currency ) temp group by type, currency";
    public static final String SELECT_QUERY_WITH_DEPT = "SELECT org.org_kpi_id,org.metric_code,org.organization_name,org.real_date_from,org.real_date_to,org.month_year,org.financial_month,org.mtd_actual AS A,org.mtd_target AS T,org.rolling_12_actual AS RA,org.rolling_12_budget AS B,org.org_key,org.node_key,org.uploaded_by,org.TYPE AS dataType,org.currency AS currency, ed.department AS dept FROM orgstructure.org_kpi_details org, orgstructure.employee_details ed WHERE ";
    public static final String SELECT_ROW_COUNT_QUERY = "SELECT DISTINCT org.node_key AS NODE_KEY FROM orgstructure.org_kpi_details org WHERE";
    public static final String SELECT_QUERY_WITH_AGG_ACTUAL = "SELECT sum(mtd_actual) as A FROM orgstructure.org_kpi_details  WHERE ";
    public static final String SELECT_QUERY_WITH_AGG_TARGET = "SELECT sum(mtd_target) as T FROM orgstructure.org_kpi_details  WHERE ";
    public static final String SELECT_QUERY_BY_DPT_ACTUAL = "SELECT sum(org.mtd_actual) as A  FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt WHERE ";
    public static final String SELECT_QUERY_BY_DPT_TARGET = "SELECT sum(org.mtd_target) as A  FROM orgstructure.org_kpi_details org , orgstructure.department_chart_details dpt WHERE ";
}

