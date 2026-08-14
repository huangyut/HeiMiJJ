import type { ApiResponse, HealthStatus } from '@heimijj/shared-types'

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
}

export type ApiTransport = <T>(path: string, config?: RequestConfig) => Promise<ApiResponse<T>>

export class HeiMiApiClient {
  constructor(private readonly transport: ApiTransport) {}

  health(): Promise<ApiResponse<HealthStatus>> {
    return this.transport<HealthStatus>('/health')
  }
}
