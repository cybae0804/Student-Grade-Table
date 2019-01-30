import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
    Form, Modal, Header, Button, Message, Responsive
} from 'semantic-ui-react';

@inject('Firebase')
class UpdateButton extends Component {

    constructor(props){
        super(props);
    }

    @observable 
    modalOpen = false;
  
    @observable
    updateData = {
        name: '',
        course: '',
        grade: '',
        entry_id: ''
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
    openModal = event => {
        this.modalOpen = true;

        const row = this.props.Firebase.studentData[event.currentTarget.getAttribute('entry_id')];

        this.updateData.name = row.name;
        this.updateData.course = row.course;
        this.updateData.grade = row.grade;
        this.updateData.entry_id = row.entry_id;
    }
  
    @action
    closeModal = () => {
        this.modalOpen = false;
        this.clearErrorFlags();
    } 

    @action
    handleChange = event => {
        this.updateData[event.currentTarget.name] = event.currentTarget.value;
    }

    @action
    submitBtnHandler = () => {
        if (this.checkInput()){
            this.props.Firebase.updateServerData(
                this.updateData.entry_id, 
                this.updateData.name.trim(), 
                this.updateData.course.trim(), 
                Number(this.updateData.grade)
            );
      
            this.closeModal();
        }
    }

    @action
    checkInput = () => {
        if (this.updateData.name === ''){
            this.nameError.error = true;
            this.nameError.msg = "Name cannot be empty";
        } else {
            this.nameError.error = false;
            this.nameError.msg = null;
        }
          
        if (this.updateData.course === ''){
            this.courseError.error = true;
            this.courseError.msg = "Course cannot be empty";
        } else {
            this.courseError.error = false;
            this.courseError.msg = null;
        }
          
        if (this.updateData.grade === ''){
            this.gradeError.error = true;
            this.gradeError.msg = "Grade cannot be empty";
        } else if (isNaN(Number(this.updateData.grade))){
            this.gradeError.error = true;
            this.gradeError.msg = "Grade has to be a number";
        } else if (Number(this.updateData.grade > 100)){
            this.gradeError.error = true;
            this.gradeError.msg = "Grade cannot be over 100";
        } else if (Number(this.updateData.grade < 0)){
            this.gradeError.error = true;
            this.gradeError.msg = "Grade cannot be below 0";
        } else {
            this.gradeError.error = false;
            this.gradeError.msg = null;
        }

        if (!this.gradeError.error && !this.nameError.error && !this.courseError.error){
            return true; // passes the input check
        } else {
            return false; // fails the input check
        }
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
  
    @observer
    render() {
        return (
            <span>
                <Responsive as={Button} minWidth={992} entry_id={this.props.entry_id} onClick={this.openModal} content='Update'/>
                <Responsive as={Button} maxWidth={991} entry_id={this.props.entry_id} onClick={this.openModal} icon='edit'/>
                <Modal open={this.modalOpen} onClose={this.closeModal}>
                    <Header>
                        Update Student Data
                    </Header>
                    <Modal.Content>
                        <Form error>
                            <Form.Field>
                                <label>Name</label>
                                <input value={this.updateData.name} onChange={this.handleChange} name='name'/>
                                <Message error content={this.nameError.msg}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Course</label>
                                <input value={this.updateData.course} onChange={this.handleChange} name='course'/>
                                <Message error content={this.courseError.msg}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Grade</label>
                                <input value={this.updateData.grade} onChange={this.handleChange} name='grade'/>
                                <Message error content={this.gradeError.msg}/>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.closeModal}>Cancel</Button>
                        <Button onClick={this.submitBtnHandler} primary>Submit</Button>
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}

export default UpdateButton;