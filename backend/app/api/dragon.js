const { Router } = require('express');
const dragonTable = require('../dragon/table');
const {authenticated} = require('./helper');
const AccountDragonTable = require('../accountDragon/table');
const router = new Router();

router.get('/new', (req, res, next) => {
    let accountId, dragon;

    authenticated({sessionString: req.cookies.sessionString})
    .then(
        ({account})=> {
            accountId = account.id;
            dragon = req.app.locals.engine.generation.newDragon();
            return dragonTable.storeDragon(dragon)    
        }
    )
    .then(
        ({dragonId}) => {
            dragon.dragonId = dragonId;
            return AccountDragonTable.storeAccountDragon({accountId, dragonId})
    })
    .then(()=>{
        res.json({dragon});
    })
    .catch(error => next(error));
})

module.exports = router;