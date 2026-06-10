/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.encryption.EncryptionProvider
 *  com.estrat.service.exception.RequestException
 */
package com.estrat.service.encryption;

import com.estrat.service.exception.RequestException;

public interface EncryptionProvider {
    public String encrypt(String var1) throws RequestException;

    public String decrypt(String var1) throws RequestException;

    public String addENCFormat(String var1);

    public String removeENCFormat(String var1);

    public boolean isENCFormatted(String var1);
}

