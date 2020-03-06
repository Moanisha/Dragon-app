import React, {Component} from 'react';

class DragonAvatar extends Component{

    render() {
        const {dragonId, generationId, traits} = this.props.dragon;

        if(!dragonId) {
            return <div></div>
        }
        return (
            <div>
                <span>I { dragonId }.</span>
                <span>G { generationId }.</span>
                { traits.map(trait => trait.traitValue).join(', ') }
            </div>
        )
    }
}

export default DragonAvatar;