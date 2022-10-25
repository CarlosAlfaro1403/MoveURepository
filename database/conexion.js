const pg = require('pg');
const { Pool } = pg;

let config = {
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: '5432',
    database: 'PROYECTO_TAXIS'
};

const pool = new Pool(config);
module.exports = pool;
