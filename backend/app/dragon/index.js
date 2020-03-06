const TRAITS = require('../../data/traits');

const DEFAULT_PROPERTIES = {
    dragonId: undefined,
    nickname: 'name me',
    // birthdate: new Date(),    => Not used since this date gets set when index.js file is launched and timeout doesn't gets applied
    get birthdate() {
        return new Date();
    },
    get randomTraits() {
        const traits = [];
        TRAITS.forEach(TRAIT => {
            const traitType = TRAIT.type;
            const traitValue = TRAIT.values[Math.floor(Math.random() * TRAIT.values.length)];
            traits.push({traitType, traitValue});
        });
        return traits;
    },
    generationId : undefined
}
class Dragon {
    constructor({dragonId, birthdate, nickname, traits, generationId} = {}){
        this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
        this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
        this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
        this.dragonId = dragonId || DEFAULT_PROPERTIES.dragonId;
    }
}

module.exports = Dragon;