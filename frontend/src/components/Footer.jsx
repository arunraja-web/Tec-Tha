import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
        bg-white
        dark:bg-slate-950

        text-slate-900
        dark:text-white

        border-t
        border-slate-200
        dark:border-slate-800

        transition-all duration-500
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-14
                  h-14
                  rounded-xl
                  overflow-hidden
                  flex items-center justify-center
                "
              >
                <img
                  src="/TecTha Logo.jpeg"
                  alt="Tec Tha Logo"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              </div>

              <h2 className="text-3xl font-bold">
                Tec Tha
              </h2>

            </div>

            <p
              className="
                mt-6
                text-slate-600
                dark:text-slate-400
                leading-relaxed
              "
            >
              Building innovative digital solutions that empower
              businesses to grow and succeed through technology.
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-4">

              {[FaInstagram, FaLinkedinIn, FaGithub].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="
                      w-10 h-10
                      rounded-full

                      border
                      border-slate-300
                      dark:border-slate-700

                      flex items-center justify-center

                      hover:bg-blue-900
                      hover:text-white

                      dark:hover:bg-blue-500
                      dark:hover:text-black

                      transition-all duration-300
                      hover:scale-110
                    "
                  >
                    <Icon />
                  </a>
                )
              )}

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-2xl font-bold mb-6">
              Quick Links
            </h3>

            <div
              className="
                space-y-4

                text-slate-600
                dark:text-slate-400
              "
            >

              <a
                href="#home"
                className="
                  block
                  hover:text-blue-900
                  dark:hover:text-blue-400
                  transition
                "
              >
                Home
              </a>

              <a
                href="#WhatWeDo"
                className="
                  block
                  hover:text-blue-900
                  dark:hover:text-blue-400
                  transition
                "
              >
                What We Do
              </a>

              <a
                href="#internships"
                className="
                  block
                  hover:text-blue-900
                  dark:hover:text-blue-400
                  transition
                "
              >
                Internships
              </a>

              <a
                href="#careers"
                className="
                  block
                  hover:text-blue-900
                  dark:hover:text-blue-400
                  transition
                "
              >
                Careers
              </a>

              <a
                href="#about-us"
                className="
                  block
                  hover:text-blue-900
                  dark:hover:text-blue-400
                  transition
                "
              >
                About Us
              </a>

              <a
                href="#contact"
                className="
                  block
                  hover:text-blue-900
                  dark:hover:text-blue-400
                  transition
                "
              >
                Contact
              </a>

            </div>

          </div>

          {/* Services */}
          <div>

            <h3 className="text-2xl font-bold mb-6">
              Services
            </h3>

            <div
              className="
                space-y-4

                text-slate-600
                dark:text-slate-400
              "
            >

              <p>Web Development</p>
              <p>Mobile Development</p>
              <p>UI / UX Design</p>
              <p>Cloud Solutions</p>
              <p>AI Solutions</p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-2xl font-bold mb-6">
              Contact
            </h3>

            <div
              className="
                space-y-5

                text-slate-600
                dark:text-slate-400
              "
            >

              <p>📧 contact@tectha.com</p>

              <p>📞 +91 XXXXX XXXXX</p>

              <p>📍 Coimbatore, Tamil Nadu</p>

              <p>🕒 Mon - Sat | 9:00 AM - 6:00 PM</p>

            </div>

          </div>

        </div>

        {/* Bottom Section */}
        <div
          className="
            mt-16
            pt-8

            border-t
            border-slate-300
            dark:border-slate-800

            flex
            flex-col
            md:flex-row

            items-center
            justify-between
            gap-4
          "
        >

          <p
            className="
              text-slate-500
              dark:text-slate-500
            "
          >
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
              text-slate-600
              dark:text-slate-300

              hover:text-blue-900
              dark:hover:text-blue-400

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