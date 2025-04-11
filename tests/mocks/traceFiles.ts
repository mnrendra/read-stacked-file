import * as originalModule from '@mnrendra/stack-trace'

const { traceFiles } = originalModule as jest.Mocked<typeof originalModule>

export default traceFiles
