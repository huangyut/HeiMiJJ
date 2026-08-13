import { Injectable } from '@nestjs/common'

import type { NearbyStore } from '@heimijj/shared'

interface NearbyQuery {
  latitude?: number
  longitude?: number
}

@Injectable()
export class StoresService {
  findNearby(_query: NearbyQuery): NearbyStore[] {
    return [
      {
        id: 'demo-store-001',
        name: '黑米姐姐社区联营示范店',
        distanceMeters: 850,
        businessStatus: 'OPEN',
        pickupEstimateMinutes: 15,
      },
    ]
  }
}
