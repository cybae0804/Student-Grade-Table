import React, { Component } from 'react';
import { observable, action, computed} from 'mobx';
import { observer, inject } from 'mobx-react';
import {
    Header,
    Form,
    Button
} from 'semantic-ui-react';

@inject('FBStore')
class Registration extends Component {
    
    constructor(props) {
        super(props);
    }

    @observable
    formInput = {
        username: '',
        password: ''
    }

    @action
    handleChange = event => {
        this.formInput[event.target.name] = event.target.value;
    }

    @action
    register = () => {
        console.log(this.formInput.username, this.formInput.password);
    }

    @action
    login = () => {
        console.log(this.formInput.username, this.formInput.password);
    }

    @observer
    render() {
        return (
            <Form>
                <Header>Registration</Header>
                <Form.Field width={4}>
                    <label>Username</label>
                    <input name='username' type='text' value={this.formInput.username} onChange={this.handleChange}></input>
                </Form.Field>
                <Form.Field width={4}>
                    <label>Password</label>
                    <input name='password' type='password' value={this.formInput.password} onChange={this.handleChange}></input>
                </Form.Field>
                <Button onClick={this.register}>Register</Button>
                <Button onClick={this.login}>Log In</Button>
            </Form>
        );
    }
}

export default Registration;