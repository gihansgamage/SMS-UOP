package com.university.societymanagement.controller;

import com.university.societymanagement.entity.Admin;
import com.university.societymanagement.entity.Society;
import com.university.societymanagement.entity.ActivityLog;
import com.university.societymanagement.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private SocietyService societyService;

    @Autowired
    private ActivityLogService activityLogService;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard(
            @RequestHeader("Authorization") String authHeader,
            HttpServletRequest request) {
        try {
            String email = getEmailFromAuthHeader(authHeader);
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
            }

            Optional<Admin> adminOpt = adminService.findByEmailAndActive(email);
            if (adminOpt.isEmpty()) {
                return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
            }

            Admin admin = adminOpt.get();
            Map<String, Object> dashboardData = new HashMap<>();

            dashboardData.put("email", admin.getEmail());
            dashboardData.put("name", admin.getName());
            dashboardData.put("type", admin.getType().toString());
            dashboardData.put("lastLogin", admin.getLastLogin());

            // Get statistics based on admin type
            dashboardData.put("pendingCount", societyService.getPendingCountForAdmin(admin.getType()));
            dashboardData.put("approvedCount", societyService.getApprovedCount());
            dashboardData.put("rejectedCount", societyService.getRejectedCount());
            dashboardData.put("totalCount", societyService.getTotalCount());

            // Log dashboard access
            String ipAddress = getClientIpAddress(request);
            activityLogService.logActivity(
                    email,
                    "DASHBOARD_ACCESS",
                    "Accessed admin dashboard",
                    ipAddress
            );

            return ResponseEntity.ok(dashboardData);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    @GetMapping("/pending-societies")
    public ResponseEntity<Map<String, Object>> getPendingSocieties(
            @RequestHeader("Authorization") String authHeader,
            HttpServletRequest request) {
        try {
            String email = getEmailFromAuthHeader(authHeader);
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
            }

            Admin.AdminType adminType = adminService.getAdminType(email);
            if (adminType == null) {
                return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
            }

            List<Society> pendingSocieties = societyService.getPendingSocietiesForAdmin(adminType);

            Map<String, Object> response = new HashMap<>();
            response.put("societies", pendingSocieties);
            response.put("adminType", adminType.toString());

            // Log activity
            String ipAddress = getClientIpAddress(request);
            activityLogService.logActivity(
                    email,
                    "PENDING_SOCIETIES_ACCESS",
                    "Accessed pending societies list",
                    ipAddress
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    @PostMapping("/societies/{societyId}/approve")
    public ResponseEntity<Map<String, Object>> approveSociety(
            @PathVariable Long societyId,
            @RequestHeader("Authorization") String authHeader,
            HttpServletRequest request) {
        try {
            String email = getEmailFromAuthHeader(authHeader);
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
            }

            Admin.AdminType adminType = adminService.getAdminType(email);
            if (adminType == null) {
                return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
            }

            String ipAddress = getClientIpAddress(request);
            Society approvedSociety = societyService.approveSociety(societyId, email, adminType, ipAddress);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Society approved successfully");
            response.put("society", approvedSociety);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @PostMapping("/societies/{societyId}/reject")
    public ResponseEntity<Map<String, Object>> rejectSociety(
            @PathVariable Long societyId,
            @RequestBody Map<String, String> requestBody,
            @RequestHeader("Authorization") String authHeader,
            HttpServletRequest request) {
        try {
            String email = getEmailFromAuthHeader(authHeader);
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
            }

            String reason = requestBody.get("reason");
            if (reason == null || reason.trim().isEmpty()) {
                return ResponseEntity.status(400).body(Map.of("error", "Rejection reason is required"));
            }

            String ipAddress = getClientIpAddress(request);
            Society rejectedSociety = societyService.rejectSociety(societyId, email, reason, ipAddress);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Society rejected successfully");
            response.put("society", rejectedSociety);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/all-societies")
    public ResponseEntity<Map<String, Object>> getAllSocieties(
            @RequestHeader("Authorization") String authHeader,
            HttpServletRequest request) {
        try {
            String email = getEmailFromAuthHeader(authHeader);
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
            }

            List<Society> societies = societyService.getAllSocieties();

            Map<String, Object> response = new HashMap<>();
            response.put("societies", societies);

            // Log activity
            String ipAddress = getClientIpAddress(request);
            activityLogService.logActivity(
                    email,
                    "ALL_SOCIETIES_ACCESS",
                    "Accessed all societies list",
                    ipAddress
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    @GetMapping("/activity-logs")
    public ResponseEntity<Map<String, Object>> getActivityLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestHeader("Authorization") String authHeader,
            HttpServletRequest request) {
        try {
            String email = getEmailFromAuthHeader(authHeader);
            if (email == null) {
                return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
            }

            Page<ActivityLog> logsPage = activityLogService.getActivityLogs(page, size);

            Map<String, Object> response = new HashMap<>();
            response.put("logs", logsPage.getContent());
            response.put("currentPage", logsPage.getNumber());
            response.put("totalPages", logsPage.getTotalPages());
            response.put("totalElements", logsPage.getTotalElements());

            // Log activity
            String ipAddress = getClientIpAddress(request);
            activityLogService.logActivity(
                    email,
                    "ACTIVITY_LOGS_ACCESS",
                    "Accessed activity logs (page " + page + ")",
                    ipAddress
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error"));
        }
    }

    private String getEmailFromAuthHeader(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtService.validateToken(token) && !jwtService.isTokenExpired(token)) {
                return jwtService.getEmailFromToken(token);
            }
        }
        return null;
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
