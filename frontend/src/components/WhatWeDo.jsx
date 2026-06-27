import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Layers3,
  PencilRuler,
  Cloud,
  Bot,
} from "lucide-react";

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

  return (
   <section
  id="WhatWeDo"
  className="
    relative
    py-28
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
      

      <div className="relative z-10 max-w-[1600px] mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-blue-600 font-bold tracking-[8px] uppercase">
            What We Do
          </span>

          <h2 className="mt-6 text-5xl lg:text-7xl font-bold leading-tight text-black dark:text-white">
            Solutions that drive
            <br />

            <span className="text-blue-600">
              real impact.
            </span>
          </h2>

          <p className="mt-8 text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
            We design and build digital experiences, products and
            solutions that help businesses grow and create
            meaningful connections.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="
            mt-20
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-5
            gap-6
            max-w-[1800px]
            mx-auto
            px-6
">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="
                  group
                  bg-white/90
                  dark:bg-slate-900/90
                  backdrop-blur-xl

                  border
                  border-white/50
                  dark:border-slate-700

                  rounded-[36px]

                  p-10

                  min-h-[430px]

                  shadow-lg
                  hover:shadow-2xl

                  hover:-translate-y-4

                  transition-all
                  duration-500

                  flex
                  flex-col
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-24
                    h-24

                    rounded-[30px]

                    bg-blue-50
                    dark:bg-slate-800

                    flex
                    items-center
                    justify-center

                    mb-10

                    group-hover:scale-110

                    transition-all
                    duration-500
                  "
                >
                  <Icon
                    size={50}
                    className="text-blue-600"
                  />
                </div>

                {/* Title */}
                <h3 className="text-[2rem] leading-tight font-bold text-black dark:text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-8

                    text-lg

                    text-slate-600
                    dark:text-slate-400

                    leading-10

                    flex-grow
                  "
                >
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
   
  );
}