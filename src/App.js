/**
/ This software was developed by Attila Meszaros
/ All rights are reserverd, unless otherwise stated
/ 2020 - m.attila@outlook.com - hello@maxking.com.au
*/

import React from 'react';
import './App.scss';
import Button from './Components/Button'
import { StyleRoot } from 'radium';
import Swal from 'sweetalert2'

// Pages
import MoveTypes from './Components/pages/MoveTypes';
import Size from './Components/pages/Size';
import Where from './Components/pages/Where';
import Extras from './Components/pages/Extras';
import Quote from './Components/pages/Quote';
import Booking from './Components/pages/Booking';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // General
      currentMessage: 'I need to move a house',
      header: ['MOVE TYPE', 'HOUSE SIZE', 'WHERE & ACCESS', 'DATES & EXTRAS', 'YOUR QUOTE', 'REQUEST BOOKING'],
      nextButton: 'Next',
      backButton: false,
      currentPage: 0,
      pages: 5,

      // Selected move type
      selectedMoveTypeFilter: [
        'invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)',
        'invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)',
        'invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)',
        'invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)'],
      selectedMoveType: false, // This is the selected value
      moveTypes: ['to move house', 'labour only', 'to move a piano', 'to move a pool table'],

      // Selected size
      selectedSizeFilter: [
        'invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)',
        'invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)',
        'invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)',
        'invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)',
        'invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)',
        'invert(73%) sepia(87%) saturate(580%) hue-rotate(346deg) brightness(103%) contrast(104%)'],
      sizeOptions: ['single item', 'few items', 'one bedroom home', 'two bedroom home', 'three bedroom home', 'four bedroom home'],
      selectedSize: false, // This is the selected value

      // Selected location:
      selectedPickupAccess: 0, // This is the selected value
      selectedDropoffAccess: 0, // This is the selected value
      selectedPickupAddress: false, // This is the selected value
      selectedDropoffAddress: false, // This is the selected value
      pickupPlaceid: '',
      dropoffPlaceid: '',

      // Date & extras
      extrasTime: new Date(),
      extrasOptions: ['No extras', 'Piano', 'Pool table'],
      selectedExtra: false,
      pianoOptions: ['Upright Piano', 'Pianola', 'Organ', 'Baby Grand Piano', 'Grand Piano'],
      poolOptions: ["7’ x 3’6", "8’ x 4’", "9’ x 4’6"],
      selectedPool: 0,
      selectedPiano: 0

    }
  }

  quoteNumberReceived = (quoteNumber) => {
    this.setState({ quoteNumber }, () => console.log('qq' + quoteNumber))
  }

/*
* scrolling
*
*/
  scrollTo() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

