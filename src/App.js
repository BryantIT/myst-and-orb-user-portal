import React , { Fragment, useState, useEffect } from 'react'
// Components
import Guests from './components/guests/Guests'
import Splash from './components/splash/Splash'
import logo from './logo.svg'
import './App.css'
import { Route, Switch, withRouter  } from 'react-router-dom'
// Database
import db from './firebase'

function App() {
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

  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={Splash} />
        <Route exact path='/guests' component={Guests} />
      </Switch>
    </Fragment>
  )
}

export default App;
