/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.EmployeeDocuments
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.EmployeeDocumentsDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.EmployeeDocumentsController
 *  com.estrat.service.db.service.EmployeeDocumentsService
 *  com.estrat.service.db.service.EmployeeService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Controller
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 */
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.EmployeeDocuments;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.EmployeeDocumentsDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.EmployeeDocumentsService;
import com.estrat.service.db.service.EmployeeService;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class EmployeeDocumentsController {
    @Autowired
    private EmployeeDocumentsService employeeDocumentsService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DBCache dbCache;

    @PostMapping(value={"/documents"})
    public ResponseEntity<EmployeeDocumentsDTO> saveEmployeeDocuments(@RequestBody EmployeeDocumentsDTO employeeDocumentsDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (employeeDocumentsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(employeeDocumentsDTO.getCreatedBy());
            employeeDocumentsDTO.getDocumentsValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (employeeDocumentsDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(employeeDocumentsDTO.getOwner());
            employeeDocumentsDTO.getDocumentsValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        this.updateGoalsDetails(employeeDocumentsDTO);
        EmployeeDocuments employeeDocuments = new EmployeeDocuments(employeeDocumentsDTO);
        employeeDocuments.setCreatedTime(LocalDateTime.now());
        EmployeeDocumentsDTO responseEmployeeGoalsDTO = this.employeeDocumentsService.save(employeeDocuments);
        return new ResponseEntity((Object)responseEmployeeGoalsDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/documents"})
    public ResponseEntity<EmployeeDocumentsDTO> updateEmployeeDocuments(@RequestBody EmployeeDocumentsDTO employeeDocumentsDTO, HttpServletRequest request) throws RequestException {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (employeeDocumentsDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(employeeDocumentsDTO.getUpdatedBy());
            employeeDocumentsDTO.getDocumentsValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (employeeDocumentsDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(employeeDocumentsDTO.getOwner());
            employeeDocumentsDTO.getDocumentsValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        this.updateGoalsDetails(employeeDocumentsDTO);
        EmployeeDocuments employeeDocuments = new EmployeeDocuments(employeeDocumentsDTO);
        employeeDocuments.setUpdatedTime(LocalDateTime.now());
        EmployeeDocumentsDTO responseEmployeeDocument = this.employeeDocumentsService.save(employeeDocuments);
        return new ResponseEntity((Object)responseEmployeeDocument, HttpStatus.OK);
    }

    @GetMapping(value={"/documents/{id}"})
    public ResponseEntity<EmployeeDocumentsDTO> getEmployeeDocumentsById(@PathVariable(value="id") Long id) throws RequestException {
        EmployeeDocumentsDTO employeeGoalsDTO = new EmployeeDocumentsDTO((EmployeeDocuments)this.employeeDocumentsService.findById(id.longValue()).get());
        return new ResponseEntity((Object)employeeGoalsDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/documents/{id}"})
    public ResponseEntity<Boolean> deleteEmployeeDocumentsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional employeeDocuments = this.employeeDocumentsService.findById(id.longValue());
        if (employeeDocuments.isPresent()) {
            EmployeeDocuments employeeDocuments1 = (EmployeeDocuments)employeeDocuments.get();
            employeeDocuments1.setActive(1);
            this.employeeDocumentsService.save(employeeDocuments1);
            return new ResponseEntity((Object)true, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/documentsList/{empId}"})
    public ResponseEntity<List<EmployeeDocumentsDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List employeeDocumentsDTOList = this.employeeDocumentsService.findAll(empId.longValue());
        for (EmployeeDocumentsDTO documentsDTO : employeeDocumentsDTOList) {
            this.updateDates(documentsDTO);
        }
        return new ResponseEntity((Object)employeeDocumentsDTOList, HttpStatus.OK);
    }

    public void updateGoalsDetails(EmployeeDocumentsDTO employeeDocumentsDTO) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (employeeDocumentsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(employeeDocumentsDTO.getCreatedBy());
        } else {
            employeeDTO.setEmployeeId(employeeDocumentsDTO.getUpdatedBy());
        }
        Employee employee = this.employeeService.getEmployee(employeeDTO);
        employeeDocumentsDTO.getDocumentsValue().put("goalsImage", employee.getProfileImage());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd,yyyy");
        DateFormatSymbols symbols = new DateFormatSymbols(Locale.getDefault());
        int hour = calendar.get(10);
        String hourValue = hour < 12 ? "AM" : "PM";
        String dayOfMonthStr = symbols.getWeekdays()[calendar.get(7)];
        String hourMin = String.join((CharSequence)":", String.valueOf(calendar.get(11)), String.valueOf(calendar.get(12)));
        employeeDocumentsDTO.getDocumentsValue().put("formattedTime", String.join((CharSequence)" ", dateFormat.format(new Date()), hourMin, hourValue, dayOfMonthStr));
    }

    public void updateDates(EmployeeDocumentsDTO employeeDocumentsDTO) {
        Map stringObjectMap = employeeDocumentsDTO.getDocumentsValue();
        LocalDateTime localDateTime = employeeDocumentsDTO.getUpdatedTime() != null ? employeeDocumentsDTO.getUpdatedTime() : employeeDocumentsDTO.getCreatedTime();
        if (localDateTime != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd, yyyy");
            String strDate = dateFormat.format(Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant()));
            stringObjectMap.put("formatDate", strDate);
        }
        employeeDocumentsDTO.setDocumentsValue(stringObjectMap);
    }
}

