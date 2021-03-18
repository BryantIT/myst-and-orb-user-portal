import React, { Fragment, useEffect } from "react";
// Components
import Crew from './components/general/Crew'
import UserProfileMini from "./components/users/UserProfileMini";
import Ads from "./components/ads/Ads";
import About from "./components/general/About";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Splash from "./components/splash/Splash";
import Navbar from "./components/nav/Navbar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
// Styles
import { Main, UserSide, AdSide, Interior } from "./Styles";

function App() {
  return (
    <Fragment>
      <div className="App">
        <Navbar />
        <Main>
          <Route exact path="/" component={Splash} />
          <UserSide>
            <UserProfileMini />
          </UserSide>
          <AdSide>
            <Ads />
          </AdSide>
          <Switch>
            <Interior>
              <Route exact path="/home">
                <About />
              </Route>
              <Route exact path="/crew">
                <Crew />
              </Route>
            </Interior>
          </Switch>
        </Main>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
