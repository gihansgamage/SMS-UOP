package com.university.societymanagement.repository;

import com.university.societymanagement.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmailAndIsActive(String email, Boolean isActive);
    Optional<Admin> findByEmail(String email);
    List<Admin> findAllByOrderByCreatedAtDesc();
    List<Admin> findByType(Admin.AdminType type);
}
