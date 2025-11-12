"use client"

import React from "react"
import { cn } from "./utils"

const LANGUAGES = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  ru: "Русский",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
}

interface LanguageSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export const LanguageSelect = React.forwardRef<HTMLSelectElement, LanguageSelectProps>(
  ({ label, className, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-foreground mb-2">{label}</label>}
      <select
        ref={ref}
        className={cn(
          "w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        {...props}
      >
        <option value="">Seleccionar idioma...</option>
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  ),
)

LanguageSelect.displayName = "LanguageSelect"
