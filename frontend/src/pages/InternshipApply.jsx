import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function InternshipApply() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "",
    internshipRole: "",
    github: "",
    linkedin: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      await axios.post(
        "http://localhost:5000/api/internships/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Application submitted successfully!");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        department: "",
        year: "",
        internshipRole: "",
        github: "",
        linkedin: "",
        resume: null,
      });
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full border border-slate-400 rounded-xl px-4 py-3 bg-white text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative py-10 px-6"
      style={{
        backgroundImage: "url('/office-bg2.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Back Button */}
<button
  onClick={() => navigate("/")}
  className="
    mb-8
    ml-[-50px]
    flex
    items-center
    gap-2
    bg-white/90
    backdrop-blur-md
    text-black
    px-6
    py-3
    rounded-full
    font-bold
    text-lg
    shadow-lg
    hover:bg-white
    hover:scale-105
    transition-all
    duration-300
  "
>
  ← Internship
</button>

        {/* Form Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10">
          <h1 className="text-4xl font-bold text-center text-slate-900 mb-3">
            Internship Application
          </h1>

          <p className="text-center text-slate-500 mb-10">
            Complete the form below to apply for your desired internship opportunity.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            {/* College */}
            <input
              type="text"
              name="college"
              placeholder="College Name"
              value={form.college}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            {/* Department */}
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            {/* Year */}
            <input
              type="text"
              name="year"
              placeholder="Current Year"
              value={form.year}
              onChange={handleChange}
              className={inputStyle}
              required
            />
                        {/* GitHub */}
            <input
              type="text"
              name="github"
              placeholder="GitHub Profile"
              value={form.github}
              onChange={handleChange}
              className={inputStyle}
            />

            {/* LinkedIn */}
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Profile"
              value={form.linkedin}
              onChange={handleChange}
              className={inputStyle}
            />

            {/* Internship Role */}
            <div className="md:col-span-2">
              <select
                name="internshipRole"
                value={form.internshipRole}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">
                  Select Internship Role
                </option>

                <option value="Frontend Developer">
                  Frontend Developer
                </option>

                <option value="Backend Developer">
                  Backend Developer
                </option>

                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>

                <option value="UI/UX Designer">
                  UI/UX Designer
                </option>
              </select>
            </div>

            {/* Resume Upload */}
            <div className="md:col-span-2">
              <label className="block mb-3 text-sm font-medium text-slate-700">
                Upload Resume (PDF)
              </label>

              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-slate-400
                  rounded-xl
                  px-4
                  py-3
                  bg-white
                  file:mr-4
                  file:px-4
                  file:py-2
                  file:rounded-lg
                  file:border-0
                  file:bg-slate-900
                  file:text-white
                  file:cursor-pointer
                  cursor-pointer
                "
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                md:col-span-2
                w-full
                bg-slate-900
                hover:bg-blue-600
                text-white
                py-4
                rounded-xl
                font-semibold
                text-lg
                transition-all
                duration-300
                hover:shadow-xl
              "
            >
              {loading
                ? "Submitting..."
                : "Submit Application"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}