package com.estrat.web.controller;

import com.estrat.web.config.CommonRestTemplate;
import com.estrat.web.util.UserThreadLocal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Thin proxy that exposes the backend Org Structure aggregate under the web
 * context (/stratroom) so the browser can fetch everything the org structure
 * page needs in a single call. orgId and empId are taken from the logged-in
 * user's session, exactly like the existing org structure endpoints.
 */
@RestController
public class OrgStructureAggregateController {
    private static final Logger LOGGER = LoggerFactory.getLogger(OrgStructureAggregateController.class);

    @Autowired
    private CommonRestTemplate restTemplate;

    @Value(value = "${stratroom.backend.url:http://localhost:8085/api}")
    private String backendUrl;

    @GetMapping(value = {"/org/structure/aggregate"})
    public ResponseEntity<Object> aggregate(@RequestParam(value = "deptId", required = false) Long deptId, @RequestParam(value = "moduleNames", required = false) String moduleNames) {
        long orgId = UserThreadLocal.get().getProfile().getOrgDetails().getOrgId();
        String empId = UserThreadLocal.get().getProfile().getEmpId();
        StringBuilder url = new StringBuilder(this.backendUrl);
        url.append("/org/structure/aggregate?orgId=").append(orgId).append("&empId=").append(empId);
        if (deptId != null) {
            url.append("&deptId=").append(deptId);
        }
        if (moduleNames != null && !moduleNames.isEmpty()) {
            url.append("&moduleNames=").append(URLEncoder.encode(moduleNames, StandardCharsets.UTF_8));
        }
        Object body = this.restTemplate.getForObject(url.toString(), Object.class);
        return new ResponseEntity<Object>(body, HttpStatus.OK);
    }
}
