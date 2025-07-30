-- Check if admin users exist in the database
SELECT * FROM admin_users;

-- If no users exist, insert test admin users
INSERT IGNORE INTO admin_users (email, name, admin_type, faculty, is_active) VALUES
-- Test admin users (replace with your actual Google account emails)
('your-email@gmail.com', 'Test Admin', 'VICE_CHANCELLOR', NULL, TRUE),
('gihansgamage@gmail.com', 'Vice Chancellor', 'VICE_CHANCELLOR', NULL, TRUE),
('mathscrewyt@gmail.com', 'Assistant Registrar Test', 'ASSISTANT_REGISTRAR', NULL, TRUE),
('sooslemr@gmail.com', 'Faculty Dean Test', 'FACULTY_DEAN', 'Faculty of Science', TRUE);

-- Verify the data was inserted
SELECT * FROM admin_users WHERE is_active = TRUE;
