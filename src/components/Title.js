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


    @computed
    get avgGrade() {
        let sum = 0;

        if (Object.keys(this.props.FBStore.studentData).length === 0) return sum;

        for (let key in this.props.FBStore.studentData){
            sum += Number(this.props.FBStore.studentData[key].grade); 
        }

        return Math.round(sum / Object.keys(this.props.FBStore.studentData).length);
    };

    @observer
    render() {
        return (
            <div className="topMenuContainer">
                <Menu fixed='top' inverted>
                    <Menu.Item header>
                        <h2>Student Grade Table</h2>
                    </Menu.Item>
                    <Menu.Item>
                        Average: {this.avgGrade}
                    </Menu.Item>
                    <Menu.Item position={'right'} onClick={this.signOutHandler}>
                        Sign Out
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default TopMenu;