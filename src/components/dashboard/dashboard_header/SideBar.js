import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { doSignOut } from '../../login_page/loginSocial/Firebase';

/**
 * Sidebar contains links of pages in our web app 
 * and the current username who login to our web app.
 */
class SideBar extends Component {
    constructor(props) {
        super(props);

        this.handleUserName = this.handleUserName.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.handleLoginStatus = this.handleLoginStatus.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleUserName() {
        if (!localStorage.getItem("customer_name"))
            return "Guest";
        else
            return localStorage.getItem("customer_name");
    }

    closeNav() {
        document.getElementById("main-Sidebar").style.width = "0";
        document.getElementById("sb-openbtn-style").style.marginLeft = "0";
        document.getElementById("main-sidebar-shaded-layer").style.display = "none";
    }

    handleLoginStatus() {
        if (!localStorage.getItem("customer_name")) 
            return "Log In";
        else
            return "Log Out";
    }

    handleSignOut() {
        doSignOut()
            .then(() => {
            })
            .catch(error => {
                console.error(error);
            });
        localStorage.clear();
    }

    render() {
        return (
            <div id="main-Sidebar" className="sidebar">
                <div id="sidebar-userName-style">
                    <img src="/assets/main/p_12.png" alt="user-icon" id="sidebar-user-icon"/>
                    <span id="sidebar-userName">{this.handleUserName()}</span>
                </div>
                <div className="sidebar-home-style">
                    <img src="/assets/main/sidebar/Pinaka_Webapp_Account_Page_source_2.png" alt="home-icon" id="sidebar-home-icon" />
                    <Link to="/" id="sidebar-home-link">Home</Link>
                    <button className="closebtn" onClick={this.closeNav}>&gt;</button>
                </div>
                <div className="sidebar-link-style">
                    <img src="/assets/main/sidebar/Pinaka_Webapp_Account_Page_source_3.png" alt="account-icon" id="sidebar-myAccount-icon" />
                    <Link to="/my_account" id="sidebar-myAccount-link">My Account</Link>
                </div>
                <div className="sidebar-link-style">
                    <img src="/assets/main/sidebar/Pinaka_Webapp_Account_Page_source_4.png" alt="orders-icon" id="sidebar-myOrders-icon" />
                    <Link to="/userOrders" id="sidebar-myOrders-link">My Orders</Link>
                </div>
                <div className="sidebar-link-style">
                    <img src="/assets/main/sidebar/Pinaka_Webapp_Account_Page_source_5.png" alt="medbox-icon" id="sidebar-medbox-icon" />
                    <Link to="/medbox" id="sidebar-medbox-link">Medbox</Link>
                </div>
                <div className="sidebar-link-style">
                    <img src="/assets/main/sidebar/Pinaka_Webapp_Account_Page_source_6.png" alt="contact-icon" id="sidebar-contactUs-icon" />
                    <Link to="/contact_us" id="sidebar-contactUs-link">Contact Us</Link>
                </div>
                <div className="sidebar-link-style">
                    <img src="/assets/main/sidebar/Pinaka_Webapp_Account_Page_source_8.png" alt="logout-icon" id="sidebar-logout-icon" />
                    <Link to="/login" onClick={this.handleSignOut} id="sidebar-logout-link">{this.handleLoginStatus()}</Link>
                </div>
                <div id="main-sidebar-shaded-layer" onClick={this.closeNav}></div>
            </div>
        );
    }
} 

export default SideBar;