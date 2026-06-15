
import {
  User,
  FileText,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard() {
  const [activeTab, setActiveTab] =
    useState("profile");

  const { user, logout } = useAuth();
const [applications, setApplications] =
  useState([]);
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
      id: "applications",
      label: "My Applications",
      icon: FileText,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];
  
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
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div
            className="
              bg-white
              rounded-3xl
              shadow-lg
              p-6
              h-fit
            "
          >

            <div className="text-center">

              <div
                className="
                  w-20 h-20
                  mx-auto
                  rounded-full
                  bg-indigo-100
                  flex items-center justify-center
                "
              >
                <User
                  size={36}
                  className="text-indigo-600"
                />
              </div>

              <h2 className="mt-4 text-xl font-bold">
                {user?.fullName}
              </h2>

              <p className="text-slate-500">
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
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-slate-100"
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
                flex
                items-center
                justify-center
                gap-2
                px-5
                py-4
                rounded-2xl
                bg-red-50
                text-red-600
                hover:bg-red-100
                transition-all
                duration-300
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
                  rounded-3xl
                  shadow-lg
                  p-8
                "
              >

                <h2 className="text-3xl font-bold">
                  My Profile
                </h2>

                <div className="mt-8 space-y-6">

                  <div>
                    <p className="text-slate-500">
                      Full Name
                    </p>

                    <p className="text-xl font-semibold">
                      {user?.fullName}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Username
                    </p>

                    <p className="text-xl font-semibold">
                      {user?.username}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Email
                    </p>

                    <p className="text-xl font-semibold">
                      {user?.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Role
                    </p>

                    <p className="text-xl font-semibold">
                      {user?.role}
                    </p>
                  </div>

                </div>

              </div>
            )}

            {/* Applications */}
            {activeTab === "applications" && (
              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-8
                "
              >

                <h2 className="text-3xl font-bold">
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
          rounded-2xl
          p-6
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

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-8
                "
              >

                <h2 className="text-3xl font-bold">
                  Notifications
                </h2>

                <div className="mt-8 space-y-5">

                  <div className="border rounded-2xl p-5">
                    Your internship application
                    has been submitted successfully.
                  </div>

                  <div className="border rounded-2xl p-5">
                    Stay tuned for future updates.
                  </div>

                </div>

              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-8
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

