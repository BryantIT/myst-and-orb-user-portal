import React, { useState, useEffect } from 'react'
// Styles
import {
  Container,
  WelcomeContainer,
  AboutContainer,
  Divider} from './Styles'
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
    <Container>
      <WelcomeContainer>
        {welcome}
      </WelcomeContainer>
      <Divider />
      <AboutContainer>
        {about}
      </AboutContainer>
    </Container>
  )
}

export default About
