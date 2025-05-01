import React from "react";
import "animate.css";
import { BrowserRouter as Router } from "react-router-dom";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Hero from "./components/Hero";
import AppComponent from "./components/AppComponent";
function App() {
  return (
    <>
      <Router>
        {/* <Hero /> */}
        <AppComponent />
      </Router>
    </>
  );
}

export default App;
