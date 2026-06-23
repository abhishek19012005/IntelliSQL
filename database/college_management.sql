CREATE DATABASE IF NOT EXISTS college;
USE college;

CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cgpa DECIMAL(3, 2),
    department_id INT,
    enrollment_year INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    grade VARCHAR(2),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    amount DECIMAL(10, 2),
    payment_status VARCHAR(20),
    payment_date DATE,
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    date DATE,
    status VARCHAR(10),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Insert Sample Data
INSERT INTO departments (department_name) VALUES ('Computer Science Engineering'), ('Electronics and Communication'), ('Mechanical Engineering');
INSERT INTO students (name, cgpa, department_id, enrollment_year) VALUES ('Abhishek', 8.5, 1, 2022), ('Naresh', 8.2, 1, 2022), ('Kiran', 9.1, 2, 2022);
INSERT INTO courses (course_name, credits, department_id) VALUES ('Database Systems', 4, 1), ('Operating Systems', 4, 1), ('Signals and Systems', 3, 2);
INSERT INTO faculty (name, department_id) VALUES ('Dr. Alan Turing', 1), ('Dr. Claude Shannon', 2);
INSERT INTO fees (student_id, amount, payment_status, payment_date) VALUES (1, 50000.00, 'Paid', '2023-01-15'), (2, 50000.00, 'Unpaid', NULL);
