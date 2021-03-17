import React, { Fragment } from 'react'
// Styles
import { BottomDivider, TopDivider } from './Styles'
import './style.css'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Splash = () => {
  return(
    <Fragment>
      <Helmet>
        <script src="https://cdnjs.﻿cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js"></script>﻿
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TimelineMax.min.js"></script>
        <script src="js/background-noise.js"></script>
        <script src="js/old-movie-style.js"></script>
      </Helmet>

      <main role="main" className="main-content" id="main-content">
        <TopDivider src='images/divider.svg' alt='Home' />
        <h1 className="main-title">Manes daemones spirituum, O mi.</h1>
      <div className="titleCont">
          <h1 className="main-title" id="main-title">
              "Through the dark,<br /><span style={{ paddingLeft: 100 }}>the most haunted,</span><br /><span style={{ paddingRight:110 }}>where all fear to tread,</span><br /><span style={{ paddingLeft: -20 }}>the Myst & Orb Society."</span>
          </h1>
      </div>
      <canvas id="noise" className="noise"></canvas>
    <div className="vignette"></div>
    <BottomDivider src='images/divider.svg' alt='Home' />
    <div>
      <NavLink to='/home' className="main-title" id="main-title">Enter</NavLink>
    </div>
  </main>
    </Fragment>
  )
}

export default Splash
