package com.estrat.backend.db.resource.util;

import com.estrat.backend.db.dto.UserDTO;
import com.estrat.backend.db.dto.DeptDetails;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public final class UserExportUtil {

    private UserExportUtil() {
    }

    public static ResponseEntity<ByteArrayResource> writeCsv(List<UserDTO> users, String orgName) {
        StringBuilder csv = new StringBuilder();
        csv.append("Name,Email Address,Department ID,Designation,Role,Location,Phone no,Status,Organization\n");
        if (users != null) {
            for (UserDTO user : users) {
                String deptVal = "";
                if (user.departmentList != null) {
                    deptVal = user.departmentList.stream()
                        .map(DeptDetails::getName)
                        .filter(Objects::nonNull)
                        .collect(Collectors.joining("; "));
                } else if (user.getDepartments() != null) {
                    deptVal = user.getDepartments();
                } else if (user.getDeptIds() != null) {
                    deptVal = user.getDeptIds();
                }

                csv.append(csvCell(user.getName())).append(',')
                    .append(csvCell(user.getEmailAddress())).append(',')
                    .append(csvCell(deptVal)).append(',')
                    .append(csvCell(user.getDesignation())).append(',')
                    .append(csvCell(user.getUserRole())).append(',')
                    .append(csvCell(user.getLocation())).append(',')
                    .append(csvCell(user.getPhoneNumber())).append(',')
                    .append(csvCell(user.getStatus())).append(',')
                    .append(csvCell(orgName != null && !orgName.trim().isEmpty() ? orgName : (user.getOrgId() != 0 ? String.valueOf(user.getOrgId()) : ""))).append('\n');
            }
        }
        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);
        ByteArrayResource resource = new ByteArrayResource(bytes);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("text", "csv", StandardCharsets.UTF_8));
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"users-export.csv\"");
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
