package com.estrat.backend.db.resource.util;

import com.estrat.backend.db.dto.UserDTO;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.lang3.StringUtils;

public final class UserImportUtil {

    private UserImportUtil() {
    }

    public static List<UserDTO> parseCsv(MultipartFile file, long orgId) throws Exception {
        List<UserDTO> users = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            boolean firstLine = true;
            while ((line = reader.readLine()) != null) {
                if (firstLine) {
                    // skip header
                    firstLine = false;
                    continue;
                }
                if (StringUtils.isBlank(line)) {
                    continue;
                }
                
                String[] columns = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
                if (columns.length < 2) continue;
                
                UserDTO dto = new UserDTO();
                dto.setOrgId(orgId);
                dto.setName(cleanValue(columns[0]));
                dto.setEmailAddress(cleanValue(columns[1]));
                if (columns.length > 2) dto.setDeptValue(cleanValue(columns[2]));
                if (columns.length > 3) dto.setDesignation(cleanValue(columns[3]));
                if (columns.length > 4) dto.setUserRole(cleanValue(columns[4]));
                if (columns.length > 5) dto.setLocation(cleanValue(columns[5]));
                if (columns.length > 6) dto.setPhoneNumber(cleanValue(columns[6]));
                if (columns.length > 7) dto.setStatus(cleanValue(columns[7]));
                if (columns.length > 8) {
                    String orgStr = cleanValue(columns[8]);
                    if (StringUtils.isNotBlank(orgStr)) {
                        try { dto.setOrgId(Long.parseLong(orgStr)); } catch (Exception ignored) {}
                    }
                }
                if (StringUtils.isBlank(dto.getStatus())) dto.setStatus("Active");
                if (StringUtils.isBlank(dto.getUserRole())) dto.setUserRole("User");
                if (StringUtils.isBlank(dto.getUserCategory())) dto.setUserCategory("employees");
                if (StringUtils.isBlank(dto.getUserType())) dto.setUserType("internal");
                
                users.add(dto);
            }
        }
        return users;
    }

    private static String cleanValue(String val) {
        if (val == null) return null;
        val = val.trim();
        if (val.startsWith("\"") && val.endsWith("\"") && val.length() >= 2) {
            val = val.substring(1, val.length() - 1);
        }
        return val.replace("\"\"", "\"");
    }
}
