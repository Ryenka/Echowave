import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AudioProvider } from "./context/AudioContext"
import { PlaylistProvider } from "./context/PlaylistContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EchoWave - Music Platform",
  description: "A music platform for discovering and sharing audio"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlaylistProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </PlaylistProvider>
      </body>
    </html>
  )
}