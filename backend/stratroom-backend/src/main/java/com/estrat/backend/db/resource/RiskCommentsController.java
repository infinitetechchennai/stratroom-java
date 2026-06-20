/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.RiskComments
 *  com.estrat.backend.db.cache.DBCache
 *  com.estrat.backend.db.dao.RiskCommentsRepository
 *  com.estrat.backend.db.dto.EmployeeDTO
 *  com.estrat.backend.db.dto.RiskCommentsDTO
 *  com.estrat.backend.db.dto.RiskResponseDTO
 *  com.estrat.backend.db.exception.RequestException
 *  com.estrat.backend.db.resource.RiskCommentsController
 *  com.estrat.backend.db.resource.util.RiskUtil
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  com.estrat.backend.db.service.RiskCommentsService
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.backend.db.resource;

import com.estrat.backend.db.bean.po.RiskComments;
import com.estrat.backend.db.cache.DBCache;
import com.estrat.backend.db.dao.RiskCommentsRepository;
import com.estrat.backend.db.dto.EmployeeDTO;
import com.estrat.backend.db.dto.RiskCommentsDTO;
import com.estrat.backend.db.dto.RiskResponseDTO;
import com.estrat.backend.db.exception.RequestException;
import com.estrat.backend.db.resource.util.RiskUtil;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.AuditDetailsService;
import com.estrat.backend.db.service.EmployeeService;
import com.estrat.backend.db.service.RiskCommentsService;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RiskCommentsController {
    @Autowired
    protected RiskCommentsService riskCommentsService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DBCache dbCache;
    @Autowired
    private RiskUtil riskUtil;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    protected RiskCommentsRepository riskCommentsRepository;

    @PostMapping(value={"/riskComments"})
    public ResponseEntity<RiskResponseDTO> saveRiskCommentsDetails(@RequestBody RiskCommentsDTO riskCommentsDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(riskCommentsDTO.getRiskCommentsValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (riskCommentsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(riskCommentsDTO.getCreatedBy());
            riskCommentsDTO.getRiskCommentsValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (riskCommentsDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(riskCommentsDTO.getUpdatedBy());
            riskCommentsDTO.getRiskCommentsValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (riskCommentsDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(riskCommentsDTO.getOwner());
            riskCommentsDTO.getRiskCommentsValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        this.riskUtil.updateCommentsDetails(riskCommentsDTO);
        if (riskCommentsDTO.getCommentsParendId() != 0L) {
            riskCommentsDTO.setCommentType(1);
        }
        RiskComments riskComments = new RiskComments(riskCommentsDTO);
        riskComments.setCreatedTime(this.auditService.getCurrentTimeUTC());
        System.out.println("version comments :: " + riskCommentsDTO.getVersion());
        if (riskComments.getVersion() == null) {
            riskComments.setVersion(Long.valueOf(1L));
        }
        RiskResponseDTO riskResponseDTO = this.riskCommentsService.save(riskComments);
        return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/riskComments"})
    public ResponseEntity<RiskResponseDTO> updateRiskCommentsDetails(@RequestBody RiskCommentsDTO riskCommentsDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(riskCommentsDTO.getRiskCommentsValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (riskCommentsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(riskCommentsDTO.getCreatedBy());
            riskCommentsDTO.getRiskCommentsValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (riskCommentsDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(riskCommentsDTO.getUpdatedBy());
            riskCommentsDTO.getRiskCommentsValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (riskCommentsDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(riskCommentsDTO.getOwner());
            riskCommentsDTO.getRiskCommentsValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        this.riskUtil.updateCommentsDetails(riskCommentsDTO);
        if (riskCommentsDTO.getCommentsParendId() != null && riskCommentsDTO.getCommentsParendId() != 0L) {
            riskCommentsDTO.setCommentType(1);
        }
        RiskComments riskComments = new RiskComments(riskCommentsDTO);
        riskComments.setUpdatedTime(this.auditService.getCurrentTimeUTC());
        RiskResponseDTO riskResponseDTO = this.riskCommentsService.save(riskComments);
        return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/riskComments/{id}"})
    public ResponseEntity<RiskCommentsDTO> getRiskCommentsDetailsById(@PathVariable(value="id") Long id) throws RequestException {
        RiskCommentsDTO riskCommentsDTO = new RiskCommentsDTO((RiskComments)this.riskCommentsService.findById(id.longValue()).get());
        return new ResponseEntity((Object)riskCommentsDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/riskComments/{id}"})
    public ResponseEntity<RiskResponseDTO> deleteSubInitiativesDetailsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional riskComments = this.riskCommentsService.findById(id.longValue());
        if (riskComments.isPresent()) {
            RiskComments riskComments1 = (RiskComments)riskComments.get();
            this.riskCommentsService.delete(riskComments1);
            RiskResponseDTO riskResponseDTO = new RiskResponseDTO();
            riskResponseDTO.setFlag(true);
            this.dbCache.remove((Object)("retrieveRiskCommentsByRiskId" + riskComments1.getRiskId()), "dbCache");
            this.dbCache.remove((Object)("retrieveRiskCommentsByEmpId" + UserThreadLocal.get()), "dbCache");
            return new ResponseEntity((Object)riskResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/riskCommentsList/{riskId}"})
    public ResponseEntity<List<RiskCommentsDTO>> findAllByRiskId(@PathVariable(value="riskId") Long riskId) throws RequestException {
        List riskCommentsDTOS = this.riskCommentsService.findAllByRiskDetailsId(riskId, Long.valueOf(0L));
        return new ResponseEntity((Object)riskCommentsDTOS, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveRiskCommentsList/{empId}"})
    public ResponseEntity<List<RiskCommentsDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List riskCommentsDTOList = this.riskCommentsService.findAll(empId.longValue());
        return new ResponseEntity((Object)riskCommentsDTOList, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> riskCommentsValue) {
        if (Objects.isNull(riskCommentsValue.get("progressval")) || StringUtils.isEmpty((CharSequence)riskCommentsValue.get("progressval").toString())) {
            riskCommentsValue.put("progressval", "0");
        }
    }

    @GetMapping(value={"/employeeRiskCommentsList/{empId}"})
    public ResponseEntity<List<RiskCommentsDTO>> findAllByEmpIdANDFromPage(@PathVariable(value="empId") Long empId) throws RequestException {
        List riskCommentsDTOList = this.riskCommentsService.findAllByEmpIdANDFromPage(empId.longValue());
        return new ResponseEntity((Object)riskCommentsDTOList, HttpStatus.OK);
    }

    @PutMapping(value={"/riskCommentLike"})
    public ResponseEntity<RiskCommentsDTO> updateCommentLike(@RequestBody RiskCommentsDTO commentsDTO) throws RequestException {
        return new ResponseEntity((Object)this.riskCommentsService.updateCommentLike(commentsDTO), HttpStatus.OK);
    }
}

