export default function HeroSection() {
  return (
   <section className="relative min-h-screen overflow-hidden bg-white">
  <div className="grid lg:grid-cols-2 min-h-screen">

    {/* Left Content */}
    <div className="max-w-[1600px] mx-auto w-full flex items-center px-12 lg:px-40 py-24 z-10 ">

      <div className="max-w-2xl ">

      <br></br> <br></br><h2 className="text-6xl lg:text-7xl font-extrabold leading-tight text-white ">
          Building Digital
          <br />

          <span className="bg-gradient-to-r text-white bg-clip-text text-transparent ">
            Products That
          </span>

          <br />
          Scale
        </h2>

        <p className="mt-8 text-xl text-slate-300 leading-relaxed">
          Tec Tha helps startups, entrepreneurs and businesses build
          modern web applications, mobile apps and custom software
          solutions that drive growth.
        </p>

        <div className="mt-10 flex flex-wrap gap-5">

          <button className="px-6 py-4 bg-blue-900 text-white text-lg font-bold  hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
  Book a Consultation
</button>

          <button className="px-8 py-4 border border-slate-500 text-white  font-extrabold hover:bg-white/10 transition">
            Explore Our Works
          </button>

        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap gap-12">

          <div>
            <h3 className="text-5xl font-bold text-white">
              25+
            </h3>

            <p className="text-slate-400 mt-2">
              Projects Delivered
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-white">
              50+
            </h3>

            <p className="text-slate-400 mt-2">
              Internship Applicants
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-white">
              99%
            </h3>

            <p className="text-slate-400 mt-2">
              Client Satisfaction
            </p>
          </div>

        </div>

      </div>

    </div>

    {/* Right Image */}
    <div className="absolute inset-0">

      <img
        src="/office-bg.jpg.jpeg"
        alt="Office"
        className="w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Left dark fade */}
           <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

    </div>

  </div>
</section>
  );
}