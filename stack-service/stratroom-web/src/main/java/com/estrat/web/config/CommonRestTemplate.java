/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.AbstractRestTemplate
 *  com.estrat.web.config.CommonHttpClientInterceptor
 *  com.estrat.web.config.CommonRestTemplate
 *  com.estrat.web.exception.RestServiceException
 *  com.estrat.web.util.HeaderThreadLocal
 *  com.estrat.web.util.UserThreadLocal
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
package com.estrat.web.config;

import com.estrat.web.config.AbstractRestTemplate;
import com.estrat.web.config.CommonHttpClientInterceptor;
import com.estrat.web.exception.RestServiceException;
import com.estrat.web.util.HeaderThreadLocal;
import com.estrat.web.util.UserThreadLocal;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
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

    public CommonRestTemplate(CommonHttpClientInterceptor httpClientInterceptor) {
        super(httpClientInterceptor);
    }

    public Object getForObject(String url, Class<?> cls) {
        HttpEntity requestEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.GET);
        this.populateResponseHeaders(response);
        return response.getBody();
    }

    public Object deleteForObject(String url) {
        HttpEntity requestEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        ResponseEntity response = this.request(url, Object.class, requestEntity, HttpMethod.DELETE);
        this.populateResponseHeaders(response);
        return response.getBody();
    }

    public Object getForObject(String url, ParameterizedTypeReference<?> cls) {
        HttpEntity requestEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.GET);
        this.populateResponseHeaders(response);
        return response.getBody();
    }

    public Object getForObject(String url, Object obj, Class<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.GET);
        this.populateResponseHeaders(response);
        return response.getBody();
    }

    public Object getForObject(String url, Object obj, ParameterizedTypeReference<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.GET);
        this.populateResponseHeaders(response);
        return response.getBody();
    }

    public Object postForObject(String url, Object obj, Class<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.POST);
        this.populateResponseHeaders(response);
        return response.getBody();
    }

    public Object postForObject(String url, Object obj, ParameterizedTypeReference<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.POST);
        this.populateResponseHeaders(response);
        return response.getBody();
    }

    public Object putForObject(String url, Object obj, Class<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.PUT);
        this.populateResponseHeaders(response);
        return response.getBody();
    }

    public Object putForObject(String url, Object obj, ParameterizedTypeReference<?> cls) {
        HttpEntity requestEntity = this.getHeaderWithBody(obj);
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.PUT);
        this.populateResponseHeaders(response);
        return response.getBody();
    }

    public void populateResponseHeaders(ResponseEntity<?> response) {
        if (response.getHeaders().get("TOKEN_EXPIRED") != null) {
            UserThreadLocal.get().setTokenExpired(true);
        }
    }

    public HttpHeaders getCommonHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (UserThreadLocal.get().getCommonHeaders() != null) {
            if (HeaderThreadLocal.get() != null) {
                UserThreadLocal.get().getCommonHeaders().putAll(HeaderThreadLocal.get());
            }
            UserThreadLocal.get().getCommonHeaders().forEach((arg_0, arg_1) -> ((HttpHeaders)headers).add(arg_0, arg_1));
        }
        return headers;
    }

    public HttpEntity<String> getHeader() {
        HttpEntity headerEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        return headerEntity;
    }

    private HttpEntity<Object> getHeaderWithBody(Object obj) {
        HttpEntity headerEntity = new HttpEntity(obj, (MultiValueMap)this.getCommonHeaders());
        log.debug(this.getJSONString(headerEntity));
        return headerEntity;
    }

    public String getJSONString(Object response) {
        String json = null;
        try {
            ObjectMapper mapper = new ObjectMapper();
            json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(response);
        }
        catch (Exception e) {
            log.error("Exception in getJSONString", (Throwable)e);
            throw new RestServiceException("Object mapper error occured", (Throwable)e);
        }
        log.debug(("  xml string " + json));
        return json;
    }

    public Object putForObject(String url, Class<?> cls) {
        HttpEntity requestEntity = new HttpEntity((MultiValueMap)this.getCommonHeaders());
        ResponseEntity response = this.request(url, cls, requestEntity, HttpMethod.PUT);
        this.populateResponseHeaders(response);
        return response.getBody();
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

