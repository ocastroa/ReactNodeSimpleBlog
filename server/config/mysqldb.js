const mysql = require('mysql2/promise');
const config = require('config');
const db = config.get('dbConfig'); // get from default.json

// create connection pool
const con = () => {
  return mysql.createPool(db);
};

module.exports = con;
