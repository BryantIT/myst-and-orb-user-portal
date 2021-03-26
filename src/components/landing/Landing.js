import React, { Fragment } from 'react'
// Styles
import {
  BottomDivider,
  TopDivider,
  Main,
  Vignette,
  TitleContent,
  MainTitle,
  StyledLink,
  Container,
  WelcomeContainer} from './Styles'

const Splash = () => {
  return(
    <Fragment>
      <Container>
      <TopDivider src='images/divider.svg' alt='Home' />
        <WelcomeContainer>Manes daemones spirituum, O mi.</WelcomeContainer>
          <WelcomeContainer id="main-title">
              "Through the dark,<br /><span style={{ paddingLeft: 100 }}>the most haunted,</span><br /><span style={{ paddingRight:110 }}>where all fear to tread,</span><br /><span style={{ paddingLeft: 120 }}>the Myst & Orb Society."</span>
          </WelcomeContainer>
    <BottomDivider src='images/divider.svg' alt='Home' />
    <WelcomeContainer>
      <StyledLink to='/about' id="main-title">Enter</StyledLink>
    </WelcomeContainer>
      </Container>
    </Fragment>
  )
}

export default Splash
