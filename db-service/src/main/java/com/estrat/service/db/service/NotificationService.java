/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.EmployeeProfilePo
 *  com.estrat.service.db.bean.po.NotificationDetails
 *  com.estrat.service.db.bean.po.NotificationEntity
 *  com.estrat.service.db.dao.NotificationQueueRepository
 *  com.estrat.service.db.dao.NotificationRepository
 *  com.estrat.service.db.dto.KpiStatusNotification
 *  com.estrat.service.db.dto.NotificationDTO
 *  com.estrat.service.db.resource.util.DateUtil
 *  com.estrat.service.db.service.EmailService
 *  com.estrat.service.db.service.EmployeeService
 *  com.estrat.service.db.service.NotificationService
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.scheduling.annotation.Async
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.EmployeeProfilePo;
import com.estrat.service.db.bean.po.NotificationDetails;
import com.estrat.service.db.bean.po.NotificationEntity;
import com.estrat.service.db.dao.NotificationQueueRepository;
import com.estrat.service.db.dao.NotificationRepository;
import com.estrat.service.db.dto.KpiStatusNotification;
import com.estrat.service.db.dto.NotificationDTO;
import com.estrat.service.db.resource.util.DateUtil;
import com.estrat.service.db.service.EmailService;
import com.estrat.service.db.service.EmployeeService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private Logger log = Logger.getLogger(NotificationService.class);
    @Autowired
    protected NotificationRepository notificationRepository;
    @Autowired
    protected NotificationQueueRepository notificationQueueRepository;
    @Value(value="${enable.email.notification}")
    private String emailNotification;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private EmailService emailService;

    public Optional<NotificationDetails> findById(long id) {
        return this.notificationRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public List<NotificationDTO> getNotificationByType(String notificationType, String targetValue, Long owner) {
        List notificationDetails = null;
        notificationDetails = StringUtils.isNotEmpty((CharSequence)notificationType) && StringUtils.isNotEmpty((CharSequence)targetValue) ? this.notificationRepository.findAllByEntityAndOwner(owner, notificationType, Long.parseLong(targetValue)) : (StringUtils.isNotEmpty((CharSequence)notificationType) ? this.notificationRepository.findAllByTypeAndOwner(owner, notificationType) : Collections.emptyList());
        List<NotificationDTO> notificationDTOList = notificationDetails.stream().map(dbValue -> {
            NotificationDTO notificationDTO = new NotificationDTO(dbValue);
            return notificationDTO;
        }).collect(Collectors.toList());
        return notificationDTOList;
    }

    public void sendKPINotification(KpiStatusNotification notificationDTO) {
        this.log.error((Object)("Notification Kpi Status ::: " + this.emailNotification + " Department id :: " + notificationDTO.getDepartmentId()));
        if ("Y".equals(this.emailNotification) && notificationDTO.getDepartmentId() != null) {
            EmployeeProfilePo empprofile = this.employeeService.getEmployeeProfile(notificationDTO.getOwner());
            notificationDTO.setDepartmentName(empprofile.getDeptId().getName());
            this.storeNotificationInDB(notificationDTO, empprofile);
        }
    }

    private void storeNotificationInDB(KpiStatusNotification notificationDTO, EmployeeProfilePo empprofile) {
        NotificationEntity notificationEntity = new NotificationEntity();
        notificationEntity.setKpiId(notificationDTO.getKpiId());
        notificationEntity.setNotificationType(notificationDTO.getNotificationType());
        notificationEntity.setDateOfNotification(LocalDate.now());
        notificationEntity.setTargetValue(notificationDTO.getTargetValue());
        notificationEntity.setActualValue(notificationDTO.getActualValue());
        notificationEntity.setDepartmentId(notificationDTO.getDepartmentId());
        notificationEntity.setMonthYear(notificationDTO.getMonthYear());
        notificationEntity.setKpiName(notificationDTO.getKpiName());
        notificationEntity.setDepartmentName(empprofile.getDeptId().getName());
        notificationEntity.setOwner(notificationDTO.getOwner());
        notificationEntity.setFrequency(notificationDTO.getFrequency());
        notificationEntity.setSent(false);
        notificationEntity.setEmployeeEmail(empprofile.getEmailAddress());
        notificationEntity.setEmployeeFullName(this.getFullName(empprofile));
        this.notificationQueueRepository.save(notificationEntity);
    }

    private String getFullName(EmployeeProfilePo empprofile) {
        return Optional.ofNullable(empprofile.getFirstName()).orElse("") + " " + Optional.ofNullable(empprofile.getLastName()).orElse("");
    }

    public NotificationDTO save(NotificationDTO notificationDTO) {
        List notificationDetails = this.notificationRepository.findAllByEntityAndOwner(Long.valueOf(notificationDTO.getOwner()), notificationDTO.getNotificationType(), notificationDTO.getTargetValue());
        if (CollectionUtils.isEmpty((Collection)notificationDetails)) {
            if (this.emailNotification.equals("Y")) {
                EmployeeProfilePo empprofile = this.employeeService.getEmployeeProfile(Long.valueOf(notificationDTO.getOwner()));
                String message = "Dear " + (Objects.nonNull(empprofile.getFirstName()) ? empprofile.getFirstName() : "") + " " + (Objects.nonNull(empprofile.getLastName()) ? empprofile.getLastName() : "") + ",\n\n" + String.valueOf(notificationDTO.getNotificationValue().get("message"));
                this.emailService.sendMail(empprofile.getEmailAddress(), "Stratroom Notification", message);
            }
            return new NotificationDTO((NotificationDetails)this.notificationRepository.save(new NotificationDetails(notificationDTO)));
        }
        if (notificationDTO.getId() != 0L && "STATUS_LIGHT".equalsIgnoreCase(notificationDTO.getNotificationType())) {
            if (this.emailNotification.equals("Y")) {
                EmployeeProfilePo empprofile = this.employeeService.getEmployeeProfile(Long.valueOf(notificationDTO.getOwner()));
                String message = "Dear " + (Objects.nonNull(empprofile.getFirstName()) ? empprofile.getFirstName() : "") + " " + (Objects.nonNull(empprofile.getLastName()) ? empprofile.getLastName() : "") + ",\n\n" + String.valueOf(notificationDTO.getNotificationValue().get("message"));
                this.emailService.sendMail(empprofile.getEmailAddress(), "Stratroom Notification - Status Light Change", message);
            }
            return new NotificationDTO((NotificationDetails)this.notificationRepository.save(new NotificationDetails(notificationDTO)));
        }
        if ("Meeting".equalsIgnoreCase(notificationDTO.getNotificationType())) {
            NotificationDetails existingNotification = (NotificationDetails)notificationDetails.stream().findFirst().get();
            notificationDTO.setId(existingNotification.getId());
            if (this.emailNotification.equals("Y")) {
                EmployeeProfilePo empprofile = this.employeeService.getEmployeeProfile(Long.valueOf(notificationDTO.getOwner()));
                ZoneId serverTimeZone = ZoneId.systemDefault();
                ZonedDateTime zonedDateTime = existingNotification.getMeetingTime().atZone(serverTimeZone);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm:ss");
                String formattedTime = zonedDateTime.format(formatter);
                String message = "Dear " + (Objects.nonNull(empprofile.getFirstName()) ? empprofile.getFirstName() : "") + " " + (Objects.nonNull(empprofile.getLastName()) ? empprofile.getLastName() : "") + ",\n\n" + String.valueOf(notificationDTO.getNotificationValue().get("message") + "   " + formattedTime);
                this.emailService.sendMail(empprofile.getEmailAddress(), "Stratroom Notification - Meeting Change", message);
            }
            return new NotificationDTO((NotificationDetails)this.notificationRepository.save(new NotificationDetails(notificationDTO)));
        }
        if ("MeetingRecommendation".equalsIgnoreCase(notificationDTO.getNotificationType())) {
            NotificationDetails existingNotification = (NotificationDetails)notificationDetails.stream().findFirst().get();
            notificationDTO.setId(existingNotification.getId());
            if (this.emailNotification.equals("Y")) {
                EmployeeProfilePo empprofile = this.employeeService.getEmployeeProfile(Long.valueOf(notificationDTO.getOwner()));
                String message = "Dear " + (Objects.nonNull(empprofile.getFirstName()) ? empprofile.getFirstName() : "") + " " + (Objects.nonNull(empprofile.getLastName()) ? empprofile.getLastName() : "") + ",\n\n" + String.valueOf(notificationDTO.getNotificationValue().get("message"));
                this.emailService.sendMail(empprofile.getEmailAddress(), "Stratroom Notification - Meeting Recommendation Change", message);
            }
            return new NotificationDTO((NotificationDetails)this.notificationRepository.save(new NotificationDetails(notificationDTO)));
        }
        if ("MeetingAction".equalsIgnoreCase(notificationDTO.getNotificationType())) {
            NotificationDetails existingNotification = (NotificationDetails)notificationDetails.stream().findFirst().get();
            notificationDTO.setId(existingNotification.getId());
            if (this.emailNotification.equals("Y")) {
                EmployeeProfilePo empprofile = this.employeeService.getEmployeeProfile(Long.valueOf(notificationDTO.getOwner()));
                String message = "Dear " + (Objects.nonNull(empprofile.getFirstName()) ? empprofile.getFirstName() : "") + " " + (Objects.nonNull(empprofile.getLastName()) ? empprofile.getLastName() : "") + ",\n\n" + String.valueOf(notificationDTO.getNotificationValue().get("message"));
                this.emailService.sendMail(empprofile.getEmailAddress(), "Stratroom Notification -  Meeting Action Change", message);
            }
            return new NotificationDTO((NotificationDetails)this.notificationRepository.save(new NotificationDetails(notificationDTO)));
        }
        if (this.emailNotification.equals("Y")) {
            EmployeeProfilePo empprofile = this.employeeService.getEmployeeProfile(Long.valueOf(notificationDTO.getOwner()));
            String message = "Dear " + (Objects.nonNull(empprofile.getFirstName()) ? empprofile.getFirstName() : "") + " " + (Objects.nonNull(empprofile.getLastName()) ? empprofile.getLastName() : "") + ",\n\n" + String.valueOf(notificationDTO.getNotificationValue().get("message"));
            this.emailService.sendMail(empprofile.getEmailAddress(), "Stratroom Notification - Change", message);
        }
        return new NotificationDTO((NotificationDetails)this.notificationRepository.save(new NotificationDetails(notificationDTO)));
    }

    public NotificationDTO saveAction(NotificationDTO notificationDTO) {
        return new NotificationDTO((NotificationDetails)this.notificationRepository.save(new NotificationDetails(notificationDTO)));
    }

    public List<NotificationDTO> findAll(long empId) {
        List dbList = this.notificationRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<NotificationDTO> notificationDTOList = dbList.stream().map(dbValue -> {
            NotificationDTO notificationDTO = new NotificationDTO(dbValue);
            return notificationDTO;
        }).collect(Collectors.toList());
        return notificationDTOList;
    }

    public void delete(NotificationDetails notificationDetails) {
        this.notificationRepository.delete((Object)notificationDetails);
    }

    @Async
    public void updateNotificationStatus(List<NotificationDTO> notificationList) {
        notificationList.forEach(notification -> {
            if ("unread".equalsIgnoreCase(notification.getStatus())) {
                notification.setStatus("read");
                this.notificationRepository.save(new NotificationDetails(notification));
            }
        });
    }

    public List<NotificationDTO> findByMeetingTime(long empId) {
        LocalDateTime endTime = DateUtil.getCurrentTimeUTC().plus(30L, ChronoUnit.MINUTES);
        List dbList = this.notificationRepository.findAllByMeetingTime(DateUtil.getCurrentTimeUTC(), endTime, Long.valueOf(empId));
        List<NotificationDTO> notificationDTOList = dbList.stream().map(dbValue -> {
            NotificationDTO notificationDTO = new NotificationDTO(dbValue);
            return notificationDTO;
        }).collect(Collectors.toList());
        return notificationDTOList;
    }
}

