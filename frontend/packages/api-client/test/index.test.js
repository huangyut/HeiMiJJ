import assert from 'node:assert/strict'
import test from 'node:test'

import { HeiMiApiClient } from '../src/index.js'

test('health 请求健康检查接口', async () => {
  const calls = []
  const client = new HeiMiApiClient(async (path, config) => {
    calls.push({ path, config })
    return { code: 0, data: { status: 'UP' } }
  })

  const response = await client.health()

  assert.deepEqual(calls, [{ path: '/health', config: {} }])
  assert.equal(response.data.status, 'UP')
})

test('构造函数拒绝非函数 transport', () => {
  assert.throws(() => new HeiMiApiClient(null), /transport 必须是函数/)
})
