/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.dto.FindDTO
 *  com.estrat.service.db.dto.UserDTO
 *  com.estrat.service.db.exception.InputValidationException
 *  com.estrat.service.db.exception.RequestException
 *  com.estrat.service.db.resource.UserRoleManagementController
 *  com.estrat.service.db.service.UserRoleManagementService
 *  javax.servlet.http.HttpServletRequest
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.service.db.resource;

import com.estrat.service.db.dto.FindDTO;
import com.estrat.service.db.dto.UserDTO;
import com.estrat.service.db.exception.InputValidationException;
import com.estrat.service.db.exception.RequestException;
import com.estrat.service.db.service.UserRoleManagementService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
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
    @Autowired
    private ThreadPoolTaskExecutor taskExecutor;

    @PostMapping(value={"/userRole"})
    public ResponseEntity<UserDTO> saveUserRole(@RequestBody UserDTO userDTO, HttpServletRequest request) throws RequestException {
        userDTO.setCreatedDate(LocalDateTime.now());
        return new ResponseEntity((Object)this.userRoleManagementService.saveUserRole(userDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/userRole"})
    public ResponseEntity<UserDTO> updateUserRole(@RequestBody UserDTO userDTO, HttpServletRequest request) throws RequestException {
        userDTO.setUpdatedDate(LocalDateTime.now());
        return new ResponseEntity((Object)this.userRoleManagementService.updateUserRole(userDTO), HttpStatus.OK);
    }

    @DeleteMapping(value={"/userRole/{id}"})
    public ResponseEntity<Boolean> removeUserRole(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.userRoleManagementService.removeUserRole(id);
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }

    @GetMapping(value={"/userRole/{id}"})
    public ResponseEntity<UserDTO> getUserRole(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.userRoleManagementService.findById(id), HttpStatus.OK);
    }

    @GetMapping(value={"/findByUser"})
    public ResponseEntity<List<UserDTO>> findByUser(@RequestBody FindDTO findDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.userRoleManagementService.getFindUserList(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/userList"})
    public ResponseEntity<List<UserDTO>> getUserList(@RequestBody FindDTO findDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.userRoleManagementService.getUserList(findDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/searchUser"})
    public ResponseEntity<List<UserDTO>> searchUser(@RequestBody FindDTO findDTO, HttpServletRequest request) throws RequestException {
        return new ResponseEntity((Object)this.userRoleManagementService.getSearchUserList(findDTO), HttpStatus.OK);
    }

    @PostMapping(value={"/createBulkUser"})
    public ResponseEntity<Boolean> createBulkUser(@RequestBody List<UserDTO> userDTOList, HttpServletRequest request) throws InputValidationException {
        CountDownLatch latch = new CountDownLatch(userDTOList.size());
        for (UserDTO userDTO : userDTOList) {
            this.taskExecutor.execute(() -> {
                try {
                    if (!userDTO.getUserRole().equalsIgnoreCase("Super User")) {
                        this.userRoleManagementService.createBulkUser(userDTO, Long.valueOf(request.getHeader("LOGGED_IN_EMPLOYEE_ID")));
                    }
                }
                finally {
                    latch.countDown();
                }
            });
        }
        try {
            latch.await();
        }
        catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return new ResponseEntity((Object)true, HttpStatus.OK);
    }
}

