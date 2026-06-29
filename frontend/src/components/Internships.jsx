
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth  } from "../context/AuthContext";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {

  FaGithub,
  FaDocker,
} from "react-icons/fa";

import {

 
  SiPostgresql,
  SiFirebase,
  SiVercel,
} from "react-icons/si";
import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaDatabase,
  FaSalesforce,
  FaLinkedin,
  FaPython,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiMongodb,
  SiHubspot,
  SiGoogleanalytics,
  SiGoogleads,
} from "react-icons/si";

export default function Internships() {
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();
const { user } = useAuth();
const techs = [
  {
    name: "React",
    icon: <FaReact className="text-[#61DAFB]" />,
  },

  {
    name: "Node.js",
    icon: <FaNodeJs className="text-[#68A063]" />,
  },

  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-[#06B6D4]" />,
  },

  {
    name: "JavaScript",
    icon: <SiJavascript className="text-[#F7DF1E]" />,
  },

  {
    name: "Express.js",
    icon: <SiExpress className="text-black dark:text-white" />,
  },

  {
    name: "MongoDB",
    icon: <SiMongodb className="text-[#47A248]" />,
  },

  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="text-[#336791]" />,
  },

  {
    name: "Figma",
    icon: <FaFigma className="text-[#F24E1E]" />,
  },

  {
    name: "Firebase",
    icon: <SiFirebase className="text-[#FFCA28]" />,
  },

  {
    name: "GitHub",
    icon: <FaGithub className="text-black dark:text-white" />,
  },

  {
    name: "Docker",
    icon: <FaDocker className="text-[#2496ED]" />,
  },

  {
    name: "Vercel",
    icon: <SiVercel className="text-black dark:text-white" />,
  },
];
  const internships = [
    {
      title: "Business Developer Intern",
      logos: [
        <FaLinkedin className="text-[#0A66C2]" />,
    <SiHubspot className="text-[#FF7A59]" />,
    <SiGoogleanalytics className="text-[#E37400]" />,
      ],
      duration: "8 Weeks",
      mode: "Remote",
      description:
         "Gain hands-on experience in business strategy, client communication, market analysis, and lead generation while contributing to the growth and expansion of the organization.",
    },
    {
      title: "Data Analyst Intern",
      logos: [
            <FaPython className="text-[#3776AB]" />,
    <FaDatabase className="text-indigo-500" />,
    <SiGoogleanalytics className="text-[#E37400]" />,
      ],
      duration: "8 Weeks",
      mode: "Remote",
      description:
"Analyze and interpret data to identify trends, generate insights, and support data-driven decision making while working with real-world datasets and analytical tools.",    },
    {
      title: "Full Stack Developer Intern",
      logos: [
        <FaReact className="text-sky-500" />,
        <FaNodeJs className="text-green-500" />,
        <FaDatabase className="text-indigo-400" />,
      ],
      duration: "12 Weeks",
      mode: "Remote",
      description:
        "Gain hands-on experience in both frontend and backend development workflows.",
    },
    {
      title: "UI/UX Designer Intern",
      logos: [
        <FaFigma className="text-pink-500" />,
        <FaReact className="text-sky-500" />,
        <FaDatabase className="text-orange-400" />,
      ],
      duration: "6 Weeks",
      mode: "Remote",
      description:
        "Create intuitive user experiences through research and visual design.",
    },
  ];
  const handleApply = () => {
  if (user) {
    navigate("/internship-apply");
  } else {
    navigate("/login", {
      state: {
        from: "/internship-apply",
      },
    });
  }
};

  return (
    <section
  id="internships"
  className="
    relative
    py-28
    overflow-hidden

  

    transition-all
    duration-500
  "
>
      {/* Background Image */}
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
    


      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="
  text-5xl
  lg:text-6xl
  font-extrabold

  text-slate-900
  dark:text-white
">
            Internship Program
          </h2>

          <h3 className="
  mt-4
  text-xl
  lg:text-2xl
  font-bold

  text-blue-800
  dark:text-blue-500
">
            Launch Your Career With Tec Tha
          </h3>

         <p className="
  mt-6
  text-lg

  text-slate-600
  dark:text-slate-400
">
            Gain real-world experience by working on live projects,
            collaborating with our development team and learning
            industry best practices.
          </p>
        </motion.div>


      <div className="relative">

        <div className="flex marquee whitespace-nowrap">

          {[...techs, ...techs].map((tech, index) => (
            <div
              key={index}
              className="
                mx-6
                min-w-[250px]
                h-24
                px-8

              

         
               

                flex
                items-center
                justify-center
                gap-4

                shadow-sm
              "
            >
              <div className="text-4xl ">
                {tech.icon}
              </div>

              <span className="text-xl font-semibold text-slate-800 dark:text-white">
                {tech.name}
              </span>
            </div>
          ))}

        </div>

      </div>
        {/* Internship Cards */}
      {/* Zig-Zag Internship Section */}
{/* Premium Zig-Zag Internship Section */}
{/* Premium Compact Accordion Section */}

<div className="mt-16 max-w-6xl mx-auto px-4">

  {internships.map((internship, index) => (

    <motion.div
      key={internship.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      viewport={{ once: true }}

      className="
        border-b
        border-slate-200
        dark:border-slate-700
      "
    >

      {/* Header */}

      <button
        onClick={() =>
          setOpenIndex(
            openIndex === index ? -1 : index
          )
        }

        className="
          w-full

          py-6

          flex
          items-center
          justify-between

          text-left

          group
        "
      >

        <div>

          <span
            className="
              text-xs

              uppercase

              tracking-[4px]

              font-semibold

              text-blue-800
              dark:text-blue-500
            "
          >
            Internship 0{index + 1}
          </span>

          <h3
            className="
              mt-2

              text-2xl
              lg:text-3xl

              font-bold

              text-slate-900
              dark:text-white

              group-hover:text-blue-700

              transition-all
              duration-300
            "
          >
            {internship.title}
          </h3>

        </div>

        <motion.div
          animate={{
            rotate:
              openIndex === index ? 180 : 0,
          }}

          transition={{
            duration: 0.3,
          }}
        >

          <ChevronDown
            size={30}
            className="
              text-slate-500
              dark:text-slate-400
            "
          />

        </motion.div>

      </button>

      {/* Expand Content */}

      <motion.div
        initial={false}

        animate={{
          height:
            openIndex === index
              ? "auto"
              : 0,

          opacity:
            openIndex === index
              ? 1
              : 0,
        }}

        transition={{
          duration: 0.4,
        }}

        className="overflow-hidden"
      >

        <div className="pb-8">

          {/* Description */}

          <p
            className="
              text-base

              leading-8

              text-slate-600
              dark:text-slate-400

              max-w-3xl
            "
          >
            {internship.description}
          </p>

          {/* Tech Stack */}

          <div className="flex gap-3 mt-8 flex-wrap">

            {internship.logos.map(
              (logo, logoIndex) => (

                <div
                  key={logoIndex}

                  className="
                    w-14
                    h-14

                    rounded-2xl

                    bg-slate-100
                    dark:bg-slate-800

                    flex
                    items-center
                    justify-center

                    text-2xl

                    shadow-md
                  "
                >
                  {logo}
                </div>

              )
            )}

          </div>

          {/* Duration & Mode */}

          <div className="flex gap-10 mt-8">


            <div>

              <p
                className="
                  text-sm

                  text-slate-500
                "
              >
                Mode
              </p>

              <h4
                className="
                  mt-1

                  text-lg

                  font-bold

                  text-slate-900
                  dark:text-white
                "
              >
                {internship.mode}
              </h4>

            </div>

          </div>

          {/* Apply Button */}

          <button
            onClick={handleApply}

            className="
              mt-8

              px-7
              py-3

              rounded-xl

              bg-blue-900
              hover:bg-blue-800

              text-white

              font-semibold

              transition-all
              duration-300

              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            Apply Now →
          </button>

        </div>

      </motion.div>

    </motion.div>

  ))}

</div>

        {/* Apply CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="
  mt-20

  bg-slate-50
  dark:bg-slate-900

  rounded-[20px]

  border
  border-slate-200
  dark:border-slate-800

  px-10
  py-10

  text-center
"
        >

          <br></br><h3 className="
  text-4xl
  font-bold

  text-slate-900
  dark:text-white
">
            Ready to Start Your Journey?
          </h3>

         <p className="
  mt-3
  text-lg

  text-slate-600
  dark:text-slate-300
">
            Take the first step towards building real-world skills
            and gaining valuable industry experience with Tec Tha.
          </p>

          <button
  onClick={handleApply}
  className="
    inline-block
    mt-5
    px-10
    py-4
    bg-blue-900
    text-white
    font-semibold
    rounded-xl
    hover:bg-blue-900
    hover:-translate-y-1
    hover:shadow-xl
    transition-all
    duration-300
  "
>
  Apply For Internship
</button>
        </motion.div>

      </div>
    </section>
  );
}