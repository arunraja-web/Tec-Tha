import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Contact() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await axios.post(
        "https://tec-tha-xuvu.onrender.com/api/contact/create",

        {
          subject: "Website Contact Request",

          message: `
Name: ${formData.name}

Email: ${formData.email}

Phone: ${formData.phone}

Message:
${formData.message}
          `,
        },

        {
          withCredentials: true,
        }
      );

      alert("✅ Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (error) {

      console.error(error);

      if (
        error.response?.status === 401
      ) {

        alert(
          "Please login first"
        );

        navigate("/login");

        return;

      }

      alert(
        "Failed to send message"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    

  <motion.section
  id="contact"
  className="
    py-20
    bg-white
    dark:bg-[#020817]
    transition-all duration-500
  "
>



      
      <div className="max-w-7xl mx-auto px-6">

        <div
  className="
    grid
    lg:grid-cols-[400px_1fr]
    rounded-3xl
    overflow-hidden
    shadow-2xl

    bg-white
    dark:bg-slate-900

    border
    border-slate-200
    dark:border-slate-800
  "
>
{/* Left Side */}
<motion.div
  initial={{ opacity: 0, x: -80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="
bg-gradient-to-br
from-blue-900
via-[#061B4E]
to-slate-900

text-white
p-12
flex flex-col justify-between
"
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
          connecttecthaofficial@gmail.com
        </p>
      </div>

   

      <div>
        <p className="text-sm uppercase tracking-widest text-slate-300">
          Office
        </p>

        <p className="mt-2 text-lg font-medium">
          Coimbatore, Tamil Nadu
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
  className="
bg-white
dark:bg-slate-900
p-12
"
>

 <h2
  className="
  text-5xl
  font-bold

  text-slate-900
  dark:text-white
"
>
  Let's Build Something Great
</h2>

  <p className="mt-4 text-slate-600">
    Fill out the form below and we'll get back to you soon.
  </p>

  <form
  onSubmit={handleSubmit}
  className="mt-10 space-y-6"
>
    <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Your Name"
  className="
w-full

bg-slate-50
dark:bg-slate-800

text-slate-900
dark:text-white

border
border-slate-300
dark:border-slate-700

rounded-xl
px-5 py-4

placeholder:text-slate-400

focus:outline-none
focus:border-blue-600

transition-all
"
/>

    <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email Address"
 className="
w-full

bg-slate-50
dark:bg-slate-800

text-slate-900
dark:text-white

border
border-slate-300
dark:border-slate-700

rounded-xl
px-5 py-4

placeholder:text-slate-400

focus:outline-none
focus:border-blue-600

transition-all
"
/>

    <input
  type="text"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="Phone Number"
  className="
w-full

bg-slate-50
dark:bg-slate-800

text-slate-900
dark:text-white

border
border-slate-300
dark:border-slate-700

rounded-xl
px-5 py-4

placeholder:text-slate-400

focus:outline-none
focus:border-blue-600

transition-all
"
/>

    <textarea
  rows="5"
  name="message"
  value={formData.message}
  onChange={handleChange}
  placeholder="Tell us about your project..."
  className="
w-full

bg-slate-50
dark:bg-slate-800

text-slate-900
dark:text-white

border
border-slate-300
dark:border-slate-700

rounded-xl
px-5 py-4

placeholder:text-slate-400

focus:outline-none
focus:border-blue-600

transition-all
"
/>

    <button
  type="submit"
  disabled={loading}
 className="
w-full

bg-blue-900
hover:bg-blue-800

text-white

py-4
rounded-xl

font-semibold

hover:-translate-y-1
hover:shadow-xl

transition-all duration-300

disabled:opacity-70
"
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Sending...
    </div>
  ) : (
    "Send Message"
  )}
</button>

  </form>

</motion.div>

        </div>

      </div>
      
    </motion.section>
    
  );
}