/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.AuditDTO
 *  com.estrat.web.service.AuditTrailService
 *  com.estrat.web.util.AuditTrailReader
 *  com.estrat.web.util.UserThreadLocal
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.poi.ss.usermodel.Cell
 *  org.apache.poi.ss.usermodel.CellStyle
 *  org.apache.poi.ss.usermodel.CreationHelper
 *  org.apache.poi.ss.usermodel.Font
 *  org.apache.poi.ss.usermodel.IndexedColors
 *  org.apache.poi.ss.usermodel.Row
 *  org.apache.poi.ss.usermodel.Sheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.core.io.ByteArrayResource
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.MediaType
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Component
 *  org.springframework.util.MultiValueMap
 */
package com.estrat.web.util;

import com.estrat.web.dto.AuditDTO;
import com.estrat.web.service.AuditTrailService;
import com.estrat.web.util.UserThreadLocal;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;

@SuppressWarnings({"unchecked", "rawtypes"})
@Component
public class AuditTrailReader {
    @Autowired
    protected AuditTrailService auditTrailService;

    public ResponseEntity<ByteArrayResource> writeDocForAuditTrail(List<AuditDTO> auditDTOList) throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        ArrayList mapList = new ArrayList();
        try {
            if (CollectionUtils.isNotEmpty(auditDTOList)) {
                for (Object _obj_auditDTO : auditDTOList) {
                    AuditDTO auditDTO = (AuditDTO) _obj_auditDTO;
                    if (!Objects.nonNull(auditDTO)) continue;
                    HashMap stringMap = new HashMap();
                    stringMap.put("performedBy", auditDTO.getUserName());
                    stringMap.put("action", auditDTO.getAction());
                    stringMap.put("email", auditDTO.getEmailAddress());
                    stringMap.put("ip", auditDTO.getSystemIp());
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd,yyyy HH:mm:ss");
                    stringMap.put("dateTime", auditDTO.getCreatedTime().format(formatter));
                    mapList.add(stringMap);
                }
            }
            if (mapList != null && CollectionUtils.isNotEmpty(mapList)) {
                String[] COLUMNs = new String[]{"Performed by", "Action", "Additional Information", "Date / Time", "IP Address"};
                XSSFWorkbook workbook = new XSSFWorkbook();
                CreationHelper createHelper = workbook.getCreationHelper();
                String sheetname = "AuditTrailExportName";
                if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                    sheetname = UserThreadLocal.get().getProfile().getFirstName();
                }
                Sheet sheet = workbook.createSheet(sheetname);
                Font headerFont = workbook.createFont();
                headerFont.setBold(true);
                headerFont.setColor(IndexedColors.BLUE.getIndex());
                CellStyle headerCellStyle = workbook.createCellStyle();
                headerCellStyle.setFont(headerFont);
                Row headerRow = sheet.createRow(0);
                for (int col = 0; col < COLUMNs.length; ++col) {
                    Cell cell = headerRow.createCell(col);
                    cell.setCellValue(COLUMNs[col]);
                    cell.setCellStyle(headerCellStyle);
                }
                int rowIdx = 1;
                for (Object _obj_map : mapList) {
                    Map map = (Map) _obj_map;
                    if (map == null || map == null) continue;
                    Row row = sheet.createRow(rowIdx++);
                    if (map.containsKey("performedBy")) {
                        row.createCell(0).setCellValue((String)map.get("performedBy"));
                    } else {
                        row.createCell(0).setCellValue("");
                    }
                    if (map.containsKey("action")) {
                        if (map.get("action") != null) {
                            row.createCell(1).setCellValue((String)map.get("action"));
                        } else {
                            row.createCell(1).setCellValue("");
                        }
                    } else {
                        row.createCell(1).setCellValue("");
                    }
                    if (map.containsKey("email")) {
                        if (map.get("email") != null) {
                            row.createCell(2).setCellValue((String)map.get("email"));
                        } else {
                            row.createCell(2).setCellValue("");
                        }
                    } else {
                        row.createCell(2).setCellValue("");
                    }
                    if (map.containsKey("dateTime")) {
                        if (map.get("dateTime") != null) {
                            row.createCell(3).setCellValue((String)map.get("dateTime"));
                        } else {
                            row.createCell(3).setCellValue("");
                        }
                    } else {
                        row.createCell(3).setCellValue("");
                    }
                    if (map.containsKey("ip")) {
                        if (map.get("ip") != null) {
                            row.createCell(4).setCellValue((String)map.get("ip"));
                        } else {
                            row.createCell(4).setCellValue("");
                        }
                    } else {
                        row.createCell(4).setCellValue("");
                    }
                    Cell cell = row.createCell(5);
                }
                header.setContentType(new MediaType("application", "force-download"));
                header.set("Content-Disposition", "attachment; filename=AuditTrail.xlsx");
                workbook.write((OutputStream)stream);
                workbook.close();
                return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.CREATED);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(new ByteArrayResource(stream.toByteArray()), (MultiValueMap)header, HttpStatus.EXPECTATION_FAILED);
    }
}

