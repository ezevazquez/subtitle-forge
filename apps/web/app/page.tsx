"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  Button,
  FileInput,
  LanguageSelect,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  LoadingSpinner,
} from "@subtitleforge/ui"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export default function Page() {
  const [file, setFile] = useState<File | null>(null)
  const [language, setLanguage] = useState<string>("es")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validTypes = ["text/plain", "text/vtt", "video/vtt"]
      if (
        validTypes.includes(selectedFile.type) ||
        selectedFile.name.endsWith(".txt") ||
        selectedFile.name.endsWith(".vtt")
      ) {
        setFile(selectedFile)
        setError(null)
      } else {
        setError("Por favor sube un archivo .txt o .vtt válido")
        setFile(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !language) {
      setError("Por favor completa todos los campos")
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("targetLanguage", language)

      const response = await fetch(`${API_BASE_URL}/api/convert`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Error al procesar el archivo")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "subtitles.srt"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setSuccess(true)
      setFile(null)
      setLanguage("es")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-blue-600">SubtitleForge</CardTitle>
            <p className="text-center text-sm text-slate-600 mt-2">Convierte y traduce subtítulos de YouTube</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FileInput
                ref={fileInputRef}
                label="Archivo de Transcripción"
                description="Sube un archivo .txt o .vtt con la transcripción"
                accept=".txt,.vtt"
                onChange={handleFileChange}
              />
              {file && (
                <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Archivo seleccionado:</strong> {file.name}
                  </p>
                </div>
              )}
              <LanguageSelect label="Idioma Destino" value={language} onChange={(e) => setLanguage(e.target.value)} />
              {error && (
                <div className="p-3 bg-red-50 rounded-md border border-red-200">
                  <p className="text-sm text-red-900">{error}</p>
                </div>
              )}
              {success && (
                <div className="p-3 bg-green-50 rounded-md border border-green-200">
                  <p className="text-sm text-green-900">¡Éxito! Descarga iniciada.</p>
                </div>
              )}
              <Button
                type="submit"
                disabled={!file || !language || loading}
                className="w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Procesando...
                  </>
                ) : (
                  "Convertir y Traducir"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="mt-6 text-center text-sm text-slate-600">
          <p>Powered by deepseek-chat-v3.1 + OpenRouter</p>
        </div>
      </div>
    </div>
  )
}
