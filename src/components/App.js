import React, { Component } from 'react';
import {
  Container,
  Grid,
} from 'semantic-ui-react';
import { observer } from 'mobx-react';
import StudentTable from './StudentTable';
import AddStudent from './AddStudent';
import Registration from './Registration'
import Title from './Title.js'
import '../assets/css/App.css';

class App extends Component {
  @observer
  render() {
    return (
        <Container>
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
          <Registration/>
        </Container>
    );
  }
}

export default App;
