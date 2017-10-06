import React, { Component } from 'react';
import electiciant from '../icons/noun_321339_cc.svg';
import plumber from '../icons/noun_321315_cc.svg';
import gardener from '../icons/noun_321363_cc.svg';
import housekeeper from '../icons/noun_321399_cc.svg';
import cook from '../icons/noun_321395_cc.svg';

export default class Form extends Component {

    createTask = () => {
        this.props.onTaskCreated();
    }

    render() {
        return(
            <div className="formContainer">
                <div className="preView">
                    <h2>NEW TASK</h2>
                    <div className="content">discription</div>
                    <address>My address is Some address</address>
                    <button onClick={this.createTask}>CREATE TASK</button>
                </div>
                <div>
                    <h2>LOCATION</h2>
                    <div className="content">
                        <address>My address is Some address</address>
                    </div>
                </div>
                <div>
                    <h2>SERVICE TYPE</h2>
                    <div className="servicesContainer">
                        <button><img src={electiciant} alt="electric" /></button>
                        <button><img src={plumber} alt="plumber" /></button>
                        <button><img src={gardener} alt="gardener" /></button>
                        <button><img src={housekeeper} alt="housekeeper" /></button>
                        <button><img src={cook} alt="cook" /></button>
                    </div>
                </div>
                <div>
                    <h2>SOME TASKS</h2>
                    <div className="content">
                        <div>task 1</div>
                        <div>task 2</div>
                        <div>task 3</div>
                        <div>task 4</div>
                        <div>task 5</div>
                    </div>
                </div>
                <div>
                    <h2>TASK DESCRIPTION</h2>
                    <div className="content">
                        <input type="text"/>
                    </div>
                </div>
            </div>
        )
    }
}