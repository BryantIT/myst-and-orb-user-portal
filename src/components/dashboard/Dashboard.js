import React from 'react'
import { useAuth } from '../../auth/UserAuth'
// Styles
import { DashboardLink } from './Styles'
import {
  Container,
  HeaderContainer,
  InnerContainer,
  Divider } from '../universal/Styles'

const Dashboard = () => {
  const { currentUser, userInfo } = useAuth()

  const ProfileComplete = () => {
    return (
      !currentUser ? (
        <div>Not a Current User, please sign up</div>
      ) :
      <Container>
        <HeaderContainer>
          Hello {userInfo.firstName}
        </HeaderContainer>
        <Divider />
        <InnerContainer>
          Hello Inner Container
        </InnerContainer>
      </Container>
    )
  }

  const ProfileIncomplete = () => {
    return (
      !userInfo ? (
        <Container>
          <HeaderContainer>
            You haven't completed your profile
          </HeaderContainer>
          <Divider />
          <HeaderContainer>
            <DashboardLink to='/signup'>{'> Complete Profile'}</DashboardLink>
          </HeaderContainer>
          <Divider />
        </Container>
      ) : null
    )
  }

  return (
    !currentUser ? (
      <ProfileComplete />
    ) :
    <ProfileIncomplete />
  )
}

export default Dashboard
