const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Setup MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your database user
  password: "password", // Replace with your database password
  database: "employee_tracker", // Your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
  init(); // Start the application after connection is established
});

function init() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Delete a department":
          deleteDepartment();
          break;
        case "Delete a role":
          deleteRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "Exit":
        default:
          connection.end();
          break;
      }
    });
}

function viewDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    init();
  });
}

function viewRoles() {
  const query =
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id";
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    init();
  });
}

function viewEmployees() {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id";
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    init();
  });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What is the name of the department?",
    })
    .then((answer) => {
      const query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, [answer.name], (err, result) => {
        if (err) throw err;
        console.log("Department added successfully!");
        init();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return "Please enter a valid number.";
        },
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department ID?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return "Please enter a valid number.";
        },
      },
    ])
    .then((answer) => {
      const query =
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(
        query,
        [answer.title, answer.salary, answer.department_id],
        (err, result) => {
          if (err) throw err;
          console.log("Role added successfully!");
          init();
        }
      );
    });
}

// Add Employee Function
function addEmployee() {
  let query = "SELECT id, title FROM role";
  connection.query(query, (err, roles) => {
    if (err) throw err;
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
    query =
      "SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee";
    connection.query(query, (err, employees) => {
      if (err) throw err;
      const managerChoices = employees.map(({ id, name }) => ({
        name,
        value: id,
      }));
      managerChoices.unshift({ name: "None", value: null });
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "roleId",
            type: "list",
            message: "What is the employee's role?",
            choices: roleChoices,
          },
          {
            name: "managerId",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          },
        ])
        .then((answer) => {
          query = "INSERT INTO employee SET ?";
          connection.query(
            query,
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id: answer.roleId,
              manager_id: answer.managerId,
            },
            (err, result) => {
              if (err) throw err;
              console.log("Employee added successfully!");
              init();
            }
          );
        });
    });
  });
}

// Delete Department Function
function deleteDepartment() {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices() {
            return results.map(({ id, name }) => ({
              name: name,
              value: id,
            }));
          },
          message: "Which department do you want to delete?",
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM department WHERE ?",
          { id: answer.choice },
          (err, res) => {
            if (err) throw err;
            console.log("Department deleted successfully!");
            init();
          }
        );
      });
  });
}

// Delete Role Function
function deleteRole() {
  connection.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices() {
            return results.map(({ id, title }) => ({
              name: title,
              value: id,
            }));
          },
          message: "Which role do you want to delete?",
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM role WHERE ?",
          { id: answer.choice },
          (err, res) => {
            if (err) throw err;
            console.log("Role deleted successfully!");
            init();
          }
        );
      });
  });
}

// Delete Employee Function
function deleteEmployee() {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices() {
            return results.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            }));
          },
          message: "Which employee do you want to delete?",
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM employee WHERE ?",
          { id: answer.choice },
          (err, res) => {
            if (err) throw err;
            console.log("Employee deleted successfully!");
            init();
          }
        );
      });
  });
}
