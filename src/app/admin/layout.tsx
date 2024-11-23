import AdminSidebar from "@/components/admin/products/AdminSidebar";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgriGuard Admin Dashboard",
  description: "This is an AgriGuard Admin Dashboard",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="overflow-height flex items-start justify-between overflow-hidden">
      <div className="overflow-height w-16 lg:w-1/5 bg-customGreen text-white p-1 lg:p-5">
        <AdminSidebar />
      </div>
      <div
        className="hidden sm:block h-full"
        style={{
          borderLeft: "4px solid #ffff00",
        }}
      ></div>
      <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
