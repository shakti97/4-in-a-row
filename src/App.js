import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import GamePanel from "./Components/GamePanel";
import ComingSoon from "./Components/ComingSoon";
import SplashScreen from "./Components/SplashScreen";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={SplashScreen}/> 
        <Route exact path="/game" component={GamePanel} />
        <Route exact path="/coming-soon" component={ComingSoon} />
      </Switch>
    </div>
  );
}

export default App;
