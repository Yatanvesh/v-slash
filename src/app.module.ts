import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {join} from 'path';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {OrganisationModule} from "./organisation/organisation.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'vslash',
      autoLoadEntities: true,
      entities: [
      ],
      synchronize: true,
    }),
    AuthModule,
    OrganisationModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
