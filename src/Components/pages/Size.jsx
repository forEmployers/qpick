import React from 'react';
import Radium from 'radium';

class Size extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // We store this state in the app, so it will remember when this component is re-rendered
            selectedFilter: this.props.selectedSizeArray
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
            gridTemplateColumns: '33% 33% 33%',
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
                rowGap: '40px'
            }
        }


        return <>
            <div style={content}>

                <div style={cell}><img id="0" onClick={this.select} alt="single" key="0"
                    style={{
                        height: '110px',
                        cursor: 'pointer',
                        filter: `${this.state.selectedFilter[0]}`,
                        ':hover': {
                            transform: 'scale(1.1)'
                        }

                    }} src={'./img/singleitem.png'} />   <div style={picLabelMobile}>Single item</div></div>

                <div style={cell}><img id="1" onClick={this.select} alt="few" key="1"
                    style={{
                        height: '110px',
                        cursor: 'pointer',
                        filter: `${this.state.selectedFilter[1]}`,
                        ':hover': {
                            transform: 'scale(1.1)'
                        }
                    }} src={'./img/fewitems.png'} /> <div style={picLabelMobile}>Few items</div></div>

                <div style={cell}><img id="2" onClick={this.select} alt="one" key="2"
                    style={{
                        height: '110px',
                        cursor: 'pointer',
                        filter: `${this.state.selectedFilter[2]}`,
                        ':hover': {
                            transform: 'scale(1.1)'
                        }
                    }} src={'./img/onebedroom.png'} /> <div style={picLabelMobile}>One bedroom</div></div>

                {/*DESKTOP ONLY LABLES*/}
                <div style={picLabel}>Single item</div>
                <div style={picLabel}>Few items</div>
                <div style={picLabel}>One bedroom</div>

                <div style={cell}><img id="3" onClick={this.select} alt="two" key="3"
                    style={{
                        height: '110px',
                        cursor: 'pointer',
                        filter: `${this.state.selectedFilter[3]}`,
                        ':hover': {
                            transform: 'scale(1.1)',

                        }
                    }} src={'./img/twobedroom.png'} /> <div style={picLabelMobile}>Two bedroom</div></div>


                <div style={cell}><img id="4" onClick={this.select} alt="three" key="4"
                    style={{
                        height: '110px',
                        cursor: 'pointer',
                        filter: `${this.state.selectedFilter[4]}`,
                        ':hover': {
                            transform: 'scale(1.1)'
                        }
                    }} src={'./img/threebedroom.png'} />    <div style={picLabelMobile}>Three bedroom</div></div>


                <div style={cell}><img id="5" onClick={this.select} alt="four" key="5"
                    style={{
                        height: '110px',
                        cursor: 'pointer',
                        filter: `${this.state.selectedFilter[5]}`,
                        ':hover': {
                            transform: 'scale(1.1)',

                        }
                    }} src={'./img/fourbedroom.png'} /><div style={picLabelMobile}>Four bedroom</div></div>

                {/*DESKTOP ONLY LABLES*/}
                <div style={picLabel}>Two bedroom</div>
                <div style={picLabel}>Three bedroom</div>
                <div style={picLabel}>Four bedroom</div>
                <div></div>
            </div>
        </>
    }
}

Size = Radium(Size)

export default Size;