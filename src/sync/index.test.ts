import { join } from 'path'

import { unmock } from '@tests/utils'
import stackTrace from '@tests/mocks/stackTrace'
import readSync from '@tests/mocks/readSync'

import index from '.'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn()
}))

jest.mock('./read')

describe('Test `index` sync.', () => {
  describe('By mocking `initPath` to throw an error.', () => {
    beforeAll(() => {
      stackTrace.mockReturnValue([
        { getFileName: () => undefined },
        { getFileName: () => null },
        { getFileName: () => '' }
      ] as NodeJS.CallSite[])
    })

    afterAll(() => {
      const originalModule = jest.requireActual('@mnrendra/stack-trace')
      stackTrace.mockImplementation(originalModule.stackTrace)
    })

    it('Should throw an error when unable to obtain the initial path!', () => {
      const received = (): void => { index('package.json') }
      const expected = Error('Unable to obtain the initial path!')

      expect(received).toThrow(expected)
    })
  })

  describe('By mocking `read` sync to return an empty JSON string.', () => {
    beforeAll(() => {
      readSync.mockReturnValue('{}')
    })

    afterAll(() => {
      unmock(readSync, join(__dirname, 'read'))
    })

    it('Should return the file data as a `string` when able to obtain the file!', () => {
      const received = index('package.json')
      const expected = '{}'

      expect(received).toBe(expected)
    })
  })

  describe('By mocking `read` sync to return a non-JSON string.', () => {
    beforeAll(() => {
      readSync.mockReturnValue('')
    })

    afterAll(() => {
      unmock(readSync, join(__dirname, 'read'))
    })

    it('Should throw an error when unable to obtain the file!', () => {
      const received = (): void => { index('package.json') }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })
  })

  describe('Without mocking anything.', () => {
    it('Should return the file data when able to obtain the file!', () => {
      const received = index('package.json')
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })

    it('Should return the file data by adding a skipped stack!', () => {
      const received = index('package.json', { skippedStacks: 'any' })
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })

    it('Should return the file data by adding a list of skipped stacks!', () => {
      const received = index('package.json', { skippedStacks: ['any'] })
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })
})
