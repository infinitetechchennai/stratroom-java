package com.estrat.backend.db.scv2;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

/**
 * Normalizes a list of raw weights so they sum to 1. When all weights are zero
 * (common in the legacy data, where weight defaults to 0), every entry receives
 * an equal share, so a scorecard still aggregates sensibly.
 */
@Component
public class WeightNormalizer {

    private static final int SCALE = 6;
    private static final RoundingMode ROUNDING = RoundingMode.HALF_UP;

    public List<BigDecimal> normalize(List<BigDecimal> weights) {
        if (weights == null || weights.isEmpty()) {
            return Collections.emptyList();
        }
        BigDecimal total = weights.stream()
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (total.compareTo(BigDecimal.ZERO) == 0) {
            BigDecimal equalWeight = BigDecimal.ONE.divide(
                    new BigDecimal(weights.size()), SCALE, ROUNDING);
            return Collections.nCopies(weights.size(), equalWeight);
        }
        return weights.stream()
                .map(w -> w != null ? w.divide(total, SCALE, ROUNDING) : BigDecimal.ZERO)
                .collect(Collectors.toList());
    }
}
