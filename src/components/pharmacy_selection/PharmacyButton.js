import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

/**
 * After selecting the pharmacy, the order information will be sent to
 * the "confirm pharmacy" page as props.
 */
class PharmacyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            isSuccess: false,
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect() {
        //current order
        const order = {
            customer: {
                customer_id: localStorage.getItem('customer_id'),
                token_no: localStorage.getItem('customer_token')
            },
            pharmacy: {
                pharm_name: this.props.pharmacy.business_name,
                pharm_email: this.props.pharmacy.user_mail,
                pharm_phone: this.props.pharmacy.busin_phone,
                pharm_addr: this.props.pharmacy.busin_addr
            },
            presc: this.props.upload_presc
        };

        this.props.history.push({
            pathname: '/confirm_pharmacy',
            order: order
        });
        
    }

    render() {
        return (
            <div className="ps-selectButton">
                <button onClick={this.handleSelect} className="ps-selectButton-style">Select</button>
            </div>
        );
    }
}

export default withRouter(PharmacyButton);