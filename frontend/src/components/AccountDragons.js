import React, {Component} from 'react';
import {connect} from 'react-redux'
import {fetchAccountDragons} from '../actions/accountDragons'
import AccountDragonRow from './AccountDragonRow';
import {Link} from 'react-router-dom';

class AccountDragons extends Component {
    componentDidMount(){
        this.props.fetchAccountDragons();
    }

    render(){
        console.log(this.props.accountDragons)
        return(
            <div>
                <h3>Account Dragons</h3>
                {
                    this.props.accountDragons.dragons.map(dragon => {
                        return(
                            <div key={dragon.dragonId}>
                                <AccountDragonRow dragon={dragon}/>
                            </div>
                        )
                    })
                }
                <Link to='/'>Home</Link>
            </div>
        )
    }
}

const connectorComponent = connect(({accountDragons})=>({accountDragons}), {fetchAccountDragons})
export default connectorComponent(AccountDragons);