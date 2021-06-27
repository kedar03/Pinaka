import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './dashboardHeader.css';
import DashboardLoctaion from './DashboardLocation';
import SideBar from './SideBar';

/**
 * The header used in most of the page.
 * It includes sidebar, pinaka logo, and user icon (links to my account page)
 * 
 * And only the header which is in the dashboard page will display the loaction icon (City Selection)
 */
class DashboardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };

        this.openNav = this.openNav.bind(this);
        this.handleUser = this.handleUser.bind(this);
    }

    openNav() {
        document.getElementById("main-Sidebar").style.width = "400px";
        document.getElementById("sb-openbtn-style").style.marginLeft = "250px";
        document.getElementById("main-sidebar-shaded-layer").style.display = "initial";
        document.getElementById("main-sidebar-shaded-layer").style.left = "400px";
    }

    handleUser() {
        console.log(localStorage.getItem('customer_id'));
        if (!localStorage.getItem('customer_id'))
            this.props.history.push('/login');
        else
            this.props.history.push('/my_account');
    }

    render() {
        return (
            <div id="main-header">
                <SideBar />
                <span id="sb-openbtn-style">
                    <button className="openbtn" onClick={this.openNav}>
                        <img src="/assets/main/p_14.png" alt="sidebar_icon" id="main-sidebar-image"/>
                    </button>
                </span>
                <DashboardLoctaion offSet={this.props.loc}/>
                <div id="main-pinaka-header-style">
                    <span id="main-pin-header">PIN</span>
                        <img src="/Pinaka_Upload_Webapp_logo_2.png" alt="logo1" id="main-pinaka-logo"/>
                    <span id="main-ka-header">KA</span>
                </div>
                <span id="main-user-logo">
                    <button id="main-user-logo-button" onClick={this.handleUser}>
                        <img src="/assets/main/p_12.png" alt="user_icon" id="main-user-logo-image"/>
                    </button>
                </span>
            </div>    
        );
    }
}

export default withRouter(DashboardHeader);