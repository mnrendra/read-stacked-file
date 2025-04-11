import { resolve } from 'node:path'

import mockedFileURLToPath from '@tests/mocks/fileURLToPath'
import mockedTraceFiles from '@tests/mocks/traceFiles'

import unmockFileURLToPath from '@tests/unmocks/fileURLToPath'
import unmockTraceFiles from '@tests/unmocks/traceFiles'

import { readStackedFile, readStackedFileSync } from '..'

jest.mock('@mnrendra/stack-trace', () => ({
  traceStacks: jest.fn(),
  traceFnNames: jest.fn(),
  traceFiles: jest.fn(() => [])
}))

jest.mock('node:url', () => ({
  fileURLToPath: jest.fn(() => '')
}))

describe('Test all features:', () => {
  describe('Test `readStackedFile` feature:', () => {
    describe('By mocking `traceFiles` to return invalid values:', () => {
      beforeAll(() => {
        mockedTraceFiles.mockReturnValue([undefined, null, ''])
      })

      afterAll(() => {
        unmockTraceFiles(mockedTraceFiles)
      })

      it('Should reject with an error when unable to locate the initial path!', async () => {
        const received = readStackedFile('any.file')
        const expected = 'Unable to locate the initial path of "any.file".'

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('By mocking `traceFiles` to return invalid URL values:', () => {
      beforeAll(() => {
        mockedTraceFiles.mockReturnValue([`file://${__filename}`])
        mockedFileURLToPath.mockReturnValue(__filename)
      })

      afterAll(() => {
        unmockTraceFiles(mockedTraceFiles)
        unmockFileURLToPath(mockedFileURLToPath)
      })

      it('Should reject with an error when unable to find the target file!', async () => {
        const received = readStackedFile('any.file')
        const expected = 'Unable to find the "any.file" file.'

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('By mocking `traceFiles` to return invalid URL values and mocking `fileURLToPath` to return non-absolute path:', () => {
      beforeAll(() => {
        mockedTraceFiles.mockReturnValue([`file://${__filename}`])
        mockedFileURLToPath.mockReturnValue('../foo.mjs')
      })

      afterAll(() => {
        unmockTraceFiles(mockedTraceFiles)
        unmockFileURLToPath(mockedFileURLToPath)
      })

      it('Should reject with an error when unable to locate the initial path!', async () => {
        const received = readStackedFile('any.file')
        const expected = 'Unable to locate the initial path of "any.file".'

        await expect(received).rejects.toThrow(expected)
      })
    })

    describe('Without mocking anything:', () => {
      it('Should resolve the target file data when able to find the target file!', async () => {
        const received = await readStackedFile('package.json')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should resolve the target file data without tracing anything when given an absolute path!', async () => {
        const received = await readStackedFile(resolve(__dirname, 'package.json'))
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })
    })
  })

  describe('Test `readStackedFileSync` reature:', () => {
    describe('By mocking `traceFiles` to return invalid values:', () => {
      beforeAll(() => {
        mockedTraceFiles.mockReturnValue([undefined, null, ''])
      })

      afterAll(() => {
        unmockTraceFiles(mockedTraceFiles)
      })

      it('Should throw an error when unable to locate the initial path!', () => {
        const received = (): void => { readStackedFileSync('any.file') }
        const expected = 'Unable to locate the initial path of "any.file".'

        expect(received).toThrow(expected)
      })
    })

    describe('By mocking `traceFiles` to return URL values:', () => {
      beforeAll(() => {
        mockedTraceFiles.mockReturnValue([`file://${__filename}`])
        mockedFileURLToPath.mockReturnValue(__filename)
      })

      afterAll(() => {
        unmockTraceFiles(mockedTraceFiles)
        unmockFileURLToPath(mockedFileURLToPath)
      })

      it('Should reject with an error when unable to find the target file!', () => {
        const received = (): void => { readStackedFileSync('any.file') }
        const expected = 'Unable to find the "any.file" file.'

        expect(received).toThrow(expected)
      })
    })

    describe('By mocking `traceFiles` to return URL values and mocking `fileURLToPath` to return non-absolute path:', () => {
      beforeAll(() => {
        mockedTraceFiles.mockReturnValue([`file://${__filename}`])
        mockedFileURLToPath.mockReturnValue('../foo.mjs')
      })

      afterAll(() => {
        unmockTraceFiles(mockedTraceFiles)
        unmockFileURLToPath(mockedFileURLToPath)
      })

      it('Should reject with an error when unable to locate the initial path!', () => {
        const received = (): void => { readStackedFileSync('any.file') }
        const expected = 'Unable to locate the initial path of "any.file".'

        expect(received).toThrow(expected)
      })
    })

    describe('Without mocking anything:', () => {
      it('Should return the target file data when able to find the target file!', () => {
        const received = readStackedFileSync('package.json')
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })

      it('Should return the target file data without tracing anything when given an absolute path!', () => {
        const received = readStackedFileSync(resolve(__dirname, 'package.json'))
        const expected = expect.any(String)

        expect(received).toEqual(expected)
      })
    })
  })
})
