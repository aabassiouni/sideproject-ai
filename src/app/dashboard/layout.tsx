import DashboardNavbar from '@/components/DashboardNavbar'
import ValueProvider from '@/components/context/context'
import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/ThemeProvider'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider disableTransitionOnChange attribute="class" defaultTheme="system" enableSystem>
            <ValueProvider>
                <div className="h-screen">
                    {/* @ts-ignore */}
                    <div className='bg-late-200'>

                    <DashboardNavbar />
                    </div>
                    {children}
                </div>
                <Toaster />
            </ValueProvider>
        </ThemeProvider>
    )
}

export default DashboardLayout
