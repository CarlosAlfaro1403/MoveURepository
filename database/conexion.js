// const pg = require('pg');
// const { Pool } = pg;

// let config = {
//     user: 'postgres',
//     password: 'adminsam',
//     host: 'localhost',
//     port: '5432',
//     database: 'PROYECTO_TAXIS'
// };

// const pool = new Pool(config);
// module.exports = pool;
const { Sequelize } = require('sequelize')
const databases = require('../configurations/databases')

module.exports = class Connection {
  static async connectionTest (params) {
    const sequelize = new Sequelize(databases.development)
    try {
      await sequelize.authenticate()
      console.log('Connection Successful')
    } catch (error) {
      console.log(error)
    }
  }

  static connect () {
    return new Sequelize(databases.development)
  }
}
