import type read from '../../src/sync/read'
import type mockedReadSync from '@tests/mocks/readSync'

type Read = typeof read
type MockedReadSync = typeof mockedReadSync

interface ReadSync extends Read {
  default: ((...args: any) => any) | undefined
}

const unmockReadSync = (
  mockedReadSync: MockedReadSync,
  readPath: string
): void => {
  const readSync: ReadSync = jest.requireActual(readPath)
  mockedReadSync.mockImplementation(readSync.default)
}

export default unmockReadSync
