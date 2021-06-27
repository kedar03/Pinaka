import React from 'react';

import PharmacyButton from './PharmacyButton';

/**
 * Display pharmacies according to the condition we choose in "PharmacySelection" page. (pincode or geolocation)
 * @param {*} props 
 */
const PharmacyInfo = (props) => {
    return (
        <div className="ps-info">
            <div className="ps-pharmacyName">
                <img src="/assets/pharmacy/Pinaka_Webapp_Select_Pharmacy_Source_2.png" alt="pharmacyName"/>
                <span className="ps-pharmacyName-context">{props.obj.business_name}</span>
            </div>
            <div className="ps-pharmacyAddr">
                <img src="/assets/pharmacy/Pinaka_Webapp_Select_Pharmacy_Source_3.png" alt="pharmacyAddress"/>
                <span className="ps-pharmacyAddr-context">{props.obj.busin_addr}</span>
            </div>
            <div className="ps-pharmacyDistance">
                <img src="/assets/pharmacy/Pinaka_Webapp_Select_Pharmacy_Source_4.png" alt="pharmacyDistance"/>
                <div className="ps-pharmacyDistance-context">
                    <span>Distance: </span>
                    <span>{props.distance}</span>
                    <span> km</span>
                </div>
            </div>
            <PharmacyButton pharmacy={props.obj} upload_presc={props.upload_presc}/> 
        </div>
    );
}

export default PharmacyInfo;