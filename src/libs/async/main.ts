import type { Options } from '../../types'

import { initPath, movePath, validateData } from '../../utils'

import read from './read'

/**
 * Read the stack-trace file asynchronously.
 *
 * @param {string} targetFile - The target file to be obtained.
 * @param {Options} [options] - The optional params.
 *
 * @returns {Promise<string>} Obtained value.
 *
 * @see https://github.com/mnrendra/read-stacked-file#readme
 */
const main = async (
  targetFile: string,
  {
    caller,
    stackTraceLimit = 10
  }: Options = {}
): Promise<string> => {
  let path = initPath(targetFile, caller ?? main, stackTraceLimit)

  let data = await read(path)

  while (typeof data !== 'string') {
    path = movePath(path, '..')

    data = await read(path)

    validateData(targetFile, path, data)
  }

  return data
}

export default main
