export const STORE_BUSINESS_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  RESTING: 'RESTING',
} as const

export type StoreBusinessStatus = (typeof STORE_BUSINESS_STATUS)[keyof typeof STORE_BUSINESS_STATUS]

export interface NearbyStore {
  id: string
  name: string
  distanceMeters: number
  businessStatus: StoreBusinessStatus
  pickupEstimateMinutes: number
}
