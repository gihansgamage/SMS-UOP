-- Create database
CREATE DATABASE IF NOT EXISTS society_management;
USE society_management;

-- Admin users table
CREATE TABLE admin_users (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,
                             email VARCHAR(255) NOT NULL UNIQUE,
                             name VARCHAR(255) NOT NULL,
                             admin_type ENUM('VICE_CHANCELLOR', 'FACULTY_DEAN', 'ASSISTANT_REGISTRAR', 'SSD_ADMIN') NOT NULL,
                             faculty VARCHAR(255) NULL,
                             is_active BOOLEAN DEFAULT TRUE,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                             last_login TIMESTAMP NULL
);

-- Applicants table (for storing applicant details from login forms)
CREATE TABLE applicants (
                            id BIGINT AUTO_INCREMENT PRIMARY KEY,
                            first_name VARCHAR(255) NOT NULL,
                            last_name VARCHAR(255) NOT NULL,
                            registration_no VARCHAR(100) NOT NULL,
                            mobile VARCHAR(15) NOT NULL,
                            email VARCHAR(255) NOT NULL,
                            faculty VARCHAR(255) NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Society registrations table
CREATE TABLE society_registrations (
                                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                       applicant_id BIGINT NOT NULL,
                                       society_name VARCHAR(255) NOT NULL,
                                       aims TEXT NOT NULL,

    -- Senior Treasurer
                                       senior_treasurer_title VARCHAR(10),
                                       senior_treasurer_full_name VARCHAR(255),
                                       senior_treasurer_designation VARCHAR(255),
                                       senior_treasurer_department VARCHAR(255),
                                       senior_treasurer_email VARCHAR(255),
                                       senior_treasurer_address TEXT,
                                       senior_treasurer_mobile VARCHAR(15),

    -- Bank Details
                                       bank_account VARCHAR(100),
                                       bank_name VARCHAR(255),

    -- Office Bearers
                                       president_reg_no VARCHAR(100),
                                       president_name VARCHAR(255),
                                       president_address TEXT,
                                       president_email VARCHAR(255),
                                       president_mobile VARCHAR(15),

                                       vice_president_reg_no VARCHAR(100),
                                       vice_president_name VARCHAR(255),
                                       vice_president_address TEXT,
                                       vice_president_email VARCHAR(255),
                                       vice_president_mobile VARCHAR(15),

                                       junior_treasurer_reg_no VARCHAR(100),
                                       junior_treasurer_name VARCHAR(255),
                                       junior_treasurer_address TEXT,
                                       junior_treasurer_email VARCHAR(255),
                                       junior_treasurer_mobile VARCHAR(15),

                                       secretary_reg_no VARCHAR(100),
                                       secretary_name VARCHAR(255),
                                       secretary_address TEXT,
                                       secretary_email VARCHAR(255),
                                       secretary_mobile VARCHAR(15),

                                       joint_secretary_reg_no VARCHAR(100),
                                       joint_secretary_name VARCHAR(255),
                                       joint_secretary_address TEXT,
                                       joint_secretary_email VARCHAR(255),
                                       joint_secretary_mobile VARCHAR(15),

                                       editor_reg_no VARCHAR(100),
                                       editor_name VARCHAR(255),
                                       editor_address TEXT,
                                       editor_email VARCHAR(255),
                                       editor_mobile VARCHAR(15),

                                       agm_date DATE,

    -- Status and approval tracking
                                       status ENUM('PENDING_DEAN', 'PENDING_REGISTRAR', 'PENDING_VC', 'APPROVED', 'REJECTED') DEFAULT 'PENDING_DEAN',
                                       dean_approval_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
                                       dean_approval_date TIMESTAMP NULL,
                                       dean_approval_comments TEXT,
                                       dean_approved_by BIGINT NULL,

                                       registrar_approval_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
                                       registrar_approval_date TIMESTAMP NULL,
                                       registrar_approval_comments TEXT,
                                       registrar_approved_by BIGINT NULL,

                                       vc_approval_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
                                       vc_approval_date TIMESTAMP NULL,
                                       vc_approval_comments TEXT,
                                       vc_approved_by BIGINT NULL,

                                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                                       FOREIGN KEY (applicant_id) REFERENCES applicants(id),
                                       FOREIGN KEY (dean_approved_by) REFERENCES admin_users(id),
                                       FOREIGN KEY (registrar_approved_by) REFERENCES admin_users(id),
                                       FOREIGN KEY (vc_approved_by) REFERENCES admin_users(id)
);

-- Society renewals table
CREATE TABLE society_renewals (
                                  id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                  applicant_id BIGINT NOT NULL,
                                  renewal_year YEAR NOT NULL,
                                  society_name VARCHAR(255) NOT NULL,
                                  aims TEXT NOT NULL,

    -- Senior Treasurer
                                  senior_treasurer_title VARCHAR(10),
                                  senior_treasurer_full_name VARCHAR(255),
                                  senior_treasurer_designation VARCHAR(255),
                                  senior_treasurer_department VARCHAR(255),
                                  senior_treasurer_email VARCHAR(255),
                                  senior_treasurer_address TEXT,
                                  senior_treasurer_mobile VARCHAR(15),

    -- Bank Details
                                  bank_account VARCHAR(100),
                                  bank_name VARCHAR(255),

    -- Office Bearers (same structure as registrations)
                                  president_reg_no VARCHAR(100),
                                  president_name VARCHAR(255),
                                  president_address TEXT,
                                  president_email VARCHAR(255),
                                  president_mobile VARCHAR(15),

                                  vice_president_reg_no VARCHAR(100),
                                  vice_president_name VARCHAR(255),
                                  vice_president_address TEXT,
                                  vice_president_email VARCHAR(255),
                                  vice_president_mobile VARCHAR(15),

                                  junior_treasurer_reg_no VARCHAR(100),
                                  junior_treasurer_name VARCHAR(255),
                                  junior_treasurer_address TEXT,
                                  junior_treasurer_email VARCHAR(255),
                                  junior_treasurer_mobile VARCHAR(15),

                                  secretary_reg_no VARCHAR(100),
                                  secretary_name VARCHAR(255),
                                  secretary_address TEXT,
                                  secretary_email VARCHAR(255),
                                  secretary_mobile VARCHAR(15),

                                  joint_secretary_reg_no VARCHAR(100),
                                  joint_secretary_name VARCHAR(255),
                                  joint_secretary_address TEXT,
                                  joint_secretary_email VARCHAR(255),
                                  joint_secretary_mobile VARCHAR(15),

                                  editor_reg_no VARCHAR(100),
                                  editor_name VARCHAR(255),
                                  editor_address TEXT,
                                  editor_email VARCHAR(255),
                                  editor_mobile VARCHAR(15),

                                  agm_date DATE,

    -- Additional renewal-specific fields
                                  previous_year_activities TEXT,
                                  financial_statement TEXT,
                                  membership_count INT,

    -- Status and approval tracking (same as registrations)
                                  status ENUM('PENDING_DEAN', 'PENDING_REGISTRAR', 'PENDING_VC', 'APPROVED', 'REJECTED') DEFAULT 'PENDING_DEAN',
                                  dean_approval_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
                                  dean_approval_date TIMESTAMP NULL,
                                  dean_approval_comments TEXT,
                                  dean_approved_by BIGINT NULL,

                                  registrar_approval_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
                                  registrar_approval_date TIMESTAMP NULL,
                                  registrar_approval_comments TEXT,
                                  registrar_approved_by BIGINT NULL,

                                  vc_approval_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
                                  vc_approval_date TIMESTAMP NULL,
                                  vc_approval_comments TEXT,
                                  vc_approved_by BIGINT NULL,

                                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                                  FOREIGN KEY (applicant_id) REFERENCES applicants(id),
                                  FOREIGN KEY (dean_approved_by) REFERENCES admin_users(id),
                                  FOREIGN KEY (registrar_approved_by) REFERENCES admin_users(id),
                                  FOREIGN KEY (vc_approved_by) REFERENCES admin_users(id)
);

-- Permission requests table
CREATE TABLE permission_requests (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     applicant_id BIGINT NOT NULL,
                                     society_name VARCHAR(255) NOT NULL,
                                     event_name VARCHAR(255) NOT NULL,
                                     event_description TEXT NOT NULL,
                                     event_date DATE NOT NULL,
                                     event_time TIME NOT NULL,
                                     event_venue VARCHAR(255) NOT NULL,
                                     expected_participants INT NOT NULL,
                                     event_type ENUM('ACADEMIC', 'CULTURAL', 'SPORTS', 'SOCIAL', 'OTHER') NOT NULL,
                                     budget_estimate DECIMAL(10,2),
                                     special_requirements TEXT,

    -- Status and approval (only registrar approval needed)
                                     status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
                                     approval_status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
                                     approval_date TIMESTAMP NULL,
                                     approval_comments TEXT,
                                     approved_by BIGINT NULL,

                                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                                     FOREIGN KEY (applicant_id) REFERENCES applicants(id),
                                     FOREIGN KEY (approved_by) REFERENCES admin_users(id)
);

-- Advisory board members table
CREATE TABLE advisory_board_members (
                                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                        registration_id BIGINT NULL,
                                        renewal_id BIGINT NULL,
                                        name VARCHAR(255) NOT NULL,
                                        designation VARCHAR(255) NOT NULL,
                                        department VARCHAR(255) NOT NULL,

                                        FOREIGN KEY (registration_id) REFERENCES society_registrations(id) ON DELETE CASCADE,
                                        FOREIGN KEY (renewal_id) REFERENCES society_renewals(id) ON DELETE CASCADE
);

-- Committee members table
CREATE TABLE committee_members (
                                   id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                   registration_id BIGINT NULL,
                                   renewal_id BIGINT NULL,
                                   reg_no VARCHAR(100) NOT NULL,
                                   name VARCHAR(255) NOT NULL,

                                   FOREIGN KEY (registration_id) REFERENCES society_registrations(id) ON DELETE CASCADE,
                                   FOREIGN KEY (renewal_id) REFERENCES society_renewals(id) ON DELETE CASCADE
);

-- Society members table
CREATE TABLE society_members (
                                 id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                 registration_id BIGINT NULL,
                                 renewal_id BIGINT NULL,
                                 reg_no VARCHAR(100) NOT NULL,
                                 name VARCHAR(255) NOT NULL,

                                 FOREIGN KEY (registration_id) REFERENCES society_registrations(id) ON DELETE CASCADE,
                                 FOREIGN KEY (renewal_id) REFERENCES society_renewals(id) ON DELETE CASCADE
);

-- Planning events table
CREATE TABLE planning_events (
                                 id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                 registration_id BIGINT NULL,
                                 renewal_id BIGINT NULL,
                                 event_date VARCHAR(20) NOT NULL,
                                 activity TEXT NOT NULL,

                                 FOREIGN KEY (registration_id) REFERENCES society_registrations(id) ON DELETE CASCADE,
                                 FOREIGN KEY (renewal_id) REFERENCES society_renewals(id) ON DELETE CASCADE
);

-- Activity logs table
CREATE TABLE activity_logs (
                               id BIGINT AUTO_INCREMENT PRIMARY KEY,
                               admin_id BIGINT NOT NULL,
                               admin_email VARCHAR(255) NOT NULL,
                               activity VARCHAR(100) NOT NULL,
                               details TEXT,
                               ip_address VARCHAR(45),
                               timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                               FOREIGN KEY (admin_id) REFERENCES admin_users(id)
);

-- Approved societies table (final approved societies)
CREATE TABLE approved_societies (
                                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                    society_name VARCHAR(255) NOT NULL,
                                    faculty VARCHAR(255) NOT NULL,
                                    registration_year YEAR NOT NULL,
                                    last_renewal_year YEAR,
                                    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
                                    president_name VARCHAR(255),
                                    president_email VARCHAR(255),
                                    secretary_name VARCHAR(255),
                                    secretary_email VARCHAR(255),
                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
