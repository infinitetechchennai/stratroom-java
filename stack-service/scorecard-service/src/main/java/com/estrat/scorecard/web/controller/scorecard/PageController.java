/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.scorecard.dto.CockpitViewDTO
 *  com.estrat.scorecard.dto.PageDTO
 *  com.estrat.scorecard.dto.ScoreCardResponseDTO
 *  com.estrat.scorecard.exception.RequestException
 *  com.estrat.scorecard.service.PageService
 *  com.estrat.scorecard.web.controller.scorecard.PageController
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.http.HttpStatus
 *  org.springframework.http.ResponseEntity
 *  org.springframework.web.bind.annotation.DeleteMapping
 *  org.springframework.web.bind.annotation.GetMapping
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.PostMapping
 *  org.springframework.web.bind.annotation.PutMapping
 *  org.springframework.web.bind.annotation.RequestBody
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.bind.annotation.RestController
 */
package com.estrat.scorecard.web.controller.scorecard;

import com.estrat.scorecard.dto.CockpitViewDTO;
import com.estrat.scorecard.dto.PageDTO;
import com.estrat.scorecard.dto.ScoreCardResponseDTO;
import com.estrat.scorecard.exception.RequestException;
import com.estrat.scorecard.service.PageService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PageController {
    @Autowired
    private PageService pageService;

    @GetMapping(value={"/pages/{id}"})
    public ResponseEntity<PageDTO> getPageDetails(@PathVariable long id) {
        return this.pageService.getPageDetails(id);
    }

    @GetMapping(value={"/getDefaultPage"})
    public ResponseEntity<PageDTO> getDefaultPage(@RequestParam(value="pageType") String pageType) {
        return this.pageService.getDefaultPage(pageType);
    }

    @GetMapping(value={"/pages/{pageName}/{empId}"})
    public ResponseEntity<PageDTO> getPageDetails(@PathVariable String pageName, @PathVariable long empId) {
        return this.pageService.getPageDetails(pageName, empId);
    }

    @PostMapping(value={"/pages"})
    public ResponseEntity<ScoreCardResponseDTO> saveOrUpdateDetails(@RequestBody PageDTO pageDTO) {
        pageDTO.setCreatedTime(LocalDateTime.now());
        return this.pageService.saveDetails(pageDTO);
    }

    @DeleteMapping(value={"/pages/{id}"})
    public ResponseEntity<Boolean> deletePageDetails(@PathVariable long id) {
        return this.pageService.deletePageDetails(id);
    }

    @PutMapping(value={"/pages"})
    public ResponseEntity<ScoreCardResponseDTO> updateDetails(@RequestBody PageDTO pageDTO) {
        pageDTO.setUpdatedTime(LocalDateTime.now());
        return this.pageService.updateDetails(pageDTO);
    }

    @GetMapping(value={"/pageList/{empId}"})
    public ResponseEntity<List<PageDTO>> pageList(@PathVariable(value="empId") long empId) {
        List pageList = this.pageService.pageList(empId);
        return new ResponseEntity((Object)pageList, HttpStatus.OK);
    }

    @GetMapping(value={"/pageDeptList/{deptId}"})
    public ResponseEntity<List<PageDTO>> pageDeptList(@PathVariable(value="deptId") long deptId, @RequestParam(value="pageType") String pageType) {
        List pageList = this.pageService.pageDeptList(deptId, pageType);
        return new ResponseEntity((Object)pageList, HttpStatus.OK);
    }

    @GetMapping(value={"/pageDeptList"})
    public ResponseEntity<List<PageDTO>> pageDeptListType(@RequestParam(value="pageType") String pageType) {
        List pageList = this.pageService.pageDeptList(pageType);
        return new ResponseEntity((Object)pageList, HttpStatus.OK);
    }

    @GetMapping(value={"/checkpages/{pagename}/{empId}"})
    public ResponseEntity<Map<String, Object>> checkpages(@PathVariable(value="pagename") String pageName, @PathVariable long empId) {
        return this.pageService.checkpages(pageName, empId);
    }

    @GetMapping(value={"/emp/checkDetails"})
    public ResponseEntity<PageDTO> checkDetails(@RequestParam(value="pageId") String pageId) {
        return this.pageService.checkPageType(pageId);
    }

    @GetMapping(value={"/pageListByPageType/{empId}"})
    public ResponseEntity<List<PageDTO>> pageListByPageType(@PathVariable(value="empId") long empId, @RequestParam(value="pageType") String pageType) {
        List pageList = this.pageService.pageListByPageType(empId, pageType);
        return new ResponseEntity((Object)pageList, HttpStatus.OK);
    }

    @PutMapping(value={"updateColumnView"})
    public ResponseEntity<PageDTO> updateColumnView(@RequestBody CockpitViewDTO cockpitViewDTO) throws RequestException {
        return this.pageService.updateColumnView(cockpitViewDTO);
    }

    @GetMapping(value={"/pageListByDeptPageType/{deptId}"})
    public ResponseEntity<List<PageDTO>> pageListByDeptPageType(@PathVariable(value="deptId") long deptId, @RequestParam(value="pageType") String pageType) {
        List pageList = this.pageService.pageListByDeptPageType(deptId, pageType);
        return new ResponseEntity((Object)pageList, HttpStatus.OK);
    }

    @GetMapping(value={"/pageByDeptListPageType"})
    public ResponseEntity<List<PageDTO>> pageByDeptListPageType(@RequestParam(value="deptId") String deptId, @RequestParam(value="pageType") String pageType) {
        List pageList = this.pageService.pageByDeptListPageType(deptId, pageType);
        return new ResponseEntity((Object)pageList, HttpStatus.OK);
    }

    @GetMapping(value={"/pageByPinnedList"})
    public ResponseEntity<List<PageDTO>> findAllByPinnedList(@RequestParam(value="deptId") Long deptId) {
        List pageList = this.pageService.findAllByPinnedList(deptId);
        return new ResponseEntity((Object)pageList, HttpStatus.OK);
    }
}

