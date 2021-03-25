import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

export const Container = styled.div`
  margin: auto;
  width: 80%;
`

export const HeaderContainer = styled.div`
  text-align: center;
  padding-bottom: 10px;
  font-size: 50px;
`

export const InnerContainer = styled.div`
  padding-top: 12px;
  font-size: 20px;
`

export const Divider = styled.div`
  position: relative;
  margin-top: 5px;
  height: 1px;
  padding: 6px;
  &:before {
    content: "";
	  position: absolute;
	  top: 0;
	  left: 5%;
	  right: 5%;
	  width: 90%;
	  height: 10px;
	  background-image: linear-gradient(to right, transparent, #a1a1a1, transparent);
  }
`

export const MiniDivider = styled.div`
  position: relative;
  margin-top: 2px;
  height: 1px;
  padding: 3px;
  &:before {
    content: "";
	  position: absolute;
	  top: 0;
	  left: 5%;
	  right: 5%;
	  width: 90%;
	  height: 2px;
	  background-image: linear-gradient(to right, transparent, #a1a1a1, transparent);
  }
`

export const Break = styled.hr`
  clear: both;
  visibility: hidden;
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
    border: 1px solid #ddd;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  };
  &.active {
    color: #15cdfc;
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
