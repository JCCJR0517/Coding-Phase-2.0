-- Create the Users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'faculty', 'student') NOT NULL
);

-- Create the Students table
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create the Faculty table
CREATE TABLE faculty (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    email VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create the Courses table
CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    faculty_id INT,
    schedule VARCHAR(255),
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
);

-- Create the Enrollments table
CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);


INSERT INTO users (username, password_hash, role) VALUES
('admin', 'hashedpassword', 'admin'),
('faculty1', 'hashedpassword', 'faculty'),
('student1', 'hashedpassword', 'student');

-- Insert students
INSERT INTO students (name, email, phone, user_id) VALUES
('John Doe', 'john@example.com', '1234567890', 3);

INSERT INTO faculty (name, department, email, user_id) VALUES
('Dr. Smith', 'Computer Science', 'smith@example.com', 2);


INSERT INTO courses (name, code, faculty_id, schedule) VALUES
('Java Programming', 'CS101', 1, 'Mon-Wed 10:00-11:30');


INSERT INTO enrollments (student_id, course_id) VALUES
(1, 1);
