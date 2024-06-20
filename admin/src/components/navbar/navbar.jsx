import React from 'react'
import './navbar.css'
import nav_logo from '../assets/nav-logo.svg'
import nav_profile from '../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={nav_logo} alt='' className='nav-log' />
        <img src={nav_profile} alt=''className='nav-profile' />
    </div>
  )
}

export default Navbar
