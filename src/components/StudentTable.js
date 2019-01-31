import React, { Component } from 'react';
import { observable, action, computed} from 'mobx';
import { observer, inject } from 'mobx-react';
import { Table, Message } from 'semantic-ui-react';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';

@inject('Firebase')
@observer
class StudentTable extends Component {
  
  constructor(props) {
    super(props);
  }

  @computed
  get sortedData() {
    return Object.keys(this.props.Firebase.studentData).map(key => 
    this.props.Firebase.studentData[key]).sort((a, b) => {
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

  noData = () => {
    return (
      <Message warning>
        <Message.Header>No data to display</Message.Header>
        <p>Please add a student to start using the table.</p>
      </Message>
    );
  }

  render() {
    const {column, direction} = this.sortState;

    return this.sortedData.length ? (
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
            <Table.HeaderCell className='noClick' collapsing>Options</Table.HeaderCell>
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
                <UpdateButton entry_id={entry.entry_id}/>
                <DeleteButton entry_id={entry.entry_id}/>
              </Table.Cell>
            </Table.Row>)
          }
        </Table.Body>
      </Table>
    ) : this.noData();
  }
}

export default StudentTable;