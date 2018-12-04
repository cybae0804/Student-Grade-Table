import React, { Component } from 'react';
import {
  Container,
  Grid,
} from 'semantic-ui-react';
import { observer } from 'mobx-react';
import StudentTable from './StudentTable.js';
import AddStudent from './AddStudent.js';
import Title from './Title.js'
import './App.css';

class App extends Component {
  @observer
  render() {
    return (
        <Container className='ui container'>
          <Title />
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={12}>
                <StudentTable />
              </Grid.Column>
              <Grid.Column width={4}>
                <AddStudent />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

export default App;
