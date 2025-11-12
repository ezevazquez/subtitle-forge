export interface SubtitleBlock {
  index: number
  start: string
  end: string
  text: string
}

/**
 * Convierte timestamp VTT (00:00:12.450) a SRT (00:00:12,450)
 * Cambia el punto por coma en los milisegundos
 */
export function toSrtTimestamp(timestamp: string): string {
  return timestamp.replace(".", ",")
}

/**
 * Convierte bloques de subtítulos a formato SRT válido
 */
export function convertBlocksToSrt(blocks: SubtitleBlock[]): string {
  return blocks
    .map((block) => {
      const start = toSrtTimestamp(block.start)
      const end = toSrtTimestamp(block.end)
      return `${block.index}\n${start} --> ${end}\n${block.text}\n`
    })
    .join("\n")
}
