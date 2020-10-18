/**
/ This software was developed by Attila Meszaros
/ All rights are reserverd, unless otherwise stated
/ 2020 - m.attila@outlook.com - hello@maxking.com.au
*/

import React from 'react';
import Swal from 'sweetalert2'
import '../../App.scss';
import Radium from 'radium';

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleChnage = (event) =>{
       let currentInput = event.target.name + 'Input'
       this.props.currentInput(currentInput, event.target.value)
    }

    render() {

        const container = {
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '100%',
            gridTemplateRows: 'auto',
            gap: '10px',
            boxSizing: 'border-box',

            // For mobile
            '@media (max-width: 992px)': {
                gridTemplateColumns: '100%'
            }
        }

        const label = {
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '5px',
            marginTop: '10px'
        }

        return (<>

            <div style={container}>
                <div><div style={label}>Name</div><input placeholder="your name" className="input" type="text" name="name" id="name" onKeyUp={this.handleChnage} /></div>
                <div><div style={label}>E-mail</div><input placeholder="your email" className="input" type="text" name="email" id="email" onKeyUp={this.handleChnage} /></div>
                <div><div style={label}>Phone number</div><input placeholder="your phone" className="input" type="text" name="phone" id="phone" onKeyUp={this.handleChnage} /></div>
            </div>
        </>)
    }
}

Booking = Radium(Booking);
export default Booking;