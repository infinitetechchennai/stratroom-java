/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.auth.encryption.EncryptionProvider
 *  com.estrat.backend.auth.exception.RequestException
 */
package com.estrat.backend.auth.encryption;

import com.estrat.backend.auth.exception.RequestException;

public interface EncryptionProvider {
    public String encrypt(String var1) throws RequestException;

    public String decrypt(String var1) throws RequestException;

    public String addENCFormat(String var1);

    public String removeENCFormat(String var1);

    public boolean isENCFormatted(String var1);
}

