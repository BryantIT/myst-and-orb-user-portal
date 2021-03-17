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
  BarsContainer
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
          Home
        </NavLink>
        <Bars onClick={handleMobileMenu}/>
        {
          open ? <MobileMenu /> : null
        }
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
