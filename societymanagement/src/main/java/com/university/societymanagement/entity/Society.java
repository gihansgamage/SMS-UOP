package com.university.societymanagement.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "societies")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Society {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Society Information
    @Column(name = "society_name", nullable = false)
    private String societyName;

    @Column(name = "aims", columnDefinition = "TEXT")
    private String aims;

    // Senior Treasurer Information
    @Column(name = "senior_treasurer_title")
    private String seniorTreasurerTitle;

    @Column(name = "senior_treasurer_full_name")
    private String seniorTreasurerFullName;

    @Column(name = "senior_treasurer_designation")
    private String seniorTreasurerDesignation;

    @Column(name = "senior_treasurer_department")
    private String seniorTreasurerDepartment;

    @Column(name = "senior_treasurer_email")
    private String seniorTreasurerEmail;

    @Column(name = "senior_treasurer_address")
    private String seniorTreasurerAddress;

    @Column(name = "senior_treasurer_mobile")
    private String seniorTreasurerMobile;

    // Bank Details
    @Column(name = "bank_account")
    private String bankAccount;

    @Column(name = "bank_name")
    private String bankName;

    // Office Bearers
    @Column(name = "president_reg_no")
    private String presidentRegNo;

    @Column(name = "president_name")
    private String presidentName;

    @Column(name = "president_address")
    private String presidentAddress;

    @Column(name = "president_email")
    private String presidentEmail;

    @Column(name = "president_mobile")
    private String presidentMobile;

    @Column(name = "vice_president_reg_no")
    private String vicePresidentRegNo;

    @Column(name = "vice_president_name")
    private String vicePresidentName;

    @Column(name = "vice_president_address")
    private String vicePresidentAddress;

    @Column(name = "vice_president_email")
    private String vicePresidentEmail;

    @Column(name = "vice_president_mobile")
    private String vicePresidentMobile;

    @Column(name = "junior_treasurer_reg_no")
    private String juniorTreasurerRegNo;

    @Column(name = "junior_treasurer_name")
    private String juniorTreasurerName;

    @Column(name = "junior_treasurer_address")
    private String juniorTreasurerAddress;

    @Column(name = "junior_treasurer_email")
    private String juniorTreasurerEmail;

    @Column(name = "junior_treasurer_mobile")
    private String juniorTreasurerMobile;

    @Column(name = "secretary_reg_no")
    private String secretaryRegNo;

    @Column(name = "secretary_name")
    private String secretaryName;

    @Column(name = "secretary_address")
    private String secretaryAddress;

    @Column(name = "secretary_email")
    private String secretaryEmail;

    @Column(name = "secretary_mobile")
    private String secretaryMobile;

    @Column(name = "joint_secretary_reg_no")
    private String jointSecretaryRegNo;

    @Column(name = "joint_secretary_name")
    private String jointSecretaryName;

    @Column(name = "joint_secretary_address")
    private String jointSecretaryAddress;

    @Column(name = "joint_secretary_email")
    private String jointSecretaryEmail;

    @Column(name = "joint_secretary_mobile")
    private String jointSecretaryMobile;

    @Column(name = "editor_reg_no")
    private String editorRegNo;

    @Column(name = "editor_name")
    private String editorName;

    @Column(name = "editor_address")
    private String editorAddress;

    @Column(name = "editor_email")
    private String editorEmail;

    @Column(name = "editor_mobile")
    private String editorMobile;

    // AGM Date
    @Column(name = "agm_date")
    private String agmDate;

    // Approval Status
    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status")
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING_FACULTY_DEAN;

    @Column(name = "faculty_dean_approved_at")
    private LocalDateTime facultyDeanApprovedAt;

    @Column(name = "faculty_dean_approved_by")
    private String facultyDeanApprovedBy;

    @Column(name = "ssd_approved_at")
    private LocalDateTime ssdApprovedAt;

    @Column(name = "ssd_approved_by")
    private String ssdApprovedBy;

    @Column(name = "vice_chancellor_approved_at")
    private LocalDateTime viceChancellorApprovedAt;

    @Column(name = "vice_chancellor_approved_by")
    private String viceChancellorApprovedBy;

    @Column(name = "rejection_reason")
    private String rejectionReason;

    @Column(name = "rejected_by")
    private String rejectedBy;

    @Column(name = "rejected_at")
    private LocalDateTime rejectedAt;

    // Applicant Information
    @Column(name = "applicant_email")
    private String applicantEmail;

    @Column(name = "applicant_name")
    private String applicantName;

    // Timestamps
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Related entities (stored as JSON strings for simplicity)
    @Column(name = "advisory_board", columnDefinition = "JSON")
    private String advisoryBoard;

    @Column(name = "committee_members", columnDefinition = "JSON")
    private String committeeMembers;

    @Column(name = "members", columnDefinition = "JSON")
    private String members;

    @Column(name = "planning_events", columnDefinition = "JSON")
    private String planningEvents;

    public enum ApprovalStatus {
        PENDING_FACULTY_DEAN,
        PENDING_SSD,
        PENDING_VICE_CHANCELLOR,
        APPROVED,
        REJECTED
    }

    // Constructors
    public Society() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSocietyName() { return societyName; }
    public void setSocietyName(String societyName) { this.societyName = societyName; }

    public String getAims() { return aims; }
    public void setAims(String aims) { this.aims = aims; }

    public String getSeniorTreasurerTitle() { return seniorTreasurerTitle; }
    public void setSeniorTreasurerTitle(String seniorTreasurerTitle) { this.seniorTreasurerTitle = seniorTreasurerTitle; }

    public String getSeniorTreasurerFullName() { return seniorTreasurerFullName; }
    public void setSeniorTreasurerFullName(String seniorTreasurerFullName) { this.seniorTreasurerFullName = seniorTreasurerFullName; }

    public String getSeniorTreasurerDesignation() { return seniorTreasurerDesignation; }
    public void setSeniorTreasurerDesignation(String seniorTreasurerDesignation) { this.seniorTreasurerDesignation = seniorTreasurerDesignation; }

    public String getSeniorTreasurerDepartment() { return seniorTreasurerDepartment; }
    public void setSeniorTreasurerDepartment(String seniorTreasurerDepartment) { this.seniorTreasurerDepartment = seniorTreasurerDepartment; }

    public String getSeniorTreasurerEmail() { return seniorTreasurerEmail; }
    public void setSeniorTreasurerEmail(String seniorTreasurerEmail) { this.seniorTreasurerEmail = seniorTreasurerEmail; }

    public String getSeniorTreasurerAddress() { return seniorTreasurerAddress; }
    public void setSeniorTreasurerAddress(String seniorTreasurerAddress) { this.seniorTreasurerAddress = seniorTreasurerAddress; }

    public String getSeniorTreasurerMobile() { return seniorTreasurerMobile; }
    public void setSeniorTreasurerMobile(String seniorTreasurerMobile) { this.seniorTreasurerMobile = seniorTreasurerMobile; }

    public String getBankAccount() { return bankAccount; }
    public void setBankAccount(String bankAccount) { this.bankAccount = bankAccount; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getPresidentRegNo() { return presidentRegNo; }
    public void setPresidentRegNo(String presidentRegNo) { this.presidentRegNo = presidentRegNo; }

    public String getPresidentName() { return presidentName; }
    public void setPresidentName(String presidentName) { this.presidentName = presidentName; }

    public String getPresidentAddress() { return presidentAddress; }
    public void setPresidentAddress(String presidentAddress) { this.presidentAddress = presidentAddress; }

    public String getPresidentEmail() { return presidentEmail; }
    public void setPresidentEmail(String presidentEmail) { this.presidentEmail = presidentEmail; }

    public String getPresidentMobile() { return presidentMobile; }
    public void setPresidentMobile(String presidentMobile) { this.presidentMobile = presidentMobile; }

    public String getVicePresidentRegNo() { return vicePresidentRegNo; }
    public void setVicePresidentRegNo(String vicePresidentRegNo) { this.vicePresidentRegNo = vicePresidentRegNo; }

    public String getVicePresidentName() { return vicePresidentName; }
    public void setVicePresidentName(String vicePresidentName) { this.vicePresidentName = vicePresidentName; }

    public String getVicePresidentAddress() { return vicePresidentAddress; }
    public void setVicePresidentAddress(String vicePresidentAddress) { this.vicePresidentAddress = vicePresidentAddress; }

    public String getVicePresidentEmail() { return vicePresidentEmail; }
    public void setVicePresidentEmail(String vicePresidentEmail) { this.vicePresidentEmail = vicePresidentEmail; }

    public String getVicePresidentMobile() { return vicePresidentMobile; }
    public void setVicePresidentMobile(String vicePresidentMobile) { this.vicePresidentMobile = vicePresidentMobile; }

    public String getJuniorTreasurerRegNo() { return juniorTreasurerRegNo; }
    public void setJuniorTreasurerRegNo(String juniorTreasurerRegNo) { this.juniorTreasurerRegNo = juniorTreasurerRegNo; }

    public String getJuniorTreasurerName() { return juniorTreasurerName; }
    public void setJuniorTreasurerName(String juniorTreasurerName) { this.juniorTreasurerName = juniorTreasurerName; }

    public String getJuniorTreasurerAddress() { return juniorTreasurerAddress; }
    public void setJuniorTreasurerAddress(String juniorTreasurerAddress) { this.juniorTreasurerAddress = juniorTreasurerAddress; }

    public String getJuniorTreasurerEmail() { return juniorTreasurerEmail; }
    public void setJuniorTreasurerEmail(String juniorTreasurerEmail) { this.juniorTreasurerEmail = juniorTreasurerEmail; }

    public String getJuniorTreasurerMobile() { return juniorTreasurerMobile; }
    public void setJuniorTreasurerMobile(String juniorTreasurerMobile) { this.juniorTreasurerMobile = juniorTreasurerMobile; }

    public String getSecretaryRegNo() { return secretaryRegNo; }
    public void setSecretaryRegNo(String secretaryRegNo) { this.secretaryRegNo = secretaryRegNo; }

    public String getSecretaryName() { return secretaryName; }
    public void setSecretaryName(String secretaryName) { this.secretaryName = secretaryName; }

    public String getSecretaryAddress() { return secretaryAddress; }
    public void setSecretaryAddress(String secretaryAddress) { this.secretaryAddress = secretaryAddress; }

    public String getSecretaryEmail() { return secretaryEmail; }
    public void setSecretaryEmail(String secretaryEmail) { this.secretaryEmail = secretaryEmail; }

    public String getSecretaryMobile() { return secretaryMobile; }
    public void setSecretaryMobile(String secretaryMobile) { this.secretaryMobile = secretaryMobile; }

    public String getJointSecretaryRegNo() { return jointSecretaryRegNo; }
    public void setJointSecretaryRegNo(String jointSecretaryRegNo) { this.jointSecretaryRegNo = jointSecretaryRegNo; }

    public String getJointSecretaryName() { return jointSecretaryName; }
    public void setJointSecretaryName(String jointSecretaryName) { this.jointSecretaryName = jointSecretaryName; }

    public String getJointSecretaryAddress() { return jointSecretaryAddress; }
    public void setJointSecretaryAddress(String jointSecretaryAddress) { this.jointSecretaryAddress = jointSecretaryAddress; }

    public String getJointSecretaryEmail() { return jointSecretaryEmail; }
    public void setJointSecretaryEmail(String jointSecretaryEmail) { this.jointSecretaryEmail = jointSecretaryEmail; }

    public String getJointSecretaryMobile() { return jointSecretaryMobile; }
    public void setJointSecretaryMobile(String jointSecretaryMobile) { this.jointSecretaryMobile = jointSecretaryMobile; }

    public String getEditorRegNo() { return editorRegNo; }
    public void setEditorRegNo(String editorRegNo) { this.editorRegNo = editorRegNo; }

    public String getEditorName() { return editorName; }
    public void setEditorName(String editorName) { this.editorName = editorName; }

    public String getEditorAddress() { return editorAddress; }
    public void setEditorAddress(String editorAddress) { this.editorAddress = editorAddress; }

    public String getEditorEmail() { return editorEmail; }
    public void setEditorEmail(String editorEmail) { this.editorEmail = editorEmail; }

    public String getEditorMobile() { return editorMobile; }
    public void setEditorMobile(String editorMobile) { this.editorMobile = editorMobile; }

    public String getAgmDate() { return agmDate; }
    public void setAgmDate(String agmDate) { this.agmDate = agmDate; }

    public ApprovalStatus getApprovalStatus() { return approvalStatus; }
    public void setApprovalStatus(ApprovalStatus approvalStatus) { this.approvalStatus = approvalStatus; }

    public LocalDateTime getFacultyDeanApprovedAt() { return facultyDeanApprovedAt; }
    public void setFacultyDeanApprovedAt(LocalDateTime facultyDeanApprovedAt) { this.facultyDeanApprovedAt = facultyDeanApprovedAt; }

    public String getFacultyDeanApprovedBy() { return facultyDeanApprovedBy; }
    public void setFacultyDeanApprovedBy(String facultyDeanApprovedBy) { this.facultyDeanApprovedBy = facultyDeanApprovedBy; }

    public LocalDateTime getSsdApprovedAt() { return ssdApprovedAt; }
    public void setSsdApprovedAt(LocalDateTime ssdApprovedAt) { this.ssdApprovedAt = ssdApprovedAt; }

    public String getSsdApprovedBy() { return ssdApprovedBy; }
    public void setSsdApprovedBy(String ssdApprovedBy) { this.ssdApprovedBy = ssdApprovedBy; }

    public LocalDateTime getViceChancellorApprovedAt() { return viceChancellorApprovedAt; }
    public void setViceChancellorApprovedAt(LocalDateTime viceChancellorApprovedAt) { this.viceChancellorApprovedAt = viceChancellorApprovedAt; }

    public String getViceChancellorApprovedBy() { return viceChancellorApprovedBy; }
    public void setViceChancellorApprovedBy(String viceChancellorApprovedBy) { this.viceChancellorApprovedBy = viceChancellorApprovedBy; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }

    public String getRejectedBy() { return rejectedBy; }
    public void setRejectedBy(String rejectedBy) { this.rejectedBy = rejectedBy; }

    public LocalDateTime getRejectedAt() { return rejectedAt; }
    public void setRejectedAt(LocalDateTime rejectedAt) { this.rejectedAt = rejectedAt; }

    public String getApplicantEmail() { return applicantEmail; }
    public void setApplicantEmail(String applicantEmail) { this.applicantEmail = applicantEmail; }

    public String getApplicantName() { return applicantName; }
    public void setApplicantName(String applicantName) { this.applicantName = applicantName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public String getAdvisoryBoard() { return advisoryBoard; }
    public void setAdvisoryBoard(String advisoryBoard) { this.advisoryBoard = advisoryBoard; }

    public String getCommitteeMembers() { return committeeMembers; }
    public void setCommitteeMembers(String committeeMembers) { this.committeeMembers = committeeMembers; }

    public String getMembers() { return members; }
    public void setMembers(String members) { this.members = members; }

    public String getPlanningEvents() { return planningEvents; }
    public void setPlanningEvents(String planningEvents) { this.planningEvents = planningEvents; }
}
