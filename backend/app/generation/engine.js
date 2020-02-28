const Generation = require('.');
const generationTable = require('./table');
class GenerationEngine {
    constructor() {
        this.generation = null;
    }

    start() {
        this.buildNewGeneration();
    }

    stop() {
        clearTimeout(this.timer);
    }

    buildNewGeneration() {
    // Without using promise
        // this.generation = new Generation();
        // generationTable.storeGeneration(this.generation);  

        // console.log("Generation", this.generation);

        // this.timer = setTimeout(() => {
        //     this.buildNewGeneration();
        // }, this.generation.expiration.getTime() - Date.now());


    //With promise 
        const generation = new Generation();
        generationTable.storeGeneration(generation)
        .then(({generationId}) => {
            this.generation = generation;
            this.generation.generationId = generationId;
            
            console.log("Generation", this.generation);

            this.timer = setTimeout(() => {
                this.buildNewGeneration();
            }, this.generation.expiration.getTime() - Date.now());
        })
        .catch(err=> console.log(err));
    }
}

module.exports = GenerationEngine;