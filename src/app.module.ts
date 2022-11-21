import { Module, ValidationPipe } from '@nestjs/common'
import { AppController } from './app.controller'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { OrganisationModule } from './organisation/organisation.module'
import { APP_PIPE } from '@nestjs/core'
import { ShortcutModule } from './shortcut/shortcut.module'
import { TagModule } from './tags/tag.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // The code first approach allows the schema file to be generated automatically
      // It contains all the queries and mutations defined in resolvers
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || '1234',
      database: process.env.DATABASE_NAME || 'vlash',
      autoLoadEntities: true,
      entities: [],
      // Changes the schema whenever entity files are modified, useful in development environment
      synchronize: true,
    }),
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
