import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Contact from "./Contact";
import Footer from "./Footer";
import Technologies from "./Technologies";
import Projects from "./Projects";
// import '@splidejs/splide/dist/css/splide.min.css';


export default function Home() {
  return (
    <React.StrictMode>
      <div>
        <Navbar/>
        <Hero/>
        <Projects/>
        <Technologies/>
        <Contact/>
        <Footer/>
      </div>
    </React.StrictMode>
  );
}