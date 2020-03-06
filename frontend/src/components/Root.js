import React, {Component} from 'react';
import Home from './Home';
import AuthForm from './AuthForm';
import {connect} from 'react-redux';

class Root extends Component{

    render(){
      const account = this.props;
      
      return(
          account.loggedIn ? <Home/> : <AuthForm/>
        )
    }
};

const mapStateToProps = state => {
  const account = state.account;
  return account;
}

const componentConnector= connect(mapStateToProps);
export default componentConnector(Root);