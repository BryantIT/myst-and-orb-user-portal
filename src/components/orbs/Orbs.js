import React from 'react'
import Particles from 'react-particles-js'
import orbsConfig from '../../orbs/orbsConfig'

const Orbs = () => {
  return(
    <div style={{ position: 'absolute'}}>
        <Particles height="100vh" width="100vw" params={orbsConfig} />
      </div>
  )
}

export default Orbs
