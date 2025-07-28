-- Create database if not exists
CREATE DATABASE IF NOT EXISTS admin_panel_db;
USE admin_panel_db;

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    admin_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    type ENUM('VICE_CHANCELLOR', 'FACULTY_DEAN', 'SSD_ADMIN') NOT NULL,
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Insert authorized admins
INSERT INTO admins (email, name, type, isActive) VALUES
('gsgamage4@gmail.com', 'Vice Chancellor', 'VICE_CHANCELLOR', TRUE),
('gihansgamage@gmail.com', 'Faculty Dean', 'FACULTY_DEAN', TRUE),
('s20369@sci.pdn.ac.lk', 'SSD Admin', 'SSD_ADMIN', TRUE)
ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    type = VALUES(type),
    isActive = VALUES(isActive);

-- Create societies table
CREATE TABLE IF NOT EXISTS societies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    society_name VARCHAR(255) NOT NULL,
    aims TEXT,
    
    -- Senior Treasurer Information
    senior_treasurer_title VARCHAR(50),
    senior_treasurer_full_name VARCHAR(255),
    senior_treasurer_designation VARCHAR(255),
    senior_treasurer_department VARCHAR(255),
    senior_treasurer_email VARCHAR(255),
    senior_treasurer_address TEXT,
    senior_treasurer_mobile VARCHAR(20),
    
    -- Bank Details
    bank_account VARCHAR(255),
    bank_name VARCHAR(255),
    
    -- Office Bearers
    president_reg_no VARCHAR(50),
    president_name VARCHAR(255),
    president_address TEXT,
    president_email VARCHAR(255),
    president_mobile VARCHAR(20),
    
    vice_president_reg_no VARCHAR(50),
    vice_president_name VARCHAR(255),
    vice_president_address TEXT,
    vice_president_email VARCHAR(255),
    vice_president_mobile VARCHAR(20),
    
    junior_treasurer_reg_no VARCHAR(50),
    junior_treasurer_name VARCHAR(255),
    junior_treasurer_address TEXT,
    junior_treasurer_email VARCHAR(255),
    junior_treasurer_mobile VARCHAR(20),
    
    secretary_reg_no VARCHAR(50),
    secretary_name VARCHAR(255),
    secretary_address TEXT,
    secretary_email VARCHAR(255),
    secretary_mobile VARCHAR(20),
    
    joint_secretary_reg_no VARCHAR(50),
    joint_secretary_name VARCHAR(255),
    joint_secretary_address TEXT,
    joint_secretary_email VARCHAR(255),
    joint_secretary_mobile VARCHAR(20),
    
    editor_reg_no VARCHAR(50),
    editor_name VARCHAR(255),
    editor_address TEXT,
    editor_email VARCHAR(255),
    editor_mobile VARCHAR(20),
    
    -- AGM Date
    agm_date VARCHAR(50),
    
    -- Approval Status and Tracking
    approval_status ENUM('PENDING_FACULTY_DEAN', 'PENDING_SSD', 'PENDING_VICE_CHANCELLOR', 'APPROVED', 'REJECTED') DEFAULT 'PENDING_FACULTY_DEAN',
    
    faculty_dean_approved_at TIMESTAMP NULL,
    faculty_dean_approved_by VARCHAR(255),
    
    ssd_approved_at TIMESTAMP NULL,
    ssd_approved_by VARCHAR(255),
    
    vice_chancellor_approved_at TIMESTAMP NULL,
    vice_chancellor_approved_by VARCHAR(255),
    
    rejection_reason TEXT,
    rejected_by VARCHAR(255),
    rejected_at TIMESTAMP NULL,
    
    -- Applicant Information
    applicant_email VARCHAR(255),
    applicant_name VARCHAR(255),
    
    -- JSON fields for complex data
    advisory_board JSON,
    committee_members JSON,
    members JSON,
    planning_events JSON,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    admin_email VARCHAR(255) NOT NULL,
    activity VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    society_id BIGINT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_admin_email (admin_email),
    INDEX idx_timestamp (timestamp),
    INDEX idx_society_id (society_id),
    FOREIGN KEY (society_id) REFERENCES societies(id) ON DELETE SET NULL
);
