import { isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'

import invalidFile from './invalidFile'

const validateFile = (
  targetFile: string,
  file?: string | null
): string => {
  if (typeof file !== 'string') throw invalidFile(targetFile)

  try {
    file = fileURLToPath(file)

    if (isAbsolute(file)) return file

    throw invalidFile(targetFile)
  } catch {
    if (isAbsolute(file)) return file

    throw invalidFile(targetFile)
  }
}

export default validateFile
