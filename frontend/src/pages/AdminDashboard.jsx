import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function AdminDashboard() {
const [replyLoading, setReplyLoading] =
  useState(false);
  const [contacts, setContacts] =
useState([]);
const sendEmail = async () => {

  try {

    setSending(true);

    await axios.post(

      "http://localhost:5000/api/admin/send-email",

      emailData,

      {
        withCredentials: true,
      }

    );

    toast.success("Email sent successfully");

    setEmailData({
      recipient: "",
      subject: "",
      message: "",
      sendToAll: false,
    });

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to send email"
    );

  } finally {

    setSending(false);

  }

};
const [emailData, setEmailData] = useState({
  recipient: "",
  subject: "",
  message: "",
  sendToAll: false,
});

const [sending, setSending] = useState(false);
const [dashboardStats, setDashboardStats] =
  useState({

    totalUsers: 0,

    totalInternships: 0,

    totalJobs: 0,

    totalContacts: 0,

  });
  const fetchDashboardStats =
  async () => {

    try {

      const [

        usersRes,
        internshipRes,
        jobsRes,
        contactRes,

      ] = await Promise.all([

        axios.get(
          "http://localhost:5000/api/user/all",
          { withCredentials: true }
        ),

        axios.get(
          "http://localhost:5000/api/internships",
          { withCredentials: true }
        ),

        axios.get(
          "http://localhost:5000/api/careers",
          { withCredentials: true }
        ),

        axios.get(
  "http://localhost:5000/api/contact/all",
  { withCredentials: true }
),

      ]);

      setDashboardStats({

        totalUsers:
          usersRes.data.data.length,

        totalInternships:
          internshipRes.data.length,

        totalJobs:
          jobsRes.data.data.length,

        totalContacts:
          contactRes.data.data.length,

      });

    } catch (error) {

      console.log(error);

    }

  };
  useEffect(() => {

  fetchDashboardStats();

}, []);
const [users, setUsers] = useState([]);
useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/user/all",
      {
        withCredentials: true,
      }
    );

    setUsers(res.data.data);

  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (id) => {

  try {

    await axios.delete(

      `http://localhost:5000/api/user/${id}`,

      {
        withCredentials: true,
      }

    );

    setUsers(

      users.filter(
        (u) => u.id !== id
      )

    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to delete user"
    );

  }

};
  const [active, setActive] = useState("Dashboard");
  const [jobs, setJobs] = useState([]);
  const totalJobs = jobs.length;
 
const pendingJobs =
  jobs.filter(
    (job) =>
      job.status === "PENDING"
  ).length;

const approvedJobs =
  jobs.filter(
    (job) =>
      job.status === "APPROVED"
  ).length;

const rejectedJobs =
  jobs.filter(
    (job) =>
      job.status === "REJECTED"
  ).length;
  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });

  const [replyText, setReplyText] =
useState("");

