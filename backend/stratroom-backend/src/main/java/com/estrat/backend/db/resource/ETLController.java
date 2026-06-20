/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.KPIDetailsDTO
 *  com.estrat.backend.db.resource.ETLController
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.etl.ETLService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.db.resource;

import com.estrat.backend.db.dto.KPIDetailsDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.etl.ETLService;
import java.util.List;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ETLController {
    @Autowired
    private ETLService etlService;

    @PostMapping(value={"/etl/saveKpiDetails"})
    public ResponseEntity<Map<String, Object>> saveKPIDetails(@RequestBody List<KPIDetailsDTO> detailsDTOs, HttpServletRequest request) {
        long batchId = this.etlService.createBatch(UserThreadLocal.get((String)"BATCH_NAME"));
        return new ResponseEntity((Object)this.etlService.saveKpiDetails(detailsDTOs, batchId), HttpStatus.OK);
    }
}

