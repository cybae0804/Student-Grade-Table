import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import {
  Grid,
  Header
} from 'semantic-ui-react';
import './FBStore.js';


@inject('FBStore')
class Title extends Component {

    constructor(props) {
      super(props);
    }
  
    render(){
      return (
        <div className='HeaderContainer'>
          <Grid className='Header'>
            <Grid.Row columns={2}>
              <Grid.Column width={13}>
                <Header as='h1' className='Title' textAlign='center'>
                  Student Grade Table
                </Header>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header className='averageGrade' textAlign='right'>Average: {this.props.FBStore.avgGrade}</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
    }
  }

  export default Title;