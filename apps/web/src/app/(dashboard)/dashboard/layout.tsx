import DashboardNavbar from "@/components/DashboardNavbar";
import ValueProvider from "@/components/context/context";
import { Toaster } from "@/components/ui/toaster";
import type React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ValueProvider>
      <div className="h-screen">
        <div className="bg-late-200">
          <DashboardNavbar />
        </div>
        {children}
      </div>
      <Toaster />
    </ValueProvider>
  );
}

export default DashboardLayout;
