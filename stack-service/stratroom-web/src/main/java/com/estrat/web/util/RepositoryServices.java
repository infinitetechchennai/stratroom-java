/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.util.RepositoryServices
 */
package com.estrat.web.util;

import java.io.IOException;
import java.io.InputStream;

public interface RepositoryServices {
    public String getAmazonBucket();

    public void putAsset(String var1, String var2, InputStream var3) throws IOException;

    public void putObj(String var1, String var2);

    public void createFolder(String var1);
}

