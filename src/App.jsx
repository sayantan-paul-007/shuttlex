import React from "react";
import "animate.css";
import { BrowserRouter as Router } from "react-router-dom";

import Hero from "./components/Hero";
import AppComponent from "./components/AppComponent";
function App() {
  return (
    <>
      <Router>
        <Hero />
        <AppComponent />
      </Router>
    </>
  );
}

export default App;
