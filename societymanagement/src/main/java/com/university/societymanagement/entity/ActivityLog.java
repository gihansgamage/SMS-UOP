package com.university.societymanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs")
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "admin_email", nullable = false)
    private String adminEmail;

    @Column(name = "activity", nullable = false)
    private String activity;

    @Column(name = "details", columnDefinition = "TEXT")
    private String details;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "society_id")
    private Long societyId;

    // Constructors
    public ActivityLog() {
        this.timestamp = LocalDateTime.now();
    }

    public ActivityLog(String adminEmail, String activity, String details, String ipAddress) {
        this();
        this.adminEmail = adminEmail;
        this.activity = activity;
        this.details = details;
        this.ipAddress = ipAddress;
    }

    public ActivityLog(String adminEmail, String activity, String details, String ipAddress, Long societyId) {
        this(adminEmail, activity, details, ipAddress);
        this.societyId = societyId;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAdminEmail() { return adminEmail; }
    public void setAdminEmail(String adminEmail) { this.adminEmail = adminEmail; }

    public String getActivity() { return activity; }
    public void setActivity(String activity) { this.activity = activity; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public Long getSocietyId() { return societyId; }
    public void setSocietyId(Long societyId) { this.societyId = societyId; }
}
