import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import DashboardNavbar from '@/components/DashboardNavbar'
import ValueProvider from '@/components/context/context'

export const metadata = {
    title: 'Dashboard - sideproject.ai',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body className="h-screen bg-slate-200">{children}</body>
            </ClerkProvider>
        </html>
    )
}
