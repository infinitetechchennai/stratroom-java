/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ComplianceArea
 *  com.estrat.service.db.bean.po.ComplianceDetails
 *  com.estrat.service.db.bean.po.ComplianceDetailsAttachment
 *  com.estrat.service.db.dao.ComplianceDetailsRepository
 *  com.estrat.service.db.dto.ComplianceAreaDTO
 *  com.estrat.service.db.dto.ComplianceDetailsAttachmentDTO
 *  com.estrat.service.db.dto.ComplianceDetailsDTO
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.ComplianceDetailsController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.ComplianceDetailsAttachmentService
 *  com.estrat.service.db.service.ComplianceDetailsService
 *  com.estrat.service.db.service.EmployeeService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.po.ComplianceArea;
import com.estrat.service.db.bean.po.ComplianceDetails;
import com.estrat.service.db.bean.po.ComplianceDetailsAttachment;
import com.estrat.service.db.dao.ComplianceDetailsRepository;
import com.estrat.service.db.dto.ComplianceAreaDTO;
import com.estrat.service.db.dto.ComplianceDetailsAttachmentDTO;
import com.estrat.service.db.dto.ComplianceDetailsDTO;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.ComplianceDetailsAttachmentService;
import com.estrat.service.db.service.ComplianceDetailsService;
import com.estrat.service.db.service.EmployeeService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.OpenOption;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ComplianceDetailsController {
    @Value(value="${backup.script.file.path}")
    public String filepath;
    @Autowired
    protected ComplianceDetailsService complianceDetailsService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private AuditDetailsService auditService;
    @Autowired
    protected ComplianceDetailsAttachmentService complianceDetailsAttachmentService;
    @Autowired
    protected ComplianceDetailsRepository complianceDetailsRepository;

    @PostMapping(value={"/complainArea"})
    public ResponseEntity<ComplianceAreaDTO> save(@RequestBody ComplianceAreaDTO complianceAreaDTO, HttpServletRequest request) throws RequestException {
        ComplianceArea taskDetails = new ComplianceArea(complianceAreaDTO);
        taskDetails.setCreatedTime(LocalDateTime.now());
        ComplianceAreaDTO taskDTOObj = this.complianceDetailsService.saveArea(taskDetails);
        this.auditService.saveAudit("Complains", taskDTOObj.getId(), taskDTOObj.getCreatedBy(), "Complains Created");
        return new ResponseEntity((Object)taskDTOObj, HttpStatus.OK);
    }

    @PutMapping(value={"/complainArea"})
    public ResponseEntity<ComplianceAreaDTO> updatetasks(@RequestBody ComplianceAreaDTO complianceAreaDTO, HttpServletRequest request) throws RequestException {
        ComplianceArea tasks = new ComplianceArea(complianceAreaDTO);
        tasks.setUpdatedTime(LocalDateTime.now());
        ComplianceAreaDTO taskDTOObj = this.complianceDetailsService.saveArea(tasks);
        this.auditService.updateAudit("Complains", taskDTOObj.getId(), taskDTOObj.getUpdatedBy(), "Complains  Modified");
        return new ResponseEntity((Object)taskDTOObj, HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveComplinValue"})
    public ResponseEntity<List<ComplianceAreaDTO>> findAllValue(@RequestParam(value="pageId", required=false) String pageId, @RequestParam(value="dateRange") String dateRange) {
        return ResponseEntity.ok((Object)this.complianceDetailsService.findAllValue(dateRange, pageId));
    }

    @GetMapping(value={"/complainArea/{id}"})
    public ResponseEntity<ComplianceAreaDTO> getById(@PathVariable(value="id") Long id) throws RequestException {
        ComplianceAreaDTO riskCauseAndConsequenceDTO = new ComplianceAreaDTO((ComplianceArea)this.complianceDetailsService.findByAreaId(id.longValue()).get());
        return new ResponseEntity((Object)riskCauseAndConsequenceDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/complainArea/{id}"})
    public ResponseEntity<ComplianceAreaDTO> deleteById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional task = this.complianceDetailsService.findByAreaId(id.longValue());
        if (task.isPresent()) {
            ComplianceArea riskConqObj = (ComplianceArea)task.get();
            List complainDetail = this.complianceDetailsRepository.findAllByAreaId(id.longValue());
            if (complainDetail != null) {
                for (ComplianceDetails details : complainDetail) {
                    this.complianceDetailsService.delete(details);
                }
            }
            this.complianceDetailsService.deleteArea(riskConqObj);
            this.auditService.deleteAudit("Complains", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Complains Deleted");
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value={"/compliance"})
    public ResponseEntity<ComplianceDetailsDTO> saveTasks(@RequestBody ComplianceDetailsDTO complianceDetailsDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (complianceDetailsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(complianceDetailsDTO.getCreatedBy());
            complianceDetailsDTO.getComplainValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (complianceDetailsDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(complianceDetailsDTO.getUpdatedBy());
            complianceDetailsDTO.getComplainValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (complianceDetailsDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(complianceDetailsDTO.getOwner());
            complianceDetailsDTO.getComplainValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        ComplianceDetails taskDetails = new ComplianceDetails(complianceDetailsDTO);
        taskDetails.setCreatedTime(LocalDateTime.now());
        ComplianceDetailsDTO taskDTOObj = this.complianceDetailsService.save(taskDetails);
        if (complianceDetailsDTO.getComplainceAttachment() != null) {
            System.out.println("enter in attach ments save");
            ComplianceDetailsAttachmentDTO complainceAttachmentDTO = complianceDetailsDTO.getComplainceAttachment();
            complainceAttachmentDTO.setComplainDetalid(Long.valueOf(taskDTOObj.getId()));
            complainceAttachmentDTO.setCreatedTime(LocalDateTime.now());
            complainceAttachmentDTO.setCreatedBy(taskDTOObj.getCreatedBy());
            byte[] decodedBytes = Base64.getDecoder().decode(complainceAttachmentDTO.getFile());
            String filePath = this.filepath + "/Compliance/" + complainceAttachmentDTO.getUniqueFileReference();
            try {
                Files.write(Paths.get(filePath, new String[0]), decodedBytes, new OpenOption[0]);
            }
            catch (IOException e) {
                e.printStackTrace();
            }
            this.complianceDetailsAttachmentService.save(new ComplianceDetailsAttachment(complainceAttachmentDTO));
            System.out.println("exit in attach ments save");
        }
        this.auditService.saveAudit("Complains", taskDTOObj.getId(), taskDTOObj.getCreatedBy(), "Complains Created");
        return new ResponseEntity((Object)taskDTOObj, HttpStatus.OK);
    }

    @PutMapping(value={"/compliance"})
    public ResponseEntity<ComplianceDetailsDTO> updatetasks(@RequestBody ComplianceDetailsDTO complianceDetailsDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (complianceDetailsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(complianceDetailsDTO.getCreatedBy());
            complianceDetailsDTO.getComplainValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (complianceDetailsDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(complianceDetailsDTO.getUpdatedBy());
            complianceDetailsDTO.getComplainValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (complianceDetailsDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(complianceDetailsDTO.getOwner());
            complianceDetailsDTO.getComplainValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        ComplianceDetails tasks = new ComplianceDetails(complianceDetailsDTO);
        tasks.setUpdatedTime(LocalDateTime.now());
        ComplianceDetailsDTO taskDTOObj = this.complianceDetailsService.save(tasks);
        this.auditService.updateAudit("Complains", taskDTOObj.getId(), taskDTOObj.getUpdatedBy(), "Complains  Modified");
        return new ResponseEntity((Object)taskDTOObj, HttpStatus.OK);
    }

    @GetMapping(value={"/compliance/{id}"})
    public ResponseEntity<ComplianceDetailsDTO> getTaskById(@PathVariable(value="id") Long id) throws RequestException {
        ComplianceDetailsDTO comlainceDTO = new ComplianceDetailsDTO((ComplianceDetails)this.complianceDetailsService.findById(id.longValue()).get());
        this.complianceDetailsService.populateComplainceImpactDesc(comlainceDTO);
        return new ResponseEntity((Object)comlainceDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/compliance/{id}"})
    public ResponseEntity<ComplianceDetailsDTO> deleteTaskById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional task = this.complianceDetailsService.findById(id.longValue());
        if (task.isPresent()) {
            ComplianceDetails riskConqObj = (ComplianceDetails)task.get();
            this.complianceDetailsService.delete(riskConqObj);
            this.auditService.deleteAudit("Complains", id.longValue(), Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue(), "Complains Deleted");
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}

