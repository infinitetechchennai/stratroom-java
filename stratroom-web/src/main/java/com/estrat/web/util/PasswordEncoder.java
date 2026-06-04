/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.exception.ExceptionLogHelper
 *  com.estrat.web.util.PasswordEncoder
 *  org.apache.log4j.Logger
 */
package com.estrat.web.util;

import com.estrat.web.exception.ExceptionLogHelper;
import java.security.Key;
import java.security.MessageDigest;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.log4j.Logger;

public class PasswordEncoder {
    private static final Logger logger = Logger.getLogger(PasswordEncoder.class);

    public String encodedPassword(String password) {
        String encodedPassword = null;
        try {
            logger.debug("encodedPassword() \t encoding password encryption");
            MessageDigest md = MessageDigest.getInstance("SHA");
            md.reset();
            encodedPassword = Base64.getEncoder().encodeToString(md.digest(password.getBytes()));
            logger.debug(("encodedPassword() \t the encoded password is " + encodedPassword));
        }
        catch (Exception e) {
            logger.error(("Error occured while encryption " + ExceptionLogHelper.convertToString((Exception)e)));
            throw new RuntimeException(e);
        }
        return encodedPassword.trim();
    }

    public String decrypt(String strToDecrypt) {
        try {
            String key = "CLAVE00000000000";
            String iv = "VECTOR0000000000";
            Base64.Decoder decoder = Base64.getDecoder();
            byte[] encrypted1 = decoder.decode(strToDecrypt);
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());
            cipher.init(2, (Key)keyspec, ivspec);
            byte[] original = cipher.doFinal(encrypted1);
            String originalString = new String(original);
            return originalString;
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

