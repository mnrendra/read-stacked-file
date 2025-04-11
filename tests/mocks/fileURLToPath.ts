import * as originalModule from 'node:url'

const { fileURLToPath } = originalModule as jest.Mocked<typeof originalModule>

export default fileURLToPath
