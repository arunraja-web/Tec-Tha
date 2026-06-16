import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  Lightbulb,
  ShieldCheck,
  Users,
  HeartHandshake,
} from "lucide-react";

export default function AboutUs() {
  return (
    <div>

      {/* Hero Section */}
      <section className="pt-4 pb-20 bg-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto"
        >
          <span className="text-blue-800 font-bold tracking-[0.25em] uppercase text-2xl">
            About Us
          </span>

          <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
            We Build Digital Solutions
            <br />
            That Matter
          </h1>

          <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Tec Tha is dedicated to creating innovative digital
            solutions that empower businesses to thrive in the
            modern world.
          </p>
        </motion.div>
      </section>

      {/* Dark Background Section */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: "url('/internship-bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/85"></div>

        <div className="relative z-10">

          {/* Section 1 */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-xl"
              >
                <span className="text-white font-semibold tracking-widest uppercase">
                  Our Story
                </span>

                <h2 className="mt-4 text-4xl font-bold text-white">
                  Transforming Ideas Into Reality
                </h2>

                <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                  Tec Tha is a technology-driven company dedicated to
                  creating innovative web and mobile solutions. We
                  empower businesses with scalable digital products
                  that accelerate growth and enhance customer experiences.
                </p>

                <a
                  href="#contact"
                  className="inline-block mt-8 px-8 py-4 bg-blue-900 text-white rounded-xl font-semibold hover:bg-[#26376E] transition"
                >
                  Contact Us
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={1000}
                  scale={1.03}
                  transitionSpeed={1500}
                  gyroscope={true}
                  className="rounded-3xl"
                >
                  <img
                    src="/about-team.jpg"
                    alt="About Tec Tha"
                    className="w-[90%] mx-auto rounded-3xl shadow-2xl"
                  />
                </Tilt>
              </motion.div>

            </div>
          </section>

          {/* Section 2 */}
          <section className="max-w-7xl mx-auto px-6 pb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={1000}
                  scale={1.03}
                  transitionSpeed={1500}
                  gyroscope={true}
                  className="rounded-3xl"
                >
                  <img
                    src="/who-we-are.jpg"
                    alt="Who We Are"
                    className="w-[80%] mx-auto rounded-3xl shadow-2xl"
                  />
                </Tilt>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-white font-semibold tracking-widest uppercase">
                  Who Are We?
                </span>

                <h2 className="mt-4 text-4xl font-bold text-white">
                  Passionate About Technology
                </h2>

                <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                  At Tec Tha, we are a team of passionate developers,
                  designers and innovators committed to delivering
                  high-quality digital experiences.
                </p>

                <p className="mt-4 text-lg text-slate-300 leading-relaxed">
                  We believe in collaboration, creativity and
                  continuous improvement to help our clients achieve
                  their goals.
                </p>
              </motion.div>

            </div>
          </section>

        </div>
      </div>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <span className="text-blue-900 text-2xl font-bold tracking-widest uppercase">
              Our Core Values
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              What Drives Us Forward
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                title: "Innovation",
                icon: <Lightbulb size={28} />,
                desc: "We embrace creativity and modern technologies to build better solutions.",
              },
              {
                title: "Quality",
                icon: <ShieldCheck size={28} />,
                desc: "We are committed to delivering high-quality products that last and perform.",
              },
              {
                title: "Collaboration",
                icon: <Users size={28} />,
                desc: "We believe in teamwork and strong partnerships to achieve great results.",
              },
              {
                title: "Customer First",
                icon: <HeartHandshake size={28} />,
                desc: "Our customers' success is our success. We build with their needs in mind.",
              },
            ].map((item, index) => (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="
                  group
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-lg
                  hover:shadow-[0_25px_50px_rgba(50,72,150,0.25)]
                  hover:-translate-y-4
                  hover:scale-105
                  transition-all
                  duration-500
                  cursor-pointer
                "
              >

                <div
                  className="
                    w-16 h-16 mx-auto
                    rounded-full
                    bg-gradient-to-br from-blue-100 to-blue-200
                    flex items-center justify-center
                    text-[#061B4E]
                    shadow-lg
                    transition-all duration-500
                    group-hover:scale-110
                    group-hover:rotate-6
                  "
                >
                  {item.icon}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900 text-center">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-relaxed text-center">
                  {item.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </div>
      </section>

    </div>
  );
}