import { HttpException, type HttpStatus } from '@nestjs/common'

import type { ErrorCode } from '../constants/error-codes'

export class BusinessException extends HttpException {
  constructor(code: ErrorCode, message: string, status: HttpStatus) {
    super({ code, message }, status)
  }
}
