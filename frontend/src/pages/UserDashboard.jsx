import { useState } from "react";
import {
  User,
  FileText,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [activeTab, setActiveTab] =
    useState("profile");

  const { user, logout } = useAuth();

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

                  <div
                    className="
                      border
                      rounded-2xl
                      p-6
                    "
                  >

                    <h3 className="text-xl font-bold">
                      Frontend Developer Intern
                    </h3>

                    <p className="mt-2 text-slate-600">
                      Applied on: 14 June 2026
                    </p>

                    <span
                      className="
                        inline-block
                        mt-4
                        px-4
                        py-2
                        rounded-full
                        bg-yellow-100
                        text-yellow-700
                        font-semibold
                      "
                    >
                      Pending
                    </span>

                  </div>

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