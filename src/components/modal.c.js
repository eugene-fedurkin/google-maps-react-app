import React,{Component} from 'react';

export default class Modal extends Component {
    removeTask = (action) => {
        this.props.removeTask(this.props.taskName, action);
    }
    render() {
        return (
            <div className="outSideModal">
                
                <div className="modal">
                    <h2>Are you sure that you want to delete the task?</h2>
                    <button onClick={()=>this.removeTask(false)} className="btnLeft">No</button>
                    <button onClick={()=>this.removeTask(true)} className="btnRight">Yes</button>
                </div>
            </div>
        )
    }
}