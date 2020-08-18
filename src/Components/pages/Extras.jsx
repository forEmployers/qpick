import React from 'react';
import Radium from 'radium';

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
//import 'react-calendar/dist/Calendar.css';
import Dropdown from '../Dropdown';
import Swal from 'sweetalert2'

class Extras extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            time: this.props.time,
            selectedExtra: this.props.selectedOption,
            height: 400, // calendar height,
            weekdays: true, // show weekdays by default
            calendarClosed: false
        }
    }

    /*
* This when a picture is selected
*
*/
    timeChange = (date) => {

        if (date) {
            this.setState({
                time: date,
                height: 0,
                weekdays: false,
                calendarClosed: true
            }, () => {
                this.props.timeChange(date)
            })
        } else {
            Swal.fire(
                'Oops!',
                'Date must be selected',
                'error'
            )
        }

    }

    selectedOption = (option) => {

        this.setState({
            selectedExtra: parseInt(option) + 1
        })
        this.props.selectedOption(parseInt(option) + 1)
        this.props.selectedPiano(0)
        this.props.selectedPool(0)
    }

    selectedPool = (option) => {

        this.props.selectedPool(option)
        this.props.selectedPiano(0)

    }

    selectedPiano = (option) => {

        this.props.selectedPiano(option)
        this.props.selectedPool(0)

    }

    render() {

        const content = {
            display: 'grid',
            gridTemplateColumns: '15% 70% 15%',
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

        const label = {
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '5px',
            marginTop: '10px'
        }

        const extras = {
            display: 'grid',
            width: '100%',
        }

        const dropdownRow = {
            padding: '10px'
        }

        const link = {
            cursor: 'pointer',
            color: 'blue'
        }
        return <>
            <div style={content}>
                <div></div>
                <div>
                    <InfiniteCalendar
                        displayOptions={{
                            showWeekdays: this.state.weekdays
                        }}
                        width={400}
                        height={this.state.height}
                        selected={this.state.time}
                        minDate={new Date()}
                        onSelect={date => this.timeChange(date)}

                        theme={{
                            accentColor: '#000',
                            floatingNav: {
                                background: 'rgba(56, 87, 138, 0.94)',
                                chevron: '#000',
                                color: '#FFF',
                            },
                            headerColor: '#FFC90E',
                            selectionColor: '#000',
                            textColor: {
                                active: '#FFF',
                                default: '#333',
                            },
                            todayColor: '#FFA726',
                            weekdayColor: '#000'
                        }}
                    />

                </div>
                <div></div>


                {this.state.calendarClosed ? <><div></div><div onClick={() => {
                    this.setState({
                        height: 400,
                        weekdays: true,
                        calendarClosed: false

                    })
                }} style={link}>Open calendar</div> <div></div></> : <></>}

                <div></div>
                {this.props.selectedMoveType !== 1 && parseInt(this.props.selectedSize) !== 0 ? <>
                    <div style={extras}>
                        <div style={label}>Please select option:</div>
                        <div style={dropdownRow}>
                            <Dropdown
                                options={this.props.selectedMoveType === 0 ? this.props.extrasOptions :
                                    this.props.selectedMoveType === 2 ? ['Piano'] :
                                        this.props.selectedMoveType === 3 ? ['Pooltable'] : ['No option']}
                                selected={this.selectedOption}
                                width="100%"
                            />
                        </div>
                        {(this.state.selectedExtra === 3 || this.props.selectedMoveType === 3) ? <div style={dropdownRow}>
                            <Dropdown
                                options={this.props.poolOptions}
                                selected={this.selectedPool}
                                width="100%"
                            />
                        </div> : <></>}

                        {(this.state.selectedExtra === 2 || this.props.selectedMoveType === 2) ? <div style={dropdownRow}>
                            <Dropdown
                                options={this.props.pianoOptions}
                                selected={this.selectedPiano}
                                width="100%"
                            />
                        </div> : <></>}
                    </div></> : <div></div>
                }
                <div></div>

            </div>
        </>
    }
}

Extras = Radium(Extras)

export default Extras;