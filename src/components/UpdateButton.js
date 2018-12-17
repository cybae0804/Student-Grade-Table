import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
    Form, Modal, Header, Button
} from 'semantic-ui-react';

@inject('FBStore')
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

    @action
    openModal = () => {
        this.modalOpen = true;

        const row = this.props.FBStore.studentData[event.target.getAttribute('entry_id')];

        this.updateData.name = row.name;
        this.updateData.course = row.course;
        this.updateData.grade = row.grade;
        this.updateData.entry_id = row.entry_id;
    }
  
    @action
    closeModal = () => {
        this.modalOpen = false;
    } 

    @action
    handleChange = event => {
        this.updateData[event.target.name] = event.target.value;
    }

    @action
    updateServerData = () => {
        this.props.FBStore.updateServerData(
            this.updateData.entry_id, 
            this.updateData.name, 
            this.updateData.course, 
            this.updateData.grade
        );
  
        this.closeModal();
    }
    
    @observer
    render() {
        return (
            <span>
                <Button onClick={this.openModal} entry_id={this.props.entry_id}>Update</Button>
                <Modal open={this.modalOpen} onClose={this.closeModal}>
                    <Header>
                        Update Student Data
                    </Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input value={this.updateData.name} onChange={this.handleChange} name='name'/>
                            </Form.Field>
                            <Form.Field>
                                <label>Course</label>
                                <input value={this.updateData.course} onChange={this.handleChange} name='course'/>
                            </Form.Field>
                            <Form.Field>
                                <label>Grade</label>
                                <input value={this.updateData.grade} onChange={this.handleChange} name='grade'/>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.closeModal}>Cancel</Button>
                        <Button onClick={this.updateServerData} primary>Submit</Button>
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}

export default UpdateButton;