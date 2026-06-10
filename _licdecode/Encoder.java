import java.io.*;
import java.security.MessageDigest;
import java.util.*;
import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;

import com.estrat.service.licenseservice.bean.LicenseKey;
import com.estrat.service.licenseservice.bean.LicenseData;

public class Encoder {
    private static final String KEY = "YmOinPa5YQ0ab4TsPylJhg==";
    private static final String SALT = "STRATROOM_LICENSE_SALT";

    static SecretKeySpec setKey(String myKey) throws Exception {
        byte[] key = myKey.getBytes("UTF-8");
        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        key = sha.digest(key);
        key = Arrays.copyOf(key, 16);
        return new SecretKeySpec(key, "AES");
    }

    static String encrypt(Serializable obj, String secret) throws Exception {
        SecretKeySpec secretKey = setKey(secret);
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        SealedObject sealed = new SealedObject(obj, cipher);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        CipherOutputStream cos = new CipherOutputStream(baos, cipher);
        ObjectOutputStream oos = new ObjectOutputStream(cos);
        oos.writeObject(sealed);
        cos.close();
        oos.close();
        return Base64.getEncoder().encodeToString(baos.toByteArray());
    }

    public static void main(String[] args) throws Exception {
        // Far-future expiry: 2099-12-31
        Calendar cal = Calendar.getInstance();
        cal.set(2099, Calendar.DECEMBER, 31, 23, 59, 59);

        List<String> modules = Arrays.asList(
            "Scorecard", "Initiatives & Projects", "Risk", "RiskEvent", "SWOT", "PESTEL",
            "Meetings", "Cockpit", "Organisation", "Charts", "KPI", "Workflows", "Notifications",
            "Template", "Strategy Formulation", "Project Formulation", "Risk Formulation",
            "StrategyMap", "ProcessEnabler", "Impact Survey", "Rpo", "Approval Page", "Budget",
            "Report", "Vision Misson", "StoryOfChange", "Qualitative Data", "Task", "RiskRadar",
            "Compliance", "AuditManagement", "IncidentManagement", "Masters"
        );

        LicenseData data = new LicenseData();
        data.setOrganization("Stratroom");
        data.setTotalUsers(100L);
        data.setExpiryDate(cal.getTime());
        data.setModuleList(new ArrayList<>(modules));
        data.setDeviceList(new ArrayList<>());

        LicenseKey key = new LicenseKey();
        key.setLicenseSaltKey(SALT);
        key.setPublicKey("");
        key.setDataString(encrypt(data, SALT));

        String licenseString = encrypt(key, KEY);

        try (FileWriter fw = new FileWriter(args[0])) {
            fw.write(licenseString);
        }
        System.out.println("New license.txt written with expiry: " + cal.getTime());
    }
}
