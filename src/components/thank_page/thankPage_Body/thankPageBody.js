import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './thankPageBody.css';

/**
 * With a timer for redirecting the user to the dashboard after showing the thank words for seconds.
 */
class ThankPageBody extends Component {
    componentDidMount() {
        //push to the dashboard after 3 seconds
        this.id = setTimeout(() => {
            this.props.history.push("/");
        }, 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.id);
    }

    render() {
        return(
            <div id = "thank-body-background">
               <p id = "thank-body-success"> <img  className = "logo-success" src= "/assets/ThankPage/success.jpg" alt = "img" /> </p>
               <div className="thank-body-notice-words-style">
                    <p id = "thank-body-succ-words"> Order has been placed Successfully.</p>
               </div>
               <div className="thank-body-notice-words-style">
                    <p id = "thank-body-notice-words"> The Pharmacy is currently processing your order. We will notify you once your order status changes.</p>
               </div>
               <p id = "thank-body-pharm"> <img  className = "logo-pharm" src= "/assets/ThankPage/Pharmacy.png" alt = "img" /></p>
            </div>
        );
    }
}
export default withRouter(ThankPageBody);