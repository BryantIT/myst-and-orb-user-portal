import React, { Fragment, useEffect } from 'react'
import { useAuth } from '../../auth/UserAuth'
import { useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
// Styles
import {
  BottomDivider,
  TopDivider,
  StyledLink,
  Container,
  WelcomeContainer,
  SegmentMini} from './Styles'

const Splash = () => {
  const { currentUser } = useAuth()
  const history = useHistory()

  useEffect(() => {
    if(currentUser) {
      history.push('/dashboard')
    }
  })
  return(
    <Fragment>
      <Container>
      <SegmentMini>
        {
          isMobile ? (
            '*Site better viewed on desktop*'
          ) : null
        }
      </SegmentMini>
        <WelcomeContainer>Manes daemones spirituum, O mi.</WelcomeContainer>
        <TopDivider src='images/divider.svg' alt='Home' />
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
