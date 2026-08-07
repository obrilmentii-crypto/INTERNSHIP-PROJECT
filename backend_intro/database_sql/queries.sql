INSERT INTO students (email, first_name, last_name, enrollment_date)
VALUES
('john.smith@email.com', 'John', 'Smith', '2026-01-15'),
('mary.jones@email.com', 'Mary', 'Jones', '2026-02-20'),
('alice.brown@email.com', 'Alice', 'Brown', '2026-03-10');

INSERT INTO courses (course_code, title, credit_hours)
VALUES
('DEV-201', 'Web Development', 3),
('DB-101', 'Database Systems', 4),
('NET-150', 'Computer Networks', 3)

INSERT INTO enrollments
(student_id, course_id, grade, completion_status)
VALUES
(1, 1, 'A', 'COMPLETED'),
(1, 2, 'B', 'IN_PROGRESS'),
(2, 1, 'A', 'COMPLETED'),
(2, 3, 'C', 'DROPPED'),
(3, 2, 'B', 'COMPLETED');

SELECT
    s.first_name || ' ' || s.last_name AS student_name,
    c.title AS course_title,
    e.completion_status
FROM students s
INNER JOIN enrollments e
ON s.student_id = e.student_id
INNER JOIN courses c
ON e.course_id = c.course;

SELECT
    c.title,
    COUNT(e.student_id) AS total_students
FROM courses c
LEFT JOIN enrollments e
ON c.course_id = e.course_id
GROUP BY c.course_id, c.title;

SELECT
    s.first_name,
    s.last_name,
    c.course_code
FROM students s
INNER JOIN enrollments e
ON s.student_id = e.student_id
INNER JOIN courses c
ON c.course_id = e.course_id
WHERE
    c.course_code = 'DEV-201'
    AND e.completion_status = 'COMPLETED';