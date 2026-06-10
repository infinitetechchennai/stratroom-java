/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.service.db.bean.po.ControlPanelGeneral
 *  com.estrat.service.db.bean.po.OrgDetails
 *  com.estrat.service.db.bean.po.SchedulerBatchDetails
 *  com.estrat.service.db.dao.ControlPanelGeneralRepository
 *  com.estrat.service.db.dao.SchedulerBatchRepository
 *  com.estrat.service.db.dto.ControlPanelGeneralDTO
 *  com.estrat.service.db.resource.util.BackupUtil
 *  com.estrat.service.db.resource.util.UserThreadLocal
 *  com.estrat.service.db.service.AuditDetailsService
 *  com.estrat.service.db.service.OrgDetailsService
 *  com.estrat.service.db.service.SchedulerBatchService
 *  org.apache.commons.lang3.StringUtils
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.stereotype.Service
 */
package com.estrat.service.db.service;

import com.estrat.service.db.bean.po.ControlPanelGeneral;
import com.estrat.service.db.bean.po.OrgDetails;
import com.estrat.service.db.bean.po.SchedulerBatchDetails;
import com.estrat.service.db.dao.ControlPanelGeneralRepository;
import com.estrat.service.db.dao.SchedulerBatchRepository;
import com.estrat.service.db.dto.ControlPanelGeneralDTO;
import com.estrat.service.db.resource.util.BackupUtil;
import com.estrat.service.db.resource.util.UserThreadLocal;
import com.estrat.service.db.service.AuditDetailsService;
import com.estrat.service.db.service.OrgDetailsService;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SchedulerBatchService {
    @Autowired
    protected SchedulerBatchRepository schedulerBatchRepository;
    @Autowired
    protected ControlPanelGeneralRepository controlPanelGeneralRepository;
    @Autowired
    protected BackupUtil backupUtil;
    @Autowired
    protected OrgDetailsService orgDetailsService;
    @Autowired
    protected AuditDetailsService auditService;
    @Value(value="${backup.script.file.path}")
    private String backupFilePath;

    public List<SchedulerBatchDetails> findAll() {
        return this.schedulerBatchRepository.findAll();
    }

    public Optional<SchedulerBatchDetails> findByOrgId(Long id) {
        return this.schedulerBatchRepository.findById(id);
    }

    public Map<String, String> checkBackup(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        Object makePath;
        HashMap<String, String> stringObjectMap = new HashMap<String, String>();
        String path = null;
        String fileName = null;
        FileOutputStream fileOutputStream = null;
        LocalDate localDate = LocalDateTime.now().toLocalDate();
        if (!StringUtils.isNotEmpty((CharSequence)controlPanelGeneralDTO.getGeneralSettingValue().get("path").toString())) {
            path = String.join((CharSequence)"/", this.backupFilePath, ((OrgDetails)this.orgDetailsService.findById(controlPanelGeneralDTO.getOrgId()).get()).getName() + "-");
            fileName = localDate.toString() + "-backup.sql";
            File filePath = new File(path);
            if (!filePath.exists()) {
                filePath.mkdir();
            }
        } else {
            String[] pathArray;
            String userPath = controlPanelGeneralDTO.getGeneralSettingValue().get("path").toString();
            makePath = null;
            if (userPath.contains(".sql")) {
                pathArray = userPath.split("/");
                for (int i = 0; i <= pathArray.length - 1; ++i) {
                    if (pathArray.length - 1 == i) {
                        fileName = pathArray[pathArray.length - 1];
                        break;
                    }
                    File filePath = new File((String)(makePath = makePath == null ? String.join((CharSequence)"/", this.backupFilePath, pathArray[i]) : String.join((CharSequence)"/", new CharSequence[]{makePath, pathArray[i]})));
                    if (filePath.exists()) continue;
                    filePath.mkdir();
                }
                path = makePath;
            } else {
                pathArray = userPath.split("/");
                for (int i = 0; i <= pathArray.length - 1 && pathArray.length != i; ++i) {
                    File filePath = new File((String)(makePath = makePath == null ? String.join((CharSequence)"/", this.backupFilePath, pathArray[i]) : String.join((CharSequence)"/", new CharSequence[]{makePath, pathArray[i]})));
                    if (filePath.exists()) continue;
                    filePath.mkdir();
                }
                fileName = localDate.toString() + "-backup.sql";
                path = makePath;
            }
        }
        try {
            File uploadFile = new File(String.join((CharSequence)"/", path, fileName));
            if (uploadFile.exists()) {
                uploadFile.delete();
            }
            uploadFile.setWritable(true);
            uploadFile.setReadable(true);
            uploadFile.setExecutable(true);
            fileOutputStream = new FileOutputStream(uploadFile);
        }
        catch (FileNotFoundException e) {
            stringObjectMap.put("error", "FileNotFoundException");
            makePath = stringObjectMap;
            return makePath;
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            if (fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                }
                catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        String finalPath = path;
        stringObjectMap.put("backupFinalPath", finalPath);
        String createPath = path.replace(this.backupFilePath + "/", "");
        stringObjectMap.put("backupPath", createPath);
        stringObjectMap.put("backupPathFile", String.join((CharSequence)"/", createPath, fileName));
        stringObjectMap.put("backupFinalPathFile", String.join((CharSequence)"/", finalPath, fileName));
        stringObjectMap.put("restorePath", String.join((CharSequence)"/", createPath, fileName));
        stringObjectMap.put("restoreFinalPath", String.join((CharSequence)"/", finalPath, fileName));
        return stringObjectMap;
    }

    public void saveBatch(ControlPanelGeneralDTO controlPanelGeneralDTO) {
        SchedulerBatchDetails schedulerBatchDetails1;
        Optional checkSchedulerBatchDetails = this.schedulerBatchRepository.findById(controlPanelGeneralDTO.getOrgId());
        SchedulerBatchDetails schedulerBatchDetails = null;
        SchedulerBatchDetails checkSchedulerBatchDetail = this.schedulerBatchRepository.findByOrgId(Long.valueOf(controlPanelGeneralDTO.getOrgId()));
        schedulerBatchDetails = checkSchedulerBatchDetails.isPresent() ? (SchedulerBatchDetails)checkSchedulerBatchDetails.get() : new SchedulerBatchDetails();
        schedulerBatchDetails = new SchedulerBatchDetails();
        schedulerBatchDetails.setOrgId(controlPanelGeneralDTO.getOrgId());
        schedulerBatchDetails.setCreatedTime(LocalDateTime.now());
        if (controlPanelGeneralDTO.getCreatedBy() != 0L) {
            schedulerBatchDetails.setUploadedBy(controlPanelGeneralDTO.getCreatedBy());
        } else {
            schedulerBatchDetails.setUploadedBy(controlPanelGeneralDTO.getUpdatedBy());
        }
        schedulerBatchDetails.setCurrentBatchTime(LocalDateTime.now());
        if (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("schedulertype")) {
            if (StringUtils.isNotEmpty((CharSequence)controlPanelGeneralDTO.getGeneralSettingValue().get("schedulertype").toString())) {
                LocalDateTime today;
                String backupPath;
                String schedulerType = controlPanelGeneralDTO.getGeneralSettingValue().get("schedulertype").toString();
                schedulerBatchDetails.setSchedulerType(schedulerType);
                if (!schedulerType.equals(checkSchedulerBatchDetail.getSchedulerType())) {
                    this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Scheduler Modified");
                }
                if (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("backupFinalPathFile")) {
                    backupPath = controlPanelGeneralDTO.getGeneralSettingValue().get("backupFinalPathFile").toString();
                    schedulerBatchDetails.setBackupFilePath(backupPath);
                }
                if (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("backupFinalPath")) {
                    backupPath = controlPanelGeneralDTO.getGeneralSettingValue().get("backupFinalPath").toString();
                    schedulerBatchDetails.setBackupPath(backupPath);
                    if (!backupPath.equals(checkSchedulerBatchDetail.getBackupPath())) {
                        this.auditService.updateAudit("Control Panel", controlPanelGeneralDTO.getOrgId(), Long.valueOf(UserThreadLocal.get()).longValue(), "Back Up Path Modified");
                    }
                }
                if (schedulerType != null && schedulerType.equalsIgnoreCase("6 months")) {
                    today = LocalDateTime.now();
                    schedulerBatchDetails.setNextBatchTime(today.plusMonths(6L));
                } else if (schedulerType != null && schedulerType.equalsIgnoreCase("3 months")) {
                    today = LocalDateTime.now();
                    schedulerBatchDetails.setNextBatchTime(today.plusMonths(3L));
                } else if (schedulerType != null && schedulerType.equalsIgnoreCase("Monthly")) {
                    today = LocalDateTime.now();
                    schedulerBatchDetails.setNextBatchTime(today.plusMonths(1L));
                }
            }
        } else {
            String backupPath;
            if (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("backupFinalPathFile")) {
                backupPath = controlPanelGeneralDTO.getGeneralSettingValue().get("backupFinalPathFile").toString();
                schedulerBatchDetails.setBackupFilePath(backupPath);
            }
            if (controlPanelGeneralDTO.getGeneralSettingValue().containsKey("backupFinalPath")) {
                backupPath = controlPanelGeneralDTO.getGeneralSettingValue().get("backupFinalPath").toString();
                schedulerBatchDetails.setBackupPath(backupPath);
            }
        }
        if ((schedulerBatchDetails1 = (SchedulerBatchDetails)this.schedulerBatchRepository.save(schedulerBatchDetails)).getSchedulerType() != null && schedulerBatchDetails1.getSchedulerType().contains("Now") || controlPanelGeneralDTO.getGeneralSettingValue().get("backupduration").toString().equals("Now")) {
            this.runBackupScript(schedulerBatchDetails1);
        }
    }

    public void updateBatch(SchedulerBatchDetails schedulerBatchDetails) {
        schedulerBatchDetails.setUpdatedTime(LocalDateTime.now());
        schedulerBatchDetails.setCurrentBatchTime(LocalDateTime.now());
        String schedulerType = schedulerBatchDetails.getSchedulerType();
        if (schedulerType != null && schedulerType.equalsIgnoreCase("6 months")) {
            LocalDateTime today = LocalDateTime.now();
            schedulerBatchDetails.setNextBatchTime(today.plusMonths(6L));
        } else if (schedulerType != null && schedulerType.equalsIgnoreCase("3 months")) {
            LocalDateTime today = LocalDateTime.now();
            schedulerBatchDetails.setNextBatchTime(today.plusMonths(3L));
        } else if (schedulerType != null && schedulerType.equalsIgnoreCase("Monthly")) {
            LocalDateTime today = LocalDateTime.now();
            schedulerBatchDetails.setNextBatchTime(today.plusMonths(1L));
        }
        this.schedulerBatchRepository.save(schedulerBatchDetails);
    }

    public void checkBatchDetails() {
        boolean status = false;
        List schedulerBatchDetailsList = this.schedulerBatchRepository.findAll();
        if (!schedulerBatchDetailsList.isEmpty() && schedulerBatchDetailsList != null) {
            for (SchedulerBatchDetails schedulerBatchDetails : schedulerBatchDetailsList) {
                if (schedulerBatchDetails.getSchedulerType().contains("Now") || !(status = this.checkBatchTime(schedulerBatchDetails).booleanValue())) continue;
                this.runBackupScript(schedulerBatchDetails);
            }
        }
    }

    public Boolean checkBatchTime(SchedulerBatchDetails schedulerBatchDetails) {
        LocalDate localDate2;
        boolean status = false;
        LocalDate localDate1 = LocalDateTime.now().toLocalDate();
        int compare = localDate1.compareTo(localDate2 = schedulerBatchDetails.getNextBatchTime().toLocalDate());
        if (compare == 0) {
            status = true;
        }
        return status;
    }

    public void runBackupScript(SchedulerBatchDetails schedulerBatchDetails) {
        this.backupUtil.Backupdbtosql(schedulerBatchDetails.getBackupFilePath());
        this.updateBatch(schedulerBatchDetails);
        this.updateRestore(schedulerBatchDetails);
    }

    public void updateRestore(SchedulerBatchDetails schedulerBatchDetails) {
        Optional controlPanelGeneral = this.controlPanelGeneralRepository.findById(schedulerBatchDetails.getOrgId());
        if (controlPanelGeneral.isPresent()) {
            ControlPanelGeneralDTO controlPanelGeneralDTO = new ControlPanelGeneralDTO((ControlPanelGeneral)controlPanelGeneral.get());
            controlPanelGeneralDTO.getGeneralSettingValue().put("restoreStatus", true);
            this.controlPanelGeneralRepository.save(new ControlPanelGeneral(controlPanelGeneralDTO));
        }
    }

    public List<String> findFiles(String path) {
        ArrayList<String> files;
        block6: {
            files = new ArrayList<String>();
            String filePath = null;
            String fileName = null;
            try {
                File dir = new File(path);
                File[] fileList = dir.listFiles();
                if (fileList.length > 4) {
                    for (File file : fileList) {
                        int fileSize;
                        fileName = this.findLastModifiedName(fileList, file);
                        int size = files.size();
                        if (size < (fileSize = 4)) {
                            filePath = path.replace(this.backupFilePath + "/", "");
                            filePath = filePath + "/" + fileName;
                            files.add(filePath);
                            continue;
                        }
                        break block6;
                    }
                    break block6;
                }
                for (File file : fileList) {
                    fileName = file.getName();
                    filePath = path.replace(this.backupFilePath + "/", "");
                    filePath = filePath + "/" + fileName;
                    files.add(filePath);
                }
            }
            catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return files;
    }

    public String findLastModifiedName(File[] files, File lastModifiedFile) {
        String fileName = null;
        File finalModifiedFile = null;
        for (int i = 1; i < files.length; ++i) {
            if (lastModifiedFile.lastModified() >= files[i].lastModified()) continue;
            finalModifiedFile = files[i];
        }
        fileName = finalModifiedFile.getName();
        return fileName;
    }
}

