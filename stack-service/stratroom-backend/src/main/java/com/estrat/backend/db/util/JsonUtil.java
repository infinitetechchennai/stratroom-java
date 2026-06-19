package com.estrat.backend.db.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;

/**
 * Utility for safely parsing JSON strings that may have been stored with
 * MySQL-style escaping (e.g. leading backslash or double-encoded quotes).
 * PostgreSQL returns the raw JSON string; this helper normalises both formats.
 */
public class JsonUtil {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    /**
     * Parse a JSON string into a Map, handling MySQL-escaped values that start
     * with a backslash or are double-encoded (e.g. "\"{ ... }\"").
     *
     * @param json the raw string from the database column
     * @return parsed Map, or an empty HashMap if the string is null/blank/unparseable
     */
    @SuppressWarnings("unchecked")
    public static Map<String, Object> parseMap(String json) {
        if (json == null || json.isBlank()) {
            return new HashMap<>();
        }
        String cleaned = cleanJson(json);
        try {
            return (Map<String, Object>) MAPPER.readValue(cleaned, HashMap.class);
        } catch (Exception e) {
            // Second attempt: if the cleaned string is still not valid JSON,
            // try unwrapping one more level of string escaping.
            try {
                String unwrapped = MAPPER.readValue(cleaned, String.class);
                return (Map<String, Object>) MAPPER.readValue(unwrapped, HashMap.class);
            } catch (Exception ignored) {
                return new HashMap<>();
            }
        }
    }

    /**
     * Strip leading/trailing backslash-escaping that MySQL added when storing
     * JSON in a TEXT column (e.g.  \{"key":"val"}  or  "{\"key\":\"val\"}").
     */
    public static String cleanJson(String json) {
        if (json == null) return null;
        String s = json.trim();
        // Remove surrounding double-quotes if the whole string is quoted
        if (s.startsWith("\"") && s.endsWith("\"") && s.length() > 1) {
            s = s.substring(1, s.length() - 1);
            // Unescape inner escaped quotes
            s = s.replace("\\\"", "\"").replace("\\\\", "\\");
        }
        // Strip a leading lone backslash (MySQL artefact: \{...})
        if (s.startsWith("\\") && s.length() > 1 && s.charAt(1) == '{') {
            s = s.substring(1);
        }
        return s;
    }
}
