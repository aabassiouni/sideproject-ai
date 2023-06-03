import DashboardNavbar from '@/components/DashboardNavbar'
import ValueProvider from '@/components/context/context'
import React from 'react'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ValueProvider >
        <div className="flex h-screen flex-col">
            <DashboardNavbar />
            {children}
        </div>
        </ValueProvider>
    )
}

export default DashboardLayout
