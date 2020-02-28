const {REFRESH_RATE, SECONDS} = require('../config');
const Dragon = require('../dragon/index');

const refreshRate = SECONDS * REFRESH_RATE;

class Generation{
    constructor(){
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;
    }
    
    calculateExpiration() {
        const expirationPeriod = Math.floor(Math.random() * (refreshRate/2));
        const msBeforeExpiration = Math.random() > 0.5 ?
        refreshRate - expirationPeriod :
        refreshRate + expirationPeriod ;

        return new Date(Date.now() + msBeforeExpiration);
    }

    newDragon() {
        if (Date.now() > this.expiration){
            throw new Error(`This generation expired on ${this.expiration}`);
        }
        return new Dragon({generationId: this.generationId});
    }
}

module.exports = Generation;
