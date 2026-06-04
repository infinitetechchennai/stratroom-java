/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.dto.OrgTrackerDTO
 *  com.estrat.web.util.OrgTrackUtil
 *  com.estrat.web.util.UserThreadLocal
 *  com.itextpdf.text.BaseColor
 *  com.itextpdf.text.Document
 *  com.itextpdf.text.Element
 *  com.itextpdf.text.Font
 *  com.itextpdf.text.FontFactory
 *  com.itextpdf.text.PageSize
 *  com.itextpdf.text.Paragraph
 *  com.itextpdf.text.Phrase
 *  com.itextpdf.text.pdf.PdfPCell
 *  com.itextpdf.text.pdf.PdfPTable
 *  com.itextpdf.text.pdf.PdfWriter
 *  javax.servlet.http.HttpServletResponse
 *  org.apache.commons.collections4.CollectionUtils
 *  org.apache.poi.ss.usermodel.Cell
 *  org.apache.poi.ss.usermodel.CellStyle
 *  org.apache.poi.ss.usermodel.CreationHelper
 *  org.apache.poi.ss.usermodel.Font
 *  org.apache.poi.ss.usermodel.IndexedColors
 *  org.apache.poi.ss.usermodel.Row
 *  org.apache.poi.ss.usermodel.Sheet
 *  org.apache.poi.xssf.usermodel.XSSFWorkbook
 *  org.springframework.core.io.ByteArrayResource
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.MediaType
 *  org.springframework.http.ResponseEntity
 *  org.springframework.stereotype.Component
 *  org.springframework.util.MultiValueMap
 *  org.supercsv.io.CsvBeanWriter
 *  org.supercsv.prefs.CsvPreference
 */
package com.estrat.web.util;

import com.estrat.web.dto.OrgTrackerDTO;
import com.estrat.web.util.UserThreadLocal;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import java.io.OutputStream;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

@Component
public class OrgTrackUtil {
    public ResponseEntity<ByteArrayResource> writeDocForOrgTracker(List<OrgTrackerDTO> trackerDTOS) throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        ArrayList mapList = new ArrayList();
        try {
            if (CollectionUtils.isNotEmpty(trackerDTOS)) {
                for (Object _obj_orgTrackerDTO : trackerDTOS) {
                    OrgTrackerDTO orgTrackerDTO = (OrgTrackerDTO) _obj_orgTrackerDTO;
                    if (!Objects.nonNull(orgTrackerDTO)) continue;
                    HashMap stringMap = new HashMap();
                    stringMap.put("parentName", orgTrackerDTO.getParentName());
                    stringMap.put("ownerName", orgTrackerDTO.getOwnerName());
                    stringMap.put("designation", orgTrackerDTO.getDesignation());
                    stringMap.put("email", orgTrackerDTO.getEmail());
                    stringMap.put("pages", orgTrackerDTO.getPages());
                    stringMap.put("fromDate", orgTrackerDTO.getFromDate());
                    stringMap.put("toDate", orgTrackerDTO.getToDate());
                    mapList.add(stringMap);
                }
            }
            if (mapList != null && CollectionUtils.isNotEmpty(mapList)) {
                String[] COLUMNs = new String[]{"Parent", "Owner", "Designation", "Email", "Pages", "FromDate", "ToDate"};
                XSSFWorkbook workbook = new XSSFWorkbook();
                CreationHelper createHelper = workbook.getCreationHelper();
                String sheetname = "OrgTrackExportName";
                if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                    sheetname = UserThreadLocal.get().getProfile().getFirstName();
                }
                Sheet sheet = workbook.createSheet(sheetname);
                org.apache.poi.ss.usermodel.Font headerFont = workbook.createFont();
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
                    if (map.containsKey("parentName")) {
                        row.createCell(0).setCellValue((String)map.get("parentName"));
                    } else {
                        row.createCell(0).setCellValue("");
                    }
                    if (map.containsKey("ownerName")) {
                        if (map.get("ownerName") != null) {
                            row.createCell(1).setCellValue((String)map.get("ownerName"));
                        } else {
                            row.createCell(1).setCellValue("");
                        }
                    } else {
                        row.createCell(1).setCellValue("");
                    }
                    if (map.containsKey("designation")) {
                        if (map.get("designation") != null) {
                            row.createCell(2).setCellValue((String)map.get("designation"));
                        } else {
                            row.createCell(2).setCellValue("");
                        }
                    } else {
                        row.createCell(2).setCellValue("");
                    }
                    if (map.containsKey("email")) {
                        if (map.get("email") != null) {
                            row.createCell(3).setCellValue((String)map.get("email"));
                        } else {
                            row.createCell(3).setCellValue("");
                        }
                    } else {
                        row.createCell(3).setCellValue("");
                    }
                    if (map.containsKey("pages")) {
                        if (map.get("pages") != null) {
                            row.createCell(4).setCellValue((String)map.get("pages"));
                        } else {
                            row.createCell(4).setCellValue("");
                        }
                    } else {
                        row.createCell(4).setCellValue("");
                    }
                    if (map.containsKey("fromDate")) {
                        if (map.get("fromDate") != null) {
                            row.createCell(5).setCellValue((String)map.get("fromDate"));
                        } else {
                            row.createCell(5).setCellValue("");
                        }
                    } else {
                        row.createCell(5).setCellValue("");
                    }
                    if (map.containsKey("toDate")) {
                        if (map.get("toDate") != null) {
                            row.createCell(6).setCellValue((String)map.get("toDate"));
                        } else {
                            row.createCell(6).setCellValue("");
                        }
                    } else {
                        row.createCell(6).setCellValue("");
                    }
                    Cell cell = row.createCell(7);
                }
                header.setContentType(new MediaType("application", "force-download"));
                header.set("Content-Disposition", "attachment; filename=OrgTracker.xlsx");
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

