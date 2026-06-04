/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.encryption.EncryptionProvider
 *  com.estrat.service.encryption.JasyptEncryptionProvider
 *  com.estrat.service.exception.RequestException
 *  org.jasypt.encryption.pbe.StandardPBEStringEncryptor
 */
package com.estrat.service.encryption;

import com.estrat.service.encryption.EncryptionProvider;
import com.estrat.service.exception.RequestException;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;

public class JasyptEncryptionProvider
implements EncryptionProvider {
    private String algorithm;
    private String password;

    public JasyptEncryptionProvider(String algorithm, String password) {
        this.algorithm = algorithm;
        this.password = password;
    }

    public String encrypt(String value) throws RequestException {
        return this.addENCFormat(this.getEncryptor().encrypt(value));
    }

    public String decrypt(String value) throws RequestException {
        String decryptedValue = this.getEncryptor().decrypt(this.removeENCFormat(value));
        return decryptedValue;
    }

    public String addENCFormat(String value) {
        return "ENC(" + value + ")";
    }

    public String removeENCFormat(String value) {
        return value.substring("ENC(".length(), value.length() - ")".length());
    }

    public boolean isENCFormatted(String value) {
        if (value != null) {
            return value.startsWith("ENC");
        }
        return false;
    }

    public StandardPBEStringEncryptor getEncryptor() {
        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setAlgorithm(this.algorithm);
        encryptor.setPassword(this.password);
        return encryptor;
    }
}

