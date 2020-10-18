/**
/ This software was developed by Attila Meszaros
/ All rights are reserverd, unless otherwise stated
/ 2020 - m.attila@outlook.com - hello@maxking.com.au
*/

import React from 'react';
import Radium from 'radium';

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleClick = () => {
        this.props.next()
    }

    render() {

        const button = {
            fontSize: '25px',
            appearance: 'none',
            MozAppearance: 'none',
            WebkitAppearance: 'none',
            width: '100%',
            textTransform: 'uppercase',
            padding: '10px 55px 10px 55px',
            backgroundColor: 'black',
            color: 'white',
            border: '3px solid #000',
            borderRadius: '5px',
            boxSizing: 'border-box',
            overflow: 'auto',

            // For mobile
            '@media (max-width: 992px)': {
             width: '100%',
             marginTop:'15px'
            },
            ':hover': {
               backgroundColor: '#fff',
               border: '3px solid #000',
               color: '#000',
               }
        }

        return <button onClick={this.handleClick} style={button}>{this.props.text}</button>
    }
}

Button = Radium(Button)

export default Button;
