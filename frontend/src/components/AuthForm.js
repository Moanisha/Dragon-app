import React, {Component} from 'react';
import { Button, FormGroup, FormControl} from 'react-bootstrap';
import { signup, login } from '../actions/account';
import {connect} from 'react-redux'
import fetchStates from '../reducers/fetchStates';

class AuthForm extends Component {
    state ={ username:'', password:'', isFirstFormView: false};
    updateUsername=event=>{
        this.setState({username: event.target.value})
    }

    updatePassword=event=>{
        this.setState({password: event.target.value})
    }

    signup = () => {
        this.setState({isFirstFormView: true})
        const {username, password} = this.state;   
        this.props.signup({username,password});
    }

    login = () => {
        this.setState({isFirstFormView: true})
        const {username, password} = this.state;   
        this.props.login({username,password});
    }

    get Error () {
        if(this.state.isFirstFormView && this.props.account.status === fetchStates.error) {
            return <div>{this.props.account.message}</div>
        }
    }

    render(){
        const {account} = this.props;
        return(
            <div>
                 <h2> Dragon Stack </h2>
                <FormGroup>
                    <FormControl
                        type="text"
                        placeholder ="Username"
                        value={this.state.username}
                        onChange={this.updateUsername}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        type="password"
                        placeholder ="Password"
                        value={this.state.password}
                        onChange={this.updatePassword}
                    />
                </FormGroup>
                <div>
                    <Button onClick={this.login}>Login</Button>
                    <span>  OR  </span>
                    <Button onClick={this.signup}>Signup</Button>
                </div>
                {this.Error}
            </div>
        )
    }
};
const mapStateToProps = (state) => {
    const account = state.account;
    return {account};
}
const componentConnector = connect(mapStateToProps, {signup, login});

export default componentConnector(AuthForm);