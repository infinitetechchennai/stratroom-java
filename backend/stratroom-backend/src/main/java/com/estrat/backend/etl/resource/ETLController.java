/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.etl.dto.KPIDetailsDTO
 *  com.estrat.backend.etl.resource.ETLController
 *  com.estrat.backend.etl.service.DBService
 *  com.estrat.backend.etl.util.KPIReaderUtil
 *  com.estrat.backend.etl.util.UserThreadLocal
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.backend.etl.resource;

import com.estrat.backend.etl.dto.KPIDetailsDTO;
import com.estrat.backend.etl.service.DBService;
import com.estrat.backend.etl.util.KPIReaderUtil;
import com.estrat.backend.etl.util.UserThreadLocal;
import com.estrat.backend.reactive.ReactiveMultipartSupport;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RestController
public class ETLController {
    @Autowired
    private KPIReaderUtil kpiReaderUtil;
    @Autowired
    private DBService dbService;

    @RequestMapping(value={"/saveKpiDetails"}, method={RequestMethod.POST}, consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<ResponseEntity<Map<String, Object>>> saveKpiDetails(
            @RequestPart(value="nodeData", required=false) Mono<FilePart> nodeDataPart) {
        Mono<FilePart> partMono = nodeDataPart != null ? nodeDataPart : Mono.empty();
        return partMono
                .flatMap(part -> ReactiveMultipartSupport.readFilePart(part)
                        .flatMap(uploaded -> Mono.fromCallable(() -> {
                            @SuppressWarnings("unchecked")
                            Map<String, Object> response = (Map<String, Object>) this.dbService.saveKpiDetails(
                                    this.kpiReaderUtil.readKPIDetails(uploaded.openStream())).getBody();
                            return new ResponseEntity<>(response, HttpStatus.OK);
                        }).subscribeOn(Schedulers.boundedElastic())))
                .switchIfEmpty(Mono.fromSupplier(() -> {
                    Map<String, Object> body = new HashMap<>();
                    body.put("message", "No file uploaded");
                    return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
                }));
    }

    @RequestMapping(value={"/v1/saveKpiDetails"}, method={RequestMethod.POST})
    public ResponseEntity<Map<String, Object>> saveKpiDetailsFromFile(@RequestBody List<KPIDetailsDTO> detailsDTOs) {
        Map response = null;
        try {
            List finalList = detailsDTOs.stream().map(detailsDTO -> {
                if (UserThreadLocal.get() != null && UserThreadLocal.get().get("BATCH_NAME") == null) {
                    if (this.isAnnualTargetTemplate(detailsDTO)) {
                        UserThreadLocal.get().put("BATCH_NAME", "Annual Target");
                    } else {
                        UserThreadLocal.get().put("BATCH_NAME", "OrgKPIDetails");
                    }
                }
                System.out.println("check dept uniqueID : " + detailsDTO.getDepartmentUniqueId());
                return detailsDTO;
            }).collect(Collectors.toList());
            response = (Map)this.dbService.saveKpiDetails(finalList).getBody();
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity((Object)response, HttpStatus.OK);
    }

    public boolean isAnnualTargetTemplate(KPIDetailsDTO kpiDetailsDTO) {
        String templateType = StringUtils.trimToEmpty((String)kpiDetailsDTO.getTemplateType());
        return "AnnualTarget".equalsIgnoreCase(templateType) || StringUtils.isNotEmpty((CharSequence)kpiDetailsDTO.getTargetYear());
    }
}

