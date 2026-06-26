
import {
  User,
  FileText,
  Bell,
  Settings,
  LogOut,
  MessageCircle,
  Briefcase
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard() {
const [profileImage, setProfileImage] =
  useState(null);
  const [activeTab, setActiveTab] =
    useState("profile");

  const [internships, setInternships] =
    useState([]);

  const [jobs, setJobs] =
    useState([]);

  const [messages, setMessages] =
    useState([]);

  const [applications, setApplications] =
    useState([]);

  const { user, setUser, logout } = useAuth();

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
  });

  const navigate = useNavigate();

 

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const menuItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
    },
   {
  id: "internships",
  label: "My Internships",
  icon: FileText
},

{
  id: "jobs",
  label: "My Jobs",
  icon: Briefcase
},

     {
      id:"messages",
  icon: MessageCircle,
  label: "Messages",
},
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
   
  ];

  useEffect(() => {

  axios
    .get(
      "http://localhost:5000/api/contact/my-conversations",
      {
        withCredentials: true,
      }
    )
    .then((res) => {

      setMessages(
        res.data.data
      );

    })
    .catch(console.error);

}, []);
  useEffect(() => {

  axios.get(

    "http://localhost:5000/api/careers/my-applications",

    {
      withCredentials: true,
    }

  )

  .then((res) => {

    setJobs(
      res.data.data
    );

  })

  .catch(console.error);

}, []);
  const cancelApplication =
  async (id) => {

    const confirmed =
      window.confirm(

        "Are you sure you want to cancel this application?"

      );

    if (!confirmed) return;

    try {

      await axios.delete(

        `http://localhost:5000/api/internships/cancel/${id}`,

        {
          withCredentials: true,
        }

      );

      setApplications(

        applications.filter(

          (app) =>
            app.id !== id

        )

      );

      alert(
        "Application cancelled successfully"
      );

    } catch (error) {

      alert(

        error.response?.data?.message ||

        "Failed to cancel application"

      );

    }

};
const cancelJobApplication = async (id) => {

  const confirmed = window.confirm(
    "Are you sure you want to cancel this job application?"
  );

  if (!confirmed) return;

  try {

    await axios.delete(
      `http://localhost:5000/api/careers/cancel/${id}`,
      {
        withCredentials: true,
      }
    );

    setJobs(
      jobs.filter((job) => job.id !== id)
    );

    alert("Job application cancelled successfully");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to cancel job application"
    );

  }
};

const deleteMessage =
async (messageId) => {

  const confirmed =
    window.confirm(
      "Delete this message?"
    );

  if (!confirmed) return;

  try {

    await axios.delete(

      `http://localhost:5000/api/contact/message/${messageId}`,

      {
        withCredentials: true,
      }

    );

    setMessages((prev) =>

      prev.map((conv) => ({

        ...conv,

        messages:
          conv.messages.filter(

            (msg) =>
              msg.id !== messageId

          ),

      }))

    );

  } catch (error) {

    console.error(error);

  }

};
const handleProfileUpdate = async () => {
  try {

    const formData = new FormData();

    formData.append(
      "fullName",
      form.fullName
    );

    formData.append(
      "username",
      form.username
    );

    if (profileImage) {
      formData.append(
        "profileImage",
        profileImage
      );
    }

    const { data } = await axios.put(
      "http://localhost:5000/api/auth/update-profile",

      formData,

      {
        withCredentials: true,

        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    setUser(data.user);

    alert(
      "Profile updated successfully"
    );

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Failed to update profile"
    );

  }
};

  useEffect(() => {

  axios.get(

    "http://localhost:5000/api/internships/my-applications",

    {
      withCredentials: true,
    }

  )

  .then((res) =>
    setApplications(res.data)
  );

}, []);

  return (
    <div
  className="
    min-h-screen

    bg-slate-100
    dark:bg-slate-950

    text-slate-900
    dark:text-white

    transition-all duration-500
  "
>

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div
            className="
  bg-white
  dark:bg-slate-900

  rounded-3xl

  border
  border-slate-200
  dark:border-slate-800

  shadow-xl
  p-6
  h-fit

  transition-all duration-300
"
          >

            <div className="text-center">

              <div
               className="
w-20 h-20
mx-auto
rounded-full
bg-blue-400
dark:bg-blue-900/40
flex items-center justify-center
"
              >
               <User
 size={36}
 className="
 text-indigo-600
 dark:text-cyan-400
 "
/>
              </div>

              <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                {user?.fullName}
              </h2>

              <p className="text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>

            </div>

            <div className="mt-10 space-y-3">

              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() =>
                      setActiveTab(item.id)
                    }
                    className={`
                      w-full
                      flex
                      items-center
                      gap-3
                      px-5
                      py-4
                      rounded-2xl
                      transition-all
                      duration-300
                      ${
                       activeTab === item.id
? `
   bg-blue-800
   text-white
   shadow-lg
 `
: `
   text-slate-700
   dark:text-slate-300

   hover:bg-slate-100
   dark:hover:bg-slate-800
 `
                      }
                    `}
                  >
                    <Icon size={20} />

                    {item.label}
                  </button>
                );
              })}

            </div>

            <button
              onClick={handleLogout}
              className="
