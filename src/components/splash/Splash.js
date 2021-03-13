import React from 'react'
import './style.css'
import { NavLink } from 'react-router-dom'

const Splash = () => {
  return(
    <main role="main" className="main-content" id="main-content">
    <div className="titleCont">
        <h1 className="main-title" id="main-title">
            "Through the dark,<br /><span style={{ paddingLeft: 100 }}>the most haunted,</span><br /><span style={{ paddingRight:110 }}>where all fear to tread,</span><br /><span style={{ paddingLeft: -20 }}>the Myst & Orb Society."</span>
        </h1>
    </div>
    <canvas id="noise" className="noise"></canvas>
  <div className="vignette"></div>
  <div className='divider'></div>
  <div>
    <NavLink to='/members' className="main-title" id="main-title">Members</NavLink>
    |
    <NavLink to='/guests' className="main-title" id="main-title">Guests</NavLink>
  </div>
</main>
  )
}

export default Splash
