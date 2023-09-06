import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import DashboardNavbar from '@/components/DashboardNavbar'
import ValueProvider from '@/components/context/context'
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';


export const metadata = {
    title: 'Dashboard - sideproject.ai',

}


const necto = localFont({
    src: '../fonts/Necto-Mono.woff2',
    display: 'swap',
    variable: "--font-necto"
  });


  
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body className={` ${necto.variable} bg-slate-200`}>{children}</body>
            </ClerkProvider>
            <Analytics />
        </html>
    )
}
