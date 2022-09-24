import React from "react";
import PropTypes from "prop-types";

import "./footer.css";

interface PropData {
  user: any;
  Primary: any;
}

export const Footer = (props: PropData) => (
  <footer>
    <div className="wrapper">
      <div className="main">
        <span>© copyright sawin.com 2022</span>
      </div>
      <div></div>
    </div>
  </footer>
);

Footer.propTypes = {
  Primary: PropTypes.string,
};
