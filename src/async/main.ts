import type { Options } from '../types'

import { resolve } from 'path'

import { initPath, movePath } from '../utils'

import read from './read'

/**
 * Read obtained file asynchronously.
 * @param {string} targetFile - Targeted file to be obtained.
 * @param {object} [options] - Optional params.
 * @returns {Promise<string>} Obtained value.
 */
const main = async (
  targetFile: string,
  {
    skippedStacks
  }: Options = {
    skippedStacks: []
  }
): Promise<string> => {
  // Initialize path.
  let path = initPath(targetFile, skippedStacks)

  // Read initial path.
  let data = await read(path)

  // Looping when data is `undefined`.
  while (!data) {
    // Move to the next path.
    path = movePath(path, '..')

    // Read the next path.
    data = await read(path)

    // Stop looping when unable to obtain the file data.
    if (path === resolve('/', targetFile) && !data) {
      throw new Error('Unable to obtain the file data!')
    }
  }

  // Return the obtained data.
  return data
}

// Export `main` as the default value.
export default main
