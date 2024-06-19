import { join } from 'path'

import mockedStackTrace from '@tests/mocks/stackTrace'
import mockedReadAsync from '@tests/mocks/readAsync'
import unmockStackTrace from '@tests/unmocks/stackTrace'
import unmockReadAsync from '@tests/unmocks/readAsync'

import main from './main'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn()
}))

jest.mock('./read')

describe('Test `main` async:', () => {
  describe('By mocking `initPath` to reject with an error:', () => {
    beforeAll(() => {
      mockedStackTrace.mockReturnValue([
        { getFileName: () => undefined },
        { getFileName: () => null },
        { getFileName: () => '' }
      ] as NodeJS.CallSite[])
    })

    afterAll(() => {
      unmockStackTrace(mockedStackTrace)
    })

    it('Should reject with an error when unable to locate the initial path!', async () => {
      const received = main('any.file')
      const expected = Error('Unable to locate the initial path of "any.file".')

      await expect(received).rejects.toThrow(expected)
    })
  })

  describe('By mocking `read` async to resolve a string value:', () => {
    beforeAll(() => {
      mockedReadAsync.mockResolvedValue('')
    })

    afterAll(() => {
      unmockReadAsync(mockedReadAsync, join(__dirname, 'read'))
    })

    it('Should resolve the file data as a `string` when able to obtain the file!', async () => {
      const received = await main('any.file')
      const expected = ''

      expect(received).toBe(expected)
    })
  })

  describe('By mocking `read` async to resolve a non-string value:', () => {
    beforeAll(() => {
      mockedReadAsync.mockResolvedValue(null)
    })

    afterAll(() => {
      unmockReadAsync(mockedReadAsync, join(__dirname, 'read'))
    })

    it('Should reject with an error when unable to obtain the file!', async () => {
      const received = main('any.file')
      const expected = Error('Unable to find the "any.file" file.')

      await expect(received).rejects.toThrow(expected)
    })
  })

  describe('Without mocking anything:', () => {
    it('Should resolve the file data when able to obtain the file!', async () => {
      const received = await main('package.json')
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })

    it('Should resolve the file data by adding a skipped stack!', async () => {
      const received = await main('package.json', { skippedStacks: 'any' })
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })

    it('Should resolve the file data by adding a list of skipped stacks!', async () => {
      const received = await main('package.json', { skippedStacks: ['any'] })
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })
})
