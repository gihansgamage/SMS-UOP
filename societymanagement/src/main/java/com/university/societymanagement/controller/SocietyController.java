package com.university.societymanagement.controller;

import com.university.societymanagement.entity.Society;
import com.university.societymanagement.service.SocietyService;
import com.university.societymanagement.service.EmailService;
import com.university.societymanagement.service.ActivityLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/societies")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class SocietyController {

    @Autowired
    private SocietyService societyService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ActivityLogService activityLogService;

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitSocietyApplication(
            @RequestBody Map<String, Object> societyData,
            HttpServletRequest request) {
        try {
            // Save society application
            Society society = societyService.saveSociety(societyData);

            // Log activity
            String ipAddress = getClientIpAddress(request);
            activityLogService.logActivity(
                    society.getApplicantEmail(),
                    "SOCIETY_APPLICATION_SUBMITTED",
                    "New society application submitted: " + society.getSocietyName(),
                    ipAddress,
                    society.getId()
            );

            // Send notification to Faculty Dean
            emailService.sendNotificationToAdmin(
                    "FACULTY_DEAN",
                    "New Society Application Pending Review",
                    "A new society application '" + society.getSocietyName() + "' has been submitted and requires your review."
            );

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Application submitted successfully");
            response.put("societyId", society.getId());
            response.put("status", society.getApprovalStatus().toString());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to submit application: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getSocietyById(@PathVariable Long id) {
        try {
            Society society = societyService.getSocietyById(id);
            if (society == null) {
                return ResponseEntity.notFound().build();
            }

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("society", society);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to fetch society: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            return request.getRemoteAddr();
        } else {
            return xForwardedForHeader.split(",")[0];
        }
    }
}
