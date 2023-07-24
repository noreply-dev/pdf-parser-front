import './globals.css'
import type { Metadata } from 'next'
import { Fira_Code, Inter, Sora } from 'next/font/google'

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
      <body className={sora.className}>{children}</body>
    </html>
  )
}
