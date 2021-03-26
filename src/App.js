import React, { Fragment, useEffect } from 'react'
// Components
import Profile from './components/users/Profile'
import Dashboard from './components/dashboard/Dashboard'
import { AuthProvider } from './auth/UserAuth'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import News from './components/news/News'
import Crew from './components/general/Crew'
import UserProfileMini from './components/users/UserProfileMini'
import UserProfileImage from './components/users/UserProfileImage'
import Ads from './components/ads/Ads'
import About from './components/general/About'
import Footer from './components/footer/Footer'
import Splash from './components/splash/Splash'
import Navbar from './components/nav/Navbar'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { useAuth } from './auth/UserAuth'
//Database
import { userInfo } from './database/Database'
// Styles
import { Main,
  UserInfo,
  UserImage,
  AdsContainer,
  NewsContainer,
  Interior } from './Styles';

function App() {

  return (
    <AuthProvider>
      <Fragment>
      <div className="App">
        <Navbar />
          <Main>
            <UserInfo>
              <UserProfileImage />
            </UserInfo>
            <AdsContainer>
              <Ads />
            </AdsContainer>
            <UserImage>
              <UserProfileMini />
            </UserImage>
            <NewsContainer>
              <News />
            </NewsContainer>
            <Switch>
              <Interior>
              <Route exact path="/" component={Splash} />
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
