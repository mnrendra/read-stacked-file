import { join } from 'path'

import { unmock } from '@tests/utils'
import stackTrace from '@tests/mocks/stackTrace'
import readAsync from '@tests/mocks/readAsync'

import index from '.'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn()
}))

jest.mock('./read')

describe('Test `index` async.', () => {
  describe('By mocking `initPath` to reject with an error.', () => {
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

    it('Should reject with an error when unable to obtain the initial path!', async () => {
      const received = index('package.json')
      const expected = Error('Unable to obtain the initial path!')

      await expect(received).rejects.toThrow(expected)
    })
  })

  describe('By mocking `read` async to resolve an empty JSON string.', () => {
    beforeAll(() => {
      readAsync.mockResolvedValue('{}')
    })

    afterAll(() => {
      unmock(readAsync, join(__dirname, 'read'))
    })

    it('Should resolve the file data when able to obtain the file!', async () => {
      const received = await index('package.json')
      const expected = '{}'

      expect(received).toBe(expected)
    })
  })

  describe('By mocking `read` async to resolve a non-JSON string.', () => {
    beforeAll(() => {
      readAsync.mockResolvedValue('')
    })

    afterAll(() => {
      unmock(readAsync, join(__dirname, 'read'))
    })

    it('Should reject with an error when unable to obtain the file!', async () => {
      const received = index('package.json')
      const expected = Error('Unable to obtain the file data!')

      await expect(received).rejects.toThrow(expected)
    })
  })

  describe('Without mocking anything.', () => {
    it('Should resolve the file data when able to obtain the file!', async () => {
      const received = await index('package.json')
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })

    it('Should resolve the file data by adding a skipped stack!', async () => {
      const received = await index('package.json', { skippedStacks: 'any' })
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })

    it('Should resolve the file data by adding a list of skipped stacks!', async () => {
      const received = await index('package.json', { skippedStacks: ['any'] })
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })
})