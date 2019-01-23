import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/elements/Header/Header";
import Home from "./components/Home/Home";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
