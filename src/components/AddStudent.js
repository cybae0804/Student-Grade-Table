import React, { Component } from 'react';
import {
  Form,
  Button,
  Header,
  Message,
  Responsive
} from 'semantic-ui-react';
import { observable, action, computed} from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('FBStore')
class AddStudent extends Component {
  
  constructor(props) {
    super(props);
  }

  @observable
  inputFields = {
    name: '',
    course: '',
    grade: ''
  }

  @observable
  nameError = {
    error: false,
    msg: null
  }

  @observable
  courseError = {
    error: false,
    msg: null
  }

  @observable
  gradeError = {
    error: false,
    msg: null
  }

  @action
  clearBtnHandler = () => {
    this.clearInputFields();
  }

  @action
  submitBtnHandler = () => {
    if (this.checkInput()){
      this.props.FBStore.addStudentToServer(
        this.inputFields.name, 
        this.inputFields.course, 
        Number(this.inputFields.grade)
      );
  
      this.clearInputFields();
    }
  }

  @action
  checkInput = () => {
    if (this.inputFields.name === ''){
      this.nameError.error = true;
      this.nameError.msg = "Name cannot be empty";
    } else {
      this.nameError.error = false;
      this.nameError.msg = null;
    }
    
    if (this.inputFields.course === ''){
      this.courseError.error = true;
      this.courseError.msg = "Course cannot be empty";
    } else {
      this.courseError.error = false;
      this.courseError.msg = null;
    }
    
    if (this.inputFields.grade === ''){
      this.gradeError.error = true;
      this.gradeError.msg = "Grade cannot be empty";
    } else if (isNaN(Number(this.inputFields.grade))){
      this.gradeError.error = true;
      this.gradeError.msg = "Grade has to be a number";
    } else if (Number(this.inputFields.grade > 100)){
      this.gradeError.error = true;
      this.gradeError.msg = "Grade cannot be over 100";
    } else if (Number(this.inputFields.grade < 0)){
      this.gradeError.error = true;
      this.gradeError.msg = "Grade cannot be below 0";
    } else {
      this.gradeError.error = false;
      this.gradeError.msg = null;
    }

    if (!this.gradeError.error && !this.nameError.error && !this.courseError.error){
      return true; // passes the input check
    } else {
      return false; //fails the input check
    }
  }

  @action
  clearInputFields() {
    this.inputFields = {
      name: '',
      course: '',
      grade: ''
    };

    this.clearErrorFlags();
  }

  @action
  clearErrorFlags() {
    this.nameError.error = false;
    this.nameError.msg = null;
    this.gradeError.error = false;
    this.gradeError.msg = null;
    this.courseError.error = false;
    this.courseError.msg = null;
  }

  @action
  handleChange = event => {
    this.inputFields[event.target.name] = event.target.value;
  }

  @observer
  render() {
    return (
        <Form error>
          <Header>Add Student</Header>
          <Form.Field required>
            <label>Name</label>
            <input placeholder='Student Name' name='name' value={this.inputFields.name} onChange={this.handleChange}/>
            <Message error content={this.nameError.msg}/>
          </Form.Field>
          <Form.Field required>
            <label>Course</label>
            <input placeholder='Student Course' name='course' value={this.inputFields.course} onChange={this.handleChange}/>
            <Message error content={this.courseError.msg}/>
          </Form.Field>
          <Form.Field required>
            <label>Grade</label>
            <input placeholder='Student Grade' name='grade' value={this.inputFields.grade} onChange={this.handleChange}/>
            <Message error content={this.gradeError.msg}/>
          </Form.Field>
          <Button primary onClick={this.submitBtnHandler}>Submit</Button>
          <Button secondary onClick={this.clearBtnHandler}>Clear</Button>
        </Form>
    );
  }
}

export default AddStudent;
