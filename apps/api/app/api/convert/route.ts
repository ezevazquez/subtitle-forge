import { type NextRequest, NextResponse } from "next/server"
import { parseTranscriptToBlocks, convertBlocksToSrt } from "@subtitleforge/utils"
import { translateText } from "@/lib/openrouter"

// Función para obtener headers CORS dinámicos
function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin")
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_WEB_URL,
    "http://localhost:3000",
  ].filter(Boolean)

  // Permitir el origen si está en la lista o si es un dominio vercel.app
  const isAllowed =
    origin &&
    (allowedOrigins.some((allowed) => origin === allowed) ||
      origin.includes("vercel.app"))

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0] || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
  }
}

// Manejar preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(request),
  })
}

export async function POST(request: NextRequest) {
  const corsHeaders = getCorsHeaders(request)
  
  try {
    const contentType = request.headers.get("content-type")
    if (!contentType?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type debe ser multipart/form-data" },
        { status: 400, headers: corsHeaders },
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const targetLanguage = formData.get("targetLanguage") as string

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó archivo" }, { status: 400, headers: corsHeaders })
    }

    if (!targetLanguage) {
      return NextResponse.json({ error: "No se proporcionó idioma destino" }, { status: 400, headers: corsHeaders })
    }

    const fileContent = await file.text()

    if (!fileContent.trim()) {
      return NextResponse.json({ error: "El archivo está vacío" }, { status: 400, headers: corsHeaders })
    }

    const blocks = parseTranscriptToBlocks(fileContent)

    if (blocks.length === 0) {
      return NextResponse.json({ error: "No se encontraron subtítulos en el archivo" }, { status: 400, headers: corsHeaders })
    }

    const textToTranslate = blocks.map((b) => b.text).join("\n---SEPARATOR---\n")

    console.log(`[v0] Iniciando traducción de ${blocks.length} bloques al idioma: ${targetLanguage}`)

    let translatedText: string
    try {
      translatedText = await translateText(textToTranslate, targetLanguage)
    } catch (error) {
      console.error("[v0] Error en traducción:", error)
      return NextResponse.json({ error: "Error al traducir el contenido" }, { status: 500, headers: corsHeaders })
    }

    const translatedTexts = translatedText.split("---SEPARATOR---").map((t) => t.trim())

    if (translatedTexts.length !== blocks.length) {
      console.warn(
        `[v0] Mismatch en cantidad de bloques: esperado ${blocks.length}, obtenido ${translatedTexts.length}`,
      )
    }

    const translatedBlocks = blocks.map((block, index) => ({
      ...block,
      text: translatedTexts[index] || block.text,
    }))

    const srtContent = convertBlocksToSrt(translatedBlocks)

    return new NextResponse(srtContent, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": 'attachment; filename="subtitles.srt"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("[v0] Error en /api/convert:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500, headers: corsHeaders })
  }
}
