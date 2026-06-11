
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  ChevronLeft,
  ChevronRight,
  Briefcase,
  MapPin,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "swiper/css";
import "swiper/css/navigation";

    export default function Careers() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const jobs = [
        {
        title: "Frontend Developer",
        image: "/role-frontend.png ",
        location: "Chennai / Hybrid",
        type: "Full Time",
        description:
            "Build responsive and intuitive user interfaces using modern technologies.",
        },
        {
        title: "Backend Developer",
        image: "/role-backend.webp ",
        location: "Remote",
        type: "Full Time",
        description:
            "Design and develop scalable APIs and backend services.",
        },
        {
        title: "UI/UX Designer",
        image: "/role-uiux.jpg",
        location: "Chennai / Hybrid",
        type: "Full Time",
        description:
            "Create beautiful and user-friendly experiences.",
        },
        {
        title: "Project Manager",
        image: "/role-project.webp",
        location: "Chennai",
        type: "Full Time",
        description:
            "Lead projects, manage teams and deliver value to clients.",
        },
        {
        title: "DevOps Engineer",
        image: "/role-devops.png",
        location: "Remote",
        type: "Full Time",
        description:
            "Automate deployments and optimize infrastructure.",
        },
    ];

    const handleApply = () => {
        if (user) {
        navigate("/career-apply");
        } else {
        navigate("/login");
        }
    };

    return (
        <section id="careers" className="bg-white">

        {/* Careers Hero Section */}
   {/* Careers Intro */}
<section className="py-28 bg-white">
  <div className="max-w-5xl mx-auto text-center px-6">

    <span className="text-indigo-600 uppercase tracking-[4px] text-2xl font-bold">
      Our Careers
    </span>

    <h2 className="mt-4 text-5xl lg:text-6xl font-bold text-slate-900">
      Build Your Future With Tec Tha
    </h2>

    <p className="mt-6 text-lg text-slate-600">
      Explore exciting opportunities, work alongside talented teams
      and create products that make a real impact.
    </p>

  </div>
  <section className="pb-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <img
      src="/career-banner.png"
      alt="Careers at Tec Tha"
      className="
        w-full
        h-[400px]
        object-cover
        rounded-[40px]
        shadow-xl
      "
    />

  </div>
</section>
<section
  id="opportunities"
  className="py-24 bg-slate-100"
>

  <div className="max-w-7xl mx-auto px-6 lg:px-3">

    <span className="text-indigo-600 uppercase tracking-[3px] text-sm font-semibold">
      Open Positions
    </span>

    <h2 className="mt-4 text-5xl font-bold text-slate-900">
      Explore Opportunities
    </h2>

    <p className="mt-4 text-lg text-slate-600">
      Find the role that matches your skills and passion.
    </p>
<button
  onClick={() => navigate("/careers")}
  className="
    mt-10
    px-8 py-4
    bg-black text-white
    rounded-xl
    font-semibold
    hover:bg-slate-800
    transition-all duration-300
  "
>
  View All Openings
</button> 
  </div>
    

</section>
{/* Why Join Tec Tha */}
<section className="py-28 bg-white">

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
      
</section>





 

        </section>
    );
    }