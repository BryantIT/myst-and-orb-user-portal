import { NavLink as Link } from 'react-router-dom'
import styled from 'styled-components'

export const HomeLogo = styled.img`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 50px;
`

export const Main = styled.div`
  background: #000;
  height: 80px;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  position: sticky;
  bottom: 0;
  border-top: 3px solid #a1a1a1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 80px;
  gap: 1px 1px;
  grid-template-areas:
    "CopyWrite FooterInfo FooterInfo Social";
`

export const CopyWrite = styled.div`
  grid-area: CopyWrite;
  padding-top: 20px;
`

export const FooterInfo = styled.div`
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
