import { Module } from '@nestjs/common'

import { HealthController } from './modules/health/health.controller'
import { StoresController } from './modules/stores/stores.controller'
import { StoresService } from './modules/stores/stores.service'

@Module({
  controllers: [HealthController, StoresController],
  providers: [StoresService],
})
export class AppModule {}
