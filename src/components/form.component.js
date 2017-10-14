import React, { Component } from 'react';
import TaskTypes from './task-types.component';
import TasksService from '../services/tasks.service';

import electrician from '../icons/light-bulb.svg';
import plumber from '../icons/pipe.svg';
import gardener from '../icons/plant.svg';
import housekeeper from '../icons/iron.svg';
import cook from '../icons/mixer.svg';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.tasksService = TasksService.getSingletonInstance();
        this.state = {
            address: props.address,
            serviceType: '',
            taskType: '',
            taskDescription: ''
        };
        this.serviceTypes = {
            Electrician: electrician,
            Plumber: plumber,
            Gardener: gardener,
            Housekeeper: housekeeper,
            Cook: cook
        };
    }

    componentWillMount() {
        if (this.props.taskId) this.initializeTaskForEdit(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.taskId) this.initializeTaskForEdit(nextProps);
    }

    initializeTaskForEdit = (props) => {
        if (this.tasksService.store[props.address]) {
            let taskForEdit = this.tasksService.store[props.address]
                .find(t => t.id === props.taskId);
            if (taskForEdit) {
                this.setState({
                    address: taskForEdit.address,
                    serviceType: taskForEdit.serviceType,
                    taskType: taskForEdit.taskType,
                    taskDescription: taskForEdit.taskDescription
                });
            }
        }
    };

    createTask = () => {
        let newTask = Object
            .assign({}, this.state, { address: this.props.address });
        this.tasksService.create(newTask);
        this.props.onActionExecuted(false);
    };

    update = () => {
        let newTask = Object.assign({}, this.state, {
            id: this.props.taskId,
            address: this.props.address
        });
        this.tasksService.update(newTask);
        this.props.onActionExecuted(false);
    };

    selectServiceType = (serviceType) => {
        this.setState({ serviceType: serviceType });
    };

    setDescription = (event) => {
        this.setState({ taskDescription: event.target.value })
    };

    selectTaskType = (taskType) => {
        this.setState({ taskType: taskType });
    };

    lowerFirstLetter(text) {
        return text ? text[0].toLocaleLowerCase() + text.substring(1) : '';
    }

    render() {
        const buttons = [];
        for (let serviceType in this.serviceTypes) {
            buttons.push(
                <span key={serviceType}>
                    <button className={serviceType === this.state.serviceType
                            ? 'clicked' : ''}
                        onClick={() => this.selectServiceType(serviceType)}>
                        <img src={this.serviceTypes[serviceType]} alt={serviceType} />
                    </button>
                    <span className="nameService">{serviceType}</span>
                </span>);
        }

        let title = 'I need a ';
        if (this.state.serviceType) {
            title += `${this.lowerFirstLetter(this.state.serviceType)} to `;
            if (this.state.taskType)
                title += `${this.lowerFirstLetter(this.state.taskType)}, ${this.lowerFirstLetter(this.state.taskDescription)}`;
        }

        return (
            <div className="formContainer">
                <div className="preView">
                    <h2>NEW TASK</h2>
                    <div className="content">{title}</div>
                    <address>My address is {this.props.address || '...(Please choose an address on the map)' }</address>
                    {this.props.taskId
                        ? <button onClick={this.update}>EDIT</button>
                        : <button onClick={this.createTask}>CREATE TASK</button>}
                </div>
                <div>
                    <h2>LOCATION</h2>
                    <div className="content">
                        <address>{this.props.address || 'You did not select an address'}</address>
                    </div>
                </div>
                <div>
                    <h2>SERVICE TYPE</h2>
                    <div className="servicesContainer">
                        {buttons}
                    </div>
                </div>
                
                {<TaskTypes serviceType={this.state.serviceType}
                    onTaskTypeSelected={this.selectTaskType}
                    taskType={this.state.taskType} />}
                <div>
                    <h2>TASK DESCRIPTION</h2>
                    <div className="content">
                        <input type="text"
                            value={this.state.taskDescription}
                            onChange={this.setDescription}
                            placeholder="Enter description of task" />
                    </div>
                </div>
            </div>
        );
    }
}