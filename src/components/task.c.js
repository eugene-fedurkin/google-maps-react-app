import React,{ Component } from 'react';

export default class Task extends Component {
    render() {
        return(
            <div className="listContainer">
                <div>time</div>
                <div className="descriptionTask">Shower task</div>
                <button className="editBtn">Edit</button>
                <button className="deleteBtn">Delete</button>
            </div>
        )
    }
}