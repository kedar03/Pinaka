import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../containers/dashboard/Dashboard';
import LoginPage from '../../containers/login_page/LoginPage';
import SignupPage from '../../containers/signup_page/SignupPage';
import ForgotPassword from '../../containers/Forgotpassword/ForgotPassword';
import UploadPrescription from '../../containers/upload_prescription/UploadPrescription';
import MyAccount from '../../containers/my_account/MyAccount';
import PharmacySelection from '../../components/pharmacy_selection/PharmacySelection';
import ConfirmPharmacy from '../../containers/confirm_pharmacy/ConfirmPharmacy';
import ThankPage from '../../containers/thank_page/ThankPage';
import MyOrders from '../../containers/my_orders/MyOrders';
import OrderView from '../../containers/order_view/OrderView';
import Medbox from '../../containers/medbox/Medbox';
import ContactUs from '../../containers/contact_us/ContactUs';




class ReactRouter extends Component {
    render() {
        return (
            <div>
                <main>
                    <Switch>
                        <Route path="/" component={Dashboard} exact />
                        <Route path="/login" component={LoginPage} exact />
                        <Route path="/signup" component={SignupPage} exact />
                        <Route path="/forgot_password" component={ForgotPassword} exact />
                        <Route path="/upload_prescription" component={UploadPrescription} exact />
                        <Route path="/pharmacy_location" component={PharmacySelection} exact />
                        <Route path="/confirm_pharmacy" component={ConfirmPharmacy} exact />
                        <Route path="/thanksForOrdering" component={ThankPage} exact />
                        <Route path="/my_account" component={MyAccount} exact />
                        <Route path="/userOrders" component={MyOrders} exact />
                        <Route path="/order_view" component={OrderView} exact />
                        <Route path="/medbox" component={Medbox} exact />
                        <Route path="/contact_us" component={ContactUs} exact />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default ReactRouter;