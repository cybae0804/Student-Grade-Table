import React, { Component } from 'react'
import { observable, action, computed} from 'mobx';
import { observer, inject } from 'mobx-react';
import {
  Dropdown,
  Menu,
} from 'semantic-ui-react'

@inject('FBStore')
class TopMenu extends Component {

    constructor(props) {
        super(props);
    }

    signOutHandler = () => {
        this.props.FBStore.signOut();
    }

    @observer
    render() {
        return (
            <div className="topMenuContainer">
                <Menu fixed='top' inverted>
                    <Menu.Item header>
                        <h2>Student Grade Table</h2>
                    </Menu.Item>

                    <Dropdown item simple text='Account'>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.signOutHandler}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
            </div>
        );
    }
  
}

export default TopMenu;