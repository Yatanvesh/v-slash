import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

@Controller()
export class AppController {
  constructor() {}

  @Get('status')
  status() {
    return 'alive and kicking'
  }

  /*
  Endpoint to test authentication
   */
  @UseGuards(JwtAuthGuard)
  @Get('test')
  getHello(@Request() req): string {
    return req.user
  }
}
