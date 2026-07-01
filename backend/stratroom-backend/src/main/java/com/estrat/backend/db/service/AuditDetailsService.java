/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.Employee
 *  com.estrat.backend.db.bean.po.AuditDetails
 *  com.estrat.backend.db.bean.po.EmployeeProfilePo
 *  com.estrat.backend.db.bean.po.IpAddress
 *  com.estrat.backend.db.dao.AuditDetailsRepository
 *  com.estrat.backend.db.dao.IpAddressRepo
 *  com.estrat.backend.db.dto.AuditDTO
 *  com.estrat.backend.db.dto.FindDTO
 *  com.estrat.backend.db.repository.EmployeeProfilePoRepo
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.AuditDetailsService
 *  com.estrat.backend.db.service.EmployeeService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.Employee;
import com.estrat.backend.db.bean.po.AuditDetails;
import com.estrat.backend.db.bean.po.EmployeeProfilePo;
import com.estrat.backend.db.bean.po.IpAddress;
import com.estrat.backend.db.dao.AuditDetailsRepository;
import com.estrat.backend.db.dao.IpAddressRepo;
import com.estrat.backend.db.dto.AuditDTO;
import com.estrat.backend.db.dto.FindDTO;
import com.estrat.backend.db.repository.EmployeeProfilePoRepo;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import com.estrat.backend.db.service.EmployeeService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditDetailsService {
    @Autowired
    protected AuditDetailsRepository auditDetailsRepository;
    @Autowired
    protected IpAddressRepo ipAddressRepo;
    @Autowired
    protected EmployeeService employeeService;
    @Autowired
    protected EmployeeProfilePoRepo profilePoRepo;

    public IpAddress save(IpAddress ipAddress) {
        IpAddress details = (IpAddress)this.ipAddressRepo.save(ipAddress);
        return details;
    }

    public IpAddress getOne(Long createdOrUpdatedBy) {
        return (IpAddress)this.ipAddressRepo.getOne(createdOrUpdatedBy);
    }

    public AuditDTO save(AuditDetails auditDetails) {
        AuditDetails details = (AuditDetails)this.auditDetailsRepository.save(auditDetails);
        AuditDTO auditDTO = new AuditDTO(details);
        return auditDTO;
    }

    public void saveAudit(String type, long typeId, long createdOrUpdatedBy, String action) {
        AuditDetails auditDetails = new AuditDetails();
        auditDetails.setType(type);
        auditDetails.setTypeId(typeId);
        auditDetails.setUserId(createdOrUpdatedBy);
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"SUPER_USER_ID"))) {
            auditDetails.setCreatedBy(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
        } else {
            auditDetails.setCreatedBy(createdOrUpdatedBy);
        }
        auditDetails.setAction(action);
        auditDetails.setCreatedTime(this.getCurrentTimeUTC());
        auditDetails.setAccessDate(new Date(System.currentTimeMillis()));
        auditDetails.setOrgId(this.resolveOrgId(createdOrUpdatedBy));
        auditDetails.setSystemIp(this.getIpAddress());
        this.auditDetailsRepository.save(auditDetails);
    }

    public void updateAudit(String type, long typeId, long createdOrUpdatedBy, String action) {
        AuditDetails auditDetails = new AuditDetails();
        auditDetails.setType(type);
        auditDetails.setTypeId(typeId);
        auditDetails.setUserId(createdOrUpdatedBy);
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"SUPER_USER_ID"))) {
            auditDetails.setCreatedBy(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
        } else {
            auditDetails.setCreatedBy(createdOrUpdatedBy);
        }
        auditDetails.setAction(action);
        auditDetails.setAccessDate(new Date(System.currentTimeMillis()));
        auditDetails.setOrgId(this.resolveOrgId(createdOrUpdatedBy));
        auditDetails.setSystemIp(this.getIpAddress());
        auditDetails.setCreatedTime(this.getCurrentTimeUTC());
        this.auditDetailsRepository.save(auditDetails);
    }

    public void deleteAudit(String type, long typeId, long createdOrUpdatedBy, String action) {
        AuditDetails auditDetails = new AuditDetails();
        auditDetails.setType(type);
        auditDetails.setTypeId(typeId);
        auditDetails.setUserId(createdOrUpdatedBy);
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"SUPER_USER_ID"))) {
            auditDetails.setCreatedBy(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
        } else {
            auditDetails.setCreatedBy(createdOrUpdatedBy);
        }
        auditDetails.setCreatedTime(this.getCurrentTimeUTC());
        auditDetails.setAccessDate(new Date(System.currentTimeMillis()));
        auditDetails.setOrgId(this.resolveOrgId(createdOrUpdatedBy));
        auditDetails.setSystemIp(this.getIpAddress());
        auditDetails.setAction(action);
        this.auditDetailsRepository.save(auditDetails);
    }

    private long resolveOrgId(long empId) {
        String orgHeader = UserThreadLocal.get("USER_ORG_ID");
        if (StringUtils.isNumeric(orgHeader)) {
            return Long.parseLong(orgHeader);
        }
        try {
            Employee emp = this.employeeService.getProfileDetails(empId);
            if (emp != null && emp.getOrgDetails() != null) {
                return emp.getOrgDetails().getOrgId();
            }
        } catch (Exception ignored) {
            // fall through
        }
        EmployeeProfilePo profile = this.profilePoRepo.getOne(empId, "Active");
        if (profile != null && profile.getOrgId() != null) {
            return profile.getOrgId().getId();
        }
        return 1L;
    }

    public List<AuditDTO> findAuditDetails(FindDTO findDTO) {
        List<AuditDTO> auditDTOList = null;
        List<AuditDetails> dbList = null;
        Date firstDate = null;
        Date secondDate = null;
        if (findDTO.getDateRange() != null && !findDTO.getDateRange().isEmpty()) {
            String startDate = findDTO.getDateRange();
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                firstDate = dateFormat.parse(startDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        // No date filter → return the full audit history (most recent first) rather than only the
        // last day. Leaving dateRange null routes to the un-dated repository queries below, so the
        // audit trail page shows the complete log by default and the action/performedBy filters
        // still apply across all dates.
        if (findDTO.getDateRange() != null && findDTO.getDateRange().equalsIgnoreCase("presented") && findDTO.getAction() != null && findDTO.getPerformedBy() != null) {
            dbList = this.auditDetailsRepository.findAllByDateRangeAndUserIdWithAction(findDTO.getOrgId(), findDTO.getPerformedBy(), findDTO.getAction(), firstDate, secondDate);
        } else if (findDTO.getDateRange() != null && findDTO.getDateRange().equalsIgnoreCase("presented") && findDTO.getAction() == null && findDTO.getPerformedBy() == null) {
            dbList = this.auditDetailsRepository.findAllByDateRange(findDTO.getOrgId(), firstDate, secondDate);
        } else if (findDTO.getDateRange() != null && findDTO.getDateRange().equalsIgnoreCase("presented") && findDTO.getAction() == null && findDTO.getPerformedBy() != null) {
            dbList = this.auditDetailsRepository.findAllByDateRangeAndUserId(findDTO.getOrgId(), findDTO.getPerformedBy(), firstDate, secondDate);
        } else if (findDTO.getDateRange() != null && findDTO.getDateRange().equalsIgnoreCase("presented") && findDTO.getAction() != null && findDTO.getPerformedBy() == null) {
            dbList = this.auditDetailsRepository.findAllByDateRangeAndAction(findDTO.getOrgId(), findDTO.getAction(), firstDate, secondDate);
        } else if (findDTO.getDateRange() != null && findDTO.getAction() != null && findDTO.getPerformedBy() != null) {
            dbList = this.auditDetailsRepository.findAllByDateRangeAndUserIdWithAction(findDTO.getOrgId(), findDTO.getPerformedBy(), findDTO.getAction(), firstDate);
        } else if (findDTO.getDateRange() != null && findDTO.getAction() != null && findDTO.getPerformedBy() == null) {
            dbList = this.auditDetailsRepository.findAllByDateRangeAndAction(findDTO.getOrgId(), findDTO.getAction(), firstDate);
        } else if (findDTO.getDateRange() != null && findDTO.getAction() == null && findDTO.getPerformedBy() != null) {
            dbList = this.auditDetailsRepository.findAllByDateRangeAndUserId(findDTO.getOrgId(), findDTO.getPerformedBy(), firstDate);
        } else if (findDTO.getDateRange() != null && findDTO.getAction() == null && findDTO.getPerformedBy() == null) {
            dbList = this.auditDetailsRepository.findAllByDateRange(findDTO.getOrgId(), firstDate);
        } else if (findDTO.getDateRange() == null && findDTO.getAction() != null && findDTO.getPerformedBy() != null) {
            dbList = this.auditDetailsRepository.findAllByDateRangeANDAction(findDTO.getOrgId(), findDTO.getPerformedBy(), findDTO.getAction());
        } else if (findDTO.getDateRange() == null && findDTO.getAction() != null && findDTO.getPerformedBy() == null) {
            dbList = this.auditDetailsRepository.findAllByAction(findDTO.getOrgId(), findDTO.getAction());
        } else if (findDTO.getDateRange() == null && findDTO.getAction() == null && findDTO.getPerformedBy() != null) {
            dbList = this.auditDetailsRepository.findAllByPerformedBy(findDTO.getOrgId(), findDTO.getPerformedBy());
        } else if (findDTO.getDateRange() == null && findDTO.getAction() == null && findDTO.getPerformedBy() == null) {
            dbList = this.auditDetailsRepository.findAllByOrderBy(findDTO.getOrgId());
        }
        auditDTOList = dbList.stream().map(audit -> {
            AuditDTO auditDTO = new AuditDTO(audit);
            this.populate(auditDTO);
            return auditDTO;
        }).collect(Collectors.toList());
        return auditDTOList;
    }

    public void populate(AuditDTO auditDTO) {
        Optional profilePo = this.profilePoRepo.findById(auditDTO.getUserId());
        if (profilePo.isPresent()) {
            auditDTO.setEmailAddress(((EmployeeProfilePo)profilePo.get()).getEmailAddress());
            if (auditDTO.getCreatedBy() != null && auditDTO.getCreatedBy() != 0L) {
                Optional check = this.profilePoRepo.findById(auditDTO.getCreatedBy());
                if (check.isPresent()) {
                    auditDTO.setUserName(((EmployeeProfilePo)check.get()).getFirstName());
                } else {
                    auditDTO.setUserName(((EmployeeProfilePo)profilePo.get()).getFirstName());
                }
            } else {
                auditDTO.setUserName(((EmployeeProfilePo)profilePo.get()).getFirstName());
            }
        }
        
        if ("User".equalsIgnoreCase(auditDTO.getType()) && auditDTO.getTypeId() > 0) {
            Optional targetOpt = this.profilePoRepo.findById(auditDTO.getTypeId());
            if (targetOpt.isPresent()) {
                auditDTO.setType("User - " + ((EmployeeProfilePo)targetOpt.get()).getFirstName());
            }
        }
    }

    public List<String> getAuditTrailActionList() {
        return this.auditDetailsRepository.getActionList();
    }

    public AuditDTO clearLogOutUser() {
        AuditDetails details = new AuditDetails();
        details.setType("USER");
        details.setAction("User Logout");
        details.setCreatedTime(this.getCurrentTimeUTC());
        details.setAccessDate(new Date(System.currentTimeMillis()));
        if (StringUtils.isNotEmpty((CharSequence)UserThreadLocal.get((String)"SUPER_USER_ID"))) {
            details.setCreatedBy(Long.valueOf(UserThreadLocal.get((String)"SUPER_USER_ID")).longValue());
        } else {
            details.setCreatedBy(Long.valueOf(UserThreadLocal.get((String)"LOGGED_IN_EMPLOYEE_ID")).longValue());
        }
        details.setOrgId(Long.valueOf(UserThreadLocal.get((String)"USER_ORG_ID")).longValue());
        details.setSystemIp(this.getIpAddress());
        AuditDetails auditDetails = (AuditDetails)this.auditDetailsRepository.save(details);
        AuditDTO auditDTO = new AuditDTO(auditDetails);
        return auditDTO;
    }

    public Date getDate() {
        Date myDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(myDate);
        calendar.add(6, -1);
        return calendar.getTime();
    }

    public AuditDTO save(AuditDTO auditDetails) {
        EmployeeProfilePo profilePo = this.employeeService.getEmployeeProfileByEmail1(auditDetails.getEmailAddress());
        AuditDetails details = new AuditDetails();
        if (profilePo != null) {
            details.setOrgId(profilePo.getOrgId().getId());
            details.setUserId(profilePo.getEmpId());
            details.setCreatedBy(profilePo.getEmpId());
        }
        if (auditDetails.getSystemIp() != null) {
            details.setSystemIp(auditDetails.getSystemIp());
        } else {
            auditDetails.setSystemIp(this.getIpAddress());
        }
        details.setType("USER");
        details.setAction(auditDetails.getAction());
        details.setCreatedTime(this.getCurrentTimeUTC());
        details.setAccessDate(new Date(System.currentTimeMillis()));
        AuditDTO auditDTO = new AuditDTO((AuditDetails)this.auditDetailsRepository.save(details));
        return auditDTO;
    }

    public LocalDateTime getCurrentTimeUTC() {
        LocalDateTime currentTime = LocalDateTime.now();
        ZonedDateTime timeDefault = currentTime.atZone(ZoneId.systemDefault());
        ZonedDateTime timeUTC = timeDefault.withZoneSameInstant(ZoneOffset.UTC);
        return timeUTC.toLocalDateTime();
    }

    public void saveSuperAudit(String type, Long superUserId, long typeId, long createdOrUpdatedBy, String action) {
        AuditDetails auditDetails = new AuditDetails();
        auditDetails.setType(type);
        auditDetails.setTypeId(typeId);
        auditDetails.setUserId(createdOrUpdatedBy);
        if (superUserId != null) {
            auditDetails.setCreatedBy(superUserId.longValue());
        }
        auditDetails.setAction(action);
        auditDetails.setCreatedTime(this.getCurrentTimeUTC());
        auditDetails.setAccessDate(new Date(System.currentTimeMillis()));
        String _orgIdStr287 = UserThreadLocal.get("USER_ORG_ID");
        long _orgId287 = (_orgIdStr287 != null && !"null".equals(_orgIdStr287)) ? Long.parseLong(_orgIdStr287) : this.resolveOrgId(createdOrUpdatedBy, typeId);
        auditDetails.setOrgId(_orgId287);
        auditDetails.setSystemIp(this.getIpAddress());
        this.auditDetailsRepository.save(auditDetails);
    }

    public void updateSuperAudit(String type, Long createdBy, long typeId, long createdOrUpdatedBy, String action) {
        AuditDetails auditDetails = new AuditDetails();
        auditDetails.setType(type);
        auditDetails.setTypeId(typeId);
        if (createdBy != null) {
            auditDetails.setCreatedBy(createdBy.longValue());
        }
        auditDetails.setUserId(createdOrUpdatedBy);
        auditDetails.setAction(action);
        auditDetails.setAccessDate(new Date(System.currentTimeMillis()));
        String _orgIdStr302 = UserThreadLocal.get("USER_ORG_ID");
        long _orgId302 = (_orgIdStr302 != null && !"null".equals(_orgIdStr302)) ? Long.parseLong(_orgIdStr302) : this.resolveOrgId(createdOrUpdatedBy, typeId);
        auditDetails.setOrgId(_orgId302);
        auditDetails.setSystemIp(this.getIpAddress());
        auditDetails.setCreatedTime(this.getCurrentTimeUTC());
        this.auditDetailsRepository.save(auditDetails);
    }

    /** Resolves orgId from DB when UserThreadLocal USER_ORG_ID is unavailable (WebFlux reactive context). */
    private long resolveOrgId(long actorId, long typeId) {
        // Try actor first, then typeId (which is often empId)
        for (long candidateId : new long[]{actorId, typeId}) {
            if (candidateId <= 0) continue;
            try {
                EmployeeProfilePo po = this.profilePoRepo.findById(candidateId).orElse(null);
                if (po != null && po.getOrgId() != null) {
                    return po.getOrgId().getId();
                }
            } catch (Exception ignored) {}
        }
        return 0L;
    }

    public String getIpAddress() {
        String userIdStr = UserThreadLocal.get();
        if (StringUtils.isNotBlank(userIdStr) && StringUtils.isNumeric(userIdStr)) {
            Optional address = this.ipAddressRepo.findById(Long.valueOf(userIdStr));
            if (address.isPresent()) {
                String superUserIdStr = UserThreadLocal.get("SUPER_USER_ID");
                if (StringUtils.isNotBlank(superUserIdStr) && StringUtils.isNumeric(superUserIdStr)) {
                    Optional check = this.ipAddressRepo.findById(Long.valueOf(superUserIdStr));
                    if (!check.isPresent()) {
                        return ((IpAddress)address.get()).getIpAddress();
                    }
                    if (((IpAddress)address.get()).getIpAddress().equalsIgnoreCase(((IpAddress)check.get()).getIpAddress())) {
                        return ((IpAddress)check.get()).getIpAddress();
                    }
                    IpAddress ipAddress = (IpAddress)address.get();
                    ipAddress.setIpAddress(((IpAddress)check.get()).getIpAddress());
                    this.ipAddressRepo.save(ipAddress);
                    return ((IpAddress)check.get()).getIpAddress();
                }
                return ((IpAddress)address.get()).getIpAddress();
            }
            String superUserIdStr = UserThreadLocal.get("SUPER_USER_ID");
            if (StringUtils.isNotBlank(superUserIdStr) && StringUtils.isNumeric(superUserIdStr)) {
                Optional check = this.ipAddressRepo.findById(Long.valueOf(superUserIdStr));
                if (!check.isPresent()) {
                    return null;
                }
                IpAddress ipAddress = new IpAddress();
                ipAddress.setIpAddress(((IpAddress)check.get()).getIpAddress());
                ipAddress.setEmpId(Long.valueOf(userIdStr).longValue());
                ipAddress.setOrgId(((IpAddress)check.get()).getOrgId());
                IpAddress result = (IpAddress)this.ipAddressRepo.save(ipAddress);
                return result.getIpAddress();
            }
            return null;
        }
        return null;
    }
}

