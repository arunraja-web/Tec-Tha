import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Tec Tha Info */}
          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-bold text-xl">
                #
              </div>

              <h2 className="text-3xl font-bold">
                Tec Tha
              </h2>

            </div>

            <p className="mt-6 text-slate-400 leading-relaxed">
              Building innovative digital solutions that empower
              businesses to grow and succeed through technology.
            </p>
            <div className="mt-8 flex items-center gap-4">

  <a
    href="#"
    className="
      w-10 h-10
      rounded-full
      border border-slate-600
      flex items-center justify-center
      hover:bg-white hover:text-slate-900
      transition-all duration-300
      hover:scale-110
    "
  >
    <FaInstagram />
  </a>

  <a
    href="#"
    className="
      w-10 h-10
      rounded-full
      border border-slate-600
      flex items-center justify-center
      hover:bg-white hover:text-slate-900
      transition-all duration-300
      hover:scale-110
    "
  >
    <FaLinkedinIn />
  </a>

  <a
    href="#"
    className="
      w-10 h-10
      rounded-full
      border border-slate-600
      flex items-center justify-center
      hover:bg-white hover:text-slate-900
      transition-all duration-300
      hover:scale-110
    "
  >
    <FaGithub />
  </a>

</div>

          </div>
          

          {/* Quick Links */}
          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Quick Links
            </h3>

            <div className="space-y-4 text-slate-400">

              <a href="#home" className="block hover:text-white transition">
                Home
              </a>

              <a href="#WhatWeDo" className="block hover:text-white transition">
                What We Do
              </a>

              <a href="#internships" className="block hover:text-white transition">
                Internships
              </a>

              <a href="#careers" className="block hover:text-white transition">
                Careers
              </a>

              <a href="#about-us" className="block hover:text-white transition">
                About Us
              </a>

              <a href="#contact" className="block hover:text-white transition">
                Contact
              </a>

            </div>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Services
            </h3>

            <div className="space-y-4 text-slate-400">

              <p>Web Development</p>

              <p>Mobile Development</p>

              <p>UI/UX Design</p>

              <p>Digital Marketing</p>

              <p>Consulting</p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-2xl font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-slate-400">

              <p>
                📧 contact@tectha.com
              </p>

              <p>
                📞 +91 XXXXX XXXXX
              </p>

              <p>
                📍 Thirunelveli, Tamil Nadu
              </p>

              <p>
                🕒 Mon - Sat | 9:00 AM - 6:00 PM
              </p>

            </div>

          </div>

        </div>
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4">

  <p className="text-slate-400">
    © 2026 Tec Tha. All Rights Reserved.
  </p>

  <button
    onClick={() =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
    className="
      text-slate-400
      hover:text-white
      transition
    "
  >
    ↑ Back to Top
  </button>

</div>
      </div>

    </footer>
  );
}