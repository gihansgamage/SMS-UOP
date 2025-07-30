package com.university.societymanagement.controller;

import com.university.societymanagement.service.SocietyRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/societies")
@CrossOrigin(origins = "*")
public class SocietyController {

    @Autowired
    private SocietyRegistrationService registrationService;

    @PostMapping("/submit")
    public ResponseEntity<?> submitRegistration(@RequestBody Map<String, Object> registrationData) {
        try {
            registrationService.submitRegistration(registrationData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Society registration submitted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to submit registration: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
}
