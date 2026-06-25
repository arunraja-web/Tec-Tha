import { useState } from "react";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WhatWeDo from "../components/WhatWeDo";
import Internships from "../components/Internships";
import Careers from "../components/Careers";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import TrustedTechStack from "../components/TrustedTechStack";
export default function Home() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div id="home">
        <HeroSection darkMode={darkMode} />
      </div>

      <div id="WhatWeDo">
        <WhatWeDo />
      </div>

      <TrustedTechStack />

      <div id="internships">
        <Internships />
      </div>


      <div id="careers">
        <Careers />
      </div>

      <div id="about-us">
        <AboutUs />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </>
  );
}