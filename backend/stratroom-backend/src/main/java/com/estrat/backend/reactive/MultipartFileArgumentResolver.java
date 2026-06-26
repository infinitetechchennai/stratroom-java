package com.estrat.backend.reactive;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.core.MethodParameter;
import org.springframework.http.codec.multipart.Part;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.BindingContext;
import org.springframework.web.reactive.result.method.HandlerMethodArgumentResolver;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class MultipartFileArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return MultipartFile.class.isAssignableFrom(parameter.getParameterType());
    }

    @Override
    public Mono<Object> resolveArgument(
            MethodParameter parameter,
            BindingContext bindingContext,
            ServerWebExchange exchange) {
        String name = resolvePartName(parameter);
        if (!StringUtils.hasText(name)) {
            return Mono.empty();
        }
        return exchange.getMultipartData()
                .flatMap(parts -> toMultipartFile(name, parts.getFirst(name)));
    }

    private String resolvePartName(MethodParameter parameter) {
        RequestParam requestParam = parameter.getParameterAnnotation(RequestParam.class);
        if (requestParam != null) {
            if (StringUtils.hasText(requestParam.value())) {
                return requestParam.value();
            }
            if (StringUtils.hasText(requestParam.name())) {
                return requestParam.name();
            }
        }
        return parameter.getParameterName();
    }

    private Mono<MultipartFile> toMultipartFile(String name, Part part) {
        if (part == null) {
            return Mono.empty();
        }
        return ReactiveMultipartSupport.readPart(part)
                .map(uploaded -> new BridgeMultipartFile(
                        name,
                        uploaded.filename(),
                        null,
                        uploaded.content()));
    }

    private static final class BridgeMultipartFile implements MultipartFile {

        private final String name;
        private final String originalFilename;
        private final String contentType;
        private final byte[] content;

        private BridgeMultipartFile(String name, String originalFilename, String contentType, byte[] content) {
            this.name = name;
            this.originalFilename = originalFilename;
            this.contentType = contentType;
            this.content = content != null ? content : new byte[0];
        }

        @Override
        public String getName() {
            return name;
        }

        @Override
        public String getOriginalFilename() {
            return originalFilename;
        }

        @Override
        public String getContentType() {
            return contentType;
        }

        @Override
        public boolean isEmpty() {
            return content.length == 0;
        }

        @Override
        public long getSize() {
            return content.length;
        }

        @Override
        public byte[] getBytes() {
            return content;
        }

        @Override
        public InputStream getInputStream() {
            return new ByteArrayInputStream(content);
        }

        @Override
        public void transferTo(java.io.File dest) throws IOException {
            java.nio.file.Files.write(dest.toPath(), content);
        }
    }
}
