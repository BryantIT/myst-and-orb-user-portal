import React from 'react'
import { useAuth } from '../../auth/UserAuth'

const Dashboard = () => {
  const { currentUser } = useAuth()
  return (
    !currentUser ? (
      <div>Not a Current User, please sign up</div>
    ) :
    <div>Hello Dashboard</div>
  )
}

export default Dashboard
