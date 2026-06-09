/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.AbstractRestTemplate
 *  com.estrat.web.config.AbstractRestTemplate$HttpComponentsClientHttpRequestWithBodyFactory
 *  com.estrat.web.config.CommonHttpClientInterceptor
 *  com.estrat.web.exception.RestServiceClientException
 *  com.estrat.web.exception.RestServiceException
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpEntity
 *  org.springframework.http.HttpMethod
 *  org.springframework.http.ResponseEntity
 *  org.springframework.http.client.ClientHttpRequestFactory
 *  org.springframework.web.client.HttpStatusCodeException
 *  org.springframework.web.client.RestClientException
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.web.config;

import com.estrat.web.config.AbstractRestTemplate;
import com.estrat.web.config.CommonHttpClientInterceptor;
import com.estrat.web.exception.RestServiceClientException;
import com.estrat.web.exception.RestServiceException;
import java.util.ArrayList;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

public abstract class AbstractRestTemplate {
    private RestTemplate restTemplate = new RestTemplate();

    public AbstractRestTemplate(CommonHttpClientInterceptor httpClientInterceptor) {
        ArrayList interceptors = new ArrayList();
        interceptors.add(httpClientInterceptor);
        this.restTemplate.setInterceptors(interceptors);
        this.restTemplate.setRequestFactory((ClientHttpRequestFactory)new org.springframework.http.client.SimpleClientHttpRequestFactory());
    }

    public RestTemplate geRestTemplate() {
        return this.restTemplate;
    }

    protected <T, S> ResponseEntity<S> request(String url, ParameterizedTypeReference<S> returnType, HttpEntity<T> requestEntity, HttpMethod httpMethod) {
        ResponseEntity response = null;
        try {
            response = this.restTemplate.exchange(url, httpMethod, requestEntity, returnType, new Object[0]);
        }
        catch (HttpStatusCodeException e) {
            throw new RestServiceClientException(String.format("Status Code %s error occured", e.getStatusCode()), HttpStatus.valueOf(e.getStatusCode().value()), e.getResponseBodyAsString(), (Throwable)e);
        }
        catch (RestClientException e) {
            throw new RestServiceException("Rest Service Exception Occured", (Throwable)e);
        }
        return response;
    }

    protected <T, S> ResponseEntity<S> request(String url, Class<S> returnType, HttpEntity<T> requestEntity, HttpMethod httpMethod) {
        ResponseEntity response = null;
        try {
            response = this.restTemplate.exchange(url, httpMethod, requestEntity, returnType, new Object[0]);
        }
        catch (HttpStatusCodeException e) {
            throw new RestServiceClientException(String.format("Status Code %s error occured", e.getStatusCode()), HttpStatus.valueOf(e.getStatusCode().value()), e.getResponseBodyAsString(), (Throwable)e);
        }
        catch (RestClientException e) {
            throw new RestServiceException("Rest Service Exception Occured", (Throwable)e);
        }
        return response;
    }
}

