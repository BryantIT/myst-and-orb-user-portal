import React, { useState, useEffect } from 'react'
// Firebase
import { db } from '../../firebase'

const About = () => {
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

  return (
    <div>
    {
      aboutInfo
    }
    </div>
  )
}

export default About
