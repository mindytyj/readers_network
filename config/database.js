const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPW,
  port: process.env.PGPORT,
  ssl: true,
});

module.exports = {
  pool,
};
