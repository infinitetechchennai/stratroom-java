/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.util.ETLFileUploadUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Component
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.util;

import com.estrat.web.util.UserThreadLocal;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ETLFileUploadUtil {
    private Logger logger = LoggerFactory.getLogger(ETLFileUploadUtil.class);
    @Value(value="${etl.upload.file.path}")
    private String etlFilePath;

    public boolean uploadETLFile(MultipartFile etlFile) {
        FileOutputStream fileOutputStream = null;
        try {
            String path = String.valueOf(String.join((CharSequence)"/", this.etlFilePath, UserThreadLocal.get().getProfile().getEmailAddress()));
            File filePath = new File(path);
            if (!filePath.exists()) {
                filePath.mkdir();
            }
            String fileName = etlFile.getOriginalFilename();
            File uploadFile = new File(String.join((CharSequence)"/", path, fileName));
            if (uploadFile.exists()) {
                uploadFile.delete();
            }
            uploadFile.setWritable(true);
            uploadFile.setReadable(true);
            uploadFile.setExecutable(true);
            fileOutputStream = new FileOutputStream(uploadFile);
            fileOutputStream.write(etlFile.getBytes());
        }
        catch (Exception e) {
            this.logger.error("Exception while uploading etl file", (Throwable)e);
            throw new RuntimeException(e);
        }
        finally {
            if (fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                }
                catch (IOException e) {
                    this.logger.error("Exception while uploading etl file", (Throwable)e);
                    throw new RuntimeException(e);
                }
            }
        }
        return true;
    }
}

