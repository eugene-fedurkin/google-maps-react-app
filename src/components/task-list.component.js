import React,{ Component } from 'react';
import Task from './task.component';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TasksService from '../services/tasks.service';
import ModalDialogService from '../services/modal-dialog.service';

export default class TaskList extends Component {
    constructor() {
        super();
        this.tasksService = TasksService.getSingletonInstance();
        this.tasksService.subscribe(store => this.setTasks(store));
        this.modalDialogService = ModalDialogService.getSingletonInstance();
        this.state = { tasks: [] };
    }

    componentWillReceiveProps(nextProps) {
        this.setTasks(nextProps.address);
    }

    setTasks = (address) => {
        const tasks = this.tasksService.store[address || this.props.address] || [];
        this.setState({ tasks: tasks });
    };

    deleteTask = (task) => {
        this.modalDialogService.ask(
            'Are you sure you want to delete this task?',
            () => this.tasksService.delete(task));
    };

    render() {
        const tasks = this.state.tasks.map((task, index) =>
            <ReactCSSTransitionGroup
                transitionName="task"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
                key={index}>
                <Task task={task}
                    onDelete={this.deleteTask}
                    onEdit={this.props.onEditTask} />
            </ReactCSSTransitionGroup>
        );
        return (
            <div className="tasksList">
                <button onClick={this.props.onNewTask}> + New Task </button>
                {tasks}
            </div>
        );
    }
}