import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'

export const HomeLogo = styled.img`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 50px;
`

export const Main = styled.div`
  width: 100vw;
`

export const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  position: sticky;
  top: 0;
  border-bottom: 3px solid #a1a1a1;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export const MobileMenuWrapper = styled.div`

`

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavBtnFauxLink = styled.button`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`

// Mobile Menu

export const MobileNav = styled.nav`
display: block;
  text-align: center;
  padding: 1.5rem;
  margin: 2rem auto;
  border-radius: 4px;
  width: 80%;
  background: #1888ff;
  text-decoration: none;
  color: #fff;
  font-size: 1.5rem;
  &:hover {
    background: #fff;
    color: #1888ff;
    transition: 250ms;
  }
`

export const MobileMenuStyle = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #000000;
  height: 50vh;
  text-align: left;
  padding: 2rem;
  top: 0;
  left: 0;
  padding-bottom: 2rem;
  transition: transform 0.3s ease-in-out;

  @media  {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s linear;

    @media {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      transition: all 0.2s ease-in-out;
      background: #fff;
      color: #010606;
    }
  }
`
