var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '01022940344',
    database: 'nodejs_project'
  });
  db.connect();
  module.exports = db;