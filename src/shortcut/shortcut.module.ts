import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShortcutEntity } from './entities/shortcut.entity'
import { ShortcutService } from './shortcut.service'
import { UserModule } from '../user/user.module'
import { ShortcutResolver } from './shortcut.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([ShortcutEntity]), UserModule],
  providers: [ShortcutService, ShortcutResolver],
  exports: [TypeOrmModule],
})
export class ShortcutModule {}
