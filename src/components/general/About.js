import React, { useState, useEffect } from 'react'
// Firebase
import { db } from '../../firebase'

const About = () => {
  const [about, setAbout]= useState('')
  const [welcome, setWelcome] = useState('')
  const [info, setInfo] = useState([])

  const getInfo = () => {
    db.collection('information').onSnapshot((snapshot) => {
      setInfo(snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          welcome: doc.data().welcome,
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
      info.map(i => {
        setAbout(i.about)
        setWelcome(i.welcome)
      })
    }
  }, [info])

  return (
    <div>
    {
      about
    }
    </div>
  )
}

export default About
