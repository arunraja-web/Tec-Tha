import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Layers3,
  PencilRuler,
  Cloud,
  Bot,
} from "lucide-react";


import {
  FaReact,
  FaMobileAlt,
  FaServer,
  FaPaintBrush,
  FaCloudUploadAlt,
} from "react-icons/fa";

import { SiNextdotjs, SiFirebase } from "react-icons/si";


export default function WhatWeDo() {
  const services = [
    {
      title: "Web Development",
      icon: Globe,
      description:
        "Modern, fast and scalable websites built with the latest technologies.",
    },
    {
      title: "Mobile App Development",
      icon: Smartphone,
      description:
        "High performance mobile apps for iOS and Android platforms.",
    },
    {
      title: "Full Stack Solutions",
      icon: Layers3,
      description:
        "End-to-end development with robust backend and beautiful frontend.",
    },
    {
      title: "UI / UX Design",
      icon: PencilRuler,
      description:
        "User-centered designs that create engaging experiences.",
    },
    {
      title: "Cloud Deployment",
      icon: Cloud,
      description:
        "Secure, reliable and scalable cloud solutions for businesses.",
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


  {/* Web Development */}
 {/* Professional Bento Grid */}
< div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  {/* Web Development */}
<motion.div
  whileHover={{ y: -10 }}
  className="
    lg:col-span-2
    lg:row-span-2

    rounded-[40px]
    overflow-hidden

    bg-gradient-to-br
    from-[#020B2D]
    via-[#041C63]
    to-[#0B2E8A]

    p-10
    text-white

    relative
    min-h-[520px]

    shadow-2xl
  "
>
  

  {/* Left Content */}
  <div className="relative z-10 max-w-[45%]">
    <h3 className="mt-8 text-5xl font-bold leading-tight">
      Web Development
    </h3>

    <div className="w-16 h-1 bg-blue-500 rounded-full mt-6"></div>

    <p className="mt-8 text-xl leading-10 text-slate-300">
      Modern, fast and scalable websites built with the latest technologies and best industry practices.
    </p>
  </div>

  {/* Right Image */}
  <img
    src="/web1.png"
    alt="Web Development"
    className="
      absolute
      bottom-0
      left-60

      w-[100%]
      h-[100%]

  
      pointer-events-none
      select-none
    "
  />
</motion.div>

  {/* Mobile App */}
  <motion.div
    whileHover={{ y: -10 }}
    className="
      lg:col-span-2

      rounded-[40px]
      bg-white/90
      dark:bg-slate-900/90

      border
      border-slate-200
      dark:border-slate-700

      p-8
      min-h-[250px]

      relative
      overflow-hidden
    "
  >
    

    <h3 className="mt-6 text-3xl font-bold text-black dark:text-white">
      Mobile App Development
    </h3>

    <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-sm">
      High performance mobile applications for iOS and Android platforms.
    </p>

    <img
      src="/Mobile.png"
      alt=""
      className="absolute right-12 bottom-12 w-[260px]"
    />
  </motion.div>

  {/* Full Stack */}
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="
      lg:col-span-2

      rounded-[40px]
      overflow-hidden

      bg-slate-950
      text-white

      p-8
      min-h-[250px]

      relative
    "
  >

    <h3 className="mt-6 text-3xl font-bold">
      Full Stack Solutions
    </h3>

    <p className="mt-4 text-slate-300 max-w-sm">
      End-to-end development with robust backend and beautiful frontend.
    </p>

    <img
      src="/fsd.png"
      alt=""
      className="absolute right-6 bottom-0 w-[300px]"
    />
  </motion.div>

  {/* UI UX */}
  <motion.div
    whileHover={{ y: -10 }}
    className="
      rounded-[40px]

      bg-white/90
      dark:bg-slate-900/90

      border
      border-slate-200
      dark:border-slate-700

      p-8

      relative
      overflow-hidden

      min-h-[320px]
    "
  >
  
    <h3 className="mt-6 text-3xl font-bold text-black dark:text-white">
      UI / UX Design
    </h3>

    <p className="mt-4 text-slate-600 dark:text-slate-400">
      User-centered designs that create engaging experiences.
    </p>

    <img
      src="/services/uiux.png"
      alt=""
      className="absolute right-0 bottom-0 w-[180px]"
    />
  </motion.div>

  {/* Cloud */}
  <motion.div
    whileHover={{ y: -10 }}
    className="
      rounded-[40px]

      bg-white/90
      dark:bg-slate-900/90

      border
      border-slate-200
      dark:border-slate-700

      p-8

      relative
      overflow-hidden

      min-h-[320px]
    "
  >
    

    <h3 className="mt-6 text-3xl font-bold text-black dark:text-white">
      Cloud Deployment
    </h3>

    <p className="mt-4 text-slate-600 dark:text-slate-400">
      Secure, reliable and scalable cloud solutions.
    </p>

    <img
      src="/services/cloud.png"
      alt=""
      className="absolute right-0 bottom-0 w-[180px]"
    />
  </motion.div>

  {/* Business Development */}
  <motion.div
    whileHover={{ y: -10 }}
    className="
      lg:col-span-2

      rounded-[40px]
   bg-slate-950
      text-white

    

      p-8

      relative
      overflow-hidden

      min-h-[250px]
    "
  >
   

    <h3 className="mt-6 text-3xl font-bold">
      Business Development
    </h3>

    <p className="mt-4 text-blue-100 max-w-md">
      Build strong client relationships
      and drive strategic business growth.
    </p>

    <img
      src="/business.png"
      alt=""
      className="absolute right-0 bottom-6 w-[330px]"
    />
  </motion.div>


</div>
      </div>
    </section>
   
  );
}