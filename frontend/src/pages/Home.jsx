import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WhatWeDo from "../components/WhatWeDo";
import Internships from "../components/Internships";
import Careers from "../components/Careers";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <div id="home">
        <HeroSection />
      </div>

      <div id="WhatWeDo">
        <WhatWeDo />
      </div>

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
    </>
  );
}