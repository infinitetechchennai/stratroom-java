/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.config.AbstractRestTemplate
 *  com.estrat.service.etl.config.AbstractRestTemplate$HttpComponentsClientHttpRequestWithBodyFactory
 *  com.estrat.service.etl.exception.RestServiceClientException
 *  com.estrat.service.etl.exception.RestServiceException
 *  org.springframework.core.ParameterizedTypeReference
 *  org.springframework.http.HttpEntity
 *  org.springframework.http.HttpMethod
 *  org.springframework.http.ResponseEntity
 *  org.springframework.http.client.ClientHttpRequestFactory
 *  org.springframework.web.client.HttpStatusCodeException
 *  org.springframework.web.client.RestClientException
 *  org.springframework.web.client.RestTemplate
 */
package com.estrat.service.etl.config;

import com.estrat.service.etl.config.AbstractRestTemplate;
import com.estrat.service.etl.exception.RestServiceClientException;
import com.estrat.service.etl.exception.RestServiceException;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

public abstract class AbstractRestTemplate {
    private RestTemplate restTemplate = new RestTemplate();

    public AbstractRestTemplate() {
        this.restTemplate.setRequestFactory(new org.springframework.http.client.HttpComponentsClientHttpRequestFactory());
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
            throw new RestServiceClientException(String.format("Status Code %s error occured", e.getStatusCode()), e.getStatusCode(), e.getResponseBodyAsString(), (Throwable)e);
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
            throw new RestServiceClientException(String.format("Status Code %s error occured", e.getStatusCode()), e.getStatusCode(), e.getResponseBodyAsString(), (Throwable)e);
        }
        catch (RestClientException e) {
            throw new RestServiceException("Rest Service Exception Occured", (Throwable)e);
        }
        return response;
    }
}

