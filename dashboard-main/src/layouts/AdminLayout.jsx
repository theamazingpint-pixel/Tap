import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col bg-gray-50">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
