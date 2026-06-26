package com.estrat.backend.reactive;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.FormFieldPart;
import org.springframework.http.codec.multipart.Part;
import org.springframework.util.MultiValueMap;
import reactor.core.publisher.Mono;

/** Reads WebFlux multipart parts for legacy import controllers. */
public final class ReactiveMultipartSupport {

    private ReactiveMultipartSupport() {
    }

    public static Mono<UploadedPart> readPart(Part part) {
        if (part == null) {
            return Mono.empty();
        }
        if (part instanceof FilePart filePart) {
            return readFilePart(filePart);
        }
        if (part instanceof FormFieldPart fieldPart) {
            String value = fieldPart.value();
            byte[] bytes = value != null ? value.getBytes(java.nio.charset.StandardCharsets.UTF_8) : new byte[0];
            return Mono.just(new UploadedPart(part.name(), part.name(), bytes));
        }
        return DataBufferUtils.join(part.content())
                .map(buffer -> toUploadedPart(part.name(), part.name(), buffer));
    }

    public static Mono<UploadedPart> readFilePart(FilePart filePart) {
        return DataBufferUtils.join(filePart.content())
                .map(buffer -> toUploadedPart(
                        filePart.name(),
                        filePart.filename(),
                        buffer));
    }

    private static UploadedPart toUploadedPart(String name, String filename, DataBuffer buffer) {
        byte[] bytes = new byte[buffer.readableByteCount()];
        buffer.read(bytes);
        DataBufferUtils.release(buffer);
        return new UploadedPart(name, filename, bytes);
    }

    public static Part findUploadedPart(MultiValueMap<String, Part> parts, String... preferredNames) {
        if (parts == null || parts.isEmpty()) {
            return null;
        }
        if (preferredNames != null) {
            for (String name : preferredNames) {
                Part part = parts.getFirst(name);
                if (part != null) {
                    return part;
                }
            }
        }
        for (List<Part> list : parts.values()) {
            if (list == null) {
                continue;
            }
            for (Part part : list) {
                if (part instanceof FilePart) {
                    return part;
                }
            }
        }
        for (List<Part> list : parts.values()) {
            if (list != null && !list.isEmpty()) {
                return list.get(0);
            }
        }
        return null;
    }

    public record UploadedPart(String name, String filename, byte[] content) {

        public boolean isEmpty() {
            return content == null || content.length == 0;
        }

        public InputStream openStream() {
            return new ByteArrayInputStream(content != null ? content : new byte[0]);
        }
    }
}
