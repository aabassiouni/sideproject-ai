import DashboardNavbar from "@/components/DashboardNavbar";
import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import type React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="h-screen">
        <DashboardNavbar />
        {children}
      </div>
      <Toaster />
    </Providers>
  );
}

export default DashboardLayout;
