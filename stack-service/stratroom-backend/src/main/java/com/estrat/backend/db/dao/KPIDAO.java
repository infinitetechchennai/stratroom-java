/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.ChildParent
 *  com.estrat.backend.db.bean.ChildParentEmp
 *  com.estrat.backend.db.bean.ChildParentEmpMapper
 *  com.estrat.backend.db.bean.ChildParentMapper
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.KpiListMapper
 *  com.estrat.backend.db.bean.po.ChildTracker
 *  com.estrat.backend.db.bean.po.DepartmentChartMapping
 *  com.estrat.backend.db.bean.po.KPI
 *  com.estrat.backend.db.bean.po.KPIDetailsPo
 *  com.estrat.backend.db.bean.po.KPIElementDetailsPo
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.KPICriteria
 *  com.estrat.backend.db.dao.KPIDAO
 *  com.estrat.backend.db.dao.KPIDAO$MeasureNameMapper
 *  com.estrat.backend.db.dao.KPIRepository
 *  com.estrat.backend.db.dto.KPIDetailsDTO
 *  com.estrat.backend.db.dto.KpiList
 *  com.estrat.backend.db.exception.ExceptionLogHelper
 *  com.estrat.backend.db.generators.NodeKeyGenerators
 *  com.estrat.backend.db.repository.ChildTrackerRepository
 *  javax.persistence.EntityManager
 *  javax.persistence.NoResultException
 *  javax.persistence.PersistenceContext
 *  javax.persistence.TypedQuery
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.hibernate.Session
 *  org.hibernate.query.NativeQuery
 *  org.hibernate.query.Query
 *  org.slf4j.Logger
 *  org.slf4j.LoggerFactory
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.context.annotation.Configuration
 *  org.springframework.dao.DataAccessException
 *  org.springframework.jdbc.core.JdbcTemplate
 *  org.springframework.jdbc.core.RowMapper
 */
package com.estrat.backend.db.dao;

import com.estrat.backend.db.bean.ChildParent;
import com.estrat.backend.db.bean.ChildParentEmp;
import com.estrat.backend.db.bean.ChildParentEmpMapper;
import com.estrat.backend.db.bean.ChildParentMapper;
import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.KpiListMapper;
import com.estrat.backend.db.bean.po.ChildTracker;
import com.estrat.backend.db.bean.po.DepartmentChartMapping;
import com.estrat.backend.db.bean.po.KPI;
import com.estrat.backend.db.bean.po.KPIDetailsPo;
import com.estrat.backend.db.bean.po.KPIElementDetailsPo;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.KPICriteria;
import com.estrat.backend.db.dao.KPIDAO;
import com.estrat.backend.db.dao.KPIRepository;
import com.estrat.backend.db.dto.KPIDetailsDTO;
import com.estrat.backend.db.dto.KpiList;
import com.estrat.backend.db.exception.ExceptionLogHelper;
import com.estrat.backend.db.generators.NodeKeyGenerators;
import com.estrat.backend.db.repository.ChildTrackerRepository;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

/*
 * Exception performing whole class analysis ignored.
 */
@Configuration
public class KPIDAO {
    private org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(KPIDAO.class);
    private Logger logger = LoggerFactory.getLogger(KPIDAO.class);
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private ChildTrackerRepository childTrackerRepository;
    @Autowired
    private KPIRepository kpiRepo;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private NodeKeyGenerators nodekeygen;
    @PersistenceContext
    private EntityManager entityManager;
    @Value(value="${datasource}")
    private String datasource;

    public Session getSession() {
        return (Session)this.entityManager.unwrap(Session.class);
    }

    public List<KPIDetailsDTO> retrieveNodeKeyList(long orgId) {
        List dbList = this.jdbcTemplate.query("SELECT ked.node_key,ked.measure_name,ked.measure_type,ked.measureKey FROM orgstructure.kpi_element_details ked WHERE  ked.element_type='ELEMENT' AND ked.active=0 AND ked.org_id=" + orgId + " GROUP BY ked.node_key,ked.measure_name, ked.measure_type,ked.measureKey", (RowMapper)new MeasureNameMapper(this));
        return dbList;
    }

