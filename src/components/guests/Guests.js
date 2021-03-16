import React from 'react'
import './style.css'

const Guests = ({ info }) => {

  console.log('Inside Guests', info[0])

  return(
    <div className='background' >
      {
        info.about
      }
    </div>
  )
}

export default Guests
