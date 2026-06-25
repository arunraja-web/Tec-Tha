import { motion } from "framer-motion";

export default function WhatWeDo() {
  const services = [
    {
      image: "/service1.png",
      title: "Web Development",
      description:
        "Modern, responsive and scalable websites tailored for startups and businesses.",
    },
    {
      image: "/service2.png",
      title: "Mobile App Development",
      description:
        "High-performance Android and iOS applications built for growth.",
    },
    {
      image: "/service3.png",
      title: "Full Stack Solutions",
      description:
        "Complete frontend, backend and database development services.",
    },
    {
      image: "/service4.png",
      title: "UI / UX Design",
      description:
        "User-focused interfaces that create engaging digital experiences.",
    },
    {
      image: "/service5.png",
      title: "Cloud Deployment",
      description:
        "Reliable hosting, deployment and cloud infrastructure solutions.",
    },
    {
      image: "/service6.png",
      title: "AI Solutions",
      description:
        "Smart automation, AI integration and intelligent business systems.",
    },
  ];

  return (
    <section
  id="WhatWeDo"
  className="
    relative
    py-28
    overflow-hidden

    bg-slate-100
    dark:bg-[#020817]

    transition-all
    duration-500
  "
>
     

      {/* Overlay */}
      

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-sm uppercase tracking-[4px] text-blue-600 text-xl font-bold">
            Our Services
          </span>

          <h2 className="
  mt-4
  text-5xl
  font-bold

  text-slate-900
  dark:text-white
">
            What We Do
          </h2>

         <p className="
  mt-6
  text-lg

  text-slate-600
  dark:text-slate-300

  leading-relaxed
">
            We help startups and businesses build innovative
            digital products and scalable solutions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-20">

          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
             className="
  bg-white
  dark:bg-slate-900/80

  backdrop-blur-md

  border
  border-slate-200
  dark:border-slate-800

  rounded-3xl

  overflow-hidden

  shadow-lg
  hover:shadow-2xl

  transition-all
  duration-300

  hover:-translate-y-2

  flex
  flex-col
"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="
                    w-full
                    h-56
                    object-cover
                    transition-transform
                    duration-500
                    hover:scale-110
                  "
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">

                {/* Accent Line */}
                <div className="w-12 h-1 bg-indigo-500 rounded-full mb-5"></div>
<h3 className="
  text-2xl
  font-bold

  text-blue-900
  dark:text-blue-500

  mb-3
">
                  {service.title}
                </h3>

                <p className="
  mt-4

  text-slate-600
  dark:text-slate-300

  leading-relaxed

  flex-grow
">
                  {service.description}
                </p>

             

              </div>

            </motion.div>
          ))}

        </div>

      </div>
      
    </section>
  );
}