package com.estrat.backend.reactive;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

/**
 * Puts the current {@link ServerWebExchange} into the Reactor context and restores
 * {@link com.estrat.backend.db.resource.util.UserThreadLocal} for legacy services.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ReactiveContextWebFilter implements WebFilter {

    @Value("${interCeptFlag:true}")
    private boolean interceptFlag;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        if (interceptFlag) {
            UserThreadLocalHelper.populateFromExchange(exchange);
        }
        return chain.filter(exchange)
                .contextWrite(ctx -> ctx.put(ReactiveContextKeys.SERVER_WEB_EXCHANGE, exchange))
                .doFinally(signal -> UserThreadLocalHelper.clear());
    }
}
