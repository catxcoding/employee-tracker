const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "catxcoding`",
  password: "00000000",
  database: "employee_tracker",
});
Promise();

module.exports = connection;
