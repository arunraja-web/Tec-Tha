import { motion } from "framer-motion";

import {
  FileText,
  Search,
  MessageSquare,
  Handshake,
  Rocket,
  Users,
  Shield,
  Star,
} from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Briefcase, MapPin } from "lucide-react";
import { fillOffset } from "framer-motion";


const jobs = [
  {
    title: "Frontend Developer",
    image: "/frontend-career.png",
    type: "Full Time",
    location: "Hybrid",
    description: "Build modern and responsive user interfaces.",
  },
  {
    title: "Backend Developer",
    image: "/backend-career.webp",
    type: "Full Time",
    location: "Remote",
    description: "Design APIs and scalable backend systems.",
  },
  {
    title: "Full Stack Developer",
    image: "/fullstack-intern.png",
    type: "Full Time",
    location: "Hybrid",
    description: "Work across frontend and backend technologies.",
  },
  {
    title: "UI/UX Designer",
    image: "/uiux-career.jpg",
    type: "Full Time",
    location: "On Site",
    description: "Craft intuitive and delightful user experiences.",
  },
  {
    title: "Project Manager",
    image: "/project-manager.webp",
    type: "Full Time",
    location: "Remote",
    description: "Lead and manage software development projects.",
  },
];
const steps = [
  {
    number: "01",
    title: "Apply",
    description:
      "Submit your application and share your resume with us.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Screening",
    description:
      "Our team reviews your profile and evaluates your skills.",
    icon: Search,
  },
  {
    number: "03",
    title: "Interview",
    description:
      "Meet with our team to discuss your experience and aspirations.",
    icon: MessageSquare,
  },
  {
    number: "04",
    title: "Get Started",
    description:
      "Receive your offer and begin your journey with Tec Tha.",
    icon: Handshake,
  },
];
export default function CareersPage() {
    const navigate = useNavigate();
    const swiperRef = useRef(null);
     useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      

      <main className="pt-2">
        
        <div className="max-w-9xl mx-auto px-4 lg:px-16 mb-15">

  
</div>

        {/* Open Positions */}
        {/* Open Positions */}
<section className="pb-2 bg-slate-100  overflow-hidden">

  {/* Banner */}
  <div
    className="
      relative
      w-full
      h-[280px] lg:h-[300px]
      overflow-hidden
      
    "
    style={{
      backgroundImage: "url('/open-positions-banner.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >

    {/* Content */}
    <div className="relative z-10 h-full flex flex-col justify-between px-8 lg:px-16 py-8">

      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="
          w-fit
          text-white
          hover:text-indigo-300
          transition-all duration-300
        "
      >
        <ArrowLeft size={28} />
      </button>

      {/* Heading */}
      <div className="max-w-2xl">

        <span className="text-indigo-400 uppercase tracking-[4px] text-sm font-semibold">
          Open Positions
        </span>

        <h2 className="mt-4 text-5xl lg:text-6xl font-bold text-white">
          Explore Opportunities
        </h2>

        <p className="mt-6 text-lg text-slate-300">
          Find the role that matches your skills and passion.
        </p>

      </div>

    </div>

    {/* Swiper Arrows */}
    <div className="absolute right-8 lg:right-16 bottom-1   -translate-y-1/2 flex gap-4 z-20">

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="
          w-14 h-14
          rounded-full
          bg-white/95
          backdrop-blur-sm
          shadow-xl
          flex items-center justify-center
          hover:bg-slate-900
          hover:text-white
          hover:scale-105
          transition-all duration-300
        "
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="
          w-14 h-14
          rounded-full
          bg-white/95
          backdrop-blur-sm
          shadow-xl
          flex items-center justify-center
          hover:bg-slate-900
          hover:text-white
          hover:scale-105
          transition-all duration-300
        "
      >
        <ChevronRight size={24} />
      </button>

    </div>

  </div>

  {/* Cards */}
  <div className="px-4 lg:px-40">

    <Swiper
      modules={[Navigation]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      spaceBetween={30}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
      className="mt-12"
    >

      {jobs.map((job) => (

        <SwiperSlide key={job.title}>

          <div
            className="
              bg-white
              rounded-3xl
              overflow-hidden
              shadow-sm
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-300
              h-full
            "
          >

            {/* Card Image */}
            <img
              src={job.image}
              alt={job.title}
              className="
                w-full
                h-56
                object-cover
              "
            />

            {/* Content */}
            <div className="p-6 flex flex-col h-[250px]">

              <h3 className="text-2xl font-bold text-slate-900">
                {job.title}
              </h3>

              <div className="mt-4 space-y-3 text-slate-600">

                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>{job.type}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{job.location}</span>
                </div>

              </div>

              <p className="mt-5 text-slate-600 leading-relaxed flex-grow">
                {job.description}
              </p>

            </div>

          </div>

        </SwiperSlide>

      ))}

    </Swiper>

  </div>

</section>
        

        {/* Why Join Tec Tha */}
        <section className="py-20 bg-white">

  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">

      <span className="text-indigo-600 uppercase tracking-[4px] text-sm font-semibold">
        Why Join Tec Tha
      </span>

      <h2 className="mt-4 text-5xl font-bold text-slate-900">
        Build More Than a Career
      </h2>

      <p className="mt-6 text-lg text-slate-600">
        Join a team where innovation thrives, ideas matter,
        and every contribution creates impact.
      </p>

    </div>

    {/* Content */}
    <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">

      {/* Left Side Image */}
      <div className="relative">

        <img
          src="/why-join-team.png"
          alt="Tec Tha Team"
          className="
            w-full
            h-[700px]
            object-cover
            rounded-[40px]
            shadow-2xl
          "
        />

        {/* Floating Box */}
        <div
          className="
            absolute
            bottom-8
            left-8
            bg-white/90
            backdrop-blur-md
            rounded-3xl
            p-6
            shadow-xl
          "
        >

          <p className="text-3xl font-bold text-slate-900">
            50+
          </p>

          <p className="text-slate-600">
            Passionate professionals driving innovation.
          </p>

        </div>

      </div>

      {/* Right Side Cards */}
      <div className="grid gap-6">

        {[
          {
            number: "01",
            title: "Innovation Culture",
            description:
              "Work on meaningful products and solve real-world challenges.",
          },
          {
            number: "02",
            title: "Career Growth",
            description:
              "Continuous learning, mentorship and leadership opportunities.",
          },
          {
            number: "03",
            title: "Ownership",
            description:
              "Take initiative, contribute ideas and make an impact.",
          },
          {
            number: "04",
            title: "Collaborative Teams",
            description:
              "Grow alongside talented people who support your success.",
          },
        ].map((item) => (

          <div
            key={item.number}
            className="
              bg-slate-50
              border border-slate-200
              rounded-3xl
              p-8
              hover:shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
            "
          >

            <div className="flex items-start gap-6">

              {/* Number */}
              <div
                className="
                  w-16
                  h-16
                  flex-shrink-0
                  rounded-2xl
                  bg-indigo-100
                  text-indigo-600
                  flex
                  items-center
                  justify-center
                  text-xl
                  font-bold
                "
              >
                {item.number}
              </div>

              {/* Text */}
              <div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-slate-600 leading-relaxed">
                  {item.description}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>

</section>

        

        {/* Hiring Process */}
        {/* Hiring Process */}
{/* Hiring Process */}
<section className="relative py-20 overflow-hidden bg-slate-200">



    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

  
  {/* Left Office Background */}
  

  {/* Blue Dots */}
  <div className="hidden xl:grid absolute top-16 right-12 grid-cols-5 gap-2">

    {[...Array(25)].map((_, i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"
      />
    ))}

  </div>

  <div className="max-w-6xl mx-auto px-6 relative z-10">

    <div className="text-center">

      <span className="text-blue-800 uppercase tracking-[4px] text-sm font-semibold">
        Hiring Process
      </span>

      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        Your Journey With Us
      </h2>

      <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
        Our hiring process is designed to help you showcase your skills
        and find the right opportunity at Tec Tha.
      </p>

    </div>

    <div className="relative mt-16">

      {/* Timeline */}
      <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-[3px] h-full bg-gradient-to-b from-blue-900 via-blue-900 to-blue-900 shadow-[0_0_20px_rgba(37,99,235,0.4)]"></div>

      <div className="space-y-12">

        {steps.map((step, index) => {

          const Icon = step.icon;

          return (

            <motion.div
              key={step.number}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              viewport={{ once: true }}
              className={`relative flex items-center ${
                index % 2 === 0
                  ? "lg:flex-row"
                  : "lg:flex-row-reverse"
              } flex-col gap-6`}
            >

              {/* Card */}
              <div className="relative w-full lg:w-5/12">

                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">

                  <div className="flex items-center gap-4">

                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-900 flex-shrink-0">

                      <Icon size={30} />

                    </div>

                    <div>

                      <h3 className="text-3xl font-bold text-slate-900">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-slate-600">
                        {step.description}
                      </p>

                      <div className="mt-4 w-10 h-1 rounded-full bg-blue-900"></div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Number */}
              <div className="relative z-20">

                <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl opacity-30 animate-pulse"></div>

                <div className="relative w-20 h-20 rounded-full bg-blue-700 ring-[8px] ring-blue-100 flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_25px_rgba(37,99,235,0.5)]">

                  {step.number}

                </div>

              </div>

              {/* Empty Space */}
              <div className="hidden lg:block w-5/12"></div>

            </motion.div>

          );

        })}

      </div>

    </div>

  </div>


</section>

        
<section
  className="relative py-24 overflow-hidden"
  style={{
    backgroundImage: "url('/office-bg3.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  
  }}
>
     <div className="absolute inset-0 bg-slate-800/60 -z-10" />
  <div className="max-w-5xl mx-auto px-6 lg:px-10">
    

    <div
      className="
        bg-white
        rounded-[40px]
        p-12 lg:p-16
        text-center
        shadow-2xl
      "
    >

      <span className="text-blue-800  uppercase tracking-[4px] text-sm font-bold">
        Join Our Team
      </span>

      <h2 className="mt-4 text-5xl font-bold text-slate-900">
        Ready to Take the Next Step?
      </h2>

      <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
        Don't see the perfect role right now? We'd still love to hear from you.
        Submit your resume and we'll reach out when an opportunity matches your skills.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

        <button
  onClick={() => navigate("/career-apply")}
  className="
    px-8 py-4
    bg-blue-800
    text-white
    rounded-xl
    font-semibold
    hover:bg-slate-800
    hover:-translate-y-1
    transition-all
    duration-300
  "
>
  Submit Your Resume
</button>

    

      </div>

    </div>

  </div>
</section>
        {/* Resume CTA */}

        {/* Resume CTA */}


        

      </main>
    </>
  );
}