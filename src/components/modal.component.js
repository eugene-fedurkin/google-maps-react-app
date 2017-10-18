import React,{Component} from 'react';
import ModelDialogService from '../services/modal-dialog.service';

export default class Modal extends Component {
    constructor() {
        super();
        this.modelDialogService = ModelDialogService.getSingletonInstance();
        this.modelDialogService.subscribeOnShow(
            (question, okHandler) => this.show(question, okHandler));
        this.state = {
            show: false,
            question: '',
            okHandler: () => {}
        };
    }

    show = (question, okHandler) => {
        this.setState({
            show: true,
            question: question,
            okHandler: okHandler
        });
    };

    hide = () => {
        this.setState({
            show: false,
            okHandler: () => {}
        });
        this.props.closeModal();
    };

    execute() {
        this.state.okHandler();
        this.hide();
    }

    render() {
        return this.state.show && (
            <div className="outSideModal">
                <div className="modal">
                    <h2>{this.state.question}</h2>
                    <button className="btnLeft"
                        onClick={()=>this.hide()}>No</button>
                    <button className="btnRight"
                        onClick={()=>this.execute()}>Yes</button>
                </div>
            </div>
        );
    }
}