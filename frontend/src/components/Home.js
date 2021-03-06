import React, {Component} from 'react';
import Generation from './Generation';
import Dragon from './Dragon';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {logout} from '../actions/account';
import { Link } from 'react-router-dom';

class Home extends Component {
    render(){
        return(
            <div>
                <Button onClick={this.props.logout} className="logout-button">Logout</Button>
                <h2> Dragon Stack </h2>
                <Generation/>
                <Dragon/>
                <hr/>
                <Link to='/account-dragons'>Account Dragons</Link>
            </div>
        )
    }
};

export default connect(null,{logout})(Home);