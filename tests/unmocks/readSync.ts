import type originalModule from '@/sync/read'

import type mockedModule from '@tests/mocks/readSync'

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
