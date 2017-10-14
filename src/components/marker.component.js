import React, { Component } from 'react';
import { Marker } from "react-google-maps";

export default class Mark extends Component {
    constructor(props) {
        super(props);
        this.state = { position: props.position };
    }

    componentWillReceiveProps() {
        if (this.state.position !== this.props.position) {
            this.setState({ position: this.props.position });
        }
    }

    render() {
        return (<Marker position={this.state.position}/>);
    }
}