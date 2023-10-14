import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/ThemeProvider'
import React from 'react'

function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <ThemeProvider disableTransitionOnChange attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </ClerkProvider>
    )
}

export default DashboardGroupLayout
