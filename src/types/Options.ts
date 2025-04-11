/**
 * The options interface.
 *
 * @see https://github.com/mnrendra/read-stacked-file#readme
 */
interface Options {
  /**
   * A caller function to serve as the stack-trace target.
   *
   * @see https://github.com/mnrendra/read-stacked-file#readme
   */
  caller?: (...args: any) => any

  /**
   * The `Error.stackTraceLimit` property specifies the number of stack frames
   * to be collected by a stack trace.
   *
   * @default 10
   *
   * @see https://github.com/mnrendra/read-stacked-file#readme
   */
  stackTraceLimit?: number
}

export default Options
