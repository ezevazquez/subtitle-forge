import OpenAI from "openai"

export const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
    "X-Title": "SubtitleForge",
  },
})

/**
 * Limpia el texto traducido eliminando caracteres problemáticos:
 * - Barras invertidas \ residuales
 * - Caracteres } al final
 * - Líneas vacías o con solo escapes
 * - Normaliza saltos de línea
 */
export function cleanTranslatedText(text: string): string {
  if (!text) return text

  // Eliminar caracteres } al final
  let cleaned = text.replace(/}+$/, "")

  // Dividir en líneas y limpiar cada una
  const lines = cleaned.split("\n").map((line) => {
    // Trim cada línea
    let cleanedLine = line.trim()
    // Eliminar todas las barras invertidas residuales (el modelo a veces las agrega incorrectamente)
    cleanedLine = cleanedLine.replace(/\\/g, "")
    return cleanedLine
  })

  // Filtrar líneas vacías (líneas fantasma que rompen el alineamiento)
  const filteredLines = lines.filter((line) => line.length > 0)

  // Unir las líneas limpias
  cleaned = filteredLines.join("\n")

  // Trim final
  return cleaned.trim()
}

export async function translateText(text: string, targetLanguage: string): Promise<string> {
  const languageNames: Record<string, string> = {
    es: "español",
    en: "English",
    fr: "francés",
    de: "alemán",
    it: "italiano",
    pt: "portugués",
    ru: "ruso",
    ja: "japonés",
    ko: "coreano",
    zh: "chino",
  }

  const targetLangName = languageNames[targetLanguage] || targetLanguage

  const completion = await openrouter.chat.completions.create({
    model: "deepseek/deepseek-chat",
    max_tokens: 4096,
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `Traduce el siguiente texto al idioma ${targetLangName}. NO detectes automáticamente el idioma. Traduce EXACTAMENTE al ${targetLangName}. Mantén saltos de línea intactos. No modifiques tiempos ni estructura. Solo devuelve el texto traducido sin explicaciones adicionales, sin barras invertidas, sin caracteres JSON, sin formato adicional:

${text}`,
      },
    ],
  })

  const content = completion.choices[0]?.message?.content
  if (!content) {
    throw new Error("No se recibió contenido de la API")
  }

  // Aplicar limpieza antes de retornar
  return cleanTranslatedText(content)
}
