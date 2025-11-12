export interface SubtitleBlock {
  index: number
  start: string
  end: string
  text: string
}

/**
 * Detecta si el contenido es VTT o texto plano
 * VTT tiene líneas con timestamps como: 00:00:12.450 --> 00:00:18.500
 */
export function isVTTFormat(content: string): boolean {
  return /\d{1,2}:\d{2}:\d{2}\.\d{3}\s+-->\s+\d{1,2}:\d{2}:\d{2}\.\d{3}/.test(content)
}

/**
 * Parsea transcripción VTT a bloques de subtítulos
 */
function parseVTT(content: string): SubtitleBlock[] {
  const blocks: SubtitleBlock[] = []
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line)

  let index = 1
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Buscar línea de timestamps
    const timestampMatch = line.match(/(\d{1,2}:\d{2}:\d{2}\.\d{3})\s+-->\s+(\d{1,2}:\d{2}:\d{2}\.\d{3})/)

    if (timestampMatch) {
      const start = timestampMatch[1]
      const end = timestampMatch[2]

      // Recopilar texto hasta la siguiente línea vacía o timestamp
      const textLines: string[] = []
      i++

      while (i < lines.length) {
        const nextLine = lines[i]
        if (nextLine.match(/\d{1,2}:\d{2}:\d{2}\.\d{3}\s+-->/)) {
          break
        }
        if (nextLine) {
          textLines.push(nextLine)
        }
        i++
      }

      if (textLines.length > 0) {
        blocks.push({
          index,
          start,
          end,
          text: textLines.join("\n"),
        })
        index++
      }

      continue
    }

    i++
  }

  return blocks
}

/**
 * Parsea texto plano con timestamps tipo YouTube
 * Formato: [00:00:12] Texto
 */
function parsePlainText(content: string): SubtitleBlock[] {
  const blocks: SubtitleBlock[] = []
  const lines = content.split("\n").filter((line) => line.trim())

  let index = 1
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const match = line.match(/\[(\d{1,2}):(\d{2}):(\d{2})\]/)

    if (match) {
      const hours = Number.parseInt(match[1], 10)
      const minutes = Number.parseInt(match[2], 10)
      const seconds = Number.parseInt(match[3], 10)

      // Timestamp en formato HH:MM:SS.000
      const start = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.000`

      // Calcular end time (próximo timestamp o +5 segundos)
      let end: string
      if (i + 1 < lines.length) {
        const nextMatch = lines[i + 1].match(/\[(\d{1,2}):(\d{2}):(\d{2})\]/)
        if (nextMatch) {
          const nextSeconds =
            Number.parseInt(nextMatch[3], 10) +
            Number.parseInt(nextMatch[2], 10) * 60 +
            Number.parseInt(nextMatch[1], 10) * 3600
          const currentSeconds = seconds + minutes * 60 + hours * 3600
          const diff = Math.max(nextSeconds - currentSeconds, 5)
          const endTime = new Date(diff * 1000).toISOString().substr(11, 12)
          end = `${String(Math.floor(currentSeconds + diff) / 3600).padStart(2, "0")}:${String(Math.floor((currentSeconds + diff) % 3600) / 60).padStart(2, "0")}:${String((currentSeconds + diff) % 60).padStart(2, "0")}.000`
        } else {
          end = `${String(hours).padStart(2, "0")}:${String(minutes + 1).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.000`
        }
      } else {
        end = `${String(hours).padStart(2, "0")}:${String(minutes + 1).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.000`
      }

      const text = line.replace(/\[\d{1,2}:\d{2}:\d{2}\]\s*/, "").trim()

      if (text) {
        blocks.push({
          index,
          start,
          end,
          text,
        })
        index++
      }
    }
  }

  return blocks
}

/**
 * Parsea cualquier formato de transcripción a bloques SRT
 */
export function parseTranscriptToBlocks(content: string): SubtitleBlock[] {
  if (!content || content.trim().length === 0) {
    return []
  }

  if (isVTTFormat(content)) {
    return parseVTT(content)
  }

  return parsePlainText(content)
}
