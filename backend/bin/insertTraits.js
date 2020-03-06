const pool = require('../databasePool')
const TRAITS = require('../data/traits')

TRAITS.forEach(trait => {
    const traitType = trait.type;
    const traitValues = trait.values;

    traitValues.forEach(traitValue => {
        pool.query(
            `INSERT INTO trait("traitType","traitValue") VALUES ($1, $2) RETURNING id`,
            [traitType, traitValue],
            (error, response) => {
                if(error) console.log("error",error);

                const traitId = response.rows[0].id;
                console.log(`Inserted trait - id: ${traitId}`)
            }
        )
    })
});