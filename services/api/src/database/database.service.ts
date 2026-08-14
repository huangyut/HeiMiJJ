import { Injectable } from '@nestjs/common'

@Injectable()
export class DatabaseService {
  getStatus() {
    return {
      configured: false,
      connected: false,
    }
  }
}
