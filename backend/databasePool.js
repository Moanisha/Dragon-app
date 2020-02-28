const { Pool } = require('pg');
const databaseConfiguration = require('./secrets/databaseConfiguration');

const pool = new Pool(databaseConfiguration);

// pool.query('SELECT * FROM generation',(error, response) => {
//     if(error) return console.log("error",error)

//     console.log("response", response.rows);
// })

module.exports = pool;