import React,{ Component } from 'react';

export default class Task extends Component {
    removeTask = () => {
        this.props.modal(this.props.name);
    }

    editTask = () => {
        this.props.editTask(this.props.name);
    }

    render() {
        return(
            <div className="listContainer">
                <div>time</div>
                <div className="descriptionTask">{this.props.name}</div>
                <button onClick={this.editTask} className="editBtn">Edit</button>
                <button onClick={this.removeTask} className="deleteBtn">Delete</button>
            </div>
        )
    }
}