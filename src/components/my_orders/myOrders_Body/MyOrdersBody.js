import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './MyOrdersBody.css';

import MyOrdersInfo from '../myOrders_ Info/MyOrdersInfo';
import { BASE_API_URL } from '../../utils/constant';

/**
 * Load the user's orders from the database.
 * (If the user not yet submit any order, show "No Orders" alert instead 
 * and redirect to the dashboard.)
 */
class MyOrdersBody extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };

        this.showOrders = this.showOrders.bind(this);
    }

    showOrders() {
        return this.state.orders.map((data, i) => {
            return <MyOrdersInfo obj={data} key={i}/>
        });
    }


    componentDidMount() {
        this._isMounted = true;

        const user = {
            customer_id: localStorage.getItem('customer_id'),
        }; 

        //load the orders
        axios.post(BASE_API_URL + '/users/my_orders', user)
            .then(res => {
                if (this._isMounted) {
                    this.setState({
                        orders: res.data
                    }, () => {
                        if (res.data.length === 0) {
                            alert("No Orders");
                            this.props.history.push("/");
                        }   
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="my_orders_body_style">
                <div className="my_orders_subheader_style">
                    <span className="my_orders_subheader_text">Account Details</span>
                </div>
                <div className="my_orders_order_style">
                    <div className="my_orders_title_style">
                        <span id="my_orders_title_left">Order Status</span>
                        <span id="my_orders_title_right">Order Details</span>
                    </div>
                    {
                        this.showOrders()
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(MyOrdersBody);