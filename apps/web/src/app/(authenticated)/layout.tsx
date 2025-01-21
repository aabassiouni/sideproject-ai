import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import "../globals.css";

const azeret = localFont({
  src: "../../fonts/AzeretMonoVF.woff2",
  display: "swap",
  variable: "--font-azeret",
});

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${azeret.variable}`}>
        <ClerkProvider>
          <ThemeProvider disableTransitionOnChange attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
      <Analytics />
    </html>
  );
}

export default AuthLayout;
