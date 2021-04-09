import React, { Fragment, useState } from 'react'
// Components
import Benedict from './components/footer/Benedict'
import Landing from './components/landing/Landing'
import Profile from './components/users/Profile'
import Dashboard from './components/dashboard/Dashboard'
import { AuthProvider } from './auth/UserAuth'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import News from './components/news/News'
import Crew from './components/general/Crew'
import Tools from './components/users/Tools'
import UserProfileMini from './components/users/UserProfileMini'
import Ads from './components/ads/Ads'
import About from './components/general/About'
import Footer from './components/footer/Footer'
import Navbar from './components/nav/Navbar'
import './App.css';
import { Route, Switch } from 'react-router-dom'
// Styles
import { Main,
  UserInfo,
  AdsContainer,
  NewsContainer,
  Interior,
  UserTools } from './Styles';

const App = () => {

  return (
    <AuthProvider>
      <Fragment>
      <div className="App">
        <Navbar />
          <Main>
            <UserInfo>
              <UserProfileMini />
            </UserInfo>
            <AdsContainer>
              <Ads />
            </AdsContainer>
            <UserTools>
              <Tools />
            </UserTools>
            <NewsContainer>
              <News />
            </NewsContainer>
            <Switch>
              <Interior>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route exact path="/saved">
                <Benedict />
              </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/crew">
                  <Crew />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/signin">
                  <Signin />
                </Route>
                <Route exact path="/profile">
                  <Profile />
                </Route>
              </Interior>
            </Switch>
          </Main>
          <Footer />
        </div>
      </Fragment>
    </AuthProvider>
  );
}

console.log(
"%c-------------------------------------------",
"color:white;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold"
);
console.log(
"%cmade with ❤️ by TheCodeNinja",
"color:white;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold"
);
console.log(
"%cContact: brich@codeinja.life",
"color:white;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold"
);
console.log(
"%cHire Me Please!",
"color:white;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold"
);
console.log(
"%c-------------------------------------------",
"color:white;font-family:system-ui;font-size:1rem;-webkit-text-stroke: 1px black;font-weight:bold"
);

export default App;
