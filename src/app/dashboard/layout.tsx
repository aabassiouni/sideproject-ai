import DashboardNavbar from '@/components/DashboardNavbar'
import ValueProvider from '@/components/context/context'
import React from 'react'
import { Toaster } from "@/components/ui/toaster"

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ValueProvider>
            <div className="h-screen">
                {/* @ts-ignore */}
                <DashboardNavbar />
                {children}
            </div>
            <Toaster />
        </ValueProvider>
    )
}

export default DashboardLayout
