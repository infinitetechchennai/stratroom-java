/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.licenseservice.service.util.KeyGenerator
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.licenseservice.service.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.springframework.stereotype.Component;

@Component
public class KeyGenerator {
    public String generate(String password) {
        String charset = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
        byte[] passwd = this.toByteArray(password);
        char[] charArray = this.strToChar(charset);
        byte[] data = new byte[15];
        byte[] tohash = new byte[5 + passwd.length];
        System.arraycopy(passwd, 0, tohash, 5, passwd.length);
        try {
            byte[] hash = this.getHash(tohash);
            System.arraycopy(hash, 0, data, 0, 15);
        }
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        int num = 0;
        for (int i = 0; i < tohash.length; ++i) {
            num += tohash[i];
        }
        String serial = this.Encode(data, charArray) + charArray[num & 0x1F];
        String ret = "";
        for (int i = 0; i < 5; ++i) {
            ret = ret + serial.substring(i * 5, i * 5 + 5);
            if (i >= 4) continue;
            ret = ret + "-";
        }
        return ret;
    }

    private String Encode(byte[] data, char[] charArray) {
        String ret = "";
        for (int i = 0; i < data.length; i += 5) {
            ret = ret + charArray[data[i] >> 3 & 0x1F];
            ret = ret + charArray[(data[i] << 2 | data[i + 1] >> 6) & 0x1F];
            ret = ret + charArray[data[i + 1] >> 1 & 0x1F];
            ret = ret + charArray[(data[i + 1] << 4 | data[i + 2] >> 4) & 0x1F];
            ret = ret + charArray[(data[i + 2] << 1 | data[i + 3] >> 7) & 0x1F];
            ret = ret + charArray[data[i + 3] >> 2 & 0x1F];
            ret = ret + charArray[(data[i + 3] << 3 | data[i + 4] >> 5) & 0x1F];
            ret = ret + charArray[data[i + 4] & 0x1F];
        }
        return ret;
    }

    private char[] strToChar(String str) {
        char[] c = str.toCharArray();
        return c;
    }

    public byte[] toByteArray(String p) {
        String stringToConvert = p;
        byte[] theByteArray = stringToConvert.getBytes();
        return theByteArray;
    }

    public byte[] getHash(byte[] toHash) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        digest.reset();
        return digest.digest(toHash);
    }
}

