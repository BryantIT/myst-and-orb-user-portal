import React , { Fragment, useState, useEffect } from 'react'
// Components
import Guests from './components/guests/Guests'
import Splash from './components/splash/Splash'
import logo from './logo.svg'
import './App.css'
import { Route, Switch, withRouter  } from 'react-router-dom'
// Database
import { db } from './firebase'

function App() {

  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={Splash} />
        <Route exact path='/guests'>
          <Guests />
        </Route>
      </Switch>
    </Fragment>
  )
}

export default App;
