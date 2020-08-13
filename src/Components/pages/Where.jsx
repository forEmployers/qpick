import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import AddressAutoComplete from '../AddressAutoComplete'
import Mapd from '../Map.js';
import Dropdown from '../Dropdown';
import Swal from 'sweetalert2'
import Radium from 'radium';

import pina from '../../img/pina.png'
import pinb from '../../img/pinb.png'

class Where extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address2: false,
            address1: false,
            distance: false,
            accessOptions: ['Ground level', 'Double storey', 'Split level', 'Storage', 'Lift access', '1st floor with stairs', '2nd floor with stairs', '3rd floor with stairs'],
            myArray: [
                { lat: -34.397, lng: 150.644 },
                { lat: -24.397, lng: 140.644 },
                { lat: -14.397, lng: 130.644 },
            ]
        };

        this.getDistance = this.getDistance.bind(this);
    }

    async getDistance(origin, destination) {

        const directionsService = new window.google.maps.DirectionsService();
        const orig = { lat: this.state.origlat, lng: this.state.origlng };
        const dest = { lat: this.state.destlat, lng: this.state.destlng };

        directionsService.route(
            {
                origin: orig,
                destination: dest,
                travelMode: window.google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );

        var service = new window.google.maps.DistanceMatrixService();
        let promise = service.getDistanceMatrix(
            {
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING'
            }, callback.bind(this));

        function callback(response, status) {
            //console.log(response)
            let d = (response.rows[0].elements[0].distance.value / 1000);
            this.setState({
                distance: d.toFixed(2)
            }, () => this.props.distance(d.toFixed(2)));
            //console.log(this.state.distance)
        }
        return promise;
    }


    selectedPickupOption = (option) => {
        if ((this.props.selectedMoveType === 2 || this.props.selectedMoveType === 3)) {
            if (parseInt(option) === 1 ||
                parseInt(option) === 2 ||
                parseInt(option) === 5 ||
                parseInt(option) === 6 ||
                parseInt(option) === 7) {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry :(',
                    text: 'DUE TO OHS REQUIREMENTS OF STAIRS, WE NEED TO SPEAK WITH YOU BEFORE PROVIDING A QUOTE PLEASE CALL THE OFFICE ON 1800 77 66 39',
                    confirmButtonText: 'BACK'
                })
            }

        } else {
            this.props.pickupAccessSelected(option)
        }
    }
    selectedDropoffOption = (option) => {
        if ((this.props.selectedMoveType === 2 || this.props.selectedMoveType === 3)) {
            if (parseInt(option) === 1 ||
                parseInt(option) === 2 ||
                parseInt(option) === 5 ||
                parseInt(option) === 6 ||
                parseInt(option) === 7) {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry :(',
                    text: 'DUE TO OHS REQUIREMENTS OF STAIRS, WE NEED TO SPEAK WITH YOU BEFORE PROVIDING A QUOTE PLEASE CALL THE OFFICE ON 1800 77 66 39',
                    confirmButtonText: 'BACK'
                })
            }

        } else {
            this.props.dropoffAccessSelected(option)
        }
    }

    selectedPickupAddress = (address, geo, placeid) => {
        this.props.pickupAddressSelected(address, placeid)
        this.setState({
            address1: address,
            origlat: geo[0],
            origlng: geo[1]
        }, () => {
            //this.getDistance(this.state.address1, this.state.address2)
            //console.log(this.state.lat)
            //console.log(this.state.lng)

        })
    }

    selectedDropoffAddress = (address, geo, placeid) => {
        this.props.dropoffAddressSelected(address, placeid)
        this.setState({
            address2: address,
            destlat: geo[0],
            destlng: geo[1]
        }, () => {
            this.getDistance(this.state.address1, this.state.address2).then(
                this.setState({
                    showmap: true
                })
            )
            //console.log(this.state.lat)
            //console.log(this.state.lng)
        })
    }

    render() {

        const container = {
            display: 'grid',
            gridTemplateColumns: this.props.selectedMoveType === 1 ? '100%' : '50% 50%',
            gridTemplateRows: 'auto',
            gap: '30px',
            // For mobile
            '@media (max-width: 992px)': {
                gridTemplateColumns: '100%',
                gap: '0px',
            }
        }

        const mapDiv = {
            marginTop: '30px',
            borderRadius: '10px'
        }

        const label = {
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '5px',
            marginTop: '10px'
        }

        const row = {
            marginBottom: '30px'
        }

        const splitRow = {
            display: 'grid',
            gridTemplateColumns: this.props.selectedMoveType === 1 ? '100%' : '10% 90%',
            gridTemplateRows: 'auto'
        }

        const pinStyle = {
            width: '30px'
        }

        return (<>

            <div style={container}>

                <div>

                    <div style={row}>

                        <div style={splitRow}>

                            <div> </div>
                            {/*IF LABOURHIRE IS SELECTED, DON'T SHOW THIS*/}
                            {this.props.selectedMoveType === 1 ? <div style={label}>Address:</div> : <div style={label}>Pick up address:</div>}

                            {this.props.selectedMoveType === 1 ? <></> : <div><img alt="pin" style={pinStyle} src={pina} /></div>}
                            <div><AddressAutoComplete onChange={this.selectedPickupAddress} /></div>

                            <div> </div>
                            <div style={label}>Access:</div>

                            <div> </div>
                            <div><Dropdown selected={this.selectedPickupOption} options={this.state.accessOptions} /></div>

                        </div>

                    </div>

                    {/*IF LABOURHIRE IS SELECTED, DON'T SHOW THIS*/}
                    {this.props.selectedMoveType === 1 ? <div></div> :

                        <div style={row}>

                            <div style={splitRow}>

                                <div> </div>
                                <div style={label}>Drop off address:</div>

                                {this.props.selectedMoveType === 1 ? <></> : <div><img alt="pin" style={pinStyle} src={pinb} /></div>}
                                <div><AddressAutoComplete onChange={this.selectedDropoffAddress} /></div>


                                <div> </div>
                                <div style={label}>Access</div>

                                <div> </div>
                                <div><Dropdown selected={this.selectedDropoffOption} options={this.state.accessOptions} /></div>

                            </div>
                        </div>

                    }
                </div>

                {/*IF LABOURHIRE IS SELECTED, DON'T SHOW THIS*/}
                {this.props.selectedMoveType === 1 ? <div></div> :
                    <div style={row}>

                        <div style={mapDiv}>
                            <Mapd
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJ2bsgQjhwJGhW0pteeFty72uQfBfiy_o"
                                directions={this.state.directions}
                            />
                        </div>
                    </div>}
            </div>

        </>)
    }
}
Where = Radium(Where)
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDJ2bsgQjhwJGhW0pteeFty72uQfBfiy_o'
})(Where);