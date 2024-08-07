import { readFile } from 'node:fs'

/**
 * Read file asynchronously.
 *
 * @param {string} path - File path.
 *
 * @returns {Promise<string|undefined>} File data in a promise.
 */
const read = async (
  path: string
): Promise<string | undefined> => {
  // Return as a promise-based.
  return await new Promise((resolve) => {
    // Read file path.
    readFile(path, 'utf8', (err, data) => {
      // Resolve `undefined` when an error occurs.
      if (err !== null) resolve(undefined)

      // Resolve file data.
      resolve(data)
    })
  })
}

// Export `read` as the default value.
export default read
