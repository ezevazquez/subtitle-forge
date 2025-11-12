import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SubtitleForge API",
  description: "Backend API para SubtitleForge",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
