import React, { Component } from 'react';
import {
  Form,
  Button,
  Header
} from 'semantic-ui-react';
import { observable, action, computed} from 'mobx';
import { observer } from 'mobx-react';

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
    handleChange( event ){
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

  export default AddStudent;