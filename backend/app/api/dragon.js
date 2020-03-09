const { Router } = require('express');
const DragonTable = require('../dragon/table');
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
            return DragonTable.storeDragon(dragon)    
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

router.put('/update',(req, res, next)=>{
    const {dragonId, nickname} = req.body;

    DragonTable.updateDragon({dragonId, nickname})
    .then(()=> res.json({message: 'Dragon updated successfully'}))
    .catch(error => next(error));
})

module.exports = router;