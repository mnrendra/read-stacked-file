import { basename, dirname, resolve } from 'node:path'

const movePath = (
  path: string,
  aim: string
): string => {
  const base = basename(path)

  const dir = dirname(path)

  const movedDir = resolve(dir, aim)

  const movedPath = resolve(movedDir, base)

  return movedPath
}

export default movePath
