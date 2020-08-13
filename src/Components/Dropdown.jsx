import React from 'react';
import Radium from 'radium';


class Dropdown extends React.Component {

    changeHandler = (event) => {
        this.props.selected(event.target.value || 0)
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


        return <>
            <select key="d1" onChange={this.changeHandler} style={dropdown}>
                {this.props.options.map((option, index) => {
                    return <option key={index} value={index}>{option}</option>
                })
                }
            </select>
        </>
    }
}

Dropdown = Radium(Dropdown)

export default Dropdown;