import { ContextProvider } from '@/context/Context'
import './globals.css'
import type { Metadata } from 'next'
import {DM_Mono, Inter, Sora } from 'next/font/google'

const sora = Sora({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Protofy Parser',
  description: 'Parse a PDF file using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
