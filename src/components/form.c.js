import React, { Component } from 'react';


import electiciant from '../icons/noun_321339_cc.svg';
import plumber from '../icons/noun_321315_cc.svg';
import gardener from '../icons/noun_321363_cc.svg';
import housekeeper from '../icons/noun_321399_cc.svg';
import cook from '../icons/noun_321395_cc.svg';
import TasksLists from './tasksLists.c';

export default class Form extends Component {
    constructor() {
        super();
        this.state = {
            service: null,
            currentTask: null,
            description: ''
        }
        this.a = [1,2,3,4,5,6,7];
        this.nameServices = ['electiciant','plumber', 'gardener', 'housekeeper', 'cook'];
        this.icons = [electiciant, plumber, gardener, housekeeper, cook];
    }

    createTask = () => {
        const nameTask = document.getElementsByClassName('content')[0].innerText; // correct?
        this.props.getDataOfTask(this.state, nameTask)
        this.props.onTaskCreated(false);
    }

    removeClickStyle = (node) => {
        for (let i = 0; i < node.length; i++) {
            node[i].children[0].classList.contains('clicked') && node[i].children[0].classList.remove('clicked');
        }
    }

    pickedService = (event) => {
        if (event.target.name) {
            const parent = event.target.parentElement.parentElement.children;
            this.removeClickStyle(parent);
            event.target.classList.add('clicked');
            this.setState({service: event.target.name});
        } else if (event.target.alt) {
            const parent = event.target.parentElement.parentElement.parentElement.children;
            this.removeClickStyle(parent);
            event.target.parentElement.classList.add('clicked');
            this.setState({service: event.target.alt});
        }
    }

    getDescription = (event) => {
        let description = event.target.value.toLocaleLowerCase()
        this.setState({description: description})
    }

    pickedTask = (task) => {
        this.setState({currentTask: task});
    }

    edit = () => {

    }

    render() {
        let buttons = this.icons.map((icon, index) =>
            <span key={index}>
                <button name={this.nameServices[index]} onClick={this.pickedService}>
                    <img src={icon} alt={this.nameServices[index]} />
                </button>
                <span className="nameService">{this.nameServices[index]}</span>
            </span>
        )

        return(
                <div className="formContainer">
                    <div className="preView">
                        <h2>NEW TASK</h2>
                        <div className="content">
                            {this.state.service && `I need a ${this.state.service} to `}
                            {this.state.currentTask && `${this.state.currentTask}, `}{this.state.description && this.state.description}
                        </div>
                        <address>My address is {this.props.address || '...(Please choose an address on the map)' }</address>
                        {this.props.action === 'edit' ?
                        <button onClick={this.edit}>EDIT</button>
                        :
                        <button onClick={this.createTask}>CREATE TASK</button>}
                    </div>
                    <div>
                        <h2>LOCATION</h2>
                        <div className="content">
                            <address>{this.props.address ? `My address is ${this.props.address}` : 'You did not select an address'}</address>
                        </div>
                    </div>
                    <div>
                        <h2>SERVICE TYPE</h2>
                        <div className="servicesContainer">
                            {buttons}
                        </div>
                    </div>
                    
                        <TasksLists service={this.state.service} getTask={this.pickedTask} />
                    <div>
                        <h2>TASK DESCRIPTION</h2>
                        <div className="content">
                            <input onChange={this.getDescription} type="text" placeholder="Enter description of task" />
                        </div>
                    </div>
                </div>
            
        )
    }
}