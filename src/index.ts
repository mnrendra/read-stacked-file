import type {
  SkippedStacks,
  ValidSkippedStacks
} from '@mnrendra/validate-skipped-stacks'

import type {
  Options
} from './types'

import validateSkippedStacks from '@mnrendra/validate-skipped-stacks'

import mainAsync from './async'
import mainSync from './sync'

export type {
  Options,
  SkippedStacks,
  ValidSkippedStacks
}

export {
  mainAsync as read,
  mainSync as readSync,
  validateSkippedStacks
}
