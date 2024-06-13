import { join } from 'path'

import mockedStackTrace from '@tests/mocks/stackTrace'
import mockedReadSync from '@tests/mocks/readSync'
import unmockStackTrace from '@tests/unmocks/stackTrace'
import unmockReadSync from '@tests/unmocks/readSync'

import main from './main'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn()
}))

jest.mock('./read')

describe('Test `main` sync:', () => {
  describe('By mocking `initPath` to throw an error:', () => {
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

    it('Should throw an error when unable to obtain the initial path!', () => {
      const received = (): void => { main('package.json') }
      const expected = Error('Unable to obtain the initial path!')

      expect(received).toThrow(expected)
    })
  })

  describe('By mocking `read` sync to return an empty JSON string:', () => {
    beforeAll(() => {
      mockedReadSync.mockReturnValue('{}')
    })

    afterAll(() => {
      unmockReadSync(mockedReadSync, join(__dirname, 'read'))
    })

    it('Should return the file data as a `string` when able to obtain the file!', () => {
      const received = main('package.json')
      const expected = '{}'

      expect(received).toBe(expected)
    })
  })

  describe('By mocking `read` sync to return a non-JSON string:', () => {
    beforeAll(() => {
      mockedReadSync.mockReturnValue('')
    })

    afterAll(() => {
      unmockReadSync(mockedReadSync, join(__dirname, 'read'))
    })

    it('Should throw an error when unable to obtain the file!', () => {
      const received = (): void => { main('package.json') }
      const expected = Error('Unable to obtain the file data!')

      expect(received).toThrow(expected)
    })
  })

  describe('Without mocking anything:', () => {
    it('Should return the file data when able to obtain the file!', () => {
      const received = main('package.json')
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })

    it('Should return the file data by adding a skipped stack!', () => {
      const received = main('package.json', { skippedStacks: 'any' })
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })

    it('Should return the file data by adding a list of skipped stacks!', () => {
      const received = main('package.json', { skippedStacks: ['any'] })
      const expected = expect.any(String)

      expect(received).toEqual(expected)
    })
  })
})
