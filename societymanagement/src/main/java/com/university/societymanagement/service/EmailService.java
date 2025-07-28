package com.university.societymanagement.service;

import com.university.societymanagement.entity.Admin;
import com.university.societymanagement.entity.Society;
import com.university.societymanagement.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private AdminRepository adminRepository;

    public void sendEmail(String to, String subject, String message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(to);
            mailMessage.setSubject(subject);
            mailMessage.setText(message);
            mailMessage.setFrom("noreply@university.edu");

            mailSender.send(mailMessage);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    public void sendApprovalNotification(Society society, String approvedBy, String nextApprover) {
        String subject = "Society Application Update - " + society.getSocietyName();
        String message = String.format(
                "Dear %s,\n\n" +
                        "Your society registration application for '%s' has been approved by %s.\n\n" +
                        "Next Step: Your application will now be reviewed by %s.\n\n" +
                        "Current Status: %s\n" +
                        "Submitted Date: %s\n\n" +
                        "You will receive another notification once the next review is completed.\n\n" +
                        "Best regards,\n" +
                        "University Administration",
                society.getApplicantName(),
                society.getSocietyName(),
                approvedBy,
                nextApprover,
                society.getApprovalStatus().toString().replace("_", " "),
                society.getCreatedAt().toString()
        );

        sendEmail(society.getApplicantEmail(), subject, message);
    }

    public void sendFinalApprovalEmail(Society society) {
        String subject = "Society Application APPROVED - " + society.getSocietyName();
        String message = String.format(
                "Dear %s,\n\n" +
                        "Congratulations! Your society registration application for '%s' has been FULLY APPROVED by the Vice Chancellor.\n\n" +
                        "Your society is now officially registered with the university.\n\n" +
                        "Application Details:\n" +
                        "- Society Name: %s\n" +
                        "- Final Approval Date: %s\n" +
                        "- Status: APPROVED\n\n" +
                        "You can now proceed with your society activities according to university guidelines.\n\n" +
                        "Best regards,\n" +
                        "University Administration",
                society.getApplicantName(),
                society.getSocietyName(),
                society.getSocietyName(),
                society.getViceChancellorApprovedAt().toString()
        );

        sendEmail(society.getApplicantEmail(), subject, message);
    }

    public void sendRejectionEmail(Society society, String reason) {
        String subject = "Society Application REJECTED - " + society.getSocietyName();
        String message = String.format(
                "Dear %s,\n\n" +
                        "We regret to inform you that your society registration application for '%s' has been rejected.\n\n" +
                        "Rejection Reason:\n%s\n\n" +
                        "Rejected by: %s\n" +
                        "Rejection Date: %s\n\n" +
                        "If you believe this decision was made in error or if you would like to address the concerns raised, " +
                        "please contact the administration office.\n\n" +
                        "You may resubmit your application after addressing the mentioned issues.\n\n" +
                        "Best regards,\n" +
                        "University Administration",
                society.getApplicantName(),
                society.getSocietyName(),
                reason,
                society.getRejectedBy(),
                society.getRejectedAt().toString()
        );

        sendEmail(society.getApplicantEmail(), subject, message);
    }

    public void sendNotificationToAdmin(String adminType, String subject, String message) {
        try {
            Admin.AdminType type = Admin.AdminType.valueOf(adminType);
            List<Admin> admins = adminRepository.findByTypeAndIsActive(type, true);

            for (Admin admin : admins) {
                sendEmail(admin.getEmail(), subject, message);
            }
        } catch (Exception e) {
            System.err.println("Failed to send admin notification: " + e.getMessage());
        }
    }
}
