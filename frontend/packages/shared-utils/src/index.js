export function formatMoney(amountInCents) {
  const normalizedAmount = Number(amountInCents)

  if (!Number.isFinite(normalizedAmount)) {
    throw new TypeError('金额必须是有效数字')
  }

  return `¥${(normalizedAmount / 100).toFixed(2)}`
}

export function formatDistance(distanceInMeters) {
  const normalizedDistance = Number(distanceInMeters)

  if (!Number.isFinite(normalizedDistance) || normalizedDistance < 0) {
    return '距离未知'
  }

  if (normalizedDistance < 1000) {
    return `${Math.round(normalizedDistance)}m`
  }

  return `${(normalizedDistance / 1000).toFixed(1)}km`
}
