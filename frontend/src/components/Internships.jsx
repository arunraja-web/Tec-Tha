import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Internships() {
  const internships = [
    {
      title: "Frontend Developer Intern",
      image: "/frontend-intern.png",
      description:
        "Build responsive and modern user interfaces using React, Tailwind CSS and JavaScript.",
    },
    {
      title: "Backend Developer Intern",
      image: "/backend-intern.webp",
      description:
        "Develop secure APIs, manage databases and work with Node.js backend systems.",
    },
    {
      title: "Full Stack Developer Intern",
      image: "/fullstack-intern.png",
      description:
        "Gain hands-on experience in both frontend and backend development workflows.",
    },
    {
      title: "UI/UX Designer Intern",
      image: "/uiux-intern.jpg",
      description:
        "Create intuitive user experiences through wireframing, prototyping and visual design.",
    },
  ];

  return (
    <section
      id="internships"
      className="relative py-28 overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: "url('/internship-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* White Overlay */}
      <div className="absolute inset-0 bg-white/40 -z-10"></div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl lg:text-6xl font-extrabold text-slate-900">
            Internship Program
          </h2>

          <h3 className="mt-4 text-xl lg:text-2xl font-semibold text-slate-700">
            Launch Your Career With Tec Tha
          </h3>

          <p className="mt-6 text-lg text-slate-600">
            Gain real-world experience by working on live projects,
            collaborating with our development team and learning
            industry best practices.
          </p>
        </motion.div>

        {/* Internship Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {internships.map((internship, index) => (
            <motion.div
              key={internship.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="
                bg-white/90
                backdrop-blur-sm
                border border-white/50
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                flex flex-col
                h-full
              "
            >
              {/* Internship Image */}
              <img
                src={internship.image}
                alt={internship.title}
                className="
                  w-full
                  h-52
                  object-cover
                "
              />

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">

                {/* Accent Line */}
                <div className="w-12 h-1 bg-indigo-500 rounded-full mb-4"></div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {internship.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-relaxed flex-grow">
                  {internship.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

        {/* Single Apply Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <Link
            to="/internship-apply"
            className="
              px-10
              py-4
              bg-black
              text-white
              font-semibold
              rounded-xl
              shadow-lg
              hover:bg-slate-800
              hover:scale-105
              transition-all
              duration-300
            "
          >
            Apply For Internship
          </Link>
        </motion.div>

      </div>
    </section>
  );
}