w-full
mt-10
flex items-center justify-center gap-2
px-5 py-4

rounded-2xl

bg-red-50
dark:bg-red-900/20

text-red-600
dark:text-red-400

hover:bg-red-100
dark:hover:bg-red-900/30

transition-all duration-300
"
            >
              <LogOut size={20} />

              Logout
            </button>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">

            {/* Profile */}
           {activeTab === "profile" && (

  <div
    className="
      bg-white
      dark:bg-slate-900

      rounded-3xl
      p-8

      border
      border-slate-200
      dark:border-slate-800

      shadow-sm
    "
  >

    <h2 className="
      text-3xl
      font-bold

      text-slate-900
      dark:text-white
    ">
      My Profile
    </h2>

    <p className="
      mt-2
      text-slate-500
      dark:text-slate-400
    ">
      Manage your account information.
    </p>

    {/* Profile Avatar */}

 <div className="mt-10 flex flex-col items-center">

  {/* Profile Avatar */}
  <div
    className="
      w-32 h-32
      rounded-full
      overflow-hidden
      border-4 border-blue-700
    "
  >

    {profileImage ? (

      <img
        src={URL.createObjectURL(profileImage)}
        alt="Preview"
        className="w-full h-full object-cover"
      />

    ) : user?.profileImage ? (

      <img
        src={user.profileImage}
        alt="Profile"
        className="w-full h-full object-cover"
      />

    ) : (

      <div
        className="
          w-full h-full
          bg-blue-700
          flex items-center justify-center
          text-4xl
          text-white
          font-bold
        "
      >
        {user?.fullName?.charAt(0)}
      </div>

    )}

  </div>

  {/* Upload Button */}
  <label
    className="
      mt-5
      px-6 py-3
      bg-blue-800
      text-white
      rounded-xl
      cursor-pointer
      hover:bg-blue-900
      transition-all duration-300
    "
  >
    Upload Photo

    <input
      type="file"
      hidden
      accept="image/*"
      onChange={(e) =>
        setProfileImage(e.target.files[0])
      }
    />

  </label>

</div>

    {/* Form */}

    <div className="mt-10 space-y-6">

      {/* Full Name */}

      <div>

        <label className="
          block mb-2

          font-semibold

          text-slate-700
          dark:text-slate-300
        ">
          Full Name
        </label>

        <input
          type="text"

          value={form.fullName}

          onChange={(e) =>
            setForm({
              ...form,
              fullName: e.target.value,
            })
          }

          className="
            w-full
            p-4

            rounded-xl

            bg-slate-100
            dark:bg-slate-800

            border
            border-slate-300
            dark:border-slate-700

            text-slate-900
            dark:text-white
          "
        />

      </div>

      {/* Username */}

      <div>

        <label className="
          block mb-2

          font-semibold

          text-slate-700
          dark:text-slate-300
        ">
          Username
        </label>

        <input
          type="text"

          value={form.username}

          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }

          className="
            w-full
            p-4

            rounded-xl

            bg-slate-100
            dark:bg-slate-800

            border
            border-slate-300
            dark:border-slate-700

            text-slate-900
            dark:text-white
          "
        />

      </div>

      {/* Email */}

      <div>

        <label className="
          block mb-2

          font-semibold

          text-slate-700
          dark:text-slate-300
        ">
          Email Address
        </label>

        <input
          disabled

          value={user?.email}

          className="
            w-full
            p-4

            rounded-xl

            bg-slate-200
            dark:bg-slate-700

            text-slate-500
            dark:text-slate-300
          "
        />

      </div>

      {/* Save Button */}

      <button
        onClick={handleProfileUpdate}

        className="
          w-full

          py-4

          rounded-xl

          bg-blue-800
          hover:bg-blue-900

          text-white
          font-semibold

          transition-all
          duration-300
        "
      >
        Save Changes
      </button>

    </div>

  </div>

)}

            {/* Applications */}
            {activeTab === "internships" && (
              <div
                className="
bg-white
dark:bg-slate-900

rounded-3xl

border
border-slate-200
dark:border-slate-800

shadow-xl

p-8

transition-all duration-300
"
              >

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  My Applications
                </h2>

               <div className="mt-8 space-y-6">

  {applications.length === 0 ? (

    <div className="text-center py-10">

      <p className="text-slate-500 text-lg">
        You haven't applied for any internships yet.
      </p>

    </div>

  ) : (

    applications.map((app) => (

      <div
        key={app.id}
       className="
border
border-slate-200
dark:border-slate-700

bg-slate-50
dark:bg-slate-800/50

rounded-2xl
p-6

hover:shadow-lg

transition-all duration-300
"
      >

        <h3 className="text-xl font-bold">
          {app.internshipRole}
        </h3>

        <p className="mt-2 text-slate-600">
          Applied on:{" "}
          {new Date(
            app.createdAt
          ).toLocaleDateString()}
        </p>

        <div className="mt-4">

          {app.status === "PENDING" && (

            <span
              className="
                inline-block
                px-4 py-2
                rounded-full
                bg-yellow-100
                text-yellow-700
                font-semibold
              "
            >
              Under Review
            </span>

          )}

          {app.status === "APPROVED" && (

            <div>

              <span
                className="
                  inline-block
                  px-4 py-2
                  rounded-full
                  bg-green-100
                  text-green-700
                  font-semibold
                "
              >
                Approved 🎉
              </span>

              <p className="mt-4 text-green-700">

                Congratulations! Your
                application has been approved.
                Our team will contact you
                shortly with the next steps.

              </p>

            </div>

          )}
          {app.status === "PENDING" && (

  <button

    onClick={() =>
      cancelApplication(app.id)
    }

    className="
      mt-4
      px-4
      py-2
      bg-red-600
      text-white
      rounded-lg
      hover:bg-red-700
    "

  >

    Cancel Application

  </button>

)}

          {app.status === "REJECTED" && (

            <div>

              <span
                className="
                  inline-block
                  px-4 py-2
                  rounded-full
                  bg-red-100
                  text-red-700
                  font-semibold
                "
              >
                Rejected
              </span>

              <p className="mt-4 text-red-600">

                Thank you for applying to
                Tec Tha. Although you were
                not selected this time,
                keep building your skills
                and continue exploring new
                opportunities.

              </p>

            </div>

          )}

        </div>

      </div>

    ))

  )}
 
</div>

              </div>

              
            )}
            {/* Job Applications */}
{activeTab === "jobs" && (

  <div
className="
bg-white
dark:bg-slate-900

rounded-3xl

border
border-slate-200
dark:border-slate-800

shadow-xl

p-8

transition-all duration-300
"
  >

    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
      My Job Applications
    </h2>

    <div className="mt-8 space-y-6">

      {jobs.length === 0 ? (

        <div className="text-center py-10">

          <p className="text-slate-500 text-lg">
            You haven't applied for any jobs yet.
          </p>

        </div>

      ) : (

        jobs.map((job) => (

          <div
            key={job.id}
           className="
bg-white
dark:bg-slate-900

p-6
rounded-2xl

border
border-slate-200
dark:border-slate-800

shadow-xl
"
          >

            <h3 className="text-xl font-bold">
              {job.jobRole}
            </h3>

            <p className="mt-2 text-slate-600">
              Applied on:{" "}
              {new Date(
                job.createdAt
              ).toLocaleDateString()}
            </p>

            <p className="mt-2 text-slate-600">
              Qualification: {job.qualification}
            </p>

            <div className="mt-4">

              {job.status === "PENDING" && (

                <>
                  <span
                    className="
                      inline-block
                      px-4 py-2
                      rounded-full
                      bg-yellow-100
                      text-yellow-700
                      font-semibold
                    "
                  >
                    Under Review
                  </span>

                  <button

                    onClick={() =>
                      cancelJobApplication(job.id)
                    }

                    className="
                      ml-4
                      px-4
                      py-2
                      bg-red-600
                      text-white
                      rounded-lg
                      hover:bg-red-700
                    "

                  >

                    Cancel Application

                  </button>
                </>

              )}

              {job.status === "APPROVED" && (

                <div>

                  <span
                    className="
                      inline-block
                      px-4 py-2
                      rounded-full
                      bg-green-100
                      text-green-700
                      font-semibold
                    "
                  >
                    Approved 🎉
                  </span>

                  <p className="mt-4 text-green-700">

                    Congratulations! Your
                    job application has been approved.
                    Our team will contact you shortly.

                  </p>

                </div>

              )}

              {job.status === "REJECTED" && (

                <div>

                  <span
                    className="
                      inline-block
                      px-4 py-2
                      rounded-full
                      bg-red-100
                      text-red-700
                      font-semibold
                    "
                  >
                    Rejected
                  </span>

                  <p className="mt-4 text-red-600">

                    Thank you for applying.
                    We encourage you to apply
                    again in the future.

                  </p>

                </div>

              )}

            </div>

          </div>

        ))

      )}

    </div>

  </div>

)}
            



            {activeTab === "messages" && (

<div className="
bg-white
dark:bg-slate-900

rounded-3xl

border
border-slate-200
dark:border-slate-800

shadow-xl

p-8

transition-all duration-300
">

<h2 className="text-3xl font-bold text-slate-900 dark:text-white">
My Messages
</h2>

{messages.length === 0 ? (

<p>No messages yet</p>

) : (

<div className="space-y-6">

{messages.map((conversation) => (

<div
  key={conversation.id}
  className="
  
    p-5
    space-y-4
    
  "
>

<h3 className="font-bold text-lg space-y-4">
  {conversation.subject}
</h3>

<div className="mt-4 space-y-3">

{conversation.messages.map((msg) => (
  

<div
  key={msg.id}
  className={
   msg.senderType === "ADMIN"
? `
  bg-blue-100
  dark:bg-blue-900/30

  text-slate-900
  dark:text-white

  p-3 rounded-lg
`
: `
  bg-slate-100
  dark:bg-slate-800

  text-slate-900
  dark:text-white

  p-3 rounded-lg
`
  }
>

<p className="font-semibold">
  {msg.senderType}
</p>

<p>{msg.message}</p>

{msg.senderType === "USER" &&
 !conversation.messages.some(
   (m) => m.senderType === "ADMIN"
 ) && (

  <button
    onClick={() =>
      deleteMessage(msg.id)
    }
    className="
      mt-2
      text-red-500
      text-sm
      hover:underline
    "
  >
    Delete
  </button>

)}
</div>


))}

</div>

</div>

))}

</div>

)} 


</div>

)}

            {/* Settings */}
            {activeTab === "settings" && (
              <div
              className="
bg-white
dark:bg-slate-900

rounded-3xl

border
border-slate-200
dark:border-slate-800

shadow-xl

p-8

transition-all duration-300
"
              >

                <h2 className="text-3xl font-bold">
                  Settings
                </h2>

                <p className="mt-6 text-slate-600">
                  Account settings and
                  preferences will appear here.
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

