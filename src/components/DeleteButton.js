import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import {
    Modal, Header, Button, Responsive
} from 'semantic-ui-react';

@inject('FBStore')
class DeleteButton extends Component {

    constructor(props){
        super(props);
    }

    @observable 
    modalOpen = false;

    @action
    openModal = () => {
        this.modalOpen = true;
    }
  
    @action
    closeModal = () => {
        this.modalOpen = false;
    } 
    
    deleteBtnHandler = () => {
        this.props.FBStore.deleteStudentFromServer(this.props.entry_id);
    }
    
    @observer
    render() {
        return (
            <span>
                <Responsive 
                    as={Button} 
                    minWidth={992} 
                    entry_id={this.props.entry_id}
                    onClick={this.openModal} 
                    content='Delete'
                    negative
                />
                <Responsive 
                    as={Button} 
                    maxWidth={991} 
                    entry_id={this.props.entry_id} 
                    onClick={this.openModal} 
                    negative 
                    icon='delete'
                />
                <Modal open={this.modalOpen} onClose={this.closeModal}>
                    <Header>
                        Delete Student Data
                    </Header>
                    <Modal.Content>
                        Are you sure you want to delete this grade entry?
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.closeModal}>Cancel</Button>
                        <Button onClick={this.deleteBtnHandler} negative>Delete</Button>
                    </Modal.Actions>
                </Modal>
            </span>
        );
    }
}

export default DeleteButton;