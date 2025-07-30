package com.university.societymanagement.service;

import com.university.societymanagement.entity.ActivityLog;
import com.university.societymanagement.entity.AdminUser;
import com.university.societymanagement.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public void logActivity(AdminUser admin, String activity, String details, String ipAddress) {
        try {
            if (admin != null) {
                ActivityLog log = new ActivityLog(admin, activity, details, ipAddress);
                activityLogRepository.save(log);
            } else {
                // Handle case where admin is null (unauthorized attempts)
                System.out.println("Activity log skipped - admin is null. Activity: " + activity + ", Details: " + details);
            }
        } catch (Exception e) {
            System.err.println("Failed to log activity: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public Page<ActivityLog> getAllActivityLogs(Pageable pageable) {
        return activityLogRepository.findAllByOrderByTimestampDesc(pageable);
    }

    public List<ActivityLog> getRecentActivityLogs() {
        return activityLogRepository.findTop50ByOrderByTimestampDesc();
    }

    public List<ActivityLog> getActivityLogsByAdmin(String adminEmail) {
        return activityLogRepository.findByAdminEmailOrderByTimestampDesc(adminEmail);
    }
}
