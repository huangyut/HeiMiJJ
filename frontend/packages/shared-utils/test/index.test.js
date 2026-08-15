import assert from 'node:assert/strict'
import test from 'node:test'

import { formatDistance, formatMoney } from '../src/index.js'

test('金额以人民币元格式化', () => {
  assert.equal(formatMoney(5990), '¥59.90')
})

test('距离根据长度选择米或千米', () => {
  assert.equal(formatDistance(680), '680m')
  assert.equal(formatDistance(1520), '1.5km')
  assert.equal(formatDistance(-1), '距离未知')
})
