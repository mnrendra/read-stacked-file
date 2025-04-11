import { basename, resolve } from 'node:path'

const validateData = (
  targetFile: string,
  path: string,
  data?: string
): void => {
  if (
    path === resolve('/', targetFile) &&
    typeof data !== 'string'
  ) {
    throw new Error(`Unable to find the "${basename(targetFile)}" file.`)
  }
}

export default validateData
