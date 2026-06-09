import java.sql.*;

public class CheckPermissions {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/orgstructure?useSSL=false&allowPublicKeyRetrieval=true";
        String user = "root";
        String pass = "root";

        try (Connection conn = DriverManager.getConnection(url, user, pass);
             Statement stmt = conn.createStatement()) {

            System.out.println("--- CHECKING PERMISSIONS FOR ROLE 49 ---");
            ResultSet rs = stmt.executeQuery(
                "SELECT md.module_name, pd.privilege_name " +
                "FROM role_module_mapping rmm " +
                "JOIN module_details md ON rmm.module_id = md.module_id " +
                "JOIN role_privilege_mapping rpm ON rmm.role_id = rpm.role_id " +
                "JOIN privilege_details pd ON rpm.privilege_id = pd.privilege_id " +
                "WHERE rmm.role_id = 49 " +
                "ORDER BY md.module_name, pd.privilege_id LIMIT 20"
            );
            
            while (rs.next()) {
                System.out.println("Module: " + rs.getString("module_name") + " -> Privilege: " + rs.getString("privilege_name"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
