import React,{ Component } from 'react';

export default class Task extends Component {
    constructor() {
        super();
        this.state = {
            selectedTask: false
        }
    }
    removeTask = () => {
        this.props.onDelete(this.props.task);
        this.setState({ selectedTask: true });
    };

    editTask = () => {
        this.props.onEdit(this.props.task.id);
        this.setState({ selectedTask: true });
    };
    componentWillReceiveProps(props) {
        if(!props.formIsOpen)
             this.setState({ selectedTask: false })
    }

    render() {
        return (
            <div className={this.state.selectedTask ? "listContainer selectedTask" : "listContainer"}>
                <div>{this.props.task.dueDate}</div>
                <div className="descriptionTask">{`I need a ${this.props.task.serviceType} to ${this.props.task.taskType}`}</div>
                {this.props.formIsOpen 
                ? <div>
                    <button className="editBtn disableDarkBtn">Edit</button>
                    <button className="deleteBtn disableLightBtn">Delete</button>
                  </div>
                : <div>
                    <button onClick={this.editTask} className="editBtn active">Edit</button>
                    <button onClick={this.removeTask} className="deleteBtn active">Delete</button>
                  </div>}
                
            </div>
        );
    }
}