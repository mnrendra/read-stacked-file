import { readFileSync } from 'node:fs'

const read = (
  path: string
): string | undefined => {
  // Try catch to handle any errors.
  try {
    // Read file path.
    const data = readFileSync(path, 'utf8')

    // Return file data.
    return data
  } catch (err) {
    // Return `undefined` when an error occurs.
    return undefined
  }
}

export default read
