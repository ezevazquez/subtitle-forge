import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./critical-styles.css"

export const metadata: Metadata = {
  title: "SubtitleForge",
  description: "Convierte y traduce subtítulos de YouTube",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-slate-50">{children}</body>
    </html>
  )
}
