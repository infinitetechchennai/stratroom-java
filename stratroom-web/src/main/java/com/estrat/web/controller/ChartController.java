/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.ChartController
 *  com.estrat.web.dto.ChartDTO
 *  com.estrat.web.exception.RequestException
 *  com.estrat.web.service.ChartService
 *  com.estrat.web.util.RequestSessionUtil
 *  javax.servlet.http.HttpServletRequest
 *  org.apache.commons.compress.archivers.ArchiveEntry
 *  org.apache.commons.compress.archivers.zip.ZipArchiveEntry
 *  org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.beans.factory.annotation.Value
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.MediaType
 *  org.springframework.http.ResponseEntity
 *  org.springframework.http.ResponseEntity$BodyBuilder
 *  org.springframework.util.FileCopyUtils
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 *  org.springframework.web.multipart.MultipartFile
 */
package com.estrat.web.controller;

import com.estrat.web.dto.ChartDTO;
import com.estrat.web.exception.RequestException;
import com.estrat.web.service.ChartService;
import com.estrat.web.util.RequestSessionUtil;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UncheckedIOException;
import java.nio.file.FileVisitOption;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.FileAttribute;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ChartController {
    @Autowired
    protected ChartService chartService;
    @Autowired
    protected RequestSessionUtil sessionUtil;
    @Value(value="${upload.path}")
    private String UPLOAD_DIR;

    @PostMapping(value={"/charts"})
    public ResponseEntity<ChartDTO> saveCharts(@RequestBody ChartDTO chartDTO, HttpServletRequest request) throws RequestException {
        chartDTO.setCreatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.chartService.saveCharts(chartDTO), HttpStatus.OK);
    }

    @PutMapping(value={"/charts"})
    public ResponseEntity<ChartDTO> updateCharts(@RequestBody ChartDTO chartDTO, HttpServletRequest request) throws RequestException {
        chartDTO.setUpdatedBy(Long.valueOf(this.sessionUtil.getSessionId(request)).longValue());
        return new ResponseEntity(this.chartService.updateCharts(chartDTO), HttpStatus.OK);
    }

    @GetMapping(value={"/charts/{id}"})
    public ResponseEntity<ChartDTO> retrieveChartsById(@PathVariable(value="id") Long id) throws RequestException {
        return new ResponseEntity(this.chartService.retrieveCharts(id), HttpStatus.OK);
    }

    @GetMapping(value={"/retrieveChartsList/{empId}"})
    public ResponseEntity<List<ChartDTO>> findAllByEmpId(@PathVariable(value="empId") Long empId, @RequestParam(value="pageId", required=false) String pageId) throws RequestException {
        List ChartDTOList = this.chartService.findAllByEmpId(empId, pageId);
        return new ResponseEntity(ChartDTOList, HttpStatus.OK);
    }

    @DeleteMapping(value={"/charts/{id}"})
    public ResponseEntity<Boolean> removeChartsById(@PathVariable(value="id") Long id, HttpServletRequest request) throws RequestException {
        this.chartService.removeCharts(id);
        return new ResponseEntity(true, HttpStatus.OK);
    }

    @PostMapping(value={"/uploadStrategyMap/{pagenumber}"})
    public ResponseEntity<String> uploadStrategyMap(@RequestParam(value="scoreCardData[]") MultipartFile[] files, @PathVariable String pagenumber) {
        for (Object _obj_file : files) {
            MultipartFile file = (MultipartFile) _obj_file;
            try {
                this.saveFile(file, pagenumber);
            }
            catch (IOException e) {
                return new ResponseEntity(("Failed to store file " + file.getOriginalFilename()), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return ResponseEntity.ok("Files uploaded successfully!");
    }

    private void saveFile(MultipartFile file, String pagenumber) throws IOException {
        UUID uuid = UUID.randomUUID();
        Path uploadPath = Paths.get(this.UPLOAD_DIR, pagenumber, uuid.toString());
        if (!Files.exists(uploadPath.getParent(), new LinkOption[0])) {
            Files.createDirectories(uploadPath.getParent(), new FileAttribute[0]);
        }
        Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
    }

    @GetMapping(value={"/downloadStrategyMap/{pagenumber}"})
    public ResponseEntity<?> downloadStrategyMap(@PathVariable String pagenumber) {
        try {
            Path directoryPath = Paths.get(this.UPLOAD_DIR, pagenumber);
            if (!Files.exists(directoryPath, new LinkOption[0])) {
                return ResponseEntity.notFound().build();
            }
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            try (ZipArchiveOutputStream zipOutputStream = new ZipArchiveOutputStream((OutputStream)byteArrayOutputStream);){
                Files.walk(directoryPath, new FileVisitOption[0]).filter(path -> !Files.isDirectory(path, new LinkOption[0])).forEach(path -> {
                    ZipArchiveEntry zipEntry = new ZipArchiveEntry(directoryPath.relativize((Path)path).toFile(), path.getFileName().toString());
                    try {
                        zipOutputStream.putArchiveEntry(zipEntry);
                        Files.copy(path, (OutputStream)zipOutputStream);
                        zipOutputStream.closeArchiveEntry();
                    }
                    catch (IOException e) {
                        throw new UncheckedIOException(e);
                    }
                });
                zipOutputStream.finish();
            }
            return ((ResponseEntity.BodyBuilder)ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).header("Content-Disposition", new String[]{"attachment; filename=\"" + pagenumber + ".zip\""})).body(byteArrayOutputStream.toByteArray());
        }
        catch (IOException e) {
            return new ResponseEntity("Failed to generate ZIP", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value={"/downloadStrategyMap/images/{pagenumber}"})
    public ResponseEntity<List<String>> getAllImages(@PathVariable String pagenumber) {
        String specificDir = this.UPLOAD_DIR + pagenumber + "/";
        File folder = new File(specificDir);
        File[] listOfFiles = folder.listFiles();
        List imageFiles = Arrays.stream(listOfFiles).filter(file -> file.isFile()).map(File::getName).collect(Collectors.toList());
        return ResponseEntity.ok(imageFiles);
    }

    @GetMapping(value={"/downloadStrategyMap/imagesbyname/{pagenumber}"})
    public String getImageAsBase64(@PathVariable String pagenumber, @RequestParam String imageName) throws Exception {
        Path imagePath = Paths.get(this.UPLOAD_DIR, pagenumber, imageName);
        byte[] fileContent = FileCopyUtils.copyToByteArray((File)imagePath.toFile());
        return Base64.getEncoder().encodeToString(fileContent);
    }
}