    public ResponseEntity<?> writeCSVForOrgTracker(List<OrgTrackerDTO> trackerDTOS, HttpServletResponse response) throws Exception {
        HttpHeaders header = new HttpHeaders();
        try {
            response.setContentType("text/csv");
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=OrgTracker.csv";
            response.setHeader(headerKey, headerValue);
            CsvBeanWriter csvWriter = new CsvBeanWriter((Writer)response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
            String[] csvHeader = new String[]{"Parent", "Owner", "Designation", "Email", "Pages", "FromDate", "ToDate"};
            String[] nameMapping = new String[]{"parentName", "ownerName", "designation", "email", "pages", "fromDate", "toDate"};
            csvWriter.writeHeader(csvHeader);
            if (CollectionUtils.isNotEmpty(trackerDTOS)) {
                for (Object _obj_orgTrackerDTO : trackerDTOS) {
                    OrgTrackerDTO orgTrackerDTO = (OrgTrackerDTO) _obj_orgTrackerDTO;
                    if (!Objects.nonNull(orgTrackerDTO)) continue;
                    csvWriter.write(orgTrackerDTO, nameMapping);
                }
            }
            csvWriter.close();
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity<ByteArrayResource> writeDocForAllOrgTracker(List<OrgTrackerDTO> trackerDTOS) throws Exception {
        HttpHeaders header = new HttpHeaders();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        ArrayList mapList = new ArrayList();
        try {
            if (CollectionUtils.isNotEmpty(trackerDTOS)) {
                for (Object _obj_orgTrackerDTO : trackerDTOS) {
                    OrgTrackerDTO orgTrackerDTO = (OrgTrackerDTO) _obj_orgTrackerDTO;
                    if (!Objects.nonNull(orgTrackerDTO)) continue;
                    HashMap stringMap = new HashMap();
                    stringMap.put("DeptOrDesignationName", orgTrackerDTO.getParentName());
                    stringMap.put("parentName", orgTrackerDTO.getParentName());
                    stringMap.put("ownerName", orgTrackerDTO.getOwnerName());
                    stringMap.put("designation", orgTrackerDTO.getDesignation());
                    stringMap.put("email", orgTrackerDTO.getEmail());
                    stringMap.put("pages", orgTrackerDTO.getPages());
                    stringMap.put("fromDate", orgTrackerDTO.getFromDate());
                    stringMap.put("toDate", orgTrackerDTO.getToDate());
                    mapList.add(stringMap);
                }
            }
            if (mapList != null && CollectionUtils.isNotEmpty(mapList)) {
                String[] COLUMNs = new String[]{"DeptOrDesignationName", "Parent", "Owner", "Designation", "Email", "Pages", "FromDate", "ToDate"};
                XSSFWorkbook workbook = new XSSFWorkbook();
                CreationHelper createHelper = workbook.getCreationHelper();
                String sheetname = "OrgTrackExportName";
                if (UserThreadLocal.get().getProfile().getFirstName() != null) {
                    sheetname = UserThreadLocal.get().getProfile().getFirstName();
                }
                Sheet sheet = workbook.createSheet(sheetname);
                org.apache.poi.ss.usermodel.Font headerFont = workbook.createFont();
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
                    if (map == null) continue;
                    Row row = sheet.createRow(rowIdx++);
                    if (map.containsKey("DeptOrDesignationName")) {
                        row.createCell(0).setCellValue((String)map.get("DeptOrDesignationName"));
                    } else {
                        row.createCell(0).setCellValue("");
                    }
                    if (map.containsKey("parentName")) {
                        row.createCell(1).setCellValue((String)map.get("parentName"));
                    } else {
                        row.createCell(1).setCellValue("");
                    }
                    if (map.containsKey("ownerName")) {
                        if (map.get("ownerName") != null) {
                            row.createCell(2).setCellValue((String)map.get("ownerName"));
                        } else {
                            row.createCell(2).setCellValue("");
                        }
                    } else {
                        row.createCell(2).setCellValue("");
                    }
                    if (map.containsKey("designation")) {
                        if (map.get("designation") != null) {
                            row.createCell(3).setCellValue((String)map.get("designation"));
                        } else {
                            row.createCell(3).setCellValue("");
                        }
                    } else {
                        row.createCell(3).setCellValue("");
                    }
                    if (map.containsKey("email")) {
                        if (map.get("email") != null) {
                            row.createCell(4).setCellValue((String)map.get("email"));
                        } else {
                            row.createCell(4).setCellValue("");
                        }
                    } else {
                        row.createCell(4).setCellValue("");
                    }
                    if (map.containsKey("pages")) {
                        if (map.get("pages") != null) {
                            row.createCell(5).setCellValue((String)map.get("pages"));
                        } else {
                            row.createCell(5).setCellValue("");
                        }
                    } else {
                        row.createCell(5).setCellValue("");
                    }
                    if (map.containsKey("fromDate")) {
                        if (map.get("fromDate") != null) {
                            row.createCell(6).setCellValue((String)map.get("fromDate"));
                        } else {
                            row.createCell(6).setCellValue("");
                        }
                    } else {
                        row.createCell(6).setCellValue("");
                    }
                    if (map.containsKey("toDate")) {
                        if (map.get("toDate") != null) {
                            row.createCell(7).setCellValue((String)map.get("toDate"));
                        } else {
                            row.createCell(7).setCellValue("");
                        }
                    } else {
                        row.createCell(7).setCellValue("");
                    }
                    Cell cell = row.createCell(8);
                }
                header.setContentType(new MediaType("application", "force-download"));
                header.set("Content-Disposition", "attachment; filename=OrgTracker.xlsx");
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

    public ResponseEntity<?> writeCSVForAllOrgTracker(List<OrgTrackerDTO> trackerDTOS, HttpServletResponse response) throws Exception {
        HttpHeaders header = new HttpHeaders();
        try {
            response.setContentType("text/csv");
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=OrgTracker.csv";
            response.setHeader(headerKey, headerValue);
            CsvBeanWriter csvWriter = new CsvBeanWriter((Writer)response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
            String[] csvHeader = new String[]{"DeptOrDesignationName", "Parent", "Owner", "Designation", "Email", "Pages", "FromDate", "ToDate"};
            String[] nameMapping = new String[]{"deptOrDesignationName", "parentName", "ownerName", "designation", "email", "pages", "fromDate", "toDate"};
            csvWriter.writeHeader(csvHeader);
            if (CollectionUtils.isNotEmpty(trackerDTOS)) {
                for (Object _obj_orgTrackerDTO : trackerDTOS) {
                    OrgTrackerDTO orgTrackerDTO = (OrgTrackerDTO) _obj_orgTrackerDTO;
                    if (!Objects.nonNull(orgTrackerDTO)) continue;
                    csvWriter.write(orgTrackerDTO, nameMapping);
                }
            }
            csvWriter.close();
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    public ResponseEntity<?> writePdfForOrgTracker(List<OrgTrackerDTO> trackerDTOS, HttpServletResponse response, String type) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        try {
            response.setContentType("application/pdf");
            String headerKey = "Content-Disposition";
            String headerValue = "attachment; filename=OrgTracker.pdf.pdf";
            response.setHeader(headerKey, headerValue);
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance((Document)document, (OutputStream)response.getOutputStream());
            document.open();
            Font font = FontFactory.getFont((String)"Helvetica");
            font.setSize(18.0f);
            font.setColor(BaseColor.BLUE);
            Paragraph p = new Paragraph("Org Tracker Details");
            p.setAlignment(1);
            document.add((Element)p);
            if (type.equalsIgnoreCase("all")) {
                PdfPTable table = new PdfPTable(8);
                table.setWidthPercentage(100.0f);
                table.setWidths(new float[]{2.5f, 2.5f, 2.5f, 3.0f, 3.5f, 2.0f, 3.0f, 3.0f});
                table.setSpacingBefore(10.0f);
                this.writeAllTableHeader(table);
                this.writeAllTableData(table, trackerDTOS);
                document.add((Element)table);
            } else {
                PdfPTable table = new PdfPTable(7);
                table.setWidthPercentage(100.0f);
                table.setWidths(new float[]{2.5f, 3.0f, 3.0f, 3.5f, 2.0f, 3.0f, 3.0f});
                table.setSpacingBefore(10.0f);
                this.writeTableHeader(table);
                this.writeTableData(table, trackerDTOS);
                document.add((Element)table);
            }
            document.close();
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(HttpStatus.CREATED);
    }

    private void writeTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(BaseColor.BLUE);
        cell.setPadding(5.0f);
        Font font = FontFactory.getFont((String)"Helvetica");
        font.setColor(BaseColor.WHITE);
        cell.setPhrase(new Phrase("Parent", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Owner", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Designation", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Email", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Pages", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("FromDate", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("ToDate", font));
        table.addCell(cell);
    }

    private void writeAllTableHeader(PdfPTable table) {
        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(BaseColor.BLUE);
        cell.setPadding(5.0f);
        Font font = FontFactory.getFont((String)"Helvetica");
        font.setColor(BaseColor.WHITE);
        cell.setPhrase(new Phrase("DeptOrDesignationName", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Parent", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Owner", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Designation", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Email", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Pages", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("FromDate", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("ToDate", font));
        table.addCell(cell);
    }

    private void writeTableData(PdfPTable table, List<OrgTrackerDTO> trackerDTOS) {
        ArrayList mapList = new ArrayList();
        if (CollectionUtils.isNotEmpty(trackerDTOS)) {
            for (Object _obj_orgTrackerDTO : trackerDTOS) {
                OrgTrackerDTO orgTrackerDTO = (OrgTrackerDTO) _obj_orgTrackerDTO;
                if (!Objects.nonNull(orgTrackerDTO)) continue;
                HashMap stringMap = new HashMap();
                stringMap.put("parentName", orgTrackerDTO.getParentName());
                stringMap.put("ownerName", orgTrackerDTO.getOwnerName());
                stringMap.put("designation", orgTrackerDTO.getDesignation());
                stringMap.put("email", orgTrackerDTO.getEmail());
                stringMap.put("pages", orgTrackerDTO.getPages());
                stringMap.put("fromDate", orgTrackerDTO.getFromDate());
                stringMap.put("toDate", orgTrackerDTO.getToDate());
                mapList.add(stringMap);
            }
        }
        for (Object _obj_map : mapList) {
            Map map = (Map) _obj_map;
            if (map == null) continue;
            if (map.containsKey("parentName")) {
                table.addCell((String)map.get("parentName"));
            } else {
                table.addCell("");
            }
            if (map.containsKey("ownerName")) {
                if (map.get("ownerName") != null) {
                    table.addCell((String)map.get("ownerName"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("designation")) {
                if (map.get("designation") != null) {
                    table.addCell((String)map.get("designation"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("email")) {
                if (map.get("email") != null) {
                    table.addCell((String)map.get("email"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("pages")) {
                if (map.get("pages") != null) {
                    table.addCell((String)map.get("pages"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("fromDate")) {
                if (map.get("fromDate") != null) {
                    table.addCell((String)map.get("fromDate"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("toDate")) {
                if (map.get("toDate") != null) {
                    table.addCell((String)map.get("toDate"));
                    continue;
                }
                table.addCell("");
                continue;
            }
            table.addCell("");
        }
    }

    private void writeAllTableData(PdfPTable table, List<OrgTrackerDTO> trackerDTOS) {
        ArrayList mapList = new ArrayList();
        if (CollectionUtils.isNotEmpty(trackerDTOS)) {
            for (Object _obj_orgTrackerDTO : trackerDTOS) {
                OrgTrackerDTO orgTrackerDTO = (OrgTrackerDTO) _obj_orgTrackerDTO;
                if (!Objects.nonNull(orgTrackerDTO)) continue;
                HashMap stringMap = new HashMap();
                stringMap.put("DeptOrDesignationName", orgTrackerDTO.getParentName());
                stringMap.put("parentName", orgTrackerDTO.getParentName());
                stringMap.put("ownerName", orgTrackerDTO.getOwnerName());
                stringMap.put("designation", orgTrackerDTO.getDesignation());
                stringMap.put("email", orgTrackerDTO.getEmail());
                stringMap.put("pages", orgTrackerDTO.getPages());
                stringMap.put("fromDate", orgTrackerDTO.getFromDate());
                stringMap.put("toDate", orgTrackerDTO.getToDate());
                mapList.add(stringMap);
            }
        }
        for (Object _obj_map : mapList) {
            Map map = (Map) _obj_map;
            if (map == null) continue;
            if (map.containsKey("DeptOrDesignationName")) {
                table.addCell((String)map.get("DeptOrDesignationName"));
            } else {
                table.addCell("");
            }
            if (map.containsKey("parentName")) {
                table.addCell((String)map.get("parentName"));
            } else {
                table.addCell("");
            }
            if (map.containsKey("ownerName")) {
                if (map.get("ownerName") != null) {
                    table.addCell((String)map.get("ownerName"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("designation")) {
                if (map.get("designation") != null) {
                    table.addCell((String)map.get("designation"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("email")) {
                if (map.get("email") != null) {
                    table.addCell((String)map.get("email"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("pages")) {
                if (map.get("pages") != null) {
                    table.addCell((String)map.get("pages"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("fromDate")) {
                if (map.get("fromDate") != null) {
                    table.addCell((String)map.get("fromDate"));
                } else {
                    table.addCell("");
                }
            } else {
                table.addCell("");
            }
            if (map.containsKey("toDate")) {
                if (map.get("toDate") != null) {
                    table.addCell((String)map.get("toDate"));
                    continue;
                }
                table.addCell("");
                continue;
            }
            table.addCell("");
        }
    }
}

