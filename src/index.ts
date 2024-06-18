import type { SkippedStacks } from '@mnrendra/validate-skipped-stacks'

import type { Options } from './types'

import mainAsync from './async'
import mainSync from './sync'

export type {
  Options,
  SkippedStacks
}

export {
  mainAsync as read,
  mainSync as readSync
}
