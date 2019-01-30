import React, { Component } from 'react';
import {
  Container, Grid, Responsive, Button, Modal
} from 'semantic-ui-react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import StudentTable from './StudentTable';
import AddStudent from './AddStudent';
import Registration from './Registration';
import Title from './Title.js';
import '../assets/css/App.css';

@inject ('Firebase')
@observer
class App extends Component {
  constructor(props){
    super(props);
  }

  @computed
  get loginState() {
    return this.props.Firebase.user;
  }

  @observable
  modalOpen = false;

  @action
  closeModal = () => {
    this.modalOpen = false;
  }

  @action
  openModal = () => {
    this.modalOpen = true;
  }

  @computed
  get loggedin() {
    return (
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
          closeIcon
          trigger={<Button primary open={this.modalOpen} onClick={this.openModal} className='rAddStudentButton'>Add Student</Button>}
          maxWidth={991}
          open={this.modalOpen}
          onClose={this.closeModal}
        >
          <Modal.Content>
            <AddStudent closeModal={this.closeModal}/>
          </Modal.Content>
        </Responsive>
      </Container>
  )};

  render() {
    return this.loginState ? this.loggedin : <Registration />;
  }
}

export default App;
