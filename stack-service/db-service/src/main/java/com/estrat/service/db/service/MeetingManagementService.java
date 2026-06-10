/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.MeetingManagement
 *  com.estrat.service.db.bean.po.TaskCategorys
 *  com.estrat.service.db.cache.DBCache
 *  com.estrat.service.db.dao.MeetingManagementRepository
 *  com.estrat.service.db.dto.MeetingManagementDTO
 *  com.estrat.service.db.dto.MeetingManagementResponseDTO
 *  com.estrat.service.db.dto.TaskCategorysDTO
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.MeetingManagementService
 *  com.estrat.service.db.service.TaskDetailsService
 *  javax.transaction.Transactional
 *  org.apache.commons.lang3.StringUtils
 *  org.apache.log4j.Logger
 *  org.hibernate.HibernateException
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.MeetingManagement;
import com.estrat.service.db.bean.po.TaskCategorys;
import com.estrat.service.db.cache.DBCache;
import com.estrat.service.db.dao.MeetingManagementRepository;
import com.estrat.service.db.dto.MeetingManagementDTO;
import com.estrat.service.db.dto.MeetingManagementResponseDTO;
import com.estrat.service.db.dto.TaskCategorysDTO;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.TaskDetailsService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional(rollbackOn={HibernateException.class})
public class MeetingManagementService {
    private Logger log = LoggerFactory.getLogger(MeetingManagementService.class);
    @Autowired
    protected MeetingManagementRepository meetingManagementRepository;
    @Autowired
    private TaskDetailsService taskDetailsService;
    @Autowired
    private DBCache dbCache;

    public Optional<MeetingManagement> findById(long id) {
        return this.meetingManagementRepository.findByIdAndActive(Long.valueOf(id), 0);
    }

    public void delete(MeetingManagement meetingManagement) {
        this.meetingManagementRepository.delete((Object)meetingManagement);
    }

    public MeetingManagementResponseDTO save(MeetingManagement meetingManagement) {
        MeetingManagementDTO managementDTO = new MeetingManagementDTO(meetingManagement, false);
        List actions = (List)managementDTO.getMeetingManagementValue().get("actions");
        if (actions != null) {
            for (Map action : actions) {
                TaskCategorysDTO taskcategory = new TaskCategorysDTO();
                if (taskcategory.getTaskCategoryValue() == null) {
                    taskcategory.setTaskCategoryValue(new HashMap());
                }
                if (action.get("taskId") != null) {
                    taskcategory.setId(Long.parseLong(action.get("taskId").toString()));
                }
                taskcategory.setCreatedTime(LocalDateTime.now());
                taskcategory.setCreatedBy(meetingManagement.getCreatedBy());
                taskcategory.setOwner(meetingManagement.getCreatedBy());
                taskcategory.setType("Meetings");
                Map objectsValue = taskcategory.getTaskCategoryValue();
                objectsValue.put("category", action.get("name"));
                TaskCategorysDTO taskDTOObj = this.taskDetailsService.save(new TaskCategorys(taskcategory));
                action.put("taskId", taskDTOObj.getId());
            }
        }
        MeetingManagement meetingManagementResponse = (MeetingManagement)this.meetingManagementRepository.save(new MeetingManagement(managementDTO));
        MeetingManagementResponseDTO responseDTO = new MeetingManagementResponseDTO();
        responseDTO.setFlag(true);
        MeetingManagementDTO meetingManagementDTO = new MeetingManagementDTO(meetingManagementResponse, false);
        responseDTO.setMeetingManagementDTO(meetingManagementDTO);
        this.dbCache.remove((Object)("retrieveMeetingManagementByEmpId" + UserThreadLocal.get()), "dbCache");
        return responseDTO;
    }

    public List<MeetingManagementDTO> findAll(long empId) {
        List dbList = this.meetingManagementRepository.findAllByEmpId(Long.valueOf(empId), 0);
        List<MeetingManagementDTO> riskList = dbList.stream().map(dbValue -> new MeetingManagementDTO(dbValue, true)).collect(Collectors.toList());
        return riskList;
    }

