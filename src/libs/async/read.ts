import { readFile } from 'node:fs'

const read = async (
  path: string
): Promise<string | undefined> => {
  return await new Promise((resolve) => {
    readFile(path, 'utf8', (err, data) => {
      if (err !== null) resolve(undefined)
      resolve(data)
    })
  })
}

export default read
