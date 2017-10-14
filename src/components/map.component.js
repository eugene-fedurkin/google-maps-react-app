import React, {Component} from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import iconSvg from '../icons/Combined Shape Copy.svg';

export default class Map extends Component {
    constructor() {
        super();
        this.state = {
            position: null,
            isMarkerShown: false
        };
    }

    setMarker = (event) => {
        this.setState({ position: event.latLng, isMarkerShown: true });
        let lat = event.latLng.lat().toString().slice(0, 9);
        let lng = event.latLng.lng().toString().slice(0, 9);
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&key=AIzaSyCXHioGLeLWvHGHdO47hiwu2VlUzb1fZiA`)
            .then(resp => resp.json())
            .then(resp => this.props.onAddressChange(
                resp.results[0].formatted_address))
            .catch(error => console.log('no information here'));
    };

    render() {
        return (
            <GoogleMap onClick={this.setMarker}
                defaultZoom={13}
                defaultCenter={{ lat: 53.9045, lng: 27.5615 }}>
                {this.state.position
                    && <Marker icon={iconSvg} position={this.state.position} />}
            </GoogleMap>
        );
    }
}