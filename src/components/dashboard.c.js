import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import iconSvg from '../icons/Combined Shape Copy.svg';
import TaskList from './taskLists.c';
import Form from './form.c';
import Modal from './modal.c';

import Mark from './marker.c';
import Map from './map.c';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            form: false,
            position: null,
            isMarkerShown: false,
            address: null,
            store: {},
            editOrCreate: '',
            editableTask: '',
            modal: false,
            taskName: ''
        };
        this.map = null;
    }

    toggleForm = (open, action) => {
        this.setState({editOrCreate: action});
        this.setState({form: open});
        console.log(this.state.editOrCreate)
    };

    getDataOfTask = (state, nameTask) => {
        if (!this.state.store[this.state.address]) {
            let newStore = this.state.store;
            newStore[this.state.address] = [nameTask]
            this.setState({store: newStore});
        } else {
            let newStore = this.state.store;
            let listTasks = this.state.store[this.state.address];
            listTasks.push(nameTask);
            newStore[this.state.address] = listTasks;
            this.setState({store: newStore})
        }
    }

    removeTask = (name, action) => {
        if (action) {
            let newStore = this.state.store;
            let position = newStore[this.state.address].indexOf(name);
            newStore[this.state.address].splice(position, 1);
            this.setState({store: newStore});
        }
        this.setState({modal: false});
    }

    editTask = (name) => {
        this.toggleForm(true, 'edit');
        console.log(this.state.editOrCreate);
        this.setState({editableTask: name})
    }

    getMap = () => {
        if (!this.map)
            this.map = withScriptjs(withGoogleMap(() => <Map toPassAddress={this.toPassAddress} />));
        return this.map;
    }

    toPassAddress = (address) => {
        this.setState({address: address});
    }

    openModal = (name) => {
        this.setState({modal: !this.state.modal});
        this.setState({currentTaskName: name});
        return this.state.modal;
    }

    render() {
        // toggleForm() of Form need to fix
        const Maps = this.getMap();
        return(
            <div className="dashboard">
                <Maps
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXHioGLeLWvHGHdO47hiwu2VlUzb1fZiA"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />} />
                <TaskList tasks={this.state.store[this.state.address]} removeTask={this.removeTask} editTask={this.editTask} onNewTask={() => this.toggleForm(true, 'create')} toPassAddress={ this.state.address } modal={this.openModal} />
                <ReactCSSTransitionGroup
                    transitionName="form"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    
                    { this.state.form &&
                    <Form address={this.state.address} onTaskCreated={() => this.toggleForm()} getDataOfTask={this.getDataOfTask} action={this.state.editOrCreate} nameTask={this.state.editableTask} /> }
                </ReactCSSTransitionGroup>

                <ReactCSSTransitionGroup
                    transitionName="modal"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                {this.state.modal && <Modal taskName={this.state.taskName} removeTask={this.removeTask} />}
                </ReactCSSTransitionGroup>
                
            </div>
        )
    }
}