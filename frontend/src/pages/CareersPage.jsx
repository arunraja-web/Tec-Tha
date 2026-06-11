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
<section className="pb-0 bg-slate-100 overflow-hidden">

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
  <div className="px-4 lg:px-10">

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
<section className="py-24 bg-slate-650">
  <div className="max-w-7xl mx-auto px-6 lg:px-10">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <span className="text-indigo-600  uppercase tracking-[4px] text-2xl font-semibold">
        Hiring Process
      </span>

     <h1  className="text-white text-5xl font-bold mt-4">
        Your Journey With Us
      </h1>
      <br></br>

      <p className="text-slate-400">
        Our hiring process is designed to help you showcase your skills and find the right opportunity at Tec Tha.
      </p>
    </div>

    {/* Steps */}
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      {[
        {
          number: "01",
          title: "Apply",
          description:
            "Submit your application and share your resume with us.",
        },
        {
          number: "02",
          title: "Screening",
          description:
            "Our team reviews your profile and evaluates your skills.",
        },
        {
          number: "03",
          title: "Interview",
          description:
            "Meet with our team to discuss your experience and aspirations.",
        },
        {
          number: "04",
          title: "Get Started",
          description:
            "Receive your offer and begin your journey with Tec Tha.",
        },
      ].map((step) => (
        <div
          key={step.number}
          className="
            bg-white
            rounded-3xl
            p-8
            border border-slate-200
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-2
            transition-all
            duration-300
          "
        >
          <div
            className="
              w-16 h-16
              rounded-2xl
              bg-indigo-100
              hover:border-indigo-300
              text-indigo-600
              flex items-center justify-center
              text-2xl font-bold
              border border-slate-200 hover:border-indigo-300
            "
          >
            {step.number}
          </div>

          <h3 className="mt-8 text-2xl font-bold text-slate-900">
            {step.title}
          </h3>

          <p className="mt-4 text-slate-600 leading-relaxed">
            {step.description}
          </p>
        </div>
      ))}

    </div>

  </div>
  <section
  className="relative py-24 overflow-hidden"
  style={{
    backgroundImage: "url('/career-cta-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
    
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

      <span className="text-indigo-600 uppercase tracking-[4px] text-sm font-semibold">
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
          className="
            px-8 py-4
            bg-black
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
</section>

        

        {/* Resume CTA */}

        {/* Resume CTA */}


        

      </main>
    </>
  );
}