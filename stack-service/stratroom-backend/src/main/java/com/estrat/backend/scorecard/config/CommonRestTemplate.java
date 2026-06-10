/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.scorecard.config.AbstractRestTemplate
 *  com.estrat.backend.scorecard.config.CommonRestTemplate
 *  com.estrat.backend.scorecard.exception.RestServiceException
 *  com.estrat.backend.scorecard.util.HeaderThreadLocal
 *  com.estrat.backend.scorecard.util.UserThreadLocal
 *  com.fasterxml.jackson.databind.ObjectMapper
 *  Logger
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpEntity
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpMethod
 *  org.springframework.http.MediaType
 *  org.springframework.http.ResponseEntity
 *  org.springframework.util.MultiValueMap
 */
package com.estrat.backend.scorecard.config;

import com.estrat.backend.scorecard.config.AbstractRestTemplate;
import com.estrat.backend.scorecard.exception.RestServiceException;
import com.estrat.backend.scorecard.util.HeaderThreadLocal;
import com.estrat.backend.scorecard.util.UserThreadLocal;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

public class CommonRestTemplate
extends AbstractRestTemplate {
    private static Logger log = LoggerFactory.getLogger(CommonRestTemplate.class);

    public Object getForObject(String url, Class<?> cls) {
        HttpEntity requestEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.GET);
        return response.getBody();
    }

    public Object deleteForObject(String url) {
        HttpEntity requestEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        ResponseEntity response = this.request(url, Object.class, requestEntity, HttpMethod.DELETE);
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
        try {
            if (UserThreadLocal.get() != null) {
                UserThreadLocal.get().forEach((arg_0, arg_1) -> ((HttpHeaders)headers).add(arg_0, arg_1));
            } else {
                if (HeaderThreadLocal.get() != null) {
                    UserThreadLocal.set((Map)HeaderThreadLocal.get());
                    UserThreadLocal.get().forEach((arg_0, arg_1) -> ((HttpHeaders)headers).add(arg_0, arg_1));
                }
                // If both UserThreadLocal and HeaderThreadLocal are null, proceed without extra headers
            }
        } catch (Exception e) {
            log.warn("Could not populate common headers from thread local: " + e.getMessage());
        }
        return headers;
    }

    public HttpEntity<String> getHeader() {
        HttpEntity headerEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        return headerEntity;
    }

    private HttpEntity<Object> getHeaderWithBody(Object obj) {
        HttpEntity headerEntity = new HttpEntity(obj, (MultiValueMap)this.getCommonHeaders());
        log.debug(this.getJSONString((Object)headerEntity));
        return headerEntity;
    }

    public String getJSONString(Object response) {
        String json = null;
        try {
            ObjectMapper mapper = new ObjectMapper();
            json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(response);
        }
        catch (Exception e) {
            log.error("Exception in getJSONString", e);
            throw new RestServiceException("Object mapper error", (Throwable)e);
        }
        log.debug("  xml string " + json);
        return json;
    }

    public ResponseEntity<?> putForObject(String url, Object requestBody) {
        HttpEntity requestEntity = new HttpEntity(requestBody, (MultiValueMap)this.getCommonHeaders());
        ResponseEntity response = this.request(url, Object.class, requestEntity, HttpMethod.PUT);
        return response;
    }

    public ResponseEntity<?> postForObject(String url, Object requestBody) {
        HttpEntity requestEntity = new HttpEntity(requestBody, (MultiValueMap)this.getCommonHeaders());
        ResponseEntity response = this.request(url, Object.class, requestEntity, HttpMethod.POST);
        return response;
    }
}

