import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function InternshipApply() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "",
    internshipRole: "",
    skills: "",
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
        skills: "",
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

  return (
    <div className="min-h-screen bg-slate-100 py-20 px-6">

      <div className="max-w-3xl mx-auto bg-white p-10 shadow-lg">

        <h1 className="text-4xl font-bold mb-8">
          Internship Application
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border p-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-3"
            required
          />

          <input
            type="text"
            name="college"
            placeholder="College Name"
            value={form.college}
            onChange={handleChange}
            className="w-full border p-3"
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="w-full border p-3"
            required
          />

          <input
            type="text"
            name="year"
            placeholder="Current Year"
            value={form.year}
            onChange={handleChange}
            className="w-full border p-3"
            required
          />

          <select
            name="internshipRole"
            value={form.internshipRole}
            onChange={handleChange}
            className="w-full border p-3"
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

          <textarea
            name="skills"
            placeholder="Skills"
            value={form.skills}
            onChange={handleChange}
            className="w-full border p-3"
          />

          <input
            type="text"
            name="github"
            placeholder="GitHub Profile"
            value={form.github}
            onChange={handleChange}
            className="w-full border p-3"
          />

          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn Profile"
            value={form.linkedin}
            onChange={handleChange}
            className="w-full border p-3"
          />

          <input
            type="file"
            name="resume"
            accept=".pdf"
            onChange={handleChange}
            className="w-full border p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4"
          >
            {loading
              ? "Submitting..."
              : "Apply Now"}
          </button>

        </form>

      </div>

    </div>
  );
}