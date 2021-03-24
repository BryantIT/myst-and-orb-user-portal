import React, { Fragment, useState, useEffect } from 'react';
import { useAuth } from '../../auth/UserAuth';
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
  HomeLogo,
  MobileMenuWrapper
} from './Styles';

const Navbar = () => {
  const { currentUser } = useAuth()
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
        <MobileMenuWrapper onClick={handleMobileMenu}>
          {
            open ? <MobileMenu /> : null
          }
        </MobileMenuWrapper>
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
          {
            !currentUser ?
            <NavLink to='/signup'>
              Sign Up
            </NavLink> : null
          }
        </NavMenu>
        {
          currentUser ?
          <NavBtn>
            <NavBtnLink to='/signout'>Sign Out</NavBtnLink>
          </NavBtn>:
          <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
          </NavBtn>          
        }
      </Nav>
    </Fragment>
  )
}

export default Navbar
