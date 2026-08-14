import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { StorageIntegrationModule, WechatIntegrationModule } from './integrations'
import {
  AuthModule,
  CartsModule,
  ContentModule,
  HealthModule,
  InventoryModule,
  LogisticsModule,
  MarketingModule,
  OrdersModule,
  PaymentsModule,
  PickupsModule,
  ProductsModule,
  RefundsModule,
  StoresModule,
  UsersModule,
} from './modules'

@Module({
  imports: [
    DatabaseModule,
    WechatIntegrationModule,
    StorageIntegrationModule,
    HealthModule,
    AuthModule,
    UsersModule,
    StoresModule,
    ProductsModule,
    InventoryModule,
    CartsModule,
    OrdersModule,
    PaymentsModule,
    PickupsModule,
    RefundsModule,
    ContentModule,
    MarketingModule,
    LogisticsModule,
  ],
})
export class AppModule {}
