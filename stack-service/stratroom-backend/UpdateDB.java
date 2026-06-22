import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class UpdateDB {
    public static void main(String[] args) {
        try {
            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/orgstructure", "postgres", "postgres");
            Statement stmt = conn.createStatement();
            int rows = stmt.executeUpdate("UPDATE orgstructure.sc_objectives SET name = 'Financial Objective 1' WHERE code = 'OB'");
            System.out.println("Updated " + rows + " rows.");
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
