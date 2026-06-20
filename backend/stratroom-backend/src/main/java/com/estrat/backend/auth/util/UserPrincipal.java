/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.auth.dto.LoginResponseDTO
 *  com.estrat.backend.auth.util.UserPrincipal
 */
package com.estrat.backend.auth.util;

import com.estrat.backend.auth.dto.LoginResponseDTO;
import java.util.List;

public class UserPrincipal {
    LoginResponseDTO loginResponseDTO;
    private boolean ssoLogin;
    private List<String> authority;

    public boolean isSsoLogin() {
        return this.ssoLogin;
    }

    public void setSsoLogin(boolean ssoLogin) {
        this.ssoLogin = ssoLogin;
    }

    public LoginResponseDTO getLoginResponseDTO() {
        return this.loginResponseDTO;
    }

    public void setLoginResponseDTO(LoginResponseDTO loginResponseDTO) {
        this.loginResponseDTO = loginResponseDTO;
    }

    public List<String> getAuthority() {
        return this.authority;
    }

    public void setAuthority(List<String> authority) {
        this.authority = authority;
    }
}

