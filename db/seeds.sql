SET FOREIGN_KEY_CHECKS = 0;

-- Insert departments
INSERT INTO department (name) VALUES
  ('Engineering'),
  ('Human Resources'),
  ('Sales');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Software Engineer', 90000, 1),
  ('HR Manager', 80000, 2),
  ('Sales Representative', 70000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Tony', 'Stark', 1, NULL),
  ('Steve', 'Rogers', 2, NULL),
  ('Natasha', 'Romanoff', 3, 1);

SET FOREIGN_KEY_CHECKS = 1;