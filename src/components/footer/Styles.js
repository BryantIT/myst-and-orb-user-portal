import { NavLink as Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube} from 'react-icons/fa'
import styled from 'styled-components'

export const HomeLogo = styled.img`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 50px;
`

export const SocialWrapper = styled.div`
  background-color: #000000;
  display: flex;
  justify-content: center;
  a {
    padding: 3px;
    text-decoration: none !important;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    color: #ffffff;
    border: 2px solid #212121;
  }
  a:after {
    content: "";
    width: 100%;
    height: 100%;
    top: -100%;
    position: absolute;
    background-color: #ffffff;
    border-radius: 50%;
  }
  a:hover {
    color: #000000;
  }
  a:hover:after {
    top: 5%;
    transition: all 0.2s linear 0s;
  }
`

export const Facebook = styled(FaFacebookF)`
  font-size: 3vh;
  z-index: 3;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

export const Twitter = styled(FaTwitter)`
  font-size: 3vh;
  z-index: 3;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

export const Instagram = styled(FaInstagram)`
  font-size: 3vh;
  z-index: 3;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

export const Youtube = styled(FaYoutube)`
  font-size: 3vh;
  z-index: 3;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

export const LinkWrapper = styled.a`
  cursor: pointer;
  margin-right: 6px;
`

export const Main = styled.div`
  background: #000;
  posistion: relative;
  height: 80px;
  width: 100vw;
  font-size: 16px;
  justify-items: center;
  padding: 10px;
  /* z-index: 10; */
  border-top: 3px solid #a1a1a1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 80px;
  gap: 1px 1px;
  grid-template-areas:
    "CopyWrite FooterInfo FooterInfo Social";
    @media screen and (max-width: 768px) {
      padding-left: 6px;
    }
`

export const CopyWrite = styled.div`
  grid-area: CopyWrite;
  padding-top: 20px;
  padding-left: 10px;
`

export const FooterInfo = styled.div`
  cursor: pointer;
  grid-area: FooterInfo;
  padding-top: 20px;
`

export const Social = styled.div`
  grid-area: Social;
  padding-top: 20px;
`

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  };
  &.active {
    color: #15cdfc;
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

export const NavBtnLink = styled(Link)`
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

export const Symbol =  styled.div`
  overflow: visible;
`
