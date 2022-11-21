import { Module, ValidationPipe } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { OrganisationModule } from './organisation/organisation.module'
import { APP_PIPE } from '@nestjs/core'
import { ShortcutModule } from './shortcut/shortcut.module'
import { TagModule } from './tags/tag.module'
import { DB_CONFIG } from './db.config'
import { GRAPHQL_CONFIG } from './graphql.config'

@Module({
  imports: [
    GRAPHQL_CONFIG,
    DB_CONFIG,
    AuthModule,
    OrganisationModule,
    UserModule,
    ShortcutModule,
    TagModule,
  ],
  // only authentication routes are REST based, for everything else we have graphql
  controllers: [AppController],
  // globally validate DTOs passed in controllers, throws error if class-validator schema is invalid
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({}),
    },
  ],
})
export class AppModule {}
