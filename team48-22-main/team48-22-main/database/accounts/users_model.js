const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'user_data',
  password: 'root',
  port: 5432,
});