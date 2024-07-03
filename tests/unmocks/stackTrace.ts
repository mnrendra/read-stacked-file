import type stackTrace from '@mnrendra/stack-trace'

import type { mockedStackTrace } from '@tests/mocks'

type StackTrace = typeof stackTrace
type MockedStackTrace = typeof mockedStackTrace

const unmockStackTrace = (
  mockedStackTrace: MockedStackTrace
): void => {
  const { stackTrace }: StackTrace = jest.requireActual('@mnrendra/stack-trace')
  mockedStackTrace.mockImplementation(stackTrace)
}

export default unmockStackTrace
