import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaGithub,
  FaDocker,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiJavascript,
  SiMongodb,
  SiExpress,
  SiPostgresql,
  SiFirebase,
  SiVercel,
} from "react-icons/si";

export default function TrustedTechStack() {
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

  return (
    <section className="py-20 bg-white dark:bg-[#020817] overflow-hidden">

      <div className="text-center mb-14">

        <span className="uppercase tracking-[4px] text-blue-900 dark:text-blue-500 font-bold">
          Trusted Technologies
        </span>

        <h2 className="mt-4 text-5xl font-bold text-slate-900 dark:text-white">
          Technologies We Use
        </h2>

      </div>

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

                bg-slate-
                dark:bg-slate-900

                border
                border-slate-200
                dark:border-slate-700

                rounded-2xl

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
    </section>
  );
}