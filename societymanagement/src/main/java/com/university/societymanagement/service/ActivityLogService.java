package com.university.societymanagement.service;

import com.university.societymanagement.entity.ActivityLog;
import com.university.societymanagement.repository.ActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    public void logActivity(String adminEmail, String activity, String details, String ipAddress) {
        ActivityLog log = new ActivityLog(adminEmail, activity, details, ipAddress);
        activityLogRepository.save(log);
    }

    public void logActivity(String adminEmail, String activity, String details, String ipAddress, Long societyId) {
        ActivityLog log = new ActivityLog(adminEmail, activity, details, ipAddress, societyId);
        activityLogRepository.save(log);
    }

    public Page<ActivityLog> getActivityLogs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return activityLogRepository.findAllByOrderByTimestampDesc(pageable);
    }

    public List<ActivityLog> getActivityLogsByAdmin(String adminEmail) {
        return activityLogRepository.findByAdminEmailOrderByTimestampDesc(adminEmail);
    }

    public List<ActivityLog> getActivityLogsBySociety(Long societyId) {
        return activityLogRepository.findBySocietyIdOrderByTimestampDesc(societyId);
    }
}
