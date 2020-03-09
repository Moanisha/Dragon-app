import React, {Component} from 'react';
import DragonAvatar from './DragonAvatar';
import {Button} from 'react-bootstrap';
import {BACKEND} from '../config';

class AccountDragonRow extends Component{
    state = {
        nickname: this.props.dragon.nickname,
        edit: false
    }

    get saveButton(){
        return <Button onClick={this.save}>Save</Button>
    }
    get editButton(){
        return <Button onClick={this.toggleEdit}>Edit</Button>
    }

    toggleEdit = () => {
        this.setState({edit: !this.state.edit})
    }

    setNickname = event => {
        this.setState({nickname : event.target.value})
    }

    save = () => {
        fetch(`${BACKEND.ADDRESS}/dragon/update`,
        {
            method: 'PUT',
            body: JSON.stringify({
                dragonId: this.props.dragon.dragonId, 
                nickname: this.state.nickname}), //Backend accepts in json format 
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'  //Store session string in the browser
        })
        .then((response) => response.json())
        .then(json => {
            if(json.type === 'error'){
               alert(json.message)
            } else {
                this.toggleEdit()
            }
        })
        .catch(error => alert(json.message)) 
    }

    render(){
        return(
            <div>
                <div>{this.props.dragon.nickname}</div>
                <input 
                    type="text" 
                    value={this.state.nickname}
                    onChange={this.setNickname}
                    disabled={!this.state.edit}
                />
                {this.state.edit ? this.saveButton : this.editButton}
                <br/>
                <DragonAvatar dragon={this.props.dragon}/>
                <hr/>
            </div>
        )
    }
}

export default AccountDragonRow;