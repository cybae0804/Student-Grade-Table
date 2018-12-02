import React, { Component } from 'react';
import {
  Table,
  Container,
  Divider,
  Form,
  Button,
  Grid,
  Header
} from 'semantic-ui-react';
import $ from 'jquery'
import { observable, action, computed} from 'mobx';
import { observer } from 'mobx-react';
import './App.css';

class StudentTable extends Component {
  constructor(props) {
    super(props);

    this.deleteBtnHandler = this.deleteBtnHandler.bind(this);
  }

  deleteBtnHandler() {
    this.props.clickHandlers.delete(event.target.getAttribute('number'));
  }

  @observer
  render() {
    return (
      <Table size='small' celled striped columns='4' color='black' inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Course</Table.HeaderCell>
            <Table.HeaderCell>Grade</Table.HeaderCell>
            <Table.HeaderCell>Options</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.studentData.map(student => 
            <Table.Row key={student.id}>
              <Table.Cell>{student.name}</Table.Cell>
              <Table.Cell>{student.course}</Table.Cell>
              <Table.Cell>{student.grade}</Table.Cell>
              <Table.Cell>
                <Button number={student.id} onClick={this.deleteBtnHandler} negative>Delete</Button>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    )
  }
}

class AddStudent extends Component {
  constructor(props) {
    super(props);

    this.clearBtnHandler = this.clearBtnHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitBtnHandler = this.submitBtnHandler.bind(this);
  }

  @observable
  inputFields = {
    name: '',
    course: '',
    grade: ''
  }

  @action
  clearBtnHandler() {
    this.clearInputFields();
  }

  @action
  submitBtnHandler() {
    this.props.clickHandlers.add(this.inputFields.name, this.inputFields.course, this.inputFields.grade);
    this.clearInputFields();
  }

  @action
  clearInputFields() {
    this.inputFields = {
      name: '',
      course: '',
      grade: ''
    }
  }

  @action
  handleChange(){
    this.inputFields[event.target.name] = event.target.value;
  }

  @observer
  render() {
    return (
      <div className='rightBanner'>
        <Form>
          <Header>Add Student</Header>
          <Form.Field>
            <label>Name</label>
            <input placeholder='Student Name' name='name' value={this.inputFields.name} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Course</label>
            <input placeholder='Student Course' name='course' value={this.inputFields.course} onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Grade</label>
            <input placeholder='Student Grade' name='grade' value={this.inputFields.grade} onChange={this.handleChange}/>
          </Form.Field>
          <Button primary onClick={this.submitBtnHandler}>Submit</Button>
          <Button secondary onClick={this.clearBtnHandler}>Clear</Button>
        </Form>
      </div>
    )
  }
}

class Title extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div className='HeaderContainer'>
        <Grid className='Header'>
          <Grid.Row columns={3}>
            <Grid.Column width={3}>
              <Button onClick={this.props.clickHandlers.server}>Reload Data</Button>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h1' className='Title' textAlign='center'>
                Student Grade Table
              </Header>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header className='averageGrade' textAlign='right'>Average: {this.props.average}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

@observer
class App extends Component {
  
  constructor(props) {
    super(props);

    this.loadServerData = this.loadServerData.bind(this);
    this.addStudentToServer = this.addStudentToServer.bind(this);
    this.deleteStudentFromServer = this.deleteStudentFromServer.bind(this);

    this.loadServerData();
  }

  @observable
  studentData = [];

  @computed
  get avgGrade() {
    let sum = 0;
    if (this.studentData.length === 0){
      return 0;
    }

    for (let i = 0; i < this.studentData.length; i++){
      sum += this.studentData[i].grade;
    }
    return Math.round(sum / this.studentData.length);
  };

  @action
  loadServerData() {
    $.ajax({
      method: 'POST',
      url: 'http://s-apis.learningfuze.com/sgt/get',
      dataType: 'json',
      data: {
            api_key: 'qwVaPAFkr2'
      }
    }).then(res => {
      if (res.success){
        this.studentData = res.data;
      } else {
        console.error(res.errors[0]);
      }
    })
  }

  @action
  addStudentToServer(name, course, grade) {
    $.ajax({
      method: 'POST',
      url: 'http://s-apis.learningfuze.com/sgt/create',
      dataType: 'json',
      data: {
            api_key: 'qwVaPAFkr2',
            name: name,
            course: course,
            grade: grade,
      }
    }).then(res => {
      if (res.success){
        this.loadServerData();
      } else {
        console.error(res.errors[0]);
      }
    })
  }

  @action
  deleteStudentFromServer(id){
    $.ajax({
      method: 'POST',
      url: 'http://s-apis.learningfuze.com/sgt/delete',
      dataType: 'json',
      data: {
            api_key: 'qwVaPAFkr2',
            student_id: id
      }
    }).then(res => {
      if (res.success){
        this.loadServerData();
      } else {
        console.error(res.errors[0]);
      }
    })
  }

  @observer
  render() {
    return (
      <Container className='ui container'>
        <Title clickHandlers={{server: this.loadServerData}} average = {this.avgGrade}/>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <StudentTable studentData = {this.studentData} clickHandlers = {{delete: this.deleteStudentFromServer}}/>
            </Grid.Column>
            <Grid.Column width={4}>
              <AddStudent clickHandlers = {
                  {
                    server: this.loadServerData, 
                    add: this.addStudentToServer
                  }
                }/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
