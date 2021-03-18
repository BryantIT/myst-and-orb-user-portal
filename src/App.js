import React , { Fragment, useEffect } from 'react'
// Components
import Home from './components/home/Home'
import Splash from './components/splash/Splash'
import Navbar from './components/nav/Navbar'
import './App.css'
import { Route, Switch } from 'react-router-dom'

function App() {

  return (
    <Fragment>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Splash} />
          <Fragment>
            <Navbar />
            <Route exact path='/home'>
              <Home />
            </Route>
          </Fragment>
        </Switch>
      </div>
    </Fragment>
  )
}

export default App;