    public List<MeetingManagementDTO> findAll(long empId, String pageId, String dateRange) {
        List dbList = null;
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = dateRange.contains("-") ? dateRange.split("-") : dateRange.split(",");
            }
            if (dataRanges != null && dataRanges.length > 1) {
                String startDate = dataRanges[0].trim();
                String endDate = dataRanges[1].trim();
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
                try {
                    firstDate = dateFormat.parse(startDate);
                    secondDate = dateFormat.parse(endDate);
                }
                catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
            dbList = StringUtils.isNotEmpty((CharSequence)pageId) ? this.meetingManagementRepository.findAllByEmpId(Long.valueOf(empId), 0, Long.valueOf(pageId).longValue(), firstDate, secondDate) : this.meetingManagementRepository.findAllByEmpId(Long.valueOf(empId), 0, firstDate, secondDate);
        } else {
            dbList = StringUtils.isNotEmpty((CharSequence)pageId) ? this.meetingManagementRepository.findAllByEmpId(Long.valueOf(empId), 0, Long.valueOf(pageId).longValue()) : this.meetingManagementRepository.findAllByEmpId(Long.valueOf(empId), 0);
        }
        List<MeetingManagementDTO> riskList = dbList.stream().map(dbValue -> new MeetingManagementDTO(dbValue, true)).collect(Collectors.toList());
        return riskList;
    }

    public List<MeetingManagement> findAllByPageId(long pageId) {
        return this.meetingManagementRepository.findAllByPageId(pageId);
    }

    public MeetingManagementResponseDTO deleteByMeetingObj(Optional<MeetingManagement> meetingManagement) {
        MeetingManagementResponseDTO meetingManagementResponseDTO = new MeetingManagementResponseDTO();
        if (meetingManagement.isPresent()) {
            MeetingManagement management = meetingManagement.get();
            management.setActive(1);
            this.meetingManagementRepository.save(management);
            meetingManagementResponseDTO.setFlag(true);
            this.dbCache.remove((Object)("retrieveMeetingManagementByEmpId" + UserThreadLocal.get()), "dbCache");
            return meetingManagementResponseDTO;
        }
        meetingManagementResponseDTO.setFlag(false);
        return meetingManagementResponseDTO;
    }

    public MeetingManagementDTO formatDate(MeetingManagementDTO meetingManagementDTO) {
        Date firstDate = null;
        Date secondDate = null;
        String startDate = null;
        String endDate = null;
        if (meetingManagementDTO.getMeetingManagementValue().containsKey("fromdate")) {
            startDate = meetingManagementDTO.getMeetingManagementValue().get("fromdate").toString();
        }
        if (meetingManagementDTO.getMeetingManagementValue().containsKey("enddate")) {
            endDate = meetingManagementDTO.getMeetingManagementValue().get("enddate").toString();
        }
        if (startDate != null && endDate != null) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
            try {
                firstDate = dateFormat.parse(startDate);
                secondDate = dateFormat.parse(endDate);
            }
            catch (ParseException e) {
                throw new RuntimeException(e);
            }
        }
        meetingManagementDTO.setStartDate(firstDate);
        meetingManagementDTO.setEndDate(secondDate);
        return meetingManagementDTO;
    }

    public void saveSetDate() {
        List dbList = this.meetingManagementRepository.findAll();
        Date firstDate = null;
        Date secondDate = null;
        for (MeetingManagement meetingManagement : dbList) {
            MeetingManagementDTO riskDTO = new MeetingManagementDTO(meetingManagement, false);
            String startDate = null;
            String endDate = null;
            if (riskDTO.getMeetingManagementValue().containsKey("fromtime")) {
                String fromtime = riskDTO.getMeetingManagementValue().get("fromtime").toString();
                String[] fromDate = fromtime.split(" ");
                startDate = fromDate[0];
            }
            if (riskDTO.getMeetingManagementValue().containsKey("endtime")) {
                String endtime = riskDTO.getMeetingManagementValue().get("endtime").toString();
                String[] eDate = endtime.split(" ");
                endDate = eDate[0];
            }
            if (startDate != null && endDate != null) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
                try {
                    firstDate = dateFormat.parse(startDate);
                    secondDate = dateFormat.parse(endDate);
                }
                catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
            riskDTO.setStartDate(firstDate);
            riskDTO.setEndDate(secondDate);
            MeetingManagement card = new MeetingManagement(riskDTO);
            this.meetingManagementRepository.save(card);
        }
    }
}

