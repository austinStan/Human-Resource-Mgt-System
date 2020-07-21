// Header.js
import React, { Component } from 'react';

import Logo from './Logo';
import ProfilePic from './ProfilePic';

export default class Header extends Component {
  render() {
    return (
      <>
        <header>
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark green scrolling-navbar">
            <a className="navbar-brand" href="#"><strong><Logo/></strong></a>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto nav-flex-icons">
                <li className="nav-item text-white pt-2 ml-2">
                  SuperAdmin Logged In
                </li>
                <li className="nav-item avatar dropdown">
                  <ProfilePic />
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </>
    );
  }
}
