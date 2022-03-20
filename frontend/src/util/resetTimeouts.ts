export function resetTimeouts(arr: NodeJS.Timeout[]) {
  for (const a of arr) clearTimeout(a);
}
