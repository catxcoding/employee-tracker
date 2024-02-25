const inquirer = require("inquirer");
// Ensure the path is correct based on your project structure. If dbOperations.js is inside a 'db' folder, use './db/dbOperations'
const dbOps = require("./db/dbOperations");

async function init() {
  try {
    const answers = await inquirer.prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "Add a department",
        "Update an employee role",
        "Exit",
      ],
    });

    switch (answers.action) {
      case "View all departments":
        await dbOps.viewDepartments();
        break;
      case "Add a department":
        await dbOps.addDepartment();
        break;
      case "Update an employee role":
        await dbOps.updateEmployeeRole();
        break;
      case "Exit":
        console.log("Goodbye!");
        process.exit(0); // Exits the application
        break;
      default:
        console.log("Invalid action");
        break;
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

init(); // This call is enough to start the application.
