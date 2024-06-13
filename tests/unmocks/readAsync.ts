import type read from '../../src/async/read'
import type mockedReadAsync from '@tests/mocks/readAsync'

type Read = typeof read
type MockedReadAsync = typeof mockedReadAsync

interface ReadAsync extends Read {
  default: ((...args: any) => any) | undefined
}

const unmockReadAsync = (
  mockedReadAsync: MockedReadAsync,
  readPath: string
): void => {
  const readAsync: ReadAsync = jest.requireActual(readPath)
  mockedReadAsync.mockImplementation(readAsync.default)
}

export default unmockReadAsync
