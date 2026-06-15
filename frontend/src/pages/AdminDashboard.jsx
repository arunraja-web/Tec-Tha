import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [active, setActive] = useState("Dashboard");

  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });

  const [applications, setApplications] = useState([]);

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

  const updateApplicationStatus = async (
    id,
    status
  ) => {

    try {

      await axios.patch(

        `http://localhost:5000/api/internships/${id}/status`,

        {
          status,
        },

        {
          withCredentials: true,
        }

      );

      const updatedApplications =
        applications.map((app) =>

          app.id === id

            ? {
                ...app,
                status,
              }

            : app

        );

      setApplications(
        updatedApplications
      );

     setCounts({

  pending: apps.filter(
    (app) =>
      app.status === "PENDING"
  ).length,

  approved: apps.filter(
    (app) =>
      app.status === "APPROVED"
  ).length,

  rejected: apps.filter(
    (app) =>
      app.status === "REJECTED"
  ).length,

  total: apps.length,

});

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update status"
      );

    }

  };

  useEffect(() => {

    axios.get(

      "http://localhost:5000/api/internships",

      {
        withCredentials: true,
      }

    )

    .then((res) => {

    const apps = res.data.data || res.data || [];

      setApplications(apps);

      setCounts({

        pending:
          apps.filter(
            (app) =>
              app.status ===
              "PENDING"
          ).length,

        approved:
          apps.filter(
            (app) =>
              app.status ===
              "APPROVED"
          ).length,

        rejected:
          apps.filter(
            (app) =>
              app.status ===
              "REJECTED"
          ).length,

        total:
          apps.length,

      });

    })

    .catch((error) => {

      console.error(
        "Failed to fetch applications:",
        error
      );

    });

  }, []);

  const handleStatusChange = (
    id,
    status
  ) => {

    const action =
      status === "APPROVED"
        ? "approve"
        : "reject";

    const confirmed =
      window.confirm(

        `Are you sure you want to ${action} this application?`

      );

    if (!confirmed) return;

    updateApplicationStatus(
      id,
      status
    );

  };
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
        {/* Internships */}
{active === "Internships" && (
  <div className="bg-white p-6 shadow rounded-xl overflow-x-auto">

    <h3 className="text-2xl font-semibold mb-5">
      Internship Applications
    </h3>

<div className="grid md:grid-cols-4 gap-5 mb-6">

  {/* Pending */}
  <div
    className="
      bg-yellow-50
      border border-yellow-200
      rounded-xl
      p-5
    "
  >

    <p className="
      text-yellow-700
      font-medium
    ">
      Pending
    </p>

    <h2 className="
      text-4xl
      font-bold
      mt-2
    ">
      {counts.pending}
    </h2>

  </div>

  {/* Approved */}
  <div
    className="
      bg-green-50
      border border-green-200
      rounded-xl
      p-5
    "
  >

    <p className="
      text-green-700
      font-medium
    ">
      Approved
    </p>

    <h2 className="
      text-4xl
      font-bold
      mt-2
    ">
      {counts.approved}
    </h2>

  </div>

  {/* Rejected */}
  <div
    className="
      bg-red-50
      border border-red-200
      rounded-xl
      p-5
    "
  >

    <p className="
      text-red-700
      font-medium
    ">
      Rejected
    </p>

    <h2 className="
      text-4xl
      font-bold
      mt-2
    ">
      {counts.rejected}
    </h2>

  </div>

  {/* Total */}
  <div
    className="
      bg-blue-50
      border border-blue-200
      rounded-xl
      p-5
    "
  >

    <p className="
      text-blue-700
      font-medium
    ">
      Total
    </p>

    <h2 className="
      text-4xl
      font-bold
      mt-2
    ">
      {counts.total}
    </h2>

  </div>

</div>
    
<div className="flex gap-3">

  {/* View Sheet */}
  <a
    href="https://docs.google.com/spreadsheets/d/1YoqOicq_gXU_NM07vl133eBFQj-uSnlk3qs6k2Eg6S0/edit"
    target="_blank"
    rel="noopener noreferrer"
    className="
      px-4 py-2
      bg-green-600
      text-white
      rounded-xl
      hover:bg-green-700
      transition-all
    "
  >
    📊 View Sheet
  </a>

  {/* Download Sheet */}
  <a
    href="https://docs.google.com/spreadsheets/d/1YoqOicq_gXU_NM07vl133eBFQj-uSnlk3qs6k2Eg6S0/export?format=xlsx"
    className="
      px-4 py-2
      bg-blue-600
      text-white
      rounded-xl
      hover:bg-blue-700
      transition-all
    "
  >
    ⬇️ Download Sheet
  </a>

</div>

    {applications.length === 0 ? (

      <p>No applications found.</p>

    ) : (

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">
              Name
            </th>

            <th className="text-left py-3">
              Role
            </th>

            <th className="text-left py-3">
              College
            </th>

            <th className="text-left py-3">
              Status
            </th>

            <th className="text-left py-3">
              Resume
            </th>

          </tr>

        </thead>

        <tbody>

          {applications.map((app) => (

            <tr
              key={app.id}
              className="border-b"
            >

              <td className="py-4">
                {app.fullName}
              </td>

              <td>
                {app.internshipRole}
              </td>

              <td>
                {app.college}
              </td>

              <td>

                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${
                      app.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : app.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >

                  {app.status}

                </span>

              </td>

             <td className="space-x-2">

  <a
    href={`http://localhost:5000${app.resumeUrl}`}
    target="_blank"
    rel="noopener noreferrer"
    className="
      px-3 py-2
      bg-blue-600
      text-white
      rounded-lg
    "
  >
    View Resume
  </a>

  <button
  onClick={() =>
    handleStatusChange(
      app.id,
      "APPROVED"
    )
  }
  className="
    px-3 py-2
    bg-green-600
    text-white
    rounded-lg
  "
>
  Approve
</button>
<button
  onClick={() =>
    handleStatusChange(
      app.id,
      "REJECTED"
    )
  }
  className="
    px-3 py-2
    bg-red-600
    text-white
    rounded-lg
  "
>
  Reject
</button>

</td>

            </tr>

          ))}

        </tbody>

      </table>

    )}

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