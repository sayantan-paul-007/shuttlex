import React from "react";
import "animate.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Capsules from "./pages/Capsules";
import Cores from "./pages/Cores";
import Navbar from "./components/Navbar";
import Dragons from "./pages/Dragons";
import Crew from "./pages/Crew";
import Launchpads from "./pages/Launchpads";
import Landpads from "./pages/Landpads";
import Payloads from "./pages/Payloads";
import Rockets from "./pages/Rockets";
import Ships from "./pages/Ships";
import Starlink from "./pages/Starlink";
import Launches from "./pages/Launches";
import Hero from "./components/Hero";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <>
      <Router>
        <Hero />
        <Navbar />
        <Routes>
          <Route path="/" element={<Capsules />} />
          <Route path="/cores" element={<Cores />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/dragons" element={<Dragons />} />
          <Route path="/landpads" element={<Landpads />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/launchpads" element={<Launchpads />} />
          <Route path="/payloads" element={<Payloads />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/ships" element={<Ships />} />
          <Route path="/starlink" element={<Starlink />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
