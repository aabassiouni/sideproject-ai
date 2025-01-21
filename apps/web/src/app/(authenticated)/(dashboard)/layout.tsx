import { ThemeProvider } from "@/components/ThemeProvider";
import type React from "react";

function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider disableTransitionOnChange attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default DashboardGroupLayout;
