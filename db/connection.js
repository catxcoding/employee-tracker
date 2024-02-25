const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hello@cat-thompson.com`",
  password: "00000000",
  database: "employee_tracker",
});

module.exports = connection;
