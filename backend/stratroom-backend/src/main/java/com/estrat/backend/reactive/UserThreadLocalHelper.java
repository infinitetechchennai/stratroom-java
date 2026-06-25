package com.estrat.backend.reactive;

import com.estrat.backend.db.resource.util.UserThreadLocal;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.server.ServerWebExchange;

public final class UserThreadLocalHelper {

    private UserThreadLocalHelper() {
    }

    public static void populateFromExchange(ServerWebExchange exchange) {
        Map<String, String> headers = new HashMap<>();
        headers.put("LOGGED_IN_EMPLOYEE_ID", exchange.getRequest().getHeaders().getFirst("LOGGED_IN_EMPLOYEE_ID"));
        headers.put("DATE_PERIOD", exchange.getRequest().getHeaders().getFirst("DATE_PERIOD"));
        headers.put("BATCH_NAME", exchange.getRequest().getHeaders().getFirst("BATCH_NAME"));
        headers.put("USER_ORG_ID", exchange.getRequest().getHeaders().getFirst("USER_ORG_ID"));
        headers.put("SUPER_USER_ID", exchange.getRequest().getHeaders().getFirst("SUPER_USER_ID"));
        headers.put("LOGGED_IN_DEPT_ID", exchange.getRequest().getHeaders().getFirst("LOGGED_IN_DEPT_ID"));
        UserThreadLocal.set(headers);
    }

    public static void clear() {
        UserThreadLocal.set(null);
    }
}
