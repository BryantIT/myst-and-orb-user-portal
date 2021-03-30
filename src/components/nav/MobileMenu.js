import React, { Fragment } from 'react'
// Components
import {
  MobileMenuStyle
} from './Styles';
import { NavLink } from '../universal/Styles'

const MobileMenu = () => {


  return (
    <Fragment>
      <MobileMenuStyle>
        <NavLink to='/about'>
          About
        </NavLink>
        <NavLink to='/crew'>
          Crew
        </NavLink>
        <NavLink to='/services'>
          Services
        </NavLink>
        <NavLink to='/events'>
          Events
        </NavLink>
        <NavLink to='/contact-us'>
          Contact Us
        </NavLink>
        <NavLink to='/signup'>
          Sign Up
        </NavLink>
        <NavLink to='/signin'>
          Sign In
        </NavLink>
      </MobileMenuStyle>
    </Fragment>
  )
}

export default MobileMenu
