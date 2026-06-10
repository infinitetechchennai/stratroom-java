/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.etl.dto.KPIDTO
 *  com.estrat.service.etl.dto.NotificationDTO
 *  com.estrat.service.etl.dto.ScoreCardDTO
 *  com.estrat.service.etl.service.NotificationService
 *  com.estrat.service.etl.util.NotificationUtil
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.scheduling.annotation.Async
 *  org.springframework.stereotype.Component
 */
package com.estrat.service.etl.util;

import com.estrat.service.etl.dto.KPIDTO;
import com.estrat.service.etl.dto.NotificationDTO;
import com.estrat.service.etl.dto.ScoreCardDTO;
import com.estrat.service.etl.service.NotificationService;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
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

    @Async
    public void saveBatchNotification(Object entity, String notificationType) {
        NotificationDTO notificationDTO = new NotificationDTO();
        HashMap stringObjectMap = new HashMap();
        if (entity instanceof KPIDTO) {
            KPIDTO kpidto = (KPIDTO)entity;
            notificationDTO.setOwner(kpidto.getOwner());
            notificationDTO.setNotificationType(notificationType);
            notificationDTO.setTargetValue(kpidto.getId());
            notificationDTO.setCreatedBy(Long.valueOf(kpidto.getCreatedBy()).longValue());
            stringObjectMap.put("message", kpidto.getKpiValue().get("message"));
        }
        notificationDTO.setActive(0);
        notificationDTO.setCreatedTime(LocalDateTime.now());
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
        stringObjectMap.put("formattedDate", dateFormat.format(new Date()));
        notificationDTO.setNotificationValue(stringObjectMap);
        notificationDTO.setStatus("unread");
        this.notificationService.saveNotification(notificationDTO);
    }

    @Async
    public void saveStatuslightNotification(Object entity) {
        String message;
        NotificationDTO notificationDTO = new NotificationDTO();
        HashMap stringObjectMap = new HashMap();
        long owner = 0L;
        String targetValue = null;
        String statusLight = null;
        String type = null;
        if (entity instanceof KPIDTO) {
            type = "KPI_STATUS_LIGHT";
            KPIDTO kpidto = (KPIDTO)entity;
            owner = kpidto.getOwner();
            statusLight = this.getStatusLightValue(kpidto.getKpiValue().get("statusLight"));
            targetValue = String.valueOf(kpidto.getId());
            notificationDTO.setOwner(kpidto.getOwner());
            notificationDTO.setNotificationType(type);
            notificationDTO.setTargetValue(kpidto.getId());
            notificationDTO.setCreatedBy(Long.valueOf(kpidto.getCreatedBy()).longValue());
            message = "Your KPI %s status has turned %s";
            stringObjectMap.put("statusLight", statusLight);
            stringObjectMap.put("message", String.format(message, kpidto.getKpiId(), statusLight));
        } else if (entity instanceof ScoreCardDTO) {
            type = "SCORECARD_STATUS_LIGHT";
            ScoreCardDTO scoreCardDTO = (ScoreCardDTO)entity;
            owner = scoreCardDTO.getOwner();
            statusLight = this.getStatusLightValue(scoreCardDTO.getScoreCardValue().get("statusLight"));
            targetValue = String.valueOf(scoreCardDTO.getId());
            notificationDTO.setOwner(scoreCardDTO.getOwner());
            notificationDTO.setNotificationType(type);
            notificationDTO.setTargetValue(scoreCardDTO.getId());
            notificationDTO.setCreatedBy(Long.valueOf(scoreCardDTO.getCreatedBy()).longValue());
            message = "Your scorecard %s status has turned %s ";
            String scoreCardName = Objects.nonNull(scoreCardDTO.getScoreCardValue().get("name")) ? scoreCardDTO.getScoreCardValue().get("name").toString() : "";
            stringObjectMap.put("statusLight", statusLight);
            stringObjectMap.put("message", String.format(message, scoreCardName, statusLight));
        }
        if (StringUtils.isNotEmpty(statusLight) && (statusLight.equalsIgnoreCase("YELLOW") || statusLight.equalsIgnoreCase("RED"))) {
            List notificationDTOs = this.notificationService.getNotificationList(owner, type, targetValue);
            boolean checkFlag = false;
            if (CollectionUtils.isNotEmpty((Collection)notificationDTOs)) {
                String existingStatusLight;
                NotificationDTO extsingObject = (NotificationDTO)notificationDTOs.stream().findFirst().get();
                String string = existingStatusLight = Objects.nonNull(extsingObject.getNotificationValue().get("statusLight")) ? extsingObject.getNotificationValue().get("statusLight").toString() : "";
                if (!existingStatusLight.equalsIgnoreCase(statusLight)) {
                    extsingObject.getNotificationValue().put("statusLight", statusLight);
                    notificationDTO.setId(extsingObject.getId());
                    notificationDTO.setUpdatedTime(LocalDateTime.now());
                    checkFlag = true;
                }
            } else {
                checkFlag = true;
            }
            if (checkFlag) {
                notificationDTO.setActive(0);
                notificationDTO.setCreatedTime(LocalDateTime.now());
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd MMM yyyy HH:mm:ss");
                stringObjectMap.put("formattedDate", dateFormat.format(new Date()));
                notificationDTO.setNotificationValue(stringObjectMap);
                notificationDTO.setStatus("unread");
                this.notificationService.saveNotification(notificationDTO);
            }
        }
    }

    public String getStatusLightValue(Object status) {
        String statusLight;
        String string = statusLight = Objects.nonNull(status) ? status.toString() : "";
        if (statusLight.toUpperCase().contains("YELLOW")) {
            statusLight = "Yellow";
            return "Yellow";
        }
        if (statusLight.toUpperCase().contains("RED")) {
            statusLight = "Red";
            return "Red";
        }
        return "";
    }
}

