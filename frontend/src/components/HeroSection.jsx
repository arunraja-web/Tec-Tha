export default function HeroSection() {
  return (
   <section className="relative min-h-screen overflow-hidden bg-white">
  <div className="grid lg:grid-cols-2 min-h-screen">

    {/* Left Content */}
    <div className="max-w-[1600px] mx-auto w-full flex items-center px-12 lg:px-40 py-24 z-10 ">

      <div className="max-w-2xl ">

      <br></br> <br></br><h1 className="text-6xl lg:text-7xl font-extrabold leading-tight text-white ">
          Building Digital
          <br />

          <span className="bg-gradient-to-r from-blue-200 to-blue-200 bg-clip-text text-transparent ">
            Products That
          </span>

          <br />
          Scale
        </h1>

        <p className="mt-8 text-xl text-slate-300 leading-relaxed">
          Tec Tha helps startups, entrepreneurs and businesses build
          modern web applications, mobile apps and custom software
          solutions that drive growth.
        </p>

        <div className="mt-10 flex flex-wrap gap-5">

          <button className="px-8 py-4 bg-white text-black font-semibold  hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
  Get Started
</button>

          <button className="px-8 py-4 border border-slate-500 text-white  font-semibold hover:bg-white/10 transition">
            View Projects
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
              10+
            </h3>

            <p className="text-slate-400 mt-2">
              Happy Clients
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
        src="/office.png"
        alt="Office"
        className="w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Left dark fade */}
      <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />

    </div>

  </div>
</section>
  );
}