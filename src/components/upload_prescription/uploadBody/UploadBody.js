import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FileResizer from 'react-image-file-resizer';

import './UploadBody.css';

import UploadButton from './UploadButton';
import PastUploadedButton from './PastUploadedButton';

/**
 * Include all the body of upload page.
 */
class UploadBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "/assets/Upload/Pinaka_Upload_Webapp_logo_3.png",
            upload_presc: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePharmSelect = this.handlePharmSelect.bind(this);
    }

    handleChange(e) {
        FileResizer.imageFileResizer(
            e,
            480,
            480,
            "JPEG",
            70,
            0,
            (uri) => {
                this.setState({
                    file: URL.createObjectURL(e),
                    upload_presc: uri,
                }, () => {
                    sessionStorage.setItem("presc_image", this.state.file);
                });
            },
            "blob"
        );

    }

    
    //ask for pres to continue to the next step
    handlePharmSelect() {
        if (this.state.upload_presc === null)
            alert("please upload images of your prescription");
        else 
            this.props.history.push({
                pathname: '/pharmacy_location',
                upload_presc: this.state.upload_presc,
            });
            
    }
    

    render() {
        return (
            <div>
                <div id="up-body">
                    <img src={this.state.file} alt="prescirption_img" id="pres-img"/><br/>
                    <span id="up-prompt">Please upload images of your prescription</span>
                </div>
                <div id="up-buttons">
                    <UploadButton handleFile={this.handleChange}/>
                    <button onClick={this.handlePharmSelect} id="continue-button" >Continue</button>
                    <PastUploadedButton upload_presc={this.state.upload_presc}/>
                </div>
            </div>
        );
    }
}

export default withRouter(UploadBody);