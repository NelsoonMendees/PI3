const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
  host: 'localhost',
  database: 'PROJETO3',
  password: 'pwd123',
  port: 5433,

});

module.exports = pool;