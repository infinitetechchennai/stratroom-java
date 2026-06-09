/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.EncryptionUtils
 */
package com.estrat.scorecard;

import java.nio.charset.StandardCharsets;

/*
 * Exception performing whole class analysis ignored.
 */
public class EncryptionUtils {
    private static final int KEY_DIVIDER = 921001;

    public static String xorDecrypt(byte[] encrypted, String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        byte[] result = new byte[encrypted.length];
        for (int i = 0; i < encrypted.length; ++i) {
            result[i] = (byte)(encrypted[i] ^ keyBytes[i % keyBytes.length]);
        }
        return new String(result, StandardCharsets.UTF_8);
    }

    public static String shiftedDecrypt(String encryptedMessage, int shift) {
        StringBuilder decryptedMessage = new StringBuilder();
        int reverseShift = 26 - shift % 26;
        for (int i = 0; i < encryptedMessage.length(); ++i) {
            char c = encryptedMessage.charAt(i);
            if (Character.isLetter(c)) {
                int base = Character.isLowerCase(c) ? 97 : 65;
                c = (char)((c - base + reverseShift) % 26 + base);
            }
            decryptedMessage.append(c);
        }
        return decryptedMessage.toString();
    }

    public static byte[] hexDecode(String hexStr) {
        byte[] bytes = new byte[hexStr.length() / 2];
        for (int i = 0; i < bytes.length; ++i) {
            int index = i * 2;
            int j = Integer.parseInt(hexStr.substring(index, index + 2), 16);
            bytes[i] = (byte)j;
        }
        return bytes;
    }

    public static void main(String[] args) {
        String secretKey = "mySecretKey";
        String encryptedText = "230021170c554e28240f0b1753";
        byte[] hexDecoded = EncryptionUtils.hexDecode((String)encryptedText);
        String xorDecrypted = EncryptionUtils.xorDecrypt((byte[])hexDecoded, (String)secretKey);
        int shift = secretKey.length() % 26;
        String shiftedDecrypted = EncryptionUtils.shiftedDecrypt((String)xorDecrypted, (int)shift);
        System.out.println("Decrypted Text: " + shiftedDecrypted);
    }
}

