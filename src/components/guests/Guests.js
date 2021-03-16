import React, { Fragment, useState, useEffect } from 'react'
import './style.css'
// Components
import Navbar from '../nav/Navbar'
// Firebase
import { db } from '../../firebase'

const Guests = () => {
  const [aboutInfo, setAboutInfo]= useState('')
  const [info, setInfo] = useState('')

  const getInfo = () => {
    db.collection('information').onSnapshot((snapshot) => {
      setInfo(snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          about: doc.data().about
        }
      }))
    })
  }

  useEffect(() => {
    getInfo()
  }, [])

  useEffect(() => {
    if(info){
      setAboutInfo(info[0].about)
    }
  }, [info])

  // console.log('Inside Guests', info[0].about)

  return(
    <Fragment>
      <Navbar />
      <div className='background' >

        {
          aboutInfo
        }
      </div>
    </Fragment>
  )
}

export default Guests
