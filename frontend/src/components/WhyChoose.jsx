import { motion } from "framer-motion";
import {
  Rocket,
  ShieldCheck,
  Clock3,
  Users,
  BarChart3,
  Headphones,
  ArrowRight,
} from "lucide-react";

export default function WhyChoose() {
  const features = [
    {
      icon: Rocket,
      title: "Innovation First",
      description:
        "We use the latest technologies to build future-ready solutions.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Driven",
      description:
        "Clean code, best practices and top-notch quality.",
    },
    {
      icon: Clock3,
      title: "On-Time Delivery",
      description:
        "We value your time and deliver on our promises.",
    },
    {
      icon: Users,
      title: "Client Focused",
      description:
        "Your goals are our priority. We grow when you grow.",
    },
    {
      icon: BarChart3,
      title: "Scalable Solutions",
      description:
        "Built to scale with your business and market.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Our team is always here when you need us.",
    },
  ];

  return (
    <section
      id="why-choose"
      className="py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 uppercase tracking-[4px] text-sm font-semibold">
              Why Choose Tec Tha
            </span>

            <h2 className="mt-6 text-5xl font-bold text-slate-900 leading-tight">
              We build digital experiences that make a{" "}
              <span className="text-blue-600">
                difference.
              </span>
            </h2>

            <p className="mt-8 text-lg text-slate-600 leading-relaxed">
              At Tec Tha, we combine creativity,
              technology and strategy to deliver
              solutions that are not just innovative,
              but also impactful.
            </p>

            <button
              className="
                mt-10
                flex items-center gap-3
                text-blue-600
                font-semibold
                hover:gap-5
                transition-all duration-300
              "
            >
              About Us
              <ArrowRight size={20} />
            </button>
          </motion.div>

          {/* Right Side */}
          <div className="grid md:grid-cols-2 gap-8">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="
                    border-b
                    border-slate-200
                    pb-8
                  "
                >
                  <div className="flex gap-5">

                    <div
                      className="
                        w-16 h-16
                        rounded-full
                        bg-blue-50
                        flex items-center justify-center
                        text-blue-600
                        flex-shrink-0
                      "
                    >
                      <Icon size={30} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {feature.title}
                      </h3>

                      <p className="mt-3 text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}