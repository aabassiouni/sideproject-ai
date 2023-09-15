import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'sideprojectAI',
    authors: [{name: 'Ali Bassiouni'}],
    metadataBase: new URL('https://usesideprojectai.com'),
    openGraph: {
        title: 'SideprojectAI',
        description: 'AI Generated Resume Bullet points for your sideprojects!',
        url: 'https://usesideprojectai.com',
        images: [
            {
                url: 'https://usesideprojectai.com/opengraph-image',
                width: 1200,
                height: 630,
            },
        ],
        type: 'website',
        siteName: 'SideprojectAI',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SideprojectAI',
        description: 'AI generated resume bullet points for your sideprojects',
        images: ['https://usesideprojectai.com/twitter-image'],
    }
}


  const necto = localFont({
    src: '../fonts/AzeretMonoVF.woff2',
    display: 'swap',
    variable: "--font-necto",
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
