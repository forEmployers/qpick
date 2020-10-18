/**
/ This software was developed by Attila Meszaros
/ All rights are reserverd, unless otherwise stated
/ 2020 - m.attila@outlook.com - hello@maxking.com.au
*/

import React from 'react';
import Swal from 'sweetalert2'
import Radium from 'radium';
import Button from '../Button'

class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptions: this.props.selectedOptions,
            pianoOptions: ['Upright_piano', 'pianola', 'organ', 'Baby_grand_piano', 'Grand_piano'],
            pianoOptionsEnglish: ['Upright Piano', 'Pianola', 'Organ', 'Baby Grand Piano', 'Grand Piano'],
            poolOptions: ["7x3", "8x4", "9x5"],
            poolOptionsEnglish: ["7’ x 3’6", "8’ x 4’", "9’ x 4’6"]
        };
    }

    componentDidMount() {
        this.getQuote();
    }

    getQuote = () => {
        let accessOptions = ['Ground_Level', 'Double_Storey', 'Split_Level', 'Storage', 'Lift_Access', 'First_Floor', 'Second_Floor', 'Third_Floor']
        let headers = new Headers();
        headers.append("Content-Type", "application/json");


        var raw = JSON.stringify(this.state.selectedOptions.serviceType === 1 ?

            {
                "serviceType": 'home_move',
                "locationAddress": this.state.selectedOptions.pickupAddress,
                "locationPlaceId": this.state.selectedOptions.pickupPlaceId,
                "accessLevel": accessOptions[this.state.selectedOptions.pickupAccess],
                "serviceDate": this.state.selectedOptions.serviceDate
            } :

            {
                "serviceType":
                    (this.state.selectedOptions.serviceType === 2 || this.state.selectedOptions.serviceType === 3) ?
                        'item_move' : 'Home_move',
                "numberOfBedrooms": this.state.selectedOptions.numberOfBedrooms === 0 || this.state.selectedOptions.numberOfBedrooms === 1 ? 0 : this.state.selectedOptions.numberOfBedrooms - 1,
                "pickupAddress": this.state.selectedOptions.pickupAddress,
                "pickupPlaceId": this.state.selectedOptions.pickupPlaceId,
                "pickupAccess": accessOptions[this.state.selectedOptions.pickupAccess],
                "deliveryAddress": this.state.selectedOptions.dropoffAddress,
                "deliveryPlaceId": this.state.selectedOptions.dropoffPlaceId,
                "deliveryAccess": accessOptions[this.state.selectedOptions.dropoffAccess],
                "serviceDate": this.state.selectedOptions.serviceDate,
                "items":
                    parseInt(this.state.selectedOptions.extras) === 3 ?
                        { "poolTable": { "size": this.state.poolOptions[this.state.selectedOptions.selectedPool] }, } :
                        parseInt(this.state.selectedOptions.extras) === 2 ?
                            { "piano": { "type": this.state.pianoOptions[this.state.selectedOptions.selectedPiano] }, } : <></>
            }

        )

        let url = this.state.selectedOptions.serviceType === 1 ? 'https://stressfreemoves.com.au:9080/api/quote/labour' : "https://stressfreemoves.com.au:9080/api/quote"

        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.quoteNumber) {

                    // If servicetype is labour
                    if (this.state.selectedOptions.serviceType === 1) {

                        this.setState({
                            quoteNumber: result.quoteNumber,
                            serviceType: 'labour only',
                            quoteDate: result.requestDate,
                            locationAddress: result.locationAddress,
                            labourers: result.labourers,
                            costPerHour: result.costPerHour,
                            fees: result.fees,
                            totalCost: result.totalCost,
                            clientHours: result.clientHours,
                            costPerQuarterHour: result.costPerQuarterHour
                        }, () => {
                            // We send this back to the App for booking
                            this.props.quoteNumberReceived(this.state.quoteNumber)
                        })

                    } else {
                        this.setState({
                            quoteNumber: result.quoteNumber,
                            serviceType: result.serviceType.label,
                            quoteDate: result.requestDate,
                            pickupAddress: result.pickupAddress,
                            pickupAccess: result.pickupAccess.label,
                            dropoffAddress: result.deliveryAddress,
                            dropoffAccess: result.deliveryAccess.label,
                            vehicle: result.vehicleDetails,
                            labourers: result.labourers,
                            costPerHour: result.costPerHour,
                            fees: result.fees,
                            totalCost: result.totalCost,
                            clientHours: result.clientHours,
                            bedroomDetails: this.state.selectedOptions.numberOfBedrooms === 0 ? 'Single item' : result.bedroomDetails,
                            costPerQuarterHour: result.costPerQuarterHour
                        }, () => {
                            // We send this back to the App for booking
                            this.props.quoteNumberReceived(this.state.quoteNumber)
                        })
                    }

                } else {
                    Swal.fire({
                        title: 'Ooops!',
                        text: 'An error has occured: ' + result.status + ' Server message: ' + result.message + ' Additional errors: ' + result.errors,
                        icon: 'error',
                        confirmButtonText: 'Restart'
                    }).then((result) => {
                        if (result.value) {
                            window.location.reload();
                        }
                    })
                }

                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    render() {
        const table = {
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '33% 33% 33%',
            gridTemplateRows: 'auto',
            alignItems: 'center',
            justifyItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box'
        }

        const quoteFooter = {
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            gridTemplateRows: 'auto',
            gap: '10px',
            alignItems: 'start',
            justifyItems: 'left',
            boxSizing: 'border-box',

            // For mobile
            '@media (max-width: 992px)': {
                gridTemplateColumns: '100%'
            }
        }

        const header = {
            display: 'grid',
            backgroundColor: '#FFC90E',
            width: '100%',
            alignItems: 'center',
            justifyItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '5px',
            height: '30px',
            fontWeight: '700',
            minHeight: '20px'
        }

        const headerFullWidth = {
            display: 'grid',
            backgroundColor: '#FFC90E',
            width: '100%',
            alignItems: 'center',
            justifyItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '5px',
            minHeight: '20px'
        }

        const cell = {
            display: 'grid',
            width: '100%',
            alignItems: 'center',
            justifyItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '5px'
        }

        const quoteHeader = {
            marginBottom: '20px',
            display: 'grid',
            gridTemplateColumns: '40% 60%',
            gridTemplateRows: 'auto',
            rowGap: '5px',
            boxSizing: 'border-box',
            fontWeight: '700',
            backgroundColor: '#F9F9F9',
            padding: '15px',
            width: '100%'
        }

        const quote = {
            marginTop: '50px'
        }

        const rowResult = {
            fontWeight: '400'
        }


        const quoteRowHeader = {
            fontWeight: '700'
        }

        const buttondiv = {
            margin: '50px auto',
            width: '40%',
            textAlign: 'center',
            // For mobile
            '@media (max-width: 992px)': {
                width: '100%'
            }

        }
        return (<>

            <div style={quote}>

                <div style={table}>
                    <div style={header}>SERVICE</div><div style={header}>CHARGE</div><div style={header}>INCLUDES</div>

                    {/*FIRST COLUMN*/}
                    <div style={cell}>
                        <div>{this.state.vehicle}</div>
                        {/*MEN*/}
                        {this.state.selectedOptions.serviceType === 0 || this.state.selectedOptions.serviceType === 1 ? <div>{this.state.labourers} men</div> : <></>}

                        {/*SELECTED POOLTABLE OR PIANO AS EXTRA FOR HOUSE MOVE*/}
                        {parseInt(this.state.selectedOptions.extras) === 3 && this.state.selectedOptions.serviceType === 0 ?
                            <div>{this.state.poolOptionsEnglish[this.state.selectedOptions.selectedPool]}</div> :
                            parseInt(this.state.selectedOptions.extras) === 2 && this.state.selectedOptions.serviceType === 0 ?
                                <div>{this.state.pianoOptionsEnglish[this.state.selectedOptions.selectedPiano]}</div> : ''}

                        {/*SELECTED POOLTABLE OR PIANO AS A SERVICE*/}
                        {parseInt(this.state.selectedOptions.extras) === 3 && this.state.selectedOptions.serviceType === 3 ?
                            <div>Pool table: {this.state.poolOptionsEnglish[this.state.selectedOptions.selectedPool]}</div> :
                            parseInt(this.state.selectedOptions.extras) === 2 && this.state.selectedOptions.serviceType === 2 ?
                                <div>Piano: {this.state.pianoOptionsEnglish[this.state.selectedOptions.selectedPiano]}</div> : ''}

                        {/*LABOUR HIRE*/}
                        {this.state.selectedOptions.serviceType === 1 ? <><div>Muscles for hire* </div><div>*Does not includes a vehicle for transport of your goods, furniture or equipment.</div></> : <></>}
                    </div>

                    {/*SECOND COLUMN*/}
                    <div style={cell}>

                        {this.state.selectedOptions.numberOfBedrooms === 0 || this.state.selectedOptions.serviceType === 2 || this.state.selectedOptions.serviceType === 3 ?
                            <div>${this.state.totalCost} (fixed price)</div> :
                            <>
                                <div>${this.state.totalCost} includes the first {this.state.clientHours} hours</div>
                                <div>${this.state.costPerQuarterHour} per 15 min (after 1st {this.state.clientHours} hour)</div>
                            </>}

                        {/*SELECTED POOLTABLE OR PIANO AS EXTRA FOR HOUSE MOVE*/}
                        {parseInt(this.state.selectedOptions.extras) === 3 && this.state.selectedOptions.serviceType === 0 ?
                            <div>(no additional charges)</div> :
                            parseInt(this.state.selectedOptions.extras) === 2 && this.state.selectedOptions.serviceType === 0 ?
                                <div>(no additional charges)</div> : ''}
                    </div>

                    {/*THIRD COLUMN*/}
                    <div style={cell}>
                        <div>GST</div>
                        <div>INSURANCE</div>
                        {/*SELECTED POOLTABLE OR PIANO*/}
                        {this.state.selectedOptions.extras === 3 ? <p>POOL TABLE</p> :
                            this.state.selectedOptions.extras === 2 ? <p>PIANO</p> : <></>}
                    </div>

                </div>
            </div>
            <div style={headerFullWidth}>
                {this.state.selectedOptions.serviceType === 0 &&
                    (this.state.selectedOptions.numberOfBedrooms === 1 ||
                        this.state.selectedOptions.numberOfBedrooms === 2 ||
                        this.state.selectedOptions.numberOfBedrooms === 3 ||
                        this.state.selectedOptions.numberOfBedrooms === 4 ||
                        this.state.selectedOptions.numberOfBedrooms === 5) ?
                    <>
                        <div>The {this.state.clientHours} hour(s) <strong>STARTS</strong> at {this.state.selectedOptions.pickupAddress} and <strong>FINISHES</strong> at {this.state.selectedOptions.dropoffAddress}</div>

                    </> : <></>}

                {this.state.selectedOptions.serviceType === 1 ?
                    <>
                        <div>The {this.state.clientHours} hour(s) <strong>STARTS</strong> at {this.state.selectedOptions.pickupAddress}.</div>

                    </> : <></>}
            </div>

            <div style={buttondiv}><div><Button next={this.props.book} text="BOOK NOW" /></div></div>

            <div style={quoteFooter}>

                <div style={{
                    width: '100%'
                }}>
                    <h3>BENEFITS:</h3>
                    <div style={{
                        backgroundColor: '#F9F9F9',
                        padding: '15px',
                        width: '100%'
                    }}>
                        <ul className="table-ul">
                            <li >There are no additional fees or charges.  </li>
                            <li >Our prices includes GST.</li>
                            <li >You are fully insured.</li>
                            <li >No out of pocket or excess payable.</li>
                            {this.state.selectedOptions.serviceType === 1 ? <></> : <>
                                <li >All trucks are fitted with a hydraulic lift.</li>
                                {this.state.selectedOptions.serviceType === 2 || this.state.selectedOptions.serviceType === 3 ? <></> : <><li >Unlimited FREE boxes available.</li></>}</>}
                            {this.state.selectedOptions.serviceType === 2 || this.state.selectedOptions.serviceType === 3 ? <></> : <>
                                <li >2-men included as standard.</li>
                                <li >We don't round up to the nearest hour or half hour.</li></>}
                            <li >A decade of trust and experience.</li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    width: '100%'
                }}>
                    <h3>DETAILS:</h3>
                    <div style={quoteHeader}>
                        <div style={quoteRowHeader}>Quote number:</div><div style={rowResult}>{this.state.quoteNumber}</div>
                        {this.state.selectedOptions.serviceType === 0 ? <><div style={quoteRowHeader}>Move type:</div><div style={rowResult}>{this.state.bedroomDetails}</div></> : <></>}
                        <div style={quoteRowHeader}>Move date:</div><div style={rowResult}>{this.state.selectedOptions.serviceDate}</div>

                        {/*If servicetype is not labour*/}
                        {this.state.selectedOptions.serviceType !== 1 ?
                            <>
                                <div style={quoteRowHeader}>Pickup address:</div><div style={rowResult}>{this.state.pickupAddress}</div>
                                <div style={quoteRowHeader}>Pickup access:</div><div style={rowResult}>{this.state.pickupAccess}</div>
                                <div style={quoteRowHeader}>Dropoff address:</div><div style={rowResult}>{this.state.dropoffAddress}</div>
                                <div style={quoteRowHeader}>Dropoff access:</div><div style={rowResult}>{this.state.dropoffAccess}</div> </> :
                            <>
                                <div style={quoteRowHeader}>Address:</div><div>{this.state.locationAddress}</div>
                            </>
                        }
                    </div>
                </div>

            </div>

        </>)
    }
}

Quote = Radium(Quote);
export default Quote;