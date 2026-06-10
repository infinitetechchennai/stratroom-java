/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.backend.db.bean.po.TaskCategorys
 *  com.estrat.backend.db.bean.po.TaskDetails
 *  com.estrat.backend.db.dao.TaskCategorysRepository
 *  com.estrat.backend.db.dao.TaskDetailsRepository
 *  com.estrat.backend.db.dto.TaskCategorysDTO
 *  com.estrat.backend.db.dto.TaskDetailsDTO
 *  com.estrat.backend.db.dto.TaskStatusResponseDTO
 *  com.estrat.backend.db.resource.util.UserThreadLocal
 *  com.estrat.backend.db.service.TaskDetailsService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.stereotype.Service
 */
package com.estrat.backend.db.service;

import com.estrat.backend.db.bean.po.TaskCategorys;
import com.estrat.backend.db.bean.po.TaskDetails;
import com.estrat.backend.db.dao.TaskCategorysRepository;
import com.estrat.backend.db.dao.TaskDetailsRepository;
import com.estrat.backend.db.dto.TaskCategorysDTO;
import com.estrat.backend.db.dto.TaskDetailsDTO;
import com.estrat.backend.db.dto.TaskStatusResponseDTO;
import com.estrat.backend.db.resource.util.UserThreadLocal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskDetailsService {
    @Autowired
    protected TaskCategorysRepository taskCategorysRepository;
    @Autowired
    protected TaskDetailsRepository taskDetailsRepository;

    public Optional<TaskCategorys> findById(long id) {
        return this.taskCategorysRepository.findById(id);
    }

    public TaskCategorysDTO save(TaskCategorys taskCategorys) {
        TaskCategorys response = (TaskCategorys)this.taskCategorysRepository.save(taskCategorys);
        TaskCategorysDTO taskDTO = new TaskCategorysDTO(response);
        return taskDTO;
    }

    public void delete(TaskCategorys taskCategorys) {
        this.taskCategorysRepository.delete(taskCategorys);
    }

    public List<TaskCategorysDTO> findAll(long empId, String dateRange, String type) {
        List<TaskCategorys> dbList = new ArrayList();
        if (Objects.isNull(dateRange)) {
            dateRange = UserThreadLocal.get((String)"DATE_PERIOD");
        }
        if (StringUtils.isNotEmpty((CharSequence)dateRange)) {
            Date firstDate = null;
            Date secondDate = null;
            String[] dataRanges = null;
            String cleanedDateRange = dateRange.replace("%20", "").replace("%2520", "");
            if (Objects.nonNull(dateRange)) {
                String[] stringArray = dataRanges = cleanedDateRange.contains("-") ? cleanedDateRange.split("-") : cleanedDateRange.split(",");
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
            dbList = type != null ? this.taskCategorysRepository.findAllByEmpIdAndType(Long.valueOf(empId), type) : this.taskCategorysRepository.findAllByEmpId(Long.valueOf(empId));
        } else {
            dbList = type != null ? this.taskCategorysRepository.findAllByEmpIdAndType(Long.valueOf(empId), type) : this.taskCategorysRepository.findAllByEmpId(Long.valueOf(empId));
        }
        List<TaskCategorysDTO> taskList = dbList.stream().map(dbValue -> {
            TaskCategorysDTO taskDto = new TaskCategorysDTO(dbValue);
            this.populateImpactDesc(taskDto);
            this.calculateAndSetCategoryProgress(taskDto);
            return taskDto;
        }).collect(Collectors.toList());
        return taskList;
    }

    public void populateImpactDesc(TaskCategorysDTO taskCategorysDTO) {
        List<TaskDetailsDTO> taskDetail = new ArrayList();
        if (taskCategorysDTO.getId() != 0L) {
            taskDetail = this.findAllByCategoryId(Long.valueOf(taskCategorysDTO.getId()));
        }
        taskCategorysDTO.setTaskDetailList(taskDetail);
    }

    public Optional<TaskDetails> findTaskById(long id) {
        return this.taskDetailsRepository.findById(id);
    }

    public TaskDetailsDTO saveTaskDetail(TaskDetails taskDetails) {
        TaskDetails taskResponse = (TaskDetails)this.taskDetailsRepository.save(taskDetails);
        TaskDetailsDTO taskDTO = new TaskDetailsDTO(taskResponse);
        return taskDTO;
    }

    public void delete(TaskDetails taskDetails) {
        this.taskDetailsRepository.delete(taskDetails);
    }

    public List<TaskDetailsDTO> findAllByCategoryId(Long categoryId) {
        List<TaskDetails> dbList = this.taskDetailsRepository.findAllByTaskCategoryId(categoryId);
        List<TaskDetailsDTO> conqList = dbList.stream().map(dbValue -> new TaskDetailsDTO(dbValue)).collect(Collectors.toList());
        return conqList;
    }

    public TaskStatusResponseDTO buildTaskStatusResponse(List<TaskCategorysDTO> taskCategorysDTOList) {
        long totalTask = 0L;
        long totalComplete = 0L;
        long totalInProgress = 0L;
        TaskStatusResponseDTO response = new TaskStatusResponseDTO();
        for (TaskCategorysDTO category : taskCategorysDTOList) {
            if (category.getTaskDetailList() == null) continue;
            for (TaskDetailsDTO task : category.getTaskDetailList()) {
                ++totalTask;
                if ("Completed".equalsIgnoreCase(task.getStatus())) {
                    ++totalComplete;
                    continue;
                }
                if (!"In Progress".equalsIgnoreCase(task.getStatus())) continue;
                ++totalInProgress;
            }
        }
        response.setTotalTask(totalTask);
        response.setTotalComplete(totalComplete);
        response.setTotalInProgress(totalInProgress);
        return response;
    }

    private void calculateAndSetCategoryProgress(TaskCategorysDTO category) {
        List<TaskDetailsDTO> details = category.getTaskDetailList();
        if (details == null || details.isEmpty()) {
            category.getTaskCategoryValue().put("totalProgress", "0%");
            return;
        }
        int total = 0;
        int count = 0;
        for (TaskDetailsDTO detail : details) {
            if (detail.getTaskValue() == null) continue;
            Object progressObj = detail.getTaskValue().get("progress");
            if (progressObj != null && !progressObj.toString().trim().isEmpty()) {
                total += Integer.parseInt(detail.getTaskValue().get("progress").toString());
            }
            ++count;
        }
        int avgProgress = count == 0 ? 0 : total / count;
        category.getTaskCategoryValue().put("totalProgress", avgProgress + "%");
    }
}

