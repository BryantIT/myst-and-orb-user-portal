import React, { useState, useEffect } from 'react';
// Components
import Loading from '../loading/Loading';
// Styles
import {
  Container,
  HeaderContainer,
  InnerContainer,
  Divider } from '../universal/Styles';
// Firebase
import { db } from '../../firebase';

const About = () => {
  const [about, setAbout]= useState('')
  const [welcome, setWelcome] = useState('')
  const [info, setInfo] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

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
        setIsLoaded(true)
        return i
      })
    }
  }, [info])

  return (
    isLoaded ?
    <Container>
      <HeaderContainer>
        {welcome}
      </HeaderContainer>
      <Divider />
      <InnerContainer>
        {about}
      </InnerContainer>
    </Container> : <Loading />
  )
}

export default About
