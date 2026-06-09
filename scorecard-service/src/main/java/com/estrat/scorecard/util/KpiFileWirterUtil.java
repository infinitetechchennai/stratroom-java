/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.KPIDTO
 *  com.estrat.scorecard.util.KpiFileWirterUtil
 *  com.itextpdf.text.DocListener
 *  com.itextpdf.text.Document
 *  com.itextpdf.text.html.simpleparser.HTMLWorker
 *  com.itextpdf.text.pdf.PdfWriter
 *  Logger
 *  org.springframework.core.io.InputStreamResource
 *  org.springframework.http.HttpHeaders
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.MediaType
 *  org.springframework.http.ResponseEntity
 *  org.springframework.util.MultiValueMap
 */
package com.estrat.scorecard.util;

import com.estrat.scorecard.dto.KPIDTO;
import com.itextpdf.text.DocListener;
import com.itextpdf.text.Document;
import com.itextpdf.text.html.simpleparser.HTMLWorker;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.io.StringReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

public class KpiFileWirterUtil {
    private Logger logger = LoggerFactory.getLogger(KpiFileWirterUtil.class);

    public String prefreStringValue(KPIDTO kpidto) {
        String content = null;
        try {
            String Id = Long.toString(kpidto.getId());
            String owner = Long.toString(kpidto.getOwner());
            String createdBy = Long.toString(kpidto.getCreatedBy());
            String updatedBy = Long.toString(kpidto.getCreatedBy());
            String CreatedTime = kpidto.getCreatedTime().toString();
            String updatedTime = kpidto.getUpdatedTime().toString();
            String formula = kpidto.getKpiFormula().getFormula();
            String kpiValue = kpidto.getKpiValue().toString();
            content = "<p>Id: 5" + Id + "</p>\n\n<p>owner : " + owner + "</p>\n\n<p>createdBy: " + createdBy + "</p>\n\n<p>formula: " + formula + "</p>\n\n<p>kpiValue: " + kpiValue + "</p>\n\n<p>CreatedTime: " + CreatedTime + "</p>\n\n<p>updatedBy : " + updatedBy + "</p>\n\n<p>updatedTime : " + updatedTime + "</p>\n\n";
            content = content.replaceAll("&nbsp;", "");
        }
        catch (Exception e) {
            this.logger.error("Exception occured", e);
        }
        return content;
    }

    public boolean downloadkpiPdf(KPIDTO kpi) {
        boolean status = false;
        try {
            String content = this.prefreStringValue(kpi);
            content = content.replaceAll("&nbsp;", "");
            String path = "KpiDetails.pdf";
            FileOutputStream file = new FileOutputStream(new File(path));
            Document document = new Document();
            PdfWriter.getInstance((Document)document, (OutputStream)file);
            document.open();
            HTMLWorker htmlWorker = new HTMLWorker((DocListener)document);
            htmlWorker.parse((Reader)new StringReader(content));
            status = true;
            document.close();
            ((OutputStream)file).close();
        }
        catch (Exception e) {
            this.logger.error("Exception occured", e);
        }
        return status;
    }

    public ResponseEntity<InputStreamResource> downloadPdf(KPIDTO kpi) throws IOException {
        this.downloadkpiPdf(kpi);
        String fileName = "KpiDetails.pdf";
        File file = new File("KpiDetails.pdf");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType((String)"application/pdf"));
        headers.add("Content-Disposition", "attachment; filename=" + fileName);
        headers.setContentLength(file.length());
        ResponseEntity response = new ResponseEntity((Object)new InputStreamResource((InputStream)new FileInputStream(file)), (MultiValueMap)headers, HttpStatus.OK);
        return response;
    }

    /*
     * Exception decompiling
     */
    public static ByteArrayInputStream KpiDetailsToExcel(KPIDTO kpi) throws IOException {
        /*
         * This method has failed to decompile.  When submitting a bug report, please provide this stack trace, and (if you hold appropriate legal rights) the relevant class file.
         * 
         * org.benf.cfr.reader.util.ConfusedCFRException: Started 2 blocks at once
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.getStartingBlocks(Op04StructuredStatement.java:412)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op04StructuredStatement.buildNestedBlocks(Op04StructuredStatement.java:487)
         *     at org.benf.cfr.reader.bytecode.analysis.opgraph.Op03SimpleStatement.createInitialStructuredBlock(Op03SimpleStatement.java:736)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisInner(CodeAnalyser.java:850)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysisOrWrapFail(CodeAnalyser.java:278)
         *     at org.benf.cfr.reader.bytecode.CodeAnalyser.getAnalysis(CodeAnalyser.java:201)
         *     at org.benf.cfr.reader.entities.attributes.AttributeCode.analyse(AttributeCode.java:94)
         *     at org.benf.cfr.reader.entities.Method.analyse(Method.java:531)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseMid(ClassFile.java:1055)
         *     at org.benf.cfr.reader.entities.ClassFile.analyseTop(ClassFile.java:942)
         *     at org.benf.cfr.reader.Driver.doJarVersionTypes(Driver.java:257)
         *     at org.benf.cfr.reader.Driver.doJar(Driver.java:139)
         *     at org.benf.cfr.reader.CfrDriverImpl.analyse(CfrDriverImpl.java:76)
         *     at org.benf.cfr.reader.Main.main(Main.java:54)
         */
        throw new IllegalStateException("Decompilation failed");
    }
}

