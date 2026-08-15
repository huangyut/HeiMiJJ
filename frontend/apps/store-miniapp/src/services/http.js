import { HeiMiApiClient } from '@heimijj/api-client'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

async function uniTransport(path, config = {}) {
  const response = await uni.request({
    url: `${API_BASE_URL}${path}`,
    method: config.method || 'GET',
    data: config.body,
    header: config.headers,
  })

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(`接口请求失败：${response.statusCode}`)
  }

  return response.data
}

export const apiClient = new HeiMiApiClient(uniTransport)
