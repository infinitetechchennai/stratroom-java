/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.licenseservice.bean.LicenseData
 *  com.estrat.service.licenseservice.service.util.SignatureProvider
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.licenseservice.service.util;

import com.estrat.service.licenseservice.bean.LicenseData;
import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Signature;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.RSAKeyGenParameterSpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import org.springframework.stereotype.Component;

@Component
public class SignatureProvider {
    public String generateDigitalSignature(String privateKey, LicenseData licenseData) {
        try {
            Signature sign = Signature.getInstance("SHA256withRSA");
            PKCS8EncodedKeySpec ks = new PKCS8EncodedKeySpec(this.decodeBase64(privateKey));
            KeyFactory kf = KeyFactory.getInstance("RSA");
            PrivateKey pvt = kf.generatePrivate(ks);
            sign.initSign(pvt);
            byte[] signature = null;
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
            objectOutputStream.writeObject(licenseData);
            sign.update(byteArrayOutputStream.toByteArray());
            byteArrayOutputStream.close();
            objectOutputStream.close();
            signature = sign.sign();
            return this.encodeBase64(signature);
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean verifySignature(String publicKey, String signature, LicenseData licenseData) {
        try {
            Signature sign = Signature.getInstance("SHA256withRSA");
            X509EncodedKeySpec puks = new X509EncodedKeySpec(this.decodeBase64(publicKey));
            KeyFactory pukf = KeyFactory.getInstance("RSA");
            PublicKey pub = pukf.generatePublic(puks);
            sign.initVerify(pub);
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
            objectOutputStream.writeObject(licenseData);
            sign.update(byteArrayOutputStream.toByteArray());
            byteArrayOutputStream.close();
            objectOutputStream.close();
            boolean flag = sign.verify(this.decodeBase64(signature));
            return flag;
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public KeyPair generateKeyPair() {
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            RSAKeyGenParameterSpec params = new RSAKeyGenParameterSpec(2048, RSAKeyGenParameterSpec.F4);
            SecureRandom secureRandom = new SecureRandom();
            secureRandom.setSeed(System.currentTimeMillis());
            keyPairGenerator.initialize(params, secureRandom);
            KeyPair keyPair = keyPairGenerator.genKeyPair();
            return keyPair;
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String encodeBase64(byte[] data) {
        Base64.Encoder encoder = Base64.getEncoder();
        return encoder.encodeToString(data);
    }

    public byte[] decodeBase64(String data) {
        Base64.Decoder decoder = Base64.getDecoder();
        return decoder.decode(data);
    }
}

