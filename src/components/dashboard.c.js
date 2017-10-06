import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import iconSvg from '../icons/Combined Shape Copy.svg';
import TaskList from './taskLists.c';
import Form from './form.c';

import Mark from './marker.c';

import Map from './map.c';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            form: false,
            position: null,
            isMarkerShown: false
        };
        this.map = null;
    }

    toggleForm = open => this.setState({form: open});

    

    getMap = () => {
        if (!this.map) this.map = withScriptjs(withGoogleMap((props) =>
            <GoogleMap onClick={this.setMarker}
                defaultZoom={18}
                defaultCenter={{ lat: 53.9045, lng: 27.5615 }}>
            </GoogleMap>
            )
        );

        return this.map;
    }

    render() {
        let Maps = withScriptjs(withGoogleMap(() => <Map />));
        return(
            <div className="dashboard">
                <Maps googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCXHioGLeLWvHGHdO47hiwu2VlUzb1fZiA"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />} />
                <TaskList onNewTask={ () => this.toggleForm(true) } />
                { this.state.form && <Form onTaskCreated={() => this.toggleForm(false)} /> }
            </div>
        )
    }
}