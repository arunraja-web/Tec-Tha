import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="bg-white">

      {/* Hero Section */}
     <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-16">

  <span className="text-[#324896] font-semibold tracking-[0.25em] uppercase text-lg">
    About Us
  </span>

  <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
    We Build Digital Solutions
    <br />
    That Matter
  </h1>

</div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
           <div className="max-w-xl">

  <p className="text-lg text-slate-600 leading-relaxed">
    Tec Tha is a technology-driven company dedicated to creating
    innovative web and mobile solutions. We empower businesses
    with scalable digital products that accelerate growth and
    enhance customer experiences.
  </p>

  <Link
    to="/#contact"
    className="inline-block mt-8 px-8 py-4 bg-[#324896] text-white rounded-xl font-semibold hover:bg-[#26376E] transition"
  >
    Contact Us
  </Link>

</div> 
          

          <div>
            <img
              src="/about-team.jpg"
              alt="About Tec Tha"
              className="w-full rounded-3xl shadow-2xl"
            />
          </div>

        </div>
      </section>
            {/* Who Are We */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <img
              src="/who-we-are.jpg"
              alt="Who We Are"
              className="w-full rounded-3xl shadow-2xl"
            />
          </div>

          <div>
            <span className="text-[#324896] font-semibold tracking-widest uppercase">
              Who Are We?
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Passionate About Technology
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              At Tec Tha, we are a team of passionate developers,
              designers and innovators committed to delivering
              high-quality digital experiences. Our expertise spans
              web development, mobile applications and modern
              software solutions.
            </p>

            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              We believe in collaboration, creativity and continuous
              improvement to help our clients achieve their goals.
            </p>
          </div>

        </div>
      </section>
            {/* Core Values */}
      <section className="bg-slate-50 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">
            <span className="text-[#324896] font-semibold tracking-widest uppercase">
              Our Values
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              What Drives Us Forward
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "Innovation",
              "Quality",
              "Teamwork",
              "Growth",
              "Client Focus",
              "On-Time Delivery",
            ].map((value) => (
              <div
                key={value}
                className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition"
              >
                <div className="w-12 h-1 bg-[#324896] rounded-full mb-6"></div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {value}
                </h3>

                <p className="mt-4 text-slate-600">
                  We uphold strong principles that guide every project
                  and help us deliver exceptional results.
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
}