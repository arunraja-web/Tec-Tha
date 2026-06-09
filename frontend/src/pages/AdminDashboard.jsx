import { useState } from "react";

export default function AdminDashboard() {
  const [active, setActive] = useState("Dashboard");

  const menu = [
    "Dashboard",
    "Users",
    "Internships",
    "Jobs",
    "Feedbacks",
    "Contacts",
    "Email Center",
    "Analytics",
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <aside className="w-72 bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-10">
          Tec Tha
        </h1>

        <nav className="space-y-3">
          {menu.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left px-4 py-3 transition ${
                active === item
                  ? "bg-white text-black"
                  : "hover:bg-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">
            {active}
          </h2>

          <button className="px-5 py-3 bg-black text-white">
            Logout
          </button>
        </div>

        {/* Dashboard */}
        {active === "Dashboard" && (
          <>
            <div className="grid md:grid-cols-4 gap-6">

              <div className="bg-white p-6 shadow">
                <h3 className="text-slate-500">Visitors</h3>
                <p className="text-4xl font-bold mt-2">2,345</p>
              </div>

              <div className="bg-white p-6 shadow">
                <h3 className="text-slate-500">Users</h3>
                <p className="text-4xl font-bold mt-2">850</p>
              </div>

              <div className="bg-white p-6 shadow">
                <h3 className="text-slate-500">Applications</h3>
                <p className="text-4xl font-bold mt-2">120</p>
              </div>

              <div className="bg-white p-6 shadow">
                <h3 className="text-slate-500">Feedbacks</h3>
                <p className="text-4xl font-bold mt-2">55</p>
              </div>

            </div>

            <div className="bg-white mt-8 p-6 shadow">
              <h3 className="text-xl font-semibold mb-4">
                Recent Activity
              </h3>

              <ul className="space-y-3">
                <li>New Internship Application - Arun</li>
                <li>New Contact Request - Kumar</li>
                <li>New User Registered - Priya</li>
              </ul>
            </div>
          </>
        )}

        {/* Users */}
        {active === "Users" && (
          <div className="bg-white p-6 shadow">
            <h3 className="text-2xl font-semibold mb-5">
              All Users
            </h3>

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Name</th>
                  <th className="text-left py-3">Email</th>
                  <th className="text-left py-3">Role</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-3">Arun</td>
                  <td>arun@gmail.com</td>
                  <td>USER</td>
                  <td>
                    <button className="text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Internships */}
        {active === "Internships" && (
          <div className="bg-white p-6 shadow">
            <h3 className="text-2xl font-semibold mb-5">
              Internship Applications
            </h3>

            <p>No applications found.</p>
          </div>
        )}

        {/* Jobs */}
        {active === "Jobs" && (
          <div className="bg-white p-6 shadow">
            <h3 className="text-2xl font-semibold mb-5">
              Job Applications
            </h3>

            <p>No job applications found.</p>
          </div>
        )}

        {/* Feedbacks */}
        {active === "Feedbacks" && (
          <div className="bg-white p-6 shadow">
            <h3 className="text-2xl font-semibold mb-5">
              Feedbacks
            </h3>

            <p>No feedbacks available.</p>
          </div>
        )}

        {/* Contacts */}
        {active === "Contacts" && (
          <div className="bg-white p-6 shadow">
            <h3 className="text-2xl font-semibold mb-5">
              Contact Requests
            </h3>

            <p>No contact requests.</p>
          </div>
        )}

        {/* Email Center */}
        {active === "Email Center" && (
          <div className="bg-white p-6 shadow">

            <h3 className="text-2xl font-semibold mb-5">
              Send Email
            </h3>

            <input
              type="email"
              placeholder="Recipient"
              className="w-full border p-3 mb-4"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full border p-3 mb-4"
            />

            <textarea
              rows="6"
              placeholder="Message"
              className="w-full border p-3 mb-4"
            />

            <button className="px-6 py-3 bg-black text-white">
              Send Email
            </button>

          </div>
        )}

        {/* Analytics */}
        {active === "Analytics" && (
          <div className="bg-white p-6 shadow">
            <h3 className="text-2xl font-semibold mb-5">
              Analytics
            </h3>

            <p>Monthly Growth Chart Coming Soon...</p>
          </div>
        )}

      </main>
    </div>
  );
}