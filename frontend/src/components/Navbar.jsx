import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "home",
        "WhatWeDo",
        "internships",
        "careers",
        "about-us",
        "contact",
      ];

     const scrollPosition = window.scrollY + window.innerHeight / 3;
     if (window.scrollY < 200) {
  setActiveSection("home");
  return;
}

      sections.forEach((section) => {
        const element = document.getElementById(section);

        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLink = (section) =>
    `relative text-slate-800 hover:text-black font-medium transition duration-300
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black
    after:transition-all after:duration-300
    ${
      activeSection === section
        ? "after:w-full text-black"
        : "after:w-0 hover:after:w-full"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg"
          : "bg-white/80 "
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-12 lg:px-20">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-black flex items-center justify-center transition-all duration-300 hover:rotate-6 hover:scale-110 cursor-pointer">
              <span className="text-white font-bold text-lg">
                #
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Tec Tha
            </h1>

          </div>

          {/* Navigation */}
          <nav className="hidden md:flex   items-center gap-14">

            <a href="#home" className={navLink("home")}>
              Home
            </a>

            <a href="#WhatWeDo" className={navLink("WhatWeDo")}>
              What We Do
            </a>

            <a href="#internships" className={navLink("internships")}>
              Internships
            </a>

            <a href="#careers" className={navLink("careers")}>
              Careers
            </a>

            <a href="#about-us" className={navLink("about-us")}>
              About Us
            </a>

            <a href="#contact" className={navLink("contact")}>
              Contact
            </a>

          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-6">

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="font-medium text-slate-800 hover:text-black transition duration-300"
                >
                  Login
                </Link>

                <button className="px-7 py-3 bg-black text-white rounded-md font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-slate-800">
                  Get Started
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>

                <span className="font-semibold text-slate-800">
                  {user.fullName}
                </span>

              </div>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}