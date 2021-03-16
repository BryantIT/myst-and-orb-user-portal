import React from 'react'
import './style.css'

const Guests = ({ info }) => {

  console.log('Inside Guests', info[0].about)

  return(
    <div className='background' >
      {
        info[0].about
      }
    </div>
  )
}

export default Guests
