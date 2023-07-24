const path = require('path');
require("dotenv").config({
  path: path.join(__dirname, '/.env')
});


/** @type {import('kanel').Config} */
module.exports = {
  connection: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },

  preDeleteOutputFolder: true,
  outputPath: './src/types',

  customTypeMap: {
    'pg_catalog.tsvector': 'string',
    'pg_catalog.bpchar': 'string',
  },
};