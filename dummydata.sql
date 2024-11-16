-- Insert dummy users
INSERT INTO Users (username, password_hash, role)
VALUES
('admin1', '$2a$10$hashedpassword1', 'admin'),
('faculty1', '$2a$10$hashedpassword2', 'faculty'),
('student1', '$2a$10$hashedpassword3', 'student');

-- Insert dummy students
INSERT INTO Students (name, email, phone, user_id)
VALUES
('John Doe', 'johndoe@example.com', '1234567890', 3);

-- Insert dummy faculty
INSERT INTO Faculty (name, department, email, user_id)
VALUES
('Jane Smith', 'Mathematics', 'janesmith@example.com', 2);

-- Insert dummy courses
INSERT INTO Courses (name, code, faculty_id, schedule)
VALUES
('Algebra 101', 'MATH101', 1, 'MWF 9:00-10:00 AM');

-- Insert dummy enrollments
INSERT INTO Enrollments (student_id, course_id)
VALUES
(1, 1);
