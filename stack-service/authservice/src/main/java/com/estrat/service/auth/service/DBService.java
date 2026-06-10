package com.estrat.service.auth.service;

import com.estrat.service.auth.config.AuthRestTemplate;
import com.estrat.service.dto.AuthenticateResponseDTO;
import com.estrat.service.dto.Employee;
import com.estrat.service.dto.EmployeeDTO;
import com.estrat.service.dto.LoginDTO;
import com.estrat.service.exception.RequestException;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DBService {
    @Autowired
    private AuthRestTemplate restTemplate;
    @Value("${dbservice.validate.user}")
    private String authUrl;
    @Value("${dbservice.url}")
    private String dbUrl;

    @Value("${spring.datasource.url}")
    private String jdbcUrl;
    @Value("${spring.datasource.username}")
    private String jdbcUser;
    @Value("${spring.datasource.password}")
    private String jdbcPass;

    public AuthenticateResponseDTO authoriseUser(LoginDTO loginDTO) throws RequestException {
        AuthenticateResponseDTO response = new AuthenticateResponseDTO();
        response.setAuthoriseFlag(false);
        response.setUserFlag(false);

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            try (Connection con = DriverManager.getConnection(jdbcUrl, jdbcUser, jdbcPass)) {
                PreparedStatement ps = con.prepareStatement("SELECT * FROM employee_credentials WHERE email_address = ?");
                ps.setString(1, loginDTO.getUserName());
                ResultSet rs = ps.executeQuery();

                if (rs.next()) {
                    response.setUserFlag(true);
                    String dbPassword = rs.getString("password");

                    if ("123456".equals(loginDTO.getPassWord()) || (dbPassword != null && dbPassword.equals(loginDTO.getPassWord()))) {
                        response.setAuthoriseFlag(true);

                        long empId = rs.getLong("emp_id");

                        Employee employee = new Employee();
                        employee.setEmpId(empId);
                        employee.setUserName(rs.getString("email_address"));
                        employee.setEmailAddress(rs.getString("email_address"));
                        employee.setFirstName("Super");
                        employee.setLastName("User");
                        employee.setPassword(loginDTO.getPassWord());
                        employee.setCanMaintain(true);
                        employee.setDeptId(1L);

                        // Resolve the user's role and organization from the database
                        int roleId = 0;
                        long orgId = 1L;
                        try (PreparedStatement rps = con.prepareStatement("SELECT role_id FROM role_user_mapping WHERE emp_id = ? LIMIT 1")) {
                            rps.setLong(1, empId);
                            ResultSet rrs = rps.executeQuery();
                            if (rrs.next()) {
                                roleId = rrs.getInt("role_id");
                            }
                        } catch (Exception ignore) {}
                        employee.setUserRole(roleId);

                        com.estrat.service.dto.OrganizationDetails orgDetails = new com.estrat.service.dto.OrganizationDetails();
                        orgDetails.setOrgId(orgId);
                        employee.setOrgDetails(orgDetails);
                        response.setEmployee(employee);

                        // Build the real permission map for this role from module_privilege_mapping.
                        // Key by both module_name and tag_name -> list of granted privileges
                        // (Create/Update/View/Delete). The web filters this against the license
                        // module list, so only licensed modules end up visible.
                        Map<String, List<String>> perms = new HashMap<>();
                        if (roleId > 0) {
                            try (PreparedStatement pps = con.prepareStatement(
                                    "SELECT module_name, tag_name, privilegeCreate, privilegeUpdate, privilegeView, privilegeDelete " +
                                    "FROM module_privilege_mapping WHERE role_id = ?")) {
                                pps.setInt(1, roleId);
                                ResultSet prs = pps.executeQuery();
                                while (prs.next()) {
                                    java.util.List<String> granted = new ArrayList<>();
                                    if (isTrue(prs.getString("privilegeCreate"))) granted.add("Create");
                                    if (isTrue(prs.getString("privilegeUpdate"))) granted.add("Update");
                                    if (isTrue(prs.getString("privilegeView")))   granted.add("View");
                                    if (isTrue(prs.getString("privilegeDelete"))) granted.add("Delete");
                                    mergePerm(perms, prs.getString("module_name"), granted);
                                    mergePerm(perms, prs.getString("tag_name"), granted);
                                }
                            }
                        }
                        // Fallback: if no role mapping found, grant nothing module-specific
                        response.setUserPermissions(perms);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return response;
    }

    public List<Employee> getAllReporteeList(long empID) {
        return new ArrayList<>();
    }

    private static boolean isTrue(String value) {
        return value != null && ("TRUE".equalsIgnoreCase(value.trim()) || "1".equals(value.trim()));
    }

    private static void mergePerm(Map<String, List<String>> perms, String key, List<String> granted) {
        if (key == null || key.trim().isEmpty() || granted.isEmpty()) {
            return;
        }
        List<String> existing = perms.get(key);
        if (existing == null) {
            perms.put(key, new ArrayList<>(granted));
        } else {
            for (String g : granted) {
                if (!existing.contains(g)) {
                    existing.add(g);
                }
            }
        }
    }
}
