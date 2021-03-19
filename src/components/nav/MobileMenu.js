import React from 'react'
import {
  MobileMenuStyle,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './Styles'

const MobileMenu = () => {
  return (
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
      <NavLink to='/sign-up'>
        Sign Up
      </NavLink>
      <NavLink to='/signin'>
        Sign In
      </NavLink>
    </MobileMenuStyle>
  )
}

export default MobileMenu
