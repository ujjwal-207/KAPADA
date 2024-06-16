import React, { Component } from 'react'
import './navbar.css';
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
export class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        <div>
          <img src={logo} alt='logo' />
          <p>SHOPPER</p>
        </div>
        
      </div>
    )
  }
}

export default Navbar

