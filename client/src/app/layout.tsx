import '../styles/globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Drug Interaction Checker',
  description: 'Check potential interactions between prescription drugs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body //className={inter.className}
      >
        {children}
      </body>
    </html>
  )
}
