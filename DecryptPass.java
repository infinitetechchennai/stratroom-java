import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;

public class DecryptPass {
    public static void main(String[] args) {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm("PBEWithMD5AndDes");
        encryptor.setPassword("123456");
        
        String encrypted = "+pvrmeQCmtWmYVOZ57uuITVghrM=";
        String decrypted = encryptor.decrypt(encrypted);
        System.out.println("Decrypted: " + decrypted);
    }
}
