import React , { Fragment } from 'react'
// Components
import Orbs from './components/orbs/Orbs'
import Guests from './components/guests/Guests'
import Splash from './components/splash/Splash'
import logo from './logo.svg'
import './App.css'
import { Route, Switch, withRouter  } from 'react-router-dom'

function App() {
  return (
    <Fragment>
      <Orbs />
      <Switch>
        <Route exact path='/' component={Splash} />
        <Route exact path='/guests' component={Guests} />
      </Switch>
    </Fragment>
  )
}

export default App;
