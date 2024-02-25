const inquirer = require("inquirer");
const connection = require("./connection"); // Importing your existing connection module

// Convert connection methods to use promises
const db = connection.promise();

// Function to view all departments
async function viewDepartments() {
  const [rows] = await db.query("SELECT * FROM department");
  console.table(rows);
}

// Function to add a department
async function addDepartment() {
  const answer = await inquirer.prompt([
    {
      name: "departmentName",
      type: "input",
      message: "What is the name of the department?",
    },
  ]);

  await db.query("INSERT INTO department (name) VALUES (?)", [
    answer.departmentName,
  ]);
  console.log(`Added ${answer.departmentName} to the database`);
}

// Function to update an employee's role
async function updateEmployeeRole() {
  const answers = await inquirer.prompt([
    {
      name: "employeeId",
      type: "input",
      message: "Enter the ID of the employee you want to update:",
    },
    {
      name: "newRoleId",
      type: "input",
      message: "Enter the new role ID for the employee:",
    },
  ]);

  await db.query("UPDATE employee SET role_id = ? WHERE id = ?", [
    answers.newRoleId,
    answers.employeeId,
  ]);
  console.log(`Updated employee's role in the database`);
}

module.exports = {
  viewDepartments,
  addDepartment,
  updateEmployeeRole,
};
