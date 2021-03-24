import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)


  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const signin = (email, password) => {
    auth.setPersistence(auth.Auth.Persistence.SESSION)
    .then(() => {
      return auth.signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    })
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

  const value = {
    currentUser,
    signup,
    signin,
    signout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}