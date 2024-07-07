import { join, dirname, basename, resolve } from 'node:path'

import mockedStackTrace from '@tests/mocks/stackTrace'
import mockedReadAsync from '@tests/mocks/readAsync'
import mockedReadSync from '@tests/mocks/readSync'
import unmockStackTrace from '@tests/unmocks/stackTrace'
import unmockReadAsync from '@tests/unmocks/readAsync'
import unmockReadSync from '@tests/unmocks/readSync'

import { movePath, initPath } from '@/utils'

import { read, readSync, validateSkippedStacks } from '.'

jest.mock('@mnrendra/stack-trace', () => ({
  stackTrace: jest.fn()
}))

jest.mock('./async/read')

jest.mock('./sync/read')

describe('Test `index` utils:', () => {
  describe('Test `initPath` util:', () => {
    describe('By mocking `stackTrace` to return mocked `getFileName` with positive conditions:', () => {
      beforeAll(() => {
        mockedStackTrace.mockReturnValue([
          { getFileName: () => undefined },
          { getFileName: () => null },
          { getFileName: () => '' },
          { getFileName: () => resolve(__dirname, 'any.file') }
        ] as NodeJS.CallSite[])
      })

      afterAll(() => {
        unmockStackTrace(mockedStackTrace)
      })

      it('Should return the current directory path!', () => {
        const received = initPath('any.file')
        const expected = resolve(__dirname, 'any.file')

        expect(received).toBe(expected)
      })
    })

    describe('By mocking `stackTrace` to return mocked `getFileName` with negative conditions:', () => {
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
        const received = (): void => { initPath('any.file') }
        const expected = Error('Unable to locate the initial path of "any.file".')

        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking anything:', () => {
      it('Should return the current directory path!', () => {
        const received = initPath('any.file')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should return the current directory path by adding a skipped stack!', () => {
        const received = initPath('any.file', 'any')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should return the current directory path by adding a list of skipped stacks!', () => {
        const received = initPath('any.file', ['any'])
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })
    })
  })

  describe('Test `movePath` util:', () => {
    it('Should return the file path in the parent directory!', () => {
      const base = basename(__filename)
      const dir = dirname(__filename)

      const received = movePath(__filename, '..')
      const expected = resolve(resolve(dir, '..'), base)

      expect(received).toBe(expected)
    })
  })
})

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

    describe('By mocking `read` async to resolve a string value:', () => {
      beforeAll(() => {
        mockedReadAsync.mockResolvedValue('')
      })

      afterAll(() => {
        unmockReadAsync(mockedReadAsync, join(__dirname, 'async/read'))
      })

      it('Should resolve the file data as a `string` when able to obtain the file!', async () => {
        const received = await read('any.file')
        const expected = ''

        expect(received).toBe(expected)
      })
    })

    describe('By mocking `read` async to resolve a non-string value:', () => {
      beforeAll(() => {
        mockedReadAsync.mockResolvedValue(null)
      })

      afterAll(() => {
        unmockReadAsync(mockedReadAsync, join(__dirname, 'async/read'))
      })

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

    describe('By mocking `read` sync to return a string value:', () => {
      beforeAll(() => {
        mockedReadSync.mockReturnValue('')
      })

      afterAll(() => {
        unmockReadSync(mockedReadSync, join(__dirname, 'sync/read'))
      })

      it('Should return the file data as a `string` when able to obtain the file!', () => {
        const received = readSync('any.file')
        const expected = ''

        expect(received).toBe(expected)
      })
    })

    describe('By mocking `read` sync to return a non-string value:', () => {
      beforeAll(() => {
        mockedReadSync.mockReturnValue(null)
      })

      afterAll(() => {
        unmockReadSync(mockedReadSync, join(__dirname, 'sync/read'))
      })

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
    })
  })

  describe('Test `validateSkippedStacks` feature:', () => {
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
