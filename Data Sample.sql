
CREATE DATABASE IF NOT EXISTS web_project;
USE web_project;

-- Bảng người dùng
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user'
);

-- Bảng nội dung (bài viết / sản phẩm)
CREATE TABLE IF NOT EXISTS contents (
    content_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_by INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Bảng học kỳ
CREATE TABLE IF NOT EXISTS semesters (
    semester_id INT AUTO_INCREMENT PRIMARY KEY,
    semester_name VARCHAR(10) NOT NULL UNIQUE
);

-- Bảng môn học
CREATE TABLE IF NOT EXISTS subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(50) NOT NULL UNIQUE
);

-- Bảng học sinh
CREATE TABLE IF NOT EXISTS students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100),
    birth_year INT
);

-- Bảng điểm
CREATE TABLE IF NOT EXISTS scores (
    score_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject_id INT,
    semester_id INT,
    score DECIMAL(4,1),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (semester_id) REFERENCES semesters(semester_id)
);

-- Bảng bình luận và đánh giá
CREATE TABLE IF NOT EXISTS comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    content_id INT,
    user_id INT,
    comment TEXT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (content_id) REFERENCES contents(content_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Bảng liên hệ / phản hồi
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS comments (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  content_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user'
);
INSERT INTO users (username, password, role)
VALUES 
  ('admin', '123456', 'admin'),
  ('hoang', '123456', 'user');
DESCRIBE comments;
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(50),
  role VARCHAR(20)
);
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS contents;
CREATE DATABASE IF NOT EXISTS web_project;
USE web_project;

-- Bảng người dùng
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);

-- Dữ liệu mẫu
INSERT INTO users (username, password, role)
VALUES 
  ('admin', '123456', 'admin'),
  ('hoang', '123456', 'user');

-- Bảng bình luận
CREATE TABLE IF NOT EXISTS comments (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  content_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS scores;
CREATE DATABASE IF NOT EXISTS web_project;
USE web_project;

-- Bảng người dùng
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user'
);

-- Dữ liệu mẫu
INSERT INTO users (username, password, role)
VALUES 
  ('admin', '123456', 'admin'),
  ('hoang', '123456', 'user');

-- Bảng bài viết để test comment
CREATE TABLE IF NOT EXISTS contents (
  content_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  body TEXT
);

INSERT INTO contents (title, body)
VALUES ('Test bài viết', 'Đây là nội dung test');

-- Bảng bình luận
CREATE TABLE IF NOT EXISTS comments (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  content_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (content_id) REFERENCES contents(content_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
SELECT * FROM users;
INSERT INTO users (username, password, role)
VALUES 
  ('admin', '123456', 'admin'),
  ('hoang', '123456', 'user');
SELECT * FROM users;
-- Xoá bảng nếu đã tồn tại
DROP TABLE IF EXISTS students;

-- Tạo bảng học sinh
CREATE TABLE students (
  student_id INT PRIMARY KEY,
  student_name VARCHAR(100),
  birth_year INT
);

-- Thêm 10 học sinh đều sinh năm 2004
INSERT INTO students (student_id, student_name, birth_year)
VALUES
  (1, 'Trương Tuấn Hưng', 2004),
  (2, 'Vũ Thanh Hằng', 2004),
  (3, 'Nguyễn Văn Kiệt', 2004),
  (4, 'Sơn Tùng MTP', 2004),
  (5, 'Gdragon', 2004),
  (6, 'Justin Bieber', 2004),
  (7, 'Taylor Swift', 2004),
  (8, 'Dua Lipa', 2004),
  (9, 'Soobin Hoàng Sơn', 2004),
  (10, 'Conan Gray', 2004);

SELECT * FROM students;
SELECT * FROM users;
DROP TABLE IF EXISTS students;
CREATE TABLE students (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100),
  birth_year INT
);
DROP TABLE IF EXISTS students;

CREATE TABLE students (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100),
  birth_year INT
);
SELECT * FROM students;
CREATE DATABASE IF NOT EXISTS web_project;
USE web_project;
CREATE TABLE IF NOT EXISTS subjects (
  subject_id INT AUTO_INCREMENT PRIMARY KEY,
  subject_name VARCHAR(50) NOT NULL UNIQUE
);
INSERT INTO subjects (subject_name)
VALUES ('Toán'), ('Văn'), ('Anh'), ('Lý'), ('Hóa'), ('Sinh'), ('Sử'), ('Địa');
CREATE TABLE IF NOT EXISTS semesters (
  semester_id INT AUTO_INCREMENT PRIMARY KEY,
  semester_name VARCHAR(10) NOT NULL UNIQUE
);
INSERT INTO semesters (semester_name)
VALUES ('HK1'), ('HK2');
CREATE TABLE IF NOT EXISTS scores (
  score_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  subject_id INT,
  semester_id INT,
  score DECIMAL(4,1),
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
  FOREIGN KEY (semester_id) REFERENCES semesters(semester_id)
);
SELECT * FROM scores;
SELECT * FROM subjects;
SELECT * FROM semesters;
-- Thêm điểm cho 10 học sinh từ student_id = 1 đến 10
-- subject_id từ 1 đến 8 (Toán -> Địa)
-- semester_id: 1 (HK1), 2 (HK2)

INSERT INTO scores (student_id, subject_id, semester_id, score) VALUES
-- Trương Tuấn Hưng
(1,1,1,8.5),(1,2,1,9.0),(1,3,1,8.0),(1,4,1,7.5),(1,5,1,9.2),(1,6,1,6.8),(1,7,1,7.0),(1,8,1,9.0),
(1,1,2,9.0),(1,2,2,8.5),(1,3,2,9.2),(1,4,2,7.5),(1,5,2,8.5),(1,6,2,7.8),(1,7,2,8.0),(1,8,2,8.6),

