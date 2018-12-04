import React, { Component } from 'react';
import { observable, action, computed} from 'mobx';
import { observer, inject } from 'mobx-react';
import {
    Table,
    Modal,
    Form,
    Button,
    Header
} from 'semantic-ui-react';
import './FBStore.js';


@inject('FBStore')
class StudentTable extends Component {
    constructor(props) {
      super(props);
  
      this.deleteBtnHandler = this.deleteBtnHandler.bind(this);
      this.updateServerData = this.updateServerData.bind(this);
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleChange = this.handleChange.bind(this);
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
    openModal() {
      this.modalOpen = true;
      this.updateData.name = this.props.FBStore.studentData[event.target.getAttribute('entry_id')].name;
      this.updateData.course = this.props.FBStore.studentData[event.target.getAttribute('entry_id')].course;
      this.updateData.grade = this.props.FBStore.studentData[event.target.getAttribute('entry_id')].grade;
      this.updateData.entry_id = this.props.FBStore.studentData[event.target.getAttribute('entry_id')].entry_id;
    }
  
    @action
    closeModal() {
      this.modalOpen = false;
    } 
  
    deleteBtnHandler() {
      this.props.FBStore.deleteStudentFromServer(event.target.getAttribute('entry_id'));
    }
  
    @action
    updateServerData() {
      this.props.FBStore.updateServerData(
        this.updateData.entry_id, 
        this.updateData.name, 
        this.updateData.course, 
        this.updateData.grade
      );
  
      this.closeModal();
    }
  
    @action
    handleChange(event) {
      this.updateData[event.target.name] = event.target.value;
    }
  
    @observer
    render() {
      return (
        <Table size='small' celled striped columns='4' color='black' inverted sortable unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Grade</Table.HeaderCell>
              <Table.HeaderCell collapsing>Options</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { 
              Object.keys(this.props.FBStore.studentData).map(entry_id => 
              <Table.Row key={this.props.FBStore.studentData[entry_id].entry_id}>
                <Table.Cell>{this.props.FBStore.studentData[entry_id].name}</Table.Cell>
                <Table.Cell>{this.props.FBStore.studentData[entry_id].course}</Table.Cell>
                <Table.Cell>{this.props.FBStore.studentData[entry_id].grade}</Table.Cell>
                <Table.Cell collapsing>
                  <Button onClick={this.openModal} entry_id={entry_id}>Update</Button>
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
                  <Button entry_id={entry_id} onClick={this.deleteBtnHandler} negative>Delete</Button>
                </Table.Cell>
              </Table.Row>)
            }
          </Table.Body>
        </Table>
      )
    }
  }

  export default StudentTable;