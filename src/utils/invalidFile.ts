const invalidFile = (
  targetFile: string
): Error => {
  return new Error(`Unable to locate the initial path of "${targetFile}".`)
}

export default invalidFile
