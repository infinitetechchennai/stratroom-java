/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  com.estrat.web.config.EmailConfig
 *  com.estrat.web.service.EmailService
 *  org.springframework.beans.factory.annotation.Autowired
 *  org.springframework.mail.SimpleMailMessage
 *  org.springframework.mail.javamail.JavaMailSender
 *  org.springframework.stereotype.Service
 */
package com.estrat.web.service;

import com.estrat.web.config.EmailConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private EmailConfig emailConfig;

    public void sendMail(String toEmail, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailMessage.setFrom(this.emailConfig.getUserName());
        this.javaMailSender.send(mailMessage);
    }
}

