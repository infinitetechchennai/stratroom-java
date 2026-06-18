package com.estrat.backend.db.util;

import com.udojava.evalex.AbstractFunction;
import com.udojava.evalex.Expression;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

/**
 * Formula evaluator used by KPI / YTD / Performance formula validation.
 *
 * Lives in the db package because the consolidated backend's component scan
 * excludes com.estrat.backend.scorecard.*, so the scorecard FormulaUtil is not
 * available to the active controllers. Registers the comma-list aggregation
 * functions (sum, agg, avg, count, min, max) on top of EvalEx 2.7's built-ins
 * (IF, MAX, MIN) so any formula the calculators can build evaluates.
 */
public class FormulaUtil {

    public String applyExpression(String expressionValue) {
        Expression e = new Expression(expressionValue);
        e.setPrecision(20);
        addCustomizedFunction(e);
        return e.eval().setScale(2, RoundingMode.HALF_UP).toPlainString();
    }

    public void addCustomizedFunction(Expression e) {
        e.addFunction(new AbstractFunction("sum", -1) {
            @Override
            public BigDecimal eval(List<BigDecimal> parameters) {
                return sum(parameters);
            }
        });
        e.addFunction(new AbstractFunction("agg", -1) {
            @Override
            public BigDecimal eval(List<BigDecimal> parameters) {
                return sum(parameters);
            }
        });
        e.addFunction(new AbstractFunction("avg", -1) {
            @Override
            public BigDecimal eval(List<BigDecimal> parameters) {
                if (parameters.isEmpty()) {
                    return BigDecimal.ZERO;
                }
                return sum(parameters).divide(new BigDecimal(parameters.size()), 20, RoundingMode.HALF_UP);
            }
        });
        e.addFunction(new AbstractFunction("count", -1) {
            @Override
            public BigDecimal eval(List<BigDecimal> parameters) {
                return new BigDecimal(parameters.size());
            }
        });
        e.addFunction(new AbstractFunction("min", -1) {
            @Override
            public BigDecimal eval(List<BigDecimal> parameters) {
                BigDecimal result = null;
                for (BigDecimal p : parameters) {
                    if (p == null) continue;
                    result = (result == null || p.compareTo(result) < 0) ? p : result;
                }
                return result == null ? BigDecimal.ZERO : result;
            }
        });
        e.addFunction(new AbstractFunction("max", -1) {
            @Override
            public BigDecimal eval(List<BigDecimal> parameters) {
                BigDecimal result = null;
                for (BigDecimal p : parameters) {
                    if (p == null) continue;
                    result = (result == null || p.compareTo(result) > 0) ? p : result;
                }
                return result == null ? BigDecimal.ZERO : result;
            }
        });
    }

    private static BigDecimal sum(List<BigDecimal> parameters) {
        BigDecimal total = BigDecimal.ZERO;
        for (BigDecimal p : parameters) {
            if (p != null) {
                total = total.add(p);
            }
        }
        return total;
    }
}
