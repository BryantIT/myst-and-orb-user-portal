import React, { Fragment, useState, useEffect } from 'react'
// Style
import { Main } from './Styles'
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

  return(
    <Fragment>
      <Main>
        {
          aboutInfo
        }
      </Main>
    </Fragment>
  )
}

export default Guests
