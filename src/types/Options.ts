import type { SkippedStacks } from '@mnrendra/stack-trace'

/**
 * The options interface.
 * 
 * @see https://github.com/mnrendra/read-stacked-file#readme
 */
interface Options {
  /**
   * A name or a list of names of stack traces that need to be skipped.
   *
   * @default []
   *
   * @see https://github.com/mnrendra/read-stacked-file#readme
   */
  skippedStacks?: SkippedStacks

  /**
   * The `Error.stackTraceLimit` property specifies the number of stack frames
   * to be collected by a stack trace.
   *
   * @default 10
   *
   * @see https://github.com/mnrendra/read-stacked-file#readme
   */
  stackTraceLimit?: number

  /**
   * If set to `true`, it will use `process.cwd()` instead of
   * `@mnrendra/stack-trace` to get the target path.
   * 
   * @default false
   */
  useCWD?: boolean
}

export default Options
