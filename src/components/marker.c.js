import React, { Component } from 'react';
import { Marker } from "react-google-maps";

export default class Mark extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position: props.position
        }
    }

    componentWillReceiveProps() {
        console.log('qqqqqqqqqqqqqq')
        if (this.state.position !== this.props.position) {
            this.setState({position: this.props.position})
        }
    }

    render() {
        console.log('props', this.props.position, 'state', this.state.position)
        return(
            <Marker position={this.state.position}/>
        )
    }
}