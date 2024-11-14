import type { Options } from '../types'

import { basename, normalize, resolve } from 'node:path'

import { initPath, movePath } from '../utils'

import read from './read'

/**
 * Read the stacked file synchronously.
 *
 * @param {string} targetedFile - Targeted file to be obtained.
 * @param {Options} [options] - Optional params.
 *
 * @returns {string} Obtained value.
 *
 * @see https://github.com/mnrendra/read-stacked-file#readme
 */
const main = (
  targetedFile: string,
  {
    skippedStacks = [],
    stackTraceLimit = 10,
    useCWD = false
  }: Options = {}
): string => {
  // Initialize path.
  let path = initPath(targetedFile, skippedStacks, stackTraceLimit, useCWD)

  // Read initial path.
  let data = read(path)

  // Looping when data is `undefined`.
  while (typeof data !== 'string') {
    // Move to the next path.
    path = movePath(path, '..')

    // Read the next path.
    data = read(path)

    // Stop looping when unable to obtain the file data.
    if (path === normalize(resolve('/', targetedFile)) && typeof data !== 'string') {
      throw new Error(`Unable to find the "${basename(targetedFile)}" file.`)
    }
  }

  // Return the obtained data.
  return data
}

export default main
