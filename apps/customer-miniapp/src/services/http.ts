import Taro from '@tarojs/taro'

const API_BASE_URL = process.env.TARO_APP_API_BASE_URL ?? 'http://localhost:3000/api/v1'

type RequestOptions = Omit<Taro.request.Option, 'url'>

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await Taro.request<T>({
    ...options,
    url: `${API_BASE_URL}${path}`,
    header: {
      'content-type': 'application/json',
      ...options.header,
    },
  })

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(`请求失败：${response.statusCode}`)
  }

  return response.data
}
