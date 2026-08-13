import { Controller, Get, Query } from '@nestjs/common'

import { StoresService } from './stores.service'

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get('nearby')
  findNearby(@Query('latitude') latitude?: string, @Query('longitude') longitude?: string) {
    return this.storesService.findNearby({
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
    })
  }
}
