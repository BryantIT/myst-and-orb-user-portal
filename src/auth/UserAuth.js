import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState()


  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const signout = () => {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if(currentUser) {
      const userData = db.collection('users').doc(currentUser.uid).onSnapshot((snapshot) => {
        setUserInfo(snapshot.data((info) => {
          return {
            id: info.id
          }
        }))
      })
      return userData
    }
  }, [currentUser])

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    userInfo
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
