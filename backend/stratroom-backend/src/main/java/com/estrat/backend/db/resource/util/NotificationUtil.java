/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.dto.ControlPanelGeneralDTO
 *  com.estrat.backend.db.dto.KPIDTO
 *  com.estrat.backend.db.dto.LicenseResponseDTO
 *  com.estrat.backend.db.dto.MeetingManagementResponseDTO
 *  com.estrat.backend.db.dto.NotificationDTO
 *  com.estrat.backend.db.dto.ObjectivesDTO
 *  com.estrat.backend.db.dto.PestelAnalysisDTO
 *  com.estrat.backend.db.dto.SWOTAnalysisDTO
 *  com.estrat.backend.db.dto.ScoreCardDTO
 *  com.estrat.backend.db.resource.util.NotificationUtil
 *  com.estrat.backend.db.service.ControlPanelGeneralService
 *  com.estrat.backend.db.service.LicenseService
 *  com.estrat.backend.db.service.NotificationService
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.scheduling.annotation.Async
 *  org.springframework.stereotype.Component
 */
package com.estrat.backend.db.resource.util;

import com.estrat.backend.db.dto.ControlPanelGeneralDTO;
import com.estrat.backend.db.dto.KPIDTO;
import com.estrat.backend.db.dto.LicenseResponseDTO;
import com.estrat.backend.db.dto.MeetingManagementResponseDTO;
import com.estrat.backend.db.dto.NotificationDTO;
import com.estrat.backend.db.dto.ObjectivesDTO;
import com.estrat.backend.db.dto.PestelAnalysisDTO;
import com.estrat.backend.db.dto.SWOTAnalysisDTO;
import com.estrat.backend.db.dto.ScoreCardDTO;
import com.estrat.backend.db.service.ControlPanelGeneralService;
import com.estrat.backend.db.service.DbLicenseService;
import com.estrat.backend.db.service.NotificationService;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class NotificationUtil {
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private ControlPanelGeneralService controlPanelGeneralService;
    @Autowired
    private DbLicenseService licenseService;

    @Async
    public void saveNotification(Object entity, Map<String, String> commonHeaders) {
        LicenseResponseDTO licenseResponseDTO = this.licenseService.validateLicense();
        boolean licenseNotification = CollectionUtils.isNotEmpty(licenseResponseDTO.getModuleList()) ? licenseResponseDTO.getModuleList().contains("Notifications") : false;
        ControlPanelGeneralDTO panelGeneralDTO = this.controlPanelGeneralService.findByOrgId(Long.valueOf(commonHeaders.get("USER_ORG_ID")).longValue());
        String empId = commonHeaders.get("LOGGED_IN_EMPLOYEE_ID");
        Object notification = Objects.nonNull(panelGeneralDTO) && Objects.nonNull(panelGeneralDTO.getGeneralSettingValue()) ? panelGeneralDTO.getGeneralSettingValue().get("notification") : null;
        boolean notificationEnabled = notification != null ? Boolean.valueOf(notification.toString()) : false;
        boolean updatecomplete = false;
        if (notificationEnabled && licenseNotification) {
            PestelAnalysisDTO pestelAnalysisDTO;
            String msg;
            List<String> objects;
            NotificationDTO notificationDTO = new NotificationDTO();
            HashMap<String, Object> stringObjectMap = new HashMap<String, Object>();
            if (entity instanceof ScoreCardDTO) {
                ScoreCardDTO scoreCardDTO = (ScoreCardDTO)entity;
                notificationDTO.setOwner(scoreCardDTO.getOwner());
                notificationDTO.setNotificationType("ScoreCard");
                notificationDTO.setTargetValue(scoreCardDTO.getId());
                stringObjectMap.put("message", "You are assigned as an owner for Perspective: " + scoreCardDTO.getScoreCardValue().get("name"));
            } else if (entity instanceof ObjectivesDTO) {
                ObjectivesDTO objectivesDTO = (ObjectivesDTO)entity;
                notificationDTO.setOwner(objectivesDTO.getOwner());
                notificationDTO.setNotificationType("Objective");
                notificationDTO.setTargetValue(objectivesDTO.getId());
                stringObjectMap.put("message", "You are assigned as an owner for Objectives: " + objectivesDTO.getObjectiveId());
            } else if (entity instanceof KPIDTO) {
                KPIDTO kpidto = (KPIDTO)entity;
                notificationDTO.setOwner(kpidto.getOwner());
                notificationDTO.setNotificationType("Objective");
                notificationDTO.setTargetValue(kpidto.getId());
                stringObjectMap.put("message", "You are assigned as an owner for KPI: " + kpidto.getKpiId());
            } else if (entity instanceof MeetingManagementResponseDTO) {
                MeetingManagementResponseDTO meetingDTO = (MeetingManagementResponseDTO)entity;
                if (null != meetingDTO.getMeetingManagementDTO().getMeetingManagementValue().get("multipleOwners")) {
                    if (meetingDTO.getMeetingManagementDTO().getMeetingManagementValue().get("multipleOwners").toString().contains(",")) {
                        if (StringUtils.isNotEmpty((CharSequence)meetingDTO.getMeetingManagementDTO().getMeetingManagementValue().get("newMultipleOwners").toString())) {
                            String[] owner = meetingDTO.getMeetingManagementDTO().getMeetingManagementValue().get("newMultipleOwners").toString().split(",");
                            for (String attendees : owner) {
                                if (commonHeaders.get("LOGGED_IN_EMPLOYEE_ID").equalsIgnoreCase(attendees)) continue;
                                this.saveMeetingNotification(attendees, meetingDTO, commonHeaders);
                            }
                        }
                        updatecomplete = true;
                    }
                    if (meetingDTO.getMeetingManagementDTO().getMeetingManagementValue().containsKey("recommendation")) {
                        objects = Arrays.asList(meetingDTO.getMeetingManagementDTO().getMeetingManagementValue().get("recommendation").toString().split("\\},"));
                        for (Object e : objects) {
                            boolean updateStatus = false;
                            String res = e.toString().replaceAll("]", "");
                            res = res.replace("[", "");
                            res = res.replace("{", "");
                            res = res.replace("}", "");
                            List<String> findMultipleOwnersList = Arrays.asList(res.split("\\, "));
                            Iterator<String> iterator = findMultipleOwnersList.iterator();
                            while (iterator.hasNext()) {
                                List<String> owner;
                                List<String> nameOwner;
                                String multipleOwners = iterator.next();
                                if (!multipleOwners.contains("newMultipleOwners") || (nameOwner = Arrays.asList(multipleOwners.split("="))).size() <= 1 || (owner = Arrays.asList(nameOwner.get(1).split("\\,"))).isEmpty()) continue;
                                updateStatus = true;
                                Iterator<String> iterator2 = owner.iterator();
                                while (iterator2.hasNext()) {
                                    String attendees = iterator2.next();
                                    if (commonHeaders.get("LOGGED_IN_EMPLOYEE_ID").equalsIgnoreCase(attendees)) continue;
                                    this.saveMeetingRecommendationNotification(attendees, meetingDTO, commonHeaders);
                                }
                            }
                        }
                        updatecomplete = true;
                    }
                    if (meetingDTO.getMeetingManagementDTO().getMeetingManagementValue().containsKey("actions")) {
                        objects = Arrays.asList(meetingDTO.getMeetingManagementDTO().getMeetingManagementValue().get("actions").toString().split("\\},"));
                        for (Object e : objects) {
                            String res = e.toString().replaceAll("]", "");
                            res = res.replace("[", "");
                            res = res.replace("{", "");
                            res = res.replace("}", "");
                            List<String> findMultipleOwnersList = Arrays.asList(res.split("\\, "));
                            for (String multipleOwners : findMultipleOwnersList) {
                                List<String> owner;
                                List<String> nameOwner;
                                if (!multipleOwners.contains("newMultipleOwners") || (nameOwner = Arrays.asList(multipleOwners.split("="))).size() <= 1 || (owner = Arrays.asList(nameOwner.get(1).split("\\,"))) == null || owner.isEmpty()) continue;
                                for (String attendees : owner) {
                                    if (commonHeaders.get("LOGGED_IN_EMPLOYEE_ID").equalsIgnoreCase(attendees)) continue;
                                    this.saveMeetingActionNotification(attendees, meetingDTO, commonHeaders);
                                }
                            }
                        }
                        updatecomplete = true;
                    }
                }
            } else if (entity instanceof SWOTAnalysisDTO) {
                SWOTAnalysisDTO swotAnalysisDTO = (SWOTAnalysisDTO)entity;
                if (null != swotAnalysisDTO.getSwotAnalysisValue().get("multipleOwners")) {
                    List<String> owner;
                    List<String> nameOwner;
                    List<String> findMultipleOwnersList;
                    if (swotAnalysisDTO.getSwotAnalysisValue().get("multipleOwners").toString().contains(",")) {
                        msg = "You are tagged in a SWOT  at " + swotAnalysisDTO.getFlagType();
                        String type = "SWOT";
                        if (StringUtils.isNotEmpty((CharSequence)swotAnalysisDTO.getSwotAnalysisValue().get("newMultipleOwners").toString())) {
                            String[] stringArray;
                            for (String attendees : stringArray = swotAnalysisDTO.getSwotAnalysisValue().get("newMultipleOwners").toString().split(",")) {
                                if (commonHeaders.get("LOGGED_IN_EMPLOYEE_ID").equalsIgnoreCase(attendees)) continue;
                                this.saveSwotNotification(attendees, swotAnalysisDTO, commonHeaders, type, msg);
                            }
                        }
                        updatecomplete = true;
                    }
                    if (swotAnalysisDTO.getSwotAnalysisValue().containsKey("recommendation")) {
                        objects = Arrays.asList(swotAnalysisDTO.getSwotAnalysisValue().get("recommendation").toString().split("\\},"));
                        for (Object e : objects) {
                            String msg2 = "You are tagged in a swot recommendation ";
                            String type = "SWOTRecommendation";
                            String res = e.toString().replaceAll("]", "");
                            res = res.replace("[", "");
                            res = res.replace("{", "");
                            res = res.replace("}", "");
                            findMultipleOwnersList = Arrays.asList(res.split("\\, "));
                            for (String multipleOwners : findMultipleOwnersList) {
                                if (!multipleOwners.contains("newMultipleOwners") || (nameOwner = Arrays.asList(multipleOwners.split("="))).size() <= 1 || (owner = Arrays.asList(nameOwner.get(1).split("\\,"))) == null || owner.isEmpty()) continue;
                                for (String attendees : owner) {
                                    if (commonHeaders.get("LOGGED_IN_EMPLOYEE_ID").equalsIgnoreCase(attendees)) continue;
                                    this.saveSwotNotification(attendees, swotAnalysisDTO, commonHeaders, type, msg2);
                                }
                            }
                        }
                        updatecomplete = true;
                    }
                    if (swotAnalysisDTO.getSwotAnalysisValue().containsKey("actions")) {
                        objects = Arrays.asList(swotAnalysisDTO.getSwotAnalysisValue().get("actions").toString().split("\\},"));
                        for (String string : objects) {
                            String msg2 = "You are tagged in a swot action ";
                            String type = "SWOTAction";
                            String res = string.toString().replaceAll("]", "");
                            res = res.replace("[", "");
                            res = res.replace("{", "");
                            res = res.replace("}", "");
                            findMultipleOwnersList = Arrays.asList(res.split("\\, "));
                            for (String multipleOwners : findMultipleOwnersList) {
                                if (!multipleOwners.contains("newMultipleOwners") || (nameOwner = Arrays.asList(multipleOwners.split("="))).size() <= 1 || (owner = Arrays.asList(nameOwner.get(1).split("\\,"))) == null || owner.isEmpty()) continue;
                                for (String attendees : owner) {
                                    if (commonHeaders.get("LOGGED_IN_EMPLOYEE_ID").equalsIgnoreCase(attendees)) continue;
                                    this.saveSwotNotification(attendees, swotAnalysisDTO, commonHeaders, type, msg2);
                                }
                            }
                        }
                        updatecomplete = true;
                    }
                }
            } else if (entity instanceof PestelAnalysisDTO && null != (pestelAnalysisDTO = (PestelAnalysisDTO)entity).getPestelAnalysisValue().get("multipleOwners")) {
                List<String> owner;
                List<String> nameOwner;
                List<String> findMultipleOwnersList;
                if (pestelAnalysisDTO.getPestelAnalysisValue().get("multipleOwners").toString().contains(",")) {
                    msg = "You are tagged in a PESTEL  at " + pestelAnalysisDTO.getFlagType();
                    String type = "PESTEL";
                    if (pestelAnalysisDTO.getPestelAnalysisValue().containsKey("newMultipleOwners") && StringUtils.isNotEmpty((CharSequence)pestelAnalysisDTO.getPestelAnalysisValue().get("newMultipleOwners").toString())) {
                        String[] stringArray;
                        for (String attendees : stringArray = pestelAnalysisDTO.getPestelAnalysisValue().get("newMultipleOwners").toString().split(",")) {
                            if (commonHeaders.get("LOGGED_IN_EMPLOYEE_ID").equalsIgnoreCase(attendees)) continue;
                            this.savePestelNotification(attendees, pestelAnalysisDTO, commonHeaders, type, msg);
                        }
                    }
                    updatecomplete = true;
                }
                if (pestelAnalysisDTO.getPestelAnalysisValue().containsKey("recommendation")) {
                    objects = Arrays.asList(pestelAnalysisDTO.getPestelAnalysisValue().get("recommendation").toString().split("\\},"));
                    for (String string : objects) {
                        String msg3 = "You are tagged in a pestel recommendation ";
                        String type = "PestelRecommendation";
                        String res = string.toString().replaceAll("]", "");
                        res = res.replace("[", "");
                        res = res.replace("{", "");
                        res = res.replace("}", "");
                        findMultipleOwnersList = Arrays.asList(res.split("\\, "));
                        for (String multipleOwners : findMultipleOwnersList) {
                            if (!multipleOwners.contains("newMultipleOwners") || (nameOwner = Arrays.asList(multipleOwners.split("="))).size() <= 1 || (owner = Arrays.asList(nameOwner.get(1).split("\\,"))) == null || owner.isEmpty()) continue;
                            for (String attendees : owner) {
                                if (commonHeaders.get("LOGGED_IN_EMPLOYEE_ID").equalsIgnoreCase(attendees)) continue;
                                this.savePestelNotification(attendees, pestelAnalysisDTO, commonHeaders, type, msg3);
                            }
                        }
                    }
                    updatecomplete = true;
                }
                if (pestelAnalysisDTO.getPestelAnalysisValue().containsKey("actions")) {
                    objects = Arrays.asList(pestelAnalysisDTO.getPestelAnalysisValue().get("actions").toString().split("\\},"));
                    for (String string : objects) {
                        String msg3 = "You are tagged in a pestel action ";
                        String type = "PestelAction";
                        String res = string.toString().replaceAll("]", "");
                        res = res.replace("[", "");
                        res = res.replace("{", "");
                        res = res.replace("}", "");
                        findMultipleOwnersList = Arrays.asList(res.split("\\, "));
                        for (String multipleOwners : findMultipleOwnersList) {
                            if (!multipleOwners.contains("newMultipleOwners") || (nameOwner = Arrays.asList(multipleOwners.split("="))).size() <= 1 || (owner = Arrays.asList(nameOwner.get(1).split("\\,"))) == null || owner.isEmpty()) continue;
                            for (String attendees : owner) {
                                if (commonHeaders.get("LOGGED_IN_EMPLOYEE_ID").equalsIgnoreCase(attendees)) continue;
                                this.savePestelNotification(attendees, pestelAnalysisDTO, commonHeaders, type, msg3);
                            }
                        }
                    }
                    updatecomplete = true;
                }
            }
            if (!updatecomplete) {
                notificationDTO.setCreatedBy(Long.valueOf(commonHeaders.get("LOGGED_IN_EMPLOYEE_ID")).longValue());
                notificationDTO.setActive(0);
                notificationDTO.setCreatedTime(LocalDateTime.now());
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
                stringObjectMap.put("formattedDate", dateFormat.format(new Date()));
                String dateTime = LocalDateTime.now().toString();
                stringObjectMap.put("dateTime", dateTime);
                notificationDTO.setNotificationValue(stringObjectMap);
                notificationDTO.setStatus("unread");
                this.notificationService.save(notificationDTO);
            }
        }
    }

    @Async
    public void saveBatchNotification(Object entity) {
        NotificationDTO notificationDTO = new NotificationDTO();
        HashMap<String, Object> stringObjectMap = new HashMap<String, Object>();
        if (entity instanceof ScoreCardDTO) {
            ScoreCardDTO scoreCardDTO = (ScoreCardDTO)entity;
            notificationDTO.setOwner(scoreCardDTO.getOwner());
            notificationDTO.setNotificationType("ScoreCardExpiry");
            notificationDTO.setTargetValue(scoreCardDTO.getId());
            notificationDTO.setCreatedBy(Long.valueOf(scoreCardDTO.getCreatedBy()).longValue());
            stringObjectMap.put("message", scoreCardDTO.getScoreCardValue().get("message"));
        }
        notificationDTO.setActive(0);
        notificationDTO.setCreatedTime(LocalDateTime.now());
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        stringObjectMap.put("formattedDate", dateFormat.format(new Date()));
        String dateTime = LocalDateTime.now().toString();
        stringObjectMap.put("dateTime", dateTime);
        notificationDTO.setNotificationValue(stringObjectMap);
        notificationDTO.setStatus("unread");
        this.notificationService.save(notificationDTO);
    }

    public void saveMeetingNotification(String attendees, MeetingManagementResponseDTO meetingDTO, Map<String, String> commonHeaders) {
        HashMap<String, Object> stringObjectMap = new HashMap<String, Object>();
        NotificationDTO meetingNotificationDTO = new NotificationDTO();
        meetingNotificationDTO.setOwner(Long.parseLong(attendees));
        meetingNotificationDTO.setNotificationType("Meeting");
        meetingNotificationDTO.setTargetValue(meetingDTO.getMeetingManagementDTO().getId());
        stringObjectMap.put("message", "You are invited for a meeting on ");
        meetingNotificationDTO.setMeetingTime(meetingDTO.getMeetingManagementDTO().getMeetingTime());
        meetingNotificationDTO.setCreatedBy(Long.valueOf(commonHeaders.get("LOGGED_IN_EMPLOYEE_ID")).longValue());
        meetingNotificationDTO.setActive(0);
        meetingNotificationDTO.setCreatedTime(LocalDateTime.now());
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        stringObjectMap.put("formattedDate", dateFormat.format(new Date()));
        String dateTime = LocalDateTime.now().toString();
        stringObjectMap.put("dateTime", dateTime);
        meetingNotificationDTO.setNotificationValue(stringObjectMap);
        meetingNotificationDTO.setStatus("unread");
        this.notificationService.save(meetingNotificationDTO);
    }

    public void saveMeetingRecommendationNotification(String attendees, MeetingManagementResponseDTO meetingDTO, Map<String, String> commonHeaders) {
        HashMap<String, Object> stringObjectMap = new HashMap<String, Object>();
        NotificationDTO meetingNotificationDTO = new NotificationDTO();
        meetingNotificationDTO.setCreatedBy(Long.valueOf(commonHeaders.get("LOGGED_IN_EMPLOYEE_ID")).longValue());
        meetingNotificationDTO.setOwner(Long.parseLong(attendees));
        meetingNotificationDTO.setNotificationType("MeetingRecommendation");
        meetingNotificationDTO.setTargetValue(meetingDTO.getMeetingManagementDTO().getId());
        stringObjectMap.put("message", "You are tagged in a meeting recommendation ");
        meetingNotificationDTO.setMeetingTime(meetingDTO.getMeetingManagementDTO().getMeetingTime());
        meetingNotificationDTO.setActive(0);
        meetingNotificationDTO.setCreatedTime(LocalDateTime.now());
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        stringObjectMap.put("formattedDate", dateFormat.format(new Date()));
        String dateTime = LocalDateTime.now().toString();
        stringObjectMap.put("dateTime", dateTime);
        meetingNotificationDTO.setNotificationValue(stringObjectMap);
        meetingNotificationDTO.setStatus("unread");
        this.notificationService.saveAction(meetingNotificationDTO);
    }

    public void saveMeetingActionNotification(String attendees, MeetingManagementResponseDTO meetingDTO, Map<String, String> commonHeaders) {
        HashMap<String, Object> stringObjectMap = new HashMap<String, Object>();
        NotificationDTO meetingNotificationDTO = new NotificationDTO();
        meetingNotificationDTO.setCreatedBy(Long.valueOf(commonHeaders.get("LOGGED_IN_EMPLOYEE_ID")).longValue());
        meetingNotificationDTO.setOwner(Long.parseLong(attendees));
        meetingNotificationDTO.setNotificationType("MeetingAction");
        meetingNotificationDTO.setTargetValue(meetingDTO.getMeetingManagementDTO().getId());
        stringObjectMap.put("message", "You are tagged in a meeting action ");
        meetingNotificationDTO.setMeetingTime(meetingDTO.getMeetingManagementDTO().getMeetingTime());
        meetingNotificationDTO.setActive(0);
        meetingNotificationDTO.setCreatedTime(LocalDateTime.now());
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        stringObjectMap.put("formattedDate", dateFormat.format(new Date()));
        String dateTime = LocalDateTime.now().toString();
        stringObjectMap.put("dateTime", dateTime);
        meetingNotificationDTO.setNotificationValue(stringObjectMap);
        meetingNotificationDTO.setStatus("unread");
        this.notificationService.saveAction(meetingNotificationDTO);
    }

    public void saveSwotNotification(String attendees, SWOTAnalysisDTO swotAnalysisDTO, Map<String, String> commonHeaders, String type, String msg) {
        HashMap<String, Object> stringObjectMap = new HashMap<String, Object>();
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setOwner(Long.parseLong(attendees));
        notificationDTO.setNotificationType(type);
        notificationDTO.setTargetValue(swotAnalysisDTO.getId());
        stringObjectMap.put("message", msg);
        notificationDTO.setCreatedBy(Long.valueOf(commonHeaders.get("LOGGED_IN_EMPLOYEE_ID")).longValue());
        notificationDTO.setActive(0);
        notificationDTO.setCreatedTime(LocalDateTime.now());
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        stringObjectMap.put("formattedDate", dateFormat.format(new Date()));
        String dateTime = LocalDateTime.now().toString();
        stringObjectMap.put("dateTime", dateTime);
        notificationDTO.setNotificationValue(stringObjectMap);
        notificationDTO.setStatus("unread");
        this.notificationService.save(notificationDTO);
    }

    public void savePestelNotification(String attendees, PestelAnalysisDTO pestelAnalysisDTO, Map<String, String> commonHeaders, String type, String msg) {
        HashMap<String, Object> stringObjectMap = new HashMap<String, Object>();
        NotificationDTO pestelNotificationDTO = new NotificationDTO();
        pestelNotificationDTO.setOwner(Long.parseLong(attendees));
        pestelNotificationDTO.setNotificationType("PESTEL");
        pestelNotificationDTO.setTargetValue(pestelAnalysisDTO.getId());
        stringObjectMap.put("message", msg);
        pestelNotificationDTO.setCreatedBy(Long.valueOf(commonHeaders.get("LOGGED_IN_EMPLOYEE_ID")).longValue());
        pestelNotificationDTO.setActive(0);
        pestelNotificationDTO.setCreatedTime(LocalDateTime.now());
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        stringObjectMap.put("formattedDate", dateFormat.format(new Date()));
        String dateTime = LocalDateTime.now().toString();
        stringObjectMap.put("dateTime", dateTime);
        pestelNotificationDTO.setNotificationValue(stringObjectMap);
        pestelNotificationDTO.setStatus("unread");
        this.notificationService.save(pestelNotificationDTO);
    }
}

