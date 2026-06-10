/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.UserRoleManagementController
 *  com.estrat.web.dto.Employee
 *  com.estrat.web.dto.FindDTO
 *  com.estrat.web.dto.UserDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.EmployeeService
 *  com.estrat.web.service.UserRoleManagementService
 *  com.estrat.web.util.PasswordEncoder
 *  com.estrat.web.util.RequestSessionUtil
 *  com.estrat.web.util.UserRoleUtil
 *  com.estrat.web.util.UserThreadLocal
 *  com.google.common.base.Function
 *  com.google.common.collect.Lists
 *  com.google.common.primitives.Longs
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.core.io.ByteArrayResource
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.context.request.WebRequest
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.Employee;
import com.estrat.web.dto.FindDTO;
import com.estrat.web.dto.UserDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.EmployeeService;
import com.estrat.web.service.UserRoleManagementService;
import com.estrat.web.util.PasswordEncoder;
import com.estrat.web.util.RequestSessionUtil;
import com.estrat.web.util.UserRoleUtil;
import com.estrat.web.util.UserThreadLocal;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.primitives.Longs;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UserRoleManagementController {
    @Autowired
    protected UserRoleManagementService userRoleManagementService;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected UserRoleUtil userRoleUtil;
    @Autowired
    protected RequestSessionUtil sessionUtil;

    @PostMapping(value={"/userRole"})
    public ResponseEntity<UserDTO> saveUserRole(@RequestBody UserDTO userDTO, HttpServletRequest request) throws RequestException {
        PasswordEncoder encoder = new PasswordEncoder();
        userDTO.setPassword(encoder.encodedPassword("changeme"));
        userDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        userDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return new ResponseEntity(this.userRoleManagementService.saveUserRole(userDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/userRole"})
    public ResponseEntity<UserDTO> updateUserRole(@RequestBody UserDTO userDTO, HttpServletRequest request) throws RequestException {
        userDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        userDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        UserDTO response = this.userRoleManagementService.updateUserRole(userDTO);
        Employee employee = this.employeeService.getProfileDetails();
        UserThreadLocal.get().setProfile(employee);
        request.getSession().setAttribute("userPrincipal", UserThreadLocal.get());
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping(value={"/userRole/{id}"})
    public ResponseEntity<Boolean> removeUserRole(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.userRoleManagementService.removeUserRole(id.longValue());
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @GetMapping(value={"/userRole/{id}"})
    public ResponseEntity<UserDTO> getUserRole(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        return new ResponseEntity(this.userRoleManagementService.findById(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/findByUser"})
    public ResponseEntity<List<UserDTO>> findByUser(@RequestParam(value="status", required=false) String status, @RequestParam(value="role", required=false) String role, @RequestParam(value="deptId", required=false) String deptId, HttpServletRequest request) throws RequestException {
        FindDTO findDTO = new FindDTO();
        findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        if (status != null) {
            findDTO.setStatus(status);
        }
        if (StringUtils.isNotEmpty((CharSequence)deptId)) {
            findDTO.setDeptIds(Lists.transform(Arrays.asList(deptId.split("\\,")), (Function)Longs.stringConverter()));
        }
        if (StringUtils.isNotEmpty((CharSequence)role)) {
            findDTO.setRoles(Arrays.asList(role.split("\\,")));
        }
        return new ResponseEntity(this.userRoleManagementService.findByUser(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/userList"})
    public ResponseEntity<List<UserDTO>> getUserList(HttpServletRequest request) throws RequestException {
        FindDTO findDTO = new FindDTO();
        findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return new ResponseEntity(this.userRoleManagementService.getUserList(findDTO), HttpStatus.OK);
    }

    @RequestMapping(value={"/createBulkUser"}, method={RequestMethod.POST})
    public ResponseEntity<Map> createBulkUser(WebRequest webRequest, @RequestParam(value="userdata", required=true) MultipartFile userdata, @RequestParam(value="type", required=false) String type) {
        String Message = "No Records Processed";
        Map mapValue = new HashMap();
        try {
            mapValue = this.userRoleUtil.readuserDetails(userdata.getInputStream(), type);
        }
        catch (Exception e) {
            mapValue.put("message", Message);
            return new ResponseEntity(mapValue, HttpStatus.OK);
        }
        return new ResponseEntity(mapValue, HttpStatus.OK);
    }

    @GetMapping(value={"/downloadUserRole"})
    public ResponseEntity<ByteArrayResource> downloadUserRole(HttpServletRequest request) throws Exception {
        FindDTO findDTO = new FindDTO();
        findDTO.setOrgId(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId());
        return this.userRoleUtil.writeDocForUserRole(this.userRoleManagementService.getUserList(findDTO));
    }
}

