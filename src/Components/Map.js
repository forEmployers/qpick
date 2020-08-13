import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
class Mapd extends Component {
  state = {
    directions: null
  };



  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: -37.8136, lng: 144.9631 }}
        defaultZoom={8}
      >
        <DirectionsRenderer
          directions={this.props.directions}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{height: `360px`, width: "100%",overflow:'auto' }} />}
          mapElement={<div style={{ width:'100%',height: `500px`,overflow:'auto' }} />}
        />
      </div>
    );
  }
}

export default Mapd;
