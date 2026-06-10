/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.licenseservice.dto.LicenseDTO
 *  com.estrat.service.licenseservice.dto.LicenseResponseDTO
 *  com.estrat.service.licenseservice.exception.RequestException
 *  com.estrat.service.licenseservice.resource.LicenseController
 *  com.estrat.service.licenseservice.service.LicenseService
 *  org.apache.commons.collections4.map.HashedMap
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.licenseservice.resource;

import com.estrat.service.licenseservice.dto.LicenseDTO;
import com.estrat.service.licenseservice.dto.LicenseResponseDTO;
import com.estrat.service.licenseservice.exception.RequestException;
import com.estrat.service.licenseservice.service.LicenseService;
import java.util.Map;
import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LicenseController {
    @Autowired
    protected LicenseService licenseService;

    @PostMapping(value={"/license"})
    public ResponseEntity<Map<String, String>> createLicense(@RequestBody LicenseDTO licenseDTO) throws RequestException {
        HashedMap licenseKey = new HashedMap();
        licenseKey.put("licenseKey", this.licenseService.createLicense(licenseDTO));
        return new ResponseEntity((Object)licenseKey, HttpStatus.OK);
    }

    @PostMapping(value={"/validateLicense"})
    public ResponseEntity<LicenseResponseDTO> validateLicense(@RequestBody Map<String, String> licenseDTO) throws RequestException {
        return new ResponseEntity((Object)this.licenseService.validateLicense(licenseDTO), HttpStatus.OK);
    }
}

