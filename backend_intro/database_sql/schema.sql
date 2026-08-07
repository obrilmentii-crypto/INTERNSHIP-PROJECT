CREATE TABLE students (
    student_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    enrollment_date DATE NOT NULL
);
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    credit_hours INTEGER NOT NULL
);
CREATE TABLE enrollments (
    enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade CHAR(2),
    completion_status VARCHAR(20) NOT NULL
        CHECK (completion_status IN ('IN_PROGRESS', 'COMPLETED', 'DROPPED')),

    FOREIGN KEY (student_id)
        REFERENCES students(student_id),

    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
);