export function formatMoney(amountInCents: number): string {
  return `¥${(amountInCents / 100).toFixed(2)}`
}

export function assertNever(value: never): never {
  throw new Error(`未处理的值：${String(value)}`)
}
