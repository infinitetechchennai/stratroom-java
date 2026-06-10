/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.Employee
 *  com.estrat.service.db.bean.po.EmployeeGoals
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dto.EmployeeDTO
 *  com.estrat.service.db.dto.EmployeeGoalsDTO
 *  com.estrat.service.db.dto.EmployeeGoalsResponseDTO
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.EmployeeGoalsController
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.EmployeeGoalsService
 *  com.estrat.service.db.service.EmployeeService
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
package com.estrat.service.db.resource;

import com.estrat.service.db.bean.Employee;
import com.estrat.service.db.bean.po.EmployeeGoals;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dto.EmployeeDTO;
import com.estrat.service.db.dto.EmployeeGoalsDTO;
import com.estrat.service.db.dto.EmployeeGoalsResponseDTO;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.EmployeeGoalsService;
import com.estrat.service.db.service.EmployeeService;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
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
public class EmployeeGoalsController {
    @Autowired
    protected EmployeeGoalsService employeeGoalsService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DBCache dbCache;

    @PostMapping(value={"/goals"})
    public ResponseEntity<EmployeeGoalsResponseDTO> saveEmployeeGoals(@RequestBody EmployeeGoalsDTO employeeGoalsDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(employeeGoalsDTO.getGoalsValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (employeeGoalsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(employeeGoalsDTO.getCreatedBy());
            employeeGoalsDTO.getGoalsValue().put("createdByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (employeeGoalsDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(employeeGoalsDTO.getOwner());
            employeeGoalsDTO.getGoalsValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        this.updateGoalsDetails(employeeGoalsDTO);
        EmployeeGoals employeeGoals = new EmployeeGoals(employeeGoalsDTO);
        employeeGoals.setCreatedTime(LocalDateTime.now());
        EmployeeGoalsResponseDTO responseEmployeeGoalsDTO = this.employeeGoalsService.save(employeeGoals);
        return new ResponseEntity((Object)responseEmployeeGoalsDTO, HttpStatus.OK);
    }

    @PutMapping(value={"/goals"})
    public ResponseEntity<EmployeeGoalsResponseDTO> updateEmployeeGoalsDetails(@RequestBody EmployeeGoalsDTO employeeGoalsDTO, HttpServletRequest request) throws RequestException {
        this.applyDefaultValues(employeeGoalsDTO.getGoalsValue());
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (employeeGoalsDTO.getUpdatedBy() != 0L) {
            employeeDTO.setEmployeeId(employeeGoalsDTO.getUpdatedBy());
            employeeGoalsDTO.getGoalsValue().put("updatedByName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        if (employeeGoalsDTO.getOwner() != 0L) {
            employeeDTO.setEmployeeId(employeeGoalsDTO.getOwner());
            employeeGoalsDTO.getGoalsValue().put("ownerName", this.employeeService.getEmployee(employeeDTO).getFirstName());
        }
        this.updateGoalsDetails(employeeGoalsDTO);
        EmployeeGoals employeeGoals = new EmployeeGoals(employeeGoalsDTO);
        employeeGoals.setUpdatedTime(LocalDateTime.now());
        EmployeeGoalsResponseDTO responseEmployeeGoalsDTO = this.employeeGoalsService.save(employeeGoals);
        return new ResponseEntity((Object)responseEmployeeGoalsDTO, HttpStatus.OK);
    }

    @GetMapping(value={"/goals/{id}"})
    public ResponseEntity<EmployeeGoalsDTO> getEmployeeGoalsById(@PathVariable(value="id") Long id) throws RequestException {
        EmployeeGoalsDTO employeeGoalsDTO = new EmployeeGoalsDTO((EmployeeGoals)this.employeeGoalsService.findById(id.longValue()).get());
        return new ResponseEntity((Object)employeeGoalsDTO, HttpStatus.OK);
    }

    @DeleteMapping(value={"/goals/{id}"})
    public ResponseEntity<EmployeeGoalsResponseDTO> deleteEmployeeGoalsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        Optional employeeGoals = this.employeeGoalsService.findById(id.longValue());
        if (employeeGoals.isPresent()) {
            EmployeeGoals employeeGoals1 = (EmployeeGoals)employeeGoals.get();
            employeeGoals1.setActive(1);
            this.employeeGoalsService.save(employeeGoals1);
            EmployeeGoalsResponseDTO employeeGoalsResponseDTO = new EmployeeGoalsResponseDTO();
            employeeGoalsResponseDTO.setFlag(true);
            this.dbCache.remove((Object)("retrieveEmployeeGoalsByEmpId" + UserThreadLocal.get()), "dbCache");
            return new ResponseEntity((Object)employeeGoalsResponseDTO, HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value={"/goalsList/{empId}"})
    public ResponseEntity<List<EmployeeGoalsDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId) throws RequestException {
        List employeeGoalsDTOList = this.employeeGoalsService.findAll(empId.longValue());
        return new ResponseEntity((Object)employeeGoalsDTOList, HttpStatus.OK);
    }

    private void applyDefaultValues(Map<String, Object> employeeGoalsValue) {
        if (Objects.isNull(employeeGoalsValue.get("progressval")) || StringUtils.isEmpty((CharSequence)employeeGoalsValue.get("progressval").toString())) {
            employeeGoalsValue.put("progressval", "0");
        }
    }

    public void updateGoalsDetails(EmployeeGoalsDTO employeeGoalsDTO) {
        EmployeeDTO employeeDTO = new EmployeeDTO();
        if (employeeGoalsDTO.getCreatedBy() != 0L) {
            employeeDTO.setEmployeeId(employeeGoalsDTO.getCreatedBy());
        } else {
            employeeDTO.setEmployeeId(employeeGoalsDTO.getUpdatedBy());
        }
        Employee employee = this.employeeService.getEmployee(employeeDTO);
        employeeGoalsDTO.getGoalsValue().put("goalsImage", employee.getProfileImage());
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd,yyyy");
        DateFormatSymbols symbols = new DateFormatSymbols(Locale.getDefault());
        int hour = calendar.get(10);
        String hourValue = hour < 12 ? "AM" : "PM";
        String dayOfMonthStr = symbols.getWeekdays()[calendar.get(7)];
        String hourMin = String.join((CharSequence)":", String.valueOf(calendar.get(11)), String.valueOf(calendar.get(12)));
        employeeGoalsDTO.getGoalsValue().put("formattedTime", String.join((CharSequence)" ", dateFormat.format(new Date()), hourMin, hourValue, dayOfMonthStr));
    }
}