const [selectedContact,
setSelectedContact] =
useState(null);
  const [applications, setApplications] = useState([]);

  const menu = [
    "Dashboard",
    "Users",
    "Internships",
    "Jobs",

    "Contacts",
    "Email Center",
    
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

  const updateJobStatus = async (
  id,
  status
) => {

  try {

    await axios.patch(

      `http://localhost:5000/api/careers/${id}/status`,

      { status },

      {
        withCredentials: true,
      }

    );

    setJobs((prev) =>

      prev.map((job) =>

        job.id === id

          ? {
              ...job,
              status,
            }

          : job

      )

    );

  } catch (error) {

    console.error(error);

    alert(
      "Failed to update status"
    );

  }

};

  const sendReply = async () => {
    

  try {
    

    setReplyLoading(true);
    

    await axios.post(

      `http://localhost:5000/api/contact/reply/${selectedContact.id}`,

      {
        message: replyText,
      },

      {
        withCredentials: true,
      }

    );

    alert(
      "Reply sent successfully"
    );
     await axios.post(

  `http://localhost:5000/api/contact/reply/${selectedContact.id}`,

  {
    message: replyText,
  },

  {
    withCredentials: true,
  }

);

setContacts((prev) =>
  prev.map((contact) =>
    contact.id === selectedContact.id
      ? {
          ...contact,
          status: "ADMIN_REPLIED",
        }
      : contact
  )
);
    setReplyText("");
    setSelectedContact(null);

  } catch (error) {

    console.error(error);

    alert(
      "Failed to send reply"
    );

  } finally {

    setReplyLoading(false);

  }

};

useEffect(() => {

  axios.get(

    "http://localhost:5000/api/careers/all",

    {
      withCredentials: true,
    }

  )

  .then((res) => {

    setJobs(res.data.data);

  })

  .catch(console.error);

}, []);
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
    axios
.get(
  "http://localhost:5000/api/contact/all",
  {
    withCredentials: true,
  }
)
.then((res) => {

  setContacts(
    res.data.data
  );

})
.catch(console.error);

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
      <aside className="w-72 bg-blue-900 text-white p-6">
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

        
        </div>

      {active === "Dashboard" && (

  <div className="space-y-8">

    {/* Welcome Banner */}

    <div
      className="
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        text-white
        rounded-3xl
        p-8
        shadow-lg
      "
    >

      <h1 className="text-4xl font-bold">
        Welcome Back, Admin 👋
      </h1>

      <p className="mt-3 text-lg opacity-90">
        Manage users, applications, jobs,
        and contacts from one place.
      </p>

      <p className="mt-4 text-sm opacity-80">
        {new Date().toLocaleString()}
      </p>

    </div>

    {/* Stats Cards */}

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
    >

      <div className="bg-blue-100 p-6 rounded-3xl shadow">

        <h3 className="text-gray-600">
          Total Users
        </h3>

        <p className="text-5xl font-bold text-blue-700 mt-3">
          {users.length}
        </p>

      </div>

      <div className="bg-green-100 p-6 rounded-3xl shadow">

        <h3 className="text-gray-600">
          Internship Applications
        </h3>

        <p className="text-5xl font-bold text-green-700 mt-3">
          {applications.length}
        </p>

      </div>

      <div className="bg-yellow-100 p-6 rounded-3xl shadow">

        <h3 className="text-gray-600">
          Job Applications
        </h3>

        <p className="text-5xl font-bold text-yellow-700 mt-3">
          {jobs.length}
        </p>

      </div>

      <div className="bg-purple-100 p-6 rounded-3xl shadow">

        <h3 className="text-gray-600">
          Contact Requests
        </h3>

        <p className="text-5xl font-bold text-purple-700 mt-3">
          {contacts.length}
        </p>

      </div>

    </div>

    {/* Quick Actions */}

    <div className="bg-white rounded-3xl p-8 shadow">

      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-5
        "
      >

        <button
          onClick={() =>
            setActive("Internships")
          }
          className="
            bg-blue-50
            hover:bg-blue-100
            rounded-2xl
            p-6
            text-left
            transition
          "
        >
          <h3 className="font-bold text-xl">
            🎓 Internships
          </h3>

          <p className="mt-2 text-gray-600">
            Manage internship applications
          </p>

        </button>

        <button
          onClick={() =>
            setActive("Jobs")
          }
          className="
            bg-yellow-50
            hover:bg-yellow-100
            rounded-2xl
            p-6
            text-left
            transition
          "
        >
          <h3 className="font-bold text-xl">
            💼 Jobs
          </h3>

          <p className="mt-2 text-gray-600">
            Manage job applications
          </p>

        </button>

        <button
          onClick={() =>
            setActive("Users")
          }
          className="
            bg-green-50
            hover:bg-green-100
            rounded-2xl
            p-6
            text-left
            transition
          "
        >
          <h3 className="font-bold text-xl">
            👥 Users
          </h3>

          <p className="mt-2 text-gray-600">
            Manage registered users
          </p>

        </button>

        <button
          onClick={() =>
            setActive("Contacts")
          }
          className="
            bg-purple-50
            hover:bg-purple-100
            rounded-2xl
            p-6
            text-left
            transition
          "
        >
          <h3 className="font-bold text-xl">
            📩 Contacts
          </h3>

          <p className="mt-2 text-gray-600">
            Reply to user messages
          </p>

        </button>

      </div>

    </div>

    {/* Recent Activities */}

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
      "
    >

      {/* Recent Internships */}

      <div className="bg-white p-6 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          Recent Internship Applications
        </h2>

        <div className="space-y-4">

          {applications
            .slice(0, 5)
            .map((app) => (

              <div
                key={app.id}
                className="
                  border-b
                  pb-3
                "
              >

                <h4 className="font-semibold">
                  {app.fullName}
                </h4>

                <p className="text-gray-500 text-sm">
                  {app.internshipRole}
                </p>

              </div>

            ))}

        </div>

      </div>

      {/* Recent Jobs */}

      <div className="bg-white p-6 rounded-3xl shadow">

        <h2 className="text-2xl font-bold mb-5">
          Recent Job Applications
        </h2>

        <div className="space-y-4">

          {jobs
            .slice(0, 5)
            .map((job) => (

              <div
                key={job.id}
                className="
                  border-b
                  pb-3
                "
              >

                <h4 className="font-semibold">
                  {job.fullName}
                </h4>

                <p className="text-gray-500 text-sm">
                  {job.jobRole}
                </p>

              </div>

            ))}

        </div>

      </div>

    </div>

  </div>

)}

        {/* Users */}
       {/* Users */}
{active === "Users" && (

  <div className="bg-white p-6 rounded-xl shadow">

    <h2 className="text-2xl font-bold mb-5">
      All Users
    </h2>

    {/* Counts */}

    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

      <div className="bg-blue-100 p-5 rounded-xl">

        <h4 className="text-gray-600">
          Total Users
        </h4>

        <p className="text-3xl font-bold text-blue-700">
          {users.length}
        </p>

      </div>

      <div className="bg-green-100 p-5 rounded-xl">

        <h4 className="text-gray-600">
          Students
        </h4>

        <p className="text-3xl font-bold text-green-700">

          {
            users.filter(
              (u) =>
                u.userType === "STUDENT"
            ).length
          }

        </p>

      </div>

      <div className="bg-yellow-100 p-5 rounded-xl">

        <h4 className="text-gray-600">
          Job Seekers
        </h4>

        <p className="text-3xl font-bold text-yellow-700">

          {
            users.filter(
              (u) =>
                u.userType === "JOB_SEEKER"
            ).length
          }

        </p>

      </div>

      <div className="bg-purple-100 p-5 rounded-xl">

        <h4 className="text-gray-600">
          Clients
        </h4>

        <p className="text-3xl font-bold text-purple-700">

          {
            users.filter(
              (u) =>
                u.userType === "CLIENT"
            ).length
          }

        </p>

      </div>

    </div>

    {/* Sheet Buttons */}

    <div className="flex gap-4 mb-6">

      <a

        href="https://docs.google.com/spreadsheets/d/1iYx6mTngyFhrq7GHJ3lSUDG0cLdcppjsQWJ3U--z_0U/edit"

        target="_blank"

        rel="noopener noreferrer"

        className="
          bg-green-600
          text-white
          px-5 py-3
          rounded-xl
          hover:bg-green-700
        "

      >

        📊 View Sheet

      </a>

      <a

        href="https://docs.google.com/spreadsheets/d/1iYx6mTngyFhrq7GHJ3lSUDG0cLdcppjsQWJ3U--z_0U/export?format=xlsx"

        className="
          bg-blue-600
          text-white
          px-5 py-3
          rounded-xl
          hover:bg-blue-700
        "

      >

        ⬇️ Download Sheet

      </a>

    </div>

    {/* Table */}

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-4">
              Name
            </th>

            <th className="text-left py-4">
              Email
            </th>

            <th className="text-left py-4">
              Role
            </th>

            <th className="text-left py-4">
              User Type
            </th>

            <th className="text-left py-4">
              Joined On
            </th>

            <th className="text-left py-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-b"
            >

              <td className="py-4">
                {user.fullName}
              </td>

              <td>
                {user.email}
              </td>

              <td>
                {user.role}
              </td>

              <td>

                <span
                  className="
                    px-3 py-1
                    rounded-full
                    bg-slate-100
                  "
                >

                  {user.userType ||
                    "Not Specified"}

                </span>

              </td>

              <td>

                {new Date(
                  user.createdAt
                ).toLocaleDateString()}

              </td>

              <td>

                <button

                  onClick={() =>
                    deleteUser(
                      user.id
                    )
                  }

                  className="
                    text-red-600
                    hover:text-red-800
                    font-medium
                  "

                >

                  Delete

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

)}
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
        {/* Jobs */}
{active === "Jobs" && (

  <div className="bg-white p-6 shadow rounded-xl overflow-x-auto">

    <h3 className="text-2xl font-semibold mb-5">
      Job Applications
    </h3>
    <div
  className="
    grid
    grid-cols-1
    md:grid-cols-4
    gap-5
    mb-8
  "
>

  {/* Total */}

  <div
    className="
      bg-blue-100
      rounded-xl
      p-5
    "
  >

    <h4 className="text-gray-600">
      Total
    </h4>

    <p
      className="
        text-3xl
        font-bold
        text-blue-700
      "
    >
      {totalJobs}
    </p>

  </div>

  {/* Pending */}

  <div
    className="
      bg-yellow-100
      rounded-xl
      p-5
    "
  >

    <h4 className="text-gray-600">
      Pending
    </h4>

    <p
      className="
        text-3xl
        font-bold
        text-yellow-700
      "
    >
      {pendingJobs}
    </p>

  </div>

  {/* Approved */}

  <div
    className="
      bg-green-100
      rounded-xl
      p-5
    "
  >

    <h4 className="text-gray-600">
      Approved
    </h4>

    <p
      className="
        text-3xl
        font-bold
        text-green-700
      "
    >
      {approvedJobs}
    </p>

  </div>

  {/* Rejected */}

  <div
    className="
      bg-red-100
      rounded-xl
      p-5
    "
  >

    <h4 className="text-gray-600">
      Rejected
    </h4>

    <p
      className="
        text-3xl
        font-bold
        text-red-700
      "
    >
      {rejectedJobs}
    </p>

  </div>

</div>
     <div className="flex gap-6">

  {/* View Sheet */}
  <a
    href="https://docs.google.com/spreadsheets/d/15Jp35ApZFAD37HRcgW7mb0cZhkK_W1R_js6yzbjBhes/edit"
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
    href="https://docs.google.com/spreadsheets/d/15Jp35ApZFAD37HRcgW7mb0cZhkK_W1R_js6yzbjBhes/export?format=xlsx"
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

    {jobs.length === 0 ? (

      <p>No job applications found.</p>

    ) : (

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">Name</th>

            <th className="text-left py-3">Role</th>

            <th className="text-left py-3">Qualification</th>

            <th className="text-left py-3">Experience</th>

            <th className="text-left py-3">Status</th>

            <th className="text-left py-3">Resume</th>

          </tr>
          
          
        </thead>

        <tbody>
         <br></br>
         
    
          {jobs.map((job) => (

            <tr
              key={job.id}
              className="border-b"
            >

              <td className="py-4">
                {job.fullName}
              </td>

              <td>
                {job.jobRole}
              </td>

              <td>
                {job.qualification}
              </td>

              <td>
                {job.experience}
              </td>

              <td>

                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${
                      job.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : job.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >

                  {job.status}

                </span>

              </td>

              <td className="space-x-2">

                <a
                  href={`http://localhost:5000/${job.resumeUrl}`}
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
                    updateJobStatus(
                      job.id,
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
                    updateJobStatus(
                      job.id,
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

      

      {/* Contacts */}
{active === "Contacts" && (

  <div className="bg-white p-6 rounded-xl shadow">

    <h2 className="text-2xl font-bold mb-5">
      Contact Requests
    </h2>

    {contacts.length === 0 ? (

      <p>No contact requests</p>

    ) : (

      <div className="space-y-4">

        {contacts.map((contact) => (

          <div
            key={contact.id}
            className="
              border
              rounded-xl
              p-5
              bg-white
              hover:shadow-md
              transition
            "
          >

            <div className="flex items-center justify-between">

  <h3 className="font-bold text-lg">
    {contact.user?.fullName}
  </h3>

  {contact.status === "ADMIN_REPLIED" ? (

    <span
      className="
        px-3 py-1
        bg-green-100
        text-green-700
        rounded-full
        text-sm
        font-semibold
      "
    >
      Replied
    </span>

  ) : (

    <span
      className="
        px-3 py-1
        bg-yellow-100
        text-yellow-700
        rounded-full
        text-sm
        font-semibold
      "
    >
      Pending
    </span>

  )}

</div>

            <p className="text-sm text-blue-600">
              {contact.user?.email}
            </p>

            <p className="mt-2 font-semibold">
              {contact.subject}
            </p>

            <div
  className="
    mt-3
    bg-slate-50
    border
    border-slate-200
    rounded-xl
    p-4
    whitespace-pre-line
  "
>
  {contact.messages?.[0]?.message}
</div>

            <button
              onClick={() =>
                setSelectedContact(contact)
              }
              className="
                mt-4
                px-4
                py-2
                bg-blue-600
                text-white
                rounded-lg
                hover:bg-blue-700
              "
            >
              Reply
            </button>

          </div>

        ))}

      </div>

    )}

    {/* Reply Modal */}
    {selectedContact && (

      <div
        className="
          fixed inset-0
          bg-black/40
          flex items-center
          justify-center
          z-50
        "
      >

        <div
          className="
            bg-white
            p-6
            rounded-xl
            w-[500px]
            shadow-xl
          "
        >

          <h3 className="text-xl font-bold">
            Reply to {selectedContact.user?.fullName}
          </h3>

          <textarea
            value={replyText}
            onChange={(e) =>
              setReplyText(e.target.value)
            }
            rows={5}
            placeholder="Type your reply..."
            className="
              w-full
              border
              rounded-lg
              p-3
              mt-4
            "
          />

          <div
            className="
              flex
              justify-end
              gap-3
              mt-4
            "
          >

            <button
              onClick={() =>
                setSelectedContact(null)
              }
              className="
                px-4 py-2
                bg-gray-300
                rounded-lg
              "
            >
              Cancel
            </button>

           <button
  onClick={sendReply}
  disabled={replyLoading}
  className="
    px-4 py-2
    bg-blue-600
    text-white
    rounded-lg
    disabled:opacity-60
  "
>

  {replyLoading ? (

    <div className="flex items-center gap-2">

      <div
        className="
          w-4 h-4
          border-2
          border-white
          border-t-transparent
          rounded-full
          animate-spin
        "
      />

      Sending...

    </div>

  ) : (

    "Send Reply"

  )}

</button>

          </div>

        </div>

      </div>

    )}

  </div>

)}
        {/* Email Center */}
{active === "Email Center" && (

  <div className="bg-white p-8 rounded-3xl shadow-lg">

    <div className="mb-8">

      <h2 className="text-3xl font-bold text-slate-800">
        📧 Email Center
      </h2>

      <p className="text-slate-500 mt-2">
        Send announcements, updates, and notifications to users.
      </p>

    </div>

    {/* Recipient */}

    <div className="mb-5">

      <label className="block mb-2 font-medium text-slate-700">
        Recipient Email
      </label>

      <input
        type="email"
        placeholder="example@gmail.com"
        value={emailData.recipient}
        onChange={(e) =>
          setEmailData({
            ...emailData,
            recipient: e.target.value,
          })
        }
        className="
          w-full
          border
          border-slate-300
          rounded-xl
          p-4
          focus:ring-2
          focus:ring-blue-500
          outline-none
        "
      />

    </div>

    {/* Send to All */}

    <div className="mb-5 flex items-center gap-3">

      <input
        type="checkbox"
        checked={emailData.sendToAll}
        onChange={(e) =>
          setEmailData({
            ...emailData,
            sendToAll: e.target.checked,
          })
        }
        className="w-5 h-5"
      />

      <label className="text-slate-700 font-medium">
        Send Email to All Registered Users
      </label>

    </div>

    {/* Subject */}

    <div className="mb-5">

      <label className="block mb-2 font-medium text-slate-700">
        Subject
      </label>

      <input
        type="text"
        placeholder="Enter email subject"
        value={emailData.subject}
        onChange={(e) =>
          setEmailData({
            ...emailData,
            subject: e.target.value,
          })
        }
        className="
          w-full
          border
          border-slate-300
          rounded-xl
          p-4
          focus:ring-2
          focus:ring-blue-500
          outline-none
        "
      />

    </div>

    {/* Message */}

    <div className="mb-6">

      <label className="block mb-2 font-medium text-slate-700">
        Message
      </label>

      <textarea
        rows="8"
        placeholder="Type your message here..."
        value={emailData.message}
        onChange={(e) =>
          setEmailData({
            ...emailData,
            message: e.target.value,
          })
        }
        className="
          w-full
          border
          border-slate-300
          rounded-xl
          p-4
          focus:ring-2
          focus:ring-blue-500
          outline-none
        "
      />

    </div>

    {/* Button */}

    <button
      onClick={sendEmail}
      disabled={sending}
      className="
        w-full
        bg-slate-900
        hover:bg-blue-600
        text-white
        py-4
        rounded-xl
        font-semibold
        text-lg
        transition-all
      "
    >

      {sending
        ? "Sending Email..."
        : "📨 Send Email"}

    </button>

  </div>

)}

     
        

      </main>
    </div>
  );
}