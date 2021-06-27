import React from 'react';

/**
 * Upload prescription from your device and pass it to "Uploadbody" component.
 * @param {*} props 
 */
const UploadButton = (props) => {
    const hiddenFileInput = React.useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = (e) => {
        const fileUploaded = e.target.files[0];
        props.handleFile(fileUploaded);
    };

    return (
        <div>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                id="upload-pres"
            />
            <button onClick={handleClick} id="gallery-button">
                Gallery
            </button>
            <img src="/assets/Upload/Pinaka_Upload_Webapp_logo_1.png" alt="logo2" id="gallery-img"/>
        </div>
    );
}

export default UploadButton;