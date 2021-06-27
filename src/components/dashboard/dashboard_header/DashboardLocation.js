import React, { Component } from 'react';
import Geocode from 'react-geocode';

import './dashboardLocation.css';
import PharmacyAutoComplete from './PharmacyAutoComplete';

Geocode.setApiKey(process.env.REACT_APP_API_KEY);
Geocode.enableDebug();

/**
 * Show to current city you are when you come to this page.
 * You can also choose other city you want for delivery.
 * (But only few cities are able to support the delivery servie.)
 */
class DashboardLoctaion extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            dropdownState: false,
            address: '',
            city: "Bangalore",
            lat: 12.972442,
            lng: 77.580643,
            location: '',
        };

        this.getLocation = this.getLocation.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.openDropdown = this.openDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);

        this.handleGeoLocation = this.handleGeoLocation.bind(this);

        this.getCity = this.getCity.bind(this);
        this.getCountry = this.getCountry.bind(this);
    }

    handleGeoLocation(location) {
        this.getLocation(location.lat, location.lng);
        this.closeDropdown();
    }
    

    handleDropdown() {
        if (!this.state.dropdownState)
            this.openDropdown();
        else
            this.closeDropdown();
    }

    
    openDropdown() {
        this.setState({ dropdownState: true });
        document.getElementById("main-autocomplete-style").style.display = "initial";
        document.getElementById("main-dropdown-icon").style.transform = "rotate(270deg)";
        document.getElementById("main-shaded-layer").style.display = "initial";
        document.getElementById("main-shaded-layer").style.left = "0";
    }

    closeDropdown() {
        this.setState({ dropdownState: false });
        document.getElementById("main-autocomplete-style").style.display = "none";
        document.getElementById("main-dropdown-icon").style.transform = "rotate(0deg)";
        document.getElementById("main-shaded-layer").style.display = "none";
    } 

    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
            else if (addressArray[i].types[0] && 'administrative_area_level_3' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    }

    getCountry = (addressArray) => {
        let country = '';
        for (let i = 0; i < addressArray.length; i++) { 
            if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
                country = addressArray[i].long_name;
                return country;
            }
        }
    }

    getLocation(lat, lng) {
        Geocode.fromLatLng(lat, lng)
            .then(res => {
                const address = res.results[0].formatted_address;
                const addressArray = res.results[0].address_components;
                const country = this.getCountry(addressArray);
                const city = this.getCity(addressArray);
                
                if (country !== "India")
                    alert("Delivery service is not supported in your country.");
                else if (!city.startsWith("Bangalore") && !city.startsWith("Chennai") && !city.startsWith("Hyderabad")) {
                    alert("Currently, we are delivering only to Bangalore, Chennai and Hyderabad.");
                }

                localStorage.setItem("address", address);
                localStorage.setItem("city", city);
                localStorage.setItem("lat", lat);
                localStorage.setItem("lng", lng);

                this.setState({
                    address: (address) ? address : '',
                    city: (city) ? city : '',
                    lat: lat,
                    lng: lng,
                });
            }, error => {
                console.error(error);
            });
    }

    componentDidMount() {
        this._isMounted = true;

        //handle other page
        if (this.props.offSet !== "True")
            return;
        else {
            if (!localStorage.getItem("city")) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        this.getLocation(position.coords.latitude, position.coords.longitude);
                    });
                }
                else 
                    alert("Geolocation is not supported by this browser.");
            }
            else
                this.setState({ city: localStorage.getItem("city") });
        }
        
    }

    render() {
        return (
            <div className="main-location-style">
            {
                this.props.offSet === "True" ?
                (
                    <div className="main-location">
                        <img src="/assets/main/108943_media_512x512.png" alt="marker" id="main-marker"/>
                        <div>
                            <span id="main-location-text">Deliver to</span><br/>
                            <span id="main-location-city">{this.state.city}</span>
                            <span id="main-dropdown-style">
                                <button onClick={this.handleDropdown} id="main-dropdown-button">
                                    <img src="/assets/main/p_13.png" alt="drop-down" id="main-dropdown-icon"/>
                                </button>
                            </span>
                            <div id="main-autocomplete-style">
                            {
                                this.state.dropdownState ?
                                (   
                                    <PharmacyAutoComplete setLocation={this.handleGeoLocation} />
                                ) :
                                (
                                    null
                                )
                                
                            }
                            </div>
                        </div>
                    </div>
                ) :
                (
                    null
                )
            }
            <div id="main-shaded-layer" onClick={this.closeDropdown}></div>
            </div>
        );
    }
}

export default DashboardLoctaion;