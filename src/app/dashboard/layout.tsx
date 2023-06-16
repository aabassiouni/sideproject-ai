import DashboardNavbar from '@/components/DashboardNavbar'
import ValueProvider from '@/components/context/context'
import React from 'react'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ValueProvider>
            <div className="h-screen">
                {/* @ts-ignore */}
                <DashboardNavbar />
                {children}
            </div>
        </ValueProvider>
    )
}

export default DashboardLayout
