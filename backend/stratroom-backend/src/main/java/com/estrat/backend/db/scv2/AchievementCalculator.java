package com.estrat.backend.db.scv2;

import java.math.BigDecimal;
import java.math.RoundingMode;
import org.springframework.stereotype.Component;

/**
 * Computes a KPI achievement percentage from actual vs target, honouring the
 * KPI polarity. Ported from the "gold standard" scorecard logic with the
 * documented fixes (target=0 edge case, capped/floored result).
 */
@Component
public class AchievementCalculator {

    private static final int SCALE = 4;
    private static final RoundingMode ROUNDING = RoundingMode.HALF_UP;
    private static final BigDecimal HUNDRED = new BigDecimal("100");
    private static final BigDecimal MAX_CAP = new BigDecimal("150");
    private static final BigDecimal MIN_SCORE = BigDecimal.ZERO;

    public BigDecimal calculate(BigDecimal actual, BigDecimal target, String polarity,
                                BigDecimal minTarget, BigDecimal maxTarget, BigDecimal cap) {
        if (actual == null) {
            return null;
        }
        // FIXED: target=0 must not yield a misleading 150%/divide-by-zero.
        if (target == null || target.compareTo(BigDecimal.ZERO) == 0) {
            return handleZeroTarget(actual, polarity);
        }

        BigDecimal capValue = cap != null ? cap : MAX_CAP;
        BigDecimal achievement;
        String p = polarity == null ? "HIGHER" : polarity.toUpperCase();

        switch (p) {
            case "HIGHER":
                achievement = actual.divide(target, SCALE, ROUNDING).multiply(HUNDRED);
                break;
            case "LOWER":
                achievement = target.divide(actual, SCALE, ROUNDING).multiply(HUNDRED);
                break;
            case "TARGET":
                BigDecimal deviation = actual.subtract(target).abs()
                        .divide(target, SCALE, ROUNDING).multiply(HUNDRED);
                achievement = HUNDRED.subtract(deviation).max(MIN_SCORE);
                break;
            case "RANGE":
                achievement = calculateRange(actual, minTarget, maxTarget);
                break;
            default:
                achievement = BigDecimal.ZERO;
        }
        return achievement.min(capValue).max(MIN_SCORE);
    }

    private BigDecimal handleZeroTarget(BigDecimal actual, String polarity) {
        if ("LOWER".equalsIgnoreCase(polarity)) {
            // lower-is-better, target 0: full marks only when actual is also 0
            return actual.compareTo(BigDecimal.ZERO) == 0 ? HUNDRED : BigDecimal.ZERO;
        }
        return BigDecimal.ZERO;
    }

    private BigDecimal calculateRange(BigDecimal actual, BigDecimal min, BigDecimal max) {
        if (min == null || max == null) {
            return BigDecimal.ZERO;
        }
        if (actual.compareTo(min) >= 0 && actual.compareTo(max) <= 0) {
            return HUNDRED;
        }
        if (actual.compareTo(min) < 0) {
            return actual.divide(min, SCALE, ROUNDING).multiply(HUNDRED).min(HUNDRED);
        }
        BigDecimal excess = actual.subtract(max);
        BigDecimal range = max.subtract(min);
        if (range.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        BigDecimal penalty = excess.divide(range, SCALE, ROUNDING).multiply(HUNDRED);
        return HUNDRED.subtract(penalty).max(MIN_SCORE);
    }
}