-- Vũ Thanh Hằng
(2,1,1,7.5),(2,2,1,7.0),(2,3,1,6.5),(2,4,1,8.2),(2,5,1,6.8),(2,6,1,7.1),(2,7,1,6.9),(2,8,1,7.5),
(2,1,2,7.8),(2,2,2,8.0),(2,3,2,7.2),(2,4,2,6.5),(2,5,2,7.0),(2,6,2,8.1),(2,7,2,7.5),(2,8,2,6.9),

-- Nguyễn Văn Kiệt
(3,1,1,9.0),(3,2,1,8.5),(3,3,1,7.2),(3,4,1,8.1),(3,5,1,9.3),(3,6,1,8.0),(3,7,1,9.0),(3,8,1,8.7),
(3,1,2,9.5),(3,2,2,8.9),(3,3,2,8.0),(3,4,2,9.1),(3,5,2,8.4),(3,6,2,8.5),(3,7,2,9.0),(3,8,2,9.5),

-- Sơn Tùng MTP
(4,1,1,7.0),(4,2,1,7.5),(4,3,1,8.0),(4,4,1,7.2),(4,5,1,8.0),(4,6,1,7.7),(4,7,1,7.5),(4,8,1,8.2),
(4,1,2,8.2),(4,2,2,8.0),(4,3,2,8.3),(4,4,2,7.9),(4,5,2,8.5),(4,6,2,7.5),(4,7,2,7.8),(4,8,2,8.0),

-- Gdragon
(5,1,1,9.0),(5,2,1,9.5),(5,3,1,9.0),(5,4,1,9.2),(5,5,1,9.0),(5,6,1,8.8),(5,7,1,8.5),(5,8,1,8.9),
(5,1,2,9.1),(5,2,2,9.4),(5,3,2,9.2),(5,4,2,9.0),(5,5,2,9.5),(5,6,2,9.3),(5,7,2,9.0),(5,8,2,9.2),

-- Justin Bieber
(6,1,1,6.5),(6,2,1,6.9),(6,3,1,7.0),(6,4,1,6.8),(6,5,1,7.0),(6,6,1,6.5),(6,7,1,7.2),(6,8,1,6.9),
(6,1,2,7.2),(6,2,2,7.5),(6,3,2,7.0),(6,4,2,7.1),(6,5,2,6.8),(6,6,2,6.9),(6,7,2,7.0),(6,8,2,7.2),

-- Taylor Swift
(7,1,1,8.2),(7,2,1,8.5),(7,3,1,8.1),(7,4,1,8.7),(7,5,1,8.5),(7,6,1,8.0),(7,7,1,7.8),(7,8,1,8.6),
(7,1,2,8.9),(7,2,2,9.0),(7,3,2,8.6),(7,4,2,8.8),(7,5,2,9.0),(7,6,2,8.7),(7,7,2,8.5),(7,8,2,9.1),

-- Dua Lipa
(8,1,1,7.8),(8,2,1,7.5),(8,3,1,7.2),(8,4,1,7.0),(8,5,1,7.4),(8,6,1,7.5),(8,7,1,7.8),(8,8,1,7.3),
(8,1,2,8.0),(8,2,2,8.2),(8,3,2,8.1),(8,4,2,7.9),(8,5,2,8.0),(8,6,2,7.5),(8,7,2,8.0),(8,8,2,8.3),

-- Soobin Hoàng Sơn
(9,1,1,7.5),(9,2,1,7.8),(9,3,1,8.0),(9,4,1,7.9),(9,5,1,8.2),(9,6,1,8.0),(9,7,1,7.8),(9,8,1,8.4),
(9,1,2,8.5),(9,2,2,8.7),(9,3,2,8.0),(9,4,2,8.2),(9,5,2,8.6),(9,6,2,8.4),(9,7,2,8.3),(9,8,2,8.7),

-- Conan Gray
(10,1,1,6.9),(10,2,1,7.0),(10,3,1,7.2),(10,4,1,7.5),(10,5,1,6.8),(10,6,1,6.9),(10,7,1,7.0),(10,8,1,7.3),
(10,1,2,7.5),(10,2,2,7.8),(10,3,2,7.2),(10,4,2,7.1),(10,5,2,7.5),(10,6,2,7.0),(10,7,2,7.3),(10,8,2,7.6);
SELECT s.score_id, sb.subject_name, sm.semester_name, s.score
FROM scores s
JOIN subjects sb ON s.subject_id = sb.subject_id
JOIN semesters sm ON s.semester_id = sm.semester_id
WHERE s.student_id = 1;
SELECT s.score_id, sb.subject_name, sm.semester_name, s.score
FROM scores s
JOIN subjects sb ON s.subject_id = sb.subject_id
JOIN semesters sm ON s.semester_id = sm.semester_id
WHERE s.student_id = 7;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100),
  birth_year INT
);
SELECT * FROM students;
SELECT * FROM subjects;
SELECT * FROM semesters;
USE web_project;
CREATE TABLE IF NOT EXISTS feedback (
  feedback_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  message TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SHOW TABLES;
SHOW TABLES;
SELECT * FROM students;
DROP TABLE IF EXISTS view_count;
SHOW TABLES;
SELECT * FROM users;
INSERT INTO users (username, password, role)
VALUES ('alex', '123456', 'user');
USE web_project;
SELECT * FROM scores WHERE score_id = 1;
USE web_project;
SHOW TABLES;









