import React, { Component } from 'react';
import {
  Container,
  Grid, Responsive,
  Button, Modal
} from 'semantic-ui-react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import StudentTable from './StudentTable';
import AddStudent from './AddStudent';
import Registration from './Registration';
import Title from './Title.js';
import '../assets/css/App.css';

@inject ('FBStore')
class App extends Component {
  constructor(props){
    super(props);
  }

  @observable
  loginState = () =>{
    return this.props.FBStore.user;
  }

  @observer
  render() {
    if (this.loginState()) this.props.FBStore.loadServerData();

    const loggedin = (
      <Container>
        <Title />
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column computer={12} mobile={16} tablet={16}>
              <StudentTable />
            </Grid.Column>
            <Responsive as={Grid.Column} width={4} minWidth={992}>
              <AddStudent />
            </Responsive>
          </Grid.Row>
        </Grid>
        <Responsive 
          as={Modal} 
          trigger={<Button primary className='rAddStudentButton'>Add Student</Button>}
          maxWidth={991}
          closeIcon
        >
          <Modal.Content>
            <AddStudent/>
          </Modal.Content>
        </Responsive>
      </Container>
    );
    
    return this.loginState() ? loggedin : <Registration />;
  }
}

export default App;
