"use client"

import React, { useRef } from "react"
import { cn } from "./utils"

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, description, className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-foreground mb-2">{label}</label>}
        <input
          type="file"
          ref={ref || inputRef}
          className={cn(
            "block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100",
            className,
          )}
          {...props}
        />
        {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      </div>
    )
  },
)

FileInput.displayName = "FileInput"
