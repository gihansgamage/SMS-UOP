package com.university.societymanagement.repository;

import com.university.societymanagement.entity.Society;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SocietyRepository extends JpaRepository<Society, Long> {
    List<Society> findByApprovalStatusOrderByCreatedAtDesc(Society.ApprovalStatus status);
    
    List<Society> findByApprovalStatusInOrderByCreatedAtDesc(List<Society.ApprovalStatus> statuses);
    
    @Query("SELECT s FROM Society s WHERE s.approvalStatus = :status ORDER BY s.createdAt DESC")
    List<Society> findPendingSocietiesByStatus(@Param("status") Society.ApprovalStatus status);
    
    List<Society> findAllByOrderByCreatedAtDesc();
    
    long countByApprovalStatus(Society.ApprovalStatus status);
}
