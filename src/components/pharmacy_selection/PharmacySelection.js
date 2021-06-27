import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { getDistance } from 'geolib';
import moment from 'moment-timezone';

import DashboardHeader from '../../components/dashboard/dashboard_header/DashboardHeader';
import PharmacyInfo from './PharmacyInfo';

import './pharmacy.css';
import PharmacyAutoComplete from './PharmacyAutoComplete';
import { BASE_API_URL } from '../utils/constant';

/**
 * Handle the state changes between pincode and geolocation.
 * Show the pharmacies according to your location or the pincode you entered in the textbox.
 */
class PharmacySelection extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            lat: '',
            lng: '',
            pharmacy: [], //get pharmacy information from database

            isSuccess: false, //after insert request pharmacy
            isbuttonPushed: false, //handle state of user geolocation

            isPinOn: false,

            isPharmacyExist: false,
            isUserExist: false,
        }

        this.handleGeoLocation = this.handleGeoLocation.bind(this);

        this.handleLocation = this.handleLocation.bind(this);
        this.getPharmacyInfoByPincode = this.getPharmacyInfoByPincode.bind(this);
        this.getPharmacyInfoByLocation = this.getPharmacyInfoByLocation.bind(this);
        this.handleOffLocation = this.handleOffLocation.bind(this);
        this.handleOffPin = this.handleOffPin.bind(this);

        this.showPharmacybyPin = this.showPharmacybyPin.bind(this);
        this.showPharmacybyLocation = this.showPharmacybyLocation.bind(this);
    }

    handleGeoLocation(location) {
        this.setState({
            isPinOn: true,
            lat: location.lat,
            lng: location.lng,
        });
    }

    handleLocation() {
        this.handleOffPin();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                if (this._isMounted) {
                    this.setState({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        isbuttonPushed: true,
                    }, () => {
                        const time_zone = moment().tz('Asia/Kolkata');
                        const date = time_zone.format('YYYY-MM-DD HH:mm:ss')

                        const customer = {
                            customer_name: localStorage.getItem('customer_name'),
                            customer_email: localStorage.getItem('customer_email'),
                            customer_phone: localStorage.getItem('customer_phone'),
                            glatitude: this.state.lat,
                            glongitude: this.state.lng,
                            request_for: "Pharmacy",
                            date: date,
                        };
                        //insert request to the database
                        axios.post(BASE_API_URL + '/users/request_pharmacy_by_your_location', customer)
                            .then(res => {
                                this.setState(res.data, () => {
                                    if (this.state.isSuccess)
                                        alert("request received");
                                })
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    });

                }
            });
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    handleOffLocation() {
        this.setState({
            isbuttonPushed: false,
            isUserExist: false,
        });
    }

    handleOffPin() {
        this.setState({
            isPharmacyExist: false, //clear the former query
        });
    }

    getPharmacyInfoByPincode() {
        axios.post(BASE_API_URL + '/users/pharmacy')
            .then(res => {
                if (this._isMounted) {
                    this.handleOffLocation();
                    this.setState({
                        isPharmacyExist: true,
                        pharmacy: res.data,
                        isPinOn: false,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getPharmacyInfoByLocation() {
        axios.post(BASE_API_URL + '/users/pharmacy')
            .then(res => {
                if (this._isMounted) {
                    this.setState({
                        isUserExist: true,
                        isSuccess: false,
                        pharmacy: res.data 
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    showPharmacybyPin() {
        if (this.state.isPharmacyExist) {
            return this.state.pharmacy
                .filter((data, i) => getDistance(
                    { latitude: data.location_latitude, longitude: data.location_longitude },
                    { latitude: this.state.lat, longitude: this.state.lng }) / 1000 < 0.3 //5000(km) for testing, change it to 0.3(km).
                )
                .sort((a, b) => 
                    getDistance(
                    { latitude: a.location_latitude, longitude: a.location_longitude },
                    { latitude: this.state.lat, longitude: this.state.lng }) - 
                    getDistance(
                    { latitude: b.location_latitude, longitude: b.location_longitude },
                    { latitude: this.state.lat, longitude: this.state.lng })
                )
                .map((data, i) => {
                    let distance = getDistance(
                        { latitude: data.location_latitude, longitude: data.location_longitude },
                        { latitude: this.state.lat, longitude: this.state.lng }) / 1000;
                    distance = parseFloat(distance.toFixed(2));
                    return <PharmacyInfo obj={data} key={i} distance={distance} upload_presc={this.props.location.upload_presc}/>
                });
        }
        else
            return null;
    }

    showPharmacybyLocation() {
        if (this.state.isUserExist) {
            //sort by distance
            return this.state.pharmacy
                .filter((data, i) => getDistance(
                    { latitude: data.location_latitude, longitude: data.location_longitude },
                    { latitude: this.state.lat, longitude: this.state.lng }) / 1000 < 0.3 //5000(km) for testing, change it to 0.3(km).
                )
                .sort((a, b) => 
                    getDistance(
                    { latitude: a.location_latitude, longitude: a.location_longitude },
                    { latitude: this.state.lat, longitude: this.state.lng }) - 
                    getDistance(
                    { latitude: b.location_latitude, longitude: b.location_longitude },
                    { latitude: this.state.lat, longitude: this.state.lng })
                )
                .map((data, i) => {
                    let distance = getDistance(
                        { latitude: data.location_latitude, longitude: data.location_longitude },
                        { latitude: this.state.lat, longitude: this.state.lng }) / 1000;
                    distance = parseFloat(distance.toFixed(2));
                    return <PharmacyInfo obj={data} key={i} distance={distance} upload_presc={this.props.location.upload_presc}/>
                });
        }
        else
            return null;
    }
    
    
    componentDidMount() {
        if (!localStorage.getItem("customer_id")) {
            alert("Please login first.");
            this.props.history.push("/login");
        }
        else if (!this.props.location.upload_presc) {
            this.props.history.push("/");
        }
           

        this._isMounted = true;

        this.handleLocation();
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="ps-style">
                <Helmet>
                    <style>{'body { background-color: #e7e5e5; }'}</style>
                </Helmet>
                <DashboardHeader />
                <PharmacyAutoComplete  setLocation={this.handleGeoLocation}/>
                {
                    this.state.isbuttonPushed ? 
                    (
                        <div className="ps-location-style">
                            <button onClick={this.handleOffLocation} className="ps-location-button">
                                <img src="/assets/pharmacy/Pinaka_Webapp_Select_Pharmacy_Source_3.png" alt="location_detect_button" className="ps-location-icon"/>
                            </button>
                            <span className="ps-location-label-closed">Location Detected</span>
                        </div>
                    ) : 
                    (
                        <div className="ps-location-style">
                            <button onClick={this.handleLocation} className="ps-location-button">
                                <img src="/assets/pharmacy/Pinaka_Webapp_Select_Pharmacy_Source_1.png" alt="location_detect_button" className="ps-location-icon"/>
                            </button>
                            <span className="ps-location-label-open">Location Detected</span>
                        </div>
                    )
                }
                {
                    this.state.isPinOn ? 
                    (
                        this.getPharmacyInfoByPincode()
                    ) :
                    (
                        this.showPharmacybyPin()
                    )
                }
                {
                    this.state.isSuccess ?
                    (
                        this.getPharmacyInfoByLocation()
                    ) :
                    (
                        this.showPharmacybyLocation()
                    )
                }
            </div>
        );
        
    }
}

export default PharmacySelection;