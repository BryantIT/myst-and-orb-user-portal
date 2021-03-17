import React from 'react'
import './mobile.css'

const MobileMenu = () => {
  return (
    <label>
  <span className='menu'>
    <span className='hamburger'></span>
  </span>
  <ul>
    <li>
      <a href='#'>Home</a>
    </li>
    <li>
      <a href='#'>About</a>
    </li>
    <li>
      <a href='#'>Work</a>
    </li>
  </ul>
</label>
  )
}

export default MobileMenu
