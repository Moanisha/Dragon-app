const pool = require('../../databasePool');
const DragonTable = require('../dragon/table');
const Dragon = require('../dragon/index')

const getDragonWithTraits = ({dragonId}) => {
    return Promise.all([
        DragonTable.getDragon({dragonId}),
        new Promise((resolve, reject) => {
            pool.query(
                `SELECT "traitType", "traitValue"
                 FROM trait 
                 INNER JOIN dragonTrait
                 ON trait.id = dragonTrait."traitId"
                 WHERE dragonTrait."dragonId" = $1`,
                 [dragonId],
                 (error,response) => {
                     if(error) return reject(error)
    
                     resolve(response.rows)
                 }
            )
        })
    ])
    .then(([dragon, dragonTraits]) => {
        return new Dragon({...dragon,  dragonId: dragonId, traits: dragonTraits } )
    }) 
    .catch(error => console.log('error',error))
}

getDragonWithTraits({dragonId : 1})
.then(res => console.log(res))
.catch(err => console.log(err));

module.exports = {getDragonWithTraits};