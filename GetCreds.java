import java.sql.*;

public class GetCreds {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/orgstructure?useSSL=false&serverTimezone=UTC", "root", "123456");
            Statement stmt = con.createStatement();
            
            System.out.println("--- roles columns ---");
            ResultSet rs = stmt.executeQuery("SELECT * FROM roles LIMIT 1");
            ResultSetMetaData rsmd = rs.getMetaData();
            for (int i = 1; i <= rsmd.getColumnCount(); i++) {
                System.out.print(rsmd.getColumnName(i) + " ");
            }
            System.out.println();
            
            System.out.println("--- superuser employee details ---");
            rs = stmt.executeQuery("SELECT e.emp_id, e.email_address, r.role_id, role.role_name FROM employee_details e LEFT JOIN role_user_mapping r ON e.emp_id = r.emp_id LEFT JOIN roles role ON r.role_id = role.role_id WHERE e.email_address LIKE 'superuser%'");
            while (rs.next()) {
                System.out.println("Emp ID: " + rs.getString("emp_id") + ", Email: " + rs.getString("email_address") + ", Role ID: " + rs.getString("role_id") + ", Role Name: " + rs.getString("role_name"));
            }
            
            System.out.println("--- ALL users roles ---");
            rs = stmt.executeQuery("SELECT e.email_address, role.role_name FROM employee_details e JOIN role_user_mapping r ON e.emp_id = r.emp_id JOIN roles role ON r.role_id = role.role_id");
            while (rs.next()) {
                System.out.println("Email: " + rs.getString("email_address") + " -> Role: " + rs.getString("role_name"));
            }
            
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
