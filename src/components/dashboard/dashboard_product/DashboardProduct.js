import React from 'react';

import './dashboardProduct.css';

/**
 * Receive product information from the database and display them.
 * @param {*} props 
 */
const DashboardProduct = (props) => {
    return (
        <div className="main-product">
            <div>
                <a target="_blank" rel="noopener noreferrer" href={props.product_link.prod_one_link}>
                    <button id="main-product1-button">
                        <img src={props.product_image.prod_one} alt="product_1" id="main-product1-logo"/>
                    </button>
                </a>
                <br/>
                <span id="main-product1-text">{props.product_name.prod_one_name}</span>
            </div>
            <div>
                <a target="_blank" rel="noopener noreferrer" href={props.product_link.prod_two_link}>
                    <button id="main-product2-button">
                        <img src={props.product_image.prod_two} alt="product_2" id="main-product2-logo"/>
                    </button>
                </a>
                <br/>
                <span id="main-product2-text">{props.product_name.prod_two_name}</span>
            </div>
            <div>
                <a target="_blank" rel="noopener noreferrer" href={props.product_link.prod_three_link}>
                    <button id="main-product3-button">
                        <img src={props.product_image.prod_three} alt="product_3" id="main-product3-logo"/>
                    </button>
                </a>
                <br/>
                <span id="main-product3-text">{props.product_name.prod_three_name}</span>
            </div>
            <div>
                <a target="_blank" rel="noopener noreferrer" href={props.product_link.prod_four_link}>
                    <button id="main-product4-button">
                        <img src={props.product_image.prod_four} alt="product_4" id="main-product4-logo"/>
                    </button>
                </a>
                <br/>
                <span id="main-product4-text">{props.product_name.prod_four_name}</span>
            </div>
        </div>
    );
}

export default DashboardProduct;