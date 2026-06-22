package com.estrat.backend.db.config;

import com.estrat.backend.db.service.RoleService;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Seeds reference catalog (modules, global role names, per-org role privilege templates)
 * from orgstructurev2.sql structure — without copying production business data.
 */
@Component
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private RoleService roleService;

    @Value("${spring.datasource.url}")
    private String jdbcUrl;
    @Value("${spring.datasource.username}")
    private String jdbcUser;
    @Value("${spring.datasource.password}")
    private String jdbcPass;

    @Value("${admin.email:admin@stratroom.com}")
    private String adminEmail;

    @Value("${admin.password:Admin@1234}")
    private String adminPassword;

    @Value("${admin.org.name:Stratroom}")
    private String orgName;

    @PostConstruct
    public void init() {
        try {
            Class.forName("org.postgresql.Driver");
            try (Connection con = DriverManager.getConnection(jdbcUrl, jdbcUser, jdbcPass)) {
                ensureModuleCatalog(con);
                ensureGlobalRoleNames(con);

                if (adminExists(con)) {
                    log.info("Admin user exists — ensuring module catalog and default role templates");
                    ensureDefaultRoleTemplatesForAllOrgs(con);
                    return;
                }

                log.info("No admin found — seeding organization, admin user, and role templates");
                long orgId = seedOrganization(con);
                long empId = seedEmployee(con, orgId);
                seedCredentials(con, empId, orgId);
                seedDefaultRoleTemplates(con, orgId, empId);
                long superUserRoleId = findRoleId(con, orgId, "Super User", 0);
                if (superUserRoleId > 0) {
                    seedRoleUserMapping(con, superUserRoleId, empId);
                }
                seedUserRoleManagement(con, empId, orgId, superUserRoleId);
                log.info("Data initialization complete — login with: {} / {}", adminEmail, adminPassword);
            }
        } catch (Exception e) {
            log.error("Data initialization failed", e);
        }
    }

    private boolean adminExists(Connection con) throws Exception {
        try (PreparedStatement ps = con.prepareStatement(
                "SELECT 1 FROM employee_credentials WHERE email_address = ? LIMIT 1")) {
            ps.setString(1, adminEmail);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    private void ensureModuleCatalog(Connection con) throws Exception {
        int inserted = 0;
        for (String[] entry : ModuleCatalog.ENTRIES) {
            if (moduleExists(con, entry[0], entry[1])) {
                continue;
            }
            try (PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO module_details (module_name, tag_name) VALUES (?, ?)")) {
                ps.setString(1, entry[0]);
                if (entry[1] != null) {
                    ps.setString(2, entry[1]);
                } else {
                    ps.setNull(2, java.sql.Types.VARCHAR);
                }
                ps.executeUpdate();
                inserted++;
            }
        }
        if (inserted > 0) {
            log.info("Added {} missing module_details rows (catalog now matches orgstructurev2)", inserted);
        }
    }

    private boolean moduleExists(Connection con, String moduleName, String tagName) throws Exception {
        String sql = tagName == null
                ? "SELECT 1 FROM module_details WHERE module_name = ? AND tag_name IS NULL LIMIT 1"
                : "SELECT 1 FROM module_details WHERE module_name = ? AND tag_name = ? LIMIT 1";
        try (PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, moduleName);
            if (tagName != null) {
                ps.setString(2, tagName);
            }
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }
    }

    private void ensureGlobalRoleNames(Connection con) throws Exception {
        for (String roleName : ModuleCatalog.DEFAULT_ROLE_NAMES) {
            try (PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO roles (role_name) SELECT ? WHERE NOT EXISTS "
                            + "(SELECT 1 FROM roles WHERE role_name = ?)")) {
                ps.setString(1, roleName);
                ps.setString(2, roleName);
                ps.executeUpdate();
            }
        }
    }

    private void ensureDefaultRoleTemplatesForAllOrgs(Connection con) throws Exception {
        try (PreparedStatement ps = con.prepareStatement(
                "SELECT o.org_id, "
                        + "(SELECT MIN(e.emp_id) FROM employee_details e WHERE e.org_id = o.org_id) AS emp_id "
                        + "FROM organization_details o WHERE LOWER(o.status) = 'active'")) {
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                long orgId = rs.getLong(1);
                long empId = rs.getLong(2);
                if (empId <= 0) {
                    continue;
                }
                seedDefaultRoleTemplates(con, orgId, empId);
            }
        }
    }

    private void seedDefaultRoleTemplates(Connection con, long orgId, long empId) throws Exception {
        roleService.ensureDefaultRoleTemplates(orgId, empId);
        log.info("Ensured default role templates for org_id={} (Super User, Admin, Owner, User)", orgId);
    }

    private long findRoleId(Connection con, long orgId, String roleName, int type) throws Exception {
        try (PreparedStatement ps = con.prepareStatement(
                "SELECT role_id FROM role_details WHERE org_id = ? AND role_name = ? AND type = ? LIMIT 1")) {
            ps.setLong(1, orgId);
            ps.setString(2, roleName);
            ps.setInt(3, type);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getLong(1);
            }
        }
        return 0L;
    }

    private long seedOrganization(Connection con) throws Exception {
        try (PreparedStatement ps = con.prepareStatement(
                "INSERT INTO organization_details (org_name, status) VALUES (?, 'Active') RETURNING org_id")) {
            ps.setString(1, orgName);
            ResultSet rs = ps.executeQuery();
            rs.next();
            long orgId = rs.getLong(1);
            log.info("Created organization id={}", orgId);
            return orgId;
        }
    }

    private long seedEmployee(Connection con, long orgId) throws Exception {
        try (PreparedStatement ps = con.prepareStatement(
                "INSERT INTO employee_details (org_id, first_name, last_name, email_address, status, user_role) "
                        + "VALUES (?, 'Super', 'Admin', ?, 'active', 1) RETURNING emp_id")) {
            ps.setLong(1, orgId);
            ps.setString(2, adminEmail);
            ResultSet rs = ps.executeQuery();
            rs.next();
            long empId = rs.getLong(1);
            log.info("Created admin employee id={}", empId);
            return empId;
        }
    }

    private void seedCredentials(Connection con, long empId, long orgId) throws Exception {
        try (PreparedStatement ps = con.prepareStatement(
                "INSERT INTO employee_credentials (emp_id, org_id, user_name, password, status, email_address) "
                        + "VALUES (?, ?, ?, ?, 'active', ?)")) {
            ps.setLong(1, empId);
            ps.setLong(2, orgId);
            ps.setString(3, adminEmail);
            ps.setString(4, adminPassword);
            ps.setString(5, adminEmail);
            ps.executeUpdate();
        }
    }

    private void seedRoleUserMapping(Connection con, long roleId, long empId) throws Exception {
        try (PreparedStatement check = con.prepareStatement(
                "SELECT 1 FROM role_user_mapping WHERE role_id = ? AND emp_id = ?")) {
            check.setLong(1, roleId);
            check.setLong(2, empId);
            if (check.executeQuery().next()) {
                return;
            }
        }
        try (PreparedStatement ps = con.prepareStatement(
                "INSERT INTO role_user_mapping (role_id, emp_id) VALUES (?, ?)")) {
            ps.setLong(1, roleId);
            ps.setLong(2, empId);
            ps.executeUpdate();
        }
    }

    private void seedUserRoleManagement(Connection con, long empId, long orgId, long superUserRoleId) throws Exception {
        try (PreparedStatement ps = con.prepareStatement(
                "INSERT INTO user_role_management "
                        + "(emp_id, org_id, email_address, name, role, role_id, active, userAccess, status) "
                        + "VALUES (?, ?, ?, 'Super Admin', 'Super User', ?, 0, 1, 'Active')")) {
            ps.setLong(1, empId);
            ps.setLong(2, orgId);
            ps.setString(3, adminEmail);
            if (superUserRoleId > 0) {
                ps.setLong(4, superUserRoleId);
            } else {
                ps.setNull(4, java.sql.Types.BIGINT);
            }
            ps.executeUpdate();
            log.info("Registered emp_id={} in user_role_management as Super User", empId);
        }
    }
}
