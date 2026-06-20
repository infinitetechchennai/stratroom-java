package com.estrat.backend.db.scv2;

import java.math.BigDecimal;
import org.springframework.stereotype.Service;

/**
 * Maps a numeric score to a RAG (Red/Amber/Green) status, supporting both the
 * 3-color and 5-color classifications, plus a simple trend comparison.
 * Status strings are returned lower-cased ("green"/"amber"/"red"/...) so they
 * match what the React scorecard UI expects in statusLight.
 */
@Service
public class RAGStatusService {

    // 3-color thresholds
    private static final BigDecimal GREEN_THRESHOLD = new BigDecimal("95");
    private static final BigDecimal AMBER_THRESHOLD = new BigDecimal("80");
    // 5-color thresholds
    private static final BigDecimal EXCEEDS_THRESHOLD = new BigDecimal("120");
    private static final BigDecimal LIGHT_GREEN_THRESHOLD = new BigDecimal("85");
    private static final BigDecimal AMBER_5_THRESHOLD = new BigDecimal("70");

    public RAGResult determineStatus(BigDecimal score, String classificationType) {
        if (score == null) {
            return new RAGResult("unknown", "#808080", "No data available", score);
        }
        if ("FIVE_COLOR".equalsIgnoreCase(classificationType)) {
            return fiveColor(score);
        }
        return threeColor(score);
    }

    private RAGResult threeColor(BigDecimal score) {
        if (score.compareTo(GREEN_THRESHOLD) >= 0) {
            return new RAGResult("green", "#1aa243", "On or above target", score);
        }
        if (score.compareTo(AMBER_THRESHOLD) >= 0) {
            return new RAGResult("amber", "#ffd500", "Below target but acceptable", score);
        }
        return new RAGResult("red", "#e84343", "Significantly below target", score);
    }

    private RAGResult fiveColor(BigDecimal score) {
        if (score.compareTo(EXCEEDS_THRESHOLD) >= 0) {
            return new RAGResult("exceeds", "#0066cc", "Exceeds target", score);
        }
        if (score.compareTo(GREEN_THRESHOLD) >= 0) {
            return new RAGResult("green", "#1aa243", "On or above target", score);
        }
        if (score.compareTo(LIGHT_GREEN_THRESHOLD) >= 0) {
            return new RAGResult("light_green", "#5FCD5F", "Slightly below target", score);
        }
        if (score.compareTo(AMBER_5_THRESHOLD) >= 0) {
            return new RAGResult("amber", "#ffd500", "Below target", score);
        }
        return new RAGResult("red", "#e84343", "Critical", score);
    }

    /** "up" / "down" / "stable" with a 2-point dead-band, matching the UI trend icons. */
    public String calculateTrend(BigDecimal current, BigDecimal previous) {
        if (current == null || previous == null) {
            return "stable";
        }
        BigDecimal difference = current.subtract(previous);
        BigDecimal threshold = new BigDecimal("2");
        if (difference.compareTo(threshold) > 0) {
            return "up";
        }
        if (difference.compareTo(threshold.negate()) < 0) {
            return "down";
        }
        return "stable";
    }

    /** Plain result holder (no Lombok). */
    public static class RAGResult {
        private final String status;
        private final String colorHex;
        private final String description;
        private final BigDecimal score;

        public RAGResult(String status, String colorHex, String description, BigDecimal score) {
            this.status = status;
            this.colorHex = colorHex;
            this.description = description;
            this.score = score;
        }

        public String getStatus() { return status; }
        public String getColorHex() { return colorHex; }
        public String getDescription() { return description; }
        public BigDecimal getScore() { return score; }
    }
}
