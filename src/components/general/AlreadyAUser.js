import React from 'react'
import Loading from '../loading/Loading'
// Styles
import {
  Container,
  AboutContainer} from './Styles'

const AlreadyAUser = () => {
  return (
    <Container>
      <AboutContainer>
        It appears you are already a user.
      </AboutContainer>
    </Container>
  )
}

export default AlreadyAUser
