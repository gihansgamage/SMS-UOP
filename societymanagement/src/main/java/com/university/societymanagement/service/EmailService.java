package com.university.societymanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(to);
            mailMessage.setSubject(subject);
            mailMessage.setText(message);
            mailMessage.setFrom("noreply@university.ac.lk");
            
            mailSender.send(mailMessage);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    public void sendRegistrationSubmissionEmail(String applicantEmail, String societyName) {
        String subject = "Society Registration Application Received";
        String message = String.format(
            "Dear Applicant,\n\n" +
            "Your society registration application for \"%s\" has been received and is now under review.\n\n" +
            "The approval process involves the following steps:\n" +
            "1. Faculty Dean Review\n" +
            "2. Assistant Registrar Review\n" +
            "3. Vice Chancellor Final Approval\n\n" +
            "You will receive email notifications at each stage of the approval process.\n\n" +
            "Thank you for your submission.\n\n" +
            "Best regards,\n" +
            "University Administration",
            societyName
        );
        
        sendEmail(applicantEmail, subject, message);
    }

    public void sendApprovalEmail(String applicantEmail, String societyName, String approverRole, boolean approved, String comments) {
        String subject = approved ? 
            "Society Registration - " + approverRole + " Approval" : 
            "Society Registration - " + approverRole + " Rejection";
            
        String status = approved ? "approved" : "rejected";
        String message = String.format(
            "Dear Applicant,\n\n" +
            "Your society registration application for \"%s\" has been %s by the %s.\n\n" +
            (comments != null && !comments.isEmpty() ? "Comments: " + comments + "\n\n" : "") +
            (approved ? 
                "Your application will now proceed to the next stage of approval.\n\n" :
                "Please contact the administration for more information.\n\n") +
            "Best regards,\n" +
            "University Administration",
            societyName, status, approverRole
        );
        
        sendEmail(applicantEmail, subject, message);
    }

    public void sendFinalApprovalEmail(String applicantEmail, String societyName) {
        String subject = "Society Registration - Final Approval";
        String message = String.format(
            "Dear Applicant,\n\n" +
            "Congratulations! Your society registration application for \"%s\" has been fully approved.\n\n" +
            "Your society is now officially registered with the university.\n\n" +
            "Best regards,\n" +
            "University Administration",
            societyName
        );
        
        sendEmail(applicantEmail, subject, message);
    }

    public void sendPermissionApprovalEmail(String applicantEmail, String eventName, boolean approved, String comments) {
        String subject = approved ? 
            "Event Permission Approved" : 
            "Event Permission Rejected";
            
        String status = approved ? "approved" : "rejected";
        String message = String.format(
            "Dear Applicant,\n\n" +
            "Your permission request for the event \"%s\" has been %s.\n\n" +
            (comments != null && !comments.isEmpty() ? "Comments: " + comments + "\n\n" : "") +
            "Best regards,\n" +
            "University Administration",
            eventName, status
        );
        
        sendEmail(applicantEmail, subject, message);
    }
}
