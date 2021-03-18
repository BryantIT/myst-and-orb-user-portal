import React, { Fragment } from 'react'
// Styles
import {
  BottomDivider,
  TopDivider,
  Main,
  Vignette,
  TitleContent,
  MainTitle,
  StyledLink } from './Styles'

const Splash = () => {
  return(
    <Fragment>
      <Main role='main' id='main-content'>
        <TopDivider src='images/divider.svg' alt='Home' />
        <MainTitle>Manes daemones spirituum, O mi.</MainTitle>
      <TitleContent>
          <MainTitle id="main-title">
              "Through the dark,<br /><span style={{ paddingLeft: 100 }}>the most haunted,</span><br /><span style={{ paddingRight:110 }}>where all fear to tread,</span><br /><span style={{ paddingLeft: 120 }}>the Myst & Orb Society."</span>
          </MainTitle>
      </TitleContent>
    <Vignette />
    <BottomDivider src='images/divider.svg' alt='Home' />
    <MainTitle>
      <StyledLink to='/home' id="main-title">Enter</StyledLink>
    </MainTitle>
      </Main>
    </Fragment>
  )
}

export default Splash
