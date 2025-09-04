import React from "react";
import { Home, Users, FileText, X, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const nav = [
  { to: "/", icon: <Home size={18} />, label: "Dashboard" },
  { to: "/subscribers", icon: <Users size={18} />, label: "Subscribers" },
  { to: "/editions", icon: <FileText size={18} />, label: "Editions" },
];

export default function Sidebar({ isOpen, closeSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed z-50 top-0 left-0 h-full bg-white border-r w-64 transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="p-5 relative flex items-center justify-center">
          <h1 className="text-2xl font-semibold mx-auto">TAP</h1>

          {/* Close Button - only for mobile */}
          {closeSidebar && (
            <button
              className="lg:hidden absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
              onClick={closeSidebar}
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="p-4 flex flex-col justify-between h-[calc(100%-80px)]">
          <ul className="space-y-1">
            {nav.map((n) => {
              const active = location.pathname === n.to;
              return (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                      active
                        ? "bg-gray-100 font-semibold text-black"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {n.icon}
                    <span>{n.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logout Button */}
          <div className="mt-4 pt-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition w-full"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
