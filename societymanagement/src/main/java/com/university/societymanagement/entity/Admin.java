package com.university.societymanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "admins")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long adminId;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private AdminType type;

    @Column(name = "isActive", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    public enum AdminType {
        VICE_CHANCELLOR,
        FACULTY_DEAN,
        SSD_ADMIN
    }

    // Constructors
    public Admin() {
        this.createdAt = LocalDateTime.now();
    }

    public Admin(String email, String name, AdminType type) {
        this();
        this.email = email;
        this.name = name;
        this.type = type;
    }

    // Getters and Setters
    public Long getAdminId() { return adminId; }
    public void setAdminId(Long adminId) { this.adminId = adminId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public AdminType getType() { return type; }
    public void setType(AdminType type) { this.type = type; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }
}
