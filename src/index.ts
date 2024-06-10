import type { Options, SkippedStacks } from './types'

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
