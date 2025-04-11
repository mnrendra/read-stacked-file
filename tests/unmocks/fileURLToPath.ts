import type originalModule from 'node:url'

import type mockedModule from '@tests/mocks/fileURLToPath'

type OriginalModule = typeof originalModule
type MockedModule = typeof mockedModule

const unmock = (
  mockedModule: MockedModule
): void => {
  const actualModule: OriginalModule = jest.requireActual('node:url')
  mockedModule.mockImplementation(actualModule.fileURLToPath)
}

export default unmock
