/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.licenseservice.service.util.EncryptionProvider
 *  org.apache.log4j.Logger
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.licenseservice.service.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.SealedObject;
import javax.crypto.spec.SecretKeySpec;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

@Component
public class EncryptionProvider {
    private static Logger logger = Logger.getLogger(EncryptionProvider.class);
    private static final String KEY = "YmOinPa5YQ0ab4TsPylJhg==";

    public SecretKeySpec setKey(String myKey) {
        SecretKeySpec secretKey = null;
        byte[] key = null;
        MessageDigest sha = null;
        try {
            key = myKey.getBytes("UTF-8");
            sha = MessageDigest.getInstance("SHA-256");
            key = sha.digest(key);
            key = Arrays.copyOf(key, 16);
            secretKey = new SecretKeySpec(key, "AES");
        }
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        return secretKey;
    }

    public String encrypt(Serializable strToEncrypt) {
        return this.encrypt(strToEncrypt, KEY);
    }

    public String encrypt(Serializable strToEncrypt, String secret) {
        try {
            SecretKeySpec secretKey = this.setKey(secret);
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(1, secretKey);
            SealedObject sealedObject = new SealedObject(strToEncrypt, cipher);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            CipherOutputStream cos = new CipherOutputStream(byteArrayOutputStream, cipher);
            ObjectOutputStream outputStream = new ObjectOutputStream(cos);
            outputStream.writeObject(sealedObject);
            cos.close();
            outputStream.close();
            byte[] encryptedBytes = byteArrayOutputStream.toByteArray();
            byteArrayOutputStream.close();
            return Base64.getEncoder().encodeToString(encryptedBytes);
        }
        catch (Exception e) {
            logger.error((Object)"Error while encrypting: ", (Throwable)e);
            throw new RuntimeException(e);
        }
    }

    public Serializable decrypt(String strToDecrypt) {
        return this.decrypt(strToDecrypt, KEY);
    }

    public Serializable decrypt(String strToDecrypt, String secret) {
        try {
            SecretKeySpec secretKey = this.setKey(secret);
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
            cipher.init(2, secretKey);
            ByteArrayInputStream arrayInputStream = new ByteArrayInputStream(Base64.getDecoder().decode(strToDecrypt));
            CipherInputStream cos = new CipherInputStream(arrayInputStream, cipher);
            ObjectInputStream inStream = new ObjectInputStream(cos);
            SealedObject result = (SealedObject)inStream.readObject();
            inStream.close();
            cos.close();
            arrayInputStream.close();
            return (Serializable)result.getObject(cipher);
        }
        catch (Exception e) {
            logger.error((Object)"Error while decrypting: ", (Throwable)e);
            throw new RuntimeException(e);
        }
    }
}

