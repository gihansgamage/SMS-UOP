package com.university.societymanagement.controller;

import com.university.societymanagement.entity.ActivityLog;
import com.university.societymanagement.entity.AdminUser;
import com.university.societymanagement.entity.SocietyRegistration;
import com.university.societymanagement.service.ActivityLogService;
import com.university.societymanagement.service.AdminUserService;
import com.university.societymanagement.service.SocietyRegistrationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminUserService adminUserService;

    @Autowired
    private SocietyRegistrationService registrationService;

    @Autowired
    private ActivityLogService activityLogService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(Authentication authentication, HttpServletRequest request) {
        try {
            String email = authentication.getName();
            Optional<AdminUser> adminOpt = adminUserService.findByEmail(email);
            
            if (adminOpt.isPresent()) {
                AdminUser admin = adminOpt.get();
                
                // Log dashboard access
                String ipAddress = getClientIpAddress(request);
                activityLogService.logActivity(admin, "DASHBOARD_ACCESS", 
                        "Accessed admin dashboard", ipAddress);
                
                Map<String, Object> response = new HashMap<>();
                response.put("name", admin.getName());
                response.put("email", admin.getEmail());
                response.put("type", admin.getAdminType().toString());
                response.put("faculty", admin.getFaculty());
                response.put("lastLogin", admin.getLastLogin());
                
                // Add statistics based on admin type
                if (admin.getAdminType() == AdminUser.AdminType.FACULTY_DEAN) {
                    response.put("pendingSocietyCount", 
                            registrationService.getPendingCountForFaculty(admin.getFaculty()));
                } else {
                    response.put("pendingSocietyCount", registrationService.getPendingCount());
                }
                
                response.put("approvedSocietyCount", registrationService.getApprovedCount());
                response.put("pendingRenewalCount", 0L); // TODO: Implement renewal service
                response.put("pendingPermissionCount", 0L); // TODO: Implement permission service
                
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body("Admin not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to load dashboard: " + e.getMessage());
        }
    }

    @GetMapping("/activity-logs")
    public ResponseEntity<?> getActivityLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication,
            HttpServletRequest request) {
        try {
            String email = authentication.getName();
            Optional<AdminUser> adminOpt = adminUserService.findByEmail(email);
            
            if (adminOpt.isPresent()) {
                AdminUser admin = adminOpt.get();
                
                // Log activity logs access
                String ipAddress = getClientIpAddress(request);
                activityLogService.logActivity(admin, "ACTIVITY_LOGS_ACCESS", 
                        "Accessed activity logs", ipAddress);
                
                Pageable pageable = PageRequest.of(page, size);
                Page<ActivityLog> logs = activityLogService.getAllActivityLogs(pageable);
                
                Map<String, Object> response = new HashMap<>();
                response.put("logs", logs.getContent());
                response.put("currentPage", logs.getNumber());
                response.put("totalPages", logs.getTotalPages());
                response.put("totalElements", logs.getTotalElements());
                
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body("Admin not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to load activity logs: " + e.getMessage());
        }
    }

    @GetMapping("/all-admins")
    public ResponseEntity<?> getAllAdmins(Authentication authentication, HttpServletRequest request) {
        try {
            String email = authentication.getName();
            Optional<AdminUser> adminOpt = adminUserService.findByEmail(email);
            
            if (adminOpt.isPresent()) {
                AdminUser admin = adminOpt.get();
                
                // Log admin list access
                String ipAddress = getClientIpAddress(request);
                activityLogService.logActivity(admin, "ADMIN_LIST_ACCESS", 
                        "Accessed admin list", ipAddress);
                
                List<AdminUser> admins = adminUserService.getAllActiveAdmins();
                
                Map<String, Object> response = new HashMap<>();
                response.put("admins", admins);
                
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body("Admin not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to load admins: " + e.getMessage());
        }
    }

    @GetMapping("/pending-societies")
    public ResponseEntity<?> getPendingSocieties(Authentication authentication) {
        try {
            String email = authentication.getName();
            Optional<AdminUser> adminOpt = adminUserService.findByEmail(email);
            
            if (adminOpt.isPresent()) {
                AdminUser admin = adminOpt.get();
                List<SocietyRegistration> pendingSocieties;
                
                switch (admin.getAdminType()) {
                    case FACULTY_DEAN:
                        pendingSocieties = registrationService.getPendingRegistrationsForFaculty(admin.getFaculty());
                        break;
                    case ASSISTANT_REGISTRAR:
                        pendingSocieties = registrationService.getPendingRegistrationsForRegistrar();
                        break;
                    case VICE_CHANCELLOR:
                        pendingSocieties = registrationService.getPendingRegistrationsForVC();
                        break;
                    default:
                        pendingSocieties = List.of();
                }
                
                return ResponseEntity.ok(pendingSocieties);
            } else {
                return ResponseEntity.badRequest().body("Admin not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to load pending societies: " + e.getMessage());
        }
    }

    @PostMapping("/approve-society/{id}")
    public ResponseEntity<?> approveSociety(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            Optional<AdminUser> adminOpt = adminUserService.findByEmail(email);
            
            if (adminOpt.isPresent()) {
                AdminUser admin = adminOpt.get();
                String comments = request.get("comments");
                
                SocietyRegistration registration;
                switch (admin.getAdminType()) {
                    case FACULTY_DEAN:
                        registration = registrationService.approveByDean(id, admin, comments);
                        break;
                    case ASSISTANT_REGISTRAR:
                        registration = registrationService.approveByRegistrar(id, admin, comments);
                        break;
                    case VICE_CHANCELLOR:
                        registration = registrationService.approveByVC(id, admin, comments);
                        break;
                    default:
                        return ResponseEntity.badRequest().body("Unauthorized to approve societies");
                }
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Society approved successfully");
                response.put("registration", registration);
                
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body("Admin not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to approve society: " + e.getMessage());
        }
    }

    @PostMapping("/reject-society/{id}")
    public ResponseEntity<?> rejectSociety(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            Optional<AdminUser> adminOpt = adminUserService.findByEmail(email);
            
            if (adminOpt.isPresent()) {
                AdminUser admin = adminOpt.get();
                String comments = request.get("comments");
                
                // Only deans can reject (others can only approve or let it pass to next level)
                if (admin.getAdminType() == AdminUser.AdminType.FACULTY_DEAN) {
                    SocietyRegistration registration = registrationService.rejectByDean(id, admin, comments);
                    
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("message", "Society rejected successfully");
                    response.put("registration", registration);
                    
                    return ResponseEntity.ok(response);
                } else {
                    return ResponseEntity.badRequest().body("Only Faculty Deans can reject applications");
                }
            } else {
                return ResponseEntity.badRequest().body("Admin not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to reject society: " + e.getMessage());
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
