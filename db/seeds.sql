USE employee_tracker;

-- Insert departments
INSERT INTO department (id, name) VALUES
(1, 'Engineering'),
(2, 'Design'),
(3, 'Quality Assurance');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Frontend Developer', 80000, 1),
('UI/UX Designer', 90000, 2),
('DevOps Engineer', 120000, 1),
('Full Stack Developer', 110000, 1),
('Backend Developer', 100000, 1),
('Database Administrator', 95000, 1),
('Systems Analyst', 85000, 1),
('Software Developer', 105000, 1),
('Web Designer', 90000, 2),
('Mobile App Developer', 100000, 1),
('Quality Assurance Analyst', 85000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Tony', 'Stark', 1, NULL),
('Steve', 'Rogers', 2, 1),
('Natasha', 'Romanoff', 3, 1),
('Bruce', 'Banner', 4, 1),
('Peter', 'Parker', 5, 1),
('Luke', 'Skywalker', 6, NULL),
('Leia', 'Organa', 7, 6),
('Han', 'Solo', 8, 6),
('Jon', 'Snow', 9, NULL),
('Daenerys', 'Targaryen', 10, 9),
('Tyrion', 'Lannister', 11, 9),
('Arya', 'Stark', 12, 9),
('Hermione', 'Granger', 13, NULL),
('Harry', 'Potter', 14, 13),
('Loki', 'Laufeyson', 15, NULL),
('Cersei', 'Lannister', 16, 10),
('Joffrey', 'Baratheon', 17, 10);

