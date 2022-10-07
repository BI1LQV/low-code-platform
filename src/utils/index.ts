// 都是因为vitest没web platform api的锅
if (import.meta.env.MODE === "test") {
  // eslint-disable-next-line no-var, vars-on-top
  var i = 0
}
export function genId() {
  if (import.meta.env.MODE === "test") {
    // eslint-disable-next-line block-scoped-var
    return String(i++)
  }
  return crypto.randomUUID?.()
}
