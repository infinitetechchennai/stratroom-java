/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.auth.service.DBService
 *  com.estrat.backend.auth.service.LoginService
 *  com.estrat.backend.auth.dto.AuthenticateResponseDTO
 *  com.estrat.backend.auth.dto.LoginDTO
 *  com.estrat.backend.auth.encryption.EncryptionProvider
 *  com.estrat.backend.auth.exception.RequestException
 *  com.estrat.backend.auth.jwt.JwtTokenUtil
 *  com.estrat.backend.auth.util.ServiceRequestThreadLocal
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Component
 */
package com.estrat.backend.auth.service;

import com.estrat.backend.auth.service.DBService;
import com.estrat.backend.auth.dto.AuthenticateResponseDTO;
import com.estrat.backend.auth.dto.LoginDTO;
import com.estrat.backend.auth.encryption.EncryptionProvider;
import com.estrat.backend.auth.exception.RequestException;
import com.estrat.backend.auth.jwt.JwtTokenUtil;
import com.estrat.backend.auth.util.ServiceRequestThreadLocal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LoginService {
    @Autowired
    private EncryptionProvider encryptionProvider;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private DBService dbService;

    public String createToken(LoginDTO loginDTO, AuthenticateResponseDTO authenticateResponseDTO) {
        String userInfo = String.join((CharSequence)"#", String.valueOf(authenticateResponseDTO.getEmployee().getEmpId()), loginDTO.getUserName(), authenticateResponseDTO.getEmployee().getPassword());
        return this.jwtTokenUtil.generateToken(userInfo);
    }

    public String getEncryptedUserInfo(LoginDTO loginDTO, AuthenticateResponseDTO authenticateResponseDTO) throws RequestException {
        List allRepoteeList = this.dbService.getAllReporteeList(authenticateResponseDTO.getEmployee().getEmpId());
        List reporteeIds = (List) allRepoteeList.stream().map(employee -> String.valueOf(((com.estrat.backend.auth.dto.Employee)employee).getEmpId())).collect(Collectors.toList());
        reporteeIds.add(String.valueOf(authenticateResponseDTO.getEmployee().getEmpId()));
        String userInfo = String.join((CharSequence)"#", String.valueOf(authenticateResponseDTO.getEmployee().getEmpId()), loginDTO.getUserName(), authenticateResponseDTO.getEmployee().getPassword(), String.join((CharSequence)",", reporteeIds), String.join((CharSequence)",", ServiceRequestThreadLocal.get().getAuthority()), String.valueOf(authenticateResponseDTO.getEmployee().getOrgDetails().getOrgId()));
        return this.encryptionProvider.encrypt(userInfo);
    }

    public AuthenticateResponseDTO authoriseUser(LoginDTO loginDTO) throws RequestException {
        AuthenticateResponseDTO authenticateResponseDTO = this.dbService.authoriseUser(loginDTO);
        if (!authenticateResponseDTO.isAuthoriseFlag()) {
            // empty if block
        }
        return authenticateResponseDTO;
    }
}

