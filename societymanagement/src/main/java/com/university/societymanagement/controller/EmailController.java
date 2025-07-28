package com.university.societymanagement.controller;

import com.university.societymanagement.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendEmail(@RequestBody Map<String, String> emailData) {
        try {
            String to = emailData.get("to");
            String subject = emailData.get("subject");
            String message = emailData.get("message");

            if (to == null || subject == null || message == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Missing required fields: to, subject, message");
                return ResponseEntity.status(400).body(errorResponse);
            }

            emailService.sendEmail(to, subject, message);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Email sent successfully");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to send email: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
