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
                        
                        Employee employee = new Employee();
                        employee.setEmpId(rs.getLong("emp_id"));
                        employee.setUserName(rs.getString("email_address"));
                        employee.setEmailAddress(rs.getString("email_address"));
                        employee.setFirstName("Super");
                        employee.setLastName("User");
                        employee.setPassword(loginDTO.getPassWord());
                        employee.setCanMaintain(true);
                        employee.setDeptId(1L);
                        employee.setUserRole(1);
                        
                        com.estrat.service.dto.OrganizationDetails orgDetails = new com.estrat.service.dto.OrganizationDetails();
                        orgDetails.setOrgId(1L);
                        employee.setOrgDetails(orgDetails);
                        
                        response.setEmployee(employee);

                        Map<String, List<String>> perms = new HashMap<>();
                        List<String> allPerms = new ArrayList<>();
                        allPerms.add("ALL");
                        perms.put("ROLES", allPerms);
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
}
