/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.dto.ErrorDTO
 *  com.estrat.backend.etl.exception.AuthorizationException
 *  com.estrat.backend.etl.exception.ExceptionLogHelper
 *  com.estrat.backend.etl.exception.GlobalExceptionHandler
 *  com.estrat.backend.etl.exception.RequestException
 *  com.estrat.backend.etl.exception.RestServiceClientException
 *  com.estrat.backend.etl.exception.RestServiceException
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.http.converter.HttpMessageNotReadableException
 *  org.springframework.web.bind.annotation.ControllerAdvice
 *  org.springframework.web.bind.annotation.ExceptionHandler
 *  org.springframework.web.bind.annotation.ResponseBody
 *  org.springframework.web.bind.annotation.ResponseStatus
 */
package com.estrat.backend.etl.exception;

import com.estrat.backend.etl.dto.ErrorDTO;
import com.estrat.backend.etl.exception.AuthorizationException;
import com.estrat.backend.etl.exception.ExceptionLogHelper;
import com.estrat.backend.etl.exception.RequestException;
import com.estrat.backend.etl.exception.RestServiceClientException;
import com.estrat.backend.etl.exception.RestServiceException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value={HttpMessageNotReadableException.class})
    @ResponseBody
    public ResponseEntity<ErrorDTO> handle(HttpMessageNotReadableException exception) {
        log.error("Exception occured " + ExceptionLogHelper.convertToString((Exception)exception));
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setException(exception.getMessage());
        errorDTO.setErrorCode("SC001");
        ResponseEntity entity = new ResponseEntity((Object)errorDTO, HttpStatus.BAD_REQUEST);
        return entity;
    }

    @ExceptionHandler(value={AuthorizationException.class})
    @ResponseBody
    public ResponseEntity<ErrorDTO> handle(AuthorizationException exception) {
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setException(exception.getErrorMessage());
        errorDTO.setErrorCode(exception.getErrorCode());
        ResponseEntity entity = new ResponseEntity((Object)errorDTO, HttpStatus.FORBIDDEN);
        return entity;
    }

    @ExceptionHandler(value={RequestException.class})
    @ResponseBody
    @ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handle(RequestException exception) {
        log.error("Exception occured " + ExceptionLogHelper.convertToString((Exception)exception));
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setException(ExceptionLogHelper.convertToString((Exception)exception));
        errorDTO.setErrorCode("RE001");
        return errorDTO;
    }

    @ExceptionHandler(value={RestServiceClientException.class})
    @ResponseBody
    public ResponseEntity<String> handle(RestServiceClientException exception) {
        ResponseEntity entity = new ResponseEntity((Object)exception.getErrorContent(), exception.getStatusCode());
        return entity;
    }

    @ExceptionHandler(value={RestServiceException.class})
    @ResponseBody
    @ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handle(RestServiceException exception) {
        log.error("Exception occured " + ExceptionLogHelper.convertToString((Exception)exception));
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setException(ExceptionLogHelper.convertToString((Exception)exception));
        errorDTO.setErrorCode("RS001");
        return errorDTO;
    }

    @ExceptionHandler(value={Throwable.class})
    @ResponseBody
    @ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handle(Throwable throwable) {
        Exception exception = (Exception)throwable;
        log.error("Exception occured " + ExceptionLogHelper.convertToString((Exception)exception));
        ErrorDTO errorDTO = new ErrorDTO();
        if (StringUtils.isNotEmpty((CharSequence)exception.getMessage())) {
            errorDTO.setException(exception.getMessage());
        } else {
            errorDTO.setException(ExceptionLogHelper.convertToString((Exception)exception));
        }
        errorDTO.setErrorCode("TE001");
        return errorDTO;
    }
}

