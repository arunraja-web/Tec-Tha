import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Layers3,
  PencilRuler,
  Cloud,
  Bot,
} from "lucide-react";
import {  useEffect } from "react";

import {
  FaReact,
  FaMobileAlt,
  FaServer,
  FaPaintBrush,
  FaCloudUploadAlt,
} from "react-icons/fa";

import { SiNextdotjs, SiFirebase } from "react-icons/si";
import { useState } from "react";
import {  AnimatePresence } from "framer-motion";

export default function WhatWeDo() {
{/* WHAT WE DO SERVICES SECTION */}


const services = [
  {
    id: "web",
    title: "Web Development",
    description:
       "We craft high-performance, scalable, and visually stunning web applications that empower businesses to establish a strong digital presence and deliver exceptional user experiences.",
    image: "/web2.jpg",
    tags: ["Web Apps", "E-Commerce", "CMS", "SEO"],
  },

  {
    id: "mobile",
    title: " Mobile App Development",
    description:
       "We develop innovative and user-centric mobile applications for iOS and Android, delivering seamless experiences that engage users and accelerate business growth.",
    image: "/mobile2.jpg",
    tags: ["Android", "iOS", "React Native", "Flutter"],
  },

  {
    id: "uiux",
    title: "UI/UX Designing",
    description:
       "We design intuitive, engaging, and user-focused digital experiences that combine creativity, usability, and innovation to create meaningful interactions.",
    image: "/ux.webp",
    tags: ["Wireframes", "Prototypes", "Research", "Design Systems"],
  },

  {
    id: "business",
    title: "Business Development",
    description:
        "We help businesses unlock new growth opportunities through strategic planning, market insights, and customer-focused solutions that drive long-term success.",
    image: "/business1.jpg",
    tags: ["Consulting", "Growth", "Branding", "Strategy"],
  },
];

const companies = [




   {
    name: "linkedin",
    lightLogo: "/logos/linkedin.png",
    darkLogo: "/logos/linkedin.png",
  },
   {
    name: "Microsoft",
    lightLogo: "/logos/Microsoft.png",
    darkLogo: "/logos/Microsoft.png",
  },
  {
    name: "Google",
    lightLogo: "/logos/google.png",
    darkLogo: "/logos/google.png",
       className: "w-50 h-26",
  },
    
     {
    name: "Netflix",
    lightLogo: "/logos/netflix.png",
    darkLogo: "/logos/netflix.png",
  },
  {
    name: "GitHub",
    lightLogo: "/logos/github.png",
    darkLogo: "/logos/github.jpeg",
        className: "w-40 h-26",
  },
  {
    name: "Oracle",
    lightLogo: "/logos/oracle.png",
    darkLogo: "/logos/oracle.png",
    className: "w-60 h-26",
  },
  {
    name: "Adobe",
    lightLogo: "/logos/adobe.png",
    darkLogo: "/logos/adobe1.webp",
    className: "w-45 h-20",
  },
    {
    name: "Amazon",
    lightLogo: "/logos/amazon.png",
    darkLogo: "/logos/am1.png",
  },
  
  {
    name: "Apple",
    lightLogo: "/logos/apple.png",
    darkLogo: "/logos/apple1.png",
    className: "w-40 h-24",
  },
  {
    name: "Claude",
    lightLogo: "/logos/Claude.png",
    darkLogo: "/logos/claude (2).png",
  },

 


  
    
];

const [activeTab, setActiveTab] = useState(services[0]);

useEffect(() => {
  const interval = setInterval(() => {

    setActiveTab((prev) => {

      const currentIndex = services.findIndex(
        (service) => service.id === prev.id
      );

      return services[
        (currentIndex + 1) % services.length
      ];

    });

  }, 5000);

  return () => clearInterval(interval);

}, []);

   
  return (
   <section
  id="WhatWeDo"
  className="
    relative
    py-6
    overflow-hidden

    transition-all
    duration-500
  "
>

  {/* Light Background */}
  <div
    className="
      absolute inset-0
      bg-cover bg-center
      dark:hidden
      -z-10
    "
    style={{
      backgroundImage: "url('/allbg.jpeg')",
    }}
  />

  {/* Dark Background */}
  <div
    className="
      absolute inset-0
      bg-cover bg-center
      hidden dark:block
      -z-10
    "
    style={{
      backgroundImage: "url('/darkall.jpeg')",
    }}
  />

  {/* Overlay */}
  <div
    className="
      absolute inset-0
    
      dark:bg-slate-950/80
      -z-10
    "
  />
  

   <div className="text-center mb-10">
 
  <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
    Trusted Partners Worldwide
  </h2>
</div>
    <div className="relative overflow-hidden mt-8 w-full">
  <div className="flex animate-scroll whitespace-nowrap">
    {[...companies, ...companies].map((company, index) => (
      <div
        key={index}
        className="
          mx-6
          min-w-[220px]
          h-24
          flex
          items-center
          justify-center
          hover:scale-105
          transition-all
          duration-500
        "
      >
        {/* Light Theme Logo */}
        <img
  src={company.lightLogo}
  alt={company.name}
  className={`${company.className} object-contain dark:hidden`}
/>

<img
  src={company.darkLogo}
  alt={company.name}
  className={`hidden dark:block ${company.className} object-contain`}
/>
      </div>
    ))}
  </div>
</div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-20">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-blue-800 dark:text-blue-800 font-bold tracking-[8px] uppercase">
            What We Do
          </span>

          <h2 className="mt-6 text-5xl lg:text-7xl font-bold leading-tight text-black dark:text-white">
            Solutions that drive
            <br />

            <span className="text-blue-800 dark:text-blue-800">
              real impact
            </span>
          </h2>

          <p className="mt-8 text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
            We design and build digital experiences, products and
            solutions that help businesses grow and create
            meaningful connections.
          </p>
        </motion.div>


 
<div className="mt-20">

  {/* Tabs */}

  <div className="flex flex-wrap justify-center gap-4">

    {services.map((service) => (
      <button
        key={service.id}
        onClick={() => setActiveTab(service)}
        className={`
          px-6
          py-3

          rounded-full

          font-semibold

          transition-all
          duration-300

          ${
            activeTab.id === service.id
              ? "bg-blue-800 text-white shadow-lg"
              : "bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300"
          }
        `}
      >
        {service.title}
      </button>
    ))}

  </div>

  {/* Content */}

  <div
    className="
      mt-10

   

      bg-white/80
      dark:bg-slate-900/80

      backdrop-blur-xl

      border
      border-slate-200
      dark:border-slate-700

      shadow-2xl

      overflow-hidden
    "
  >
    <AnimatePresence mode="wait">

      <motion.div
        key={activeTab.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}

        className="
          grid
          lg:grid-cols-2

          gap-6

          items-center

          p-12
        "
      >

        {/* Left Content */}

        <div>

          <h3
            className="
              text-4xl
              font-bold

              text-blue-900
              dark:text-white
            "
          >
            {activeTab.title}
          </h3>

          <p
            className="
              mt-6

              text-lg

              leading-9

              text-slate-800
              dark:text-slate-400
            "
          >
            {activeTab.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-8">

            {activeTab.tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-4
                  py-2

                  rounded-full

                  bg-slate-100
                  dark:bg-slate-800

                  text-sm

                  text-slate-700
                  dark:text-slate-300
                "
              >
                {tag}
              </span>
            ))}

          </div>

        </div>

        {/* Right Image */}

        <div className="h-[320px] overflow-hidden rounded-[24px]">

          <img
            src={activeTab.image}
            alt={activeTab.title}
            className="
              w-full
              h-full

              object-cover
            "
          />

        </div>

      </motion.div>

    </AnimatePresence>
  </div>

</div>  
</div>
    </section>
   
  );
}