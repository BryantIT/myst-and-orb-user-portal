import React, { Fragment, useState, useEffect } from 'react'
// Components
import About from '../general/About'
import Ads from '../ads/Ads'
import UserProfileMini from '../users/UserProfileMini'
// Style
import {
  Main,
  UserSide,
  AdSide,
  Interior} from './Styles'

const Home = () => {

  return(
    <Fragment>
      <Main>
        <UserSide>
          <UserProfileMini />
        </UserSide>
        <AdSide>
          <Ads />
        </AdSide>
        <Interior>
          <About />
        </Interior>
      </Main>
    </Fragment>
  )
}

export default Home
