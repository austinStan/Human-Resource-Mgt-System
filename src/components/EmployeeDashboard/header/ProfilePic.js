import React from 'react';

const ProfilePic = () => (
  <>
    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false">
      <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" className="rounded-circle z-depth-0"
        alt="avatar image"/>
    </a>
    <div className="dropdown-menu dropdown-menu-lg-right dropdown-success"
      aria-labelledby="navbarDropdownMenuLink-55">
      <a className="dropdown-item" href="#">Profile</a>
      <a className="dropdown-item" href="http://localhost:3000/#/auth/signin">SignOut</a>
    </div>
  </>
);

export default ProfilePic;
