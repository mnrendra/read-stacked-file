import { dirname, resolve } from 'node:path'

import {
  type SkippedStacks,
  stackTrace,
  validateSkippedStacks
} from '@mnrendra/stack-trace'

import { SKIPPED_STACK } from '../consts'

const initPath = (
  basename: string,
  skippedStacks: SkippedStacks = [],
  limit: number = 10,
  useCWD: boolean = false
): string => {
  // Handle `useCWD` option.
  if (useCWD) {
    // Return the initialized path.
    return resolve(process.cwd(), basename)
  }

  // Trace stacks.
  const stacks = stackTrace(null, { limit })

  // Map stack trace paths.
  const paths = stacks.map((stack) =>
    typeof stack.getFileName() === 'string' && stack.getFileName() !== ''
      ? stack.getFileName()
      : SKIPPED_STACK
  )

  // Validate skipped stacks.
  const validSkippedStacks = validateSkippedStacks(SKIPPED_STACK, skippedStacks)

  // Find the initial path.
  const path = paths.find((path) => !(
    validSkippedStacks.some((skippedStack) =>
      typeof path === 'string' && path !== '' && path.includes(skippedStack)
    )
  ))

  // Throw an error if the path is invalid.
  if (typeof path !== 'string' || path === '') {
    throw new Error(`Unable to locate the initial path of "${basename}".`)
  }

  // Get the directory name.
  const dir = dirname(path)

  // Return the initialized path.
  return resolve(dir, basename)
}

export default initPath
