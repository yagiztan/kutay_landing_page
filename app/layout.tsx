import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KUTAY ROKET TAKIMI | Pushing the Boundaries of High Altitude",
  description:
    "Kutay Roket Takımı - Havacılık ve uzay mühendisliğinin geleceğini şekillendiren Türk roket takımı. İnovasyon, takım çalışması ve mühendislik mükemmelliği.",
  generator: "v0.app",
  keywords: ["roket", "uzay", "havacılık", "mühendislik", "Türkiye", "aerospace", "rocket team"],
  icons: {
    icon: [
      {
        url: "/proje16.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/proje16.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/proje16.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
