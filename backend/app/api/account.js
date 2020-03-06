const {Router} = require('express');
const AccountTable = require('../account/table');
const {hash} = require('../account/helper');
const setSession = require('./helper')
const router = new Router();
const Session = require('../account/session');

router.post('/signup',(req,res,next)=>{
    const {username, password} = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({usernameHash})
    .then(({account}) => {
        if(!account){
            return AccountTable.storeAccount({usernameHash,passwordHash})
        } else {
            const error = new Error("This username has already been taken");
            error.statusCode = 409;
            throw error;
        }
    })
    .then(() => { //This .then is for the AccountTable.storeaccount promise
        return setSession({username, res}) //setSession is a nested promise so instead of calling .then immediately after the method we can return the setSession and implement .then at the end
    })
    .then(({message})=>{  //This .then is for the setSession promise
        res.json({message});
    })
    .catch((err)=>next(err));  //By returning the nested promise we can avoid having multiple catch statements
})

router.post('/login',(req,res,next) => {
    const {username, password} = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({usernameHash})
    .then(({account})=>{
        if(account && account.passwordHash === passwordHash){
            const {sessionId} = account;
            return setSession({username, res, sessionId})
        } else {
            const error = new Error("Username / Password is incorrect");
            error.statusCode = 409;
            throw error;
        }
    })
    .then(({message})=>{
        res.json({message});
    })
    .catch((err)=>next(err));
})

router.get('/logout', (req, res, next) => {
    const {username} = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({
        sessionId: null,
        usernameHash: hash(username)
    }).then(()=>{
        res.clearCookie('sessionString');
        res.json({message: 'Successful logout'})
    })
    .catch((err)=>next(err));
})

module.exports = router;