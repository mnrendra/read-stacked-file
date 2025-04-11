import { dirname, isAbsolute, resolve } from 'node:path'

import { traceFiles } from '@mnrendra/stack-trace'

import validateFile from './validateFile'

const initPath = (
  targetFile: string,
  caller: (...args: any) => any,
  limit: number = 10
): string => {
  if (isAbsolute(targetFile)) return resolve(targetFile)

  const [file] = traceFiles(caller, { limit })

  const validFile = validateFile(targetFile, file)

  const dir = dirname(validFile)

  return resolve(dir, targetFile)
}

export default initPath
