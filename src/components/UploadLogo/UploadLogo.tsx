import React, { useState } from "react";
import {CloudArrowUp } from 'react-bootstrap-icons';

const UploadLogo = () => {
    const [toogleValue, setToggleValue] = useState(false);
    return (
        <div className="upload-img mb-2">
          <div className="image-wraper">
              
              <img src="images/placeholder-image.jpg" className="logo-img" alt="Logo" />
          </div>
          <div className="file btn upload-btn">
            <CloudArrowUp color="royalblue" size={15} /> Upload Logo
            <input type="file" name="file"/>
          </div>
        </div>
    );
};

export default UploadLogo;