import mockedStackTrace from '@tests/mocks/stackTrace'
import unmockStackTrace from '@tests/unmocks/stackTrace'

import { read, readSync, validateSkippedStacks } from '..'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn(),
  validateSkippedStacks: jest.requireActual('@mnrendra/stack-trace').validateSkippedStacks
}))

jest.mock('@/async/read')

jest.mock('@/sync/read')

describe('Test all features:', () => {
  describe('Test `read` feature:', () => {
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
        const received = read('any.file')
        const expected = Error('Unable to locate the initial path of "any.file".')

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('By mocking `read` async to resolve a non-string value:', () => {
      it('Should reject with an error when unable to obtain the file!', async () => {
        const received = read('any.file')
        const expected = Error('Unable to find the "any.file" file.')

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('Without mocking anything:', () => {
      it('Should resolve the file data when able to obtain the file!', async () => {
        const received = await read('package.json')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should resolve the file data by adding a skipped stack!', async () => {
        const received = await read('package.json', { skippedStacks: 'any' })
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should resolve the file data by adding a list of skipped stacks!', async () => {
        const received = await read('package.json', { skippedStacks: ['any'] })
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should resolve the file data by setting `useCWD` option to be `true`!', async () => {
        const received = await read('tsconfig.json', { useCWD: true })
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })
    })
  })

  describe('Test `readSync` reature:', () => {
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

      it('Should throw an error when unable to locate the initial path!', () => {
        const received = (): void => { readSync('any.file') }
        const expected = Error('Unable to locate the initial path of "any.file".')

        expect(received).toThrow(expected)
      })
    })

    describe('By mocking `read` sync to return a non-string value:', () => {
      it('Should throw an error when unable to obtain the file!', () => {
        const received = (): void => { readSync('any.file') }
        const expected = Error('Unable to find the "any.file" file.')

        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking anything:', () => {
      it('Should return the file data when able to obtain the file!', () => {
        const received = readSync('package.json')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should return the file data by adding a skipped stack!', () => {
        const received = readSync('package.json', { skippedStacks: 'any' })
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should return the file data by adding a list of skipped stacks!', () => {
        const received = readSync('package.json', { skippedStacks: ['any'] })
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should return the file data by setting `useCWD` option to be `true`!', () => {
        const received = readSync('tsconfig.json', { useCWD: true })
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })
    })
  })

  describe('Test `validateSkippedStacks` util:', () => {
    it('Should return a valid skipped-stacks when given a skipped-stack!', () => {
      const received = validateSkippedStacks('any')
      const expected = ['any']

      expect(received).toEqual(expected)
    })

    it('Should return a valid skipped-stacks when given a skipped-stack and a `skippedStacks` option with a string!', () => {
      const received = validateSkippedStacks('any', 'any')
      const expected = ['any', 'any']

      expect(received).toEqual(expected)
    })

    it('Should return a valid skipped-stacks when given a skipped-stack and a `skippedStacks` option with a list of strings!', () => {
      const received = validateSkippedStacks('any', ['any'])
      const expected = ['any', 'any']

      expect(received).toEqual(expected)
    })
  })
})
