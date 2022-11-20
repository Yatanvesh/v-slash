import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ShortcutEntity } from './entities/shortcut.entity'
import { ShortcutService } from './shortcut.service'
import { UserModule } from '../user/user.module'
import { ShortcutResolver } from './shortcut.resolver'
import { TagModule } from '../tags/tag.module'

@Module({
  imports: [TypeOrmModule.forFeature([ShortcutEntity]), UserModule, TagModule],
  providers: [ShortcutService, ShortcutResolver],
  exports: [TypeOrmModule],
})
export class ShortcutModule {}
