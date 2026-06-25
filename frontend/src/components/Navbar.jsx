import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
import { ChevronDown, LayoutDashboard, LogOut ,Sun,
  Moon} from "lucide-react";


export default function Navbar({
  darkMode,
  setDarkMode
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
useEffect(() => {

  if (darkMode) {

    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");

  } else {

    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");

  }

}, [darkMode]);
  const [showDropdown, setShowDropdown] = useState(false);

const navigate = useNavigate();

const { user, logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();

    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

const handleDashboard = () => {
  setShowDropdown(false);

  if (user?.role === "ADMIN") {
    navigate("/admin-dashboard");
  } else {
    navigate("/dashboard");
  }
};

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

const navLink = (section) => `
  relative
  font-bold
  text-lg

  text-blue-900
  dark:text-white

  hover:text-blue-900
  dark:hover:text-cyan-400

  transition-all
  duration-300

  ${
    activeSection === section
      ? "text-[#061B4E] dark:text-cyan-400 after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-900 after:to-cyan-700"
      : ""
  }
`;
  return (
    <header
  className={`
    fixed
    top-0
    left-0
    w-full
    z-50
    

    transition-all
    duration-500

    ${
      scrolled
        ? `
          backdrop-blur-xl
          shadow-lg

          bg-white/80
          dark:bg-slate-950/80

          border-b
          border-slate-200
          dark:border-slate-800
        `
        : `
          bg-transparent
          border-transparent
        `
    }
  `}
>
      <div className="max-w-[1700px] mx-auto px-12 lg:px-20">

        <div className="flex items-center justify-between h-20">

       {/* Logo */}
<div className="flex items-center gap-4 cursor-pointer">

  <div
   className="
  w-14
  h-14
  object-contain
  transition-all
  duration-300
  hover:scale-110
  hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]
"
  >

    <img
      src="/Logo.png"
      alt="Tec Tha Logo"
      className="
        w-14
        h-14
        object-contain
        rounded-xl
      "
    />

  </div>

  <div>

    <h1
      className="
        text-xl sm:text-2xl lg:text-3xl
        font-extrabold
        text-blue-900
        
        bg-clip-text
      
        dark:text-white
      "
    >
      Tec Tha
    </h1>

    <p
  className="
    text-[10px] sm:text-xs
    text-slate-500
    dark:text-slate-400
    tracking-widest
    uppercase
  "
>
      Innovating The Future
    </p>

  </div>

</div>
 

          {/* Navigation */}
          <nav className="
hidden md:flex
items-center
gap-14
xl:gap-16

">

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
            <button

  onClick={() =>
    setDarkMode(!darkMode)
  }

  className="
    p-3
    rounded-full

    bg-slate-200
    dark:bg-slate-800

    text-slate-800
    dark:text-white

    hover:scale-110

    transition-all
    duration-300
  "

>

  {darkMode ? (

    <Sun size={22} />

  ) : (

    <Moon size={22} />

  )}

</button>
{user ? (

  <div className="relative">

    <button
      onClick={() =>
        setShowDropdown(!showDropdown)
      }
      className="
        flex items-center gap-2
        px-5 py-3
        
        bg-white/20
dark:bg-slate-800/60

backdrop-blur-md

hover:bg-white/30
dark:hover:bg-slate-700
        transition-all duration-300
      "
    >

      <div
        className="
          w-9 h-9
          rounded-full
          bg-blue-700
          text-white
          flex items-center justify-center
          font-bold
          dark:text-white
        "
      >
        {user.fullName?.charAt(0)}
      </div >

      <span className="font-semibold dark:text-white">
        {user.fullName}
      </span>

      <ChevronDown size={18}  />

    </button>

    {showDropdown && (

      <div
        className="
          absolute
          right-0
          mt-3
          w-64
          bg-white
dark:bg-slate-900
          rounded-3xl
          shadow-2xl
         border border-slate-200
dark:border-slate-700
          overflow-hidden
          z-50
        "
      >

        <button
          onClick={handleDashboard}
          className="
w-full
flex items-center gap-3
px-6 py-5

hover:bg-slate-50
dark:hover:bg-slate-800

text-slate-900
dark:text-white

transition-all
"
        >
          <LayoutDashboard size={20} />

          {user.role === "ADMIN"
            ? "Admin Dashboard"
            : "My Dashboard"}
        </button>

        <button
          onClick={handleLogout}
          className="
            w-full
            flex items-center gap-3
            px-6 py-5
            text-red-600
            hover:bg-red-50
            transition-all
          "
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    )}

  </div>

) : (

  <button
    onClick={() => navigate("/login")}
    className="
      px-6 py-3
      bg-blue-800
      text-slate-50
      font-medium
      hover:bg-[#061B4E]
      transition-all duration-300
      rounded-xl

    "
  >
    Login
  </button>
  

)}
  <button
    onClick={() => navigate("/signup")}
    className="
      text-blue-900
      dark:text-white
      font-semibold
      hover:text-cyan-500
      transition
    "
  >
    Sign Up
  </button>

          </div>

        </div>

      </div>
    </header>
  );
}