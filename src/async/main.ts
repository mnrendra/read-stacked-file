import type { Options } from '../types'

import { basename, resolve } from 'node:path'

import { initPath, movePath } from '../utils'

import read from './read'

/**
 * Read obtained file asynchronously.
 *
 * @param {string} targetedFile - Targeted file to be obtained.
 * @param {Options} [options] - Optional params.
 *
 * @returns {Promise<string>} Obtained value.
 */
const main = async (
  targetedFile: string,
  {
    skippedStacks,
    stackTraceLimit
  }: Options = {
    skippedStacks: [],
    stackTraceLimit: 10
  }
): Promise<string> => {
  // Initialize path.
  let path = initPath(targetedFile, skippedStacks, stackTraceLimit)

  // Read initial path.
  let data = await read(path)

  // Looping when data is `undefined`.
  while (typeof data !== 'string') {
    // Move to the next path.
    path = movePath(path, '..')

    // Read the next path.
    data = await read(path)

    // Stop looping when unable to obtain the file data.
    if (path === resolve('/', targetedFile) && typeof data !== 'string') {
      throw new Error(`Unable to find the "${basename(targetedFile)}" file.`)
    }
  }

  // Return the obtained data.
  return data
}

// Export `main` as the default value.
export default main
