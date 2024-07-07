import type originalModule from '@/async/read'

import type mockedModule from '@tests/mocks/readAsync'

type OriginalModule = typeof originalModule
type MockedModule = typeof mockedModule

interface ActualModule extends OriginalModule {
  default: ((...args: any) => any) | undefined
}

const unmock = (
  mockedModule: MockedModule,
  moduleName: string
): void => {
  const actualModule: ActualModule = jest.requireActual(moduleName)
  mockedModule.mockImplementation(actualModule.default)
}

export default unmock
