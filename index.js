const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./db/connection");

function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "View all departments":
          viewDepartments();
          break;

        case "Exit":
          connection.end();
          break;
        default:
          console.log(`Invalid action: ${answers.action}`);
          break;
      }
    });
}

promptUser();

function viewDepartments() {
  connection.query("SELECT * FROM department", (err, results) => {
    if (err) throw err;
    console.table(results);
    promptUser();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.departmentName],
        (err) => {
          if (err) throw err;
          console.log("Department added successfully!");
          promptUser();
        }
      );
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.departmentName],
        (err) => {
          if (err) throw err;
          console.log("Department added successfully!");
          promptUser();
        }
      );
    });
}

function updateEmployeeRole() {
  // Example: Get employees and roles from the database first
  // Then use inquirer to prompt choices (not fully implemented here)
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Select an employee to update:",
        choices: [], // Populate with employees from your database
      },
      {
        type: "list",
        name: "roleId",
        message: "Select the new role:",
        choices: [], // Populate with roles from your database
      },
    ])
    .then((answer) => {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answer.roleId, answer.employeeId],
        (err) => {
          if (err) throw err;
          console.log("Employee role updated successfully!");
          promptUser();
        }
      );
    });
}
