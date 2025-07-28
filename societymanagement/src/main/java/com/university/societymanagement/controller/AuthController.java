package com.university.societymanagement.controller;

import com.university.societymanagement.entity.Admin;
import com.university.societymanagement.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    @Autowired
    private JwtService jwtService;

    @PostMapping("/google-login")
    public ResponseEntity<Map<String, Object>> googleLogin(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Simulate Google OAuth validation
            String token = jwtService.generateToken("admin@university.edu");

            response.put("success", true);
            response.put("token", token);
            response.put("admin", Map.of(
                    "email", "admin@university.edu",
                    "name", "Admin User",
                    "type", "SSD_ADMIN"
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/validate-token")
    public ResponseEntity<Map<String, Object>> validateToken(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        try {
            String token = request.get("token");

            if (token == null || !jwtService.validateToken(token) || jwtService.isTokenExpired(token)) {
                response.put("valid", false);
                return ResponseEntity.ok(response);
            }

            String email = jwtService.getEmailFromToken(token);
            response.put("valid", true);
            response.put("email", email);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("valid", false);
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/admin/login")
    public ResponseEntity<Map<String, Object>> adminLogin(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        try {
            String email = request.get("email");

            // Check if email is authorized
            if (!isAuthorizedAdmin(email)) {
                response.put("success", false);
                response.put("message", "Access denied. Not an authorized admin email.");
                return ResponseEntity.status(403).body(response);
            }

            // Generate token for authorized admin
            String token = jwtService.generateToken(email);

            response.put("success", true);
            response.put("token", token);
            response.put("admin", Map.of(
                    "email", email,
                    "name", getAdminName(email),
                    "type", getAdminType(email)
            ));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    private boolean isAuthorizedAdmin(String email) {
        return email.equals("gsgamage4@gmail.com") ||
                email.equals("gihansgamage@gmail.com") ||
                email.equals("s20369@sci.pdn.ac.lk");
    }

    private String getAdminName(String email) {
        switch (email) {
            case "gsgamage4@gmail.com": return "Vice Chancellor";
            case "gihansgamage@gmail.com": return "Faculty Dean";
            case "s20369@sci.pdn.ac.lk": return "SSD Admin";
            default: return "Admin";
        }
    }

    private String getAdminType(String email) {
        switch (email) {
            case "gsgamage4@gmail.com": return "VICE_CHANCELLOR";
            case "gihansgamage@gmail.com": return "FACULTY_DEAN";
            case "s20369@sci.pdn.ac.lk": return "SSD_ADMIN";
            default: return "SSD_ADMIN";
        }
    }
}
