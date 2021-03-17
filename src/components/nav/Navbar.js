import React, { Fragment } from 'react'
// Components
import MobileMenu from './MobileMenu'
// Style
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './Styles'

const Navbar = () => {
  const handleMobileMenu = () => {
    return (
      <MobileMenu />
    )
  }

  return (
    <Fragment>
      <Nav>
        <NavLink to='/'>
          Home
        </NavLink>
        <Bars onClick={handleMobileMenu}/>
        <NavMenu>
          <NavLink to='/about' activeStyle>
            About
          </NavLink>
          <NavLink to='/services' activeStyle>
            Services
          </NavLink>
          <NavLink to='/contact-us' activeStyle>
            Contact Us
          </NavLink>
          <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </Fragment>
  )
}

export default Navbar
