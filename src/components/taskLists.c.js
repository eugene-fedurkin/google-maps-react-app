import React,{ Component } from 'react';
import Task from './task.c';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TaskList extends Component {

    render() {
        let tasks;
        if (this.props.tasks) {
             tasks = this.props.tasks.map((task, index) =>
             <ReactCSSTransitionGroup
                transitionName="task"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
                key={index}>
                    <Task name={task} removeTask={this.props.removeTask} editTask={this.props.editTask} modal={this.props.modal} />
            </ReactCSSTransitionGroup>
                
            )
        }
        return(
            
                <div className="tasksList">
                    <button onClick={this.props.onNewTask}> + New Task </button>
                    {tasks}
                </div>
        )
    }
}