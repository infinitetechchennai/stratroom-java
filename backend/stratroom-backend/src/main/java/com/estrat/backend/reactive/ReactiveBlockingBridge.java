package com.estrat.backend.reactive;

import java.util.concurrent.Callable;
import java.util.function.Supplier;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

public final class ReactiveBlockingBridge {

    private ReactiveBlockingBridge() {
    }

    public static <T> Mono<T> fromBlocking(Callable<T> callable) {
        return Mono.fromCallable(callable).subscribeOn(Schedulers.boundedElastic());
    }

    public static <T> Mono<T> fromBlocking(Supplier<T> supplier) {
        return Mono.fromCallable(supplier::get).subscribeOn(Schedulers.boundedElastic());
    }

    public static Mono<Void> runBlocking(Runnable runnable) {
        return Mono.fromRunnable(runnable).subscribeOn(Schedulers.boundedElastic()).then();
    }
}
