import type { SkippedStacks } from '@mnrendra/stack-trace'

interface Options {
  /**
   * To skip a stack or a list of stacks when you call `@mnrendra/stack-trace`
   * or `@mnrendra/read-stacked-file`. So, you can get the stack(s) of your
   * consumer target file.
   *
   * It can be a string or a list of strings. Make sure the string(s) is/are the
   * name(s) of the stack trace(s) to be skipped.
   *
   * @default []
   *
   * @see https://github.com/mnrendra/validate-skipped-stacks
   */
  skippedStacks?: SkippedStacks

  /**
   * `@mnrendra/stack-trace`'s limit specifies the number of stack frames to be
   * collected by a stack trace.
   *
   * @default 10
   *
   * @see https://github.com/mnrendra/stack-trace
   */
  stackTraceLimit?: number

  /**
   * If set to `true`, it will use `process.cwd()` instead of `@mnrendra/stack-trace` to get the target path.
   * 
   * @default false
   */
  useCWD?: boolean
}

export default Options
