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

@inject('FBStore')
class StudentTable extends Component {
  
  constructor(props) {
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

  @computed
  get sortedData() {
    return Object.keys(this.props.FBStore.studentData).map(key => 
    this.props.FBStore.studentData[key]).sort((a, b) => {
      if (a[this.sortState.column] < b[this.sortState.column]){
        return this.sortState.direction === 'ascending' ? -1 : 1;
      } else if (a[this.sortState.column] > b[this.sortState.column]){
        return this.sortState.direction === 'ascending' ? 1 : -1;
      } else {
        return 0;
      }
    })
  }

  @observable
  sortState = {
    column: null,
    direction: null,
  }

  @action
  handleSort = clickedColumn => () => {
    if (this.sortState.column !== clickedColumn){
      this.sortState.column = clickedColumn;
      this.sortState.direction = 'ascending';
    } else {
      this.sortState.direction = this.sortState.direction === 'ascending' ? 'descending' : 'ascending';
    }
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

  deleteBtnHandler = () => {
    this.props.FBStore.deleteStudentFromServer(event.target.getAttribute('entry_id'));
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

  @action
  handleChange = event => {
    this.updateData[event.target.name] = event.target.value;
  }

  @observer
  render() {
    const {column, direction} = this.sortState;

    return (
      <Table size='small' celled striped columns='4' color='black' inverted sortable unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted = {column === 'name' ? direction : null}
              onClick = {this.handleSort('name')}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell sorted = {column === 'course' ? direction : null}
              onClick = {this.handleSort('course')}
            >
              Course
            </Table.HeaderCell>
            <Table.HeaderCell sorted = {column === 'grade' ? direction : null}
              onClick = {this.handleSort('grade')}
            >
              Grade
            </Table.HeaderCell>
            <Table.HeaderCell collapsing>Options</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { 
            this.sortedData.map(entry => 
            <Table.Row key={entry.entry_id}>
              <Table.Cell>{entry.name}</Table.Cell>
              <Table.Cell>{entry.course}</Table.Cell>
              <Table.Cell>{entry.grade}</Table.Cell>
              <Table.Cell collapsing>
                <Button onClick={this.openModal} entry_id={entry.entry_id}>Update</Button>
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
                <Button entry_id={entry.entry_id} onClick={this.deleteBtnHandler} negative>Delete</Button>
              </Table.Cell>
            </Table.Row>)
          }
        </Table.Body>
      </Table>
    )
  }
}

export default StudentTable;