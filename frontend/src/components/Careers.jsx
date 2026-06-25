import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Careers() {
  const navigate = useNavigate();

  return (
    <section
      id="careers"
      className="
        py-24
        bg-white
        dark:bg-[#020817]
        transition-all duration-500
      "
    >
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center px-6">

        <span
          className="
            text-blue-900
            dark:text-blue-600
            uppercase
            tracking-[4px]
            text-xl
            font-bold
          "
        >
          Our Careers
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="
            mt-4
            text-5xl
            lg:text-6xl
            font-bold

            text-slate-900
            dark:text-white
          "
        >
          Build Your Future With Tec Tha
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="
            mt-6
            text-lg

            text-slate-600
            dark:text-slate-400
          "
        >
          Explore exciting opportunities, work alongside talented
          teams and create products that make a real impact.
        </motion.p>
      </div>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mt-16"
      >
        <img
          src="/career-banner.png"
          alt="Careers"
          className="
            w-full
            h-[250px]
            md:h-[450px]
            object-cover
            rounded-[40px]
            shadow-2xl
          "
        />
      </motion.div>

      {/* Open Positions */}
      <section
        className="
          mt-14
          py-10

          bg-slate-200
          dark:bg-slate-900

          transition-all duration-500
        "
      >
        <div className="max-w-7xl mx-auto px-2">

          <span
            className="
              uppercase
              tracking-[3px]
              text-sm
              font-bold

              text-blue-900
              dark:text-blue-700
            "
          >
            Open Positions
          </span>

          <h2
            className="
              mt-4
              text-5xl
              font-bold

              text-slate-900
              dark:text-white
            "
          >
            Explore Opportunities
          </h2>

          <p
            className="
              mt-4
              text-lg

              text-slate-600
              dark:text-slate-400
            "
          >
            Find the role that matches your skills and passion.
          </p>

          

          {/* CTA Button */}
          <div className="text-center mt-8">

            <button
              onClick={() => navigate("/careers")}
              className="
                px-8 py-4

                bg-blue-900
                hover:bg-blue-800

                text-white
                rounded-xl

                font-semibold

                hover:-translate-y-1
                hover:shadow-xl

                transition-all duration-300
              "
            >
              View All Openings
            </button>

          </div>

        </div>
      </section>
    </section>
  );
}