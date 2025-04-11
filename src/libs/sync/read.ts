import { readFileSync } from 'node:fs'

const read = (
  path: string
): string | undefined => {
  try {
    const data = readFileSync(path, 'utf8')
    return data
  } catch {}
}

export default read
