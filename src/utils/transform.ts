export function transformAmount(amount: number) {
  if (!amount) return ''

  const thousand = amount / 10000

  return thousand > 10000
    ? `${(thousand / 10000).toFixed(2)}亿`
    : `${thousand}万`
}
