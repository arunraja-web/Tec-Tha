import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

export default function Contact() {
  return (

    
    <motion.section
      id="contact"
      className="py-24 bg-slate-100"
    >


      
      <div className="max-w-7xl mx-auto px-6">

        <div
          className="
            grid
            lg:grid-cols-[400px_1fr]
            rounded-3xl
            overflow-hidden
            shadow-2xl
          "
        >
{/* Left Side */}
<motion.div
  initial={{ opacity: 0, x: -80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="bg-blue-900 hover:bg-blue-900 text-white p-12 flex flex-col justify-between"
>

  <div>

    <h2 className="text-4xl font-bold">
      Get in Touch
    </h2>

    <p className="mt-6 text-slate-200 leading-relaxed">
      Have a project idea or need assistance?
      Our team is here to help you turn
      your vision into reality.
    </p>

    <div className="mt-12 space-y-8">

      <div>
        <p className="text-sm uppercase tracking-widest text-slate-300">
          Email
        </p>

        <p className="mt-2 text-lg font-medium">
          contact@tectha.com
        </p>
      </div>

      <div>
        <p className="text-sm uppercase tracking-widest text-slate-300">
          Phone
        </p>

        <p className="mt-2 text-lg font-medium">
          +91 XXXXX XXXXX
        </p>
      </div>

      <div>
        <p className="text-sm uppercase tracking-widest text-slate-300">
          Office
        </p>

        <p className="mt-2 text-lg font-medium">
          Thirunelveli, Tamil Nadu
        </p>
      </div>

      <div>
        <p className="text-sm uppercase tracking-widest text-slate-300">
          Working Hours
        </p>

        <p className="mt-2 text-lg font-medium">
          Mon - Sat | 9:00 AM - 6:00 PM
        </p>
      </div>

    </div>

  </div>

  {/* Social Icons */}
  <div className="mt-16 flex items-center gap-5">

    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-12 h-12
        rounded-full
        border border-white/30
        flex items-center justify-center
        hover:bg-white hover:text-[#324896]
        transition-all duration-300
      "
    >
      <FaInstagram size={20} />
    </a>

    <a
      href="https://linkedin.com"
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-12 h-12
        rounded-full
        border border-white/30
        flex items-center justify-center
        hover:bg-white hover:text-[#324896]
        transition-all duration-300
      "
    >
      <FaLinkedinIn size={20} />
    </a>

    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-12 h-12
        rounded-full
        border border-white/30
        flex items-center justify-center
        hover:bg-white hover:text-[#324896]
        transition-all duration-300
      "
    >
      <FaGithub size={20} />
    </a>

  </div>

</motion.div>
          {/* Right Side */}
<motion.div
  initial={{ opacity: 0, x: 80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  viewport={{ once: true }}
  className="bg-white p-12"
>

  <h2 className="text-5xl font-bold text-slate-900">
    Let's Build Something Great
  </h2>

  <p className="mt-4 text-slate-600">
    Fill out the form below and we'll get back to you soon.
  </p>

  <form className="mt-10 space-y-6">

    <input
      type="text"
      placeholder="Your Name"
      className="
        w-full
        border
        border-slate-300
        rounded-xl
        px-5
        py-4
        focus:outline-none
        focus:border-[#324896]
      "
    />

    <input
      type="email"
      placeholder="Email Address"
      className="
        w-full
        border
        border-slate-300
        rounded-xl
        px-5
        py-4
        focus:outline-none
        focus:border-[#324896]
      "
    />

    <input
      type="text"
      placeholder="Phone Number"
      className="
        w-full
        border
        border-slate-300
        rounded-xl
        px-5
        py-4
        focus:outline-none
        focus:border-[#324896]
      "
    />

    <textarea
      rows="5"
      placeholder="Tell us about your project..."
      className="
        w-full
        border
        border-slate-300
        rounded-xl
        px-5
        py-4
        resize-none
        focus:outline-none
        focus:border-[#324896]
      "
    />

    <button
      type="submit"
      className="
        w-full
        bg-blue-900
        hover:bg-[#1F2937]
        text-white
        py-4
        rounded-xl
        font-semibold
        hover:bg-[#26376E]
        transition
      "
    >
      Send Message
    </button>

  </form>

</motion.div>

        </div>

      </div>
      
    </motion.section>
    
  );
}