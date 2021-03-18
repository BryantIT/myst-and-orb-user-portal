import React, { Fragment, useEffect } from "react";
// Components
import Crew from './components/general/Crew'
import UserProfileMini from "./components/users/UserProfileMini";
import Ads from "./components/ads/Ads";
import About from "./components/general/About";
import Footer from "./components/footer/Footer";
import Splash from "./components/splash/Splash";
import Navbar from "./components/nav/Navbar";
import "./App.css";
import { Route, Switch } from "react-router-dom";
// Styles
import { Main, UserSide, AdSide, Interior } from "./Styles";

function App() {
  return (
    <Fragment>
    <Route exact path="/" component={Splash} />
      <div className="App">
        <Navbar />
        <Main>
          <UserSide>
            <UserProfileMini />
          </UserSide>
          <AdSide>
            <Ads />
          </AdSide>
          <Switch>
            <Interior>
              <Route exact path="/about">
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

export default App;
