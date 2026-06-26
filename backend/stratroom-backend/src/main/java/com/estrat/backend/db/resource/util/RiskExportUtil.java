package com.estrat.backend.db.resource.util;

import com.estrat.backend.db.dto.RiskDTO;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public final class RiskExportUtil {

    private RiskExportUtil() {
    }

    public static ResponseEntity<ByteArrayResource> writeCsv(List<RiskDTO> risks) {
        StringBuilder csv = new StringBuilder();
        csv.append("Id,Name,Description,Department,Category,Impact,Likelihood,Score,Status,Date Raised,Date Completed,Owner\n");
        if (risks != null) {
            for (RiskDTO risk : risks) {
                Map<String, Object> rv = risk.getRiskValue();
                if (rv == null) {
                    continue;
                }
                csv.append(csvCell(risk.getId())).append(',')
                    .append(csvCell(rv.get("name"))).append(',')
                    .append(csvCell(rv.get("desc"))).append(',')
                    .append(csvCell(rv.get("department"))).append(',')
                    .append(csvCell(rv.get("riskcategory"))).append(',')
                    .append(csvCell(rv.get("impact"))).append(',')
                    .append(csvCell(rv.get("likeliHood"))).append(',')
                    .append(csvCell(rv.get("score"))).append(',')
                    .append(csvCell(rv.get("riskStatus"))).append(',')
                    .append(csvCell(rv.get("dateRaised"))).append(',')
                    .append(csvCell(rv.get("dateCompleted"))).append(',')
                    .append(csvCell(rv.get("ownerName"))).append('\n');
            }
        }
        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);
        ByteArrayResource resource = new ByteArrayResource(bytes);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("text", "csv", StandardCharsets.UTF_8));
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"risk-register.csv\"");
        headers.setContentLength(bytes.length);
        return ResponseEntity.ok().headers(headers).body(resource);
    }

    private static String csvCell(Object value) {
        String text = Objects.toString(value, "");
        if (text.contains("\"") || text.contains(",") || text.contains("\n")) {
            return "\"" + text.replace("\"", "\"\"") + "\"";
        }
        return text;
    }
}
