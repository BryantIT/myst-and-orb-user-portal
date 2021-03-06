import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const BottomDivider = styled.img`
  width: 100%;
`

export const TopDivider = styled.img`
  width: 100%;
`

export const StyledLink = styled(NavLink)`
  font-weight: 400;
  font-size: 40px;
  color: white;
  font-family: 'Times New Roman', serif;
  position: relative;
  line-height: 1.3;
`

export const Container = styled.div`
  margin: auto;
  width: 80%;
`

export const WelcomeContainer = styled.div`
  text-align: center;
  font-size: 30px;
`

export const SegmentMini = styled.div`
  padding-bottom: 15px;
  text-align: center;
`
