
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaDatabase,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiMongodb,
} from "react-icons/si";

export default function Internships() {
  const navigate = useNavigate();
const { user } = useAuth();
  const internships = [
    {
      title: "Frontend Developer Intern",
      logos: [
        <FaReact className="text-sky-500" />,
        <SiTailwindcss className="text-blue-500" />,
        <SiJavascript className="text-yellow-400" />,
      ],
      duration: "8 Weeks",
      mode: "Hybrid",
      description:
        "Build responsive and modern user interfaces using industry-standard frontend technologies.",
    },
    {
      title: "Backend Developer Intern",
      logos: [
        <FaNodeJs className="text-green-500" />,
        <SiExpress className="text-slate-300" />,
        <SiMongodb className="text-green-400" />,
      ],
      duration: "8 Weeks",
      mode: "Remote",
      description:
        "Develop secure APIs, manage databases and work with backend systems.",
    },
    {
      title: "Full Stack Developer Intern",
      logos: [
        <FaReact className="text-sky-500" />,
        <FaNodeJs className="text-green-500" />,
        <FaDatabase className="text-indigo-400" />,
      ],
      duration: "12 Weeks",
      mode: "Hybrid",
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

    bg-slate-100
    dark:bg-[#020817]

    transition-all
    duration-500
  "
>
      {/* Background Image */}
    


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

        {/* Internship Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">

          {internships.map((internship, index) => (
            <motion.div
              key={internship.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
             className="
  bg-white
  dark:bg-slate-900/80

  rounded-3xl

  border
  border-slate-200
  dark:border-slate-800

  backdrop-blur-md

  p-8

  shadow-lg
  hover:shadow-2xl

  hover:-translate-y-6

  transition-all
  duration-300

  flex flex-col
"
            >

              {/* Accent Line */}
              <div className="w-14 h-1 bg-blue-500 rounded-full"></div>

              {/* Title */}
              <h3 className="
  mt-8
  text-2xl
  font-bold

  text-[#061B4E]
  dark:text-white
">
                {internship.title}
              </h3>

              {/* Stack Logos */}
              <div className="mt-6 flex items-center gap-4">

                {internship.logos.map((logo, logoIndex) => (
                  <div
                    key={logoIndex}
                    className="
  w-14 h-14
  rounded-2xl

  bg-slate-100
  dark:bg-slate-800

  flex items-center
  justify-center

  text-3xl

  shadow-sm
"
                  >
                    {logo}
                  </div>
                ))}

              </div>

              {/* Description */}
              <p className="
  mt-6

  text-slate-600
  dark:text-slate-300

  leading-relaxed

  flex-grow
">
                {internship.description}
              </p>

              {/* Duration & Mode */}
              <div className="mt-8 space-y-3">

                <div className="flex justify-between">
                  <span className="
  text-black
  dark:text-slate-400
">
                    Duration
                  </span>

                  <span className="
  text-slate-900
  dark:text-white
">
                    {internship.duration}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="
  font-semibold

  text-blue-800
  dark:text-white
">
                    Mode
                  </span>

                  <span className="font-semibold text-slate-1000 dark:text-white">
                    {internship.mode}
                  </span>
                </div>

              </div>

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