/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.ControlPanelGeneralDTO
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.service.ControlPanelGeneralService
 *  com.estrat.web.util.TemplateWriterUtil
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.log4j.Logger
 *  org.apache.poi.ss.usermodel.Cell
 *  org.apache.poi.ss.usermodel.CellStyle
 *  org.apache.poi.ss.usermodel.CellType
 *  org.apache.poi.ss.usermodel.CreationHelper
 *  org.apache.poi.ss.usermodel.Font
 *  org.apache.poi.ss.usermodel.IndexedColors
 *  org.apache.poi.ss.usermodel.Row
 *  org.apache.poi.ss.usermodel.Sheet
 *  org.apache.poi.xssf.usermodel.XSSFRow
 *  org.apache.poi.xssf.usermodel.XSSFSheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.core.io.ByteArrayResource
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.MediaType
 *  org.springframework.http.ResponseEntity
 *  org.springframework.http.ResponseEntity$BodyBuilder
 *  org.springframework.stereotype.Component
 *  org.springframework.util.MultiValueMap
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.util;

import com.estrat.web.dto.ControlPanelGeneralDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.service.ControlPanelGeneralService;
import com.estrat.web.util.UserThreadLocal;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

@Component
public class TemplateWriterUtil {
    private Logger logger = Logger.getLogger(TemplateWriterUtil.class);
    @Value(value="${template.upload.file.path}")
    private String templateFilePath;
    @Autowired
    protected AuditTrailService auditTrailService;
    @Autowired
    protected ControlPanelGeneralService controlPanelGeneralService;

