import React, { Component } from 'react';
import {
  Form,
  Button,
  Header,
  Message
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
    msg: ''
  }

  @observable
  courseError = {
    error: false,
    msg: ''
  }

  @observable
  gradeError = {
    error: false,
    msg: ''
  }

  @action
  clearBtnHandler = () => {
    this.clearInputFields();
  }

  @action
  submitBtnHandler = () => {
    if (this.inputFields.name === ''){
      this.nameError.error = true;
      this.nameError.msg = "Name cannot be empty";
    } else {
      this.nameError.error = false;
    }
    
    if (this.inputFields.course === ''){
      this.courseError.error = true;
      this.courseError.msg = "Course cannot be empty";
    } else {
      this.courseError.error = false;
    }
    
    if (this.inputFields.grade === ''){
      this.gradeError.error = true;
      this.gradeError.msg = "Grade cannot be empty";
    } else if (isNaN(Number(this.inputFields.grade))){
      this.gradeError.error = true;
      this.gradeError.msg = "Grade has to be a number";
    } else {
      this.gradeError.error = false;
    }

    if (!this.gradeError.error && !this.nameError.error && !this.courseError.error){
      this.props.FBStore.addStudentToServer(
        this.inputFields.name, 
        this.inputFields.course, 
        Number(this.inputFields.grade)
      );
  
      this.clearInputFields();
    }
  }

  @action
  clearInputFields() {
    this.inputFields = {
      name: '',
      course: '',
      grade: ''
    };

    this.nameError.error = false;
    this.gradeError.error = false;
    this.courseError.error = false;
  }

  @action
  handleChange = event => {
    this.inputFields[event.target.name] = event.target.value;
  }

  @observer
  render() {
    return (
      <div className='rightBanner'>
        <Form>
          <Header>Add Student</Header>
          <Form.Field required>
            <label>Name</label>
            <input placeholder='Student Name' name='name' value={this.inputFields.name} onChange={this.handleChange}/>
            <Message error content={this.nameError.msg}></Message>
          </Form.Field>
          <Form.Field required>
            <label>Course</label>
            <input placeholder='Student Course' name='course' value={this.inputFields.course} onChange={this.handleChange}/>
            <Message error content={this.courseError.msg}></Message>
          </Form.Field>
          <Form.Field required error>
            <label>Grade</label>
            <input placeholder='Student Grade' name='grade' value={this.inputFields.grade} onChange={this.handleChange}/>
            <Message error content={this.gradeError.msg}></Message>
          </Form.Field>
          <Button primary onClick={this.submitBtnHandler}>Submit</Button>
          <Button secondary onClick={this.clearBtnHandler}>Clear</Button>
        </Form>
      </div>
    )
  }
}

export default AddStudent;