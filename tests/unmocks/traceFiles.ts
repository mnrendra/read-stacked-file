import type originalModule from '@mnrendra/stack-trace'

import type mockedModule from '@tests/mocks/traceFiles'

type OriginalModule = typeof originalModule
type MockedModule = typeof mockedModule

const unmock = (
  mockedModule: MockedModule
): void => {
  const actualModule: OriginalModule = jest.requireActual('@mnrendra/stack-trace')
  mockedModule.mockImplementation(actualModule.traceFiles)
}

export default unmock
