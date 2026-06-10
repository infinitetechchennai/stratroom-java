/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.amazonaws.auth.AWSCredentials
 *  com.amazonaws.auth.BasicAWSCredentials
 *  com.amazonaws.services.s3.AmazonS3
 *  com.amazonaws.services.s3.AmazonS3Client
 *  com.amazonaws.services.s3.model.CannedAccessControlList
 *  com.amazonaws.services.s3.model.ObjectMetadata
 *  com.amazonaws.services.s3.model.PutObjectRequest
 *  com.estrat.web.util.RepositoryAmazonS3ServiceImpl
 *  com.estrat.web.util.RepositoryServices
 *  javax.annotation.PostConstruct
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.util;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.estrat.web.util.RepositoryServices;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RepositoryAmazonS3ServiceImpl
implements RepositoryServices {
    private AmazonS3 s3client;
    private static final String FOLDER_SUFFIX = "/";
    private static final String SUFFIX = "/";
    @Value(value="${amazonProperties.endpointUrl}")
    private String endpointUrl;
    @Value(value="${amazonProperties.bucketName}")
    private String bucketName;
    @Value(value="${amazonProperties.accessKey}")
    private String accessKey;
    @Value(value="${amazonProperties.secretKey}")
    private String secretKey;

    @PostConstruct
    private void initializeAmazon() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3client = new AmazonS3Client((AWSCredentials)credentials);
    }

    public String getAmazonBucket() {
        return this.bucketName;
    }

    public void putAsset(String path, String assetName, InputStream asset) throws IOException {
        ObjectMetadata meta = new ObjectMetadata();
        meta.setContentLength((long)asset.available());
        PutObjectRequest putObj = new PutObjectRequest(this.bucketName, this.getS3Path(path) + assetName, asset, meta);
        putObj.setCannedAcl(CannedAccessControlList.PublicRead);
        this.s3client.putObject(putObj);
    }

    private String getS3Path(String path) {
        if (path.startsWith("/")) {
            path = path.substring(1);
        }
        return path + "/";
    }

    public void putObj(String fileName, String path) {
        this.s3client.putObject(new PutObjectRequest(this.bucketName, fileName, new File(path)).withCannedAcl(CannedAccessControlList.PublicRead));
    }

    public void createFolder(String folderName) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(0L);
        ByteArrayInputStream emptyContent = new ByteArrayInputStream(new byte[0]);
        PutObjectRequest putObjectRequest = new PutObjectRequest(this.bucketName, folderName + "/", (InputStream)emptyContent, metadata);
        this.s3client.putObject(putObjectRequest);
    }
}

