export interface ApiResponse<T> {
  code: number
  message: string
  data: T
  requestId?: string
  timestamp: string
}

export interface PageResult<T> {
  records: T[]
  page: number
  size: number
  total: number
}

export interface HealthStatus {
  status: 'UP' | 'DOWN'
  application: string
  version: string
  timestamp: string
}

export interface StoreSummary {
  id: string
  name: string
  address: string
  distanceMeters?: number
  open: boolean
  pickupMinutes?: number
}

export interface OrderSummary {
  id: string
  orderNo: string
  storeName: string
  amountInCents: number
  status: string
  createdAt: string
}
