import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
  hover:text-blue-900
  transition-all
  duration-300
  ${
    activeSection === section
      ? "text-[#061B4E] after:absolute after:left-0 after:-bottom-2 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-blue-900 after:to-cyan-700"
      : ""
  }
`;
  return (
    <header
       className="
    fixed
    top-0
    left-0
    w-full
    z-50
    bg-white/90
    backdrop-blur-md
    border-b
    border-slate-200
    transition-all
    duration-300
  "
    >
      <div className="max-w-[1600px] mx-auto px-12 lg:px-20">

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
        text-3xl
        font-extrabold
        tracking-tight
        bg-gradient-to-r
        from-[#061B4E]
        via-[#061B4E]
        to-cyan-500
        bg-clip-text
        text-transparent
      "
    >
      Tec Tha
    </h1>

    <p
      className="
        text-xs
        text-slate-500
        tracking-widest
        uppercase
      "
    >
      Innovating The Future
    </p>

  </div>

</div>
 

          {/* Navigation */}
          <nav className="hidden md:flex   items-center gap-20">

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
{user ? (

  <div className="relative">

    <button
      onClick={() =>
        setShowDropdown(!showDropdown)
      }
      className="
        flex items-center gap-2
        px-5 py-3
        rounded-full
        bg-slate-700
        hover:bg-slate-200
        transition-all duration-300
      "
    >

      <div
        className="
          w-9 h-9
          rounded-full
          bg-indigo-600
          text-white
          flex items-center justify-center
          font-bold
        "
      >
        {user.fullName?.charAt(0)}
      </div>

      <span className="font-semibold">
        {user.fullName}
      </span>

      <ChevronDown size={18} />

    </button>

    {showDropdown && (

      <div
        className="
          absolute
          right-0
          mt-3
          w-64
          bg-white
          rounded-3xl
          shadow-2xl
          border border-slate-200
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
      bg-blue-900
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

          </div>

        </div>

      </div>
    </header>
  );
}