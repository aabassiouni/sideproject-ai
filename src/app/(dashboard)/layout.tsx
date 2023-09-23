import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
        {children}
    </ClerkProvider>
  )
}

export default DashboardGroupLayout