    public List<Map<String, Object>> getOrgKPIDetails(KPICriteria kpiCriteria, String query) {
        List kpiDetailsList = null;
        try {
            StringBuffer buffer;
            ArrayList<Object> paramList = new ArrayList<Object>();
            StringBuilder builder = null;
            builder = kpiCriteria.isRetrieveYTD() ? new StringBuilder() : new StringBuilder(query);
            if (!kpiCriteria.getRealDates().isEmpty()) {
                Date currentdate;
                Date fromDt = (Date)kpiCriteria.getRealDates().get(0);
                Date toDt = (Date)kpiCriteria.getRealDates().get(1);
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String fromDtStr = dateFormat.format(fromDt);
                String toDtStr = dateFormat.format(toDt);
                if (kpiCriteria.isRetrieveYTD() && (currentdate = new Date()).before(toDt)) {
                    toDtStr = dateFormat.format(currentdate);
                }
                builder.append("  org.real_date_from >= '" + fromDtStr + "' AND org.real_date_to <='" + toDtStr + "'");
            }
            if (CollectionUtils.isNotEmpty((Collection)kpiCriteria.getNodeKeyList())) {
                buffer = new StringBuffer();
                for (int i = 0; i < kpiCriteria.getNodeKeyList().size(); ++i) {
                    buffer.append("?");
                    if (i == kpiCriteria.getNodeKeyList().size() - 1) continue;
                    buffer.append(",");
                }
                if (kpiCriteria.getMetricCode() != "") {
                    builder.append(" AND  (org.node_key in (" + buffer.toString() + ") or org.metric_code=? or org.measureKey in (" + buffer.toString() + ") ) ");
                    paramList.addAll(kpiCriteria.getNodeKeyList());
                    paramList.add(kpiCriteria.getMetricCode());
                    paramList.addAll(kpiCriteria.getNodeKeyList());
                } else {
                    builder.append(" AND (org.node_key in (" + buffer.toString() + ") or  org.measureKey in (" + buffer.toString() + ") ) ");
                    paramList.addAll(kpiCriteria.getNodeKeyList());
                    paramList.addAll(kpiCriteria.getNodeKeyList());
                }
            } else if (kpiCriteria.getNodeKey() != null) {
                if (kpiCriteria.getMetricCode() != "") {
                    builder.append(" AND (org.node_key=? or org.metric_code=? or org.measureKey=?) ");
                    paramList.add(kpiCriteria.getNodeKey());
                    paramList.add(kpiCriteria.getMetricCode());
                    paramList.add(kpiCriteria.getNodeKey());
                } else {
                    builder.append(" AND (org.node_key=? or org.measureKey=?) ");
                    paramList.add(kpiCriteria.getNodeKey());
                    paramList.add(kpiCriteria.getNodeKey());
                }
            } else if (StringUtils.isNotEmpty((CharSequence)kpiCriteria.getMetricCode())) {
                builder.append(" AND  org.metric_code=? ");
                paramList.add(kpiCriteria.getMetricCode());
            }
            if (!kpiCriteria.getEmployeeIds().isEmpty() && !paramList.isEmpty()) {
                builder.append(" AND ");
                buffer = new StringBuffer();
                for (int i = 0; i < kpiCriteria.getEmployeeIds().size(); ++i) {
                    buffer.append(kpiCriteria.getEmployeeIds().get(i));
                    if (i == kpiCriteria.getEmployeeIds().size() - 1) continue;
                    buffer.append(",");
                }
                builder.append("  org.org_key in(" + buffer.toString() + ") ");
            }
            if ("Dept".equalsIgnoreCase(kpiCriteria.getGroupBy()) || StringUtils.isNotEmpty((CharSequence)kpiCriteria.getDeptName())) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                builder.append("  org.org_key=ed.emp_id ");
                if (StringUtils.isNotEmpty((CharSequence)kpiCriteria.getDeptName())) {
                    if (!paramList.isEmpty()) {
                        builder.append(" AND ");
                    }
                    builder.append("  ed.department=? ");
                    paramList.add(kpiCriteria.getDeptName());
                }
            }
            String kpiFormulaQuery = null;
            kpiFormulaQuery = kpiCriteria.isRetrieveYTD() ? query.replaceAll("where_replace", builder.toString()) : builder.toString();
            kpiDetailsList = this.jdbcTemplate.queryForList(kpiFormulaQuery, paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public List<Long> getDepartmentList(long deptId, List<Long> departmentlist) {
        String query = "WITH RECURSIVE cte (deptId) AS (SELECT deptId FROM orgstructure.department_chart_details WHERE deptParentId = toreplace AND active=0 UNION ALL SELECT p.deptId FROM orgstructure.department_chart_details p INNER JOIN cte ON p.deptParentId = cte.deptId) SELECT deptId FROM cte;";
        query = query.replace("toreplace", String.valueOf(deptId));
        try {
            departmentlist = this.jdbcTemplate.queryForList(query.toString(), Long.class);
            departmentlist.add(deptId);
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return departmentlist;
    }

    public List<Long> getEmployeeList(long empId, List<Long> employeeList) {
        String query = "WITH RECURSIVE emp_cte AS (SELECT emp_id FROM orgstructure.employee_details WHERE parent_emp_id = toreplace AND status='Active' UNION ALL SELECT e.emp_id FROM orgstructure.employee_details e INNER JOIN emp_cte c ON e.parent_emp_id = c.emp_id WHERE e.status='Active') SELECT emp_id FROM emp_cte;";
        query = query.replace("toreplace", String.valueOf(empId));
        try {
            employeeList = this.jdbcTemplate.queryForList(query.toString(), Long.class);
            employeeList.add(empId);
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return employeeList;
    }

    public Map<Long, String> getDepartmentList(long deptId, String name) {
        String query = "WITH RECURSIVE dept_cte AS (SELECT deptId, dept_name AS deptName, deptParentId FROM orgstructure.department_chart_details WHERE deptParentId = toreplace AND active=0 UNION ALL SELECT d.deptId, d.dept_name, d.deptParentId FROM orgstructure.department_chart_details d INNER JOIN dept_cte c ON d.deptParentId = c.deptId WHERE d.active=0) SELECT deptId, deptName, deptParentId FROM dept_cte;";
        query = query.replace("toreplace", String.valueOf(deptId));
        HashMap<Long, String> groupdepartment = new HashMap<Long, String>();
        try {
            List<ChildParent> deptchart = this.jdbcTemplate.query(query.toString(), (RowMapper)new ChildParentMapper());
            HashMap<Long, Long> child_rel = new HashMap<Long, Long>();
            HashMap<Long, String> groupkey = new HashMap<Long, String>();
            for (ChildParent childParent : deptchart) {
                child_rel.put(childParent.getDeptId(), childParent.getDeptParentId());
                if (deptId != childParent.getDeptParentId()) continue;
                groupkey.put(childParent.getDeptId(), childParent.getDeptName() + "-" + childParent.getDeptId());
            }
            if (Objects.nonNull(name)) {
                groupkey.put(deptId, name);
            }
            for (ChildParent childParent_dict : deptchart) {
                if (childParent_dict.getDeptId() == deptId || childParent_dict.getDeptParentId() == deptId) continue;
                if (groupkey.get(childParent_dict.getDeptParentId()) != null) {
                    groupdepartment.put(childParent_dict.getDeptId(), (String)groupkey.get(childParent_dict.getDeptParentId()));
                    continue;
                }
                String deptname = KPIDAO.getgroupkeyparent(groupkey, (Long)childParent_dict.getDeptId(), child_rel);
                if (deptname == null) continue;
                groupdepartment.put(childParent_dict.getDeptId(), deptname);
            }
            if (groupkey.size() > 0) {
                groupdepartment.putAll(groupkey);
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return groupdepartment;
    }

    public Map<Long, List<ChildParent>> getDepartmentListRecursive(long deptId, Date fromDate, Date toDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formattedfromDate = formatter.format(fromDate);
        String formattedtoDate = formatter.format(toDate);
        String cacheKey = "deptRecursive_" + deptId + "_" + formattedfromDate + "_" + formattedtoDate;
        Object cached = this.dbCache.get((Object)cacheKey, "dbCache");
        if (cached != null) {
            return (Map)cached;
        }
        String query = "WITH RECURSIVE ParentChildCTE AS (\n    SELECT child_id, parent_id, child_id AS immediateChildParentId, from_date, to_date, 1 AS depth\n    FROM orgstructure.child_tracker\n    WHERE parent_id = toreplaceid AND\n          (from_date <= 'toreplacetoDate' AND (to_date IS NULL OR to_date >= 'toreplacefromDate')) AND\n          imp_type = 'Department'\n    UNION ALL\n    SELECT t.child_id, t.parent_id, cte.immediateChildParentId, t.from_date, t.to_date, cte.depth + 1 AS depth\n    FROM orgstructure.child_tracker t\n    INNER JOIN ParentChildCTE cte ON t.parent_id = cte.child_id\n    WHERE cte.depth < 10\n)\nSELECT DISTINCT c.child_id, c.parent_id, c.from_date, c.to_date, p.child_id AS immediateChildParentId,\n                dpt_chart.dept_name as immediateChildParentName\nFROM ParentChildCTE c\nLEFT JOIN orgstructure.child_tracker p ON c.immediateChildParentId = p.child_id\nLEFT JOIN orgstructure.department_chart_details dpt_chart ON dpt_chart.deptId = p.child_id\nORDER BY c.child_id;";
        query = query.replace("toreplaceid", String.valueOf(deptId));
        query = query.replace("toreplacetoDate", String.valueOf(formattedtoDate));
        query = query.replace("toreplacefromDate", String.valueOf(formattedfromDate));
        try {
            if (deptId <= 0L) {
                return null;
            }
            List<ChildParent> deptchart = this.jdbcTemplate.query(query.toString(), (RowMapper)new ChildParentMapper());
            if (Objects.nonNull(deptchart) && deptchart.size() > 0) {
                HashMap<Long, List<ChildParent>> childparentMap = new HashMap<Long, List<ChildParent>>();
                for (ChildParent childParent : deptchart) {
                    List<ChildParent> childparentList = new ArrayList<ChildParent>();
                    if (childparentMap.get(childParent.getDeptId()) != null) {
                        childparentList = (List)childparentMap.get(childParent.getDeptId());
                        childparentList.add(childParent);
                    } else {
                        childparentList.add(childParent);
                    }
                    childparentMap.put(childParent.getDeptId(), childparentList);
                }
                this.dbCache.putWithLifeSpan((Object)cacheKey, childparentMap, "dbCache");
                return childparentMap;
            }
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public Map<Long, List<ChildParentEmp>> getEmployeeListRecursive(long empId, Date fromDate, Date toDate) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formattedfromDate = formatter.format(fromDate);
        String formattedtoDate = formatter.format(toDate);
        String query = "WITH RECURSIVE ParentChildCTE AS (\n    SELECT child_id, parent_id, child_id AS immediateChildParentId, from_date, to_date, 1 AS depth\n    FROM orgstructure.child_tracker\n    WHERE parent_id = toreplaceid AND\n          (from_date <= 'toreplacetoDate' AND (to_date IS NULL OR to_date >= 'toreplacefromDate')) AND\n          imp_type = 'Employee'\n    UNION ALL\n    SELECT t.child_id, t.parent_id, cte.immediateChildParentId, t.from_date, t.to_date, cte.depth + 1 AS depth\n    FROM orgstructure.child_tracker t\n    INNER JOIN ParentChildCTE cte ON t.parent_id = cte.child_id\n    WHERE cte.depth < 10\n)\nSELECT DISTINCT c.child_id, c.parent_id, c.from_date, c.to_date, p.child_id AS immediateChildParentId,\n                emp_chart.first_name as immediateChildParentName\nFROM ParentChildCTE c\nLEFT JOIN orgstructure.child_tracker p ON c.immediateChildParentId = p.child_id\nLEFT JOIN orgstructure.employee_details emp_chart ON emp_chart.emp_id = p.child_id\nORDER BY c.child_id;";
        query = query.replace("toreplaceid", String.valueOf(empId));
        query = query.replace("toreplacetoDate", String.valueOf(formattedtoDate));
        query = query.replace("toreplacefromDate", String.valueOf(formattedfromDate));
        try {
            List<ChildParentEmp> empchart = this.jdbcTemplate.query(query.toString(), (RowMapper)new ChildParentEmpMapper());
            if (Objects.nonNull(empchart) && empchart.size() > 0) {
                HashMap<Long, List<ChildParentEmp>> childparentMap = new HashMap<Long, List<ChildParentEmp>>();
                for (ChildParentEmp childParent : empchart) {
                    List<ChildParentEmp> childparentList = new ArrayList<ChildParentEmp>();
                    if (childparentMap.get(childParent.getEmpId()) != null) {
                        childparentList = (List)childparentMap.get(childParent.getEmpId());
                        childparentList.add(childParent);
                    } else {
                        childparentList.add(childParent);
                    }
                    childparentMap.put(childParent.getEmpId(), childparentList);
                }
                return childparentMap;
            }
        }
        catch (Exception exception) {
            // empty catch block
        }
        return null;
    }

    public Map<Long, String> getDepartmentList(long deptId, long parentDeptId, String name) {
        ArrayList deptIdList = new ArrayList();
        List idList = this.getDepartmentList(deptId, deptIdList);
        StringBuffer buffer = new StringBuffer();
        for (int i = 0; i < idList.size(); ++i) {
            buffer.append(idList.get(i));
            if (i == idList.size() - 1) continue;
            buffer.append(",");
        }
        String query = "SELECT  deptId, dept_name as deptName, deptParentId FROM  orgstructure.department_chart_details  where deptId in (toreplace)";
        query = query.replace("toreplace", String.valueOf(deptId));
        HashMap<Long, String> groupdepartment = new HashMap<Long, String>();
        try {
            List<ChildParent> deptchart = this.jdbcTemplate.query(query.toString(), (RowMapper)new ChildParentMapper());
            HashMap<Long, Long> child_rel = new HashMap<Long, Long>();
            HashMap<Long, String> groupkey = new HashMap<Long, String>();
            for (ChildParent childParent : deptchart) {
                child_rel.put(childParent.getDeptId(), childParent.getDeptParentId());
                if (deptId == childParent.getDeptParentId()) {
                    groupkey.put(childParent.getDeptId(), childParent.getDeptName() + "-" + childParent.getDeptId());
                    continue;
                }
                if (parentDeptId != childParent.getDeptParentId() || deptId != childParent.getDeptId()) continue;
                groupkey.put(childParent.getDeptId(), childParent.getDeptName() + "-" + childParent.getDeptId());
            }
            if (groupkey.size() == 0 && Objects.nonNull(groupkey)) {
                groupkey.put(deptId, name);
            }
            for (ChildParent childParent_dict : deptchart) {
                if (childParent_dict.getDeptId() == deptId || childParent_dict.getDeptParentId() == deptId) continue;
                if (groupkey.get(childParent_dict.getDeptParentId()) != null) {
                    groupdepartment.put(childParent_dict.getDeptId(), (String)groupkey.get(childParent_dict.getDeptParentId()));
                    continue;
                }
                String deptname = KPIDAO.getgroupkeyparent(groupkey, (Long)childParent_dict.getDeptId(), child_rel);
                if (deptname == null) continue;
                groupdepartment.put(childParent_dict.getDeptId(), deptname);
            }
            if (groupkey.size() > 0) {
                groupdepartment.putAll(groupkey);
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        this.log.error((Object)"DeptDict populated into cache");
        this.dbCache.put((Object)("Deptdict_" + deptId), groupdepartment, "dbCache");
        return groupdepartment;
    }

    public List<ChildTracker> ListChildTracker(List<Long> departmentlist, String type) {
        List childTracker_list = this.childTrackerRepository.findByListwDateRanges(departmentlist, type);
        return childTracker_list;
    }

    public Map<Long, String> getEmployeeList(long empId) {
        String query = "WITH RECURSIVE emp_cte AS (SELECT emp_id AS empId, first_name AS empName, department AS deptName, parent_emp_id AS empParentId FROM orgstructure.employee_details WHERE parent_emp_id = toreplace AND status='Active' UNION ALL SELECT e.emp_id, e.first_name, e.department, e.parent_emp_id FROM orgstructure.employee_details e INNER JOIN emp_cte c ON e.parent_emp_id = c.empId WHERE e.status='Active') SELECT empId, empName, deptName, empParentId FROM emp_cte;";
        query = query.replace("toreplace", String.valueOf(empId));
        HashMap<Long, String> groupEmp = new HashMap<Long, String>();
        try {
            List<ChildParentEmp> empChart = this.jdbcTemplate.query(query.toString(), (RowMapper)new ChildParentEmpMapper());
            HashMap<Long, Long> child_rel = new HashMap<Long, Long>();
            HashMap<Long, String> groupKey = new HashMap<Long, String>();
            for (ChildParentEmp childParent : empChart) {
                child_rel.put(childParent.getEmpId(), childParent.getEmpParentId());
                if (empId != childParent.getEmpParentId()) continue;
                groupKey.put(childParent.getEmpId(), childParent.getEmpName());
            }
            for (ChildParentEmp childParent_dict : empChart) {
                if (childParent_dict.getEmpId() == empId || childParent_dict.getEmpParentId() == empId) continue;
                if (groupKey.get(childParent_dict.getEmpParentId()) != null) {
                    groupEmp.put(childParent_dict.getEmpId(), (String)groupKey.get(childParent_dict.getEmpParentId()));
                    continue;
                }
                String empName = KPIDAO.getgroupkeyparentEmp(groupKey, (Long)childParent_dict.getEmpId(), child_rel);
                if (empName == null) continue;
                groupEmp.put(childParent_dict.getEmpId(), empName);
            }
            if (groupKey.size() > 0) {
                groupEmp.putAll(groupKey);
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        this.log.error((Object)"Empdict populated into cache");
        this.dbCache.put((Object)("Empdict_" + empId), groupEmp, "dbCache");
        return groupEmp;
    }

    public Map<Long, String> getEmployeeList(long empId, Long parentEmpId) {
        ArrayList employeeList = new ArrayList();
        List idList = this.getEmployeeList(empId, employeeList);
        StringBuffer buffer = new StringBuffer();
        for (int i = 0; i < idList.size(); ++i) {
            buffer.append(idList.get(i));
            if (i == idList.size() - 1) continue;
            buffer.append(",");
        }
        String query = "SELECT emp_id as empId, first_name as empName, department as deptName, parent_emp_id as empParentId FROM  employee_details Where emp_id in(toreplace)";
        query = query.replace("toreplace", buffer);
        HashMap<Long, String> groupEmp = new HashMap<Long, String>();
        try {
            List<ChildParentEmp> empChart = this.jdbcTemplate.query(query.toString(), (RowMapper)new ChildParentEmpMapper());
            HashMap<Long, Long> child_rel = new HashMap<Long, Long>();
            HashMap<Long, String> groupKey = new HashMap<Long, String>();
            for (ChildParentEmp childParent : empChart) {
                child_rel.put(childParent.getEmpId(), childParent.getEmpParentId());
                if (empId == childParent.getEmpParentId()) {
                    groupKey.put(childParent.getEmpId(), childParent.getEmpName());
                    continue;
                }
                if (parentEmpId.longValue() != childParent.getEmpParentId()) continue;
                groupKey.put(childParent.getEmpId(), childParent.getEmpName());
            }
            for (ChildParentEmp childParent_dict : empChart) {
                if (childParent_dict.getEmpId() == empId || childParent_dict.getEmpParentId() == empId) continue;
                if (groupKey.get(childParent_dict.getEmpParentId()) != null) {
                    groupEmp.put(childParent_dict.getEmpId(), (String)groupKey.get(childParent_dict.getEmpParentId()));
                    continue;
                }
                String empName = KPIDAO.getgroupkeyparentEmp(groupKey, (Long)childParent_dict.getEmpId(), child_rel);
                if (empName == null) continue;
                groupEmp.put(childParent_dict.getEmpId(), empName);
            }
            if (groupKey.size() > 0) {
                groupEmp.putAll(groupKey);
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        this.log.error((Object)"Empdict populated into cache");
        this.dbCache.put((Object)("Empdict_" + empId), groupEmp, "dbCache");
        return groupEmp;
    }

    public static String getgroupkeyparentEmp(Map<Long, String> groupkey, Long empId, Map<Long, Long> child_rel) {
        long parentid;
        String empName = null;
        empName = child_rel.containsKey(empId) ? (groupkey.get(parentid = child_rel.get(empId).longValue()) != null ? groupkey.get(parentid) : KPIDAO.getgroupkeyparentEmp(groupkey, (Long)parentid, child_rel)) : groupkey.get(empId);
        return empName;
    }

    public static String getgroupkeyparent(Map<Long, String> groupkey, Long deptid, Map<Long, Long> child_rel) {
        long parentid = child_rel.get(deptid);
        String deptname = null;
        deptname = groupkey.get(parentid) != null ? groupkey.get(parentid) : KPIDAO.getgroupkeyparent(groupkey, (Long)parentid, child_rel);
        return deptname;
    }

    public static long getgroupkeyparentid(Map<Long, String> groupkey, Long deptid, Map<Long, Long> child_rel) {
        long parentid = child_rel.get(deptid);
        long deptidtemp = 0L;
        deptidtemp = groupkey.get(parentid) != null ? parentid : KPIDAO.getgroupkeyparentid(groupkey, (Long)parentid, child_rel);
        return deptidtemp;
    }

    public List<Map<String, Object>> getOrgKPIDetails(KPICriteria kpiCriteria, String query, List<Long> departmentList, Boolean includeall, DepartmentChartMapping deptdata, DepartmentChartMapping parentDeptData, Map<Long, List<ChildParent>> childParent) {
        this.logger.info("793 check get orgkpidetilas start timing: {} ", (Object)LocalDateTime.now());
        List<Map<String, Object>> kpiDetailsList = null;
        ArrayList<Map<String, Object>> kpiDetails_dept = new ArrayList<Map<String, Object>>();
        try {
            Object currentdept;
            int i;
            StringBuffer buffer;
            ArrayList<Object> paramList = new ArrayList<Object>();
            StringBuilder builder = null;
            builder = kpiCriteria.isRetrieveYTD() ? new StringBuilder() : new StringBuilder(query);
            Date fromDt = (Date)kpiCriteria.getRealDates().get(0);
            Date toDt = (Date)kpiCriteria.getRealDates().get(1);
            if (!kpiCriteria.getRealDates().isEmpty()) {
                Date currentdate;
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String fromDtStr = dateFormat.format(fromDt);
                String toDtStr = dateFormat.format(toDt);
                if (kpiCriteria.isRetrieveYTD() && (currentdate = new Date()).before(toDt)) {
                    toDtStr = dateFormat.format(currentdate);
                }
                builder.append("  org.real_date_from >='" + fromDtStr + "' AND org.real_date_to <='" + toDtStr + "'");
            }
            if (CollectionUtils.isNotEmpty((Collection)kpiCriteria.getNodeKeyList())) {
                buffer = new StringBuffer();
                for (int i2 = 0; i2 < kpiCriteria.getNodeKeyList().size(); ++i2) {
                    buffer.append("?");
                    if (i2 == kpiCriteria.getNodeKeyList().size() - 1) continue;
                    buffer.append(",");
                }
                builder.append(" AND  (org.node_key in (" + buffer.toString() + ") or org.metric_code=? or measureKey in (" + buffer.toString() + " ) ");
                paramList.addAll(kpiCriteria.getNodeKeyList());
                paramList.add(kpiCriteria.getMetricCode());
            } else if (kpiCriteria.getNodeKey() != null) {
                if (kpiCriteria.getMetricCode() != "") {
                    builder.append(" AND  (org.node_key=? or metric_code=? or org.measureKey=?) ");
                    paramList.add(kpiCriteria.getNodeKey());
                    paramList.add(kpiCriteria.getMetricCode());
                    paramList.add(kpiCriteria.getNodeKey());
                } else {
                    builder.append(" AND (org.node_key=? or org.measureKey=?) ");
                    paramList.add(kpiCriteria.getNodeKey());
                    paramList.add(kpiCriteria.getNodeKey());
                }
            } else if (StringUtils.isNotEmpty((CharSequence)kpiCriteria.getMetricCode())) {
                builder.append(" AND  org.metric_code=? ");
                paramList.add(kpiCriteria.getMetricCode());
            }
            if (!departmentList.isEmpty()) {
                buffer = new StringBuffer();
                departmentList.add(deptdata.getDeptId());
                for (i = 0; i < departmentList.size(); ++i) {
                    buffer.append(departmentList.get(i));
                    if (i == departmentList.size() - 1) continue;
                    buffer.append(",");
                }
                builder.append(" AND dpt.deptId=org.dept_id ");
                builder.append("  AND ");
                builder.append("  kpi_elem.node_key=org.node_key AND (org.measureKey is null or kpi_elem.measureKey=org.measureKey) AND kpi_elem.element_type='ELEMENT' AND kpi_elem.org_id= " + deptdata.getOrgId());
                builder.append("  AND ");
                builder.append("  org.dept_id in (" + buffer.toString() + ") ");
            } else {
                departmentList.add(deptdata.getDeptId());
                buffer = new StringBuffer();
                departmentList.add(deptdata.getDeptId());
                for (i = 0; i < departmentList.size(); ++i) {
                    buffer.append(departmentList.get(i));
                    if (i == departmentList.size() - 1) continue;
                    buffer.append(",");
                }
                builder.append(" AND dpt.deptId=org.dept_id ");
                builder.append("  AND ");
                builder.append("  kpi_elem.node_key=org.node_key AND (org.measureKey is null or kpi_elem.measureKey=org.measureKey) AND kpi_elem.element_type='ELEMENT' AND kpi_elem.org_id= " + deptdata.getOrgId());
                builder.append("  AND ");
                builder.append("  org.dept_id in (" + buffer.toString() + ") ");
            }
            String kpiFormulaQuery = null;
            kpiFormulaQuery = kpiCriteria.isRetrieveYTD() ? query.replaceAll("where_replace", builder.toString()) : builder.toString();
            kpiDetailsList = this.jdbcTemplate.queryForList(kpiFormulaQuery, paramList.toArray(new Object[paramList.size()]));
            if (kpiCriteria.getTableType() != null) {
                if (Objects.nonNull(kpiDetailsList)) {
                    Map groupingOriginparent = null;
                    Map finallist = new HashMap();
                    if (kpiCriteria.getTableType() != null && kpiCriteria.getTableType().equalsIgnoreCase("dril")) {
                        System.out.println("Enter in get table drill type :-");
                        if (kpiCriteria.getOriginOrg() != null) {
                            groupingOriginparent = this.getDepartmentListRecursive(kpiCriteria.getOriginOrg().longValue(), fromDt, toDt);
                            finallist = this.finalistChildParent(groupingOriginparent, childParent);
                            currentdept = this.childParentObj(deptdata);
                            finallist.put(deptdata.getDeptId(), currentdept);
                        } else {
                            if (Objects.nonNull(childParent)) {
                                currentdept = this.childParentObj(deptdata);
                                childParent.put(deptdata.getDeptId(), (List<ChildParent>)currentdept);
                            } else {
                                childParent = new HashMap<Long, List<ChildParent>>();
                                currentdept = this.childParentObj(deptdata);
                                childParent.put(deptdata.getDeptId(), (List<ChildParent>)currentdept);
                            }
                            finallist = childParent;
                        }
                        System.out.println("kpiDetailsList :::>>> " + kpiDetailsList);
                        for (Map kpiDetails : kpiDetailsList) {
                            long dept_id = 0L;
                            if (kpiDetails.get("dept_id") == null) continue;
                            dept_id = (Long)kpiDetails.get("dept_id");
                            if (finallist.get(dept_id) != null && dept_id > 0L) {
                                Map kpiDetails_version;
                                if (kpiDetails.get("dept") == null) continue;
                                boolean deptname = false;
                                if (Objects.isNull(kpiCriteria.getDeptName())) {
                                    deptname = true;
                                }
                                if ((kpiDetails_version = this.modifiedversionofkpilist(kpiDetails, (List)finallist.get(dept_id), deptdata, deptname)) != null) {
                                    kpiDetails_dept.add(kpiDetails_version);
                                }
                                System.out.println("kpiDetails_version >>>> " + kpiDetails_version);
                                continue;
                            }
                            if (kpiDetails.get("dept_id") == null || !deptdata.getDeptId().equals((Long)kpiDetails.get("dept_id"))) continue;
                            kpiDetails.put("dept", deptdata.getDeptName() + "-" + deptdata.getDeptId());
                            kpiDetails_dept.add(kpiDetails);
                        }
                    }
                }
            } else {
                for (Map kpiDetails : kpiDetailsList) {
                    Map kpiDetails_version;
                    if (Objects.nonNull(childParent)) {
                        currentdept = this.childParentObj(deptdata);
                        childParent.put(deptdata.getDeptId(), (List<ChildParent>)currentdept);
                    } else {
                        childParent = new HashMap<Long, List<ChildParent>>();
                        currentdept = this.childParentObj(deptdata);
                        childParent.put(deptdata.getDeptId(), (List<ChildParent>)currentdept);
                    }
                    long dept_id = 0L;
                    if (kpiDetails.get("dept_id") == null || childParent.get(dept_id = ((Long)kpiDetails.get("dept_id")).longValue()) == null || dept_id <= 0L || kpiDetails.get("dept") == null) continue;
                    Boolean deptname = false;
                    if (Objects.isNull(kpiCriteria.getDeptName())) {
                        deptname = true;
                    }
                    if ((kpiDetails_version = this.modifiedversionofkpilist(kpiDetails, childParent.get(dept_id), deptdata, deptname.booleanValue())) == null) continue;
                    kpiDetails_dept.add(kpiDetails_version);
                }
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        this.logger.info("1025 check getorgkpidetails end timing: {} ", (Object)LocalDateTime.now());
        return kpiDetails_dept;
    }

    public Map<String, Object> modifiedversionofkpilist(Map<String, Object> kpiDetails, List<ChildParent> childlist, DepartmentChartMapping deptdata, boolean deptname) {
        Date real_date_from = (Date)kpiDetails.get("real_date_from");
        Date real_date_to = (Date)kpiDetails.get("real_date_to");
        for (ChildParent childParent : childlist) {
            if (real_date_from.after(childParent.getFromDate()) && (Objects.isNull(childParent.getToDate()) || Objects.nonNull(childParent.getToDate()) && childParent.getToDate().after(real_date_from))) {
                if (deptname) {
                    kpiDetails.put("dept", deptdata.getDeptName() + "-" + deptdata.getDeptId());
                } else {
                    kpiDetails.put("dept", childParent.getDeptImmediateParentName() + "-" + childParent.getDeptImmediateParentId());
                }
                return kpiDetails;
            }
            if (!real_date_from.before(childParent.getFromDate()) || !Objects.isNull(childParent.getToDate()) && (!Objects.nonNull(childParent.getToDate()) || !childParent.getToDate().before(real_date_to))) continue;
            if (deptname) {
                kpiDetails.put("dept", deptdata.getDeptName() + "-" + deptdata.getDeptId());
            } else {
                kpiDetails.put("dept", childParent.getDeptImmediateParentName() + "-" + childParent.getDeptImmediateParentId());
            }
            return kpiDetails;
        }
        return null;
    }

    public Map<String, Object> modifiedversionofkpilistemp(Map<String, Object> kpiDetails, List<ChildParentEmp> childlist, Employee empData) {
        Date real_date_from = (Date)kpiDetails.get("real_date_from");
        Date real_date_to = (Date)kpiDetails.get("real_date_to");
        for (ChildParentEmp childParent : childlist) {
            if (real_date_from.after(childParent.getFromDate()) && (Objects.isNull(childParent.getToDate()) || Objects.nonNull(childParent.getToDate()) && childParent.getToDate().after(real_date_from))) {
                kpiDetails.put("dept", childParent.getEmpImmediateParentName() + "-" + childParent.getEmpId());
                return kpiDetails;
            }
            if (!real_date_from.before(childParent.getFromDate()) || !Objects.isNull(childParent.getToDate()) && (!Objects.nonNull(childParent.getToDate()) || !childParent.getToDate().before(real_date_to))) continue;
            kpiDetails.put("dept", childParent.getEmpImmediateParentName() + "-" + childParent.getEmpId());
            return kpiDetails;
        }
        return null;
    }

    public Map<Long, List<ChildParent>> finalistChildParent(Map<Long, List<ChildParent>> origin, Map<Long, List<ChildParent>> childlevel) {
        HashMap<Long, List<ChildParent>> finalist = new HashMap<Long, List<ChildParent>>();
        for (Long key : childlevel.keySet()) {
            if (origin.get(key) == null) continue;
            if (origin.get(key).size() == childlevel.get(key).size()) {
                finalist.put(key, childlevel.get(key));
                continue;
            }
            ArrayList<ChildParent> childParentList = new ArrayList<ChildParent>();
            for (ChildParent originchildParent : origin.get(key)) {
                for (ChildParent childParent : childlevel.get(key)) {
                    if (!childParent.getFromDate().equals(originchildParent.getFromDate()) || !childParent.getToDate().equals(originchildParent.getToDate())) continue;
                    childParentList.add(childParent);
                }
            }
            finalist.put(key, childParentList);
        }
        return finalist;
    }

    public Map<Long, List<ChildParentEmp>> finalistChildParentEmp(Map<Long, List<ChildParentEmp>> origin, Map<Long, List<ChildParentEmp>> childlevel) {
        HashMap<Long, List<ChildParentEmp>> finalist = new HashMap<Long, List<ChildParentEmp>>();
        for (Long key : childlevel.keySet()) {
            if (origin.get(key) == null) continue;
            if (origin.get(key).size() == childlevel.get(key).size()) {
                finalist.put(key, childlevel.get(key));
                continue;
            }
            ArrayList<ChildParentEmp> childParentList = new ArrayList<ChildParentEmp>();
            for (ChildParentEmp originchildParent : origin.get(key)) {
                for (ChildParentEmp childParent : childlevel.get(key)) {
                    if (!childParent.getFromDate().equals(originchildParent.getFromDate()) || !childParent.getToDate().equals(originchildParent.getToDate())) continue;
                    childParentList.add(childParent);
                }
            }
            finalist.put(key, childParentList);
        }
        return finalist;
    }

    private static boolean containsKey(String commaSeparatedString, Long key) {
        String[] items;
        for (String item : items = commaSeparatedString.split(",\\s*")) {
            if (Long.parseLong(item) != key) continue;
            return true;
        }
        return false;
    }

    public List<Map<String, Object>> getOrgKPIDetailsEmployee(KPICriteria kpiCriteria, String query, List<Long> employeeList, Boolean includeall, Employee employee, Employee parentEmployee, Map<Long, List<ChildParentEmp>> childParent) {
        List<Map<String, Object>> kpiDetailsList = null;
        try {
            StringBuffer buffer;
            ArrayList<Object> paramList = new ArrayList<Object>();
            StringBuilder builder = null;
            builder = kpiCriteria.isRetrieveYTD() ? new StringBuilder() : new StringBuilder(query);
            if (!kpiCriteria.getRealDates().isEmpty()) {
                Date currentdate;
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date fromDt = (Date)kpiCriteria.getRealDates().get(0);
                Date toDt = (Date)kpiCriteria.getRealDates().get(1);
                String fromDtStr = dateFormat.format(fromDt);
                String toDtStr = dateFormat.format(toDt);
                if (kpiCriteria.isRetrieveYTD() && (currentdate = new Date()).before(toDt)) {
                    toDtStr = dateFormat.format(currentdate);
                }
                builder.append("  org.real_date_from >='" + fromDtStr + "' AND org.real_date_to <='" + toDtStr + "'");
            }
            if (CollectionUtils.isNotEmpty((Collection)kpiCriteria.getNodeKeyList())) {
                buffer = new StringBuffer();
                for (int i = 0; i < kpiCriteria.getNodeKeyList().size(); ++i) {
                    buffer.append("?");
                    if (i == kpiCriteria.getNodeKeyList().size() - 1) continue;
                    buffer.append(",");
                }
                if (kpiCriteria.getMetricCode() != "") {
                    builder.append(" AND (org.node_key in (" + buffer.toString() + ") or metric_code=? or org.measureKey in (" + buffer.toString() + ") ) ");
                    paramList.addAll(kpiCriteria.getNodeKeyList());
                    paramList.add(kpiCriteria.getMetricCode());
                } else {
                    builder.append(" AND (org.node_key in (" + buffer.toString() + ") or  org.measureKey in (" + buffer.toString() + ") ) ");
                    paramList.addAll(kpiCriteria.getNodeKeyList());
                }
            } else if (kpiCriteria.getNodeKey() != null) {
                if (kpiCriteria.getMetricCode() != "") {
                    builder.append(" AND  (org.node_key=? or metric_code=? or org.measureKey=?) ");
                    paramList.add(kpiCriteria.getNodeKey());
                    paramList.add(kpiCriteria.getMetricCode());
                    paramList.add(kpiCriteria.getNodeKey());
                } else {
                    builder.append(" AND (org.node_key=? or org.measureKey=?) ");
                    paramList.add(kpiCriteria.getNodeKey());
                    paramList.add(kpiCriteria.getNodeKey());
                }
            } else if (StringUtils.isNotEmpty((CharSequence)kpiCriteria.getMetricCode())) {
                builder.append(" AND  org.metric_code=? ");
                paramList.add(kpiCriteria.getMetricCode());
            }
            if (!employeeList.isEmpty() && !paramList.isEmpty()) {
                builder.append(" AND ");
                buffer = new StringBuffer();
                employeeList.add(employee.getEmpId());
                for (int i = 0; i < employeeList.size(); ++i) {
                    buffer.append(employeeList.get(i));
                    if (i == employeeList.size() - 1) continue;
                    buffer.append(",");
                }
                builder.append("  ed.emp_id = org.org_key ");
                builder.append("  AND ");
                builder.append("  kpi_elem.node_key=org.node_key AND (org.measureKey is null or kpi_elem.measureKey=org.measureKey) AND kpi_elem.element_type='ELEMENT' AND kpi_elem.org_id= " + employee.getOrgDetails().getOrgId());
                builder.append("  AND ");
                builder.append("  org.org_key in(" + buffer.toString() + ") ");
            }
            String kpiFormulaQuery = null;
            kpiFormulaQuery = kpiCriteria.isRetrieveYTD() ? query.replaceAll("where_replace", builder.toString()) : builder.toString();
            kpiDetailsList = this.jdbcTemplate.queryForList(kpiFormulaQuery, paramList.toArray(new Object[paramList.size()]));
            ArrayList<Map> kpiDetails_dept = new ArrayList<Map>();
            Map groupingOriginparent = null;
            Map finallist = new HashMap();
            Date fromDt = (Date)kpiCriteria.getRealDates().get(0);
            Date toDt = (Date)kpiCriteria.getRealDates().get(1);
            if (kpiCriteria.getTableType() != null) {
                if (Objects.nonNull(kpiDetailsList) && !includeall.booleanValue() && kpiCriteria.getTableType() != null && kpiCriteria.getTableType().equalsIgnoreCase("dril")) {
                    List currentemp;
                    if (kpiCriteria.getOriginOrg() != null) {
                        groupingOriginparent = this.getEmployeeListRecursive(kpiCriteria.getOriginOrg().longValue(), fromDt, toDt);
                        finallist = this.finalistChildParentEmp(groupingOriginparent, childParent);
                        if (Objects.nonNull(childParent)) {
                            currentemp = this.childParentEmpObj(employee);
                            childParent.put(employee.getEmpId(), currentemp);
                        } else {
                            childParent = new HashMap<Long, List<ChildParentEmp>>();
                            currentemp = this.childParentEmpObj(employee);
                            childParent.put(employee.getEmpId(), currentemp);
                        }
                    } else {
                        if (Objects.nonNull(childParent)) {
                            currentemp = this.childParentEmpObj(employee);
                            childParent.put(employee.getEmpId(), currentemp);
                        } else {
                            childParent = new HashMap<Long, List<ChildParentEmp>>();
                            currentemp = this.childParentEmpObj(employee);
                            childParent.put(employee.getEmpId(), currentemp);
                        }
                        finallist = childParent;
                    }
                    for (Map kpiDetails : kpiDetailsList) {
                        long empId = 0L;
                        if (kpiDetails.get("org_key") == null) continue;
                        empId = (Long)kpiDetails.get("org_key");
                        if (finallist.get(empId) != null && empId > 0L) {
                            Map kpiDetails_version = this.modifiedversionofkpilistemp(kpiDetails, (List)finallist.get(empId), employee);
                            if (kpiDetails_version == null) continue;
                            kpiDetails_dept.add(kpiDetails_version);
                            continue;
                        }
                        if (kpiDetails.get("org_key") == null || employee.getEmpId() != ((Long)kpiDetails.get("org_key")).longValue()) continue;
                        kpiDetails.put("dept", employee.getFirstName() + "-" + employee.getEmpId());
                        kpiDetails_dept.add(kpiDetails);
                    }
                }
            } else {
                for (Map kpiDetails : kpiDetailsList) {
                    Map kpiDetails_version;
                    List currentemp;
                    long emp_id = 0L;
                    if (kpiDetails.get("org_key") == null) continue;
                    emp_id = (Long)kpiDetails.get("org_key");
                    if (Objects.nonNull(childParent)) {
                        currentemp = this.childParentEmpObj(employee);
                        childParent.put(employee.getEmpId(), currentemp);
                    } else {
                        childParent = new HashMap<Long, List<ChildParentEmp>>();
                        currentemp = this.childParentEmpObj(employee);
                        childParent.put(employee.getEmpId(), currentemp);
                    }
                    if (childParent.get(emp_id) == null || emp_id <= 0L || kpiDetails.get("dept") == null || (kpiDetails_version = this.modifiedversionofkpilistemp(kpiDetails, childParent.get(emp_id), employee)) == null) continue;
                    kpiDetails_dept.add(kpiDetails_version);
                }
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public List<ChildParentEmp> childParentEmpObj(Employee employee) {
        ChildParentEmp childParentEmp = new ChildParentEmp();
        childParentEmp.setDeptName(employee.getDeptDetails().getName());
        childParentEmp.setEmpId(employee.getEmpId());
        childParentEmp.setEmpImmediateParentId(Long.valueOf(employee.getParentEmpId()));
        childParentEmp.setEmpImmediateParentName(employee.getFirstName());
        childParentEmp.setEmpParentId(employee.getParentEmpId());
        Calendar fromDate = Calendar.getInstance();
        fromDate.add(1, -50);
        childParentEmp.setFromDate(fromDate.getTime());
        Calendar toDate = Calendar.getInstance();
        toDate.add(1, 50);
        ArrayList<ChildParentEmp> childParentEmps = new ArrayList<ChildParentEmp>();
        childParentEmps.add(childParentEmp);
        return childParentEmps;
    }

    public List<ChildParent> childParentObj(DepartmentChartMapping departmentChartMapping) {
        ChildParent childParent = new ChildParent();
        childParent.setDeptId(departmentChartMapping.getDeptId().longValue());
        childParent.setDeptImmediateParentId(departmentChartMapping.getDeptParentId());
        childParent.setDeptImmediateParentName(departmentChartMapping.getDeptName());
        childParent.setDeptName(departmentChartMapping.getDeptName());
        childParent.setDeptParentId(departmentChartMapping.getDeptParentId().longValue());
        Calendar fromDate = Calendar.getInstance();
        fromDate.add(1, -50);
        childParent.setFromDate(fromDate.getTime());
        Calendar toDate = Calendar.getInstance();
        toDate.add(1, 50);
        ArrayList<ChildParent> childParents = new ArrayList<ChildParent>();
        childParents.add(childParent);
        return childParents;
    }

    public List<Map<String, Object>> getAnnualTarget(KPICriteria kpiCriteria, long startYear, long endYear) {
        List kpiDetailsList = null;
        String query = "SELECT SUM(mtd_target) target, TYPE,currency FROM kpi_target_details WHERE kpi_id=? AND YEAR BETWEEN ? AND ?";
        try {
            ArrayList<Long> paramList = new ArrayList<Long>();
            paramList.add(kpiCriteria.getKpiId());
            paramList.add(startYear);
            paramList.add(endYear);
            kpiDetailsList = this.jdbcTemplate.queryForList(query, paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOccurred " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOccurred " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public KPIElementDetailsPo getElementDetails(long nodeKey) {
        KPIElementDetailsPo kpiElementDetailsPo = null;
        try {
            kpiElementDetailsPo = (KPIElementDetailsPo)this.getSession().get(KPIElementDetailsPo.class, (Serializable)Long.valueOf(nodeKey));
        }
        catch (HibernateException ex) {
            return null;
        }
        return kpiElementDetailsPo;
    }

    public KPIElementDetailsPo saveKpiElementDetail(KPIElementDetailsPo elementDetailsPo) {
        if (elementDetailsPo.getNodeKey() == 0L) {
            elementDetailsPo.setNodeKey(this.nodekeygen.generateNodeKey().longValue());
        }
        return (KPIElementDetailsPo)this.getSession().merge((Object)elementDetailsPo);
    }

    public KPIElementDetailsPo getMeasureKeywithKpi(String kpi_id, long owner, long org_id) {
        KPIElementDetailsPo kpielementDetailsPo = null;
        String kpiname = null;
        try {
            TypedQuery query = this.entityManager.createQuery("FROM KPI WHERE kpiId=:kpiId AND active=:active AND orgId=:orgId AND (owner=:owner OR createdBy=:owner)", KPI.class);
            query.setParameter("kpiId", (Object)kpi_id);
            query.setParameter("active", (Object)0);
            query.setParameter("owner", (Object)owner);
            query.setParameter("orgId", (Object)org_id);
            List kpi = query.getResultList();
            if (!kpi.isEmpty()) {
                kpiname = ((KPI)kpi.get(0)).getKpiName();
                if (kpiname != null) {
                    kpielementDetailsPo = this.getNodeKeyForMesaureName(kpiname, org_id);
                } else {
                    this.log.error(("kpiname ExceptionOcccured " + query));
                }
            } else {
                this.log.error(("ExceptionOcccured " + query));
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpielementDetailsPo;
    }

    public KPIElementDetailsPo getMeasureKeywithKpiandDept(String kpi_id, long departmentId, long org_id) {
        KPIElementDetailsPo kpielementDetailsPo = null;
        String kpiname = null;
        try {
            List kpi = this.kpiRepo.findByDeptIdandkpiId(Long.valueOf(departmentId), 0, kpi_id, Long.valueOf(org_id));
            if (!kpi.isEmpty()) {
                kpiname = ((KPI)kpi.get(0)).getKpiName();
                if (kpiname != null) {
                    kpielementDetailsPo = this.getNodeKeyForMesaureName(kpiname, org_id);
                } else {
                    this.log.error((Object)"kpiname ExceptionOcccured ");
                }
            } else {
                this.log.error((Object)"ExceptionOcccured ");
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpielementDetailsPo;
    }

    public KPIElementDetailsPo getMeasureKeywithKpi(String kpi_id, long org_id) {
        KPIElementDetailsPo kpielementDetailsPo = null;
        String kpiname = null;
        try {
            TypedQuery query = this.entityManager.createQuery("FROM KPI WHERE kpiId=:kpiId AND active=:active AND orgId=:orgId", KPI.class);
            query.setParameter("kpiId", (Object)kpi_id);
            query.setParameter("active", (Object)0);
            query.setParameter("orgId", (Object)org_id);
            List kpi = query.getResultList();
            if (!kpi.isEmpty()) {
                kpiname = ((KPI)kpi.get(0)).getKpiName();
                if (kpiname != null) {
                    kpielementDetailsPo = this.getNodeKeyForMesaureName(kpiname, org_id);
                } else {
                    this.log.error(("kpiname ExceptionOcccured " + query));
                }
            } else {
                this.log.error(("ExceptionOcccured " + query));
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpielementDetailsPo;
    }

    public KPIElementDetailsPo getMeasureKeyWithKpiAndDeptId(String kpi_id, long owner, long org_id, long deptId) {
        KPIElementDetailsPo kpielementDetailsPo = null;
        String kpiname = null;
        try {
            TypedQuery query = this.entityManager.createQuery("FROM KPI WHERE kpiId=:kpiId AND active=:active AND orgId=:orgId AND (owner=:owner OR createdBy=:owner)", KPI.class);
            query.setParameter("kpiId", (Object)kpi_id);
            query.setParameter("active", (Object)0);
            query.setParameter("owner", (Object)owner);
            query.setParameter("orgId", (Object)org_id);
            query.setParameter("deptId", (Object)deptId);
            List kpi = query.getResultList();
            if (!kpi.isEmpty()) {
                kpiname = ((KPI)kpi.get(0)).getKpiName();
                if (kpiname != null) {
                    kpielementDetailsPo = this.getNodeKeyForMesaureName(kpiname, org_id);
                } else {
                    this.log.error(("kpiname ExceptionOcccured " + query));
                }
            } else {
                this.log.error(("ExceptionOcccured " + query));
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpielementDetailsPo;
    }

    public KPIElementDetailsPo getNodeKeyForMesaureName(String measureName, long orgId) {
        String query = "from KPIElementDetailsPo kpi_element_details where measure_name=:measureName and element_type='ELEMENT' and org_id=:orgId  and active=0";
        KPIElementDetailsPo elementDetailsPo = null;
        try {
            Query typedQuery = this.getSession().createQuery(query);
            typedQuery.setParameter("measureName", (Object)measureName);
            typedQuery.setParameter("orgId", (Object)orgId);
            elementDetailsPo = (KPIElementDetailsPo)typedQuery.getSingleResult();
        }
        catch (NoResultException e) {
            this.log.error((Object)"no record found");
            return null;
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return elementDetailsPo;
    }

    public KPIElementDetailsPo getNodeKeyForMeasureNameWithDeptId(String measureName, long orgId, long deptId) {
        String query = "from KPIElementDetailsPo kpi_element_details where measure_name=:measureName and element_type='ELEMENT' and org_id=:orgId  and dept_id=:deptId and active=0";
        KPIElementDetailsPo elementDetailsPo = null;
        try {
            Query typedQuery = this.getSession().createQuery(query);
            typedQuery.setParameter("measureName", (Object)measureName);
            typedQuery.setParameter("orgId", (Object)orgId);
            typedQuery.setParameter("deptId", (Object)deptId);
            elementDetailsPo = (KPIElementDetailsPo)typedQuery.getSingleResult();
        }
        catch (NoResultException e) {
            this.log.error((Object)"no record found");
            return null;
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return elementDetailsPo;
    }

    public KPIElementDetailsPo getNodeKeyForSubMeasureName(String measureName, long orgId) {
        String query = "from KPIElementDetailsPo kpi_element_details where measure_name=:measureName and element_type='ELEMENT' and org_id=:orgId and measure_type=1 and active=0";
        KPIElementDetailsPo elementDetailsPo = null;
        try {
            Query typedQuery = this.getSession().createQuery(query);
            typedQuery.setParameter("measureName", (Object)measureName);
            typedQuery.setParameter("orgId", (Object)orgId);
            elementDetailsPo = (KPIElementDetailsPo)typedQuery.getSingleResult();
        }
        catch (NoResultException e) {
            this.log.error((Object)"no record found");
            return null;
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return elementDetailsPo;
    }

    public KPIElementDetailsPo getNodeKeyForSubMeasureNameWithDeptId(String measureName, long orgId, long deptId) {
        String query = "from KPIElementDetailsPo kpi_element_details where measure_name=:measureName and element_type='ELEMENT' and org_id=:orgId and dept_id=:deptId and measure_type=1 and active=0";
        KPIElementDetailsPo elementDetailsPo = null;
        try {
            Query typedQuery = this.getSession().createQuery(query);
            typedQuery.setParameter("measureName", (Object)measureName);
            typedQuery.setParameter("orgId", (Object)orgId);
            typedQuery.setParameter("deptId", (Object)deptId);
            elementDetailsPo = (KPIElementDetailsPo)typedQuery.getSingleResult();
        }
        catch (NoResultException e) {
            this.log.error((Object)"no record found");
            return null;
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return elementDetailsPo;
    }

    public String getMaxId(Long objectiveId, String flagtype) {
        String maxId = null;
        String query = flagtype.equalsIgnoreCase("subkpi") ? "SELECT COALESCE(MAX(sub_kpi_id_sequence),0)+1 as maxIdSequence FROM orgstructure.subkpi WHERE objective_id=?" : "SELECT COALESCE(MAX(kpi_id_sequence),0)+1 as maxIdSequence FROM orgstructure.kpi WHERE objective_id=?";
        try {
            NativeQuery nativeQuery = this.getSession().createNativeQuery(query);
            nativeQuery.setParameter(1, (Object)objectiveId);
            maxId = nativeQuery.uniqueResult().toString();
            this.log.info(("maxId " + maxId));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return maxId;
    }

    public List<Map<String, Object>> getNodeKeyType(List<String> nodeKeyList) {
        StringBuffer query = new StringBuffer("SELECT TYPE FROM orgstructure.org_kpi_details WHERE ");
        List kpiDetailsList = null;
        try {
            if (!nodeKeyList.isEmpty()) {
                StringBuffer buffer = new StringBuffer();
                for (int i = 0; i < nodeKeyList.size(); ++i) {
                    buffer.append(nodeKeyList.get(i));
                    if (i == nodeKeyList.size() - 1) continue;
                    buffer.append(",");
                }
                query.append("  node_key IN(" + buffer.toString() + ") GROUP BY TYPE ");
            }
            kpiDetailsList = this.jdbcTemplate.queryForList(query.toString());
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public boolean validateNodeKeys(List<String> nodeKeyList) {
        List kpiDetailsList = this.getNodeKeyType(nodeKeyList);
        if (CollectionUtils.isEmpty((Collection)kpiDetailsList)) {
            return true;
        }
        return Objects.nonNull(kpiDetailsList) && kpiDetailsList.size() == 1;
    }

    public KPIDetailsPo validateAndUpdate(KPIDetailsPo kpiDetailsPo) {
        ArrayList<Object> paramList = new ArrayList<Object>();
        StringBuilder query = new StringBuilder("select org_kpi_id as kpiId, mtd_actual as actual, mtd_target as target from orgstructure.org_kpi_details WHERE");
        query.append(" org_key=? AND ");
        query.append(" node_key=?  ");
        paramList.add(kpiDetailsPo.getOrgKey());
        paramList.add(kpiDetailsPo.getNodeKey());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        if (kpiDetailsPo.getRealDateFrom() != null) {
            query.append(" AND ");
            query.append(" real_date_from=?  ");
            paramList.add(dateFormat.format(kpiDetailsPo.getRealDateFrom()));
        }
        if (kpiDetailsPo.getRealDateTo() != null) {
            query.append(" AND ");
            query.append(" real_date_to=?  ");
            paramList.add(dateFormat.format(kpiDetailsPo.getRealDateTo()));
        }
        if (kpiDetailsPo.getDeptId() != null && kpiDetailsPo.getDeptId() > 0L) {
            query.append(" AND ");
            query.append("dept_id=? ");
            paramList.add(kpiDetailsPo.getDeptId());
        }
        List kpiDetailsList = null;
        try {
            this.log.debug(("Org Details query " + query.toString()));
            kpiDetailsList = this.jdbcTemplate.queryForList(query.toString(), paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        if (CollectionUtils.isNotEmpty((Collection)kpiDetailsList)) {
            kpiDetailsPo.setOrgKpiId(((Long)((Map)kpiDetailsList.get(0)).get("kpiId")).longValue());
            if (StringUtils.isNotEmpty((CharSequence)kpiDetailsPo.getMtdActual())) {
                kpiDetailsPo.setMtdActual(new BigDecimal(kpiDetailsPo.getMtdActual()).setScale(2, RoundingMode.HALF_UP).toPlainString());
            } else {
                kpiDetailsPo.setMtdActual((String)((Map)kpiDetailsList.get(0)).get("actual"));
            }
            if (StringUtils.isNotEmpty((CharSequence)kpiDetailsPo.getMtdTarget())) {
                kpiDetailsPo.setMtdTarget(new BigDecimal(kpiDetailsPo.getMtdTarget()).setScale(2, RoundingMode.HALF_UP).toPlainString());
            } else {
                kpiDetailsPo.setMtdTarget((String)((Map)kpiDetailsList.get(0)).get("target"));
            }
        } else {
            if (StringUtils.isNotEmpty((CharSequence)kpiDetailsPo.getMtdActual())) {
                BigDecimal actual = new BigDecimal(kpiDetailsPo.getMtdActual());
                kpiDetailsPo.setMtdActual(actual.setScale(2, RoundingMode.HALF_UP).toPlainString());
            }
            BigDecimal target = new BigDecimal(StringUtils.isNotEmpty((CharSequence)kpiDetailsPo.getMtdTarget()) ? kpiDetailsPo.getMtdTarget() : "0");
            kpiDetailsPo.setMtdTarget(target.setScale(2, RoundingMode.HALF_UP).toPlainString());
        }
        return kpiDetailsPo;
    }

    public KPIDetailsPo validateAndUpdateSub(KPIDetailsPo kpiDetailsPo) {
        ArrayList<Object> paramList = new ArrayList<Object>();
        StringBuilder query = new StringBuilder("select org_kpi_id as kpiId, mtd_actual as actual, mtd_target as target from orgstructure.org_kpi_details WHERE");
        query.append(" org_key=? AND ");
        query.append(" node_key=?  ");
        paramList.add(kpiDetailsPo.getOrgKey());
        paramList.add(kpiDetailsPo.getNodeKey());
        if (kpiDetailsPo.getMeasureKey() != null && kpiDetailsPo.getMeasureKey() != 0L) {
            query.append(" AND ");
            query.append(" measureKey=?  ");
            paramList.add(kpiDetailsPo.getMeasureKey());
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        if (kpiDetailsPo.getRealDateFrom() != null) {
            query.append(" AND ");
            query.append(" real_date_from=?  ");
            paramList.add(dateFormat.format(kpiDetailsPo.getRealDateFrom()));
        }
        if (kpiDetailsPo.getRealDateTo() != null) {
            query.append(" AND ");
            query.append(" real_date_to=?  ");
            paramList.add(dateFormat.format(kpiDetailsPo.getRealDateTo()));
        }
        if (kpiDetailsPo.getDeptId() != null && kpiDetailsPo.getDeptId() > 0L) {
            query.append(" AND ");
            query.append("dept_id=? ");
            paramList.add(kpiDetailsPo.getDeptId());
        }
        List kpiDetailsList = null;
        try {
            this.log.debug(("Org Details query " + query.toString()));
            kpiDetailsList = this.jdbcTemplate.queryForList(query.toString(), paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        if (CollectionUtils.isNotEmpty((Collection)kpiDetailsList)) {
            kpiDetailsPo.setOrgKpiId(((Long)((Map)kpiDetailsList.get(0)).get("kpiId")).longValue());
            if (StringUtils.isNotEmpty((CharSequence)kpiDetailsPo.getMtdActual())) {
                kpiDetailsPo.setMtdActual(new BigDecimal(kpiDetailsPo.getMtdActual()).setScale(2, RoundingMode.HALF_UP).toPlainString());
            } else {
                kpiDetailsPo.setMtdActual((String)((Map)kpiDetailsList.get(0)).get("actual"));
            }
            if (StringUtils.isNotEmpty((CharSequence)kpiDetailsPo.getMtdTarget())) {
                kpiDetailsPo.setMtdTarget(new BigDecimal(kpiDetailsPo.getMtdTarget()).setScale(2, RoundingMode.HALF_UP).toPlainString());
            } else {
                kpiDetailsPo.setMtdTarget((String)((Map)kpiDetailsList.get(0)).get("target"));
            }
        } else {
            if (StringUtils.isNotEmpty((CharSequence)kpiDetailsPo.getMtdActual())) {
                BigDecimal actual = new BigDecimal(kpiDetailsPo.getMtdActual());
                kpiDetailsPo.setMtdActual(actual.setScale(2, RoundingMode.HALF_UP).toPlainString());
            }
            BigDecimal target = new BigDecimal(StringUtils.isNotEmpty((CharSequence)kpiDetailsPo.getMtdTarget()) ? kpiDetailsPo.getMtdTarget() : "0");
            kpiDetailsPo.setMtdTarget(target.setScale(2, RoundingMode.HALF_UP).toPlainString());
        }
        return kpiDetailsPo;
    }

    public void deleteKPIById(long kpiId) {
        String commentsQuery = "delete FROM orgstructure.kpi_comments_details WHERE kpi_id=?";
        String elementQuery = "delete FROM orgstructure.kpi_element_details WHERE element_type='KPI' and  node_key=? ";
        String targetQuery = "delete FROM orgstructure.kpi_target_details WHERE kpi_id=?";
        this.jdbcTemplate.update(commentsQuery, new Object[]{kpiId});
        this.jdbcTemplate.update(elementQuery, new Object[]{kpiId});
        this.jdbcTemplate.update(targetQuery, new Object[]{kpiId});
    }

    public void updateCustomRepotee(long scoreCardId, boolean includeRepotee, String customRepotee) {
        String repoteeQuery = "UPDATE orgstructure.kpi SET include_reportee=?, custom_repotees=? WHERE objective_id IN (SELECT id FROM orgstructure.objectives WHERE score_card_id=?)";
        this.jdbcTemplate.update(repoteeQuery, new Object[]{includeRepotee, customRepotee, scoreCardId});
    }

    public List<Map<String, Object>> getSubMeasureNodeKeyList(long nodeKey) {
        ArrayList<Long> paramList = new ArrayList<Long>();
        StringBuffer query = new StringBuffer("SELECT * FROM org_kpi_details WHERE ");
        query.append(" measureKey=?  ");
        paramList.add(nodeKey);
        List kpiDetailsList = null;
        try {
            kpiDetailsList = this.jdbcTemplate.queryForList(query.toString(), paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public List<Map<String, Object>> getSubMeasureList(long nodeKey) {
        ArrayList<Long> paramList = new ArrayList<Long>();
        StringBuffer query = new StringBuffer("SELECT distinct node_key  FROM orgstructure.org_kpi_details WHERE ");
        query.append(" measureKey =?  ");
        paramList.add(nodeKey);
        List kpiDetailsList = null;
        try {
            kpiDetailsList = this.jdbcTemplate.queryForList(query.toString(), paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public List<Map<String, Object>> getOrgKPIDetailsSubMeasure(KPICriteria kpiCriteria, String query) {
        List kpiDetailsList = null;
        try {
            int i;
            StringBuffer buffer;
            ArrayList<Object> paramList = new ArrayList<Object>();
            StringBuilder builder = null;
            builder = kpiCriteria.isRetrieveYTD() ? new StringBuilder() : new StringBuilder(query);
            if (!kpiCriteria.getRealDates().isEmpty()) {
                builder.append("  real_date_from >=? AND real_date_to <=?");
                paramList.addAll(kpiCriteria.getRealDates());
            }
            if (CollectionUtils.isNotEmpty((Collection)kpiCriteria.getNodeKeyList())) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                buffer = new StringBuffer();
                for (i = 0; i < kpiCriteria.getNodeKeyList().size(); ++i) {
                    buffer.append("?");
                    if (i == kpiCriteria.getNodeKeyList().size() - 1) continue;
                    buffer.append(",");
                }
                builder.append("  (org.node_key in (" + buffer.toString() + ") or metric_code=?) ");
                paramList.addAll(kpiCriteria.getNodeKeyList());
                paramList.add(kpiCriteria.getMetricCode());
            } else if (kpiCriteria.getNodeKey() != null) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                builder.append("  (org.node_key=? or metric_code=?) ");
                paramList.add(kpiCriteria.getNodeKey());
                paramList.add(kpiCriteria.getMetricCode());
            } else if (StringUtils.isNotEmpty((CharSequence)kpiCriteria.getMetricCode())) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                builder.append("  metric_code=? ");
                paramList.add(kpiCriteria.getMetricCode());
            }
            if (!kpiCriteria.getEmployeeIds().isEmpty() && !paramList.isEmpty()) {
                builder.append(" AND ");
                buffer = new StringBuffer();
                for (i = 0; i < kpiCriteria.getEmployeeIds().size(); ++i) {
                    buffer.append(kpiCriteria.getEmployeeIds().get(i));
                    if (i == kpiCriteria.getEmployeeIds().size() - 1) continue;
                    buffer.append(",");
                }
                builder.append("  org_key in(" + buffer.toString() + ") ");
            }
            if ("Dept".equalsIgnoreCase(kpiCriteria.getGroupBy()) || StringUtils.isNotEmpty((CharSequence)kpiCriteria.getDeptName())) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                builder.append("  org.org_key=ed.emp_id ");
                if (StringUtils.isNotEmpty((CharSequence)kpiCriteria.getDeptName())) {
                    if (!paramList.isEmpty()) {
                        builder.append(" AND ");
                    }
                    builder.append("  ed.department=? ");
                    paramList.add(kpiCriteria.getDeptName());
                }
            }
            String kpiFormulaQuery = null;
            kpiFormulaQuery = kpiCriteria.isRetrieveYTD() ? query.replaceAll("where_replace", builder.toString()) : builder.toString();
            this.log.debug(("KPI Formula query " + kpiFormulaQuery));
            kpiDetailsList = this.jdbcTemplate.queryForList(kpiFormulaQuery, paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public Map<String, Object> checkNodeKey(String nodeKey) {
        ArrayList<String> paramList = new ArrayList<String>();
        StringBuffer query = new StringBuffer("SELECT * FROM orgstructure.kpi_element_details WHERE ");
        query.append(" node_key=?  ");
        paramList.add(nodeKey);
        Map kpiDetailsList = null;
        try {
            kpiDetailsList = this.jdbcTemplate.queryForMap(query.toString(), paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public List<Long> getChildDepartmentList(long deptId, List<Long> departmentlist) {
        String query = "WITH RECURSIVE RecursiveCTE AS (\n    SELECT deptId     FROM orgstructure.department_chart_details\n    WHERE deptParentId = 'toreplace' AND active = 0\n\n    UNION ALL\n\n    SELECT d.deptId     FROM orgstructure.department_chart_details d\n    JOIN RecursiveCTE r ON d.deptParentId = r.deptId\n    WHERE d.active = 0\n)\nSELECT deptId\nFROM RecursiveCTE\nORDER BY deptId;";
        query = query.replace("toreplace", String.valueOf(deptId));
        try {
            departmentlist = this.jdbcTemplate.queryForList(query.toString(), Long.class);
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return departmentlist;
    }

    public Map<String, Object> getOrgKPIDetailsGetFunctionData(KPICriteria kpiCriteria, String query) {
        Map kpiDetailsList = null;
        try {
            ArrayList<Object> paramList = new ArrayList<Object>();
            StringBuilder builder = new StringBuilder(query);
            if (!kpiCriteria.getRealDates().isEmpty()) {
                builder.append("  real_date_from >=? AND real_date_to <=?");
                paramList.addAll(kpiCriteria.getRealDates());
            }
            if (kpiCriteria.getNodeKey() != null) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                if (kpiCriteria.getMetricCode() != "") {
                    builder.append("  (org.node_key=? or metric_code=? or org.measureKey=?) ");
                    paramList.add(kpiCriteria.getNodeKey());
                    paramList.add(kpiCriteria.getMetricCode());
                    paramList.add(kpiCriteria.getNodeKey());
                } else {
                    builder.append("  (org.node_key=? or org.measureKey=?) ");
                    paramList.add(kpiCriteria.getNodeKey());
                    paramList.add(kpiCriteria.getNodeKey());
                }
            } else if (StringUtils.isNotEmpty((CharSequence)kpiCriteria.getMetricCode())) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                builder.append("  metric_code=? ");
                paramList.add(kpiCriteria.getMetricCode());
            }
            if (!kpiCriteria.getEmployeeIds().isEmpty() && !paramList.isEmpty()) {
                builder.append(" AND ");
                StringBuffer buffer = new StringBuffer();
                for (int i = 0; i < kpiCriteria.getEmployeeIds().size(); ++i) {
                    buffer.append(kpiCriteria.getEmployeeIds().get(i));
                    if (i == kpiCriteria.getEmployeeIds().size() - 1) continue;
                    buffer.append(",");
                }
                builder.append("  org_key in(" + buffer.toString() + ") ");
            }
            String kpiFormulaQuery = builder.toString();
            this.log.debug(("KPI Formula query " + kpiFormulaQuery));
            kpiDetailsList = this.jdbcTemplate.queryForMap(kpiFormulaQuery, paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public Map<String, Object> getOrgKPIDetailsDeptFunctionData(KPICriteria kpiCriteria, String query, List<Long> departmentList, Boolean includeall, DepartmentChartMapping deptdata, DepartmentChartMapping parentDeptData) {
        Map kpiDetailsList = null;
        try {
            int i;
            StringBuffer buffer;
            ArrayList<Object> paramList = new ArrayList<Object>();
            StringBuilder builder = null;
            builder = kpiCriteria.isRetrieveYTD() ? new StringBuilder() : new StringBuilder(query);
            if (!kpiCriteria.getRealDates().isEmpty()) {
                builder.append("  org.real_date_from >=? AND org.real_date_to <=?");
                paramList.addAll(kpiCriteria.getRealDates());
            }
            if (CollectionUtils.isNotEmpty((Collection)kpiCriteria.getNodeKeyList())) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                buffer = new StringBuffer();
                for (i = 0; i < kpiCriteria.getNodeKeyList().size(); ++i) {
                    buffer.append("?");
                    if (i == kpiCriteria.getNodeKeyList().size() - 1) continue;
                    buffer.append(",");
                }
                builder.append("  (org.node_key in (" + buffer.toString() + ") or org.metric_code=? or measureKey in (" + buffer.toString() + " ) ");
                paramList.addAll(kpiCriteria.getNodeKeyList());
                paramList.add(kpiCriteria.getMetricCode());
            } else if (kpiCriteria.getNodeKey() != null) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                builder.append("  (org.node_key=? or org.metric_code=? or org.measureKey=? ) ");
                paramList.add(kpiCriteria.getNodeKey());
                paramList.add(kpiCriteria.getMetricCode());
                paramList.add(kpiCriteria.getNodeKey());
            } else if (StringUtils.isNotEmpty((CharSequence)kpiCriteria.getMetricCode())) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                builder.append("  org.metric_code=? ");
                paramList.add(kpiCriteria.getMetricCode());
            }
            if (!departmentList.isEmpty() && !paramList.isEmpty()) {
                builder.append(" AND ");
                buffer = new StringBuffer();
                for (i = 0; i < departmentList.size(); ++i) {
                    buffer.append(departmentList.get(i));
                    if (i == departmentList.size() - 1) continue;
                    buffer.append(",");
                }
                buffer.append(",");
                buffer.append(deptdata.getDeptId());
                builder.append("  kpi_elem.node_key=org.node_key AND (org.measureKey is null or kpi_elem.measureKey=org.measureKey) AND kpi_elem.element_type='ELEMENT' AND kpi_elem.org_id= " + deptdata.getOrgId());
                builder.append("  AND ");
                builder.append("  dpt.deptId=org.dept_id ");
                builder.append("  AND ");
                builder.append("  org.dept_id in(" + buffer.toString() + ") ");
            }
            String kpiFormulaQuery = builder.toString();
            this.log.info(("KPI Formula query " + kpiFormulaQuery));
            kpiDetailsList = this.jdbcTemplate.queryForMap(kpiFormulaQuery, paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public Map<String, Object> getOrgKpiDetailsForSubMeasure(KPICriteria kpiCriteria, String query) {
        Map kpiDetailsList = null;
        try {
            ArrayList<Object> paramList = new ArrayList<Object>();
            StringBuilder builder = new StringBuilder(query);
            if (!kpiCriteria.getRealDates().isEmpty()) {
                builder.append("  org.real_date_from >=? AND org.real_date_to <=?");
                paramList.addAll(kpiCriteria.getRealDates());
            }
            if (kpiCriteria.getNodeKey() != null) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                builder.append("  org.measureKey=?  ");
                paramList.add(kpiCriteria.getNodeKey());
            } else if (StringUtils.isNotEmpty((CharSequence)kpiCriteria.getMetricCode())) {
                if (!paramList.isEmpty()) {
                    builder.append(" AND ");
                }
                builder.append("  org.metric_code=? ");
                paramList.add(kpiCriteria.getMetricCode());
            }
            String kpiFormulaQuery = builder.toString();
            this.log.info(("KPI Formula query " + kpiFormulaQuery));
            kpiDetailsList = this.jdbcTemplate.queryForMap(kpiFormulaQuery, paramList.toArray(new Object[paramList.size()]));
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOcccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return kpiDetailsList;
    }

    public Map<Long, String> getEmployeeChildList(long empId) {
        String query = "WITH RECURSIVE RecursiveCTE AS (\n    SELECT emp_id AS empId, department AS deptName, parent_emp_id AS empParentId     FROM orgstructure.employee_details\n    WHERE parent_emp_id = ? AND status = 'Active'\n\n    UNION ALL\n\n    SELECT e.emp_id, e.department, e.parent_emp_id     FROM orgstructure.employee_details e\n    JOIN RecursiveCTE r ON e.parent_emp_id = r.empId\n    WHERE e.status = 'Active'\n)\nSELECT empId, deptName, empParentId\nFROM RecursiveCTE\nORDER BY empParentId, empId;";
        HashMap<Long, String> groupKey = new HashMap<Long, String>();
        try {
            List<ChildParentEmp> empChart = this.jdbcTemplate.query(query, new Object[]{empId}, (RowMapper)new ChildParentEmpMapper());
            for (ChildParentEmp childParent : empChart) {
                groupKey.put(childParent.getEmpId(), childParent.getDeptName());
            }
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return groupKey;
    }

    public List<KpiList> getkpilistbyempid(List<Long> empId) {
        String query = "SELECT t.id as id, t.kpi_name as name, dt.owner as empId, dt.id as scorecardId FROM kpi t, objectives o, score_card sc, score_card_details dt where sc.scoreCardDetailsId=dt.id and o.score_card_id=sc.id and t.objective_id=o.id and dt.owner in (toreplace)  AND t.active = 0";
        String commaSeparatedIds = empId.stream().map(Object::toString).collect(Collectors.joining(","));
        query = query.replace("toreplace", commaSeparatedIds);
        try {
            List empChart = this.jdbcTemplate.query(query.toString(), (RowMapper)new KpiListMapper());
            return empChart;
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
    }

    public List<KpiList> getkpilistbydeptid(List<Long> deptId) {
        String query = "SELECT t.id as id, t.kpi_name as name, dt.department_id as org, dt.id as scorecardId FROM orgstructure.kpi t, orgstructure.objectives o, orgstructure.score_card sc, orgstructure.score_card_details dt where sc.scoreCardDetailsId=dt.id and o.score_card_id=sc.id and t.objective_id=o.id and dt.department_id in (toreplace)  AND t.active = 0";
        String commaSeparatedIds = deptId.stream().map(Object::toString).collect(Collectors.joining(","));
        query = query.replace("toreplace", commaSeparatedIds);
        try {
            List empChart = this.jdbcTemplate.query(query.toString(), (RowMapper)new KpiListMapper());
            return empChart;
        }
        catch (DataAccessException e) {
            this.log.error(("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)((Object)e))));
            throw new RuntimeException(e);
        }
        catch (Exception e) {
            this.log.error(("ExceptionOccured " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
    }

    public static class MeasureNameMapper implements RowMapper<KPIDetailsDTO> {
        public MeasureNameMapper(KPIDAO kpidao) {
        }

        public KPIDetailsDTO mapRow(java.sql.ResultSet rs, int rowNum) throws java.sql.SQLException {
            KPIDetailsDTO dto = new KPIDetailsDTO();
            dto.setNodeKey(rs.getString("node_key"));
            dto.setMeasureName(rs.getString("measure_name"));
            dto.setMeasureType(rs.getInt("measure_type"));
            dto.setMeasureKey(rs.getString("measureKey"));
            return dto;
        }
    }
}

