package com.university.societymanagement.service;

import com.university.societymanagement.entity.Admin;
import com.university.societymanagement.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Optional<Admin> findByEmailAndActive(String email) {
        return adminRepository.findByEmailAndIsActive(email, true);
    }

    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public Admin save(Admin admin) {
        return adminRepository.save(admin);
    }

    public void updateLastLogin(String email) {
        Optional<Admin> adminOpt = findByEmail(email);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            admin.setLastLogin(LocalDateTime.now());
            adminRepository.save(admin);
        }
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAllByOrderByCreatedAtDesc();
    }

    public boolean isAuthorizedAdmin(String email) {
        return findByEmailAndActive(email).isPresent();
    }

    public Admin.AdminType getAdminType(String email) {
        Optional<Admin> admin = findByEmailAndActive(email);
        return admin.map(Admin::getType).orElse(null);
    }
}
