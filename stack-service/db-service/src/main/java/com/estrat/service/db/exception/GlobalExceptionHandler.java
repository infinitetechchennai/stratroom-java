/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.ErrorDTO
 *  com.estrat.service.db.exception.AuthorizationException
 *  com.estrat.service.db.exception.ExceptionLogHelper
 *  com.estrat.service.db.exception.GlobalExceptionHandler
 *  com.estrat.service.db.exception.InputValidationException
 *  com.estrat.service.db.exception.RequestException
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
package com.estrat.service.db.exception;

import com.estrat.service.db.dto.ErrorDTO;
import com.estrat.service.db.exception.AuthorizationException;
import com.estrat.service.db.exception.ExceptionLogHelper;
import com.estrat.service.db.exception.InputValidationException;
import com.estrat.service.db.exception.RequestException;
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
        log.error((Object)("Exception occured " + ExceptionLogHelper.convertToString((Exception)exception)));
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

    @ExceptionHandler(value={InputValidationException.class})
    @ResponseBody
    @ResponseStatus(value=HttpStatus.BAD_REQUEST)
    public ErrorDTO handle(InputValidationException exception) {
        log.error((Object)("Exception occured " + ExceptionLogHelper.convertToString((Exception)exception)));
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setException(exception.getMessage());
        errorDTO.setErrorCode("BR001");
        return errorDTO;
    }

    @ExceptionHandler(value={RequestException.class})
    @ResponseBody
    @ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handle(RequestException exception) {
        log.error((Object)("Exception occured " + ExceptionLogHelper.convertToString((Exception)exception)));
        ErrorDTO errorDTO = new ErrorDTO();
        errorDTO.setException(ExceptionLogHelper.convertToString((Exception)exception));
        errorDTO.setErrorCode("RE001");
        return errorDTO;
    }

    @ExceptionHandler(value={Throwable.class})
    @ResponseBody
    @ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handle(Throwable throwable) {
        Exception exception = (Exception)throwable;
        log.error((Object)("Exception occured " + ExceptionLogHelper.convertToString((Exception)exception)));
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

