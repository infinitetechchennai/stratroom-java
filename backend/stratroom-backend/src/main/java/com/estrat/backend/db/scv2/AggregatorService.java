package com.estrat.backend.db.scv2;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Rolls up child scores into a parent score using one of the supported
 * aggregation methods: WEIGHTED, SIMPLE_AVG, MEDIAN, MIN, MAX, PASS_RATE.
 * Null child scores are excluded (their weights are dropped too).
 */
@Service
public class AggregatorService {

    private static final int SCALE = 2;
    private static final RoundingMode ROUNDING = RoundingMode.HALF_UP;

    private final WeightNormalizer weightNormalizer;

    @Autowired
    public AggregatorService(WeightNormalizer weightNormalizer) {
        this.weightNormalizer = weightNormalizer;
    }

    public BigDecimal aggregate(List<BigDecimal> scores, List<BigDecimal> weights,
                                String method, BigDecimal passRateThreshold) {
        if (scores == null || scores.isEmpty()) {
            return null;
        }
        // Keep only non-null scores, dropping the matching weight for each.
        List<BigDecimal> validScores = new ArrayList<>();
        List<BigDecimal> validWeights = new ArrayList<>();
        for (int i = 0; i < scores.size(); i++) {
            if (scores.get(i) != null) {
                validScores.add(scores.get(i));
                validWeights.add(weights != null && i < weights.size() && weights.get(i) != null
                        ? weights.get(i) : BigDecimal.ZERO);
            }
        }
        if (validScores.isEmpty()) {
            return null;
        }

        String m = method == null ? "WEIGHTED" : method.toUpperCase();
        switch (m) {
            case "SIMPLE_AVG":
            case "AVERAGE":
                return simpleAverage(validScores);
            case "MEDIAN":
                return median(validScores);
            case "MIN":
                return validScores.stream().min(BigDecimal::compareTo).orElse(BigDecimal.ZERO);
            case "MAX":
                return validScores.stream().max(BigDecimal::compareTo).orElse(BigDecimal.ZERO);
            case "PASS_RATE":
                BigDecimal threshold = passRateThreshold != null ? passRateThreshold : new BigDecimal("95");
                return passRate(validScores, threshold);
            case "WEIGHTED":
            default:
                return weighted(validScores, validWeights);
        }
    }

    private BigDecimal weighted(List<BigDecimal> scores, List<BigDecimal> weights) {
        List<BigDecimal> normalized = weightNormalizer.normalize(weights);
        if (normalized.size() != scores.size()) {
            return simpleAverage(scores);
        }
        BigDecimal sum = BigDecimal.ZERO;
        for (int i = 0; i < scores.size(); i++) {
            sum = sum.add(scores.get(i).multiply(normalized.get(i)));
        }
        return sum.setScale(SCALE, ROUNDING);
    }

    private BigDecimal simpleAverage(List<BigDecimal> scores) {
        BigDecimal sum = scores.stream().filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);
        return sum.divide(new BigDecimal(scores.size()), SCALE, ROUNDING);
    }

    private BigDecimal median(List<BigDecimal> scores) {
        List<BigDecimal> sorted = scores.stream().sorted().collect(Collectors.toList());
        int size = sorted.size();
        int mid = size / 2;
        if (size % 2 == 0) {
            return sorted.get(mid - 1).add(sorted.get(mid)).divide(new BigDecimal("2"), SCALE, ROUNDING);
        }
        return sorted.get(mid).setScale(SCALE, ROUNDING);
    }

    private BigDecimal passRate(List<BigDecimal> scores, BigDecimal threshold) {
        long passed = scores.stream().filter(s -> s.compareTo(threshold) >= 0).count();
        return new BigDecimal(passed).multiply(new BigDecimal("100"))
                .divide(new BigDecimal(scores.size()), SCALE, ROUNDING);
    }
}
