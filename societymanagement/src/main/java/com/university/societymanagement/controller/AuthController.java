package com.university.societymanagement.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.university.societymanagement.entity.AdminUser;
import com.university.societymanagement.service.ActivityLogService;
import com.university.societymanagement.service.AdminUserService;
import com.university.societymanagement.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AdminUserService adminUserService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ActivityLogService activityLogService;

    @Value("${google.client.id}")
    private String googleClientId;

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        try {
            String token = request.get("token");
            
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                // Check if user is an admin
                Optional<AdminUser> adminOpt = adminUserService.findByEmail(email);
                if (adminOpt.isPresent() && adminOpt.get().getIsActive()) {
                    AdminUser admin = adminOpt.get();
                    
                    // Update last login
                    adminUserService.updateLastLogin(email);
                    
                    // Generate JWT token
                    UserDetails userDetails = adminUserService.loadUserByUsername(email);
                    String jwtToken = jwtUtil.generateToken(userDetails);
                    
                    // Log successful login
                    String ipAddress = getClientIpAddress(httpRequest);
                    activityLogService.logActivity(admin, "LOGIN_SUCCESS", 
                            "Successful login via Google OAuth", ipAddress);
                    
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("token", jwtToken);
                    response.put("adminType", admin.getAdminType().toString());
                    response.put("faculty", admin.getFaculty());
                    response.put("name", admin.getName());
                    
                    return ResponseEntity.ok(response);
                } else {
                    // Log unauthorized attempt - Create a temporary admin object or handle differently
                    String ipAddress = getClientIpAddress(httpRequest);
                    System.out.println("Unauthorized login attempt with email: " + email + " from IP: " + ipAddress);
                    
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", false);
                    response.put("message", "Access denied. You are not authorized to access the admin panel.");
                    
                    return ResponseEntity.ok(response);
                }
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Invalid Google token");
                
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            System.err.println("Authentication error: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Authentication failed: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String email = jwtUtil.getEmailFromToken(token);
            
            Optional<AdminUser> adminOpt = adminUserService.findByEmail(email);
            if (adminOpt.isPresent() && adminOpt.get().getIsActive()) {
                UserDetails userDetails = adminUserService.loadUserByUsername(email);
                boolean isValid = jwtUtil.validateToken(token, userDetails);
                
                Map<String, Object> response = new HashMap<>();
                response.put("valid", isValid);
                
                if (isValid) {
                    AdminUser admin = adminOpt.get();
                    response.put("adminType", admin.getAdminType().toString());
                    response.put("faculty", admin.getFaculty());
                    response.put("name", admin.getName());
                }
                
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("valid", false);
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            System.err.println("Token validation error: " + e.getMessage());
            Map<String, Object> response = new HashMap<>();
            response.put("valid", false);
            return ResponseEntity.ok(response);
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
