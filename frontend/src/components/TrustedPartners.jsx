import {
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaAirbnb,
  FaSpotify,
  FaFacebook,
} from "react-icons/fa";



export default function TrustedPartners() {
 const companies = [
  {
    name: "Google",
    icon: <FaGoogle className="text-[#4285F4]" />,
  },

  {
    name: "Microsoft",
    icon: <FaMicrosoft className="text-[#00A4EF]" />,
  },

  {
    name: "Amazon",
    icon: <FaAmazon className="text-[#FF9900]" />,
  },

  {
    name: "Facebook",
    icon: <FaFacebook className="text-[#1877F2]" />,
  },

  {
    name: "Airbnb",
    icon: <FaAirbnb className="text-[#FF5A5F]" />,
  },

  {
    name: "Spotify",
    icon: <FaSpotify className="text-[#1DB954]" />,
  },
];

  return (
    <section className="py-14 bg-white dark:bg-[#020817] overflow-hidden">
        <div className="text-center mb-10">
  <p className="uppercase tracking-[5px] text-blue-600 font-bold">
    Trusted Worldwide
  </p>

  <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
    Trusted Company Partners
  </h2>
</div>
      <div className="flex animate-scroll whitespace-nowrap">
        {[...companies, ...companies].map((company, index) => (
          <div
            key={index}
            className="
mx-6
min-w-[220px]
h-24

flex
items-center
justify-center
gap-4

bg-white/80
dark:bg-slate-900/80

border
border-slate-200
dark:border-slate-700

rounded-2xl

shadow-sm
hover:shadow-xl

transition-all
duration-300
"
          >
            <div className="text-5xl">{company.icon}</div>
            <span className="text-xl font-semibold text-slate-800 dark:text-white">
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}