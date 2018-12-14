import React, { Component } from 'react';
import { computed } from 'mobx';
import { observer, inject } from "mobx-react";
import {
  Grid,
  Header
} from 'semantic-ui-react';

@inject('FBStore')
class Title extends Component {

    constructor(props) {
      super(props);
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
                <Header className='averageGrade' textAlign='right'>Average: {
                  this.avgGrade
                  }
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
    }
  }

  export default Title;