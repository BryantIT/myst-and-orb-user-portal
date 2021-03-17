import React , { Fragment, useState, useEffect } from 'react'
// Components
import Guests from './components/guests/Guests'
import Splash from './components/splash/Splash'
import Navbar from './components/nav/Navbar'
import './App.css'
import { Route, Switch, withRouter  } from 'react-router-dom'
// Database
import { db } from './firebase'

function App() {

  return (
    <Fragment>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Splash} />
          <div>
            <Navbar />
            <Route exact path='/guests'>
              <Guests />
            </Route>
          </div>
        </Switch>
      </div>
    </Fragment>
  )
}

export default App;
