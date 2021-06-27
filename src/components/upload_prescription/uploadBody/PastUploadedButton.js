import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

/**
 * Redirect to the "my orders" page.
 * 
 * If the user not yet login to our web app, redirect to the login page instead.
 */
class PastUploadedButton extends Component {
    constructor(props) {
        super(props);

        this.handlePrescriptions = this.handlePrescriptions.bind(this);
    }

    handlePrescriptions() {
        if (localStorage.getItem('customer_id') === null) {
            alert("Please login first!")
            this.props.history.push('/login');
        }
        else
            this.props.history.push('/userOrders');
    }

    render() {
        return (
            <div>
                <button id="past-uploaded-button" onClick={this.handlePrescriptions}>
                    <div id="past-uploaded-text">
                        <span>Past Uploaded</span><br/>
                        <span>Prescription</span><br/>
                    </div>
                    <img src="/assets/Upload/Pinaka_Upload_Webapp_logo_2.png" alt="logo3" id="past-uploaded-img"/>
                </button>
            </div>
        );
    }
}

export default withRouter(PastUploadedButton);