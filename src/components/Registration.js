import React, { Component } from 'react';
import { observable, action, computed} from 'mobx';
import { observer, inject } from 'mobx-react';
import {
    Header,
    Input,
    Form,
    Button
} from 'semantic-ui-react';

@inject('FBStore')
class Registration extends Component {
    constructor(props) {
        super(props);

    }

    @observer
    render() {
        return (
            <Form>
                <Header>Registration</Header>
                <Form.Field width={4}>
                    <label>Username</label>
                    <Input name='username' type='text'></Input>
                </Form.Field>
                <Form.Field width={4}>
                    <label>Password</label>
                    <Input name='password' type='password'></Input>
                </Form.Field>
                <Button>Register</Button>
                <Button>Log In</Button>
            </Form>
        );
    }
}

export default Registration;