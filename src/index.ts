import mainAsync from './async'
import mainSync from './sync'

export {
  type SkippedStacks,
  type ValidSkippedStacks,
  validateSkippedStacks
} from '@mnrendra/stack-trace'

export type {
  Options
} from './types'

export {
  mainAsync as read,
  mainSync as readSync
}
