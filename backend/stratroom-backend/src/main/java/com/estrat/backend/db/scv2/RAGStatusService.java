package com.estrat.backend.db.scv2;

import java.math.BigDecimal;
import java.util.List;
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

    // 3- and 5-color status/color palettes (low -> high) used when a KPI defines its
    // own threshold band values; reuses the status strings the UI already renders.
    private static final String[] STATUS_3 = {"red", "amber", "green"};
    private static final String[] HEX_3 = {"#e84343", "#ffd500", "#1aa243"};
    private static final String[] STATUS_5 = {"red", "amber", "light_green", "green", "exceeds"};
    private static final String[] HEX_5 = {"#e84343", "#ffd500", "#5FCD5F", "#1aa243", "#0066cc"};

    /**
     * Per-KPI variant: `bands` are ascending upper-bound cutoffs the user entered in
     * the Threshold selector (lowest colour first). The score falls into the first
     * band it is &le;, otherwise the top colour. Falls back to the global-default
     * logic when no bands are supplied.
     */
    public RAGResult determineStatus(BigDecimal score, String classificationType, List<BigDecimal> bands) {
        if (bands == null || bands.isEmpty()) {
            return determineStatus(score, classificationType);
        }
        if (score == null) {
            return new RAGResult("unknown", "#808080", "No data available", score);
        }
        boolean five = "FIVE_COLOR".equalsIgnoreCase(classificationType) || bands.size() >= 4;
        String[] statuses = five ? STATUS_5 : STATUS_3;
        String[] hexes = five ? HEX_5 : HEX_3;
        int n = Math.min(bands.size(), statuses.length);
        for (int i = 0; i < n; i++) {
            BigDecimal b = bands.get(i);
            if (b != null && score.compareTo(b) <= 0) {
                return new RAGResult(statuses[i], hexes[i], "Within threshold band " + (i + 1), score);
            }
        }
        int top = statuses.length - 1;
        return new RAGResult(statuses[top], hexes[top], "Above all thresholds", score);
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
