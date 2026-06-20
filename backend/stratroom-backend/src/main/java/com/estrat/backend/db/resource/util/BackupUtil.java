/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.resource.util.BackupUtil
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Component
 */
package com.estrat.backend.db.resource.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class BackupUtil {
    @Value(value="${backup.script.file.path}")
    private String backupFilePath;
    @Value(value="${spring.datasource.url}")
    private String url;
    @Value(value="${spring.datasource.username}")
    private String username;
    @Value(value="${spring.datasource.password}")
    private String password;
    @Value(value="${db.name}")
    private String dbName;
    @Value(value="${dp.port}")
    private String port;

    public void Backupdbtosql(String source) {
        String host = null;
        try {
            if (StringUtils.isNotEmpty((CharSequence)this.url)) {
                host = this.url.contains("localhost") ? "localhost" : "epm.cvycm49b5b19.ap-south-1.rds.amazonaws.com";
            }
            String savePath = source;
            String executeCmd = "pg_dump -h " + host + " -p " + this.port + " -U " + this.username + " -F c -f " + savePath + " " + this.dbName;
            Process runtimeProcess = Runtime.getRuntime().exec(executeCmd);
            int processComplete = runtimeProcess.waitFor();
            if (processComplete != 0) {
                ByteArrayOutputStream arrayOutputStream = new ByteArrayOutputStream();
                int i = 0;
                InputStream inputStream = runtimeProcess.getErrorStream();
                while ((i = inputStream.read()) != -1) {
                    arrayOutputStream.write(i);
                }
                inputStream.close();
                arrayOutputStream.close();
                throw new RuntimeException(new String(arrayOutputStream.toByteArray()));
            }
        }
        catch (IOException | InterruptedException ex) {
            throw new RuntimeException(ex);
        }
    }

    public boolean restoreDB(String source1) {
        boolean status = false;
        String host = null;
        String source = this.backupFilePath + "/" + source1;
        if (StringUtils.isNotEmpty((CharSequence)this.url)) {
            host = this.url.contains("localhost") ? "localhost" : "epm.cvycm49b5b19.ap-south-1.rds.amazonaws.com";
        }
        String[] executeCmd = new String[]{"pg_restore", "--host=" + host, "--port=" + this.port, "--username=" + this.username, "--dbname=" + this.dbName, source};
        try {
            Process runtimeProcess = Runtime.getRuntime().exec(executeCmd);
            int processComplete = runtimeProcess.waitFor();
            if (processComplete != 0) {
                ByteArrayOutputStream arrayOutputStream = new ByteArrayOutputStream();
                int i = 0;
                InputStream inputStream = runtimeProcess.getErrorStream();
                while ((i = inputStream.read()) != -1) {
                    arrayOutputStream.write(i);
                }
                inputStream.close();
                arrayOutputStream.close();
                throw new RuntimeException(new String(arrayOutputStream.toByteArray()));
            }
            status = true;
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return status;
    }
}

