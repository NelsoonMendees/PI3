const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
  host: 'localhost',
  database: 'PI03',
  password: 'pwd123',
  port: 5433,

});

module.exports = pool;