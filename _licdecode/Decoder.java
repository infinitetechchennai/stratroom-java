import java.io.*;
import java.security.MessageDigest;
import java.util.*;
import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;

import com.estrat.service.licenseservice.bean.LicenseKey;
import com.estrat.service.licenseservice.bean.LicenseData;

public class Decoder {
    private static final String KEY = "YmOinPa5YQ0ab4TsPylJhg==";

    static SecretKeySpec setKey(String myKey) throws Exception {
        byte[] key = myKey.getBytes("UTF-8");
        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        key = sha.digest(key);
        key = Arrays.copyOf(key, 16);
        return new SecretKeySpec(key, "AES");
    }

    static Serializable decrypt(String strToDecrypt, String secret) throws Exception {
        SecretKeySpec secretKey = setKey(secret);
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        ByteArrayInputStream in = new ByteArrayInputStream(Base64.getDecoder().decode(strToDecrypt));
        CipherInputStream cos = new CipherInputStream(in, cipher);
        ObjectInputStream ois = new ObjectInputStream(cos);
        SealedObject result = (SealedObject) ois.readObject();
        ois.close();
        return (Serializable) result.getObject(cipher);
    }

    public static void main(String[] args) throws Exception {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new FileReader(args[0]))) {
            String line;
            while ((line = br.readLine()) != null) sb.append(line);
        }
        String licenseString = sb.toString().trim();

        LicenseKey licenseKey = (LicenseKey) decrypt(licenseString, KEY);
        LicenseData data = (LicenseData) decrypt(licenseKey.getDataString(), licenseKey.getLicenseSaltKey());

        System.out.println("=========== DECODED LICENSE (license.txt) ===========");
        System.out.println("Organization : " + data.getOrganization());
        System.out.println("Total Users  : " + data.getTotalUsers());
        System.out.println("Expiry Date  : " + data.getExpiryDate());
        System.out.println("Modules      : " + data.getModuleList());
        System.out.println("Devices      : " + data.getDeviceList());
        System.out.println("=====================================================");
    }
}
