import React, { Fragment, useState, useEffect } from 'react';
import { useAuth } from '../../auth/UserAuth';
import { useHistory } from 'react-router-dom'
// Components
import MobileMenu from './MobileMenu'
// Style
import { Success } from '../universal/AlertStyles'
import {
  Nav,
  Bars,
  NavMenu,
  NavBtn,
  HomeLogo,
  MobileMenuWrapper,
  NavBtnFauxLink,
  Main
} from './Styles';
import {
  NavLink,
  NavBtnLink} from '../universal/Styles'

const Navbar = () => {
  const history = useHistory()
  const { currentUser, signout } = useAuth()
  const [open, setOpen] = useState(false)
  const [successAlert, setSuccessAlert] = useState(false)
  console.log('SUCCESS', successAlert)

  const handleMobileMenu = () => {
    return (
      setOpen(!open)
    )
  }

  const handleSignout = async () => {
    try {
      await signout()
      setSuccessAlert(true)
      setTimeout(() => {
        history.push('/')
      }, 1000)
      setSuccessAlert(false)
    } catch {
      console.log('Error')
    }
  }

  useEffect(() => {
    setOpen(false)
  }, [])

  const Bar = () => {
    return (
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
            </NavLink> :
            <NavLink to='/dashboard'>
              Dashboard
            </NavLink>
          }
        </NavMenu>
        {
          currentUser ?
          <NavBtn>
            <NavBtnFauxLink onClick={handleSignout} >Sign Out</NavBtnFauxLink>
          </NavBtn>:
          <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
          </NavBtn>
        }
      </Nav>
    )
  }

  const SignoutSuccess = () => {
    return (
      <Success>You have been signed out</Success>
    )
  }

  return (
    <Fragment>
    {
      successAlert ?
          <SignoutSuccess /> : <Bar />
    }
    </Fragment>
  )
}

export default Navbar
