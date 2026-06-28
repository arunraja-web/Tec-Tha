export default function HeroSection({ darkMode}) {
 
  return (
<section className="relative min-h-screen overflow-hidden">
    <div className="grid lg:grid-cols-2 min-h-screen">


    {/* Left Content */}
    <div
  className="
    max-w-[1600px]
    mx-auto
    w-full
    flex
    items-center

    px-6
    sm:px-10
    lg:px-40

    py-24
    z-10
  "
>

      <div className="max-w-2xl "><br></br> 

      <br></br> <br></br><br></br><h2
  className="
    text-4xl
    sm:text-5xl
    lg:text-7xl
    font-semibold
    leading-tight
    text-black
    dark:text-white
  "
>
          We Transform 
          <br />

          <span className="bg-gradient-to-r text-black bg-clip-text dark:text-white ">
            Ideas into 
          </span>

          <br />
          <span className="bg-gradient-to-r font-bold text-blue-800 dark:text-blue-700 bg-clip-text  ">
          Technology</span>
        </h2>

        <p className="mt-8 text-xl text-slate-400 leading-relaxed">
          Tec Tha helps startups, entrepreneurs and businesses build
          modern web applications, mobile apps and custom software
          solutions that drive growth.
        </p>

        <div className="mt-10 flex flex-wrap gap-5">

       <a
  href="#contact"
  className="
    inline-block
    px-8 py-4
    bg-blue-800
    text-white
    rounded-xl
    font-bold
  "
>
  Book a Consultation →
</a>


        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap gap-12">

          <div>
            <h3 className="text-5xl font-bold text-black dark:text-white">
              25+
            </h3>

            <p className="text-slate-900 mt-2 dark:text-white">
              Projects Delivered
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-black dark:text-white">
              50+
            </h3>

            <p className="text-slate-900 mt-2 dark:text-white">
              Internship Applicants
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-black dark:text-white">
              99%
            </h3>

            <p className="text-slate-900 mt-2 dark:text-white">
              Client Satisfaction
            </p>
          </div>

        </div>

      </div>

    </div>

    {/* Right Image */}
        <div className="absolute inset-0 -z-10">
    <img
      src={darkMode ? "/hero-dark1.png" : "/office-bg1.png"}
      alt="Hero Background"
      className="
        w-full
        h-full
        object-cover
        object-center
      "
    />
    

    </div>

  </div>
</section>
  );
}