package com.estrat.backend.db.config;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * Maps Long entity fields to varchar DB columns (legacy risk_details.department_id).
 */
@Converter(autoApply = false)
public class LongStringJpaConverter implements AttributeConverter<Long, String> {

    @Override
    public String convertToDatabaseColumn(Long attribute) {
        return attribute == null ? null : String.valueOf(attribute);
    }

    @Override
    public Long convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isBlank()) {
            return null;
        }
        try {
            return Long.parseLong(dbData.trim());
        } catch (NumberFormatException ex) {
            return null;
        }
    }
}
