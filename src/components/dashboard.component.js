import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import iconSvg from '../icons/Combined Shape Copy.svg';
import TaskList from './task-list.component';
import Form from './form.component';
import Modal from './modal.component';
import Mark from './marker.component';
import Map from './map.component';

const googleMapUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCXHioGLeLWvHGHdO47hiwu2VlUzb1fZiA';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            formIsOpen: false,
            position: null,
            isMarkerShown: false,
            address: null,
            taskIdForEdit: null
        };
        this.map = null;
    }

    toggleForm = (isOpen) => {
        this.setState({ formIsOpen: isOpen });
    };

    openCreateForm = () => {
        this.setState({ taskIdForEdit: null })
        this.toggleForm(true);
    }

    openEditForm = (taskId) => {
        this.setState({ taskIdForEdit: taskId });
        this.toggleForm(true);
    };

    setAdress = (address) => {
        this.setState({address: address});
    };

    getMap = () => {
        if (!this.map) this.map = withScriptjs(withGoogleMap(
            () => <Map onAddressChange={this.setAdress} />));

        return this.map;
    };
    closeModal = () => {
        this.setState({ formIsOpen: false })
    }

    render() {
        const Maps = this.getMap();
        return (
            <div className="dashboard">
                <Maps googleMapURL={googleMapUrl}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />} />

                <TaskList onEditTask={this.openEditForm}
                    onNewTask={() => this.openCreateForm()}
                    address={this.state.address}
                    formIsOpen={this.state.formIsOpen} />

                <ReactCSSTransitionGroup
                        transitionName="form"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}>
                    {this.state.formIsOpen && <Form
                        address={this.state.address}
                        onActionExecuted={() => this.toggleForm(false)}
                        taskId={this.state.taskIdForEdit} />}
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                        transitionName="modal"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                    <Modal closeModal={this.closeModal} />
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}