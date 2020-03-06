// const Dragon = require('./dragon');

// const fooey = new Dragon ({
//     birthdate: new Date(),
//     nickname: 'fooey'
// });
// const baloo = new Dragon({
//     birthdate: new Date(),
//     nickname: 'baloo'
// });

// const def = new Dragon();

// setTimeout(()=> {
//     const gooby = new Dragon();
//     console.log("gooby", gooby);
// }, 5000);

// console.log("fooey", fooey);
// console.log("baloo", baloo);
// console.log("default", def);


// const Generation = require('./generation');

// const generation = new Generation();
// console.log("generation", generation);

// const gooby = generation.newDragon();
// console.log("gooby", gooby);

// setTimeout(() => {
//     const mimar = generation.newDragon();
//     console.log("mimar", mimar);
// },15000)


const generationEngine = require('./generation/engine');
const express = require('express');
const cors = require('cors');
const dragonRouter = require('./api/dragon');
const generationRouter = require('./api/generation');
const accountRouter = require('./api/account');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const engine = new generationEngine();
engine.start();

app.locals.engine = engine;

app.use(cors({origin: 'http://localhost:1234', credentials: true}))
app.use(bodyParser.json())
app.use(cookieParser());
app.use('/dragon', dragonRouter)
app.use('/generation', generationRouter)
app.use('/account', accountRouter)

//Error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: 'error',
        message: err.message
    })
});

// Instead of directly using it in index.js file, creating a new api folder and using Router from express

// app.get('/dragon/new', (req, res) => {
//     res.json({ dragon: engine.generation.newDragon()})
// })

// To stop the generation engine 

// setTimeout(()=>{
//     engine.stop();
// },15000);

module.exports = app;