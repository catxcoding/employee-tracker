const connection = require("./connection");

const dbOperations = {
  viewDepartments: async () => {
    const query = "SELECT * FROM department";
    const [rows] = await connection.promise().query(query);
    console.table(rows);
  },
  viewRoles: async () => {
    const query = `SELECT role.id, role.title, role.salary, department.name AS department 
                   FROM role 
                   INNER JOIN department ON role.department_id = department.id`;
    const [rows] = await connection.promise().query(query);
    console.table(rows);
  },
  viewEmployees: async () => {
    const query = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
                   CONCAT(m.first_name, ' ', m.last_name) AS manager 
                   FROM employee e 
                   LEFT JOIN role ON e.role_id = role.id 
                   LEFT JOIN department ON role.department_id = department.id 
                   LEFT JOIN employee m ON e.manager_id = m.id`;
    const [rows] = await connection.promise().query(query);
    console.table(rows);
  },
  addDepartment: async (name) => {
    const query = "INSERT INTO department (name) VALUES (?)";
    const [result] = await connection.promise().query(query, [name]);
    console.log(`Added department: ${name}`);
  },
  addRole: async (title, salary, department_id) => {
    const query =
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    const [result] = await connection
      .promise()
      .query(query, [title, salary, department_id]);
    console.log(`Added role: ${title}`);
  },
  addEmployee: async (firstName, lastName, roleId, managerId) => {
    const query =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    const [result] = await connection
      .promise()
      .query(query, [firstName, lastName, roleId, managerId]);
    console.log(`Added employee: ${firstName} ${lastName}`);
  },
  updateEmployeeRole: async (employeeId, newRoleId) => {
    const query = "UPDATE employee SET role_id = ? WHERE id = ?";
    const [result] = await connection
      .promise()
      .query(query, [newRoleId, employeeId]);
    console.log(`Updated employee's role.`);
  },
};

module.exports = dbOperations;