/*
 * Booking
 *
 */
  book = () => {

    let validateEmail = (mail) => {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
      }
      //alert("You have entered an invalid email address!")
      return (false)
    }

    if (this.state.nameInput && validateEmail(this.state.emailInput) && this.state.phoneInput) {

      let url = 'https://stressfreemoves.com.au:9080/api/booking';
      let headers = new Headers();
      headers.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: this.state.nameInput,
        phoneNumber: this.state.phoneInput,
        emailAddress: this.state.emailInput,
        quoteNumber: this.state.quoteNumber
      })

      console.log(raw)

      var bookingOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
      };

      fetch(url, bookingOptions)
        .then(response => response.status)
        .then(result => {

          if (result === 202) {

            Swal.fire({
              title: 'Success!',
              text: 'Booking has been sent, thank you!',
              icon: 'success',
              confirmButtonText: 'Restart'
            }).then((result) => {
              if (result.value) {
                window.location.reload();
              }
            })

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
        }).catch((error) => {
          Swal.fire({
            title: 'Ooops!',
            text: 'An error has occured: ' + error,
            icon: 'error',
            confirmButtonText: 'Restart'
          }).then((result) => {
            if (result.value) {
              window.location.reload();
            }
          })
        })

    } else {
      Swal.fire(
        'Missing data!',
        'Please fill out all details with valid data',
        'warning'
      )
    }
  }

  bookingInput = (state, value) => {
    this.setState({
      [state]: value
    })
  }

  /*
 * Sets distance
 *
 */
  getDistance = (distance) => {
    this.setState({
      distance: distance
    })
  }

  /*
  * Selected move type
  *
  */
  selectedMoveType = (filterArray, id) => {

    // If pool or piano is seelected
    if (id === 2 || id === 3) {
      this.setState({
        selectedExtra: id
      })
    }

    this.setState({
      selectedMoveTypeFilter: filterArray,
      selectedMoveType: id
    }, () => {
      this.messageHandler()
      this.next()
    })
  }

  /*
 * Selected size (if house)
 *
 */
  selectedSize = (filterArray, id) => {
    this.setState({
      selectedSizeFilter: filterArray,
      selectedSize: id
    }, () => {
      this.messageHandler()
      this.next()
    })
  }
  /*
  * Handles the chnages in pickup accress
  *
  */
  selectedPickupAccess = (option) => {
    this.setState({
      selectedPickupAccess: option
    }, () => {
      this.messageHandler()
    })
  }

  /*
* Handles the chnages in dropoff accress
*
*/
  selectedDropoffAccess = (option) => {
    this.setState({
      selectedDropoffAccess: option
    }, () => {
      this.messageHandler()
    })
  }

  /*
* Handles the chnages in pickup address
*
*/
  selectedPickupAddress = (address, placeid) => {
    this.setState({
      selectedPickupAddress: address,
      pickupPlaceid: placeid
    }, () => {
      this.messageHandler()
    })
  }

  /*
 * Handles the chnages in dropoff address
 *
 */
  selectedDropoffAddress = (address, placeid) => {
    this.setState({
      selectedDropoffAddress: address,
      dropoffPlaceid: placeid
    }, () => this.messageHandler())
  }

  /*
 *When date changes on extras page
 *
 */
  extrasTimeChange = (time) => {
    this.setState({
      extrasTime: time
    }, () => this.messageHandler())
  }

  /*
 * Selected extra
 *
 */
  selectedExtra = (option) => {
    this.setState({
      selectedExtra: option
    }, () => this.messageHandler())

  }

  /*
 * Pool table type selected
 *
 */
  selectedPool = (option) => {
    this.setState({
      selectedPool: option
    }, () => this.messageHandler())

  }

  /*
 * Piano type selected
 *
 */
  selectedPiano = (option) => {
    this.setState({
      selectedPiano: option
    }, () => this.messageHandler())

  }

  /*
 * Convert date to appropriate format
 *
 */
  convertDate = (date, format) => {
    console.log(date)
    let year = date.getFullYear()
    let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let selectedDate =
      format === 'AU' ? day + '-' + month + '-' + year :
        format === 'EU' ? year + '-' + month + '-' + day : ''
    console.log(selectedDate)
    return selectedDate
  }

  /*
  * Handles messages on page changes
  *
  */
  messageHandler = () => {
    console.log(this.state.currentPage)
    console.log(this.state.selectedPickupAddress)

    switch (this.state.currentPage) {
      case 0:
        this.setState({
          currentMessage: 'I need ' + this.state.moveTypes[this.state.selectedMoveType]
        })
        break;

      case 1:
        this.setState({
          currentMessage:
            this.state.selectedMoveType === 0 ? 'I need to move a ' + this.state.sizeOptions[this.state.selectedSize] :
              this.state.selectedMoveType === 2 ||
                this.state.selectedMoveType === 3 ? 'I need to move a ' + this.state.moveTypes[this.state.selectedMoveType] :
                this.state.selectedMoveType === 1 ? 'I need ' + this.state.moveTypes[this.state.selectedMoveType] : ''
        })
        break;

      case 2:
        if (this.state.selectedPickupAddress && this.state.selectedDropoffAddress) {
          this.setState({
            currentMessage:
              this.state.selectedMoveType === 0 ? 'I need to move a ' + this.state.sizeOptions[this.state.selectedSize] + ' from ' + this.state.selectedPickupAddress + ' to ' + this.state.selectedDropoffAddress :
                this.state.selectedMoveType === 2 ||
                  this.state.selectedMoveType === 3 ? 'I need to move a ' + this.state.moveTypes[this.state.selectedMoveType] + ' from ' + this.state.selectedPickupAddress + ' to ' + this.state.selectedDropoffAddress :
                  this.state.selectedMoveType === 1 ? 'I need ' + this.state.moveTypes[this.state.selectedMoveType] : ''
          })
        }
        break;

      case 3:
      case 4:
        this.scrollTo()
        this.setState({
          currentMessage:
            this.state.selectedMoveType === 0 ? 'I need to move a ' + this.state.sizeOptions[this.state.selectedSize] + ' from ' + this.state.selectedPickupAddress + ' to ' + this.state.selectedDropoffAddress + ' on ' + this.convertDate(this.state.extrasTime, 'AU') :
              this.state.selectedMoveType === 2 ||
                this.state.selectedMoveType === 3 ? 'I need to move a ' + this.state.moveTypes[this.state.selectedMoveType] + ' from ' + this.state.selectedPickupAddress + ' to ' + this.state.selectedDropoffAddress + ' on ' + this.convertDate(this.state.extrasTime, 'AU') :
                this.state.selectedMoveType === 1 ? 'I need ' + this.state.moveTypes[this.state.selectedMoveType] + ' on ' + this.convertDate(this.state.extrasTime, 'AU') : ''
        })
        break;

      default:
        break;
    }
  }

  /*
  * This handles the next button
  *
  */
  next = () => {
    // Pages between first and last page
    console.log('curr: ' + this.state.currentPage)
    if (this.state.currentPage !== this.state.pages) {

      (this.state.currentPage === 0 && this.state.selectedMoveType === false) ||
        (this.state.currentPage === 1 && this.state.selectedSize === false)
        ? Swal.fire(
          'Missing data',
          'Please select an option',
          'warning'
        ) :

        (this.state.selectedMoveType !== 1 && this.state.currentPage === 2 && this.state.selectedPickupAddress === false)
          ? Swal.fire(
            'Missing data',
            'Please select pickup address',
            'warning'
          ) :

          (this.state.selectedMoveType !== 1 && this.state.currentPage === 2 && this.state.selectedDropoffAddress === false)
            ? Swal.fire(
              'Missing data',
              'Please select dropoff address',
              'warning'
            ) :

            (this.state.selectedMoveType === 1 && this.state.currentPage === 2 && this.state.selectedPickupAddress === false)
              ? Swal.fire(
                'Missing data',
                'Please select address',
                'warning'
              ) :

              this.setState({
                currentPage:
                  (this.state.selectedMoveType !== 0)  // If selected is not house
                    && this.state.currentPage === 0 ?  // And we are on the first page
                    this.state.currentPage + 2 : this.state.currentPage + 1, // lets skip page 2
                backButton: "Back"
              }, () => {

                // If we reach the last page
                if (this.state.currentPage === this.state.pages - 1)
                  this.setState({
                    nextButton: false,
                    backButton: false
                  })

                // If we reach booking page
                if (this.state.currentPage === this.state.pages)
                  this.setState({
                    nextButton: false,
                    backButton: false,
                    bookButton: 'Book now'
                  })
              })
      // When we reached the last and hit the button
    } else {
      this.setState({
        // Booking page
        currentPage: 6
      })
    }
    this.messageHandler()
  }

  /*
  * This handles the back button
  *
  */
  back = () => {
    this.setState({
      currentPage:
        (this.state.selectedMoveType !== 0) // If movetype not house
          && this.state.currentPage === 2 ? this.state.currentPage - 2 : // we skip the first page when go back
          this.state.currentPage - 1
    }, () => {
      if (this.state.currentPage === 0)
        this.setState({
          backButton: false
        })
    });
    this.messageHandler()
  }

  render() {

    const container = {
      width: '100%',
      margin: '100px auto',
      minWidth: '800px',
      borderRadius: '5px',
      boxShadow: "0px 2px 6px -2px rgba(0,0,0,0.6)",
      transition: ".2s transform linear, .2s box-shadow linear",
      boxSizing: 'border-box',
      overflow: 'auto',
      backgroundColor: 'white',

      // For mobile
      '@media (max-width: 992px)': {
        minWidth: '0px',
        width: '100%',
        borderRadius: '0px',
        margin: '0 auto',
        padding: '0px'
      }
    }

    const header = {
      width: '100%',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      padding: '10px 20px 10px 20px',
      color: 'white',
      backgroundColor: 'black',
      boxSizing: 'border-box',
      overflow: 'auto',
      fontSize: '30px',
      textTransform: 'uppercase',
      textAlign: 'center',
      zIndex: '1000',
      borderBottom: '7px solid #FFC90E',
      // For mobile
      '@media (max-width: 992px)': {
        borderRadius: '0px',
        position: 'fixed',
        top: '0',
        padding: '10px 0px 10px 0px',
      }
    }

    const stepName = {
      fontSize: '49px',
      textAlign: 'center',
      color: '#ED1C24',
      marginBottom: '20px',
      // For mobile
      '@media (max-width: 992px)': {
        fontSize: '39px',
      }
    }

    const stepMessage = {
      fontSize: '22px',
      textAlign: 'center',
      marginBottom: '30px'
    }

    const content = {
      padding: '50px',
      // For mobile
      '@media (max-width: 992px)': {
        padding: '70px 10px 10px 10px'
      }
    }

    const buttons = {
      display: 'grid',
      gridTemplateColumns: this.state.backButton ? '20% 30% 30% 20%' : '30% 40% 30%',
      alignItems: 'center',
      justifyItems: 'center',
      marginTop: '30px',

      boxSizing: 'border-box',
      // For mobile
      '@media (max-width: 992px)': {
        display: 'block',
        // gridTemplateColumns: '100%',
        width: '100%'
      }
    }

    return <>
      <StyleRoot>

        {/*HEADER*/}

        <div style={container}>
          <div ref={el => { this.el = el; }} ></div>

          {/*ANY PAGES (not booking)*/}
          {this.state.currentPage !== this.state.pages ?
            <div style={header}>
              STEP {
                (this.state.selectedMoveType === 1 || this.state.selectedMoveType === 2 || this.state.selectedMoveType === 3) && (this.state.currentPage === 2 || this.state.currentPage === 3 || this.state.currentPage === 4) ?
                  this.state.currentPage :
                  this.state.currentPage + 1
              } OUT OF {this.state.selectedMoveType === 1 || this.state.selectedMoveType === 2 || this.state.selectedMoveType === 3 ? this.state.pages - 1 : this.state.pages}
            </div>
            :
            <div style={header}>
              {/*ONLY FOR BOOKING PAGE*/}
              BOOKING
          </div>
          }

          {/*CONTENT*/}
          <div style={content}>
            <div style={stepName}>{this.state.selectedMoveType === 1 && this.state.currentPage === 3 ? 'DATE' : this.state.header[this.state.currentPage]}</div>
            <div style={stepMessage}>{this.state.currentMessage}</div>

            {/*PAGE SELECTION LOGIC*/}
            {this.state.currentPage === 0 ?
              <MoveTypes selectedFilterArray={this.state.selectedMoveTypeFilter} selectedFilter={this.selectedMoveType}></MoveTypes> :
              this.state.currentPage === 1 ?
                <Size
                  selectedSizeArray={this.state.selectedSizeFilter}
                  selectedFilter={this.selectedSize}></Size> :
                this.state.currentPage === 2 ?
                  <Where
                    pickupAccessSelected={this.selectedPickupAccess}
                    dropoffAccessSelected={this.selectedDropoffAccess}
                    pickupAddressSelected={this.selectedPickupAddress}
                    dropoffAddressSelected={this.selectedDropoffAddress}
                    distance={this.getDistance}
                    selectedMoveType={this.state.selectedMoveType}
                  /> :
                  this.state.currentPage === 3 ?
                    <Extras
                      timeChange={this.extrasTimeChange}
                      time={this.state.extrasTime}
                      extrasOptions={this.state.extrasOptions}
                      selectedOption={this.selectedExtra}
                      pianoOptions={this.state.pianoOptions}
                      poolOptions={this.state.poolOptions}
                      selectedPool={this.selectedPool}
                      selectedPiano={this.selectedPiano}
                      selectedMoveType={this.state.selectedMoveType}
                      selectedSize={this.state.selectedSize} /> :

                    this.state.currentPage === 4 ?
                      <Quote
                        book={this.next}
                        booktext={this.state.bookButton}
                        selectedOptions={{
                          serviceType: this.state.selectedMoveType,
                          numberOfBedrooms: this.state.selectedSize,

                          pickupAddress: this.state.selectedPickupAddress,
                          pickupPlaceId: this.state.pickupPlaceid,
                          pickupAccess: this.state.selectedPickupAccess,

                          dropoffAddress: this.state.selectedDropoffAddress,
                          dropoffPlaceId: this.state.dropoffPlaceid,
                          dropoffAccess: this.state.selectedDropoffAccess,

                          serviceDate: this.convertDate(this.state.extrasTime, 'EU'),

                          extras: this.state.selectedExtra,
                          distance: this.state.distance,

                          selectedPool: this.state.selectedPool,
                          selectedPiano: this.state.selectedPiano
                        }}
                        quoteNumberReceived={this.quoteNumberReceived}
                      /> :
                      this.state.currentPage === 5 ?
                        <Booking currentInput={this.bookingInput} />

                        : <></>}

            {/*BUTTONS DIV*/}
            <div style={buttons}>
              <div></div>
              {this.state.backButton ? <div><Button next={this.back} text={this.state.backButton} /></div> : <></>}
              {this.state.bookButton ? <div><Button next={this.book} text={this.state.bookButton} /></div> : <></>}
              {this.state.nextButton ? <div><Button next={this.next} text={this.state.nextButton} /></div> : <></>}
              <div></div>
            </div>
          </div>

        </div>
      </StyleRoot>
    </>

  }
}

export default App;
