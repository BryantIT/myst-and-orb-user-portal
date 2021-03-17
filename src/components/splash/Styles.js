import styled, { keyframes } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const BottomDivider = styled.img`
  width: 50%;
`

export const TopDivider = styled.img`
  width: 50%;
  transform: scaleY(-1)
`
const grainAnimation = keyframes`
0%, 100% { transform:translate(0, 0) }
10% { transform:translate(-5%, -10%) }
20% { transform:translate(-15%, 5%) }
30% { transform:translate(7%, -25%) }
40% { transform:translate(-5%, 25%) }
50% { transform:translate(-15%, 10%) }
60% { transform:translate(15%, 0%) }
70% { transform:translate(0%, 15%) }
80% { transform:translate(3%, 35%) }
90% { transform:translate(-10%, 10%) }
`

export const Main = styled.main`
  overflow:hidden;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;

  height: 100vh;

  background: linear-gradient(to right, rgba(36,31,31,1) 0%, rgba(36,31,31,1) 32%, rgba(74,71,70,1) 100%);
  color: #fff;
  text-align: center;
  &:after {
  animation: ${grainAnimation} 20s steps(10) infinite;
  background-image: url('images/vintage_speckles.png');
  content: "";
  height: 300%;
  left: -50%;
  opacity: 0.5;
  position: fixed;
  top: -100%;
  width: 300%;
  }
`

const vignetteAnimation = keyframes`
  0%,  100%{ opacity: 1; }
  50% { opacity: 0.7; }
`

export const Vignette = styled.div`
  position:absolute;
  width:100%; height:100%;
  box-shadow:inset 0px 0px 150px 20px black;
  mix-blend-mode: multiply;
  -webkit-animation: ${vignetteAnimation} 5s infinite; /* Safari 4+ */
  -moz-animation:    ${vignetteAnimation} 5s infinite; /* Fx 5+ */
  -o-animation:      ${vignetteAnimation} 5s infinite; /* Opera 12+ */
  animation:         ${vignetteAnimation} 5s infinite; /* IE 10+, Fx 29+ */
`

export const Grain = styled.div`
  position:relative;
`

export const TitleContent = styled.div`
  position:relative;
`

export const MainTitle = styled.h1`
  padding: .3em 1em .25em;
  font-weight: 400;
  font-size: 40px;
  color: white;
  font-family: 'Times New Roman', serif;
  position:relative;
  line-height:1.3;
`

export const StyledLink = styled(NavLink)`
  padding: .3em 1em .25em;
  font-weight: 400;
  font-size: 40px;
  color: white;
  font-family: 'Times New Roman', serif;
  position:relative;
  line-height:1.3;
`
