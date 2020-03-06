import React, {Component} from 'react';
import DragonAvatar from './DragonAvatar';
import { Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchDragon} from '../actions/dragon';
import fetchStates from '../reducers/fetchStates';

class Dragon extends Component {

    // componentDidMount(){
    //     this.props.fetchDragon();
    // }

    // fetchDragon = () => {
    //     fetch('http://localhost:3000/dragon/new')
    //     .then(response => response.json())
    //     .then(json => {
    //         this.setState({dragon: json.dragon})
    //     })
    //     .catch(error => console.log('error', error))
    // }

    render() {
        // const {dragonId, generationId, traits} = this.state.dragon;
        // return (
        //     <div>
        //         <span>I { dragonId }.</span>
        //         <span>G { generationId }.</span>
        //         { traits.map(trait => trait.traitValue).join(', ') }
        //     </div>
        // )

        // Sent as props to dragonavatar
        const {dragon} = this.props;

        if(dragon.status === fetchStates.error) {
            return <div>{dragon.status}</div>
        }
        return (
            <div>
                 Status: {dragon.status} <br/>
                <Button onClick={this.props.fetchDragon}>New Dragon</Button>
                <DragonAvatar dragon={dragon}/> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const dragon = state.dragon;

    return {dragon};
}

const componentConnector = connect(mapStateToProps, {fetchDragon});
export default componentConnector(Dragon);