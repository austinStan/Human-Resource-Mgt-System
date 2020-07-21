import React from 'react';

const Footer = () => (
  <>
    <footer className="page-footer  green mx-auto ">
      <div className="footer-text">
        {`Copyright © 2014-${new Date().getFullYear()} Dag and Bragan`}
      </div>
    </footer>
  </>
);

export default Footer;
