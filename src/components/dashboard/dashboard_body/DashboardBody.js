import React, { Component } from 'react';
import axios from 'axios';

import './dashboardBody.css';

import DashboardAd from '../dashboard_banner/DashboardAd';
import DashboardUpload from '../dashboard_upload/DashboardUpload';
import DashboardProduct from '../dashboard_product/DashboardProduct';
import DashboardHelp from '../dashboard_help/DashboardHelp';
import { BASE_API_URL } from '../../utils/constant';

/**
 * Load the dashboard images and links from the database for convenience.
 * Pass these information corresponging to the pages they need.
 */
class DashboardBody extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            dashboard: [],
            banner: {
                banner_data: '',
                banner_link: '',
            },
            product_image: {
                prod_one: '',
                prod_two: '',
                prod_three: '',
                prod_four: '',

            },
            product_name: {
                prod_one_name: '',
                prod_two_name: '',
                prod_three_name: '',
                prod_four_name: '',
            },
            product_link: {
                prod_one_link: '',
                prod_two_link: '',
                prod_three_link: '',
                prod_four_link: '',
            }
        };

    }
    componentDidMount() {
        this._isMounted = true;
        //get those mutable images and links from database
        const secret_word = {
            secret_word: "pinaka_medpick"
        };
        axios.post(BASE_API_URL + '/users/dashboard', secret_word)
            .then(res => {
                if (this._isMounted) {
                    this.setState({
                        dashboard: res.data,
                        banner: {
                            banner_data: res.data.banner_data,
                            banner_link: res.data.banner_link,
                        },
                        product_image: {
                            prod_one: res.data.prod_one,
                            prod_two: res.data.prod_two,
                            prod_three: res.data.prod_three,
                            prod_four: res.data.prod_four,
                        },
                        product_name: {
                            prod_one_name: res.data.prod_one_name,
                            prod_two_name: res.data.prod_two_name,
                            prod_three_name: res.data.prod_three_name,
                            prod_four_name: res.data.prod_four_name,
                        },
                        product_link: {
                            prod_one_link: res.data.prod_one_link,
                            prod_two_link: res.data.prod_two_link,
                            prod_three_link: res.data.prod_three_link,
                            prod_four_link: res.data.prod_four_link,
                        }
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="main-body-style">
                <DashboardAd banner={this.state.banner}/>
                <DashboardUpload/>
                <DashboardProduct product_image={this.state.product_image} product_name={this.state.product_name} product_link={this.state.product_link}/>
                <DashboardHelp />
            </div>
        );
    }
}

export default DashboardBody;