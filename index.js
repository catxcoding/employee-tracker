const inquirer = require("inquirer");
const dbOps = require("./db/dbOperations");

async function init() {
  try {
    const answers = await inquirer.prompt({
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
        "Update an employee role",
        "Update an employee manager",
        "View employees by manager",
        "View employees by department",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "View the total utilized budget of a department",
        "Exit",
      ],
    });

    switch (answers.action) {
      case "View all departments":
        await dbOps.viewDepartments();
        break;
      case "View all roles":
        await dbOps.viewRoles();
        break;
      case "View all employees":
        await dbOps.viewEmployees();
        break;
      case "Add a department":
        await dbOps.addDepartment();
        break;
      case "Add a role":
        await dbOps.addRole();
        break;
      case "Add an employee":
        await dbOps.addEmployee();
        break;
      case "Update an employee role":
        await dbOps.updateEmployeeRole();
        break;
      case "Update an employee manager":
        await dbOps.updateEmployeeManager();
        break;
      case "View employees by manager":
        await dbOps.viewEmployeesByManager();
        break;
      case "View employees by department":
        await dbOps.viewEmployeesByDepartment();
        break;
      case "Delete a department":
        await dbOps.deleteDepartment();
        break;
      case "Delete a role":
        await dbOps.deleteRole();
        break;
      case "Delete an employee":
        await dbOps.deleteEmployee();
        break;
      case "View the total utilized budget of a department":
        await dbOps.viewDepartmentBudget();
        break;
      case "Exit":
        console.log("Goodbye!");
        process.exit(0);
        break;
      default:
        console.log("Invalid action");
        break;
    }

    init();
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

init(); // Start the application
