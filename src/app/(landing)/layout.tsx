import Navbar from '@/components/Navbar'
import React from 'react'

function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col">
            <Navbar />
            {children}
        </div>
    )
}

export default LandingLayout
