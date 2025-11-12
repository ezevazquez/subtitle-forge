import OpenAI from "openai"

export const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
    "X-Title": "SubtitleForge",
  },
})

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
        content: `Traduce el siguiente texto al ${targetLangName}. Mantén saltos de línea intactos. No modifiques tiempos ni estructura. Solo devuelve el texto traducido sin explicaciones adicionales:

${text}`,
      },
    ],
  })

  const content = completion.choices[0]?.message?.content
  if (!content) {
    throw new Error("No se recibió contenido de la API")
  }

  return content.trim()
}
