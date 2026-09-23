import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex overflow-x-hidden">
      <Sidebar
        user={user}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0">
        <Header
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 md:p-6 xl:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;