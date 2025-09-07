import React, { Fragment } from "react";
import HeadingHero from "./utils/HeadingHero";
import GridLine from "./utils/GridLine";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import logo from "./assets/logowhite.png";
import SocialIcon from "./components/SocialIcon";

const App = () => {
  return (
    <Fragment>
      <div className="min-h-screen bg-[#202020]">
        <div className="container mx-auto px-6 py-4  flex justify-center md:justify-start">
          <img src={logo} alt="" className="h-15" />
        </div>
        <Navbar />
        <SocialIcon />
        <Home />
        <About />
        <Skills />
        <Experience />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </Fragment>
  );
};

export default App;