    public ResponseEntity<ByteArrayResource> writeDocForEmpOrg() throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            String[] COLUMNs = new String[]{"Name", "Parent", "Designation", "Department", "Email", "New Mail", "PhoneNumber", "Location", "Organization"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            String sheetName = "EmployeeOrgStructureImport";
            if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                sheetName = UserThreadLocal.get().getProfile().getFirstName();
            }
            Sheet sheet = workbook.createSheet(sheetName);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; ++col) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }
            header.setContentType(new MediaType("application", "force-download"));
            header.set("Content-Disposition", "attachment; filename = EmployeeOrgStructureImport.xlsx");
            workbook.write((OutputStream)stream);
            workbook.close();
            this.auditTrailService.save("EmployeeOrgStructureImport");
            return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ByteArrayResource> writeDocForDeptOrg() throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            String[] COLUMNs = new String[]{"Department", "Parent", "Member", "Owner", "Organization"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            String sheetName = "DepartmentOrgStructureImport";
            if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                sheetName = UserThreadLocal.get().getProfile().getFirstName();
            }
            Sheet sheet = workbook.createSheet(sheetName);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; ++col) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }
            header.setContentType(new MediaType("application", "force-download"));
            header.set("Content-Disposition", "attachment; filename = DepartmentOrgStructureImport.xlsx");
            workbook.write((OutputStream)stream);
            workbook.close();
            this.auditTrailService.save("DepartmentOrgStructureImport");
            return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ByteArrayResource> writeDocForUserRole() throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            String[] COLUMNs = new String[]{"Name", "Email Address", "Department", "Designation", "Role", "Location", "Phone no", "Status", "Login Access", "Organization"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            String sheetName = "UserRoleImportTemple";
            if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                sheetName = UserThreadLocal.get().getProfile().getFirstName();
            }
            Sheet sheet = workbook.createSheet(sheetName);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; ++col) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }
            header.setContentType(new MediaType("application", "force-download"));
            header.set("Content-Disposition", "attachment; filename = UserRoleImportTemple.xlsx");
            workbook.write((OutputStream)stream);
            workbook.close();
            this.auditTrailService.save("UserRoleImportTemple");
            return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ByteArrayResource> writeDocForScoreCard() throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            String[] COLUMNs = new String[]{"ScoreCard Name", "DeleteKPI", "DeleteObj", "Department", "Scorecard Description", "Perspective ID", "Perspective Name", "Perspective Type", "Perspective Description", "Perspective Weight", "ObJective ID", "Objective Name", "Objective Description", "Objective Weight", "KPI ID", "KPI NAME", "KPI Description", "KPI Weight", "Owner", "Measurement Frequency", "KPI Formula", "Actual Field", "Budget Field", "Target Field", "Forecast Field", "Data Source", "Red", "Amber", "Green", "Status", "DataType", "Currency", "CustomThreshold", "YTDFormula", "KPIType", "Start/End Date", "Scorecard Performance", "Perspective Performance", "Objective Performance"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            String sheetName = "ScorecardExportName";
            if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                sheetName = UserThreadLocal.get().getProfile().getFirstName();
            }
            Sheet sheet = workbook.createSheet(sheetName);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; ++col) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }
            header.setContentType(new MediaType("application", "force-download"));
            header.set("Content-Disposition", "attachment; filename = ScoreCardImportTemple.xlsx");
            workbook.write((OutputStream)stream);
            workbook.close();
            this.auditTrailService.save("ScorecardImportTemple");
            return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ByteArrayResource> writeDocForInitiative() throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            String[] COLUMNs = new String[]{"PageName", "Initiative ID", "Initiative Name", "Initiative Description", "Owner", "Impact", "Progress", "Primary Status", "Status Type", "Planned Start Date/End Date", "Actual Start Date/End Date", "Actual Indicator", "Target Indicator", "Budget Indicator", "Forecast Indicator", "Total Indicator", "Utilized Indicator", "Balance Indicator", "Total Value", "Utillized Value", "Type", "Type Name", "Type Description", "Type Progress", "Owners (Comma Seperated)(NA for MileStone and Comments)", "Start End Date", "MileStone EndDate", "Delete Initiative", "Delete Type"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            String sheetName = "InitiativeImportTemple";
            if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                sheetName = UserThreadLocal.get().getProfile().getFirstName();
            }
            Sheet sheet = workbook.createSheet(sheetName);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; ++col) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }
            header.setContentType(new MediaType("application", "force-download"));
            header.set("Content-Disposition", "attachment; filename = InitiativeImportTemple.xlsx");
            workbook.write((OutputStream)stream);
            workbook.close();
            this.auditTrailService.save("InitiativeImportTemple");
            return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ByteArrayResource> writeDocForRisk() throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            String[] COLUMNs = new String[]{"ScoreCard Name", "DeleteKPI", "DeleteObj", "Department", "Scorecard Description", "Perspective ID", "Perspective Name", "Perspective Type", "Perspective Description", "Perspective Weight", "ObJective ID", "Objective Name", "Objective Description", "Objective Weight", "KPI ID", "KPI NAME", "KPI Description", "KPI Weight", "Owner", "Measurement Frequency", "KPI Formula", "Actual Field", "Budget Field", "Target Field", "Forecast Field", "Data Source", "Red", "Amber", "Green", "Status", "DataType", "Currency", "CustomThreshold", "YTDFormula", "KPIType", "Start/End Date", "Scorecard Performance", "Perspective Performance", "Objective Performance"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            String sheetName = "RiskImportTemple";
            if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                sheetName = UserThreadLocal.get().getProfile().getFirstName();
            }
            Sheet sheet = workbook.createSheet(sheetName);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; ++col) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }
            header.setContentType(new MediaType("application", "force-download"));
            header.set("Content-Disposition", "attachment; filename = RiskImportTemple.xlsx");
            workbook.write((OutputStream)stream);
            workbook.close();
            this.auditTrailService.save("RiskImportTemple");
            return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ByteArrayResource> writeDocForEtl() throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            String[] COLUMNs = new String[]{"node key", "Owner", "FromRealDate", "ToRealDate", "Target", "Actual", "Type", "Currency", "SubNodeKey", "SubMeasureName", "subMetricCode", "SubTarget", "SubActual"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            String sheetName = "EtlImportTemple";
            if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                sheetName = UserThreadLocal.get().getProfile().getFirstName();
            }
            Sheet sheet = workbook.createSheet(sheetName);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; ++col) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }
            header.setContentType(new MediaType("application", "force-download"));
            header.set("Content-Disposition", "attachment; filename = EtlImportTemple.xlsx");
            workbook.write((OutputStream)stream);
            workbook.close();
            this.auditTrailService.save("EtlImportTemple");
            return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ByteArrayResource> writeDocForRiskFormulation() throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            String[] COLUMNs = new String[]{"PageName", "Name", "Owner", "Likelihood", "Impact", "Category", "Date Raised", "Department", "Cause Name", "Plan Name", "Type", "Type Name", "Rating", "Action (Plan/Action)", "Resolve By", "Status", "RiskDelete", "TypeDelete"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            String sheetName = "RiskFormulationImportTemple";
            if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                sheetName = UserThreadLocal.get().getProfile().getFirstName();
            }
            Sheet sheet = workbook.createSheet(sheetName);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; ++col) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }
            header.setContentType(new MediaType("application", "force-download"));
            header.set("Content-Disposition", "attachment; filename = RiskFormulationImportTemple.xlsx");
            workbook.write((OutputStream)stream);
            workbook.close();
            this.auditTrailService.save("RiskFormulationImportTemple");
            return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ByteArrayResource> writeDocForProjectFormulation() throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try {
            String[] COLUMNs = new String[]{"PageName", "Initiative Name", "Owner", "Planned Start Date/End Date", "Department", "Budget", "Type", "Name", " Owners (Comma Seperated) (NA for MileStone and Comments)", "Start End Date", "MileStone EndDate", "Delete Initiative", "Delete Type"};
            XSSFWorkbook workbook = new XSSFWorkbook();
            CreationHelper createHelper = workbook.getCreationHelper();
            String sheetName = "ProjectFormulationImportTemple";
            if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                sheetName = UserThreadLocal.get().getProfile().getFirstName();
            }
            Sheet sheet = workbook.createSheet(sheetName);
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLACK.getIndex());
            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);
            Row headerRow = sheet.createRow(0);
            for (int col = 0; col < COLUMNs.length; ++col) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }
            header.setContentType(new MediaType("application", "force-download"));
            header.set("Content-Disposition", "attachment; filename = ProjectFormulationImportTemple.xlsx");
            workbook.write((OutputStream)stream);
            workbook.close();
            this.auditTrailService.save("ProjectFormulationImportTemple");
            return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public boolean uploadTemplateFile(MultipartFile templateFile, String templateType) {
        FileOutputStream fileOutputStream = null;
        try {
            File[] filesList;
            String path = String.valueOf(String.join((CharSequence)"/", this.templateFilePath, UserThreadLocal.get().getProfile().getOrgDetails().getName()));
            String typePath = String.join((CharSequence)"/", path, templateType);
            File filePath = new File(typePath);
            if (!filePath.exists()) {
                filePath.mkdirs();
            }
            for (Object _obj_file : filesList = filePath.listFiles()) {
                File file = (File) _obj_file;
                if (!file.isFile()) continue;
                file.delete();
            }
            String fileName = templateFile.getOriginalFilename();
            File uploadFile = new File(String.join((CharSequence)"/", typePath, fileName));
            uploadFile.setWritable(true);
            uploadFile.setReadable(true);
            uploadFile.setExecutable(true);
            fileOutputStream = new FileOutputStream(uploadFile);
            fileOutputStream.write(templateFile.getBytes());
        }
        catch (Exception e) {
            this.logger.error("Exception while uploading etl file", (Throwable)e);
            throw new RuntimeException(e);
        }
        finally {
            if (fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                }
                catch (IOException e) {
                    this.logger.error("Exception while uploading etl file", (Throwable)e);
                    throw new RuntimeException(e);
                }
            }
        }
        return true;
    }

    public String updateTemplateFile(String templateType, String oldFileName, String templateFileName) {
        try {
            String path = String.valueOf(String.join((CharSequence)"/", this.templateFilePath, UserThreadLocal.get().getProfile().getOrgDetails().getName()));
            String typePath = String.join((CharSequence)"/", path, templateType);
            File findFile = new File(String.join((CharSequence)"/", typePath, oldFileName));
            if (!findFile.exists()) {
                return "File Not Found";
            }
            File sourceFile = new File(typePath + File.separator + oldFileName);
            File destFile = new File(typePath + File.separator + templateFileName);
            sourceFile.renameTo(destFile);
        }
        catch (Exception e) {
            this.logger.error("Exception while update  file", (Throwable)e);
            throw new RuntimeException(e);
        }
        return "success";
    }

    public String deleteFile(String templateFileName, String templateType) {
        try {
            String path = String.valueOf(String.join((CharSequence)"/", this.templateFilePath, UserThreadLocal.get().getProfile().getOrgDetails().getName()));
            String typePath = String.join((CharSequence)"/", path, templateType);
            File findFile = new File(String.join((CharSequence)"/", typePath, templateFileName));
            if (!findFile.exists()) {
                return "File Not Found";
            }
            findFile.delete();
        }
        catch (Exception e) {
            this.logger.error("Exception while update  file", (Throwable)e);
            throw new RuntimeException(e);
        }
        return "success";
    }

    public Map<String, Object> fileList() {
        String typePath = null;
        HashMap<String, Object> map = new HashMap<String, Object>();
        try {
            String path = String.valueOf(String.join((CharSequence)"/", this.templateFilePath, UserThreadLocal.get().getProfile().getOrgDetails().getName()));
            File folder = new File(String.join((CharSequence)"/", path));
            if (folder.exists()) {
                String[] folderNameList;
                for (String folderName : folderNameList = folder.list()) {
                    if (folderName.contains(".")) continue;
                    typePath = String.join((CharSequence)"/", path, folderName);
                    File subFolderFile = new File(String.join((CharSequence)"/", typePath));
                    String[] fileList = subFolderFile.list();
                    map.put(folderName, fileList);
                }
            }
        }
        catch (Exception e) {
            this.logger.error("Exception while update  file", (Throwable)e);
            throw new RuntimeException(e);
        }
        return map;
    }

    public ResponseEntity<?> writeDoc(String fileName, String templateType) throws Exception {
        try {
            String path = String.valueOf(String.join((CharSequence)"/", this.templateFilePath, UserThreadLocal.get().getProfile().getOrgDetails().getName()));
            String typePath = String.join((CharSequence)"/", path, templateType);
            File findFile = new File(String.join((CharSequence)"/", typePath, fileName));
            if (findFile.exists()) {
                HttpHeaders header = new HttpHeaders();
                header.setContentType(new MediaType("application", "force-download"));
                header.set("Content-Disposition", "attachment; filename = " + fileName);
                header.add("Cache-Control", "no-cache, no-store, must-revalidate");
                header.add("Pragma", "no-cache");
                header.add("Expires", "0");
                this.auditTrailService.save("Excel " + templateType + " Template Downloaded");
                Path resultPath = Paths.get(findFile.getAbsolutePath(), new String[0]);
                ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(resultPath));
                return ((ResponseEntity.BodyBuilder)ResponseEntity.ok().headers(header)).contentLength(findFile.length()).contentType(MediaType.parseMediaType((String)"application/octet-stream")).body(resource);
            }
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public String checkValidationForExcelSheet(XSSFWorkbook template, String type) {
        for (int sheetIndex = 0; sheetIndex < template.getNumberOfSheets(); ++sheetIndex) {
            XSSFSheet orgSheet = template.getSheetAt(sheetIndex);
            if (orgSheet == null) {
                this.logger.debug("Sheet not found");
                continue;
            }
            XSSFRow row = orgSheet.getRow(0);
            if (orgSheet.getSheetName().equalsIgnoreCase("Dict")) continue;
            if (type.equalsIgnoreCase("Organisation")) {
                ControlPanelGeneralDTO controlPanelGeneralDTO = this.controlPanelGeneralService.findByOrgId(Long.valueOf(UserThreadLocal.get().getProfile().getOrgDetails().getOrgId()).longValue());
                if (controlPanelGeneralDTO.getImplementationType().equalsIgnoreCase("Department")) {
                    if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) continue;
                    String checkDeptID = row.getCell(1).getStringCellValue();
                    if (checkDeptID.equalsIgnoreCase("Department ID")) {
                        return "Success";
                    }
                    return "This is not Organization Sheet";
                }
                if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) continue;
                String employeeName = row.getCell(1).getStringCellValue();
                if (employeeName.equalsIgnoreCase("Employee Name")) {
                    return "Success";
                }
                return "This is not Organization Sheet";
            }
            if (type.equalsIgnoreCase("Scorecard")) {
                if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) continue;
                String scoreCardName = row.getCell(1).getStringCellValue();
                if (scoreCardName.equalsIgnoreCase("ScoreCardName")) {
                    return "Success";
                }
                return "This is not ScoreCard Excel Sheet";
            }
            if (type.equalsIgnoreCase("UserRole")) {
                if (row.getCell(4) == null || row.getCell(4).getCellType() == CellType.BLANK) continue;
                String role = row.getCell(4).getStringCellValue();
                if (role.equalsIgnoreCase("Role")) {
                    return "Success";
                }
                return "This is not UserRole Excel Sheet";
            }
            if (type.equalsIgnoreCase("Risk")) {
                if (row.getCell(2) == null || row.getCell(2).getCellType() == CellType.BLANK) continue;
                String riskName = row.getCell(2).getStringCellValue();
                if (riskName.equalsIgnoreCase("Risk Name")) {
                    return "Success";
                }
                return "This is not Risk Excel Sheet";
            }
            if (type.equalsIgnoreCase("Initiative & Projects")) {
                if (row.getCell(2) == null || row.getCell(2).getCellType() == CellType.BLANK) continue;
                String initiativeId = row.getCell(2).getStringCellValue();
                if (initiativeId.equalsIgnoreCase("Initiative ID") || initiativeId.contains("Initiative")) {
                    return "Success";
                }
                return "This is not Initiative & Projects Excel Sheet";
            }
            if (type.equalsIgnoreCase("RiskFormulation")) {
                String category = null;
                for (int i = 0; i < row.getPhysicalNumberOfCells(); ++i) {
                    if (row.getCell(i) == null || row.getCell(i).getCellType() == CellType.BLANK) continue;
                    if (row.getCell(i).getCellType() == CellType.STRING) {
                        category = row.getCell(i).getStringCellValue();
                        continue;
                    }
                    if (row.getCell(i).getCellType() != CellType.NUMERIC) continue;
                    category = row.getCell(i).getStringCellValue();
                }
                if (row.getCell(3) == null || row.getCell(3).getCellType() == CellType.BLANK) continue;
                String likelihood = row.getCell(3).getStringCellValue();
                if (likelihood.equalsIgnoreCase("Likelihood") || likelihood.contains("Likelihood")) {
                    return "Success";
                }
                return "This is not RiskFormulation Excel Sheet";
            }
            if (type.equalsIgnoreCase("ProjectFormulation")) {
                if (row.getCell(1) == null || row.getCell(1).getCellType() == CellType.BLANK) continue;
                String initiativeName = row.getCell(1).getStringCellValue();
                if (initiativeName.equalsIgnoreCase("Initiative Name") || initiativeName.contains("Initiative Name")) {
                    return "Success";
                }
                return "This is not ProjectFormulation Excel Sheet";
            }
            if (!type.equalsIgnoreCase("ETL") || row.getCell(0) == null || row.getCell(0).getCellType() == CellType.BLANK) continue;
            String nodeKey = row.getCell(0).getStringCellValue();
            if (nodeKey.equalsIgnoreCase("node key")) {
                return "Success";
            }
            return "This is not DataLoad Excel Sheet";
        }
        return "This is not valid Sheet";
    }
}

