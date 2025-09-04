import React from "react";
import { Menu, Search, Bell, Settings } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="w-full px-4 py-2 bg-white border-b shadow-sm flex justify-between items-center">
      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>

        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-md px-3 py-1 w-64">
          <Search size={16} className="text-gray-500" />
          <input
            className="bg-transparent outline-none text-sm flex-1"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings size={20} />
        </button>
        <img
          src="/admin-5.png"
          alt="profile"
          className="w-6 h-6 rounded-full object-cover"
        />
      </div>
    </header>
  );
}
