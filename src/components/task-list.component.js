import React,{ Component } from 'react';
import Task from './task.component';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Scrollbars } from 'react-custom-scrollbars';
import TasksService from '../services/tasks.service';
import ModalDialogService from '../services/modal-dialog.service';

export default class TaskList extends Component {
    constructor() {
        super();
        this.tasksService = TasksService.getSingletonInstance();
        this.tasksService.subscribe(store => this.setTasks(store));
        this.modalDialogService = ModalDialogService.getSingletonInstance();
        this.state = { 
            tasks: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setTasks(nextProps.address);
    }

    setTasks = (address) => {
        const tasks = localStorage[address || this.props.address] 
            ? JSON.parse(localStorage[address || this.props.address])
            : [];
        this.setState({ tasks: tasks });
    };

    deleteTask = (task) => {
        this.modalDialogService.ask(
            'Are you sure you want to delete this task?',
            () => this.tasksService.delete(task));
    };

    render() {
        return (
            <div className="tasksList">
                {this.props.formIsOpen 
                    ? <button className="disableLightBtn"> + New Task </button> 
                    : <button onClick={this.props.onNewTask} className="active"> + New Task </button>}
                <Scrollbars style={{width: 345}}
                        autoHeight
                        autoHeightMax={640}>
                        <ReactCSSTransitionGroup
                            transitionName="task"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                            {this.state.tasks.map((task, index) => {
                                return (
                                <Task task={task}
                                    key={index}
                                    onDelete={this.deleteTask}
                                    onEdit={this.props.onEditTask}
                                    formIsOpen={this.props.formIsOpen} />
                                )
                            })}
                    </ReactCSSTransitionGroup>
                </Scrollbars>
            </div>
        );
    }
}