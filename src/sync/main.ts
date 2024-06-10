import type { Options } from '../types'

import { resolve } from 'path'

import { initPath, movePath } from '../utils'

import read from './read'

/**
 * Read obtained file synchronously.
 * @param {string} targetedFile - Targeted file to be obtained.
 * @param {object} [options] - Optional params.
 * @returns {string} Obtained value.
 */
const main = (
  targetedFile: string,
  {
    skippedStacks
  }: Options = {
    skippedStacks: []
  }
): string => {
  // Initialize path.
  let path = initPath(targetedFile, skippedStacks)

  // Read initial path.
  let data = read(path)

  // Looping when data is `undefined`.
  while (!data) {
    // Move to the next path.
    path = movePath(path, '..')

    // Read the next path.
    data = read(path)

    // Stop looping when unable to obtain the file data.
    if (path === resolve('/', targetedFile) && !data) {
      throw new Error('Unable to obtain the file data!')
    }
  }

  // Return the obtained data.
  return data
}

// Export `main` as the default value.
export default main
