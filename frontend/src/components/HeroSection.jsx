export default function HeroSection() {
  return (
    <section
  id="home"
  className="h-screen pt-20 bg-white overflow-hidden"
>
     <div className="relative flex items-center h-full">

        {/* Left Content */}
<div className="relative z-20 w-full lg:w-[45%] px-8 lg:pl-40 lg:pr-12">
         <h1 className="
text-4xl
md:text-5xl
lg:text-7xl
font-extrabold
leading-tight
text-slate-900
">
            <span className="text-slate-900">
              Building Digital
            </span>
           
           
          

            <span className="block bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Products That
            </span>

            <span className="block bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Scale
            </span>
          </h1>

          <p className="
mt-6
text-base
md:text-lg
text-slate-700
leading-relaxed
max-w-xl
">
            Tec Tha helps startups, entrepreneurs and businesses
            build modern web applications, mobile apps and custom
            software solutions that drive growth.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex gap-5">

            <button className="px-8 py-4 bg-black text-white rounded-md font-semibold hover:bg-slate-800 transition">
              Get Started
            </button>

            <button className="px-8 py-4 border-2 border-black text-black rounded-md font-semibold hover:bg-slate-50 transition">
              View Projects
            </button>

          </div>

          {/* Stats */}
      <div className="mt-14 grid grid-cols-3 gap-1 md:gap-25">

            <div>
              <h3 className="text-5xl font-bold">
                25+
              </h3>
              <p className="text-slate-500 mt-2">
                Projects Delivered
              </p>
            </div>

            <div className="border-l border-slate-300 pl-10">
              <h3 className="text-5xl font-bold">
                10+
              </h3>
              <p className="text-slate-500 mt-2">
                Happy Clients
              </p>
            </div>

            <div className="border-l border-slate-300 pl-10">
              <h3 className="text-5xl font-bold">
                99%
              </h3>
              <p className="text-slate-500 mt-2">
                Client Satisfaction
              </p>
            </div>

          </div>

        </div>

        {/* Right Image */}
        <div className="absolute top-0 right-0 w-[65%] h-full">

          <img
            src="/office.png"
            alt="Office"
            className="w-full h-full object-cover"
          />

          {/* Soft Fade Near Text */}
          <div
            className="absolute left-0 top-0 h-full w-48"
            style={{
              background:
                "linear-gradient(to right, white 0%, rgba(255,255,255,0) 100%)",
            }}
          />

        </div>

      </div>
    </section>
  );
}