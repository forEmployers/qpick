import React from 'react';
import Radium from 'radium';
import Autocomplete from 'react-google-autocomplete';


class AddressAutoComplete extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            type: 'geocode'
        }
    }

    cityOnly(evt) {

        if (evt.target.checked) {
            this.setState({
                type: 'geocode'
            })
        } else {
            this.setState({
                type: 'address'
            })
        }
        console.log(this.state.type)
    }
    render() {




        const dropdown = {
            appearance: 'none',
            MozAppearance: 'none',
            WebkitAppearance: 'none',
            width: '100%',
            padding: '10px',
            background: 'white',
            border: '3px solid black',
            borderRadius: '5px',
            fontSize: '18px'
        }


        return (
            <div>


                    <Autocomplete
                        style={dropdown}
                        onPlaceSelected={(place) => {
                            //alert(place.address_components[3].long_name)
                            //console.log(place);
                            //let city = place.address_components[3].long_name;
                            //let state = place.address_components[6].short_name;
                            let address = place.formatted_address;
                            //console.log(place.geometry.location.lat((a=>{console.log('lat: ' + a)})))
                            //console.log(place.geometry.location.lng((a=>{console.log('lng: ' + a)})))
                            let placeid = place.place_id
                            let lat = place.geometry.location.lat((a=>{return a}))
                            let lng = place.geometry.location.lng((a=>{return a}))
                            let geo = [lat, lng]

                            this.props.onChange(address, geo, placeid);
                        }}
                        types={[this.state.type]}
                        //types={['administrative_area_level_5']}

                        componentRestrictions={{ country: "AU" }}
                    />





            </div>
        );
    }
}

AddressAutoComplete = Radium(AddressAutoComplete);
export default AddressAutoComplete;