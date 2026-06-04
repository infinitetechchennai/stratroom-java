/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.user.dto.FindDTO
 *  com.estrat.service.user.dto.UserDTO
 *  com.estrat.service.user.exception.RequestException
 *  com.estrat.service.user.resource.UserRoleManagementController
 *  com.estrat.service.user.service.UserRoleManagementService
 *  javax.servlet.http.HttpServletRequest
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
package com.estrat.service.user.resource;

import com.estrat.service.user.dto.FindDTO;
import com.estrat.service.user.dto.UserDTO;
import com.estrat.service.user.exception.RequestException;
import com.estrat.service.user.service.UserRoleManagementService;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
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
public class UserRoleManagementController {
    @Autowired
    protected UserRoleManagementService userRoleManagementService;

    @PostMapping(value={"/userRole"})
    public ResponseEntity<UserDTO> saveUserRole(@RequestBody UserDTO userDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.userRoleManagementService.saveUserRole(userDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/userRole"})
    public ResponseEntity<UserDTO> updateUserRole(@RequestBody UserDTO userDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.userRoleManagementService.updateUserRole(userDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/userRole/{id}"})
    public ResponseEntity<Boolean> removeUserRole(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.userRoleManagementService.removeUserRole(id.longValue());
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/userRole/{id}"})
    public ResponseEntity<UserDTO> getUserRole(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.userRoleManagementService.findById(id.longValue()), HttpStatus.OK);
    }

    @GetMapping(value={"/findByUser"})
    public ResponseEntity<List<UserDTO>> findByUser(@RequestBody FindDTO findDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.userRoleManagementService.findByUser(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/userList"})
    public ResponseEntity<List<UserDTO>> getUserList(@RequestBody FindDTO findDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.userRoleManagementService.getUserList(findDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/createBulkUser"})
    public ResponseEntity<Boolean> removeUserRole(@RequestBody List<UserDTO> userDTOS, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.userRoleManagementService.createBulkUser(userDTOS), HttpStatus.OK);
    }
}

