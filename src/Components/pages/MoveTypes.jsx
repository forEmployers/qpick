import React from 'react';
import Radium from 'radium';

import house from '../../img/house.png'
import piano from '../../img/piano.png'
import pool from '../../img/pool.png'
import labour from '../../img/labour.png'

class MoveTypes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // We store this state in the app, so it will remember when this component is re-rendered
            selectedFilter: this.props.selectedFilterArray
        }
    }

    /*
    * This when a picture is selected
    *
    */
    select = (event) => {
        let id = parseInt(event.target.id)
        let tempArray = []

        // Create an array and set the state
        for (let i = 0; i < this.state.selectedFilter.length; i++) {
            if (i === id) {
                tempArray.push('')
                this.setState({
                    selectedFilter: tempArray
                })
            } else tempArray.push('invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)')
            // Now let'send it back to the app so it will remember the state
            this.props.selectedFilter(tempArray, id)
        }
    }

    render() {

        const cell = {
            display: 'grid',
            justifyContent: 'center',
            gridTemplateColumns: '100%',
            gridTemplateRows: 'auto',
            alignItems: 'center',
            justifyItems: 'center',
            boxSizing: 'border-box'
        }

        const picLabel = {
            boxSizing: 'border-box',
            fontSize: '22px',
            textTransform: 'uppercase',
            paddingTop: '10px',
            // For mobile
            '@media (max-width: 992px)': {
                display: 'none'
            }

        }

        const picLabelMobile = {
            display: 'none',
            // For mobile
            '@media (max-width: 992px)': {
                display: 'grid',
                boxSizing: 'border-box',
                fontSize: '22px',
                textTransform: 'uppercase',
                paddingTop: '10px',
            }

        }

        const content = {
            display: 'grid',
            gridTemplateColumns: '25% 25% 25% 25%',
            gridTemplateRows: 'auto',
            rowGap: '20px',
            padding: '20px',
            alignItems: 'end',
            justifyItems: 'center',
            boxSizing: 'border-box',
            marginTop: '50px',
            // For mobile
            '@media (max-width: 992px)': {
                gridTemplateColumns: '100%',
                rowGap: '40px',
                padding: '0px'
            }
        }

        return <>
            <div style={content}>

                <div style={cell}><img id="0" onClick={this.select} alt="house" key="0"
                    style={{
                        height: '130px',
                        cursor: 'pointer',
                        filter: `${this.state.selectedFilter[0]}`,
                        ':hover': {
                            transform: 'scale(1.1)'
                        }

                    }} src={house} /><div style={picLabelMobile}>House</div></div>

                <div style={cell}><img id="2" onClick={this.select} alt="piano" key="2"
                    style={{
                        height: '130px',
                        cursor: 'pointer',
                        filter: `${this.state.selectedFilter[2]}`,
                        ':hover': {
                            transform: 'scale(1.1)'
                        }
                    }} src={piano} /><div style={picLabelMobile}>Piano</div></div>


                <div style={cell}><img id="3" onClick={this.select} alt="pooltable" key="3"
                    style={{
                        height: '130px',
                        cursor: 'pointer',
                        filter: `${this.state.selectedFilter[3]}`,
                        ':hover': {
                            transform: 'scale(1.1)',

                        }
                    }} src={pool} /><div style={picLabelMobile}>Pool table</div>    </div>

                    <div style={cell}><img id="1" onClick={this.select} alt="labour" key="1"
                        style={{
                            height: '130px',
                            cursor: 'pointer',
                            filter: `${this.state.selectedFilter[1]}`,
                            ':hover': {
                                transform: 'scale(1.1)'
                            }
                        }} src={labour} /><div style={picLabelMobile}>Labour only</div></div>




                {/*DESKTOP ONLY LABLES*/}

                <div style={picLabel}>House</div>
                <div style={picLabel}>Piano</div>

                <div style={picLabel}>Pool table</div>
                <div style={picLabel}>Labour hire</div>

            </div>
        </>
    }
}

MoveTypes = Radium(MoveTypes)
export default MoveTypes;