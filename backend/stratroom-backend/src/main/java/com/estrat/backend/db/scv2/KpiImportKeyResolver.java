package com.estrat.backend.db.scv2;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

/**
 * Resolves KPI keys from uploaded Excel rows (KPI code, node key, or numeric id)
 * to {@code sc_kpis.id} for a single scorecard page.
 */
@Component
public class KpiImportKeyResolver {

    private static final Logger log = LoggerFactory.getLogger(KpiImportKeyResolver.class);

    private final Map<String, String> nodeKeyToCode;

    public KpiImportKeyResolver() {
        this.nodeKeyToCode = loadNodeKeyMapping();
    }

    public Long resolveDbId(String rawKey, Map<String, Long> codeToId) {
        if (rawKey == null || rawKey.isBlank() || codeToId.isEmpty()) {
            return null;
        }
        String key = rawKey.trim();

        Long direct = codeToId.get(key);
        if (direct != null) {
            return direct;
        }

        String normalized = normalizeKpiCode(key);
        if (!normalized.equals(key)) {
            direct = codeToId.get(normalized);
            if (direct != null) {
                return direct;
            }
        }

        String mappedCode = nodeKeyToCode.get(key);
        if (mappedCode != null) {
            direct = codeToId.get(mappedCode);
            if (direct != null) {
                return direct;
            }
            String normMapped = normalizeKpiCode(mappedCode);
            direct = codeToId.get(normMapped);
            if (direct != null) {
                return direct;
            }
        }

        try {
            long asId = Long.parseLong(key);
            for (Long id : codeToId.values()) {
                if (id == asId) {
                    return id;
                }
            }
        } catch (NumberFormatException ignored) {
            // not a numeric id
        }
        return null;
    }

    /**
     * Excel exports sometimes use {@code P1.01.K1} while the DB stores {@code P1.O1.K1}.
     */
    static String normalizeKpiCode(String code) {
        if (code == null) {
            return "";
        }
        return code.replaceAll("(P\\d+)\\.0(\\d+)\\.", "$1.O$2.");
    }

    private static Map<String, String> loadNodeKeyMapping() {
        try (InputStream in = new ClassPathResource("kpi_mapping.json").getInputStream()) {
            Map<String, String> raw = new ObjectMapper().readValue(in, new TypeReference<>() {});
            log.info("Loaded {} ETL node-key → KPI code mappings", raw.size());
            return raw;
        } catch (Exception e) {
            log.warn("kpi_mapping.json not loaded — node-key imports will only match KPI codes: {}", e.getMessage());
            return Map.of();
        }
    }
}
