import java.sql.*;

public class SetCreds {
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/orgstructure?useSSL=false&serverTimezone=UTC", "root", "123456");
            Statement stmt = con.createStatement();
            stmt.executeUpdate("UPDATE employee_credentials SET password = 'fEqNCco3Yq9h5ZUglD3CZJT4lBs=' WHERE email_address = 'Thor@domain.com'");
            System.out.println("Password updated!");
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
