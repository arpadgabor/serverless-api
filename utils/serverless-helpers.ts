export function isStage(stage: string): boolean {
  const idx = process.argv.findIndex(arg => arg === '--stage')

  if (idx === -1) {
    if (stage === 'dev') return true
    return false
  }

  if (process.argv[idx + 1] === stage) {
    return true
  }

  return false
}
