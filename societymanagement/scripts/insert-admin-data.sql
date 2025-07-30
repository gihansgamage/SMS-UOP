-- Insert admin users
INSERT INTO admin_users (email, name, admin_type, faculty, is_active) VALUES
-- Vice Chancellor (test email)
('gihansgamage@gmail.com', 'Vice Chancellor', 'VICE_CHANCELLOR', NULL, TRUE),
('vcuop@gs.pdn.ac.lk', 'Vice Chancellor UOP', 'VICE_CHANCELLOR', NULL, TRUE),
('vcoffice@gs.pdn.ac.lk', 'VC Office', 'VICE_CHANCELLOR', NULL, TRUE),

-- Assistant Registrar (test email)
('mathscrewyt@gmail.com', 'Assistant Registrar Test', 'ASSISTANT_REGISTRAR', NULL, TRUE),
('chandukanr@gmail.com', 'Assistant Registrar', 'ASSISTANT_REGISTRAR', NULL, TRUE),

-- Faculty Deans (test email)
('sooslemr@gmail.com', 'Faculty Dean Test', 'FACULTY_DEAN', 'Faculty of Science', TRUE),

-- Faculty Deans (actual emails)
('deansci@sci.pdn.ac.lk', 'Dean of Science', 'FACULTY_DEAN', 'Faculty of Science', TRUE),
('dean@eng.pdn.ac.lk', 'Dean of Engineering', 'FACULTY_DEAN', 'Faculty of Engineering', TRUE),
('dean@agri.pdn.ac.lk', 'Dean of Agriculture', 'FACULTY_DEAN', 'Faculty of Agriculture', TRUE),
('dean@arts.pdn.ac.lk', 'Dean of Arts', 'FACULTY_DEAN', 'Faculty of Arts', TRUE),
('dean@dent.pdn.ac.lk', 'Dean of Dental Sciences', 'FACULTY_DEAN', 'Faculty of Dental Sciences', TRUE),
('dean@med.pdn.ac.lk', 'Dean of Medicine', 'FACULTY_DEAN', 'Faculty of Medicine', TRUE),
('dean@vet.pdn.ac.lk', 'Dean of Veterinary Medicine', 'FACULTY_DEAN', 'Faculty of Veterinary Medicine and Animal Science', TRUE),
('dean@ahs.pdn.ac.lk', 'Dean of Allied Health Sciences', 'FACULTY_DEAN', 'Faculty of Allied Health Sciences', TRUE),
('dean@mgt.pdn.ac.lk', 'Dean of Management', 'FACULTY_DEAN', 'Faculty of Management', TRUE),

-- SSD Admin (test email)
('gsgamage@gmail.com', 'SSD Admin Test', 'SSD_ADMIN', NULL, TRUE),
('drsspdn@gmail.com', 'SSD Admin', 'SSD_ADMIN', NULL, TRUE);
