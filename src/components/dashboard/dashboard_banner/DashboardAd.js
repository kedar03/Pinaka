import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import './dashboardAd.css';


/**
 * The banner of the dashboard with autoslider.
 * (Images and links are received from database and pass to this page by props)
 */
class DashboardAd extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="main_discount_info">
                <a target="_blank" rel="noopener noreferrer" href={this.props.banner.banner_data}>
                    <button className="main-banner-link"></button>
                </a>
                <Carousel 
                    showArrows={true} 
                    autoPlay={true} 
                    showIndicators={false} 
                    showStatus={false} 
                    infiniteLoop={true} 
                    interval={5000}>
                    <img className="main-banner-images" src={this.props.banner.banner_link} alt="banner-img" />
                    <img className="main-banner-images" src={this.props.banner.banner_link} alt="banner-img"/>
                </Carousel>
            </div>
        );
    }
}




export default DashboardAd;