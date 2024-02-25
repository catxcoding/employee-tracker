USE employee_tracker;

-- Insert departments
INSERT INTO department (name) VALUES ('Engineering'), ('Human Resources'), ('Marketing');

-- Insert roles (assuming department IDs are 1, 2, and 3 respectively)
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 70000, 1), ('HR Manager', 65000, 2), ('Marketing Coordinator', 60000, 3);

-- Insert employees (assuming role IDs are 1, 2, and 3 respectively)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL), ('Jane', 'Smith', 2, NULL), ('Emily', 'Jones', 3, 1);
