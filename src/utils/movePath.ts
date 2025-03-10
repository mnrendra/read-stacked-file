import { basename, dirname, resolve } from 'node:path'

const movePath = (
  path: string,
  aim: string
): string => {
  // Get the base name.
  const base = basename(path)

  // Get the directory name.
  const dir = dirname(path)

  // Move to the aim directory.
  const movedDir = resolve(dir, aim)

  // Resolve the moved path.
  const movedPath = resolve(movedDir, base)

  // Return the moved path.
  return movedPath
}

export default movePath
