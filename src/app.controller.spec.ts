import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      // providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('serverStarts', () => {
    it('should verify if server starts', async () => {
      expect(appController.status()).toBe('alive and kicking')
    })
  })
})
