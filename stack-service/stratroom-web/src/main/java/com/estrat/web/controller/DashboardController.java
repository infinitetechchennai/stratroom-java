/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.controller.DashboardController
 *  javax.servlet.http.HttpServletRequest
 *  javax.servlet.http.HttpServletResponse
 *  org.springframework.stereotype.Controller
 *  org.springframework.ui.Model
 *  org.springframework.web.bind.annotation.PathVariable
 *  org.springframework.web.bind.annotation.RequestMapping
 *  org.springframework.web.bind.annotation.RequestMethod
 *  org.springframework.web.bind.annotation.RequestParam
 *  org.springframework.web.context.request.WebRequest
 */
package com.estrat.web.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;

@Controller
public class DashboardController {
    @RequestMapping(value={"/dashboard/{empId}"}, method={RequestMethod.GET})
    public String dashBoardView(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam(value="pageId") String pageId, @PathVariable(value="empId") long empId) {
        model.addAttribute("dashboardId", pageId);
        model.addAttribute("pageEmpId", empId);
        return "pages/dashboard/dashboard";
    }

    @RequestMapping(value={"/whiteboard/{empId}"}, method={RequestMethod.GET})
    public String whiteboardView(WebRequest webRequest, HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam(value="pageId") String pageId, @PathVariable(value="empId") long empId) {
        model.addAttribute("dashboardId", pageId);
        model.addAttribute("pageEmpId", empId);
        return "pages/dashboard/whiteboard";
    }
}

