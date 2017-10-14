import React,{ Component } from 'react';

export default class Task extends Component {
    removeTask = () => {
        this.props.onDelete(this.props.task);
    };

    editTask = () => {
        this.props.onEdit(this.props.task.id);
    };

    render() {
        return (
            <div className="listContainer">
                <div>{this.props.task.dueDate}</div>
                <div className="descriptionTask">{this.props.task.getTitle()}</div>
                <button onClick={this.editTask} className="editBtn">Edit</button>
                <button onClick={this.removeTask} className="deleteBtn">Delete</button>
            </div>
        );
    }
}