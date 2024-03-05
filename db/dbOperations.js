const connection = require("./connection");

const db = {
  // View all departments
  viewDepartments: async () => {
    const query = `SELECT * FROM department`;
    const [rows] = await connection.promise().query(query);
    console.table(rows);
  },

  // View all roles
  viewRoles: async () => {
    const query = `SELECT * FROM role`;
    const [rows] = await connection.promise().query(query);
    console.table(rows);
  },

  // View all employees
  viewEmployees: async () => {
    try {
      const query = `
      SELECT 
        e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, 
        CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM 
        employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
    `;
      const [rows] = await connection.promise().query(query);
      console.table(rows);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  },

  // Add a department
  addDepartment: async (name) => {
    const query = `INSERT INTO department (name) VALUES (?)`;
    await connection.promise().query(query, [name]);
    console.log(`Department "${name}" added successfully.`);
  },

  // Add a role
  addRole: async (title, salary, departmentId) => {
    try {
      const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      await connection.promise().query(query, [title, salary, departmentId]);
      console.log(`Role "${title}" added successfully.`);
    } catch (error) {
      console.error(`Error adding role: ${error.message}`);
    }
  }, // Added comma here

  // Add an employee
  addEmployee: async (firstName, lastName, roleId, managerId) => {
    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    await connection
      .promise()
      .query(query, [firstName, lastName, roleId, managerId]);
    console.log(`Employee "${firstName} ${lastName}" added successfully.`);
  },

  // Update an employee role
  updateEmployeeRole: async (employeeId, roleId) => {
    const query = `UPDATE employee SET role_id = ? WHERE id = ?`;
    await connection.promise().query(query, [roleId, employeeId]);
    console.log(`Employee role updated successfully.`);
  },

  // Update an employee manager
  updateEmployeeManager: async (employeeId, managerId) => {
    const query = `UPDATE employee SET manager_id = ? WHERE id = ?`;
    await connection.promise().query(query, [managerId, employeeId]);
    console.log(`Employee manager updated successfully.`);
  },

  // View employees by manager
  viewEmployeesByManager: async (managerId) => {
    const query = `SELECT * FROM employee WHERE manager_id = ?`;
    const [rows] = await connection.promise().query(query, [managerId]);
    console.table(rows);
  },

  // View employees by department
  viewEmployeesByDepartment: async (departmentId) => {
    const query = `SELECT * FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ?)`;
    const [rows] = await connection.promise().query(query, [departmentId]);
    console.table(rows);
  },

  // Delete a department
  deleteDepartment: async (departmentId) => {
    const query = `DELETE FROM department WHERE id = ?`;
    await connection.promise().query(query, [departmentId]);
    console.log(`Department deleted successfully.`);
  },

  // Delete a role
  deleteRole: async (roleId) => {
    const query = `DELETE FROM role WHERE id = ?`;
    await connection.promise().query(query, [roleId]);
    console.log(`Role deleted successfully.`);
  },

  // Delete an employee
  deleteEmployee: async (employeeId) => {
    const query = `DELETE FROM employee WHERE id = ?`;
    await connection.promise().query(query, [employeeId]);
    console.log(`Employee deleted successfully.`);
  },

  // View the total utilized budget of a department
  viewDepartmentBudget: async (departmentId) => {
    const query = `
      SELECT 
        d.name AS department, SUM(r.salary) AS total_budget
      FROM 
        employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
      WHERE 
        d.id = ?
      GROUP BY 
        d.name
    `;
    const [rows] = await connection.promise().query(query, [departmentId]);
    console.table(rows);
  },
};

// Fetch all roles from the database
const getRoles = async () => {
  const query = `SELECT id, title FROM role`;
  const [rows] = await connection.promise().query(query);
  return rows;
};

// Fetch all managers from the database
const getManagers = async () => {
  const query = `SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL`;
  const [rows] = await connection.promise().query(query);
  return rows;
};

// Get the role ID based on the role title
const getRoleId = async (title) => {
  const query = `SELECT id FROM role WHERE title = ?`;
  const [rows] = await connection.promise().query(query, [title]);
  return rows[0].id;
};

// Get the department ID based on the department name
const getDepartmentId = async (name) => {
  const query = `SELECT id FROM department WHERE name = ?`;
  const [rows] = await connection.promise().query(query, [name]);
  return rows[0].id;
};

// Get the manager ID based on the manager's name
const getManagerId = async (managerName) => {
  const [firstName, lastName] = managerName.split(" ");
  const query = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`;
  const [rows] = await connection.promise().query(query, [firstName, lastName]);
  return rows[0].id;
};

module.exports = {
  ...db,
  getRoles,
  getManagers,
  getRoleId,
  getDepartmentId,
  getManagerId,
};
