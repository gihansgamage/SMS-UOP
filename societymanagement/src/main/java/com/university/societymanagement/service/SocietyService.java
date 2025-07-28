package com.university.societymanagement.service;

import com.university.societymanagement.entity.Admin;
import com.university.societymanagement.entity.Society;
import com.university.societymanagement.repository.SocietyRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.university.societymanagement.service.ActivityLogService;
import com.university.societymanagement.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class SocietyService {

    @Autowired
    private SocietyRepository societyRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ActivityLogService activityLogService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public Society saveSociety(Map<String, Object> societyData) {
        try {
            Society society = new Society();

            // Basic information
            society.setSocietyName((String) societyData.get("societyName"));
            society.setAims((String) societyData.get("aims"));

            // Senior Treasurer
            society.setSeniorTreasurerTitle((String) societyData.get("seniorTreasurerTitle"));
            society.setSeniorTreasurerFullName((String) societyData.get("seniorTreasurerFullName"));
            society.setSeniorTreasurerDesignation((String) societyData.get("seniorTreasurerDesignation"));
            society.setSeniorTreasurerDepartment((String) societyData.get("seniorTreasurerDepartment"));
            society.setSeniorTreasurerEmail((String) societyData.get("seniorTreasurerEmail"));
            society.setSeniorTreasurerAddress((String) societyData.get("seniorTreasurerAddress"));
            society.setSeniorTreasurerMobile((String) societyData.get("seniorTreasurerMobile"));

            // Bank Details
            society.setBankAccount((String) societyData.get("bankAccount"));
            society.setBankName((String) societyData.get("bankName"));

            // Office Bearers
            society.setPresidentRegNo((String) societyData.get("presidentRegNo"));
            society.setPresidentName((String) societyData.get("presidentName"));
            society.setPresidentAddress((String) societyData.get("presidentAddress"));
            society.setPresidentEmail((String) societyData.get("presidentEmail"));
            society.setPresidentMobile((String) societyData.get("presidentMobile"));

            society.setVicePresidentRegNo((String) societyData.get("VicePresidentRegNo"));
            society.setVicePresidentName((String) societyData.get("VicePresidentName"));
            society.setVicePresidentAddress((String) societyData.get("VicePresidentAddress"));
            society.setVicePresidentEmail((String) societyData.get("VicePresidentEmail"));
            society.setVicePresidentMobile((String) societyData.get("VicePresidentMobile"));

            society.setJuniorTreasurerRegNo((String) societyData.get("juniorTreasurerRegNo"));
            society.setJuniorTreasurerName((String) societyData.get("juniorTreasurerName"));
            society.setJuniorTreasurerAddress((String) societyData.get("juniorTreasurerAddress"));
            society.setJuniorTreasurerEmail((String) societyData.get("juniorTreasurerEmail"));
            society.setJuniorTreasurerMobile((String) societyData.get("juniorTreasurerMobile"));

            society.setSecretaryRegNo((String) societyData.get("secretaryRegNo"));
            society.setSecretaryName((String) societyData.get("secretaryName"));
            society.setSecretaryAddress((String) societyData.get("secretaryAddress"));
            society.setSecretaryEmail((String) societyData.get("secretaryEmail"));
            society.setSecretaryMobile((String) societyData.get("secretaryMobile"));

            society.setJointSecretaryRegNo((String) societyData.get("jointSecretaryRegNo"));
            society.setJointSecretaryName((String) societyData.get("jointSecretaryName"));
            society.setJointSecretaryAddress((String) societyData.get("jointSecretaryAddress"));
            society.setJointSecretaryEmail((String) societyData.get("jointSecretaryEmail"));
            society.setJointSecretaryMobile((String) societyData.get("jointSecretaryMobile"));

            society.setEditorRegNo((String) societyData.get("editorRegNo"));
            society.setEditorName((String) societyData.get("editorName"));
            society.setEditorAddress((String) societyData.get("editorAddress"));
            society.setEditorEmail((String) societyData.get("editorEmail"));
            society.setEditorMobile((String) societyData.get("editorMobile"));

            // AGM Date
            society.setAgmDate((String) societyData.get("agmDate"));

            // Applicant Information
            society.setApplicantEmail((String) societyData.get("applicantEmail"));
            society.setApplicantName((String) societyData.get("applicantName"));

            // You can also store additional applicant details if needed
            // society.setApplicantMobile((String) societyData.get("applicantMobile"));
            // society.setApplicantRegistrationNo((String) societyData.get("applicantRegistrationNo"));

            // Convert complex objects to JSON strings
            if (societyData.get("advisoryBoard") != null) {
                society.setAdvisoryBoard(objectMapper.writeValueAsString(societyData.get("advisoryBoard")));
            }
            if (societyData.get("committeeMember") != null) {
                society.setCommitteeMembers(objectMapper.writeValueAsString(societyData.get("committeeMember")));
            }
            if (societyData.get("member") != null) {
                society.setMembers(objectMapper.writeValueAsString(societyData.get("member")));
            }
            if (societyData.get("planningEvents") != null) {
                society.setPlanningEvents(objectMapper.writeValueAsString(societyData.get("planningEvents")));
            }

            // Set initial approval status
            society.setApprovalStatus(Society.ApprovalStatus.PENDING_FACULTY_DEAN);

            return societyRepository.save(society);

        } catch (Exception e) {
            throw new RuntimeException("Error saving society data: " + e.getMessage(), e);
        }
    }

    public List<Society> getPendingSocietiesForAdmin(Admin.AdminType adminType) {
        switch (adminType) {
            case FACULTY_DEAN:
                return societyRepository.findByApprovalStatusOrderByCreatedAtDesc(
                        Society.ApprovalStatus.PENDING_FACULTY_DEAN);
            case SSD_ADMIN:
                return societyRepository.findByApprovalStatusOrderByCreatedAtDesc(
                        Society.ApprovalStatus.PENDING_SSD);
            case VICE_CHANCELLOR:
                return societyRepository.findByApprovalStatusOrderByCreatedAtDesc(
                        Society.ApprovalStatus.PENDING_VICE_CHANCELLOR);
            default:
                return List.of();
        }
    }

    public Society approveSociety(Long societyId, String adminEmail, Admin.AdminType adminType, String ipAddress) {
        Society society = societyRepository.findById(societyId)
                .orElseThrow(() -> new RuntimeException("Society not found"));

        LocalDateTime now = LocalDateTime.now();

        switch (adminType) {
            case FACULTY_DEAN:
                if (society.getApprovalStatus() != Society.ApprovalStatus.PENDING_FACULTY_DEAN) {
                    throw new RuntimeException("Society is not pending faculty dean approval");
                }
                society.setApprovalStatus(Society.ApprovalStatus.PENDING_SSD);
                society.setFacultyDeanApprovedAt(now);
                society.setFacultyDeanApprovedBy(adminEmail);

                // Send email to applicant and notify SSD
                emailService.sendApprovalNotification(society, "Faculty Dean", "Student Services Division");
                emailService.sendNotificationToAdmin("SSD_ADMIN",
                        "Society Application Approved by Faculty Dean",
                        "Society '" + society.getSocietyName() + "' has been approved by Faculty Dean and requires SSD review.");
                break;

            case SSD_ADMIN:
                if (society.getApprovalStatus() != Society.ApprovalStatus.PENDING_SSD) {
                    throw new RuntimeException("Society is not pending SSD approval");
                }
                society.setApprovalStatus(Society.ApprovalStatus.PENDING_VICE_CHANCELLOR);
                society.setSsdApprovedAt(now);
                society.setSsdApprovedBy(adminEmail);

                // Send email to applicant and notify Vice Chancellor
                emailService.sendApprovalNotification(society, "Student Services Division", "Vice Chancellor");
                emailService.sendNotificationToAdmin("VICE_CHANCELLOR",
                        "Society Application Approved by SSD",
                        "Society '" + society.getSocietyName() + "' has been approved by SSD and requires Vice Chancellor final approval.");
                break;

            case VICE_CHANCELLOR:
                if (society.getApprovalStatus() != Society.ApprovalStatus.PENDING_VICE_CHANCELLOR) {
                    throw new RuntimeException("Society is not pending Vice Chancellor approval");
                }
                society.setApprovalStatus(Society.ApprovalStatus.APPROVED);
                society.setViceChancellorApprovedAt(now);
                society.setViceChancellorApprovedBy(adminEmail);

                // Send final approval email
                emailService.sendFinalApprovalEmail(society);
                break;

            default:
                throw new RuntimeException("Invalid admin type for approval");
        }

        Society savedSociety = societyRepository.save(society);

        // Log activity
        activityLogService.logActivity(
                adminEmail,
                "SOCIETY_APPROVED",
                "Approved society: " + society.getSocietyName() + " (ID: " + societyId + ")",
                ipAddress,
                societyId
        );

        return savedSociety;
    }

    public Society rejectSociety(Long societyId, String adminEmail, String reason, String ipAddress) {
        Society society = societyRepository.findById(societyId)
                .orElseThrow(() -> new RuntimeException("Society not found"));

        society.setApprovalStatus(Society.ApprovalStatus.REJECTED);
        society.setRejectionReason(reason);
        society.setRejectedBy(adminEmail);
        society.setRejectedAt(LocalDateTime.now());

        Society savedSociety = societyRepository.save(society);

        // Send rejection email
        emailService.sendRejectionEmail(society, reason);

        // Log activity
        activityLogService.logActivity(
                adminEmail,
                "SOCIETY_REJECTED",
                "Rejected society: " + society.getSocietyName() + " (ID: " + societyId + ") - Reason: " + reason,
                ipAddress,
                societyId
        );

        return savedSociety;
    }

    public List<Society> getAllSocieties() {
        return societyRepository.findAllByOrderByCreatedAtDesc();
    }

    public Society getSocietyById(Long id) {
        return societyRepository.findById(id).orElse(null);
    }

    public long getPendingCountForAdmin(Admin.AdminType adminType) {
        switch (adminType) {
            case FACULTY_DEAN:
                return societyRepository.countByApprovalStatus(Society.ApprovalStatus.PENDING_FACULTY_DEAN);
            case SSD_ADMIN:
                return societyRepository.countByApprovalStatus(Society.ApprovalStatus.PENDING_SSD);
            case VICE_CHANCELLOR:
                return societyRepository.countByApprovalStatus(Society.ApprovalStatus.PENDING_VICE_CHANCELLOR);
            default:
                return 0;
        }
    }

    public long getApprovedCount() {
        return societyRepository.countByApprovalStatus(Society.ApprovalStatus.APPROVED);
    }

    public long getRejectedCount() {
        return societyRepository.countByApprovalStatus(Society.ApprovalStatus.REJECTED);
    }

    public long getTotalCount() {
        return societyRepository.count();
    }
}
