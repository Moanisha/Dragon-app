const pool = require('../../databasePool');

class TraitTable {
    static getTraitId({traitType, traitValue}){
        return new Promise((resolve, reject) => {
            pool.query(`SELECT id FROM trait where "traitType" = $1 AND "traitValue" = $2`,
            [traitType, traitValue],
            (error, response) => {
                if(error) return reject("error",error);

                return resolve({traitId: response.rows[0].id});
            })
        })

    }
}

// TraitTable.getTraitId({traitType:'backgroundColor', traitValue:'green'})
// .then(({traitId}) => {console.log('trait id', traitId)})
// .catch(error => console.log('error',error))

// Execute this alone using the command node app/trait/table.js

module.exports = TraitTable;