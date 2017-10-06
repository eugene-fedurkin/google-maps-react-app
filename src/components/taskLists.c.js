import React,{ Component } from 'react';
import Task from './task.c';

export default class TaskLists extends Component {

    render() {
        return(
            <div className="tasksList">
                <button onClick={this.props.onNewTask}> + New Task </button>
                <Task />
            </div>
        )
    }
}