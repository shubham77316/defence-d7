import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import LoadingSpinner from "../common/LoadingSpinner";

export default function AdminLayout() {
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <LoadingSpinner size="lg" text="Verifying Strategic Clearance..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col lg:flex-row">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10 max-w-[1550px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
