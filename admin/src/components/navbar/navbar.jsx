import React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import nav_profile from "../../assets/nav-profile.svg";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Kapada</p>
      </div>
      <img src={nav_profile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;
