import React, { Fragment, useState, useEffect } from 'react'
// Components
import MobileMenu from './MobileMenu'
// Style
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  HomeLogo
} from './Styles'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const handleMobileMenu = () => {
    return (
      setOpen(!open)
    )
  }

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <Fragment>
      <Nav>
        <NavLink to='/'>
          <HomeLogo src='images/logo.png' alt='Home' />
        </NavLink>
        <Bars onClick={handleMobileMenu}/>
        {
          open ? <MobileMenu /> : null
        }
        <NavMenu>
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
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </Fragment>
  )
}

export default Navbar
