import type { SkippedStacks } from '@mnrendra/validate-skipped-stacks'

import { dirname, resolve } from 'node:path'

import { stackTrace } from '@mnrendra/stack-trace'
import validateSkippedStacks from '@mnrendra/validate-skipped-stacks'

import { SKIPPED_STACK } from '../consts'

/**
 * Initialize path.
 *
 * @param {string} basename - Base name (file name) to be resolved with the
 * initialize path.
 * @param {string|string[]} [skippedStacks] - Stack paths to be skipped
 * (optional).
 *
 * @returns {string} Initialized path.
 */
const initPath = (
  basename: string,
  skippedStacks: SkippedStacks = []
): string => {
  // Trace stacks.
  const stacks = stackTrace()

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

  // Throw an error if the path is undefined.
  if (typeof path !== 'string' || path === '') {
    throw new Error(`Unable to locate the initial path of "${basename}".`)
  }

  // Get the directory name.
  const dir = dirname(path)

  // Resolve the initial path.
  const initialPath = resolve(dir, basename)

  // Return the initialized path.
  return initialPath
}

// Export the `initPath` as the default value.
export default initPath
