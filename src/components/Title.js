import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Responsive, Menu } from 'semantic-ui-react';

@inject('Firebase')
class TopMenu extends Component {
    signOutHandler = () => {
        this.props.Firebase.signOut();
    }

    @computed
    get avgGrade() {
        let sum = 0;

        if (Object.keys(this.props.Firebase.studentData).length === 0) return sum;

        for (let key in this.props.Firebase.studentData){
            sum += Number(this.props.Firebase.studentData[key].grade); 
        }

        return Math.round(sum / Object.keys(this.props.Firebase.studentData).length);
    };

    @observer
    render() {
        return (
            <div className="topMenuContainer">
                <Menu inverted>
                    <Responsive as={Menu.Item} minWidth={768}>
                        <h2>Student Grade Table</h2>
                    </Responsive>
                    <Responsive as={Menu.Item} maxWidth={767}>
                        <h2>SGT</h2>
                    </Responsive>
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