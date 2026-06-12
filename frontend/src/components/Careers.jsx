
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
<section className="py-20 bg-white">
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
  <section className="pb-12 bg-white">
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
  className="py-10 bg-slate-100"
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

      
</section>





 

        </section>
    );
    }