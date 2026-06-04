/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.auth.config.AbstractRestTemplate
 *  com.estrat.service.auth.config.AuthRestTemplate
 *  com.estrat.service.exception.RestServiceException
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  org.apache.log4j.Logger
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpEntity
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpMethod
 *  org.springframework.http.MediaType
 *  org.springframework.http.ResponseEntity
 *  org.springframework.util.MultiValueMap
 */
package com.estrat.service.auth.config;

import com.estrat.service.auth.config.AbstractRestTemplate;
import com.estrat.service.exception.RestServiceException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import org.apache.log4j.Logger;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

public class AuthRestTemplate
extends AbstractRestTemplate {
    private static Logger log = Logger.getLogger(AuthRestTemplate.class);

    public Object getForObject(String url, Class<?> cls) {
        HttpEntity requestEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.GET);
        return response.getBody();
    }

    public Object getForObject(String url, ParameterizedTypeReference<?> cls) {
        HttpEntity requestEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.GET);
        return response.getBody();
    }

    public Object getForObject(String url, Object obj, Class<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.GET);
        return response.getBody();
    }

    public Object getForObject(String url, Object obj, ParameterizedTypeReference<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.GET);
        return response.getBody();
    }

    public Object postForObject(String url, Object obj, Class<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.POST);
        return response.getBody();
    }

    public Object postForObject(String url, Object obj, ParameterizedTypeReference<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.POST);
        return response.getBody();
    }

    public Object putForObject(String url, Object obj, Class<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.PUT);
        return response.getBody();
    }

    public Object putForObject(String url, Object obj, ParameterizedTypeReference<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.PUT);
        return response.getBody();
    }

    public HttpHeaders getCommonHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }

    public HttpEntity<String> getHeader() {
        HttpEntity headerEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        return headerEntity;
    }

    private HttpEntity<Object> getHeaderWithBody(Object obj) {
        HttpEntity headerEntity = new HttpEntity(obj, (MultiValueMap)this.getCommonHeaders());
        log.debug((Object)this.getJSONString((Object)headerEntity));
        return headerEntity;
    }

    public String getJSONString(Object response) {
        String json = null;
        try {
            ObjectMapper mapper = new ObjectMapper();
            json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(response);
        }
        catch (Exception e) {
            log.error((Object)"Exception in getJSONString", (Throwable)e);
            throw new RestServiceException("Object mapper error", (Throwable)e);
        }
        log.debug((Object)("  xml string " + json));
        return json;
    }
}

