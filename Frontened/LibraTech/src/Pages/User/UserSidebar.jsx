import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-black text-white min-h-screen fixed left-0 top-0">

        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-green-500">
            LibraTech
          </h1>
        </div>

        {/* Admin text */}
        <div className="px-6 py-5">
          <p className="text-xs text-gray-500 uppercase">
           Member
          </p>

          <p className="text-sm text-gray-300 mt-1">
            Library Management
          </p>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2">

          <NavLink
            to="/user"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <span>🏠</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/user/allbooks"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <span>📚</span>
            <span>AllBooks</span>
          </NavLink>

          <NavLink
            to="/user/my-books"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`
            }
          >
            <span>👥</span>
            <span>My Books</span>
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-4 right-4">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 transition"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* ================= RIGHT SIDE ================= */}
      <main className="ml-64 flex-1 min-h-screen">

        {/* Top Header */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Member Panel
            </h2>

            <p className="text-sm text-gray-500">
              Manage your library
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="font-bold text-green-700">
                M
              </span>
            </div>

            <div>
              <p className="font-semibold text-gray-800">
                Member
              </p>

              <p className="text-xs text-gray-500">
                User
              </p>
            </div>

          </div>

        </header>

        {/* Current Page */}
        <div className="p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
}